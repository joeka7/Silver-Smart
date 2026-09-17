/**
 * ImageSlot — React equivalent of the design prototype's <image-slot> element.
 *
 * The prototype component was a drag-and-drop authoring placeholder; in production
 * the contract that matters is the sizing behaviour it guaranteed:
 *   - fills its container absolutely (the `.fr` frame owns the aspect ratio)
 *   - `fit` controls object-fit once a real src is supplied
 *   - with no src it renders a labelled placeholder tile in the frame colour
 *
 * Drop real photography in by passing `src` — every call site already carries the
 * art-directed `alt`/`placeholder` text from the design.
 */
export default function ImageSlot({ src, alt = '', placeholder = '', fit = 'cover', credit, creditHref }) {
  if (!src) {
    return (
      <div className="islot islot-empty" role="img" aria-label={alt || placeholder || 'Image placeholder'}>
        <span className="islot-ph">{placeholder}</span>
      </div>
    )
  }

  return (
    <div className="islot">
      <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectFit: fit }} />
      {credit && (
        <span className="islot-credit">
          {creditHref ? (
            <a href={creditHref} target="_blank" rel="noopener noreferrer">{credit}</a>
          ) : (
            credit
          )}
        </span>
      )}
    </div>
  )
}
