import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import ClosingCta from '../components/ClosingCta'
import { SectionHead, Masthead, Caption, ArrowLink } from '../components/Bits'
import { SECTORS } from '../data/site'

const DETAIL = '/projects/residential-interior-fit-out'

export default function Projects() {
  return (
    <>
      <Masthead
        n="03"
        eyebrow="Work"
        title={<>Selected<br /><span className="ob">work</span></>}
        meta={[
          { label: 'Sectors', value: 'Six' },
          { label: 'Region', value: 'UAE' },
          { label: 'Disciplines', value: 'Four' },
        ]}
        kicker="Concepts turned into reality — builders, designers and architects working in unison, from interior design masterworks to architectural detail."
      />

      <section className="sect on-paper" style={{ paddingBottom: 'clamp(20px,3vw,40px)' }}>
        <div className="wrap">
          <SectionHead n="Index" title="Six sectors" note="Jump to a sector" />
          <div className="sindex" data-r>
            {SECTORS.map((s) => (
              <a href={`#${s.id}`} key={s.id}>
                <span className="onum">{s.n}</span> — {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="on-paper">
        <div className="wrap">
          {SECTORS.map((s, i) => (
            <article className={`pjblk${i % 2 === 1 ? ' alt' : ''}`} id={s.id} key={s.id}>
              <div className="tx stack" data-r>
                <span className="meta onum">{s.n}</span>
                <h2 className="d3">{s.title}</h2>
                <p className="dim">{s.desc}</p>
                <ArrowLink to={DETAIL}>View project</ArrowLink>
              </div>
              <div className="im1" data-r="mask">
                <Link className="fr fr-zoom" to={DETAIL}>
                  <ImageSlot placeholder={s.slotA} alt={s.slotA} />
                </Link>
                <Caption left={s.title} right={s.cap} />
              </div>
              <div className="im2" data-r="mask" style={{ '--dl': '.1s' }}>
                <Link className="fr fr-zoom" to={DETAIL}>
                  <ImageSlot placeholder={s.slotB} alt={s.slotB} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sect on-ink">
        <div className="wrap">
          <div className="two">
            <div className="a-wide" data-r>
              <blockquote className="pull">
                “They took our vision and turned it into a reality. The attention to detail and quality of their work is
                unmatched.”
              </blockquote>
              <Caption left="Sultan Majid" right="Client" style={{ maxWidth: 520 }} />
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' }}>
              <p className="dim">
                Every project is a test of the same three things: how it was planned, how it was built, and how it is
                kept.
              </p>
              <ArrowLink to="/about">How we work</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Let&apos;s build something <span className="ob">exceptional.</span></>}
        blurb="Start with the sector, the space and the timeline — we will bring the rest."
      />
    </>
  )
}
