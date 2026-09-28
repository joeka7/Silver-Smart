import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

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
