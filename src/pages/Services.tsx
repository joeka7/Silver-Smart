import { Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import { SectionIndex, Masthead, FieldGrid } from '../components/UI'
import { SPECIALISATION } from '../data/site'
import { SERVICES, SERVICE_SLUGS } from '../data/services'
import type { StyleWithVars } from '../types/css'
import hero1 from '../imgs/image.webp'
import hero2 from '../imgs/image2.webp'
import hero3 from '../imgs/image3.webp'
import hero4 from '../imgs/image4.webp'

/** One photograph per discipline, drawn from the existing Silver Smart set. */
const DISCIPLINE_IMAGE: Record<string, string> = {
  property: hero1,
  'interior-design': hero2,
  'fit-out': hero3,
  maintenance: hero4,
}

/** Short technical register shown under each discipline's scope list. */
const DISCIPLINE_TAG: Record<string, string> = {
  property: 'Acquisition · Handover · Asset care',
  'interior-design': 'Plan · Light · Circulation · Material',
  'fit-out': 'Colours · Materials · Decoration',
  maintenance: 'Preventive · Reactive · General',
}

/** The delivery sequence, described from the four published disciplines. */
const PHASES = [
  { n: '01', title: 'Brief', desc: 'We start with the brief, the site and the people who will use it — understanding unique needs before anything is drawn.', note: 'Discover', key: true },
  { n: '02', title: 'Design', desc: 'Complete project layouts and personalised solutions, resolved on paper so decisions are made before work begins.', note: 'Interior design' },
  { n: '03', title: 'Specification', desc: 'Colours, materials and finishes chosen for the light, the use and the standard of finish intended.', note: 'Material & colour' },
  { n: '04', title: 'Fit-out', desc: 'Execution managed to the standard the drawings were held to, with sequence and tolerance coordinated on site.', note: 'Implementation' },
  { n: '05', title: 'Handover & care', desc: 'Handover, then general maintenance and care — keeping the space performing to the standard it was built to.', note: 'Maintenance', key: true },
]

export default function Services() {
  return (
    <>
      <Masthead
        n="02"
        eyebrow="Practice disciplines & capabilities"
        title={<>A seamless single-source <span className="c-primary">delivery model.</span></>}
        lede="Find out what we do through our extensive range of services — and how we can realise your aspirations for property and design. From first brief to long-term maintenance, without third-party dilution."
        meta={[
          { label: 'Disciplines', value: 'Four' },
          { label: 'Sectors', value: 'Six' },
          { label: 'Region', value: 'UAE' },
        ]}
        note="End-to-end execution"
      />

      {/* ===== DISCIPLINE BLOCKS ===== */}
      <section className="section surface-base" style={{ paddingTop: 0 }}>
        <div className="wrap stack-lg" style={{ gap: 'var(--space-2xl)' }}>
          {SERVICE_SLUGS.map((slug, i) => {
            const svc = SERVICES[slug]
            const alt = i % 2 === 1
            return (
              <article className={`disc${alt ? ' alt' : ''}`} data-r key={slug}>
                <div className="disc-body">
                  <div className="stack">
                    <div className="flex-between t-label">
                      <span className="c-accent" style={{ fontWeight: 600 }}>Discipline // {svc.n}</span>
                      <span className="c-muted">{DISCIPLINE_TAG[slug]}</span>
                    </div>

                    <h2 className="t-md">{svc.title}</h2>
                    <p className="t-body c-dim">{svc.lead}</p>

                    <div className="stack" style={{ gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                      <span className="t-label c-muted">Scope &amp; deliverables</span>
                      <div className="checks">
                        {svc.scope.map((s) => (
                          <span className="check" key={s.title}>
                            <span>
                              <b style={{ fontWeight: 600, color: 'var(--on-surface)' }}>{s.title}</b> — {s.desc}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="disc-foot">
                    <span>Sectors: Six</span>
                    <Link to={`/services/${svc.slug}`} className="tlink">
                      <span>View service</span>
                      <span className="arrow" aria-hidden="true">&#8594;</span>
                    </Link>
                  </div>
                </div>

                <div className="disc-media frame-zoom">
                  <img src={DISCIPLINE_IMAGE[slug]} alt={svc.bandSlot} loading="lazy" decoding="async" />
                  <div className="glass frame-cap frame-cap-dock">
                    <div>
                      <span className="t-label c-muted" style={{ display: 'block', fontSize: '0.625rem' }}>
                        Discipline
                      </span>
                      <span className="t-sm" style={{ fontSize: '0.9rem' }}>{svc.title}</span>
                    </div>
                    <span className="t-label c-accent">{svc.n} / 04</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ===== DELIVERY SEQUENCE ===== */}
      <section className="section surface-lowest" style={{ borderBlock: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <div className="split split-end" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div className="col-8" data-r>
              <span className="t-label c-accent" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Methodology // one accountable team
              </span>
              <h2 className="t-lg">The delivery sequence</h2>
            </div>
            <div className="col-4" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <p className="t-body c-dim">
                A single framework from brief to long-term care, so nothing is handed between parties who did not write
                it.
              </p>
            </div>
          </div>

          <div className="phases" data-stagger=".05">
            {PHASES.map((p) => (
              <div className={`phase${p.key ? ' is-key' : ''}`} data-r key={p.n}>
                <div className="stack" style={{ gap: 'var(--space-sm)' }}>
                  <span className="t-label c-accent">Phase {p.n}</span>
                  <h3 className="t-sm" style={{ fontSize: '1.05rem', textTransform: 'uppercase' }}>{p.title}</h3>
                  <p className="t-small c-dim">{p.desc}</p>
                </div>
                <div className="phase-foot t-label c-muted" style={{ fontSize: '0.625rem' }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIALISATION ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="03" title="Our specialisation" note="Where our experience meets your needs" />
          <FieldGrid items={SPECIALISATION} />
          <div className="mt-xl" data-r>
            <Link to="/projects" className="btn btn-ghost">
              <span>See the work</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Have a space <span className="c-primary">in mind?</span></>}
        blurb="Tell us the discipline you need — or let us take the whole brief, from design through to maintenance."
      />
    </>
  )
}
