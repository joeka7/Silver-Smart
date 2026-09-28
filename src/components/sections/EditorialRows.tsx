import type { NumberedItem } from '@/data/site'

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
