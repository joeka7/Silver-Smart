import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'
import type { NumberedItem } from '../data/site'
import type { StyleWithVars } from '../types/css'

interface ArrowLinkProps {
  /** In-app route. Ignored when `href` is supplied. */
  to?: string
  /** External/protocol URL; renders a plain <a> instead of a <Link>. */
  href?: string
  children: ReactNode
  className?: string
}

/** Arrow link — `.lk` with the translating arrow from ss.css. */
export function ArrowLink({ to, href, children, className = '' }: ArrowLinkProps) {
  const inner = (
    <>
      {children} <span className="ar">&#8594;</span>
    </>
  )
  const cls = `lk ${className}`.trim()
  return href ? (
    <a className={cls} href={href}>{inner}</a>
  ) : (
    <Link className={cls} to={to ?? ''}>{inner}</Link>
  )
}

interface SectionHeadProps {
  n: string
  title: string
  note?: ReactNode
}

/** Numbered section header — `.shead`, with the brand orange rule underneath. */
export function SectionHead({ n, title, note }: SectionHeadProps) {
  return (
    <div className="shead" data-r>
      <span className="n">{n}</span>
      <span className="t">{title}</span>
      {note && <span className="x">{note}</span>}
    </div>
  )
}

interface CaptionProps {
  left: ReactNode
  right?: ReactNode
  style?: CSSProperties
}

/** Figure caption — `.cap`, with the brand orange tick above it. */
export function Caption({ left, right, style }: CaptionProps) {
  return (
    <div className="cap" style={style}>
      <span>{left}</span>
      {right && <span className="r">{right}</span>}
    </div>
  )
}

/** One label/value pair in the masthead's meta column. */
export interface MastheadMeta {
  label: string
  value: string
}

interface MastheadProps {
  n: string
  eyebrow: string
  /** Often a fragment with a <br /> or a highlighted span, so ReactNode. */
  title: ReactNode
  meta: MastheadMeta[]
  kicker: ReactNode
}

/** Page masthead — `.mast`, shared by every interior page. */
export function Masthead({ n, eyebrow, title, meta, kicker }: MastheadProps) {
  return (
    <header className="mast on-ink">
      <div className="wrap mast-in">
        <div className="t">
          <p className="meta dim" data-r style={{ marginBottom: 'clamp(20px,3vw,40px)' }}>
            <span className="omark"></span>
            <span className="onum">{n}</span> — {eyebrow}
          </p>
          <h1 className="d1" data-r>{title}</h1>
        </div>
        <div className="m meta" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
          {meta.map((row) => (
            <span className="l" key={row.label}>
              <span>{row.label}</span>
              <b>{row.value}</b>
            </span>
          ))}
        </div>
        <div className="k meta dim" data-r style={{ '--dl': '.16s' } as StyleWithVars}>
          <span className="omark"></span>{kicker}
        </div>
      </div>
    </header>
  )
}

interface EditorialRowsProps {
  items: NumberedItem[]
}

/** Editorial numbered rows — `.ed`. */
export function EditorialRows({ items }: EditorialRowsProps) {
  return (
    <ul className="ed" data-stagger=".06">
      {items.map((item) => (
        <li data-r key={item.n}>
          <span className="n">{item.n}</span>
          <div className="c">
            <h3 className="d3">{item.title}</h3>
            <p className="dim">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface FieldProps {
  items: NumberedItem[]
  stagger?: string
  style?: CSSProperties
}

/** Hairline field grid — `.field`. */
export function Field({ items, stagger = '.06', style }: FieldProps) {
  return (
    <div className="field" data-stagger={stagger} style={style}>
      {items.map((item) => (
        <div data-r key={item.n + item.title}>
          <span className="n">{item.n}</span>
          <h4 className="d4">{item.title}</h4>
          <p className="dim">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
