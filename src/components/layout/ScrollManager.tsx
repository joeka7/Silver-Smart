import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll on navigation, but honour in-page anchors (#s01 … #s06). */
export function ScrollManager(): null {
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
