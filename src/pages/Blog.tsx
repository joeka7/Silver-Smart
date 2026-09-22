import { Link } from 'react-router-dom'
import ClosingCta from '../components/ClosingCta'
import { Masthead, SectionIndex } from '../components/UI'
import { SERVICE_LINKS } from '../data/site'
import type { StyleWithVars } from '../types/css'

/**
 * Blog index.
 *
 * The site has no published articles and no blog data source yet, so this page
 * carries the design system and the route without inventing editorial content.
 * When posts exist, render them here in place of the notice below — the card
 * and section primitives this page already uses are the ones the listing needs.
 */
export default function Blog() {
  return (
    <>
      <Masthead
        n="06"
        eyebrow="Journal"
        title={<>Silver Smart <span className="c-primary">journal</span></>}
        lede="Notes on property, interior design, fit-out and maintenance across the United Arab Emirates. The journal is being prepared — in the meantime, our work and services are the clearest picture of how we build."
        meta={[
          { label: 'Status', value: 'In preparation' },
          { label: 'Region', value: 'UAE' },
        ]}
        note="Coming soon"
      />

      <section className="section surface-lowest">
        <div className="wrap">
          <SectionIndex n="01" title="No articles yet" note="Check back shortly" />

          <div className="split">
            <div className="col-7 stack-lg" data-r>
              <h2 className="t-lg">
                The first entries are <span className="c-primary">on the way.</span>
              </h2>
              <p className="t-body c-dim">
                We are preparing a journal covering how we specify, build and maintain — material decisions, the detail
                of implementation, and what long-term care actually asks of a property. Until the first pieces are
                published, the pages below carry the same thinking.
              </p>
              <div className="hero-ctas">
                <Link to="/projects" className="btn btn-primary">
                  <span>Explore our work</span>
                  <span className="arrow" aria-hidden="true">&#8594;</span>
                </Link>
                <Link to="/start-a-project" className="btn btn-ghost">
                  <span>Start a project</span>
                </Link>
              </div>
            </div>

            <div className="col-5" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <div className="panel">
                <div className="panel-head">
                  <span className="t-label c-accent">Read instead</span>
                  <span className="t-label c-muted">Services</span>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column' }}>
                  {SERVICE_LINKS.map((s) => (
                    <li key={s.to} style={{ borderBottom: '1px solid var(--hairline-soft)' }}>
                      <Link
                        to={s.to}
                        className="flex-between"
                        style={{ padding: 'var(--space-md) 0', width: '100%' }}
                      >
                        <span className="t-sm">{s.label}</span>
                        <span className="c-accent" aria-hidden="true">&#8594;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading={<>Have a space <span className="c-primary">in mind?</span></>}
        blurb="Tell us about the property, the brief and the timeline — we will take it from there."
      />
    </>
  )
}
