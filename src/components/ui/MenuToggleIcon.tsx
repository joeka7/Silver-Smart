import type { ComponentProps, CSSProperties } from 'react'

type MenuToggleProps = ComponentProps<'svg'> & {
  open: boolean
  duration?: number
}

/**
 * Animated burger/close icon, adapted from 21st.dev's MenuToggleIcon.
 * The Tailwind utilities are replaced by `.menu-toggle-icon` rules in layout.css;
 * `duration` is passed through as a CSS variable.
 */
export function MenuToggleIcon({
  open,
  className,
  style,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  duration = 500,
  ...props
}: MenuToggleProps) {
  return (
    <svg
      strokeWidth={strokeWidth}
      fill={fill}
      stroke={stroke}
      viewBox="0 0 32 32"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      aria-hidden="true"
      focusable="false"
      className={`menu-toggle-icon${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--menu-toggle-duration': `${duration}ms`, ...style } as CSSProperties}
      {...props}
    >
      <path
        className="menu-toggle-icon-path"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  )
}
