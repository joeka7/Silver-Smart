import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import SiteFooter from './components/SiteFooter'
import { useReveals, useNavScrollState, useScrollProgress } from './hooks/useSiteBehaviour'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import StartAProject from './pages/StartAProject'
import NotFound from './pages/NotFound'

/** Reset scroll on navigation, but honour in-page anchors (#s01 … #s06). */
function ScrollManager(): null {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()

  // Shared scroll behaviour; reveals re-bind per route.
  useReveals([pathname])
  useNavScrollState()
  useScrollProgress()

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <ScrollManager />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/project-detail" element={<Navigate to="/projects/residential-interior-fit-out" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/start-a-project" element={<StartAProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
