import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'
import { handleContact, missingContactConfig, turnstileBypassed } from './contact.js'

/**
 * Production server for Railway: serves the Vite build from `dist/` and the
 * contact endpoint from the same origin, so the browser never makes a
 * cross-origin call and no CORS configuration is needed by default.
 *
 * In development only the API is used — Vite serves the app on :5173 and
 * proxies `/api` here (see vite.config.ts).
 */

const PORT = Number(process.env.PORT) || 3001
const DIST = fileURLToPath(new URL('../dist', import.meta.url))

// SPA fallback (unknown paths → index.html) matches the previous Netlify/Vercel rewrites.
// Hashed build assets are immutable; everything else is revalidated.
const serveStatic = existsSync(DIST)
  ? sirv(DIST, {
      single: true,
      etag: true,
      setHeaders: (res, pathname) => {
        res.setHeader(
          'Cache-Control',
          pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
        )
      },
    })
  : null

const server = createServer((req, res) => {
  const pathname = (req.url ?? '/').split('?')[0]

  if (pathname === '/api/contact') {
    handleContact(req, res).catch((err: unknown) => {
      console.error('[contact] Unhandled error', { error: (err as Error)?.name })
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
        res.end(JSON.stringify({ ok: false, error: 'Something went wrong. Please try again later.' }))
      } else {
        res.end()
      }
    })
    return
  }

  if (pathname.startsWith('/api/')) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: false, error: 'Not found.' }))
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    res.end()
    return
  }

  if (!serveStatic) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found. Run `npm run build` to serve the site from this server.')
    return
  }

  serveStatic(req, res, () => {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found.')
  })
})

server.listen(PORT, () => {
  console.log(`Silver Smart server listening on port ${PORT}${serveStatic ? '' : ' (API only — no dist/ build found)'}`)
  const missing = missingContactConfig()
  if (missing.length) console.warn('[contact] The contact form will not send until these are set:', missing.join(', '))
  if (turnstileBypassed()) console.warn('[contact] Turnstile verification is DISABLED for local testing.')
  else if (process.env.NODE_ENV === 'production' && process.env.CONTACT_DISABLE_TURNSTILE === 'true') {
    console.warn('[contact] CONTACT_DISABLE_TURNSTILE is ignored in production; Turnstile stays enabled.')
  }
})

// Railway sends SIGTERM on redeploy; finish in-flight requests before exiting.
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(0), 10_000).unref()
  })
}
