import ClosingCta from '../components/ClosingCta'
import { SectionIndex, Masthead, Ledger, EditorialRows, FieldGrid, PullQuote, TextLink } from '../components/UI'
import type { LedgerStat, NumberedEntry } from '../components/UI'
import { TESTIMONIALS } from '../data/site'
import type { StyleWithVars } from '../types/css'
import hero1 from '../imgs/image.webp'
import hero3 from '../imgs/image3.webp'
import hero5 from '../imgs/image5.webp'

const PRINCIPLES: NumberedEntry[] = [
  { n: '01', title: 'Mission', desc: 'To provide premium property, interior design and maintenance services tailored to the unique needs and preferences of our clients — exceeding expectations through exceptional quality and attention to detail, with a commitment to sustainability and innovation.' },
  { n: '02', title: 'Vision', desc: "To become the most trusted and respected property, interior design and maintenance company in the UAE. We set out to raise the standard for excellence and innovation, improving and expanding our services as our clients' needs evolve." },
  { n: '03', title: 'Goal', desc: 'A strong brand presence built on consistently exceptional delivery; long-term client relationships founded on understanding unique needs; a commitment to sustainability through eco-friendly materials and practices; an inclusive environment that attracts and retains talent; growth within the UAE and internationally without compromising quality; and continuous innovation informed by new technologies.' },
]

const HOW_WE_WORK: NumberedEntry[] = [
  { n: '01', title: 'Professional specialists', desc: 'Experienced professionals across property, design, fit-out and maintenance — accountable from first brief to final handover.' },
  { n: '02', title: 'Precise builders', desc: 'We care about the details of implementation, because the quality of a space is decided in its joints, edges and finishes.' },
  { n: '03', title: 'Brilliant ideas', desc: 'Creativity applied with discipline: bespoke solutions that reflect individual styles and preferences, never a house template.' },
]

/** Only facts the site already publishes — no invented statistics. */
const STATS: LedgerStat[] = [
  { label: 'Main office', value: 'Abu Dhabi', note: 'United Arab Emirates', small: true },
  { label: 'Disciplines', value: 'Four', note: 'Property, Interior Design, Fit-Out, Maintenance' },
  { label: 'Sectors', value: 'Six', note: 'Commercial to Maintenance, across the Emirates' },
  { label: 'Delivery', value: 'End to end', note: 'One accountable team, brief through handover', small: true },
]

export default function About() {
  return (
    <>
      <Masthead
        n="01"
        eyebrow="Studio profile"
        title={<>Our <span className="c-primary">story</span></>}
        lede="Silver Smart began with a shared passion for creating inspiring spaces — and for maintaining them to the highest standards, with a focus on sustainability and personalised solutions."
        meta={[
          { label: 'Location', value: 'Abu Dhabi, UAE' },
          { label: 'Disciplines', value: 'Four' },
          { label: 'Sectors', value: 'Six' },
        ]}
        note="Property · Interiors · Fit-Out · Maintenance"
      />

      <section className="wrap" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <Ledger stats={STATS} />
      </section>

      {/* ===== 02 — PHILOSOPHY ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="02" title="Philosophy & methodology" note="Where we build your visions" />

          <div className="split">
            <div className="col-6 stack-lg">
              <h2 className="t-lg" data-r>
                A shared passion for <span className="c-primary">creating inspiring spaces</span> — and for maintaining
                them.
              </h2>

              <div className="stack" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
                <p className="t-body c-dim">
                  Silver Smart is committed to delivering exceptional interior design and property maintenance services
                  across the United Arab Emirates. Our goal is to become the leading property, interior design and
                  maintenance company in the UAE — known for creativity, professionalism and a dedication to exceeding
                  expectations.
                </p>
                <p className="t-body c-dim">
                  We eliminate the traditional friction between conceptual sketches and physical completion. By keeping
                  design, fit-out and maintenance capability inside one team, decisions are made once, with the whole
                  life of the property in view.
                </p>
              </div>

              <div className="pills" data-r style={{ '--dl': '.12s' } as StyleWithVars}>
                <div className="pill">
                  <span className="t-label c-accent">01 / Sustainability</span>
                  <span className="t-sm">Eco-friendly specification</span>
                  <p className="t-small c-muted">
                    Sustainability sits at the core of our operations — eco-friendly materials and sustainable practices
                    treated as part of design quality.
                  </p>
                </div>
                <div className="pill">
                  <span className="t-label c-accent">02 / Personalisation</span>
                  <span className="t-sm">Bespoke, never templated</span>
                  <p className="t-small c-muted">
                    Solutions that reflect individual styles and preferences, rather than a house style applied to a
                    floor plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <div className="frame frame-zoom" style={{ aspectRatio: '16 / 11' }}>
                <img src={hero1} alt="Silver Smart interior, delivered end to end" loading="lazy" decoding="async" />
                <div className="glass frame-cap">
                  <div>
                    <span className="t-label c-accent" style={{ display: 'block' }}>Main office</span>
                    <p className="t-sm" style={{ fontSize: '0.9rem', marginTop: '0.15rem' }}>Abu Dhabi, UAE</p>
                  </div>
                  <div className="flex-between gap-sm">
                    <span className="t-label c-muted" style={{ fontSize: '0.625rem' }}>Every space counts</span>
                    <span className="dot dot-pulse" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 — MISSION / VISION / GOAL ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="03" title="Mission · Vision · Goal" note="What we hold ourselves to" />
          <EditorialRows items={PRINCIPLES} />
        </div>
      </section>

      {/* ===== 04 — HOW WE WORK ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="04" title="How we work" note="Every space counts" />

          <div className="split split-end" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div className="col-7" data-r>
              <h2 className="t-lg">Accountable specialists on every brief.</h2>
            </div>
            <div className="col-5" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <p className="t-body c-dim">
                Whether the brief is a single room, a full fit-out or a maintenance contract, it is handled by the same
                team to the same standard.
              </p>
            </div>
          </div>

          <FieldGrid items={HOW_WE_WORK} />
        </div>
      </section>

      {/* ===== 05 — SUSTAINABILITY ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="05" title="Sustainability" note="Responsible material decisions" />

          <div className="split">
            <div className="col-6 stack-lg" data-r>
              <h2 className="t-md">
                <span className="c-primary">Sustainability</span> sits at the core of our operations.
              </h2>
              <p className="t-body c-dim">
                We prioritise eco-friendly materials and sustainable practices, and hold a commitment to environmental
                responsibility across how we specify, build and maintain. It is treated as part of design quality — not
                an add-on.
              </p>
              <div>
                <TextLink to="/services" rule>Our services</TextLink>
              </div>
            </div>

            <div className="col-6" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <div className="frame frame-zoom" style={{ aspectRatio: '16 / 11' }}>
                <img src={hero5} alt="Material study — finish and natural light" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 06 — CLIENT VOICE ===== */}
      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="06" title="Client voice" note="In their words" />

          <div className="split">
            <div className="col-7" data-r>
              <PullQuote name={TESTIMONIALS[2].name} role={TESTIMONIALS[2].role}>
                {TESTIMONIALS[2].quote}
              </PullQuote>
            </div>
            <div className="col-5" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <div className="frame" style={{ aspectRatio: '3 / 4', maxWidth: 420 }}>
                <img src={hero3} alt="Detail — light on material" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Let&apos;s build something <span className="c-primary">exceptional.</span></>}
        blurb="Tell us about the property, the brief and the timeline — we will take it from there."
      />
    </>
  )
}
