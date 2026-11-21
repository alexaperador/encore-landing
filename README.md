# Encore — landing page

Pre-launch website for **Encore**, the concert app for live music fans. It introduces the product in English and Spanish and collects early-access sign-ups into a Neon PostgreSQL waitlist.

- **Astro 7** (static pages + one server endpoint), **Tailwind CSS 4**, **TypeScript** (strict)
- **Neon** serverless Postgres for the waitlist, accessed only on the server
- **Lucide** icons rendered at build time (no icon JavaScript in the browser)
- Self-hosted **DM Sans** variable font, the same geometric sans as the Encore app (no third-party requests)
- Real app screenshots and the official logo, optimised at build time to AVIF/WebP with responsive sizes
- Under 1 KB of shipped JavaScript besides small inline scripts; no UI framework runtime

## Quick start

Requires Node.js **22.23.4 or newer**.

```bash
npm install
cp .env.example .env        # then paste your Neon connection string
npm run db:setup            # creates the waitlist table (once)
npm run dev                 # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run check` | Type-checks `.astro` and `.ts` files |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serves the production build locally (Node server) |
| `npm run db:setup` | Runs `db/schema.sql` against `DATABASE_URL` |

Without `DATABASE_URL` the site still runs: the form validates normally, and a submission returns a clear error (HTTP 503) instead of a fake success.

## Environment variables

| Name | Required | Where it is used |
| --- | --- | --- |
| `DATABASE_URL` | Yes, for the waitlist | Neon connection string. Declared in `astro.config.mjs` as a **server-only secret** through `astro:env`, so Astro refuses to bundle it into client code. |
| `SITE_URL` | Yes, in production | Public origin (e.g. `https://encore.app`). Used for canonical URLs, `hreflang`, Open Graph images, `robots.txt` and the sitemap. Read at **build** time. |

## Neon configuration

