import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV, NAV_CTA, SERVICE_LINKS, SOCIALS, CONTACT } from '../data/site'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link to="/" className="mark has-logo" aria-label="Silver Smart, home">
              <Logo />
            </Link>
            <p className="lede dim" style={{ marginTop: 22, maxWidth: '24ch' }}>
              Building dreams, crafting spaces. Your vision, our expertise.
            </p>
          </div>

          <div>
            <h4>Navigate</h4>
            <ul>
              {[...NAV, NAV_CTA].map((i) => (
                <li key={i.to}><Link to={i.to}>{i.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map((i) => (
                <li key={i.to}><Link to={i.to}>{i.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={CONTACT.phone.href}>{CONTACT.phone.label}</a></li>
              <li><a href={CONTACT.whatsapp.href}>{CONTACT.whatsapp.label}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            </ul>
          </div>

          <div>
            <h4>Office</h4>
            <ul>
              <li className="dim">
                {CONTACT.address.map((line, i) => (
                  <span key={line}>{line}{i < CONTACT.address.length - 1 && <br />}</span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bot">
          <span>© {new Date().getFullYear()} Silver Smart</span>
          <span>Every space counts</span>
          {SOCIALS.map((s, i) => (
            <span key={s.href} className={i === 0 ? 'sp' : undefined}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
