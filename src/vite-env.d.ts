/// <reference types="vite/client" />

// Only VITE_* values are exposed to the browser. Server secrets (SMTP_*,
// TURNSTILE_SECRET_KEY) are read by server/ and must never be added here.
interface ImportMetaEnv {
  /** Cloudflare Turnstile public site key. */
  readonly VITE_TURNSTILE_SITE_KEY?: string
  /** `'true'` hides the widget for local testing; ignored in production builds. */
  readonly VITE_DISABLE_TURNSTILE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
