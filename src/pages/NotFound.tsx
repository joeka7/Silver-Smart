import { Link } from 'react-router-dom'
import { Masthead, TextLink } from '../components/UI'
import type { StyleWithVars } from '../types/css'

export default function NotFound() {
  return (
    <>
      <Masthead
        n="404"
        eyebrow="Not found"
        title={<>Page not <span className="c-primary">found</span></>}
        lede="The page you are looking for has moved or no longer exists."
        meta={[
          { label: 'Status', value: '404' },
          { label: 'Region', value: 'UAE' },
        ]}
      />

      <section className="section surface-lowest">
        <div className="wrap">
          <div className="split">
            <div className="col-7" data-r>
              <h2 className="t-lg">Let us point you back to the work.</h2>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <TextLink to="/" rule>Return home</TextLink>
              <TextLink to="/projects" rule>Selected work</TextLink>
              <TextLink to="/services" rule>All services</TextLink>
              <Link to="/start-a-project" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <span>Start a project</span>
                <span className="arrow" aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
