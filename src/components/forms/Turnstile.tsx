import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

/**
 * Cloudflare Turnstile for the enquiry form.
 *
 * The widget is always visible above the submit button. The token it issues
 * is sent with the form and verified server-side.
 */

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''

/** The local-testing bypass never applies to a production build. */
// eslint-disable-next-line react-refresh/only-export-components -- build-time constant, never changes during HMR
export const TURNSTILE_ENABLED = import.meta.env.PROD || import.meta.env.VITE_DISABLE_TURNSTILE !== 'true'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let loader: Promise<TurnstileApi> | null = null

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  loader ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile unavailable')))
    script.onerror = () => {
      // Allow a later mount to retry.
      loader = null
      script.remove()
      reject(new Error('Turnstile failed to load'))
    }
    document.head.appendChild(script)
  })
  return loader
}

export interface TurnstileHandle {
  /** Discards the current token and fetches a new one (tokens are single-use). */
  reset: () => void
}

interface TurnstileProps {
  /** A fresh token, or `null` when it expires, fails or is reset. */
  onToken: (token: string | null) => void
  /** Fires when the widget cannot load or run at all. */
  onError: () => void
}

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile({ onToken, onError }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(null)
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
    },
  }))

  useEffect(() => {
    if (!SITE_KEY) {
      if (import.meta.env.DEV) console.warn('VITE_TURNSTILE_SITE_KEY is not set; the contact form cannot be verified.')
      onErrorRef.current()
      return
    }
    let cancelled = false
    loadTurnstile()
      .then((api) => {
        if (cancelled || !containerRef.current) return
        widgetId.current = api.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          // Fixed 300px widget; narrow phones get the compact square instead.
          size: window.matchMedia('(max-width: 399px)').matches ? 'compact' : 'normal',
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'timeout-callback': () => onTokenRef.current(null),
          'error-callback': () => {
            onTokenRef.current(null)
            onErrorRef.current()
          },
        })
      })
      .catch(() => {
        if (!cancelled) onErrorRef.current()
      })
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
  }, [])

  return <div ref={containerRef} className="form-turnstile" />
})

