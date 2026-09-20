import heroVid from '../videos/hero-vid.mp4'

/**
 * Decorative full-bleed background video for the Home hero.
 *
 * Fills the whole `.hero` box, which keeps ownership of the section's
 * dimensions and responsive behaviour, so the layout is unchanged.
 * Muted/autoplay/playsInline is the combination browsers require to start
 * without a user gesture; `aria-hidden` keeps it out of the accessibility
 * tree, and pointer-events:none in app.css keeps it from intercepting clicks.
 */
export default function HeroVideo() {
  return (
    <div className="hero-vid" aria-hidden="true">
      <video
        src={heroVid}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        controls={false}
      />
    </div>
  )
}
