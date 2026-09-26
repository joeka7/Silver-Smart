import { useState } from 'react'
import type { FormEvent } from 'react'
import { SectionIndex, Masthead, Button, TextLink } from '../components/UI'
import PhoneField from '../components/PhoneField'
import type { PhoneValue } from '../components/PhoneField'
import { CONTACT, SOCIALS, SECTORS } from '../data/site'
import { SocialIcon } from '../components/SocialIcon'
import type { StyleWithVars } from '../types/css'
import hero2 from '../imgs/image2.webp'

const SECTOR_OPTIONS: string[] = SECTORS.map((s) => s.title)
const SERVICE_OPTIONS: string[] = ['Property', 'Interior design', 'Fit-out', 'Maintenance']
const PHONE_ERROR = 'Please enter a valid number for the selected country, or leave it blank.'

/** Phone is optional: only a non-empty, invalid entry is an error. */
const phoneError = (phone: PhoneValue | null): string | null =>
  phone && !phone.isEmpty && !phone.isValid ? PHONE_ERROR : null

export default function StartAProject() {
  const [services, setServices] = useState<string[]>([])
  const [status, setStatus] = useState<string | null>(null)
  const [phone, setPhone] = useState<PhoneValue | null>(null)
  const [phoneMsg, setPhoneMsg] = useState<string | null>(null)

  const onPhoneChange = (value: PhoneValue): void => {
    setPhone(value)
    // Clear a shown error as soon as the entry becomes acceptable.
    if (!phoneError(value)) setPhoneMsg(null)
  }

  const toggleService = (value: string): void =>
    setServices((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  /**
   * No backend is defined for this site, so the form composes a mailto: to the
   * published address rather than silently discarding the enquiry. Behaviour is
   * unchanged from the previous design — only the presentation is new.
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

    if (phoneError(phone)) {
      setPhoneMsg(PHONE_ERROR)
      setStatus('Please check the phone number.')
      document.getElementById('f-phone')?.focus()
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
        eyebrow="Initiate a commission"
        title={<>Start a <span className="c-primary">project.</span></>}
        lede="Get in touch today — we are here to help. Whether the brief is a property, an interior design scheme, a full fit-out or a maintenance contract, tell us about the space and the timeline."
        meta={[
          { label: 'Main office', value: CONTACT.office },
          { label: 'Call', value: CONTACT.phone.label },
        ]}
        note="Abu Dhabi · United Arab Emirates"
      />

      {/* ===== HERO BAND ===== */}
      <section className="wrap" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="frame frame-zoom" data-r style={{ width: '100%', aspectRatio: '21 / 9', minHeight: 260 }}>
          <img src={hero2} alt="A Silver Smart delivered interior" loading="lazy" decoding="async" />
          <div className="glass frame-cap frame-cap-dock">
            <div className="flex-between gap-sm" style={{ justifyContent: 'flex-start' }}>
              <span className="dot dot-pulse" aria-hidden="true"></span>
              <div>
                <span className="t-label c-muted" style={{ display: 'block', fontSize: '0.625rem' }}>
                  Main office
                </span>
                <span className="t-sm" style={{ fontSize: '0.9rem' }}>{CONTACT.office}</span>
              </div>
            </div>
            <span className="t-label c-accent">Every space counts</span>
          </div>
        </div>
      </section>

      {/* ===== FORM + CONTACT RAIL ===== */}
      <section className="section surface-base" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="split split-start">
            {/* Contact rail */}
            <div className="col-5 stack-lg" data-r>
              <div className="panel">
                <div className="panel-head">
                  <span className="t-label c-accent">01 // Office</span>
                  <span className="t-label c-muted">UAE</span>
                </div>
                <div className="panel-row">
                  <div className="flex-between gap-sm" style={{ justifyContent: 'flex-start' }}>
                    <span className="dot" aria-hidden="true" style={{ borderRadius: 0 }}></span>
                    <span className="t-sm" style={{ fontSize: '1.05rem' }}>{CONTACT.office}</span>
                  </div>
                  <p className="t-body c-dim" style={{ paddingLeft: '1rem' }}>
                    {CONTACT.address.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < CONTACT.address.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <span className="t-label c-accent">02 // Direct channels</span>
                  <span className="t-label c-muted">@</span>
                </div>
                <div className="panel-row">
                  <span className="t-label c-muted" style={{ fontSize: '0.625rem' }}>Telephone</span>
                  <a className="t-sm" style={{ fontSize: '1.05rem' }} href={CONTACT.phone.href}>
                    {CONTACT.phone.label}
                  </a>
                  <a className="t-label c-dim" href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">{CONTACT.whatsapp.label}</a>
                </div>
                <div className="panel-row">
                  <span className="t-label c-muted" style={{ fontSize: '0.625rem' }}>Electronic enquiries</span>
                  <a className="t-label" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </div>
                <div className="panel-row">
                  <span className="t-label c-muted" style={{ fontSize: '0.625rem' }}>Follow</span>
                  <div
                    className="flex-between"
                    style={{ justifyContent: 'flex-start', gap: 'var(--space-md)' }}
                  >
                    {SOCIALS.map((s) => (
                      <a key={s.href} className="social-link" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                        <SocialIcon name={s.label} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <span className="t-label c-accent">03 // Disciplines</span>
                  <span className="t-label c-muted">Four</span>
                </div>
                <div className="accred">
                  {SERVICE_OPTIONS.map((s) => (
                    <div key={s}>
                      <div className="t-label c-primary" style={{ fontWeight: 600 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquiry form */}
            <div className="col-7" data-r style={{ '--dl': '.08s' } as StyleWithVars}>
              <div className="form-panel">
                <div className="form-head">
                  <div>
                    <span className="t-label c-accent" style={{ display: 'block' }}>Project enquiry</span>
                    <h2 className="t-md" style={{ marginTop: '0.25rem' }}>Send us a message</h2>
                  </div>
                  <div className="badge-glass">
                    <span className="dot" aria-hidden="true"></span>
                    <span>We reply by email</span>
                  </div>
                </div>

                <form className="form" id="ssform" noValidate onSubmit={onSubmit}>
                  <div className="form-two">
                    <div className="field">
                      <label htmlFor="f-name">
                        Name <span className="c-accent">*</span>
                      </label>
                      <input id="f-name" name="name" type="text" placeholder="Full name" required />
                    </div>
                    <div className="field">
                      <label htmlFor="f-email">
                        Email <span className="c-accent">*</span>
                      </label>
                      <input id="f-email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  <div className="form-two">
                    <div className="field">
                      <label htmlFor="f-phone">Phone</label>
                      <PhoneField
                        id="f-phone"
                        name="phone"
                        defaultCountry="AE"
                        error={phoneMsg}
                        onChange={onPhoneChange}
                        onBlur={() => setPhoneMsg(phoneError(phone))}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="f-loc">Location</label>
                      <input id="f-loc" name="location" type="text" placeholder="Emirate / area" />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="f-sector">Sector</label>
                    <select id="f-sector" name="sector" defaultValue={SECTOR_OPTIONS[0]}>
                      {SECTOR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <fieldset>
                      <legend className="field-legend">Service required</legend>
                      <div className="opts">
                        {SERVICE_OPTIONS.map((o) => (
                          <label className="opt" key={o}>
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
                  </div>

                  <div className="field">
                    <label htmlFor="f-msg">About the project</label>
                    <textarea
                      id="f-msg"
                      name="message"
                      rows={4}
                      placeholder="Space, scope, timeline"
                    ></textarea>
                  </div>

                  <div className="form-submit">
                    <Button type="submit">Send request</Button>
                    <p className="t-label c-muted" id="ssnote" role="status">
                      {status || <>Or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></>}
                    </p>
                  </div>

                  <div className="form-note">
                    <span>
                      Tell us about the property, the brief and the timeline — the same team that designs the space is
                      accountable for building and maintaining it.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLOSING NOTE ===== */}
      <section className="section surface-lowest" style={{ borderTop: '1px solid var(--hairline)' }}>
        <div className="wrap">
          <SectionIndex n="06" title="Every space counts" note="Design through maintenance" />
          <div className="split">
            <div className="col-7" data-r>
              <h2 className="t-lg">
                We provide the <span className="c-primary">best service</span> in interior design and maintenance.
              </h2>
            </div>
            <div className="col-5 stack" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p className="t-body c-dim">
                Whether the brief is a single room, a full fit-out or a maintenance contract, it is handled by the same
                team to the same standard.
              </p>
              <TextLink href={CONTACT.phone.href} rule>Call {CONTACT.phone.label}</TextLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
