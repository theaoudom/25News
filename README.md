# 25News — Next.js News Platform

A modern, SEO-first news website covering **World, Sports, Football, the FIFA World Cup 2026, and Esports**, rebuilt with **Next.js (App Router)** and **Clean Architecture**.

Live data for the World Cup section comes from a pluggable football provider (API-Football), with a bundled fallback dataset so the site works out of the box.

---

## Table of Contents

1. [Quick start](#quick-start)
2. [Architecture decisions](#architecture-decisions)
3. [Project structure](#project-structure)
4. [API integrations](#api-integrations)
5. [SEO setup](#seo-setup)
6. [AdSense compliance checklist](#adsense-compliance-checklist)
7. [Accessibility & performance](#accessibility--performance)
8. [Deployment instructions](#deployment-instructions)
9. [Environment variables](#environment-variables)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional — site works without a key)
cp .env.example .env.local
#   edit .env.local and add FOOTBALL_API_KEY if you have one

# 3. Run the dev server
npm run dev          # http://localhost:3000

# 4. Production build
npm run build
npm start
```

Useful scripts: `npm run lint`, `npm run typecheck`.

The previous static site is preserved under [`legacy/`](./legacy) for reference and is excluded from the build.

---

## Architecture decisions

The codebase follows **Clean Architecture**: dependencies point inward, and the
domain core knows nothing about Next.js, React, or any data provider.

```
Presentation  →  Domain  ←  Data
   (UI)          (core)     (sources)
        \          ↑          /
         \         |         /
          → Dependency Injection ←
```

| Layer | Folder | Responsibility | Depends on |
|-------|--------|----------------|------------|
| **Domain** | `src/domain` | Entities, repository *interfaces*, use cases (business rules). Pure TypeScript, framework-free. | nothing |
| **Data** | `src/data` | Repository *implementations*, data sources (typed local content, API-Football client), mappers from vendor shapes → entities. | Domain |
| **Presentation** | `src/presentation` + `app/` | React components, sections, and Next.js routes. Reads data only through use cases. | Domain (+ DI) |
| **DI** | `src/di/container.ts` | Composition root: binds concrete implementations to interfaces and exposes use-case singletons. | Domain + Data |
| **Shared** | `src/shared` | Cross-cutting config, utils, and SEO helpers. | nothing app-specific |

**Why this matters:**

- **Swappable data layer.** Articles come from typed local data today
  (`LocalArticleRepository`). To move to a CMS (Sanity, Contentful, WordPress),
  write a new repository implementing `ArticleRepository` and change one line in
  `container.ts` — no UI or domain changes.
- **Provider independence.** The football UI depends on the `FootballRepository`
  interface and domain entities (`Fixture`, `GroupStanding`), never on
  API-Football's payload shape. Switching providers means writing a new client +
  mapper.
- **Testability.** Use cases take repositories via their constructor, so they can
  be unit-tested with in-memory fakes.

---

## Project structure

```
app/                         # Next.js App Router (presentation routes)
  layout.tsx                 # Root layout: fonts, theme, nav/footer, AdSense, JSON-LD
  page.tsx                   # Homepage (breaking/trending/sports/world-cup sections)
  article/[slug]/page.tsx    # Article detail (SSG + ISR, NewsArticle JSON-LD)
  category/[slug]/page.tsx   # Category landing pages
  search/page.tsx            # Site search
  world-cup/                 # World Cup hub, fixtures, results, standings, live, news
  api/world-cup/live/route.ts# Server proxy for live scores (hides API key)
  about|contact|privacy-policy|terms|disclaimer|cookie-policy/
  sitemap.ts | robots.ts | manifest.ts

src/
  domain/                    # entities · repositories (interfaces) · usecases
  data/
    sources/local/           # migrated articles + authors (typed)
    sources/football/        # API-Football client + bundled fallback dataset
    repositories/            # LocalArticleRepository · ApiFootballRepository
  di/container.ts            # composition root
  presentation/
    components/               # Navbar, Footer, ArticleCard, AdSlot, football/*, ...
    sections/                 # homepage sections (BreakingTicker, WorldCupWidget)
  shared/
    config/site.ts           # site metadata + navigation
    seo/                      # metadata builder + JSON-LD generators
    utils/                    # text + date helpers

public/                      # images, ads.txt, CNAME
legacy/                      # archived original static site (not built)
```

---

## API integrations

### Football data — free providers with 2026 coverage

The World Cup section uses a **chain of free providers** that actually carry
FIFA World Cup 2026 data, orchestrated by `WorldCupFootballRepository`:

1. **[TheSportsDB](https://www.thesportsdb.com/)** (primary) —
   `theSportsDbClient.ts`. Free; covers 2026 fixtures, results, group standings
   and team badges. Works out of the box with the public test key `3`; set
   `THESPORTSDB_KEY` to your own free key for higher rate limits, and
   `THESPORTSDB_WC_LEAGUE_ID` (default `4429`).
2. **[openfootball/worldcup.json](https://github.com/openfootball/worldcup.json)**
   (backup) — `openFootballClient.ts`. Public-domain, **no key**, full 104-match
   2026 schedule with groups; standings are computed from finished matches.
3. **Bundled fallback** — `fallbackData.ts`, used only if both live sources fail.

- **Why not API-Football?** Its *free* tier does not include the 2026 season
  (confirmed: returns 0 results). TheSportsDB's free tier does.
- **Graceful degradation:** each source is tried in order; on error or empty
  response the next is used. The resolved provider is exposed as
  `snapshot.source`, and `isFallback` is surfaced to the UI as "sample data".
  **The site never breaks because of the football API.**
- **Caching:** server-side `fetch` uses Next.js `revalidate` (fixtures 5 min,
  standings 15 min). The live page also polls `/api/world-cup/live` every 45 s.
- **Diagnostics:** `GET /api/world-cup/status` reports the active source, mode
  (`live`/`fallback`) and counts — handy after a deploy.
- **Season:** controlled by `FOOTBALL_WORLDCUP_SEASON` (default `2026`), shared
  across providers.

### Content

Articles and authors were migrated from the legacy site into typed modules under
`src/data/sources/local/`. Each raw article is normalised by a `build()` mapper
that derives the slug, reading time and dates.

---

## SEO setup

| Feature | Where |
|---------|-------|
| Dynamic meta titles & descriptions | `buildMetadata()` in `src/shared/seo/metadata.ts`, used by every page's `generateMetadata` |
| Canonical URLs | `alternates.canonical` on every page |
| Open Graph + Twitter cards | `buildMetadata()` (article type sets published/modified/author) |
| Structured data (JSON-LD) | `src/shared/seo/jsonLd.ts`: `NewsMediaOrganization`, `WebSite` (+Sitelinks search), `NewsArticle`, `BreadcrumbList`, `SportsEvent` |
| XML sitemap | `app/sitemap.ts` (static + categories + all articles) → `/sitemap.xml` |
| robots.txt | `app/robots.ts` → `/robots.txt` (disallows `/api/`, `/search`) |
| Breadcrumb navigation | `Breadcrumbs` component (visible trail + matching JSON-LD) |
| Optimised images | `next/image` everywhere (AVIF/WebP, responsive `sizes`, lazy by default, `priority` for LCP) |
| SEO-friendly URLs | `/article/<slug>`, `/category/<slug>`, `/world-cup/...` |
| Author info + dates | Rendered on every article + reflected in `NewsArticle` JSON-LD (E-E-A-T) |

---

## AdSense compliance checklist

✅ **Required pages present:** About, Contact, Privacy Policy, Terms & Conditions, Disclaimer, Cookie Policy — all linked in the footer.
✅ **Privacy policy** covers cookies, Google AdSense, third-party vendors, and opt-out links (Google Ads Settings, aboutads.info).
✅ **`ads.txt`** at `public/ads.txt` declaring the publisher id.
✅ **AdSense script** loaded once in the root layout (`afterInteractive`), gated on `NEXT_PUBLIC_ADSENSE_CLIENT`.
✅ **Ads clearly labelled** ("Advertisement") and never disguised as content (`AdSlot` component).
✅ **Content-to-ad ratio:** ad slots are spaced between substantial content blocks, not stacked.
✅ **Original, substantial content:** full-length articles with author bylines and dates.
✅ **Mobile-friendly:** responsive layouts, responsive ad units (`data-full-width-responsive`).
✅ **Fast loading:** SSG/ISR, `next/image`, font `display: swap`, minimal client JS.
✅ **HTTPS:** enforced by the host (Vercel) + canonical `https://` URLs.
✅ **Clear navigation & search** for content discovery.
✅ **E-E-A-T:** author names, roles and bios on articles; editorial standards on the About page.
⚠️ **Before requesting review:** replace placeholder images, set a real `FOOTBALL_API_KEY` if you want live data, and create real ad units in AdSense, passing each unit's slot id to `<AdSlot slot="..." />`.

> **Note on invalid clicks:** never click your own ads or encourage clicks. The
> `AdSlot` placeholders are non-interactive when no real unit is configured.

---

## Accessibility & performance

- **WCAG:** skip-to-content link, semantic landmarks (`header`/`main`/`nav`/`footer`), `aria-current` on active nav, labelled controls, visible focus rings, alt text on images, `prefers-reduced-motion` support, accessible color contrast.
- **Core Web Vitals:** server components by default (minimal JS), `next/image` for LCP/CLS, hero image `priority`, ISR for fast TTFB, `font-display: swap`.
- **Dark mode:** `next-themes` with system detection and no flash (`suppressHydrationWarning`).

---

## Deployment instructions

### Vercel (recommended)

1. Push this repository to GitHub/GitLab.
2. In Vercel, **New Project → Import** the repo. Framework preset: **Next.js** (auto-detected).
3. Add environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://25news.xyz`
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = `ca-pub-5602570319866246`
   - `FOOTBALL_API_KEY` (optional, for live data)
   - `FOOTBALL_API_HOST`, `FOOTBALL_WORLDCUP_LEAGUE_ID`, `FOOTBALL_WORLDCUP_SEASON`
4. **Deploy.**
5. **Custom domain:** add `25news.xyz` in Vercel → Domains, and update DNS:
   - Apex `25news.xyz` → Vercel A record `76.76.21.21` (or the value Vercel shows).
   - `www` → CNAME `cname.vercel-dns.com`.
   - This replaces the previous GitHub Pages setup. The old `CNAME` file is kept in `public/` only for reference; Vercel uses the dashboard domain config.

### Other Node hosts (Netlify, Cloudflare, self-hosted)

`npm run build` produces a standard Next.js server build. Run with `npm start`
behind a reverse proxy, or use the host's Next.js adapter. Server features
(API routes, ISR, live scores) require a Node runtime — **not** static export.

---

## Environment variables

See [`.env.example`](./.env.example) for the full list. Summary:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical URLs, sitemap, OG tags |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | for ads | AdSense publisher id |
| `FOOTBALL_API_KEY` | optional | Enables live football data (else fallback) |
| `FOOTBALL_API_HOST` | optional | `v3.football.api-sports.io` or RapidAPI host |
| `FOOTBALL_WORLDCUP_LEAGUE_ID` | optional | API-Football league id (World Cup = `1`) |
| `FOOTBALL_WORLDCUP_SEASON` | optional | Tournament season year (e.g. `2026`) |

---

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and `next-themes`.
