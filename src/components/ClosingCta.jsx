import { Link } from 'react-router-dom'
import ImageSlot from './ImageSlot'
import { CONTACT } from '../data/site'

/**
 * Closing CTA band — `.cta` from ss.css, used by About, Services,
 * Projects, Project Detail and the four service pages.
 */
export default function ClosingCta({ heading, blurb, slot = 'Closing image — architectural interior' }) {
  return (
    <section className="cta">
      <div className="bg fr">
        <ImageSlot placeholder={slot} alt={slot} />
      </div>
      <div className="sc"></div>
      <div className="wrap cta-in">
        <div className="cta-row">
          <div className="a">
            <p className="meta dim" data-r style={{ marginBottom: 'clamp(18px,2.6vw,36px)' }}>
              <span className="omark"></span>Start
            </p>
            <h2 className="d2" data-r>{heading}</h2>
            <p
              className="lede dim"
              data-r
              style={{ '--dl': '.08s', maxWidth: '42ch', marginTop: 'clamp(20px,2.6vw,34px)' }}
            >
              {blurb}
            </p>
            <div
              className="ctas"
              data-r
              style={{ '--dl': '.14s', marginTop: 'clamp(28px,3.4vw,48px)' }}
            >
              <Link to="/start-a-project" className="btn btn-brand">Start a project</Link>
              <Link to="/start-a-project" className="btn btn-line">Contact us</Link>
            </div>
          </div>
          <div className="b meta" data-r>
            <p>
              Main office<br />
              <span style={{ color: 'var(--paper)' }}>{CONTACT.office}</span>
            </p>
            <p style={{ marginTop: 16 }}>
              <a href={CONTACT.mobile.href}>{CONTACT.mobile.label}</a><br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
