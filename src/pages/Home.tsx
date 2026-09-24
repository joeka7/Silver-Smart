import { Link } from 'react-router-dom'
import HeroMedia from '../components/HeroMedia'
import { SectionIndex, TextLink } from '../components/UI'
import { HOME_SERVICES, HOME_WORK, WHY, CONTACT } from '../data/site'
import type { StyleWithVars } from '../types/css'
import introImg from '../imgs/Introduction.webp'
import closingVid from '../videos/hero-vid.mp4'
import hero3 from '../imgs/image3.webp'
import hero4 from '../imgs/image4.webp'

/** Scope tags per discipline, drawn from each service's published scope. */
const SERVICE_TAGS: Record<string, string[]> = {
  '01': ['Standards', 'Handover', 'Long-term care'],
  '02': ['Spatial planning', 'Complete layouts', 'Material & colour'],
  '03': ['Colours & materials', 'Finishes', 'Implementation detail'],
  '04': ['Preventive care', 'Reactive response', 'General maintenance'],
}

/** Hero ticker — only facts the site already publishes. */
const TICKER = [
  { v: 'Four', k: 'Disciplines under one team' },
  { v: 'Six', k: 'Sectors served', accent: true },
  { v: 'Abu Dhabi', k: 'Main office, UAE' },
  { v: 'End to end', k: 'Design through maintenance' },
]

