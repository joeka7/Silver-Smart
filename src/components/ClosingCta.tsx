import type { ReactNode } from 'react'
import closingVid from '../videos/hero-vid.mp4'
import { cn } from '../lib/utils'

interface ClosingCtaProps {
  /** Usually a fragment with a highlighted span, so ReactNode. */
  heading: ReactNode
  blurb: ReactNode
  eyebrow?: string
  /** Optional button row under the blurb. */
  actions?: ReactNode
  /** Extra classes on the outer section, e.g. a surface tone. */
  className?: string
}

/**
 * Closing CTA band — the video panel that ends every interior page.
 * Mirrors "SECTION 05 // FINAL STUDIO CALL TO ACTION" in the Stitch export.
 */
export default function ClosingCta({ heading, blurb, eyebrow = 'Commence a dialogue', actions, className }: ClosingCtaProps) {
  return (
    <section className={cn('section', className)}>
      <div className="wrap">
        <div className="closing" style={{ padding: 'clamp(1.5rem, 4vw, 4rem)' }}>
          <video
            className="closing-video"
            src={closingVid}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="closing-scrim" aria-hidden="true"></div>
          <div className="closing-grid">
            <div className="closing-a">
              <div className="sindex t-label" data-r style={{ marginBottom: 0 }}>
                <span className="dot" aria-hidden="true"></span>
                <span className="sindex-n">{eyebrow}</span>
              </div>
              <h2 className="t-lg" data-r>{heading}</h2>
              <p className="t-lede" data-r style={{ maxWidth: '46ch' }}>{blurb}</p>
              {actions && <div className="hero-ctas" data-r>{actions}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
