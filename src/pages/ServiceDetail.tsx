import { useParams, Navigate, Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import { SectionIndex, Masthead, EditorialRows, TextLink } from '../components/UI'
import { SERVICES, SERVICE_IMAGE, isServiceSlug } from '../data/services'
import type { StyleWithVars } from '../types/css'
import hero5 from '../imgs/image5.webp'

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
        lede={svc.kicker}
        meta={[
          { label: 'Discipline', value: svc.title },
          { label: 'Region', value: 'UAE' },
          { label: 'Sectors', value: 'Six' },
        ]}
        note="Property · Interiors · Fit-Out · Maintenance"
      />

      {/* ===== BAND ===== */}
      <section className="wrap" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="frame frame-zoom" data-r style={{ width: '100%', aspectRatio: '21 / 9', minHeight: 240 }}>
          <img src={SERVICE_IMAGE[slug]} alt={svc.bandSlot} loading="lazy" decoding="async" />
          <div className="glass frame-cap frame-cap-dock">
            <div>
              <span className="t-label c-muted" style={{ display: 'block', fontSize: '0.625rem' }}>Discipline</span>
              <span className="t-sm" style={{ fontSize: '0.9rem' }}>{svc.title}</span>
            </div>
            <span className="t-label c-accent">{svc.n} / 04</span>
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="section surface-lowest" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ paddingTop: 'var(--space-2xl)' }}>
          <SectionIndex n="01" title="Overview" note={svc.title} />

          <div className="split">
            <div className="col-7" data-r>
              <h2 className="t-lg">{svc.lead}</h2>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              {svc.body.map((para) => (
                <p key={para} className="t-body c-dim">{para}</p>
              ))}
              <TextLink to="/start-a-project" rule>{svc.ctaLabel}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCOPE ===== */}
      <section className="section surface-base">
        <div className="wrap">
          <SectionIndex n="02" title="What it covers" note="Scope" />
          <EditorialRows items={svc.scope} />

          <div className="split mt-xl" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div className="col-6" data-r>
              <div className="frame frame-zoom" style={{ aspectRatio: '4 / 3' }}>
                <img src={hero5} alt={svc.detailSlot} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="col-6 stack" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <span className="t-label c-muted">Sectors served</span>
              <h3 className="t-md">Commercial · Corporate · Healthcare · Residential · Hospitality</h3>
              <p className="t-body c-dim">
                Every space counts. The same team, the same standard, whichever sector the brief sits in.
              </p>
              <TextLink to="/projects" rule>Selected work</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAGER ===== */}
      <section className="surface-lowest">
        <div className="wrap">
          <div className="pager">
            <span className="t-label c-muted">Next service</span>
            <Link to={svc.next.to}>
              {svc.next.label} <span aria-hidden="true">&#8594;</span>
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