export default function Home() {
  const [featured, ...secondary] = HOME_WORK

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-box">
          <HeroMedia />
          <div className="hero-scrim" aria-hidden="true"></div>

          <div className="hero-top">
            <div className="hero-pill t-label">
              <span className="dot dot-pulse" aria-hidden="true"></span>
              <span>{CONTACT.office} · Property &amp; Interiors</span>
            </div>
            <div className="hero-coords t-label" style={{ fontSize: '0.625rem' }}>
              <span>Property</span>
              <span className="c-accent">•</span>
              <span>Interior Design</span>
              <span className="c-accent">•</span>
              <span>Fit-Out</span>
              <span className="c-accent">•</span>
              <span>Maintenance</span>
            </div>
          </div>

          <div className="hero-body">
            <div className="hero-inner">
              <div className="hero-kicker" data-r>
                <span className="rule" aria-hidden="true"></span>
                <span className="t-label c-primary">Every space counts</span>
              </div>

              <h1 className="t-hero hero-h1" data-r>
                Spaces<br />
                <span className="hero-underline">with purpose.</span>
              </h1>

              <p
                className="t-lede"
                data-r
                style={{ maxWidth: '44ch', '--dl': '.08s' } as StyleWithVars}
              >
                A property, interior design, fit-out and general maintenance company based in the United Arab
                Emirates — dedicated to creating inspiring spaces and maintaining properties to the highest
                standards.
              </p>

              <div className="hero-ctas" data-r style={{ '--dl': '.14s' } as StyleWithVars}>
                <Link to="/projects" className="btn btn-primary">
                  <span>Explore our work</span>
                </Link>
                <Link to="/about" className="btn btn-glass">
                  <span>Our studio</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-ticker">
            <div className="hero-ticker-in">
              {TICKER.map((t) => (
                <div key={t.k}>
                  <div className="hero-ticker-v" style={t.accent ? { color: 'var(--primary-container)' } : undefined}>
                    {t.v}
                  </div>
                  <div className="hero-ticker-k">{t.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 01 — INTRODUCTION ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="01" title="Introduction" note="Where we build your visions" />

          <div className="split split-fill">
            <div className="col-6 stack-lg">
              <h2 className="t-lg" data-r>
                We create spaces where <span className="c-primary">design, functionality</span> and precision come
                together.
              </h2>

              <div className="stack" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
                <p className="t-body c-dim">
                  Silver Smart is a property, interior design, fit-out and general maintenance company based in the
                  United Arab Emirates. We are dedicated to creating inspiring spaces and maintaining properties to
                  the highest standards.
                </p>
                <p className="t-body c-dim">
                  Our team of experienced professionals delivers bespoke interior design and property maintenance
                  solutions that reflect individual styles and preferences. Sustainability sits at the core of our
                  operations, as we prioritise eco-friendly materials and sustainable practices.
                </p>
              </div>

              <div className="pills" data-r style={{ '--dl': '.12s' } as StyleWithVars}>
                <div className="pill">
                  <span className="t-label c-accent">01 / Single accountable team</span>
                  <span className="t-sm">Design through maintenance</span>
                  <p className="t-small c-muted">
                    One team accountable from first brief to final handover — and for keeping the space afterwards.
                  </p>
                </div>
                <div className="pill">
                  <span className="t-label c-accent">02 / Sustainability</span>
                  <span className="t-sm">Eco-friendly specification</span>
                  <p className="t-small c-muted">
                    Eco-friendly materials and sustainable practices treated as part of design quality, not an add-on.
                  </p>
                </div>
              </div>

              <div data-r>
                <TextLink to="/about" rule>About the studio</TextLink>
              </div>
            </div>

            <div className="col-6" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <div className="frame frame-zoom frame-fill">
                <img src={introImg} alt="A Silver Smart interior, delivered end to end" loading="lazy" decoding="async" />
                <div className="glass frame-cap">
                  <div>
                    <span className="t-label c-accent" style={{ display: 'block' }}>Selected work</span>
                    <p className="t-sm" style={{ fontSize: '0.9rem', marginTop: '0.15rem' }}>
                      Interior design &amp; fit-out
                    </p>
                  </div>
                  <div className="flex-between gap-sm">
                    <span className="t-label c-muted" style={{ fontSize: '0.625rem' }}>United Arab Emirates</span>
                    <span className="dot dot-pulse" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02 — DISCIPLINES ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="02" title="Core disciplines & capabilities" note="Four disciplines, one accountable team" />

          <div className="split split-end" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div className="col-8" data-r>
              <h2 className="t-lg">
                From first sketch to<br />turnkey handover.
              </h2>
            </div>
            <div className="col-4" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <p className="t-body c-dim">
                A seamless single-source delivery model, so decisions are made once and carried through to what is
                actually built.
              </p>
            </div>
          </div>

          <div className="rows" data-stagger=".05">
            {HOME_SERVICES.map((s) => (
              <div data-r key={s.n}>
                <Link to={s.to} className="row-item">
                  <div className="row-grid">
                    <div className="row-n">
                      <span className="num">{s.n} /</span>
                      <span className="t-label c-muted label-m">Discipline</span>
                    </div>
                    <div className="row-t">
                      <h3 className="t-sm">{s.title}</h3>
                    </div>
                    <div className="row-d">
                      <p className="t-small c-dim">{s.desc}</p>
                      <div className="tags">
                        {(SERVICE_TAGS[s.n] ?? []).map((t) => (
                          <span className="tag" key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="row-a">
                      <span className="row-mark" aria-hidden="true">&#8599;</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex-between mt-xl">
            <TextLink to="/services" rule>View all services</TextLink>
            <span className="t-label c-muted">Every space counts</span>
          </div>
        </div>
      </section>

      {/* ===== 03 — SELECTED WORK ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="03" title="Selected work" note="Six sectors · United Arab Emirates" />

          <div className="split" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div className="col-8" data-r>
              <p className="t-lede">
                We are proud of a portfolio where concepts became reality. Builders, designers and architects working
                in unison — from interior design masterworks to architectural detail.
              </p>
            </div>
            <div className="col-4" data-r style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
              <TextLink to="/projects">Explore all sectors</TextLink>
            </div>
          </div>

          {/* Featured sector */}
          <Link to="/projects" className="feature" data-r style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <div className="feature-media frame-zoom">
              <img src={hero3} alt={featured.slot} loading="lazy" decoding="async" />
            </div>
            <div className="feature-bar">
              <div className="stack" style={{ gap: 'var(--space-sm)' }}>
                <div className="flex-between gap-sm" style={{ justifyContent: 'flex-start' }}>
                  <span className="badge">Featured sector</span>
                  <span className="t-label c-muted">{featured.loc}</span>
                </div>
                <h3 className="t-md">{featured.title}</h3>
                <p className="t-small c-dim" style={{ maxWidth: '62ch' }}>{featured.desc}</p>
              </div>
              <div className="flex-between gap-sm" style={{ flex: '0 0 auto' }}>
                <div>
                  <span className="t-label c-muted" style={{ display: 'block', fontSize: '0.625rem' }}>Scope</span>
                  <span className="t-label">Design &amp; Fit-Out</span>
                </div>
                <span className="row-mark" aria-hidden="true">&#8594;</span>
              </div>
            </div>
          </Link>

          {/* Secondary: one wide card beside the capability rail */}
          <div className="split split-start" style={{ alignItems: 'stretch' }}>
            <div className="col-7" data-r>
              <Link to="/projects" className="card frame-zoom">
                <div className="card-media" style={{ aspectRatio: '16 / 10' }}>
                  <img src={hero4} alt={secondary[0].slot} loading="lazy" decoding="async" />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <span className="badge-glass">{secondary[0].title}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span>{secondary[0].title}</span>
                    <span>{secondary[0].loc ?? 'United Arab Emirates'}</span>
                  </div>
                  <h4 className="t-sm">{secondary[0].title}</h4>
                  <p className="t-small c-dim">{secondary[0].desc}</p>
                  <div className="card-foot">
                    <span className="t-label c-accent">View sector &#8594;</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-5" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <div
                className="card"
                style={{ background: 'var(--surface-container)', padding: 'clamp(1.25rem, 2.5vw, 2.5rem)', gap: 'var(--space-lg)' }}
              >
                <div className="stack">
                  <div className="flex-between gap-sm" style={{ justifyContent: 'flex-start' }}>
                    <span className="dot" aria-hidden="true"></span>
                    <span className="t-label c-accent">Why Silver Smart</span>
                  </div>
                  <h4 className="t-sm">Precision carried through to what is built</h4>
                  <p className="t-small c-dim">
                    The quality of a space is decided in its joints, edges and finishes — so the same team is
                    accountable for the drawings and for what is built from them.
                  </p>
                </div>

                <div className="stack">
                  {WHY.map((w) => (
                    <div className="metric" key={w.title}>
                      <div className="metric-top">
                        <span className="t-label">{w.title}</span>
                        <span className="dot" aria-hidden="true"></span>
                      </div>
                      <p className="t-small c-dim">{w.desc}</p>
                    </div>
                  ))}
                </div>

                <Link to="/start-a-project" className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Start a project</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Remaining sectors */}
          <div className="tiles mt-xl" data-stagger=".05">
            {secondary.slice(1).map((p) => (
              <Link to="/projects" className="tile" data-r key={p.n} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                <span className="t-label c-accent">{p.n}</span>
                <span className="tile-n" style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>{p.title}</span>
                <span className="t-label c-muted" style={{ fontSize: '0.5625rem' }}>{p.loc ?? 'Sector'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 04 — CLOSING ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <div className="closing" style={{ padding: 'clamp(1.5rem, 4vw, 4rem)' }}>
            <video
              className="closing-video"
              src={closingVid}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            />
            <div className="closing-scrim" aria-hidden="true"></div>
            <div className="closing-grid">
              <div className="closing-a">
                <div className="sindex t-label" data-r style={{ marginBottom: 0 }}>
                  <span className="dot" aria-hidden="true"></span>
                  <span className="sindex-n">04 // Start</span>
                </div>
                <h2 className="t-lg" data-r>
                  Have a space<br /><span className="c-primary">in mind?</span>
                </h2>
                <p className="t-lede" data-r style={{ maxWidth: '46ch' }}>
                  Let&apos;s build something exceptional. Tell us about the property, the brief and the timeline.
                </p>
                <div className="hero-ctas" data-r>
                  <Link to="/start-a-project" className="btn btn-primary">
                    <span>Start a project</span>
                  </Link>
                  <Link to="/services" className="btn btn-ghost">
                    <span>All services</span>
                  </Link>
                </div>
              </div>

              <div className="closing-b" data-r>
                <div className="t-label c-muted" style={{ textAlign: 'left', lineHeight: 1.8 }}>
                  <span style={{ display: 'block', color: 'var(--on-surface)' }}>{CONTACT.office}</span>
                  <a href={CONTACT.mobile.href}>{CONTACT.mobile.label}</a><br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
