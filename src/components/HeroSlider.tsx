import { useEffect, useState } from 'react'
import hero1 from '../imgs/hero1.webp'
import hero2 from '../imgs/hero2.webp'
import hero3 from '../imgs/hero3.webp'
import hero4 from '../imgs/hero4.webp'
import hero5 from '../imgs/hero5.webp'

const SLIDES: string[] = [hero1, hero2, hero3, hero4, hero5]
export const HOLD: number = 6000 // visible time per image
export const FADE: number = 1000 // crossfade duration; mirrored by --hero-fade in app.css

/**
 * Cinematic image sequence for the Home hero's right-hand visual panel.
 *
 * All five frames are mounted once and stacked; only the `is-on` class moves
 * between them, so a step is a pure CSS opacity transition — no image is
 * mounted, decoded or fetched mid-transition, which is what would otherwise
 * cause a flash. Because the layers persist, the outgoing frame stays painted
 * underneath for the whole fade, so nothing ever shows through to whatever is
 * behind. Fills the `.hero-img` frame, which owns the panel's geometry and
 * responsive behaviour; purely decorative.
 */
export default function HeroSlider() {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || SLIDES.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), HOLD)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="hero-slider" aria-hidden="true">
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={i === index ? 'is-on' : undefined}
          /* first frame paints as early as possible; the rest are still
             fetched up front so no step waits on the network. Lowercase
             attribute name — React 18 does not map the camelCase form. */
          loading="eager"
          fetchpriority={i === 0 ? 'high' : 'low'}
          decoding="async"
          draggable="false"
        />
      ))}
    </div>
  )
}