1. Create a project at [neon.tech](https://neon.tech) (pick the region closest to your users and host).
2. In the project dashboard, click **Connect**, choose the **pooled** connection, and copy the connection string (it ends with `?sslmode=require`).
3. Put it in `.env` locally, and in your host's environment variables in production:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
   ```
4. Create the table, either with `npm run db:setup` or by pasting `db/schema.sql` into Neon's SQL editor:
   ```sql
   CREATE TABLE IF NOT EXISTS waitlist (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```
5. Check sign-ups in the SQL editor: `SELECT email, created_at FROM waitlist ORDER BY created_at DESC;`

Tip: create a separate Neon **branch** for development so local testing never touches production sign-ups.

## How the waitlist works

`POST /api/waitlist` (`src/pages/api/waitlist.ts`) is the only on-demand route.

- Accepts `application/json` only (`{ "email": "…" }`). Browsers cannot send JSON cross-site without a CORS preflight, which this endpoint never grants, so plain-form CSRF is not possible.
- Validates with the same function the browser uses (`src/lib/email.ts`), lower-cases and trims the address, and limits it to 255 characters to match the column.
- Inserts with a parameterised query: `INSERT … ON CONFLICT (email) DO NOTHING RETURNING id`. The `UNIQUE` constraint is the source of truth for duplicates, so two simultaneous sign-ups cannot both succeed.
- Rejects bots that fill a hidden honeypot field, caps bodies at 2 KB, and rate-limits to 8 requests per minute per IP (in memory, per instance).
- Logs database errors on the server without the email address.

| Response | HTTP | Shown to the visitor |
| --- | --- | --- |
| `success` | 201 | Success panel (only after this response) |
| `duplicate` | 409 | “Already on the waitlist” notice |
| `invalid` / `required` / `tooLong` | 422 / 400 / 415 / 413 | Field error |
| `rateLimited` | 429 | “Too many attempts” |
| `server` | 500 / 503 | “We couldn’t add you right now” |

Network failures and a 12-second timeout show a connection error. Every message is translated in `src/i18n`.

## Project structure

```
encore-landing/
├── astro.config.mjs          # Node adapter, i18n routing, env schema, sitemap, Tailwind
├── db/schema.sql             # waitlist table
├── scripts/setup-db.mjs      # npm run db:setup
├── public/
│   ├── favicon-48.png, icon-192.png, icon-512.png, apple-touch-icon.png, logo.png  # resized from the official logo
│   ├── site.webmanifest
│   └── images/og-en.png, og-es.png   # 1200×630 social cards
└── src/
    ├── assets/
    │   ├── brand/encore-logo.webp   # official logo (source of every icon)
    │   ├── app/en/*.webp, app/es/*.webp  # real app screenshots per page language: explore, my-concerts, alerts
    │   └── concerts/filipenses.webp # artwork for the countdown card, cropped from the My concerts screenshot
    ├── config/site.ts        # contact email, legal date, theme colour
    ├── i18n/
    │   ├── en.ts             # every English string (source of truth)
    │   ├── es.ts             # Spanish, typed against en.ts — missing keys fail the build
    │   └── index.ts          # languages, localised routes, helpers
    ├── lib/
    │   ├── email.ts          # shared client/server validation + response types
    │   ├── screens.ts        # picks the screenshot set for the page language
    │   ├── countdown.ts      # countdown maths for the My concerts card
    │   └── db.ts             # Neon client and insert (server only)
    ├── scripts/waitlist.ts   # waitlist form behaviour
    ├── styles/global.css     # Tailwind theme from the app: palette, DM Sans scale, radii, card/chip/segmented styles
    ├── layouts/              # BaseLayout (head, header, footer), LegalLayout
    ├── components/
    │   ├── Landing.astro     # the landing page, composed once and rendered per language
    │   ├── Header, Footer, Logo, LanguageSwitch, SEO
    │   ├── sections/         # Hero, Discover, PlanCards, Reminders, History, Waitlist
    │   └── mockups/Phone.astro  # device frame around a real screenshot
    ├── content/legal/        # Privacy Policy and Terms, EN + ES
    └── pages/
        ├── index.astro, es/index.astro
        ├── privacy.astro, terms.astro, es/privacidad.astro, es/terminos.astro
        ├── 404.astro         # rendered on request, follows /es
        ├── robots.txt.ts
        └── api/waitlist.ts
```

### Adding or changing copy

Edit `src/i18n/en.ts`, then the same key in `src/i18n/es.ts`. TypeScript flags any key missing from Spanish. To add a language, add it to `languages` and `routes` in `src/i18n/index.ts`, create its dictionary, add it to `i18n.locales` in `astro.config.mjs`, and add a page that renders `<Landing lang="xx" />`.

## Deployment

The build output is a Node server (`dist/server/entry.mjs`) plus static files (`dist/client`). Pages are pre-rendered; only `/api/waitlist` and the 404 page run on the server.

### Any Node host (Render, Railway, Fly.io, a VPS, Docker)

```bash
npm ci
SITE_URL=https://your-domain npm run build
HOST=0.0.0.0 PORT=8080 DATABASE_URL=… node dist/server/entry.mjs
```

Set `DATABASE_URL` and `SITE_URL` in the host's environment settings. The server serves the static files itself.

### Vercel or Netlify

Swap the adapter; nothing else changes:

```bash
npm uninstall @astrojs/node
npx astro add vercel      # or: npx astro add netlify
```

The command updates `astro.config.mjs`. Add `DATABASE_URL` and `SITE_URL` in the project's environment variables, then deploy. On Vercel you can also connect Neon from the Storage tab, which sets `DATABASE_URL` for you.

### After the first deploy

- Submit `https://your-domain/sitemap-index.xml` in Google Search Console.
- Share a page URL in a link-preview debugger to confirm the Open Graph card.
- Sign up once with a real address and confirm the row in Neon.

## Accessibility and motion

- Semantic landmarks, one `h1` per page, a skip link, visible focus rings, labelled controls, 44 px touch targets.
- App screenshots carry descriptive alt text in the page language.
- The form announces errors and success through a live region, sets `aria-invalid`, and moves focus to the confirmation.
- Motion: a single hero entrance on load, hover and press feedback, the mobile menu, and the header pill that follows the section in view (like the app's tab bar). Nothing fades in on scroll. With `prefers-reduced-motion`, movement is removed and only colour and opacity changes remain.

## Design system (from the app)

| Token | Value | Where it comes from |
| --- | --- | --- |
| Espresso | `#3E2C23` | concert cards, tab bar, search bar |
| Peach | `#FFCD9F` | card titles, switch knobs, pill buttons |
| Coffee | `#6F4E37` | active tab, countdown chip, icon tiles |
| Beige | `#F3E1CE` | text on dark surfaces |
| Soft | `#F5F5F7` | page ground (app: `#F2F2F2`) |
| Caramel | `#A07354` / `#8A5F42` | app subtitles and section labels; the darker value is used for small text to pass WCAG AA |
| Heart | `#C65D5C` | saved-concert heart |
| Terracotta | `#D2824D` | logo ribbon, used only as a faint glow |

Type is DM Sans; radii are 8px (chips), 14px (icon tiles), 20px (cards and bars) and full pills.

### Replacing screenshots

Drop new 920×2000 screenshots into `src/assets/app/en/` (English page) or `src/assets/app/es/` (Spanish page) with the same file names; Astro regenerates every size on build. Update the matching alt text (`a11y.shot*`) in `src/i18n/en.ts` and `es.ts`.

### The countdown card

The My concerts section counts down live to the Filipenses Tour concert shown in the screenshots (Palau Sant Jordi, Barcelona, 5 March 2027, 20:00). The concert is set in `src/components/sections/PlanCards.astro`. The page is built with the time left at build time and the browser corrects it on load. After the concert the chip reads “Already played”, so swap in an upcoming concert (name, place, start time and artwork) before then.
