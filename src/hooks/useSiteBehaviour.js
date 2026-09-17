import { useEffect } from 'react'

const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches

/**
 * Scroll reveals — port of the rect-based reveal loop in ss.js.
 * Rect-based rather than IntersectionObserver so instant jumps and
 * back-navigation still resolve, exactly as the prototype did.
 * Re-runs per route so newly mounted nodes are picked up.
 */
export function useReveals(deps = []) {
  useEffect(() => {
    let items = [...document.querySelectorAll('[data-r]')]

    // stagger groups: assign --dl to each child in document order
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const step = parseFloat(group.dataset.stagger) || 0.08
      ;[...group.children].forEach((child, i) => {
        const target = child.matches('[data-r]') ? child : child.querySelector('[data-r]')
        if (target && !target.style.getPropertyValue('--dl')) {
          target.style.setProperty('--dl', i * step + 's')
        }
      })
    })

    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('in'))
      return
    }

    const check = () => {
      const vh = window.innerHeight || 800
      for (let i = items.length - 1; i >= 0; i--) {
        const el = items[i]
        if (el.getBoundingClientRect().top < vh * 0.94) {
          el.classList.add('in')
          items.splice(i, 1)
        }
      }
    }

    let raf = null
    const queue = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = null
          check()
        })
      }
    }

    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    const t1 = setTimeout(check, 0)
    const t2 = setTimeout(check, 120)

    return () => {
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      clearTimeout(t1)
      clearTimeout(t2)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Nav solid-state past 40px — port of the onScroll toggle in ss.js. */
export function useNavScrollState() {
  useEffect(() => {
    const nav = document.querySelector('.nav')
    const onScroll = () => {
      if (nav) nav.classList.toggle('s', window.scrollY > 40)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
}

/** Fixed scroll-progress rule in brand orange — port of the .sprog element in ss.js. */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.createElement('div')
    bar.className = 'sprog'
    document.body.appendChild(bar)

    const update = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      const pct = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) * 100 : 0
      bar.style.width = pct.toFixed(2) + '%'
    }

    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
      bar.remove()
    }
  }, [])
}

/** Subtle hero/featured parallax — port of the [data-drift] ticker in ss.js. */
export function useDrift(deps = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const items = [...document.querySelectorAll('[data-drift]')]
    if (!items.length) return

    let raf = null
    const tick = () => {
      const vh = innerHeight
      items.forEach((el) => {
        const p = el.parentElement.getBoundingClientRect()
        const k = parseFloat(el.dataset.drift) || 0.06
        const off = (p.top + p.height / 2 - vh / 2) * -k
        el.style.transform = `translate3d(0,${off.toFixed(2)}px,0)`
      })
      raf = null
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    tick()
    addEventListener('scroll', queue, { passive: true })
    return () => {
      removeEventListener('scroll', queue)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
