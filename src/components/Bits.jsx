import { Link } from 'react-router-dom'

/** Arrow link — `.lk` with the translating arrow from ss.css. */
export function ArrowLink({ to, href, children, className = '' }) {
  const inner = (
    <>
      {children} <span className="ar">&#8594;</span>
    </>
  )
  const cls = `lk ${className}`.trim()
  return href ? (
    <a className={cls} href={href}>{inner}</a>
  ) : (
    <Link className={cls} to={to}>{inner}</Link>
  )
}

/** Numbered section header — `.shead`, with the brand orange rule underneath. */
export function SectionHead({ n, title, note }) {
  return (
    <div className="shead" data-r>
      <span className="n">{n}</span>
      <span className="t">{title}</span>
      {note && <span className="x">{note}</span>}
    </div>
  )
}

/** Figure caption — `.cap`, with the brand orange tick above it. */
export function Caption({ left, right, style }) {
  return (
    <div className="cap" style={style}>
      <span>{left}</span>
      {right && <span className="r">{right}</span>}
    </div>
  )
}

/** Page masthead — `.mast`, shared by every interior page. */
export function Masthead({ n, eyebrow, title, meta, kicker }) {
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
        <div className="m meta" data-r style={{ '--dl': '.1s' }}>
          {meta.map((row) => (
            <span className="l" key={row.label}>
              <span>{row.label}</span>
              <b>{row.value}</b>
            </span>
          ))}
        </div>
        <div className="k meta dim" data-r style={{ '--dl': '.16s' }}>
          <span className="omark"></span>{kicker}
        </div>
      </div>
    </header>
  )
}

/** Editorial numbered rows — `.ed`. */
export function EditorialRows({ items }) {
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

/** Hairline field grid — `.field`. */
export function Field({ items, stagger = '.06', style }) {
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
