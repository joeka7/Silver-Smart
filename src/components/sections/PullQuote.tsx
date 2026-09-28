import type { ReactNode } from 'react'

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
