import heroSec from '../imgs/hero-sec.webp'

/**
 * Full-bleed hero media for the Home page.
 *
 * A single still, matching the Stitch hero concept. It is the page's largest
 * paint, so it is fetched eagerly at high priority rather than lazily.
 * Decorative — the hero's meaning is carried by the headline beside it — so the
 * image is hidden from assistive technology.
 */
export default function HeroMedia() {
  return (
    <div className="hero-media" aria-hidden="true">
      <img
        src={heroSec}
        alt=""
        /* Lowercase attribute name — React 18 does not map the camelCase form,
           so writing it that way would silently drop the priority hint. */
        fetchpriority="high"
        loading="eager"
        decoding="async"
        draggable="false"
      />
    </div>
  )
}
