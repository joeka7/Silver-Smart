# Silver Smart

React implementation of the completed Claude Design for Silver Smart — a property,
interior design, fit-out and general maintenance company based in Abu Dhabi, UAE.

## Stack

React 18 · Vite 5 · React Router 6 · plain CSS (no framework)

## Commands

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Design source

The authoritative design lives in [`claude design/project/`](claude%20design/project/).
`src/styles/ss.css` is that bundle's `ss.css` copied **verbatim** — it is the design
system (tokens, type scale, grid, components, responsive rules) and should be edited
with care. `src/styles/home.css` is the home page's scoped `<style>` block, also verbatim.

`src/styles/app.css` holds only the additions React requires: the `ImageSlot` rules
(the prototype styled an `<image-slot>` custom element by tag name), the skip link,
and a containment fix for the checkbox group.

### Brand

`--brand: #e8762b`. Used structurally, not just on hover: scroll-progress rule, logo
mark, section-header rules, caption ticks, active nav, numerals, primary CTA, checked
chips, focus states and hover borders.

## Architecture

```
src/
  components/   Nav, Footer, ClosingCta, ImageSlot, Bits (SectionHead, Masthead, …)
  pages/        Home, About, Services, ServiceDetail, Projects, ProjectDetail,
                StartAProject, NotFound
  hooks/        useSiteBehaviour — port of the prototype's ss.js
  data/         site.js, services.js — all page copy
  styles/       ss.css (verbatim), home.css (verbatim), app.css (additions)
```

The four service pages share one `ServiceDetail` template driven by `data/services.js`,
since they are structurally identical in the design.

### Behaviour ported from `ss.js`

Scroll reveals (rect-based, with `data-stagger` delays), nav scroll state, mobile menu
with scroll lock, linked service index, testimonial tabs, parallax drift, scroll-progress
rule. `prefers-reduced-motion` is honoured throughout.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/services/:slug` | Property · Interior Design · Fit-Out · Maintenance |
| `/projects` | Projects (six sectors, `#s01`–`#s06` anchors) |
| `/projects/:slug` | Project detail |
| `/start-a-project` | Contact |

`/project-detail` redirects to the project detail route for parity with the design bundle.

## Images

The design uses `<image-slot>` placeholders rather than real photography, so no image
assets were shipped in the bundle. `ImageSlot` renders a labelled placeholder carrying
the design's art direction note, at the exact aspect ratio the layout specifies.

To add real photography, pass `src`:

```jsx
<ImageSlot src="/img/hero.jpg" alt="…" placeholder="…" />
```

Aspect ratios are owned by the parent `.fr` frame in CSS, so images drop in without
layout changes.

## Deployment

Static SPA. `public/_redirects` (Netlify) and `vercel.json` (Vercel) rewrite all paths
to `index.html` so deep links resolve.
