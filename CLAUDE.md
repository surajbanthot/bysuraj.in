# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Personal portfolio website for Suraj — a design engineer who also shoots medium-format film and does cinematography/motion. A **single long-scroll editorial page** (the "Viewfinder" identity) that introduces him and serves as a hiring front door. Hosted at bysuraj.in, deployed on Vercel. Dedicated work/creative pages are planned later.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 + custom tokens/utilities in `src/app/globals.css`
- **Email:** Resend (via `/api/send` route)
- **Analytics:** Vercel Analytics (`track()` calls placed directly in event handlers)
- **Fonts:** Geist (sans/body), Geist Mono (labels/marginalia), Fraunces (`--font-display`, editorial serif headings) — loaded in `layout.tsx`

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint (flat config, eslint.config.mjs)
```

Storybook and Vitest are configured for component development and testing.

## Environment

- `.env.local` must contain `RESEND_API_KEY` for the `/api/send` email route
- Deployed on Vercel. Push to `main` triggers production deploy.

## Current design language

The live site uses the **Viewfinder** identity — a single fixed warm-paper editorial theme (**no light/dark toggle**). The signature accent is **Safelight Amber** (the darkroom safelight: legible on light and dark alike, which is why no toggle is needed).

Tokens (defined once in `src/app/globals.css` `:root` + `@theme inline` — the **source of truth**):

- `--paper` `#F4EFE6` — page canvas · `--paper-raised` `#E6DECF` — cards/wells
- `--border` `#E0D8C9` — hairline dividers
- `--ink` `#1A1714` — headings/primary · `--muted` `#5C564C` — body · `--faint` `#8A8276` — labels/marginalia
- `--accent` `#FF7A29` (safelight amber) · `--accent-press` `#E0651A`

Use them as Tailwind utilities (`bg-paper`, `text-ink`, `text-muted`, `text-accent`, `border-border`, …). Helper classes: `.display` (Fraunces headings), `.label` (mono uppercase marginalia), `.reveal`/`.is-visible` (scroll reveal), `.link-underline` (amber underline-on-hover). There are **no** `dark:` variants — the theme is fixed.

## Architecture & layout system

The root layout (`layout.tsx`) is intentionally thin: `<EditorialNav />`, `{children}`, `<FooterBar />`, `<Analytics />`. No theme provider, no easter eggs, no chrome-sizer.

- **`EditorialNav`** — sticky top bar with the wordmark, in-page anchor links, IST clock, and a mobile "Index" menu. Highlights the active section via `IntersectionObserver`. Section ids come from `navSections` in `src/lib/portfolioData.ts`.
- **`FooterBar`** — slim colophon: email, social icons, back-to-top. Uses `data-site-footer`.
- **Sticky-header offset** is handled in CSS via `scroll-padding-top` on `html` (no JS measurement).

The homepage (`src/app/page.tsx`) composes flat section components — `HeroSection`, `AboutSection`, `ExperienceSection`, `StackSection`, `ServicesSection`, `FilmSection`, `ContactSection` — each a `<section id>` matching `navSections`. All page content/data lives in **`src/lib/portfolioData.ts`** (experience, skillGroups, services, socials, SITE constants).

### Scroll reveals

`useInView` (IntersectionObserver hook) + `Reveal` wrapper apply the `.reveal` fade/rise. Reduced-motion users are handled purely in CSS (`.reveal` is forced visible under `prefers-reduced-motion`) — never call `setState` in the hook for that.

### API routes

- `/api/send` — email sending via Resend (used by the Contact section form; the route still supports the legacy film/phone field shapes)

## Key conventions

- Interactive components (forms, nav, reveals) use the `"use client"` directive; sections without interactivity stay server components
- `suppressHydrationWarning` on `<html>`; `IstClock` carries its own
- Never hardcode hex — use the `--*` tokens / Tailwind token utilities (`text-accent`, `bg-paper`, …)
- Drop a PDF at `public/Suraj-Banthot-Resume.pdf` to wire up the `SITE.resume` link

## Pages & nav

