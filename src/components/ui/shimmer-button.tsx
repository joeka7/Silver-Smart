import React from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

/*
 * ShimmerButton — adapted from the reference component.
 * The project has no Tailwind, so the reference's utility classes are
 * translated one-for-one into the `.shimmer-button*` rules in styles/theme.css
 * (with the `shimmer-slide` / `spin-around` keyframes). Inner layers are
 * <span>s rather than <div>s so the markup stays valid inside <button> and <a>.
 * The root can also be a router <Link> or an <a>, so link CTAs stay links.
 */

interface ShimmerOwnProps {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

type ShimmerAsLink = ShimmerOwnProps & Omit<LinkProps, keyof ShimmerOwnProps> & { href?: never }
type ShimmerAsAnchor = ShimmerOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ShimmerOwnProps> & { href: string; to?: never }
type ShimmerAsButton = ShimmerOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ShimmerOwnProps> & { to?: never; href?: never }

export type ShimmerButtonProps = ShimmerAsLink | ShimmerAsAnchor | ShimmerAsButton

const ShimmerButton = React.forwardRef<HTMLElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const style = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
      ...(props as { style?: CSSProperties }).style,
    } as CSSProperties

    const inner = (
      <>
        {/* spark container */}
        <span className="shimmer-button-spark-container" aria-hidden="true">
          {/* spark */}
          <span className="shimmer-button-spark">
            {/* spark before */}
            <span className="shimmer-button-spark-before" />
          </span>
        </span>

        {children}

        {/* Highlight */}
        <span className="shimmer-button-highlight" aria-hidden="true" />

        {/* backdrop */}
        <span className="shimmer-button-backdrop" aria-hidden="true" />
      </>
    )

    const shared = { className: cn('shimmer-button', className), style }

    if ('to' in props && props.to !== undefined) {
      return (
        <Link {...(props as Omit<ShimmerAsLink, keyof ShimmerOwnProps>)} {...shared} ref={ref as React.Ref<HTMLAnchorElement>}>
          {inner}
        </Link>
      )
    }
    if ('href' in props && props.href !== undefined) {
      return (
        <a {...(props as Omit<ShimmerAsAnchor, keyof ShimmerOwnProps>)} {...shared} ref={ref as React.Ref<HTMLAnchorElement>}>
          {inner}
        </a>
      )
    }
    return (
      <button {...(props as Omit<ShimmerAsButton, keyof ShimmerOwnProps>)} {...shared} ref={ref as React.Ref<HTMLButtonElement>}>
        {inner}
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }
