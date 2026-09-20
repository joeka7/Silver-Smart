import { useParams, Navigate, Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import ClosingCta from '../components/ClosingCta'
import { SectionHead, Masthead, Caption, EditorialRows, ArrowLink } from '../components/Bits'
import { SERVICES, isServiceSlug } from '../data/services'
import type { StyleWithVars } from '../types/css'

/** One template for all four service pages — they share structure in the design. */
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()

  if (!isServiceSlug(slug)) return <Navigate to="/services" replace />

  const svc = SERVICES[slug]

  return (
    <>
      <Masthead
        n={svc.n}
        eyebrow="Service"
        title={svc.title}
        meta={[
          { label: 'Discipline', value: svc.title },
          { label: 'Region', value: 'UAE' },
          { label: 'Sectors', value: 'Six' },
        ]}
        kicker={svc.kicker}
      />

      <div className="band band-tall fr">
        <ImageSlot placeholder={svc.bandSlot} alt={svc.bandSlot} />
      </div>

      <section className="sect on-paper">
        <div className="wrap">
          <SectionHead n="01" title="Overview" note={svc.title} />
          <div className="two">
            <div className="a-wide" data-r>
              <h2 className="d2">{svc.lead}</h2>
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              {svc.body.map((para, i) => (
                <p key={para} className={i > 0 ? 'dim' : undefined}>{para}</p>
              ))}
              <ArrowLink to="/start-a-project">{svc.ctaLabel}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="sect on-ink">
        <div className="wrap">
          <SectionHead n="02" title="What it covers" note="Scope" />
          <EditorialRows items={svc.scope} />

          <div className="two" style={{ marginTop: 'clamp(44px,6vw,90px)' }}>
            <div className="a">
              <div className="fr" style={{ aspectRatio: '4/3' }} data-r="mask">
                <ImageSlot placeholder={svc.detailSlot} alt={svc.detailSlot} />
              </div>
              <Caption left={svc.title} right="Detail" />
            </div>
            <div className="b stack" data-r>
              <p className="meta dim">Sectors served</p>
              <p className="d4">Commercial · Corporate · Healthcare · Residential · Hospitality</p>
              <p className="dim mw">
                Every space counts. The same team, the same standard, whichever sector the brief sits in.
              </p>
              <ArrowLink to="/projects">Selected work</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="on-ink2" style={{ paddingBlock: 'clamp(10px,2vw,20px)' }}>
        <div className="wrap">
          <div className="next">
            <span className="meta dim">Next service</span>
            <Link to={svc.next.to} className="d3">
              {svc.next.label} <span className="ar">&#8594;</span>
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
