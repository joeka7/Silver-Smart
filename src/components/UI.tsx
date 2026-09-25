import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { StyleWithVars } from '../types/css'
import type { NumberedItem } from '../data/site'
import { ShinyButton } from './ui/shiny-button'
import type { ShinyButtonProps } from './ui/shiny-button'
import { ShimmerButton } from './ui/shimmer-button'
import type { ShimmerButtonProps } from './ui/shimmer-button'
import { cn } from '../lib/utils'

/* ============================================================================
   Shared primitives for the "Architectural Prestige" system.
   Each mirrors a repeating element in the Stitch export.
   ========================================================================== */

export type ButtonVariant = 'primary' | 'dark' | 'light'

interface ButtonOwnProps {
  /** primary = brand-orange sweep; dark = silver sweep for secondary actions; light = pale fill for use over media. */
  variant?: ButtonVariant
  /** Shows the small arrow after the label. Turn it off for compact functional controls (`btn-sm`). */
  icon?: boolean
  /** Stretches to the container width. */
  block?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsLink = ButtonOwnProps & Omit<LinkProps, keyof ButtonOwnProps> & { href?: never }
type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { href: string; to?: never }
type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { to?: never; href?: never }

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

/** Pill content shared by both CTA treatments: the label plus the optional arrow. */
function ButtonContent({ icon, children }: { icon: boolean; children: ReactNode }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      {icon && <ArrowUpRight className="btn-icon" size={14} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )
}

/** ShimmerButton settings per variant: the site's button fills, with a shimmer that reads on each. */
const SHIMMER: Record<ButtonVariant, { background: string; shimmerColor: string }> = {
  primary: { background: 'var(--primary-container)', shimmerColor: '#ffffff' },
  dark: { background: '#ffffff', shimmerColor: 'var(--primary-container)' },
  light: { background: 'var(--secondary-fixed)', shimmerColor: 'var(--primary-container)' },
}

/**
 * Site CTA, rendered with the ShimmerButton treatment. Renders a router <Link>
 * when given `to`, an <a> when given `href`, and a native <button> otherwise,
 * passing every other prop (onClick, type, disabled, target, aria-*) straight through.
 */
export function Button({ variant = 'primary', icon = true, block = false, className = '', children, ...rest }: ButtonProps) {
  // Native buttons default to type="button" so they never submit a form by accident.
  const isButton = rest.to === undefined && rest.href === undefined
  const props = {
    ...(isButton && { type: 'button' }),
    ...rest,
    ...SHIMMER[variant],
    className: cn('btn', `btn-${variant}`, !icon && 'btn-sm', block && 'btn-block', className),
    children: <ButtonContent icon={icon}>{children}</ButtonContent>,
  } as ShimmerButtonProps
  return <ShimmerButton {...props} />
}

/**
 * Header/Navbar CTA. Keeps the ShinyButton treatment the header already has,
 * so the header stays unchanged while the rest of the site uses ShimmerButton.
 */
export function HeaderButton({ variant = 'primary', icon = true, block = false, className = '', children, ...rest }: ButtonProps) {
  const props = {
    ...rest,
    className: cn('btn', `btn-${variant}`, !icon && 'btn-sm', block && 'btn-block', className),
    children: <ButtonContent icon={icon}>{children}</ButtonContent>,
  } as ShinyButtonProps
  return <ShinyButton {...props} />
}

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

/** Editorial numbered rows separated by hairlines. */
export function EditorialRows({ items }: { items: NumberedItem[] }) {
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
  items: NumberedItem[]
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
