import type React from 'react'
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

/*
 * ShinyButton — adapted from the 21st.dev reference.
 * The reference injected a scoped <style> per instance; here the same rules live
 * once in styles/theme.css (`.shiny-button`), and the colour/timing props become
 * CSS custom properties. The root can also be a router <Link> or an <a>, so
 * site CTAs keep their link semantics.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQueryList.addEventListener('change', callback)
  return () => mediaQueryList.removeEventListener('change', callback)
}

function getServerReducedMotionSnapshot() {
  return false
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, getServerReducedMotionSnapshot)
}

interface ShinyOwnProps {
  className?: string
  children: React.ReactNode
  fillColor?: string
  labelColor?: string
  accentColor?: string
  accentSoftColor?: string
  /** Seconds per border sweep. */
  sweepDuration?: number
  /** Seconds for the hover ease. */
  easeDuration?: number
  /** Arc width of the border sweep, in percent. */
  arcWidth?: number
  cornerRadius?: number
  showSpeckle?: boolean
  showSheen?: boolean
  speckleOpacity?: number
}

type ShinyAsLink = ShinyOwnProps & Omit<LinkProps, keyof ShinyOwnProps> & { href?: never }
type ShinyAsAnchor = ShinyOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ShinyOwnProps> & { href: string; to?: never }
type ShinyAsButton = ShinyOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ShinyOwnProps> & { to?: never; href?: never }

export type ShinyButtonProps = ShinyAsLink | ShinyAsAnchor | ShinyAsButton

export function ShinyButton({
  className,
  children,
  fillColor,
  labelColor,
  accentColor,
  accentSoftColor,
  sweepDuration,
  easeDuration,
  arcWidth,
  cornerRadius,
  showSpeckle,
  showSheen,
  speckleOpacity,
  ...rest
}: ShinyButtonProps) {
  const reducedMotion = usePrefersReducedMotion()

  // Only props that were actually passed override the stylesheet defaults.
  const vars: Record<string, string | undefined> = {
    '--gleam-base': fillColor,
    '--gleam-label': labelColor,
    '--gleam-accent': accentColor,
    '--gleam-accent-soft': accentSoftColor,
    '--duration': sweepDuration === undefined ? undefined : `${sweepDuration}s`,
    '--gleam-ease-duration': easeDuration === undefined ? undefined : `${easeDuration}s`,
    '--gleam-arc': arcWidth === undefined ? undefined : `${arcWidth}%`,
    '--gleam-radius': cornerRadius === undefined ? undefined : `${cornerRadius}px`,
    '--gleam-speckle-opacity':
      showSpeckle === false ? '0' : speckleOpacity === undefined ? undefined : String(speckleOpacity),
    '--gleam-sheen-opacity': showSheen === false ? '0' : undefined,
  }
  const overrides = Object.fromEntries(Object.entries(vars).filter(([, v]) => v !== undefined))
  const style = Object.keys(overrides).length
    ? ({ ...overrides, ...(rest as { style?: React.CSSProperties }).style } as React.CSSProperties)
    : (rest as { style?: React.CSSProperties }).style

  const shared = {
    className: cn('shiny-button', className),
    style,
    'data-reduced-motion': reducedMotion ? 'true' : undefined,
  }
  const inner = <span>{children}</span>

  if ('to' in rest && rest.to !== undefined) {
    return <Link {...(rest as Omit<ShinyAsLink, keyof ShinyOwnProps>)} {...shared}>{inner}</Link>
  }
  if ('href' in rest && rest.href !== undefined) {
    return <a {...(rest as Omit<ShinyAsAnchor, keyof ShinyOwnProps>)} {...shared}>{inner}</a>
  }
  const { type = 'button', ...buttonRest } = rest as Omit<ShinyAsButton, keyof ShinyOwnProps>
  return <button type={type} {...buttonRest} {...shared}>{inner}</button>
}
