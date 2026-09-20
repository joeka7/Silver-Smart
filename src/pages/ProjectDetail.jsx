import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import ClosingCta from '../components/ClosingCta'
import { SectionHead, Masthead, Caption, EditorialRows, ArrowLink } from '../components/Bits'

const DETAILS = [
  { n: '01', title: 'Layout', desc: 'Circulation and sightlines studied against how the home is actually lived in, then fixed in a complete project layout.' },
  { n: '02', title: 'Joinery', desc: 'Built elements designed for their position rather than selected to fill it, with tolerances resolved on paper first.' },
  { n: '03', title: 'Finishes', desc: 'Colours, materials and decoration carried through specification to the item installed — and protected until handover.' },
]

const FACTS = [
  { n: 'Sector', title: 'Residential', desc: '' },
  { n: 'Disciplines', title: 'Interior design, Fit-out', desc: '' },
  { n: 'Region', title: 'United Arab Emirates', desc: '' },
]

export default function ProjectDetail() {
  return (
    <>
      <Masthead
        n="04"
        eyebrow="Project"
        title={<>Residential<br /><span className="ser ital">interior &amp; fit-out</span></>}
        meta={[
          { label: 'Sector', value: 'Residential' },
          { label: 'Disciplines', value: 'Design & Fit-out' },
          { label: 'Region', value: 'UAE' },
        ]}
        kicker="One brief, one team: layout, joinery, finishes and services coordinated to a single standard of execution."
      />

      <div className="band band-tall fr">
        <ImageSlot placeholder="Project hero — full-bleed interior" alt="Project hero — full-bleed interior" />
      </div>

      <section className="sect on-paper">
        <div className="wrap">
          <SectionHead n="01" title="Overview" note="Residential" />
          <div className="two">
            <div className="a-wide" data-r>
              <h2 className="d2">
                Rethinking what is typically seen as a regular interior — and turning it into{' '}
                <span className="ob">an outstanding plan</span>.
              </h2>
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' }}>
              <p>
                The brief was handled end to end: interior design through fit-out, with the same team accountable for
                the drawings and for what was built from them.
              </p>
              <p className="dim">
                Decisions on plan, light and material were resolved before work began, so the execution stage was about
                quality of finish rather than resolving open questions on site.
              </p>
            </div>
          </div>

          <div className="field" style={{ marginTop: 'clamp(48px,6vw,96px)' }} data-stagger=".06">
            {FACTS.map((f) => (
              <div data-r key={f.n}>
                <span className="n">{f.n}</span>
                <p className="d4">{f.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sect on-paper2">
        <div className="wrap">
          <SectionHead n="02" title="The space" note="Sequence" />
          <div className="seq">
            <div className="s1" data-r="mask">
              <div className="fr fr-zoom">
                <ImageSlot placeholder="Living space — wide crop" alt="Living space — wide crop" />
              </div>
              <Caption left="Living" right="Plan & light" />
            </div>
            <div className="s2" data-r="mask" style={{ '--dl': '.08s' }}>
              <div className="fr fr-zoom">
                <ImageSlot placeholder="Joinery detail — portrait crop" alt="Joinery detail — portrait crop" />
              </div>
              <Caption left="Joinery" right="Detail" />
            </div>
            <div className="s3" data-r="mask" style={{ '--dl': '.12s' }}>
              <div className="fr fr-zoom">
                <ImageSlot placeholder="Material & finish — panoramic crop" alt="Material and finish — panoramic crop" />
              </div>
              <Caption left="Materials" right="Finish" />
            </div>
          </div>
        </div>
      </section>

      <section className="sect on-ink">
        <div className="wrap">
          <SectionHead n="03" title="Details" note="Where quality is decided" />
          <EditorialRows items={DETAILS} />
        </div>
      </section>

      <section className="sect on-ink2">
        <div className="wrap">
          <div className="two">
            <div className="a-wide" data-r>
              <blockquote className="pull">
                “Silver Smart delivered beyond our expectations. Their team not only completed our project on time but
                also stayed within our budget.”
              </blockquote>
              <Caption left="Mohammad Ali" right="Residential client" style={{ maxWidth: 520 }} />
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' }}>
              <p className="dim">
                After handover, the same team stays available for general maintenance and care — so the space keeps the
                standard it was built to.
              </p>
              <ArrowLink to="/services/maintenance">Maintenance</ArrowLink>
            </div>
          </div>

          <div className="next" style={{ marginTop: 'clamp(44px,6vw,90px)' }}>
            <span className="meta dim">Next project</span>
            <Link to="/projects#s05" className="d3">
              Hospitality <span className="ar">&#8594;</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Have a space <span className="ob">in mind?</span></>}
        blurb="Tell us about the property, the brief and the timeline."
      />
    </>
  )
}
