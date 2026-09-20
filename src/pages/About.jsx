import ImageSlot from '../components/ImageSlot'
import ClosingCta from '../components/ClosingCta'
import { SectionHead, Caption, Masthead, EditorialRows, Field } from '../components/Bits'
import { ArrowLink } from '../components/Bits'

const PRINCIPLES = [
  { n: '01', title: 'Mission', desc: 'To provide premium property, interior design and maintenance services tailored to the unique needs and preferences of our clients — exceeding expectations through exceptional quality and attention to detail, with a commitment to sustainability and innovation.' },
  { n: '02', title: 'Vision', desc: "To become the most trusted and respected property, interior design and maintenance company in the UAE. We set out to raise the standard for excellence and innovation, improving and expanding our services as our clients' needs evolve." },
  { n: '03', title: 'Goal', desc: 'A strong brand presence built on consistently exceptional delivery; long-term client relationships founded on understanding unique needs; a commitment to sustainability through eco-friendly materials and practices; an inclusive environment that attracts and retains talent; growth within the UAE and internationally without compromising quality; and continuous innovation informed by new technologies.' },
]

const HOW_WE_WORK = [
  { n: '01', title: 'Professional specialists', desc: 'Experienced professionals across property, design, fit-out and maintenance — accountable from first brief to final handover.' },
  { n: '02', title: 'Precise builders', desc: 'We care about the details of implementation, because the quality of a space is decided in its joints, edges and finishes.' },
  { n: '03', title: 'Brilliant ideas', desc: 'Creativity applied with discipline: bespoke solutions that reflect individual styles and preferences, never a house template.' },
]

export default function About() {
  return (
    <>
      <Masthead
        n="01"
        eyebrow="About"
        title={<>Our<br />story</>}
        meta={[
          { label: 'Location', value: 'Abu Dhabi, UAE' },
          { label: 'Disciplines', value: 'Four' },
          { label: 'Sectors', value: 'Six' },
        ]}
        kicker="Property · Interior Design · Fit-Out · General Maintenance"
      />

      <div className="band band-tall fr">
        <ImageSlot
          placeholder="Studio / project image — wide architectural crop"
          alt="Studio project — wide architectural crop"
        />
      </div>

      <section className="sect on-paper">
        <div className="wrap">
          <SectionHead n="02" title="The studio" note="Where we build your visions" />
          <div className="two">
            <div className="a-wide" data-r>
              <h2 className="d2">
                A shared passion for <span className="ob">creating inspiring spaces</span> — and for maintaining them to
                the highest standards.
              </h2>
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' }}>
              <p>
                Silver Smart began with that passion, and with a focus on sustainability and personalised solutions. We
                are committed to delivering exceptional interior design and property maintenance services across the
                United Arab Emirates.
              </p>
              <p className="dim">
                Our goal is to become the leading property, interior design and maintenance company in the UAE — known
                for creativity, professionalism and a dedication to exceeding expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sect on-paper2">
        <div className="wrap">
          <SectionHead n="03" title="Mission · Vision · Goal" note="What we hold ourselves to" />
          <EditorialRows items={PRINCIPLES} />
        </div>
      </section>

      <section className="sect on-ink">
        <div className="wrap">
          <div className="two">
            <div className="a-wide" data-r>
              <blockquote className="pull">
                “Building is not just about shelter. It&apos;s about realizing dreams, making statements, creating
                spaces where life happens.”
              </blockquote>
              <Caption left="John Aarons" right="Quoted" style={{ maxWidth: 520 }} />
            </div>
            <div className="b-narrow">
              <div className="fr" style={{ aspectRatio: '3/4', maxWidth: 420 }} data-r="mask">
                <ImageSlot placeholder="Detail — light on material" alt="Detail — light on material" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sect on-ink2">
        <div className="wrap">
          <SectionHead n="04" title="How we work" note="Every space counts" />
          <Field items={HOW_WE_WORK} stagger=".07" />
        </div>
      </section>

      <section className="sect on-paper">
        <div className="wrap">
          <SectionHead n="05" title="Sustainability" note="Responsible material decisions" />
          <div className="two">
            <div className="a stack" data-r>
              <h2 className="d3">
                <span className="ob">Sustainability</span> sits at the core of our operations.
              </h2>
              <p className="dim">
                We prioritise eco-friendly materials and sustainable practices, and hold a commitment to environmental
                responsibility across how we specify, build and maintain. It is treated as part of design quality — not
                an add-on.
              </p>
              <ArrowLink to="/services">Our commitments</ArrowLink>
            </div>
            <div className="b">
              <div className="fr" style={{ aspectRatio: '16/11' }} data-r="mask">
                <ImageSlot
                  placeholder="Material study — stone, timber, natural light"
                  alt="Material study — stone, timber and natural light"
                />
              </div>
              <Caption left="Materials" right="Eco-friendly specification" />
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Let&apos;s build something <span className="ob">exceptional.</span></>}
        blurb="Tell us about the property, the brief and the timeline — we will take it from there."
      />
    </>
  )
}
