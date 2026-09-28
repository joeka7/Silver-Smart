import type { ReactNode } from 'react'
import { SectionIndex } from '@/components/ui'
import type { StyleWithVars } from '@/types/css'

export interface MastheadMeta {
  label: string
  value: string
}

interface MastheadProps {
  n: string
  eyebrow: string
  /** Often a fragment with a highlighted span, so ReactNode. */
  title: ReactNode
  lede: ReactNode
  /** Optional right-hand register rows under the lede. */
  meta?: MastheadMeta[]
  note?: ReactNode
}

/** Editorial page header shared by every interior page. */
export function Masthead({ n, eyebrow, title, lede, meta, note }: MastheadProps) {
  return (
    <section className="wrap mast">
      <SectionIndex n={n} title={eyebrow} note={note} />
      <div className="mast-head">
        <div className="mast-title" data-r>
          <h1 className="t-hero">{title}</h1>
        </div>
        <div className="mast-aside" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
          <p className="t-lede">{lede}</p>
          {meta && meta.length > 0 && (
            <div className="mast-reg">
              {meta.map((row) => (
                <span key={row.label} className="t-label" style={{ display: 'flex', gap: '0.75rem' }}>
                  <span className="c-muted">{row.label}</span>
                  <b style={{ fontWeight: 500 }}>{row.value}</b>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
