import type { ReactNode } from 'react'

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
