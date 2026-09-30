import type { IncomingMessage, ServerResponse } from 'node:http'
import { createTransport } from 'nodemailer'
import { isValidPhoneNumber } from 'libphonenumber-js/max'
import { renderEnquiryEmail } from './email.js'

/**
 * POST /api/contact — the Start a Project enquiry.
 *
 * Order of checks: method → origin → content type → body → validation →
 * rate limit → configuration → Turnstile → SMTP. Nothing is sent until the
 * Turnstile token has been verified with Cloudflare.
 *
 * Every response is `{ ok: true }` or `{ ok: false, error }`, where `error` is
 * a fixed, user-facing sentence. Internal details (SMTP responses, stack
 * traces, secrets) are never returned, and only error codes are logged.
 */

const env = (name: string): string => (process.env[name] ?? '').trim()
const isTrue = (name: string): boolean => env(name).toLowerCase() === 'true'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

/**
 * Local-testing bypass. Both flags must be `true` (the client hides the widget
 * on VITE_DISABLE_TURNSTILE; the server skips verification only when
 * CONTACT_DISABLE_TURNSTILE agrees), and it is ignored in production.
 */
const TURNSTILE_BYPASS = !IS_PRODUCTION && isTrue('CONTACT_DISABLE_TURNSTILE') && isTrue('VITE_DISABLE_TURNSTILE')
const TURNSTILE_SECRET = env('TURNSTILE_SECRET_KEY')
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const SMTP_PORT = Number(env('SMTP_PORT') || 465)
const SMTP = {
  host: env('SMTP_HOST'),
  port: SMTP_PORT,
  // Implicit TLS on 465 unless stated otherwise; STARTTLS is negotiated on other ports.
  secure: env('SMTP_SECURE') ? isTrue('SMTP_SECURE') : SMTP_PORT === 465,
  user: env('SMTP_USER'),
  pass: process.env.SMTP_PASS ?? '',
}
const RECEIVER = env('CONTACT_RECEIVER_EMAIL')

/** Extra origins allowed to call the endpoint cross-origin. Same-origin is always allowed. */
const ALLOWED_ORIGINS = env('CONTACT_ALLOWED_ORIGIN')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter((o) => o && o !== '*')

/** Names (never values) of settings the endpoint needs but does not have. */
export function missingContactConfig(): string[] {
  const missing: string[] = []
  if (!SMTP.host) missing.push('SMTP_HOST')
  if (!Number.isInteger(SMTP.port) || SMTP.port < 1 || SMTP.port > 65535) missing.push('SMTP_PORT')
  if (!SMTP.user) missing.push('SMTP_USER')
  if (!SMTP.pass) missing.push('SMTP_PASS')
  if (!RECEIVER) missing.push('CONTACT_RECEIVER_EMAIL')
  if (!TURNSTILE_BYPASS && !TURNSTILE_SECRET) missing.push('TURNSTILE_SECRET_KEY')
  return missing
}

export const turnstileBypassed = (): boolean => TURNSTILE_BYPASS

// ── Responses ────────────────────────────────────────────────────────────────

const MSG = {
  forbidden: 'This request is not allowed.',
  method: 'Method not allowed.',
  contentType: 'Please submit the form as JSON.',
  tooLarge: 'The message is too long. Please shorten it and try again.',
  rateLimited: 'Too many requests. Please wait a few minutes and try again.',
  malformed: 'Some of the details could not be read. Please check the form and try again.',
  required: 'Please fill in every field before sending.',
  email: 'Please enter a valid email address.',
  phone: 'Please check the phone number.',
  verification: 'Verification failed. Please try again.',
  unavailable: 'We could not send your request right now. Please try again later or email us directly.',
}

function send(res: ServerResponse, status: number, body: { ok: true } | { ok: false; error: string }): void {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  res.end(JSON.stringify(body))
}

const fail = (res: ServerResponse, status: number, error: string): void => send(res, status, { ok: false, error })

// ── Origin / CORS ────────────────────────────────────────────────────────────

