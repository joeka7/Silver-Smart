import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import HeroVideo from '../components/HeroVideo'
import HeroSlider from '../components/HeroSlider'
import { ArrowLink, SectionHead } from '../components/Bits'
import { HOME_SERVICES, HOME_WORK, CONTACT } from '../data/site'
import type { StyleWithVars } from '../types/css'

export default function Home() {
  // `data-index` behaviour from ss.js: hovering/focusing a service row swaps the visual.
  const [activeService, setActiveService] = useState<number>(0)

  return (
    <>
      {/* ===== hero ===== */}
      <header className="hero">
        <HeroVideo />
        <div className="hero-rule"></div>
        <div className="hero-img fr fr-zoom" data-r="mask">
          <HeroSlider />
        </div>
        <div className="wrap hero-in">
          <p className="hero-kick meta" data-r>
            <span className="omark"></span>Property · Interior Design · Fit-Out · General Maintenance
          </p>
          <div className="hero-sp"></div>
          <div className="hero-bot">
            <h1 className="d1 hero-t" data-r>
              <span>Spaces</span>
              <span className="i">with</span>
              <span className="ob">purpose.</span>
            </h1>
            <div className="hero-foot" data-r style={{ '--dl': '.12s' } as StyleWithVars}>
              <Link to="/start-a-project" className="btn btn-brand">Start a project</Link>
              <Link to="/projects" className="btn btn-line">Explore our work</Link>
            </div>
            <div className="hero-side meta" data-r style={{ '--dl': '.2s' } as StyleWithVars}>
              <span className="l"><span>Location</span><b>Abu Dhabi, UAE</b></span>
              <span className="l"><span>Sectors</span><b>Six</b></span>
              <span className="l"><span>Discipline</span><b>Design &amp; Build</b></span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 intro ===== */}
      <section className="sect on-paper" id="intro">
        <div className="wrap">
          <SectionHead n="01" title="Introduction" note="Where we build your visions" />
          <div className="g12">
            <div className="intro-s" data-r>
              <h2 className="d2">
                We create spaces where <span className="ser ital ob">design, functionality</span> and precision come together.
              </h2>
            </div>
            <div className="intro-b" data-r style={{ '--dl': '.1s' } as StyleWithVars}>
              <p>
                Silver Smart is a property, interior design, fit-out and general maintenance company based in the
                United Arab Emirates. We are dedicated to creating inspiring spaces and maintaining properties to the
                highest standards.
              </p>
              <p className="dim">
                Our team of experienced professionals delivers bespoke interior design and property maintenance
                solutions that reflect individual styles and preferences. Sustainability sits at the core of our
                operations, as we prioritise eco-friendly materials and sustainable practices.
              </p>
              <ArrowLink to="/about">About the studio</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02 services ===== */}
      <section className="sect on-ink" id="services">
        <div className="wrap">
          <SectionHead n="02" title="What we do" note="Four disciplines, one accountable team" />
          <div className="svc-grid">
            <div className="svc-vis" data-r="mask">
              {HOME_SERVICES.map((s, i) => (
                <div className={`fr${i === activeService ? ' act' : ''}`} key={s.n}>
                  <ImageSlot placeholder={s.slot} alt={s.slot} />
                </div>
              ))}
            </div>
            <ul className="svc-list" data-stagger=".06">
              {HOME_SERVICES.map((s, i) => (
                <li
                  className={`svc-row${i === activeService ? ' act' : ''}`}
                  data-r
                  key={s.n}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  <Link to={s.to}>
                    <span className="n">{s.n}</span>
                    <span>
                      <h3 className="d2">{s.title}</h3>
                      <p className="dsc dim mw">{s.desc}</p>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="svc-foot">
            <ArrowLink to="/services">All services</ArrowLink>
            <p className="meta dim">Every space counts</p>
          </div>
        </div>
      </section>

      {/* ===== 03 selected work ===== */}
      <section className="sect on-paper" id="work">
        <div className="wrap">
          <SectionHead n="03" title="Selected work" note="Selected sectors" />
          <div className="g12" style={{ marginBottom: 'clamp(48px,7vw,110px)' }}>
            <p className="lede intro-s" data-r>
              We are proud of a portfolio where concepts became reality. Builders, designers and architects working in
              unison — from interior design masterworks to architectural detail.
            </p>
          </div>
          <div className="pj">
            {HOME_WORK.slice(0, 4).map((p) => (
              <article className={`pj-i ${p.cls}`} data-r key={p.n}>
                <Link className="fr fr-zoom" to="/projects/residential-interior-fit-out">
                  <ImageSlot placeholder={p.slot} alt={p.slot} />
                </Link>
                <div className="pj-cap">
                  <span className="n">{p.n}</span>
                  <h3 className="d4">{p.title}</h3>
                  {p.loc && <span className="loc">{p.loc}</span>}
                </div>
                <p className="dim mw">{p.desc}</p>
              </article>
            ))}
          </div>
          <div className="svc-foot">
            <ArrowLink to="/projects">View the full portfolio</ArrowLink>
          </div>
        </div>
      </section>

      {/* ===== 04 end cta ===== */}
      <section className="end" id="start">
        <div className="bg fr">
          <ImageSlot placeholder="Closing image — architecture at dusk" alt="Architecture at dusk" />
        </div>
        <div className="sc"></div>
        <div className="wrap end-in">
          <div className="row">
            <div className="a">
              <p className="meta dim" data-r style={{ marginBottom: 'clamp(20px,3vw,40px)' }}>
                <span className="omark"></span><span className="onum">04</span> — Start
              </p>
              <h2 className="d1" data-r style={{ fontSize: 'clamp(2.4rem,7.4vw,7rem)' }}>
                Have a space<br /><span className="ob">in mind?</span>
              </h2>
              <p
                className="lede dim"
                data-r
                style={{ '--dl': '.08s', maxWidth: '40ch', marginTop: 'clamp(22px,3vw,40px)' } as StyleWithVars}
              >
                Let&apos;s build something exceptional. Tell us about the property, the brief and the timeline.
              </p>
              <div className="ctas" data-r style={{ '--dl': '.14s', marginTop: 'clamp(30px,4vw,54px)' } as StyleWithVars}>
                <Link to="/start-a-project" className="btn btn-brand">Start a project</Link>
                <Link to="/start-a-project" className="btn btn-line">Contact us</Link>
              </div>
            </div>
            <div className="b meta" data-r>
              <p>Main office<br /><span style={{ color: 'var(--paper)' }}>{CONTACT.office}</span></p>
              <p style={{ marginTop: 18 }}>
                <a href={CONTACT.mobile.href}>{CONTACT.mobile.label}</a><br />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
