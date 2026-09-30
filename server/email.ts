import { parsePhoneNumber } from 'libphonenumber-js/max'
import type { Enquiry } from './contact.js'

/**
 * The admin notification for a Start a Project enquiry, as HTML plus a
 * plain-text alternative.
 *
 * The HTML is table-based with inline styles only, so it holds up in Gmail,
 * Outlook (Word engine), Apple Mail and mobile clients. Every submitted value
 * passes through `esc()` before it is interpolated — nothing the visitor typed
 * is ever rendered as markup.
 */

export interface RenderedEmail {
  subject: string
  text: string
  html: string
}

const BRAND = '#e8762b'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'
const RULE = '#e6e4df'
const CANVAS = '#f4f3f0'
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

// ── Escaping ─────────────────────────────────────────────────────────────────

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

/** HTML-escapes text for element content and quoted attribute values. */
const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c])

/** Escaped, with line breaks kept as <br> (white-space: pre-wrap is ignored by Outlook). */
const escMultiline = (s: string): string => esc(s.replace(/\r\n?/g, '\n')).replace(/\n/g, '<br>')

/** mailto: href with each part percent-encoded, so `?`, `&` or `#` in an address can't add parameters. */
const mailtoHref = (address: string): string => {
  const at = address.lastIndexOf('@')
  return `mailto:${encodeURIComponent(address.slice(0, at))}@${encodeURIComponent(address.slice(at + 1))}`
}

// ── Derived values ───────────────────────────────────────────────────────────

/** Country name for an E.164 number (validated upstream), or '' if it has none. */
function phoneCountry(phone: string): string {
  try {
    const region = parsePhoneNumber(phone).country
    return region ? (new Intl.DisplayNames(['en'], { type: 'region' }).of(region) ?? '') : ''
  } catch {
    return ''
  }
}

/** Server-side submission time, in the office's time zone (the UAE has no DST). */
const formatSubmittedAt = (at: Date): string =>
  `${new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(at)} (GST, UTC+4)`

// ── HTML pieces ──────────────────────────────────────────────────────────────

const sectionHeading = (title: string): string => `
<tr>
  <td style="padding:32px 40px 12px 40px;" class="px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-family:${FONT};font-size:11px;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;color:${BRAND};padding-bottom:10px;border-bottom:1px solid ${RULE};">${title}</td>
      </tr>
    </table>
  </td>
</tr>`

/** A label/value row; `valueHtml` must already be escaped. */
const detailRow = (label: string, valueHtml: string, last = false): string => `
<tr>
  <td width="120" valign="top" style="width:120px;padding:10px 12px 10px 0;font-family:${FONT};font-size:13px;line-height:20px;color:${MUTED};${last ? '' : `border-bottom:1px solid ${RULE};`}">${label}</td>
  <td valign="top" dir="auto" style="padding:10px 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};word-break:break-word;overflow-wrap:anywhere;${last ? '' : `border-bottom:1px solid ${RULE};`}">${valueHtml}</td>
</tr>`

const link = (href: string, textHtml: string): string =>
  `<a href="${esc(href)}" style="color:${INK};text-decoration:underline;text-decoration-color:${BRAND};">${textHtml}</a>`