const isSameOrigin = (req: IncomingMessage, origin: string): boolean => {
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

const isAllowedCrossOrigin = (origin: string): boolean => ALLOWED_ORIGINS.includes(origin)

// ── Rate limiting ────────────────────────────────────────────────────────────

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const RATE_MAX_TRACKED = 10_000
const hits = new Map<string, number[]>()

/**
 * Railway's edge proxy appends the caller's address to X-Forwarded-For, so the
 * last entry is the trustworthy one. Outside production nothing sits in front
 * of the server, so the header could be forged and the socket address is used.
 */
function clientIp(req: IncomingMessage): string {
  if (IS_PRODUCTION) {
    const fwd = req.headers['x-forwarded-for']
    const last = (Array.isArray(fwd) ? fwd.join(',') : fwd ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .pop()
    if (last) return last
  }
  return req.socket.remoteAddress ?? 'unknown'
}

/** In-memory sliding window per IP; adequate for a single Railway instance. */
function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.delete(ip)
  hits.set(ip, recent)
  // Map keeps insertion order, so the first key is the least recently seen.
  if (hits.size > RATE_MAX_TRACKED) hits.delete(hits.keys().next().value as string)
  return false
}

// ── Body ─────────────────────────────────────────────────────────────────────

const BODY_LIMIT = 32 * 1024

class BodyTooLarge extends Error {}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    let over = false
    req.on('data', (chunk: Buffer) => {
      if (over) return
      size += chunk.length
      if (size > BODY_LIMIT) {
        over = true
        reject(new BodyTooLarge())
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!over) resolve(Buffer.concat(chunks).toString('utf8'))
    })
    req.on('error', reject)
  })
}

// ── Validation ───────────────────────────────────────────────────────────────

export interface Enquiry {
  name: string
  email: string
  phone: string
  location: string
  sector: string
  services: string[]
  message: string
}

type Parsed = { ok: true; enquiry: Enquiry; token: string } | { ok: false; error: string }

// Matching control characters is the point: they are rejected to block header injection.
// eslint-disable-next-line no-control-regex
const SINGLE_LINE_CONTROL = /[\u0000-\u001f\u007f]/
// eslint-disable-next-line no-control-regex
const MULTI_LINE_CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
// No separators or brackets, so the address can't smuggle a second recipient into Reply-To.
const EMAIL = /^[^\s@<>()[\]",;:\\]+@[^\s@<>()[\]",;:\\]+\.[^\s@<>()[\]",;:\\]+$/
const E164 = /^\+\d{6,15}$/

/** String field: absent → '', wrong type, too long or control characters → null. */
function field(value: unknown, max: number, multiline = false): string | null {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string') return null
  const s = value.trim()
  if (s.length > max) return null
  if ((multiline ? MULTI_LINE_CONTROL : SINGLE_LINE_CONTROL).test(s)) return null
  return s
}

function parseEnquiry(raw: string): Parsed {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return { ok: false, error: MSG.malformed }
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false, error: MSG.malformed }
  const d = data as Record<string, unknown>

  const name = field(d.name, 120)
  const email = field(d.email, 254)
  const phone = field(d.phone, 20)
  const location = field(d.location, 120)
  const sector = field(d.sector, 120)
  const message = field(d.message, 5000, true)
  const token = field(d.turnstileToken, 2048)

  if (name === null || email === null || phone === null || location === null || sector === null || message === null || token === null) {
    return { ok: false, error: MSG.malformed }
  }

  const rawServices = d.services ?? []
  if (!Array.isArray(rawServices) || rawServices.length > 8) return { ok: false, error: MSG.malformed }
  const services: string[] = []
  for (const s of rawServices) {
    const v = field(s, 60)
    if (!v) return { ok: false, error: MSG.malformed }
    if (!services.includes(v)) services.push(v)
  }

  // Every field is required.
  if (!name || !email || !phone || !location || !sector || !services.length || !message) {
    return { ok: false, error: MSG.required }
  }
  if (!EMAIL.test(email)) return { ok: false, error: MSG.email }
  if (!(E164.test(phone) && isValidPhoneNumber(phone))) return { ok: false, error: MSG.phone }

  return { ok: true, enquiry: { name, email, phone, location, sector, services, message }, token }
}

// ── Turnstile ────────────────────────────────────────────────────────────────

