import 'react'

/**
 * React 18's `ImgHTMLAttributes` does not carry the lowercase `fetchpriority`
 * attribute. HeroSlider deliberately uses the lowercase form, because React 18
 * does not map the camelCase `fetchPriority` onto the DOM — writing it that way
 * would silently drop the hint and change how the first hero frame is fetched.
 * Declaring it here keeps the emitted attribute exactly as it is today.
 */
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
