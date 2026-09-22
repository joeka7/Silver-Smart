import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../imgs/logo.webp'
import { NAV, NAV_CTA, CONTACT } from '../data/site'

/**
 * Fixed glassmorphic header, per the Stitch export.
 *
 * Desktop shows the full nav plus the bordered "Start a project" action;
 * below 1100px both collapse into the burger-driven drawer. The drawer's
 * open state is mirrored onto <body> so layout.css can lock scrolling.
 */
export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const { pathname } = useLocation()

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.classList.toggle('mopen', open)
    return () => document.body.classList.remove('mopen')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="hdr">
        <div className="wrap hdr-in">
          <Link to="/" className="hdr-mark" aria-label="Silver Smart, home">
            <img className="hdr-logo" src={logo} alt="" width="931" height="1024" />
            <span className="hdr-word">
              <span className="hdr-name">Silver Smart</span>
            </span>
          </Link>

          <nav className="hdr-nav" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hdr-actions">
            <Link to={NAV_CTA.to} className="hdr-cta">
              <span className="dot" aria-hidden="true"></span>
              <span>{NAV_CTA.label}</span>
              <span className="arrow" aria-hidden="true">&#8594;</span>
            </Link>
            <button
              className="burger"
              aria-label={open ? 'Close menu' : 'Menu'}
              aria-expanded={open}
              aria-controls="mnav"
              onClick={() => setOpen((v) => !v)}
            >
              <i></i>
              <i></i>
            </button>
          </div>
        </div>
      </header>

      {/* Visibility (not `hidden`) drives the reveal so the CSS transition can run;
          layout.css already removes it from the a11y tree via visibility:hidden. */}
      <div className="mnav" id="mnav" aria-hidden={!open}>
        <ul>
          {NAV.map((item, i) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'} tabIndex={open ? 0 : -1}>
                <span>{item.label}</span>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
              </NavLink>
            </li>
          ))}
          <li className="mnav-cta">
            <Link to={NAV_CTA.to} className="btn btn-primary" tabIndex={open ? 0 : -1}>
              <span>{NAV_CTA.label}</span>
              <span className="arrow" aria-hidden="true">&#8594;</span>
            </Link>
          </li>
        </ul>
        <div className="mnav-foot t-label">
          <span>{CONTACT.office}</span>
          <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1}>{CONTACT.email}</a>
          <a href={CONTACT.phone.href} tabIndex={open ? 0 : -1}>{CONTACT.phone.label}</a>
        </div>
      </div>
    </>
  )
}