async function verifyTurnstile(token: string, ip: string): Promise<'ok' | 'rejected' | 'unavailable'> {
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)
  try {
    const r = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(8000) })
    if (!r.ok) {
      console.error('[contact] Turnstile verification request failed', { status: r.status })
      return 'unavailable'
    }
    const result = (await r.json()) as { success?: unknown; 'error-codes'?: unknown; hostname?: unknown }
    if (result.success === true) {
      console.log('[contact] Turnstile verified', { hostname: result.hostname })
      return 'ok'
    }
    console.warn('[contact] Turnstile rejected the token', { codes: result['error-codes'], hostname: result.hostname })
    return 'rejected'
  } catch (err) {
    const e = err as Error & { cause?: { code?: unknown } }
    console.error('[contact] Turnstile verification unavailable', { error: e.name, cause: e.cause?.code })
    return 'unavailable'
  }
}

// ── Mail ─────────────────────────────────────────────────────────────────────

let transporter: ReturnType<typeof createSmtpTransport> | null = null

function createSmtpTransport() {
  return createTransport({
    host: SMTP.host,
    port: SMTP.port,
    secure: SMTP.secure,
    auth: { user: SMTP.user, pass: SMTP.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })
}

async function deliver(e: Enquiry): Promise<void> {
  transporter ??= createSmtpTransport()
  const { subject, text, html } = renderEnquiryEmail(e, new Date())
  await transporter.sendMail({
    from: { name: 'Silver Smart website', address: SMTP.user },
    to: RECEIVER,
    replyTo: { name: e.name, address: e.email },
    subject,
    text,
    html,
  })
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function handleContact(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const origin = req.headers.origin
  const crossAllowed = !!origin && isAllowedCrossOrigin(origin)
  res.setHeader('Vary', 'Origin')
  if (crossAllowed) res.setHeader('Access-Control-Allow-Origin', origin)

  if (req.method === 'OPTIONS') {
    if (!crossAllowed) return fail(res, 403, MSG.forbidden)
    res.writeHead(204, {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '600',
    })
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', crossAllowed ? 'POST, OPTIONS' : 'POST')
    return fail(res, 405, MSG.method)
  }

  // Browsers always send Origin on a POST; a missing or foreign one is refused.
  if (!origin || !(isSameOrigin(req, origin) || crossAllowed)) return fail(res, 403, MSG.forbidden)

  if (!(req.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) {
    return fail(res, 415, MSG.contentType)
  }
  if (Number(req.headers['content-length'] ?? 0) > BODY_LIMIT) return fail(res, 413, MSG.tooLarge)

  let raw: string
  try {
    raw = await readBody(req)
  } catch (err) {
    if (err instanceof BodyTooLarge) {
      res.setHeader('Connection', 'close')
      return fail(res, 413, MSG.tooLarge)
    }
    return fail(res, 400, MSG.malformed)
  }

  const parsed = parseEnquiry(raw)
  if (!parsed.ok) return fail(res, 400, parsed.error)

  // Counted only once a request is well-formed, so fixing a typo costs nothing;
  // what it protects is the Turnstile call and the SMTP send below.
  const ip = clientIp(req)
  if (rateLimited(ip)) return fail(res, 429, MSG.rateLimited)

  const missing = missingContactConfig()
  if (missing.length) {
    console.error('[contact] Not configured; missing:', missing.join(', '))
    return fail(res, 503, MSG.unavailable)
  }

  if (!TURNSTILE_BYPASS) {
    if (!parsed.token) {
      console.warn('[contact] Request had no Turnstile token')
      return fail(res, 400, MSG.verification)
    }
    const verdict = await verifyTurnstile(parsed.token, ip)
    if (verdict === 'rejected') return fail(res, 400, MSG.verification)
    if (verdict === 'unavailable') return fail(res, 503, MSG.unavailable)
  }

  try {
    await deliver(parsed.enquiry)
  } catch (err) {
    const e = err as { code?: unknown; responseCode?: unknown; command?: unknown }
    console.error('[contact] SMTP delivery failed', { code: e.code, responseCode: e.responseCode, command: e.command })
    return fail(res, 502, MSG.unavailable)
  }

  console.log('[contact] Enquiry delivered')
  send(res, 200, { ok: true })
}
