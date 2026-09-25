# Silver Smart

React implementation of the Silver Smart website — a property, interior design,
fit-out and general maintenance company based in Abu Dhabi, UAE.

## Stack

React 18 · Vite 5 · React Router 6 · plain CSS (no framework)

## Commands

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run typecheck
```

## Design system — "Architectural Prestige"

The visual system is a React implementation of the Stitch design export. Its tokens
(colour, type scale, spacing) are transcribed from that export's `DESIGN.md`.

- **`src/styles/theme.css`** — tokens and primitives: colour roles, the type scale,
  spacing, buttons, links, image frames, reveal animation.
- **`src/styles/layout.css`** — structure: header/drawer, footer, hero, and the
  repeating page blocks (stat ledger, service rows, sector blocks, forms, panels).

### Key characteristics

- **Dark architectural canvas.** `#121316` base, with `#0d0e11` / `#1b1b1f` / `#1f1f23`
  as the elevation steps. Depth comes from tonal layering and 1px hairlines, not shadows.
- **Sharp geometry.** Border radius is `0` throughout; the only rounded elements are
  status dots.
- **Typography.** `Syne` for headlines, `Plus Jakarta Sans` for body, `JetBrains Mono`
  for technical labels, indices and metadata.
- **Brand orange `#e8762b`** (`--primary-container`) is reserved for focal points:
  section indices (`01 //`), active nav, primary CTAs, hairline accents and numerals —
  never large background fills.

## Architecture

```
src/
  components/   Header, SiteFooter, HeroMedia, ClosingCta,
                UI (Button, SectionIndex, Masthead, Ledger, EditorialRows, FieldGrid, …)
    ui/         ShimmerButton (site CTAs), ShinyButton (header CTA)
  lib/          utils — cn() class-name joiner
  pages/        Home, About, Services, ServiceDetail, Projects, ProjectDetail,
                Blog, StartAProject, NotFound
  hooks/        useSiteBehaviour — scroll reveals, nav state, drift, progress
  data/         site.ts, services.ts — all page copy
  styles/       theme.css (tokens + primitives), layout.css (structure)
```

The four service pages share one `ServiceDetail` template driven by `data/services.ts`,
since they are structurally identical.

### Content

All copy lives in `src/data/`. Company facts (address, phone, email, socials) are in
`CONTACT`/`SOCIALS` in `site.ts` and are the single source of truth — the header,
footer, contact page and CTAs all read from there.

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/services/:slug` | Property · Interior Design · Fit-Out · Maintenance |
| `/projects` | Projects (six sectors, filterable, `#s01`–`#s06` anchors) |
| `/projects/:slug` | Project detail |
| `/blog` | Journal (see below) |
| `/start-a-project` | Contact |

`/project-detail` redirects to the project detail route.

### Blog

`/blog` is a **shell**: the site has no published articles and no blog data source, so
the page carries the design system and the route without inventing editorial content.
When posts exist, render them in place of the notice in `pages/Blog.tsx` — the section
and card primitives the listing needs are already used on that page.

## Contact form

`StartAProject` has no backend. The form composes a `mailto:` to the published address
with every field filled in, rather than silently discarding an enquiry. Name and email
are validated before submit. The footer's subscribe field works the same way.

If a form backend is added later, replace the `window.location.href` assignment in
`onSubmit` — the field markup and validation can stay as they are.

## Images

Photography lives in `src/imgs/` and is imported directly, so Vite fingerprints and
optimises it. `HeroMedia` renders the Home hero as a single still (`hero-sec.webp`),
fetched eagerly at high priority. `ClosingCta` plays the branded video
(`src/videos/hero-vid.mp4`) behind the closing panel on every page.

Aspect ratios are owned by the containing `.frame` / `.card-media` / `.sector-media`
element in CSS, so swapping an image never changes the layout.

## Accessibility & responsiveness

- Verified free of horizontal overflow at 1920 / 1440 / 1024 / 768 / 390 / 360px.
- `prefers-reduced-motion` disables reveals, button shimmer/sheen and the pulse animation.
- Touch targets are raised to 44px under `pointer: coarse`.
- The mobile drawer traps scroll, closes on Escape and on navigation.

## Deployment

Static SPA. `public/_redirects` (Netlify) and `vercel.json` (Vercel) rewrite all paths
to `index.html` so deep links resolve.
