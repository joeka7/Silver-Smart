import { Masthead, ArrowLink } from '../components/Bits'

export default function NotFound() {
  return (
    <>
      <Masthead
        n="—"
        eyebrow="Not found"
        title={<>Page not<br /><span className="ob">found</span></>}
        meta={[
          { label: 'Status', value: '404' },
          { label: 'Region', value: 'UAE' },
        ]}
        kicker="The page you are looking for has moved or no longer exists."
      />
      <section className="sect on-paper">
        <div className="wrap">
          <div className="two">
            <div className="a-wide" data-r>
              <h2 className="d2">Let us point you back to the work.</h2>
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' }}>
              <ArrowLink to="/">Return home</ArrowLink>
              <ArrowLink to="/projects">Selected work</ArrowLink>
              <ArrowLink to="/start-a-project">Start a project</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
