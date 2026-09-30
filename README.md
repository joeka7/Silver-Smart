# Silver Smart

The website for **Silver Smart**, a property, interior design, fit-out and general maintenance company based in Abu Dhabi, UAE.

It is a React + TypeScript single-page app built with Vite. A small Node server serves the production build and handles the **Start a Project** enquiry form: it validates each submission, verifies it with Cloudflare Turnstile and delivers it by SMTP.

![React 18](https://img.shields.io/badge/React-18-20232a?logo=react&logoColor=61dafb)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite 5](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Node.js ≥22](https://img.shields.io/badge/Node.js-%E2%89%A522-5fa04e?logo=nodedotjs&logoColor=white)
![Railway](https://img.shields.io/badge/Deploy-Railway-0b0d0e?logo=railway&logoColor=white)

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Routes](#routes)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Contact form](#contact-form)
- [Security](#security)
- [Environment variables](#environment-variables)
- [Production & deployment](#production--deployment)
- [Design system](#design-system)
- [Development notes](#development-notes)

---

## Features

- **Routed pages.** Home, About, Services, four service detail pages, Projects, a project case study, Blog and Start a Project, plus a 404 page.
- **Data-driven service pages.** All four service pages render from one `ServiceDetail` template and `src/data/services.ts`.
- **Sector filter** on the Projects page, with `#s01`–`#s06` anchors that still resolve.
- **Responsive header.** The full navigation collapses into a drawer below 1100px. The drawer locks page scroll and closes on Escape or on navigation.
- **Enquiry form.** Every field is required, and each field shows its own error. The form has sending, failed and success states.
- **International phone field.** A searchable country selector with flags, per-country validation, and E.164 output.
- **Country detection in the browser.** The phone country is preselected from the device time zone and language settings, with no network request.
- **Cloudflare Turnstile.** The client renders the widget and the server verifies the token before anything is sent.
- **Server-side validation, origin checks and rate limiting** on `POST /api/contact`.
- **Branded HTML notification email** with a plain-text alternative. The visitor is set as Reply-To.
- **Scroll-driven motion.** Scroll reveals, a scroll-progress bar and a header that changes once the page scrolls. Under `prefers-reduced-motion`, content is shown immediately and the button, pulse and form animations are switched off.

## Tech stack

| Area | Technology |
|---|---|
| UI | React 18, React Router 6 |
| Language | TypeScript 5 (strict), separate configs for app, Vite config and server |
| Build | Vite 5 with `@vitejs/plugin-react` |
| Styling | Plain CSS with custom-property design tokens. No CSS framework. |
| Icons | `lucide-react`, plus inline Simple Icons paths for social brands |
| Phone numbers | `libphonenumber-js` (full `max` metadata), used on both client and server |
| Server | Node.js `http` + `sirv` for static files |
| Email | `nodemailer` over SMTP |
| Bot protection | Cloudflare Turnstile |
| Linting | ESLint 9, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Hosting | Railway (`railway.json`) |

## Getting started

### Prerequisites

- **Node.js 22 or later** (`engines` in `package.json`). `npm run dev:api` uses Node's `--env-file-if-exists` flag to load `.env`.
- SMTP credentials and a Cloudflare Turnstile site/secret key pair, if you need the contact form to actually send.

### Install and configure

```bash
npm install
cp .env.example .env   # then fill in the values, see Environment variables
```

### Run locally

Local development runs two processes:

```bash
npm run dev       # Vite dev server on http://localhost:5173
npm run dev:api   # contact API on http://localhost:3001 (compiles server/, reads .env)
```

Vite proxies `/api` to `:3001` (see `vite.config.ts`). The browser therefore calls the endpoint on the same origin, just as it does in production. The proxy keeps the original `Host` header, which the endpoint's same-origin check depends on.

The site works without `dev:api`. Only form submission needs it.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with HMR. |
| `npm run dev:api` | Compiles `server/` to `dist-server/` and runs the API on `:3001`, loading `.env` if present. |
| `npm run build` | Type-checks the app (`tsc -b`), builds the site to `dist/`, then compiles the server to `dist-server/`. |
| `npm start` | Runs the production server (`NODE_ENV=production`), serving `dist/` and `/api/contact` on `$PORT`. |
| `npm run preview` | Serves the built `dist/` with Vite's preview server. It does not start the contact API. |
| `npm run typecheck` | Type-checks the app and the server without emitting. |
| `npm run lint` | Runs ESLint over the project. |
| `npm run check` | Runs `typecheck` then `lint`. |

## Routes

Routes are declared in `src/App.tsx`.

| Path | Page | Notes |
|---|---|---|
| `/` | `Home` | Hero, introduction, disciplines, selected work |
| `/about` | `About` | Philosophy, mission, how we work, sustainability, client voice |
| `/services` | `Services` | The four disciplines and the delivery sequence |
| `/services/:slug` | `ServiceDetail` | `property`, `interior-design`, `fit-out`, `maintenance`. An unknown slug redirects to `/services`. |
| `/projects` | `Projects` | Six sectors with a filter bar and `#s01`–`#s06` anchors |
| `/projects/:slug` | `ProjectDetail` | A single residential case study. The slug isn't read yet. Every project link points to `/projects/residential-interior-fit-out`. |
| `/project-detail` | — | Redirects to `/projects/residential-interior-fit-out` |
| `/blog` | `Blog` | A placeholder. There are no articles or blog data source yet. |
| `/start-a-project` | `StartAProject` | Contact details and the enquiry form. It appears as "Contact Us" in the navigation. |
| `*` | `NotFound` | Client-side 404 page |

`Header` and `SiteFooter` render on every route. `ScrollManager` scrolls to the top on navigation, or smoothly to the target of an in-page hash.

## Architecture

```
Browser ──► React SPA (Vite build, dist/)
              │
              └─ POST /api/contact (JSON, same origin)
                     │
Node server (server/index.ts)
  ├─ /api/contact  → server/contact.ts
  │                    validate → rate limit → Turnstile siteverify → SMTP (nodemailer)
  │                                                                     └─ server/email.ts renders the message
  ├─ /api/*        → 404 JSON
  └─ everything else → sirv(dist/) with index.html fallback
```

**Frontend.** `src/main.tsx` mounts `<App />` inside a `BrowserRouter` and loads the two global stylesheets. `App.tsx` defines the routes, renders the site chrome and registers the shared scroll hooks from `src/hooks/useSiteBehaviour.ts`: scroll reveals, header state and scroll progress.

**Components.** These are grouped by role, and each folder has an `index.ts` barrel:

| Folder | Contents |
|---|---|
| `components/ui/` | Atoms: `Button` / `HeaderButton` (built on `ShimmerButton` / `ShinyButton`), `TextLink`, `SectionIndex`, `SocialIcon`, `MenuToggleIcon` |
| `components/sections/` | Page blocks: `Masthead`, `HeroMedia`, `Ledger`, `EditorialRows`, `FieldGrid`, `PullQuote`, `ClosingCta` |
| `components/layout/` | Site chrome: `Header`, `SiteFooter`, `ScrollManager` |
| `components/forms/` | Contact form controls: `PhoneField`, `Turnstile` |

**Content.** `src/data/site.ts` holds company contact details, social links, navigation and the shared content blocks: home sections, sectors and testimonials. `src/data/services.ts` holds the four service pages. Copy used by only one page lives in that page file.

**Server.** `server/` is compiled separately (`tsconfig.server.json`, NodeNext) to `dist-server/`. In production a single Node process serves both the static site and the API, so no CORS is needed by default.

## Project structure

```
.
├── index.html                  Vite entry HTML (title, meta description, favicon)
├── railway.json                Railway build/start commands and healthcheck
├── vite.config.ts              React plugin, @/ alias, /api dev proxy
├── tsconfig.json               Project references → app + node configs
├── tsconfig.app.json           Browser code (src/), strict, @/* paths
├── tsconfig.node.json          vite.config.ts
├── tsconfig.server.json        server/ → dist-server/
├── eslint.config.js
├── .env.example                Environment variable template
├── server/
│   ├── index.ts                HTTP server: static files, routing, graceful shutdown
│   ├── contact.ts              POST /api/contact: validation, rate limit, Turnstile, SMTP
│   ├── email.ts                HTML + plain-text notification email
│   └── assets/logo-email.png   Inline (CID) logo used in the email
└── src/
    ├── main.tsx                React root + BrowserRouter + global CSS
    ├── App.tsx                 Routes and site chrome
    ├── pages/                  One file per route (default exports)
    ├── components/
    │   ├── ui/                 Design-system atoms
    │   ├── sections/           Reusable page blocks
    │   ├── layout/             Header, footer, scroll manager
    │   └── forms/              PhoneField, Turnstile
    ├── data/
    │   ├── site.ts             Contact details, socials, nav, sectors, shared copy
    │   └── services.ts         Service page content, slugs and images
    ├── hooks/useSiteBehaviour.ts   Scroll reveals, header scroll state, progress bar
    ├── lib/
    │   ├── detectCountry.ts    Browser-side country guess for the phone field
    │   └── utils.ts            cn() class-name joiner
    ├── styles/
    │   ├── theme.css           Tokens, type scale, primitives, button effects
    │   └── layout.css          Header, footer, page blocks, forms, phone field
    ├── types/                  StyleWithVars and a React JSX augmentation
    └── assets/
        ├── images/             Photography and logo (.webp)
        ├── videos/hero-vid.mp4 Background video for the closing CTA panel
        └── fonts/              Twemoji Country Flags (woff2 + license)
```

## Contact form

The form lives in `src/pages/StartAProject.tsx`. The endpoint lives in `server/contact.ts`.

### Flow

1. The visitor fills in the form. Client-side checks run on submit, and a field that is showing an error is re-checked as the visitor edits it.
2. If any field is invalid, every error is shown at once and focus moves to the first invalid field.
3. The form requires a Turnstile token before it sends.
4. The payload is posted as JSON to `/api/contact`, with a 30-second timeout. A ref guards against double submission.
5. The server validates everything again, rate-limits the request, verifies the Turnstile token with Cloudflare, and sends the email.
6. **On success**, the form is replaced by a success message, and focus moves to its heading. "Send Another Request" remounts a blank form with a fresh Turnstile widget.
   **On failure**, the server's message is shown in the status line and the Turnstile widget is reset, because tokens are single-use.

### Fields and validation

Every field is required. The client checks are there for usability. The server enforces the rules.

| Field | Client | Server |
|---|---|---|
| Name | Non-empty | ≤ 120 chars, no control characters |
| Email | Non-empty, email pattern | ≤ 254 chars, same pattern (no spaces, brackets, commas, semicolons, etc.) |
| Phone | Valid for the selected country | E.164 format and `isValidPhoneNumber()` |
| Location | Non-empty | ≤ 120 chars |
| Sector | One of the six sectors from `SECTORS` | ≤ 120 chars |
| Services | At least one of Property, Interior design, Fit-out, Maintenance | 1–8 entries, each ≤ 60 chars, de-duplicated |
| Message | Non-empty | ≤ 5,000 chars. Line breaks allowed, other control characters rejected. |

The email pattern is identical on both sides, so the client and server always agree.

### Phone number and country selection

`src/components/forms/PhoneField.tsx`

- The country list comes from `libphonenumber-js`, with names from `Intl.DisplayNames`. Flags are regional-indicator emoji, rendered with the bundled **Twemoji Country Flags** font.
- The list can be searched by country name, ISO code or dialling code, and navigated with the keyboard (arrows, Page Up/Down, Enter, Escape).
- The visible input holds the national number. The placeholder is an example mobile number for the selected country.
- Pasting a full international number, such as `+44…`, switches the selector to that country.
- On blur, a valid number is reformatted into the country's standard grouping.
- A hidden `phone` input carries the **E.164** value, which is what gets submitted.
- An empty field is only flagged on submit. An invalid number is flagged when focus leaves the field.

### Country detection

`src/lib/detectCountry.ts` preselects the phone country **entirely in the browser**. It makes no network request, uses no IP geolocation and shows no permission prompt.

1. **Device time zone.** The zone from `Intl.DateTimeFormat().resolvedOptions().timeZone` is looked up in a zone → country table. The table is generated from tzdata `zone.tab` and includes legacy aliases such as `Asia/Calcutta`.
2. **Browser language region.** If the time zone gives no match, the first explicit region in `navigator.languages` / `navigator.language` is used, for example `en-GB` → `GB`. A bare `en` doesn't count.
3. **Fallback.** If neither gives a supported country, the form's `defaultCountry` is used. This is `AE`.

Detection is wrapped in try/catch, so it can never stop the form rendering.

### Cloudflare Turnstile

`src/components/forms/Turnstile.tsx`

- The Turnstile script loads on demand, in explicit render mode. The widget is always visible above the submit button.
- It uses the dark theme, and the compact size on screens narrower than 400px.
- The token is cleared when it expires, times out, errors or is reset. If `VITE_TURNSTILE_SITE_KEY` is missing or the script fails to load, the form tells the visitor the security check could not load.
- The server posts the token, and the client IP when known, to Cloudflare's `siteverify` endpoint with an 8-second timeout. No email is sent unless verification succeeds.

**Local bypass.** Turnstile can be switched off for local testing only when `VITE_DISABLE_TURNSTILE` **and** `CONTACT_DISABLE_TURNSTILE` are both `true`. Production builds ignore the client flag. The server ignores the bypass whenever `NODE_ENV=production`, which `npm start` sets.

### API: `POST /api/contact`

**Request** (`Content-Type: application/json`, max 32 KB):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+971501234567",
  "location": "Abu Dhabi",
  "sector": "Residential",
  "services": ["Interior design", "Fit-out"],
  "message": "Villa refurbishment, three bedrooms, Q3 start.",
  "turnstileToken": "<token from the widget>"
}
```

**Response.** The body is always `{ "ok": true }` or `{ "ok": false, "error": "<user-facing message>" }`.

| Status | When |
|---|---|
| `200` | Enquiry delivered |
| `204` | CORS preflight from an allowed origin |
| `400` | Malformed JSON, a missing or invalid field, or a missing or rejected Turnstile token |
| `403` | Missing `Origin`, or an origin that is neither same-origin nor allowed (this includes preflights) |
| `405` | Method other than `POST` (or `OPTIONS` for an allowed origin) |
| `413` | Body over 32 KB |
| `415` | Content type is not `application/json` |
| `429` | More than 5 well-formed requests from one IP in 10 minutes |
| `502` | SMTP delivery failed |
| `503` | Server is missing required configuration, or Turnstile could not be reached |

### Email delivery

`server/email.ts` renders the notification. `server/contact.ts` sends it with nodemailer.

- **From:** "Silver Smart website" `<SMTP_USER>`. **To:** `CONTACT_RECEIVER_EMAIL`. **Reply-To:** the visitor.
- **Subject:** `New Project Inquiry from <name> — Silver Smart`. Including the sender's name keeps each enquiry in its own thread.
- The HTML version is table-based with inline styles, for compatibility with Gmail, Outlook and Apple Mail. A plain-text alternative is included.
- Contents: name, email, phone (with the country name derived from the number), location, sector, the requested services, the project message, and a submission time in Asia/Dubai time. The submission time is taken on the server.
- The logo is attached inline as a CID image (`server/assets/logo-email.png`). If the file is missing, the header falls back to text.
- The SMTP transport is created on first use and reused. It has connection, greeting and socket timeouts.

## Security

What the project implements:

- **Secrets stay on the server.** Only `VITE_*` variables are bundled into the browser. SMTP credentials and `TURNSTILE_SECRET_KEY` are read only by `server/`.
- **Server-side validation** of every field (types, lengths, required values, email pattern, phone validity), whatever the client sent.
- **Header-injection protection.** Control characters are rejected in single-line fields, and the email pattern excludes separators, so the Reply-To address can't carry extra recipients.
- **HTML escaping.** Every submitted value is escaped before it goes into the email. `mailto:` links are percent-encoded.
- **Origin check.** Requests must be same-origin unless the origin is listed in `CONTACT_ALLOWED_ORIGIN`. A wildcard `*` is ignored.
- **Bot protection.** The Turnstile token is verified before any email is sent.
- **Rate limiting.** Each IP may send 5 well-formed requests per 10 minutes. The counter is kept in memory, so it is per instance. In production the client IP is the last `X-Forwarded-For` entry, which is the one Railway's proxy appends.
- **Body size limit.** Requests over 32 KB are refused, whether that shows in `Content-Length` or while the body is streamed.
- **Safe responses and logs.** Errors are fixed, user-facing sentences. Logs record error codes and the names of missing settings, never values, message content or credentials.
- **Response headers.** API responses send `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`.

## Environment variables

Copy `.env.example` to `.env` for local development. `.env` and every `.env.*` file except the example are git-ignored.

```env
# SMTP (server only)
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=

# Contact form recipient (server only)
CONTACT_RECEIVER_EMAIL=

# Cloudflare Turnstile
VITE_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Local testing only. Both must be true to bypass Turnstile.
CONTACT_DISABLE_TURNSTILE=false
VITE_DISABLE_TURNSTILE=false

# Optional: extra origins allowed to call /api/contact (comma-separated)
# CONTACT_ALLOWED_ORIGIN=
```

### Frontend (exposed to the browser)

| Variable | Required | Purpose |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Yes | Public Turnstile site key. **Inlined at build time**, so it must be set before `npm run build`. |
| `VITE_DISABLE_TURNSTILE` | No | `true` hides the widget in the dev server. Ignored in production builds. |

### Server only

| Variable | Required | Purpose |
|---|---|---|
| `SMTP_HOST` | Yes | SMTP server hostname. |
| `SMTP_PORT` | No | Defaults to `465`. |
| `SMTP_SECURE` | No | `true` for implicit TLS. If unset, it is `true` on port 465; other ports negotiate STARTTLS. |
| `SMTP_USER` | Yes | SMTP username. Also used as the From address. |
| `SMTP_PASS` | Yes | SMTP password. |
| `CONTACT_RECEIVER_EMAIL` | Yes | Mailbox that receives enquiries. |
| `TURNSTILE_SECRET_KEY` | Yes* | Turnstile secret for `siteverify`. *Not needed only while the local bypass is active. |
| `CONTACT_DISABLE_TURNSTILE` | No | `true` (together with `VITE_DISABLE_TURNSTILE`) skips verification. Ignored when `NODE_ENV=production`. |
| `CONTACT_ALLOWED_ORIGIN` | No | Comma-separated extra origins allowed to call the endpoint cross-origin. Not needed for the default same-origin setup. |
| `PORT` | No | Server port. Defaults to `3001`. Railway provides it. |

> [!NOTE]
> If a required server variable is missing, the server still starts. It logs the names of the missing variables, and the endpoint returns `503` until they are set.

> [!WARNING]
> Never give a server secret a `VITE_` prefix. Anything prefixed `VITE_` is embedded in the public JavaScript bundle.

## Production & deployment

### Build and run

```bash
npm run build   # dist/ (site) + dist-server/ (server)
npm start       # NODE_ENV=production node dist-server/index.js
```

The production server (`server/index.ts`):

- Serves `dist/` with an `index.html` fallback, so deep links such as `/services/fit-out` resolve.
- Caches fingerprinted files under `/assets/` for a year (`immutable`) and revalidates everything else (`no-cache`).
- Handles `/api/contact` on the same origin, and returns a JSON 404 for any other `/api/*` path.
- Responds `405` to non-GET/HEAD requests for static paths.
- Finishes in-flight requests on `SIGTERM`/`SIGINT` before exiting, with a 10-second cap.

### Railway

The app deploys to Railway as one Node service. `railway.json` sets the following, and these override the dashboard settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Start command | `npm start` |
| Healthcheck | `/` |
| Restart policy | On failure |

Set the variables from [Environment variables](#environment-variables) as Railway service variables. `.env` is not deployed.

- `VITE_TURNSTILE_SITE_KEY` is read **during the build**. After changing it, redeploy so the bundle is rebuilt.
- Railway provides `PORT`.
- The rate limiter keeps its state in memory. It is correct for a single instance, but each replica would count separately.
- The compiled server reads the email logo from `server/assets/` at runtime, so that folder has to ship with the deployment.

## Design system

The visual system, "Architectural Prestige", is implemented in plain CSS from a Stitch design export.

- **`src/styles/theme.css`** holds the tokens and primitives: colour roles, type scale, spacing, buttons, links, image frames and the reveal animation.
- **`src/styles/layout.css`** holds the structure: header and drawer, footer, hero, repeating page blocks, forms and the phone field.

Key characteristics:

- **Dark canvas.** The base surface is `#121316`, with tonal steps for elevation and 1px hairlines instead of shadows.
- **Sharp geometry.** The default border radius is `0`. Pill buttons and status dots are the exceptions.
- **Typography.** Syne for headlines, Plus Jakarta Sans for body text, and JetBrains Mono for labels and indices. All three load from Google Fonts.
- **Brand orange `#e8762b`** (`--primary-container`) is reserved for accents: section indices, the active nav item, primary CTAs and highlighted words.
- **Touch targets.** On `pointer: coarse` devices, links and controls in the footer, panels, filters and form options get a minimum height of 2.75rem (44px).

## Development notes

- **Imports.** `@/` resolves to `src/`. The alias is configured in both `vite.config.ts` and `tsconfig.app.json`. Import components from their folder barrel (`import { Button } from '@/components/ui'`). Components use named exports, and pages use default exports.
- **Company details** (address, phone, WhatsApp, email, socials) live in `CONTACT` and `SOCIALS` in `src/data/site.ts`. The header, footer, contact page and CTAs all read from there, so this is the one place to change them.
- **Navigation** comes from `NAV` and `NAV_CTA` in `site.ts`. The footer's service links are derived from `services.ts`.
- **Adding a service page** means adding an entry to `SERVICES`, the `ServiceSlug` union and `SERVICE_IMAGE` in `src/data/services.ts`. The route, footer link and Services listing then pick it up. TypeScript will flag any other `Record<ServiceSlug, …>` map that needs an entry, such as `DISCIPLINE_TAG` in `Services.tsx`. The Home page's disciplines list (`HOME_SERVICES` in `site.ts`) is maintained separately.
- **Form options.** The sector dropdown is built from `SECTORS`. The **service checkboxes are a separate list** (`SERVICE_OPTIONS` in `StartAProject.tsx`), so update both when services change.
- **Images** are imported from `src/assets/` rather than referenced by URL, so Vite fingerprints them. Aspect ratios are set by the containing CSS frame, so swapping an image doesn't shift the layout. There is no `public/` directory.
- **Scroll reveals.** Add `data-r` to an element to reveal it on scroll, or `data-stagger` on a parent to stagger its children. `useReveals` re-binds on every route change.
- **`ClosingCta`** plays `hero-vid.mp4` behind the closing panel. It is used on every page except Start a Project and 404.
- **Blog.** When articles exist, render them in `src/pages/Blog.tsx` in place of the current notice.
- **Project detail** is currently one static case study. To support several projects, read the `:slug` param in `ProjectDetail.tsx` and add a data source.
- **Unused data.** `APPROACH` and `CLIENTS` in `site.ts` are exported but not currently rendered.
- **Before committing**, run `npm run check`. There is no test suite in the repository.