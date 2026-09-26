import { Link } from 'react-router-dom'
import logo from '../imgs/logo.webp'
import { NAV, SERVICE_LINKS, SOCIALS, CONTACT } from '../data/site'
import { SocialIcon } from './SocialIcon'
import { Button } from './UI'

/**
 * Site footer — the four-column architectural register from the Stitch export.
 *
 * The dispatch column's email field composes a mailto: to the published
 * address, matching how the contact form submits: no backend is defined for
 * this site, so an enquiry is handed to the visitor's mail client rather than
 * silently discarded.
 */
export default function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Link to="/" className="hdr-mark" aria-label="Silver Smart, home">
              <img className="hdr-logo" src={logo} alt="" width="931" height="1024" />
            </Link>
            <p className="t-small c-dim" style={{ maxWidth: '34ch' }}>
              A property, interior design, fit-out and general maintenance company based in the United Arab
              Emirates — creating inspiring spaces and maintaining properties to the highest standards.
            </p>
            <div className="t-label c-muted" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {CONTACT.address.map((line) => (
                <span key={line} style={{ color: 'var(--on-surface-variant)' }}>{line}</span>
              ))}
            </div>
          </div>

          <div className="ftr-col">
            <span className="t-label c-accent">Practice</span>
            <ul>
              {SERVICE_LINKS.map((i) => (
                <li key={i.to}><Link to={i.to}>{i.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="ftr-col">
            <span className="t-label c-accent">Navigation</span>
            <ul>
              {/* NAV already carries Contact Us, so NAV_CTA is not repeated here. */}
              {NAV.map((i) => (
                <li key={i.to}><Link to={i.to}>{i.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="ftr-wide">
            <span className="t-label c-accent">Dispatch &amp; Enquiries</span>
            <p className="t-small c-dim">
              Tell us about the property, the brief and the timeline — we will take it from there.
            </p>
            <form
              className="ftr-sub"
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.elements.namedItem('email') as HTMLInputElement | null
                const value = input?.value.trim()
                if (!value) return
                window.location.href =
                  `mailto:${CONTACT.email}` +
                  `?subject=${encodeURIComponent('Website enquiry')}` +
                  `&body=${encodeURIComponent(`Please get in touch with me at ${value}.`)}`
              }}
            >
              <label htmlFor="ftr-email" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
                Email address
              </label>
              <input id="ftr-email" name="email" type="email" placeholder="Email address" required />
              <Button type="submit" variant="dark" icon={false}>Send &#8594;</Button>
            </form>
            <div className="t-label c-muted">
              <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
              {' · '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div className="ftr-social">
              {SOCIALS.map((s) => (
                <a key={s.href} className="social-link" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ftr-bot">
          <p>Silver Smart — Property, Interior Design, Fit-Out &amp; General Maintenance · Abu Dhabi, UAE.</p>
          <span className="c-dim">© {new Date().getFullYear()} Silver Smart</span>
        </div>
      </div>
    </footer>
  )
}
