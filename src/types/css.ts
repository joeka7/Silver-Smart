import type { CSSProperties } from 'react'

/**
 * Inline styles that also carry CSS custom properties.
 *
 * Several components set `--dl` (the reveal delay consumed by [data-r] in
 * styles/theme.css) directly on the style object. React passes custom properties through
 * at runtime, but `CSSProperties` only describes known properties, so the
 * variables are declared here rather than widening the style prop to `any`.
 */
export type StyleWithVars = CSSProperties & Record<`--${string}`, string | number>
