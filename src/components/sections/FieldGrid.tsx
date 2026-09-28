import type { CSSProperties } from 'react'
import type { NumberedItem } from '@/data/site'

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
