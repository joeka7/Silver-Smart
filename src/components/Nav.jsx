import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, CONTACT } from '../data/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  // body.mopen drives the .mnav clip-path reveal and scroll lock in ss.css
  useEffect(() => {
    document.body.classList.toggle('mopen', open)
    return () => document.body.classList.remove('mopen')
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="wrap nav-in">
          <Link to="/" className="mark" aria-label="Silver Smart, home">
            <b>SILVER</b> <span className="sm">SMART</span>
          </Link>
          <div className="nlinks">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="lang" aria-label="Language">
            <b>EN</b>
            <span>/</span>
            <a href="#ar" aria-label="Switch to Arabic">AR</a>
          </div>
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
      </nav>

      <div className="mnav" id="mnav">
        <ul>
          {NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to} tabIndex={open ? 0 : -1}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mfoot meta dim">
          <span>Abu Dhabi — United Arab Emirates</span>
          <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1}>{CONTACT.email}</a>
          <span>EN / AR</span>
        </div>
      </div>
    </>
  )
}
