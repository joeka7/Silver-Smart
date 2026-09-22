import { useEffect } from 'react'
import type { DependencyList } from 'react'

const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches

/**
 * Scroll reveals — port of the rect-based reveal loop in ss.js.
 * Rect-based rather than IntersectionObserver so instant jumps and
 * back-navigation still resolve, exactly as the prototype did.
 * Re-runs per route so newly mounted nodes are picked up.
 *
 * `in` is applied imperatively here, but some [data-r] nodes also have a
 * React-controlled className (e.g. .svc-row toggles .act on hover). When React
 * re-renders such a node it rewrites className from its own vdom, which never
 * contains `in`, silently stripping it — the element then falls back to
 * [data-r]{opacity:0} and disappears for good, since it has already been
 * removed from `items`. A MutationObserver re-asserts `in` on nodes we have
 * already revealed, so both writers can coexist.
 */
export function useReveals(deps: DependencyList = []) {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('[data-r]')]
    const revealed = new WeakSet<Element>()

    // stagger groups: assign --dl to each child in document order
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
      const step = parseFloat(group.dataset.stagger ?? '') || 0.08
      ;[...group.children].forEach((child, i) => {
        const target = child.matches('[data-r]')
          ? (child as HTMLElement)
          : child.querySelector<HTMLElement>('[data-r]')
        if (target && !target.style.getPropertyValue('--dl')) {
          target.style.setProperty('--dl', i * step + 's')
        }
      })
    })

    if (prefersReducedMotion()) {
      items.forEach((el) => {
        revealed.add(el)
        el.classList.add('in')
      })
      return guardRevealed(revealed)
    }

    const check = () => {
      const vh = window.innerHeight || 800
      for (let i = items.length - 1; i >= 0; i--) {
        const el = items[i]
        if (el.getBoundingClientRect().top < vh * 0.94) {
          revealed.add(el)
          el.classList.add('in')
          items.splice(i, 1)
        }
      }
    }

    let raf: number | null = null
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

    const unguard = guardRevealed(revealed)

    return () => {
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      clearTimeout(t1)
      clearTimeout(t2)
      if (raf) cancelAnimationFrame(raf)
      unguard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Re-applies `in` to already-revealed nodes whose className was rewritten by a
 * React re-render. Watches only the class attribute, and only re-adds a class
 * the node had already earned, so it cannot reveal anything early.
 */
function guardRevealed(revealed: WeakSet<Element>): () => void {
  const mo = new MutationObserver((records) => {
    for (const rec of records) {
      const el = rec.target as Element
      if (revealed.has(el) && !el.classList.contains('in')) el.classList.add('in')
    }
  })
  mo.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => mo.disconnect()
}

/** Header solid-state past 40px: deepens the glass once the page has moved. */
export function useNavScrollState() {
  useEffect(() => {
    const nav = document.querySelector('.hdr')
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
