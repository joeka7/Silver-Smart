import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'
import type { StyleWithVars } from '../types/css'

/* ============================================================================
   Shared primitives for the "Architectural Prestige" system.
   Each mirrors a repeating element in the Stitch export.
   ========================================================================== */

interface SectionIndexProps {
  /** Chapter number, rendered as "01 //". */
  n: string
  title: string
  /** Right-aligned technical note; hidden on small screens. */
  note?: ReactNode
  /** Draws the hairline rule between the title and the note. */
  rule?: boolean
}

/** Numbered section marker — "01 // STUDIO PROFILE" with optional hairline. */
export function SectionIndex({ n, title, note, rule = true }: SectionIndexProps) {
  return (
    <div className="sindex t-label" data-r>
      <span className="sindex-n">{n} //</span>
      <span className="sindex-t">{title}</span>
      {rule && <span className="sindex-rule" aria-hidden="true"></span>}
      {note && <span className="sindex-note">{note}</span>}
    </div>
  )
}

interface TextLinkProps {
  to?: string
  href?: string
  children: ReactNode
  /** Prefixes the disciplined hairline rule from DESIGN.md's "Text Action". */
  rule?: boolean
  className?: string
}

/** Mono all-caps action with a right arrow. */
export function TextLink({ to, href, children, rule = false, className = '' }: TextLinkProps) {
  const inner = (
    <>
      {rule && <span className="tlink-rule" aria-hidden="true"></span>}
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">&#8594;</span>
    </>
  )
  const cls = `tlink ${className}`.trim()
  return href ? (
    <a className={cls} href={href}>{inner}</a>
  ) : (
    <Link className={cls} to={to ?? ''}>{inner}</Link>
  )
}

export interface LedgerStat {
  /** Small uppercase key above the value. */
  label: string
  value: string
  /** Sentence under the value. */
  note: string
  /** Renders the value at headline-sm rather than headline-lg (for longer strings). */
  small?: boolean
}

/** Four-up metric ledger. */
export function Ledger({ stats }: { stats: LedgerStat[] }) {
  return (
    <div className="ledger" data-stagger=".06">
      {stats.map((s) => (
        <div className="ledger-cell" data-r key={s.label}>
          <div className="ledger-top">
            <span className="t-label c-muted">{s.label}</span>
            <span className="dot" aria-hidden="true"></span>
          </div>
          <div>
            <div className="ledger-v" style={s.small ? { fontSize: 'var(--headline-sm)' } : undefined}>
              {s.value}
            </div>
            <p className="ledger-k">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

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

interface QuoteProps {
  children: ReactNode
  name: string
  role: string
}

/** Pull quote with its attribution rule. */
export function PullQuote({ children, name, role }: QuoteProps) {
  return (
    <figure>
      <blockquote className="quote">{children}</blockquote>
      <figcaption className="quote-cap t-label">
        <span>{name}</span>
        <span className="c-muted">{role}</span>
      </figcaption>
    </figure>
  )
}

export interface NumberedEntry {
  n: string
  title: string
  desc: string
}

/** Editorial numbered rows separated by hairlines. */
export function EditorialRows({ items }: { items: NumberedEntry[] }) {
  return (
    <ul className="ed" data-stagger=".06">
      {items.map((item) => (
        <li data-r key={item.n + item.title}>
          <span className="n">{item.n} //</span>
          <div className="c">
            <h3 className="t-md">{item.title}</h3>
            <p className="t-body c-dim mw">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface FieldGridProps {
  items: NumberedEntry[]
  style?: CSSProperties
}

/** Three-up hairline field of numbered cards. */
export function FieldGrid({ items, style }: FieldGridProps) {
  return (
    <div className="field-grid" data-stagger=".06" style={style}>
      {items.map((item) => (
        <div data-r key={item.n + item.title}>
          <span className="n">{item.n} //</span>
          <h4 className="t-sm">{item.title}</h4>
          <p className="t-small c-dim">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
