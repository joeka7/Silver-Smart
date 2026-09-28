import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { LinkProps } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ShimmerButton } from './ShimmerButton'
import type { ShimmerButtonProps } from './ShimmerButton'
import { ShinyButton } from './ShinyButton'
import type { ShinyButtonProps } from './ShinyButton'

export type ButtonVariant = 'primary' | 'dark' | 'light'

interface ButtonOwnProps {
  /** primary = brand-orange sweep; dark = silver sweep for secondary actions; light = pale fill for use over media. */
  variant?: ButtonVariant
  /** Shows the small arrow after the label. Turn it off for compact functional controls (`btn-sm`). */
  icon?: boolean
  /** Stretches to the container width. */
  block?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsLink = ButtonOwnProps & Omit<LinkProps, keyof ButtonOwnProps> & { href?: never }
type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { href: string; to?: never }
type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { to?: never; href?: never }

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

/** Pill content shared by both CTA treatments: the label plus the optional arrow. */
function ButtonContent({ icon, children }: { icon: boolean; children: ReactNode }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      {icon && <ArrowUpRight className="btn-icon" size={14} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )
}

/** ShimmerButton settings per variant: the site's button fills, with a shimmer that reads on each. */
const SHIMMER: Record<ButtonVariant, { background: string; shimmerColor: string }> = {
  primary: { background: 'var(--primary-container)', shimmerColor: '#ffffff' },
  dark: { background: '#ffffff', shimmerColor: 'var(--primary-container)' },
  light: { background: 'var(--secondary-fixed)', shimmerColor: 'var(--primary-container)' },
}

/**
 * Site CTA, rendered with the ShimmerButton treatment. Renders a router <Link>
 * when given `to`, an <a> when given `href`, and a native <button> otherwise,
 * passing every other prop (onClick, type, disabled, target, aria-*) straight through.
 */
export function Button({ variant = 'primary', icon = true, block = false, className = '', children, ...rest }: ButtonProps) {
  // Native buttons default to type="button" so they never submit a form by accident.
  const isButton = rest.to === undefined && rest.href === undefined
  const props = {
    ...(isButton && { type: 'button' }),
    ...rest,
    ...SHIMMER[variant],
    className: cn('btn', `btn-${variant}`, !icon && 'btn-sm', block && 'btn-block', className),
    children: <ButtonContent icon={icon}>{children}</ButtonContent>,
  } as ShimmerButtonProps
  return <ShimmerButton {...props} />
}

/**
 * Header/Navbar CTA. Keeps the ShinyButton treatment the header already has,
 * so the header stays unchanged while the rest of the site uses ShimmerButton.
 */
export function HeaderButton({ variant = 'primary', icon = true, block = false, className = '', children, ...rest }: ButtonProps) {
  const props = {
    ...rest,
    className: cn('btn', `btn-${variant}`, !icon && 'btn-sm', block && 'btn-block', className),
    children: <ButtonContent icon={icon}>{children}</ButtonContent>,
  } as ShinyButtonProps
  return <ShinyButton {...props} />
}
