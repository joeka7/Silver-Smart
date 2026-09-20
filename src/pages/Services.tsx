import ImageSlot from '../components/ImageSlot'
import ClosingCta from '../components/ClosingCta'
import { SectionHead, Masthead, Field, ArrowLink } from '../components/Bits'
import { SPECIALISATION } from '../data/site'
import { SERVICES } from '../data/services'
import type { ServiceSlug } from '../data/services'

/** One summary block per discipline; `key` indexes into SERVICES for n/title/slug. */
interface ServiceBlock {
  key: ServiceSlug
  lead: string
  body: string
  slot: string
}

const BLOCKS: ServiceBlock[] = [
  { key: 'property', lead: 'A property company held to global and international standards.',
    body: 'From acquisition and handover to long-term asset care, we treat property as a long-horizon responsibility — value protected by how well a building is specified, delivered and looked after.',
    slot: 'Property — building exterior' },
  { key: 'interior-design', lead: 'Highly efficient and satisfactory designs, with complete project layouts.',
    body: 'Design begins with how a space will actually be used. We resolve plan, light, circulation and material before anything is built, so the drawings answer the questions the site will ask.',
    slot: 'Interior design — concept & layout' },
  { key: 'fit-out', lead: 'We care about the details of the implementation of projects.',
    body: 'Colours, materials, decoration and the joints between them. Fit-out is where a design is either honoured or lost, so execution is managed to the same standard the drawings were held to.',
    slot: 'Fit-out — materials & finishes' },
  { key: 'maintenance', lead: 'A good service in the field of general maintenance and care for all projects.',
    body: 'Preventing problems before they happen, and resolving those that have already occurred — keeping a space performing to the standard it was built to.',
    slot: 'Maintenance — building services' },
]

export default function Services() {
  return (
    <>
      <Masthead
        n="02"
        eyebrow="Services"
        title={<>What<br /><span className="ob">we do</span></>}
        meta={[
          { label: 'Disciplines', value: 'Four' },
          { label: 'Sectors', value: 'Six' },
          { label: 'Region', value: 'UAE' },
        ]}
        kicker="Find out what we do through our extensive range of services — and how we can realise your aspirations for property and design."
      />

      <section className="sect on-paper" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          {BLOCKS.map((b, i) => {
            const svc = SERVICES[b.key]
            return (
              <div className={`svcblk${i % 2 === 1 ? ' alt' : ''}`} key={b.key}>
                <div className="im" data-r="mask">
                  <div className="fr fr-zoom">
                    <ImageSlot placeholder={b.slot} alt={b.slot} />
                  </div>
                </div>
                <div className="tx" data-r>
                  <span className="bn">{svc.n}</span>
                  <h2 className="d2" style={{ marginBottom: 'clamp(14px,2vw,24px)' }}>{svc.title}</h2>
                  <p className="lede" style={{ marginBottom: 'clamp(14px,2vw,22px)' }}>{b.lead}</p>
                  <p className="dim mw" style={{ marginBottom: 'clamp(22px,3vw,34px)' }}>{b.body}</p>
                  <ArrowLink to={`/services/${svc.slug}`}>View service</ArrowLink>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="sect on-ink">
        <div className="wrap">
          <SectionHead n="03" title="Our specialisation" note="Where our experience meets your needs" />
          <Field items={SPECIALISATION} />
          <div style={{ marginTop: 'clamp(36px,5vw,70px)' }}>
            <ArrowLink to="/projects">See the work</ArrowLink>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Have a space <span className="ob">in mind?</span></>}
        blurb="Tell us the discipline you need — or let us take the whole brief, from design through to maintenance."
      />
    </>
  )
}
