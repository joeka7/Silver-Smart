import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import { SectionIndex, Masthead, PullQuote, TextLink } from '../components/UI'
import { SECTORS, TESTIMONIALS } from '../data/site'
import type { StyleWithVars } from '../types/css'
import hero1 from '../imgs/image.webp'
import hero2 from '../imgs/image2.webp'
import hero3 from '../imgs/image3.webp'
import hero4 from '../imgs/image4.webp'
import hero5 from '../imgs/image5.webp'

const DETAIL = '/projects/residential-interior-fit-out'

/** One photograph per sector, cycled from the existing Silver Smart set. */
const SECTOR_IMAGE: Record<string, string> = {
  s01: hero4,
  s02: hero1,
  s03: hero5,
  s04: hero2,
  s05: hero3,
  s06: hero1,
}

export default function Projects() {
  /**
   * Sector filter. "All" shows every block; selecting one narrows the list,
   * which replaces the old anchor-jump index while keeping every sector
   * reachable. Anchors (#s01 … #s06) still resolve because each block keeps
   * its id and the filter never unmounts the section wrapper.
   */
  const [active, setActive] = useState<string>('all')
  const shown = active === 'all' ? SECTORS : SECTORS.filter((s) => s.id === active)
  const [featured] = SECTORS

  return (
    <>
      <Masthead
        n="03"
        eyebrow="Portfolio archive & selected commissions"
        title={<>Selected <span className="c-primary">work</span></>}
        lede="Concepts turned into reality — builders, designers and architects working in unison, from interior design masterworks to architectural detail."
        meta={[
          { label: 'Sectors', value: 'Six' },
          { label: 'Region', value: 'UAE' },
          { label: 'Disciplines', value: 'Four' },
        ]}
        note="Commercial · Corporate · Healthcare · Residential · Hospitality · Maintenance"
      />

      {/* ===== FILTER BAR ===== */}
      <section className="wrap" style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="filters" data-r role="group" aria-label="Filter by sector">
          <button
            type="button"
            className="filter"
            aria-pressed={active === 'all'}
            onClick={() => setActive('all')}
          >
            <span className="dot" aria-hidden="true"></span>
            <span>All sectors ({SECTORS.length})</span>
          </button>
          {SECTORS.map((s) => (
            <button
              type="button"
              className="filter"
              key={s.id}
              aria-pressed={active === s.id}
              onClick={() => setActive(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SECTOR ===== */}
      {active === 'all' && (
        <section className="wrap" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <Link to={DETAIL} className="feature" data-r>
            <div className="feature-media frame-zoom">
              <img src={SECTOR_IMAGE[featured.id]} alt={featured.slotA} loading="lazy" decoding="async" />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                <span className="badge-glass">
                  <span className="c-accent">Sector // {featured.n}</span>
                  <span className="c-muted">/</span>
                  <span>{featured.cap}</span>
                </span>
              </div>
            </div>
            <div className="feature-bar">
              <div className="stack" style={{ gap: 'var(--space-sm)' }}>
                <span className="t-label c-accent">{featured.title} — {featured.cap}</span>
                <h2 className="t-md">{featured.title}</h2>
                <p className="t-body c-dim" style={{ maxWidth: '62ch' }}>{featured.desc}</p>
              </div>
              <div className="stack" style={{ gap: 'var(--space-xs)', flex: '0 0 auto' }}>
                <span className="t-label c-muted">Region: United Arab Emirates</span>
                <span className="t-label c-muted">Scope: Design &amp; Fit-Out</span>
                <span className="tlink" style={{ marginTop: '0.5rem' }}>
                  <span>View project</span>
                  <span className="arrow" aria-hidden="true">&#8594;</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ===== SECTOR BLOCKS ===== */}
      <section className="surface-base" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="wrap stack-lg" style={{ gap: 'var(--space-lg)' }}>
          {shown.map((s, i) => (
            <article className={`sector${i % 2 === 1 ? ' alt' : ''}`} id={s.id} data-r key={s.id}>
              <Link to={DETAIL} className="sector-media frame-zoom">
                <img src={SECTOR_IMAGE[s.id]} alt={s.slotA} loading="lazy" decoding="async" />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                  <span className="badge-glass">
                    <span className="dot" aria-hidden="true"></span>
                    <span>{s.cap}</span>
                  </span>
                </div>
              </Link>

              <div className="sector-body">
                <div className="stack">
                  <div className="flex-between t-label">
                    <span className="c-accent">Sector // {s.n}</span>
                    <span className="c-muted">UAE</span>
                  </div>
                  <h2 className="t-md">{s.title}</h2>
                  <p className="t-body c-dim">{s.desc}</p>

                  <div className="spec" style={{ marginTop: 'var(--space-sm)' }}>
                    <div className="spec-row">
                      <span>Focus</span>
                      <b>{s.cap}</b>
                    </div>
                    <div className="spec-row">
                      <span>Region</span>
                      <b>United Arab Emirates</b>
                    </div>
                    <div className="spec-row">
                      <span>Disciplines</span>
                      <b>Design &amp; Fit-Out</b>
                    </div>
                  </div>
                </div>

                <Link to={DETAIL} className="tlink" style={{ marginTop: 'var(--space-md)' }}>
                  <span>View project</span>
                  <span className="arrow" aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== CLIENT VOICE ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="04" title="Client voice" note="In their words" />
          <div className="split">
            <div className="col-7" data-r>
              <PullQuote name={TESTIMONIALS[0].name} role={TESTIMONIALS[0].role}>
                {TESTIMONIALS[0].quote}
              </PullQuote>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p className="t-body c-dim">
                Every project is a test of the same three things: how it was planned, how it was built, and how it is
                kept.
              </p>
              <TextLink to="/about" rule>How we work</TextLink>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Let&apos;s build something <span className="c-primary">exceptional.</span></>}
        blurb="Start with the sector, the space and the timeline — we will bring the rest."
      />
    </>
  )
}