function renderHtml(e: Enquiry, submittedAt: string, country: string): string {
  const preheader = esc(`${e.name} · ${e.sector} · ${e.services.join(', ')}`)

  const phoneHtml =
    link(`tel:${e.phone}`, esc(e.phone)) +
    (country ? ` <span style="color:${MUTED};font-size:13px;">&nbsp;${esc(country)}</span>` : '')

  const serviceRows = e.services
    .map(
      (s, i) => `
<tr>
  <td width="28" valign="top" style="width:28px;padding:9px 0;font-family:${FONT};font-size:12px;line-height:22px;color:${BRAND};font-weight:600;${i < e.services.length - 1 ? `border-bottom:1px solid ${RULE};` : ''}">${String(i + 1).padStart(2, '0')}</td>
  <td valign="top" dir="auto" style="padding:9px 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};word-break:break-word;${i < e.services.length - 1 ? `border-bottom:1px solid ${RULE};` : ''}">${esc(s)}</td>
</tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>New Project Inquiry — Silver Smart</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  @media only screen and (max-width: 620px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${CANVAS};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${CANVAS};opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CANVAS}" style="background-color:${CANVAS};">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px;background-color:#ffffff;border:1px solid ${RULE};">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 0 40px;" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${FONT};font-size:13px;line-height:18px;letter-spacing:4px;font-weight:700;color:${INK};">SILVER&nbsp;SMART</td>
              </tr>
              <tr>
                <td style="padding-top:24px;font-family:${FONT};font-size:24px;line-height:32px;font-weight:600;color:${INK};">New Project Inquiry</td>
              </tr>
              <tr>
                <td style="padding-top:6px;font-family:${FONT};font-size:14px;line-height:21px;color:${MUTED};">A new request was submitted through the Start a Project form.</td>
              </tr>
              <tr>
                <td style="padding-top:24px;">
                  <table role="presentation" width="48" cellpadding="0" cellspacing="0" border="0"><tr><td height="2" bgcolor="${BRAND}" style="height:2px;line-height:2px;font-size:0;background-color:${BRAND};">&nbsp;</td></tr></table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Inquiry details -->
        ${sectionHeading('Inquiry Details')}
        <tr>
          <td style="padding:0 40px;" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
              ${detailRow('Name', esc(e.name))}
              ${detailRow('Email', link(mailtoHref(e.email), esc(e.email)))}
              ${detailRow('Phone', phoneHtml)}
              ${detailRow('Location', esc(e.location))}
              ${detailRow('Sector', esc(e.sector), true)}
            </table>
          </td>
        </tr>

        <!-- Requested services -->
        ${sectionHeading('Requested Services')}
        <tr>
          <td style="padding:0 40px;" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
              ${serviceRows}
            </table>
          </td>
        </tr>

        <!-- Project details -->
        ${sectionHeading('Project Details')}
        <tr>
          <td style="padding:4px 40px 0 40px;" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
              <tr>
                <td dir="auto" bgcolor="#fafaf8" style="padding:16px 18px;background-color:#fafaf8;border-left:2px solid ${BRAND};font-family:${FONT};font-size:15px;line-height:24px;color:${INK};word-break:break-word;overflow-wrap:anywhere;">${escMultiline(e.message)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Reply action -->
        <tr>
          <td style="padding:32px 40px 0 40px;" class="px">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border:1px solid ${BRAND};">
                  <a href="${esc(mailtoHref(e.email))}" style="display:inline-block;padding:11px 22px;font-family:${FONT};font-size:14px;line-height:20px;font-weight:600;color:${INK};text-decoration:none;">Reply to Client</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 40px 0 40px;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};" class="px">Replying to this email also goes directly to ${esc(e.email)}.</td>
        </tr>

        <!-- Submission information -->
        ${sectionHeading('Submission Information')}
        <tr>
          <td style="padding:0 40px 36px 40px;" class="px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
              ${detailRow('Submitted via', 'Silver Smart Website')}
              ${detailRow('Submitted on', esc(submittedAt), true)}
            </table>
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr>
          <td align="center" style="padding:24px 12px 8px 12px;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">
            <strong style="color:${INK};font-weight:600;letter-spacing:1px;">Silver Smart</strong><br>Abu Dhabi, UAE
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`
}

function renderText(e: Enquiry, submittedAt: string, country: string): string {
  return [
    'NEW PROJECT INQUIRY — SILVER SMART',
    '',
    'INQUIRY DETAILS',
    `Name:      ${e.name}`,
    `Email:     ${e.email}`,
    `Phone:     ${e.phone}${country ? ` (${country})` : ''}`,
    `Location:  ${e.location}`,
    `Sector:    ${e.sector}`,
    '',
    'REQUESTED SERVICES',
    ...e.services.map((s) => `- ${s}`),
    '',
    'PROJECT DETAILS',
    e.message.replace(/\r\n?/g, '\n'),
    '',
    'SUBMISSION INFORMATION',
    'Submitted via: Silver Smart Website',
    `Submitted on:  ${submittedAt}`,
    '',
    `Reply to the client: ${e.email} (replying to this email also reaches them)`,
    '',
    '—',
    'Silver Smart',
    'Abu Dhabi, UAE',
  ].join('\n')
}

/** Builds the admin notification. `at` is the server's receipt time, never a client value. */
export function renderEnquiryEmail(e: Enquiry, at: Date): RenderedEmail {
  const submittedAt = formatSubmittedAt(at)
  const country = phoneCountry(e.phone)
  return {
    // The sender's name keeps each enquiry in its own thread (Gmail groups identical subjects).
    subject: `New Project Inquiry from ${e.name} — Silver Smart`,
    text: renderText(e, submittedAt, country),
    html: renderHtml(e, submittedAt, country),
  }
}