Single-page app. Nav links are in-page anchors (`#about`, `#experience`, `#stack`, `#services`, `#film`, `#contact`).

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Live | The whole site — single long-scroll editorial page |
| `/api/send` | Live | Resend email endpoint (Contact form) |

Dedicated work/photography pages are planned but not built yet.


---

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project. Follow them for every Figma-driven change.

### Required Flow (do not skip)

1. Run `get_design_context` first to fetch the structured representation for the exact node(s)
2. If the response is too large or truncated, run `get_metadata` to get the high-level node map, then re-fetch only the required node(s) with `get_design_context`
3. Run `get_screenshot` for a visual reference of the node being implemented
4. Only after you have both `get_design_context` and `get_screenshot`, download any assets and start implementation
5. Translate the MCP output (usually React + Tailwind) into this project's conventions (see below)
6. Validate against the Figma screenshot for 1:1 visual parity before marking complete

### Component Organization

- UI components live in `src/components/` — flat structure, PascalCase filenames (e.g. `MyCard.tsx`)
- Page files live in `src/app/<route>/page.tsx` (Next.js App Router)
- Shared utilities/hooks live in `src/lib/`
- IMPORTANT: Check `src/components/` for an existing component before creating a new one

### Styling Rules

- Use **Tailwind CSS v4** utility classes — there is no `tailwind.config.js`; all customization is CSS-based
- Design tokens (colors, fonts) are defined in `src/app/globals.css` via `:root {}` and `@theme inline {}`
- IMPORTANT: Never hardcode hex colors — use the Viewfinder token utilities (`text-ink`, `text-muted`, `text-faint`, `text-accent`, `bg-paper`, `bg-paper-raised`, `border-border`) or `var(--*)`
- Single fixed theme — do **not** add `dark:` variants
- Accent is `--accent` (#FF7A29). Flat aesthetic: avoid gradients/glows beyond a faint amber
- Source of truth for all colour values: `:root` and `@theme inline` blocks in `globals.css`

### Typography

- Font CSS variables (loaded in `layout.tsx`): `--font-geist-sans` (body), `--font-geist-mono` (labels/marginalia), `--font-fraunces` exposed as `--font-display` (editorial serif headings)
- Headings: use the `.display` helper class (Fraunces). Marginalia/labels: use the `.label` helper (mono, uppercase, tracked)

### Client Components

- IMPORTANT: Any component that uses hooks, event handlers, browser APIs, or `createPortal` must have `"use client"` as the first line
- Server components are the default in App Router — only add `"use client"` when actually needed

### Import Conventions

- IMPORTANT: Always use the `@/` path alias for imports (e.g. `import Foo from "@/components/Foo"`)
- Never use relative imports that go up more than one directory

### Asset Handling

- Static assets (images, videos, SVGs, fonts) live in `public/`
- Reference them with absolute paths from root: `src="/my-asset.png"`
- IMPORTANT: If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly — do not create placeholders
- IMPORTANT: Do NOT install new icon packages — use inline SVGs or assets from the Figma payload

### Layout & Viewport

- Single long-scroll page composed of `<section id>` blocks; each section sets its own vertical rhythm (`py-20 sm:py-28`) inside `max-w-6xl` containers
- The hero uses `min-h-[calc(100svh-3.5rem)]` (nav height); sticky-nav anchor offset is handled by `scroll-padding-top` on `html`
- Wrap entering content in `<Reveal>` for the scroll-in animation

### Implementation Checklist

When implementing a Figma design:
- [ ] Fetched `get_design_context` for the node
- [ ] Fetched `get_screenshot` for visual reference
- [ ] Replaced any hardcoded hex values with Viewfinder token utilities (`text-ink`, `bg-paper`, `text-accent`, …)
- [ ] Did NOT add `dark:` variants (single fixed theme)
- [ ] Used `@/` imports
- [ ] Added `"use client"` only if the component uses hooks or browser APIs
- [ ] Checked `src/components/` for reusable existing components
- [ ] Validated final output against the Figma screenshot
