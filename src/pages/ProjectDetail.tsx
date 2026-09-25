import { Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import { SectionIndex, Masthead, EditorialRows, PullQuote, TextLink } from '../components/UI'
import { TESTIMONIALS } from '../data/site'
import type { NumberedItem } from '../data/site'
import type { StyleWithVars } from '../types/css'
import hero2 from '../imgs/image2.webp'
import hero3 from '../imgs/image3.webp'
import hero4 from '../imgs/image4.webp'
import hero5 from '../imgs/image5.webp'

const DETAILS: NumberedItem[] = [
  { n: '01', title: 'Layout', desc: 'Circulation and sightlines studied against how the home is actually lived in, then fixed in a complete project layout.' },
  { n: '02', title: 'Joinery', desc: 'Built elements designed for their position rather than selected to fill it, with tolerances resolved on paper first.' },
  { n: '03', title: 'Finishes', desc: 'Colours, materials and decoration carried through specification to the item installed — and protected until handover.' },
]

const FACTS = [
  { k: 'Sector', v: 'Residential' },
  { k: 'Disciplines', v: 'Interior design, Fit-out' },
  { k: 'Region', v: 'United Arab Emirates' },
]

export default function ProjectDetail() {
  return (
    <>
      <Masthead
        n="04"
        eyebrow="Project"
        title={<>Residential <span className="c-primary">interior &amp; fit-out</span></>}
        lede="One brief, one team: layout, joinery, finishes and services coordinated to a single standard of execution."
        meta={[
          { label: 'Sector', value: 'Residential' },
          { label: 'Disciplines', value: 'Design & Fit-out' },
          { label: 'Region', value: 'UAE' },
        ]}
        note="Selected work"
      />

      {/* ===== HERO BAND ===== */}
      <section className="wrap" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="frame frame-zoom" data-r style={{ width: '100%', aspectRatio: '21 / 9', minHeight: 260 }}>
          <img src={hero2} alt="Project hero — full-bleed interior" loading="lazy" decoding="async" />
          <div className="glass frame-cap frame-cap-dock">
            <div className="flex-between gap-sm" style={{ justifyContent: 'flex-start' }}>
              <span className="dot dot-pulse" aria-hidden="true"></span>
              <div>
                <span className="t-label c-muted" style={{ display: 'block', fontSize: '0.625rem' }}>Sector</span>
                <span className="t-sm" style={{ fontSize: '0.9rem' }}>Residential</span>
              </div>
            </div>
            <span className="t-label c-accent">Design &amp; Fit-Out</span>
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="section surface-lowest" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ paddingTop: 'var(--space-2xl)' }}>
          <SectionIndex n="01" title="Overview" note="Residential" />

          <div className="split">
            <div className="col-7" data-r>
              <h2 className="t-lg">
                Rethinking what is typically seen as a regular interior — and turning it into{' '}
                <span className="c-primary">an outstanding plan.</span>
              </h2>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p className="t-body c-dim">
                The brief was handled end to end: interior design through fit-out, with the same team accountable for
                the drawings and for what was built from them.
              </p>
              <p className="t-body c-dim">
                Decisions on plan, light and material were resolved before work began, so the execution stage was about
                quality of finish rather than resolving open questions on site.
              </p>
            </div>
          </div>

          <div className="spec mt-xl" style={{ maxWidth: 640 }} data-r>
            {FACTS.map((f) => (
              <div className="spec-row" key={f.k}>
                <span>{f.k}</span>
                <b>{f.v}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="02" title="The space" note="Plan · Joinery · Finish" />

          <div className="split split-start" style={{ alignItems: 'stretch' }}>
            <div className="col-7" data-r>
              <div className="frame frame-zoom" style={{ aspectRatio: '4 / 3', height: '100%' }}>
                <img src={hero3} alt="Interior — principal space" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <div className="frame frame-zoom" style={{ aspectRatio: '4 / 3' }}>
                <img src={hero4} alt="Joinery detail" loading="lazy" decoding="async" />
              </div>
              <div className="frame frame-zoom" style={{ aspectRatio: '4 / 3' }}>
                <img src={hero5} alt="Material and finish detail" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAILS ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="03" title="Details" note="Where quality is decided" />
          <EditorialRows items={DETAILS} />
        </div>
      </section>

      {/* ===== CLIENT VOICE ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <div className="split">
            <div className="col-7" data-r>
              <PullQuote name={TESTIMONIALS[0].name} role="Residential client">
                {TESTIMONIALS[0].quote}
              </PullQuote>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p className="t-body c-dim">
                After handover, the same team stays available for general maintenance and care — so the space keeps the
                standard it was built to.
              </p>
              <TextLink to="/services/maintenance" rule>Maintenance</TextLink>
            </div>
          </div>

          <div className="pager mt-xl">
            <span className="t-label c-muted">Next sector</span>
            <Link to="/projects#s05">
              Hospitality <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Have a space <span className="c-primary">in mind?</span></>}
        blurb="Tell us about the property, the brief and the timeline."
      />
    </>
  )
}
