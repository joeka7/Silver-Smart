import { useState } from 'react'
import type { FormEvent } from 'react'
import ImageSlot from '../components/ImageSlot'
import { SectionHead, Masthead, ArrowLink } from '../components/Bits'
import { CONTACT, SOCIALS } from '../data/site'
import type { StyleWithVars } from '../types/css'

const SECTOR_OPTIONS: string[] = ['Commercial', 'Corporate', 'Healthcare', 'Residential', 'Hospitality', 'Maintenance']
const SERVICE_OPTIONS: string[] = ['Property', 'Interior design', 'Fit-out', 'Maintenance']

export default function StartAProject() {
  const [services, setServices] = useState<string[]>([])
  const [status, setStatus] = useState<string | null>(null)

  const toggleService = (value: string): void =>
    setServices((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  /**
   * No backend is defined in the design, so the form composes a mailto: to the
   * published address rather than silently discarding the enquiry.
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = (form.get('name') || '').toString().trim()
    const email = (form.get('email') || '').toString().trim()

    if (!name || !email) {
      setStatus('Please add your name and email so we can reply.')
      return
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${form.get('phone') || '—'}`,
      `Location: ${form.get('location') || '—'}`,
      `Sector: ${form.get('sector') || '—'}`,
      `Service required: ${services.length ? services.join(', ') : '—'}`,
      '',
      'About the project:',
      (form.get('message') || '—').toString(),
    ]

    window.location.href =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(`Project enquiry — ${name}`)}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`

    setStatus('Opening your email client…')
  }

  return (
    <>
      <Masthead
        n="05"
        eyebrow="Contact"
        title={<>Start a<br /><span className="ob">project</span></>}
        meta={[
          { label: 'Main office', value: 'Abu Dhabi, UAE' },
          { label: 'Call', value: CONTACT.phone.label },
          { label: 'WhatsApp', value: CONTACT.mobile.label },
        ]}
        kicker="Get in touch today — we are here to help. Tell us about the property, the brief and the timeline."
      />

      <section className="sect on-paper">
        <div className="wrap">
          <SectionHead n="01" title="Send us a message" note="We reply by email" />
          <div className="two">
            <div className="a-wide">
              <form className="form" id="ssform" noValidate onSubmit={onSubmit}>
                <div className="fld">
                  <label htmlFor="f-name">Name</label>
                  <input id="f-name" name="name" type="text" placeholder="Full name" required />
                </div>
                <div className="fld">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <div className="fld">
                  <label htmlFor="f-phone">Phone</label>
                  <input id="f-phone" name="phone" type="tel" placeholder="+971" />
                </div>
                <div className="fld">
                  <label htmlFor="f-loc">Location</label>
                  <input id="f-loc" name="location" type="text" placeholder="Emirate / area" />
                </div>
                <div className="fld full">
                  <label htmlFor="f-sector">Sector</label>
                  <select id="f-sector" name="sector" defaultValue="Commercial">
                    {SECTOR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <fieldset className="fld full" style={{ borderBottom: 0 }}>
                  <legend className="fld-legend" style={{ marginBottom: 12 }}>Service required</legend>
                  <div className="chips">
                    {SERVICE_OPTIONS.map((o) => (
                      <label key={o}>
                        <input
                          type="checkbox"
                          name="service"
                          value={o}
                          checked={services.includes(o)}
                          onChange={() => toggleService(o)}
                        />
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="fld full">
                  <label htmlFor="f-msg">About the project</label>
                  <textarea id="f-msg" name="message" placeholder="Space, scope, timeline"></textarea>
                </div>

                <div
                  className="full"
                  style={{ marginTop: 'clamp(22px,3vw,36px)', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}
                >
                  <button type="submit" className="btn btn-fill">Send request</button>
                  <p className="meta dim" id="ssnote" role="status">
                    {status || <>Or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></>}
                  </p>
                </div>
              </form>
            </div>

            <div className="b-narrow stack">
              <div style={{ width: '100%' }}>
                <p className="meta dim" style={{ marginBottom: 14 }}>Main office</p>
                <p className="d4">Abu Dhabi<br />United Arab Emirates</p>
              </div>
              <hr className="hr" style={{ width: '100%' }} />
              <div style={{ width: '100%' }}>
                <p className="meta dim" style={{ marginBottom: 14 }}>Our location</p>
                <p>{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
              </div>
              <hr className="hr" style={{ width: '100%' }} />
              <div style={{ width: '100%' }}>
                <p className="meta dim" style={{ marginBottom: 14 }}>Contact</p>
                <p>
                  <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a><br />
                  <a href={CONTACT.whatsapp.href}>{CONTACT.whatsapp.label}</a><br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </div>
              <hr className="hr" style={{ width: '100%' }} />
              <div style={{ width: '100%' }}>
                <p className="meta dim" style={{ marginBottom: 14 }}>Follow</p>
                <p>
                  {SOCIALS.map((s, i) => (
                    <span key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                      {i < SOCIALS.length - 1 && ' · '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="band fr">
        <ImageSlot placeholder="Office / project image — wide crop" alt="Office project — wide crop" />
      </div>

      <section className="sect on-ink">
        <div className="wrap">
          <div className="two">
            <div className="a-wide" data-r>
              <h2 className="d2">
                We provide the <span className="ob">best service</span> in interior design and maintenance.
              </h2>
            </div>
            <div className="b-narrow stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p className="dim">
                Every space counts. Whether the brief is a single room, a full fit-out or a maintenance contract, it is
                handled by the same team to the same standard.
              </p>
              <ArrowLink to="/services">All services</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
