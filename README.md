# Silver Smart

React implementation of the Silver Smart website — a property, interior design,
fit-out and general maintenance company based in Abu Dhabi, UAE.

## Stack

React 18 · Vite 5 · React Router 6 · plain CSS (no framework) · a small Node server
(`server/`) for the contact endpoint, deployed on Railway

## Commands

```bash
npm install
npm run dev      # dev server on :5173 (proxies /api to :3001)
npm run dev:api  # contact API on :3001, reads .env
npm run build    # site to dist/, server to dist-server/
npm start        # production server: site + API on $PORT
npm run preview  # serve the production build without the API
npm run typecheck
npm run lint     # ESLint (typescript-eslint + react-hooks)
npm run check    # typecheck + lint
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
  assets/
    images/     photography + logo (imported, so Vite fingerprints them)
    videos/     closing-panel video
    fonts/      Twemoji country-flag font
  components/
    ui/         atoms — Button, HeaderButton, TextLink, SectionIndex, SocialIcon,
                MenuToggleIcon, ShimmerButton, ShinyButton
    sections/   page blocks — Masthead, Ledger, EditorialRows, FieldGrid,
                PullQuote, HeroMedia, ClosingCta
    layout/     site chrome — Header, SiteFooter, ScrollManager
    forms/      PhoneField, Turnstile
  data/         site.ts, services.ts — all page copy
  hooks/        useSiteBehaviour — scroll reveals, nav state, drift, progress
  lib/          utils — cn() class-name joiner
  pages/        one file per route
  styles/       theme.css (tokens + primitives), layout.css (structure)
  types/        shared TS helpers and module augmentations
server/         production server + contact endpoint (Railway)
```

Each `components/*` folder has an `index.ts`, so pages import from the folder
(`import { Button } from '@/components/ui'`). `@/` resolves to `src/`
(configured in `vite.config.ts` and `tsconfig.app.json`). Components use named
exports; pages use default exports.

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

`StartAProject` posts the enquiry as JSON to `POST /api/contact`
(`server/contact.ts`), which re-validates every field, verifies the Cloudflare
Turnstile token, and sends the email over SMTP to `CONTACT_RECEIVER_EMAIL`, with
the visitor as Reply-To. The form shows sending / sent / failed states in the
existing status line and clears only after a successful send. The footer's
email field still composes a `mailto:`.

Configuration lives in environment variables — see `.env.example`. Only
`VITE_*` values reach the browser; SMTP credentials and `TURNSTILE_SECRET_KEY`
are read by the server alone. `VITE_TURNSTILE_SITE_KEY` is inlined at build
time, so it must be set before `npm run build`.

The Turnstile widget (`components/Turnstile.tsx`) is always visible above the
submit button. For local testing it can be
bypassed only when `CONTACT_DISABLE_TURNSTILE` **and** `VITE_DISABLE_TURNSTILE`
are both `true`; production builds and `npm start` ignore the bypass.

The endpoint accepts same-origin requests only, unless extra origins are listed in
`CONTACT_ALLOWED_ORIGIN`. Well-formed requests are rate limited to 5 per IP per
10 minutes (in memory, per instance).

## Images

Photography lives in `src/assets/images/` and is imported directly, so Vite fingerprints and
optimises it. `HeroMedia` renders the Home hero as a single still (`hero-sec.webp`),
fetched eagerly at high priority. `ClosingCta` plays the branded video
(`src/assets/videos/hero-vid.mp4`) behind the closing panel on every page.

Aspect ratios are owned by the containing `.frame` / `.card-media` / `.sector-media`
element in CSS, so swapping an image never changes the layout.

## Accessibility & responsiveness

- Verified free of horizontal overflow at 1920 / 1440 / 1024 / 768 / 390 / 360px.
- `prefers-reduced-motion` disables reveals, button shimmer/sheen and the pulse animation.
- Touch targets are raised to 44px under `pointer: coarse`.
- The mobile drawer traps scroll, closes on Escape and on navigation.

## Deployment

Railway, as a single Node service. `railway.json` pins the build (`npm run build`)
and start (`npm start`) commands and a `/` healthcheck, overriding any dashboard
settings. The server (`server/index.ts`) serves `dist/` with an `index.html`
fallback so deep links resolve, and handles `/api/contact` on the same origin.
Set the variables from `.env.example` as Railway service variables (they are
needed at build time too, for `VITE_TURNSTILE_SITE_KEY`). Railway provides `PORT`.
