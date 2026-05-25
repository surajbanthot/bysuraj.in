# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Personal portfolio website for Suraj — a design engineer. Creative playground and hiring platform showcasing frontend, 3D, motion, and design skills. Hosted at bysuraj.in, deployed on Vercel.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 + custom animations/utilities in `src/app/globals.css`
- **Email:** Resend (via `/api/send` route)
- **Analytics:** Vercel Analytics (`track()` calls placed directly in event handlers)
- **Fonts:** VT323, Bungee, Bungee_Spice, Quantico, Geist (loaded in `layout.tsx`)

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

The live site uses the **Arctic Shore** palette — sky/cyan/teal on deep navy backgrounds.

- **Accent (light mode):** `sky-600` (#0284C7) — buttons, links, active states
- **Accent (dark mode):** `sky-400` (#38BDF8) — brighter for contrast
- **Secondary accent:** `cyan-400` (#22D3EE) — lightning bolt decorations, glows
- **Neutrals:** `sky-*` for surfaces/borders, `slate-*` for muted text
- **Page bg light:** `sky-50` (#F0F9FF)
- **Page bg dark:** `sky-950` (#082F49) — deep navy, not pitch black
- **Glow shadow color:** `rgba(2,132,199,…)` (sky-600)
- Dark mode supported throughout via `dark:` variants

The color definitions in `src/app/globals.css` (`:root` and `@theme inline`) are the **source of truth** for this palette.

## Architecture & layout system

The root layout (`layout.tsx`) mounts persistent shell components on every page:
- **`NavBarShell`** — wraps `NavBar` and the scroll-aware IST clock. On the homepage, the clock in the nav fades in only when the hero clock scrolls out of view (tracked via `getBoundingClientRect` + rAF). Uses `data-nav-shell` attribute for self-measurement.
- **`FooterBar`** — always visible; contains social links and a phone enquiry modal that POSTs to `/api/send`. Uses `data-site-footer` attribute.
- **`WIPSidebar`** — only renders on `/`. In dev mode, items can be added/deleted and are written back to the component's source via `/api/wip`. Items are hardcoded in the component itself.
- **`LayoutChromeSizer`** — headless component that measures `[data-site-header]` + `[data-site-footer]` heights and writes the sum to `--app-chrome` CSS variable. Pages use `min-h-[calc(100svh-var(--app-chrome,0px))]` for true full-viewport height.
- **`ResumeButton`**, **`F1Car`**, **`Superman`**, **`SpiderMan`** — global floating/easter-egg components rendered at the body level.

### API routes

- `/api/send` — email sending via Resend (used by FooterBar's enquiry modal)
- `/api/wip` — dev-only route to persist WIP sidebar items back to component source

## Key conventions

- All interactive components use `"use client"` directive
- `suppressHydrationWarning` on `<html>` and any time-dependent elements
- Session storage key `"hireMeTab"` tracks active tab on `/hireme`
- `mobile-menu-open` body class is added when the mobile nav overlay is open (hides other fixed elements)
- NavBar mobile menu is rendered via `createPortal` into `document.body`
- "Hire me!!" nav button triggers a lightning animation every 15s until the user visits `/hireme`
- Easter egg components (Superman, SpiderMan, F1Car) use `easterEggCoordinator` — a module-level singleton mutex — so only one can animate at a time. Call `acquireEasterEggSlot(id)` before animating, `releaseEasterEggSlot(id)` when done.

## Pages & nav

| Route | Status | Nav label |
|-------|--------|-----------|
| `/` | Live | Home |
| `/code` | Live | Code |
| `/social` | Live | Socials |
| `/hireme` | Live | Hire me!! |
| `/motiongraphics` | WIP | Not in nav |


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
- IMPORTANT: Never hardcode hex colors — use Tailwind color utilities or `var(--*)` tokens
- Current palette: `sky-600` / `dark:sky-400` for accent/interactive; `sky-*` for surfaces/borders; `slate-*` for muted text
- Dark mode is supported via `dark:` Tailwind variants throughout; always include dark mode classes
- Glow shadows use `rgba(2,132,199,…)` (sky-600). Never use orange rgba values.
- Source of truth for all colour values: `:root` and `@theme inline` blocks in `globals.css`
- Custom animations are defined as `@keyframes` in `globals.css` and exposed as `.animate-*` utility classes — add new animations there, not inline

### Typography

- Available font CSS variables (loaded in `layout.tsx`): `--font-geist-sans`, `--font-geist-mono`, `--font-bungee`, `--font-bungee-spice`, `--font-retro` (VT323), `--font-quantico`
- Apply fonts using Tailwind's arbitrary property syntax: `font-[family-name:var(--font-bungee)]`, `font-[family-name:var(--font-retro)]`, etc.
- `Bungee Spice` is for main headings only (use `.bungee-heading` class or `--font-bungee-spice`)

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

- Pages use `min-h-[calc(100svh-var(--app-chrome,0px))]` for true full-viewport height (accounts for NavBar + FooterBar chrome measured by `LayoutChromeSizer`)
- The `--app-chrome` CSS variable is set at runtime; always reference it for full-height layouts

### Easter Egg Components

- Components that animate on a trigger (Superman, SpiderMan, F1Car) must use the `easterEggCoordinator` singleton from `src/lib/easterEggCoordinator.ts`
- Call `acquireEasterEggSlot(id)` before animating; call `releaseEasterEggSlot(id)` when the animation ends
- Only one easter egg component may animate at a time

### Implementation Checklist

When implementing a Figma design:
- [ ] Fetched `get_design_context` for the node
- [ ] Fetched `get_screenshot` for visual reference
- [ ] Replaced any hardcoded hex values with `sky-*` / `slate-*` Tailwind tokens
- [ ] Added `dark:` variants for all color classes
- [ ] Used `@/` imports
- [ ] Added `"use client"` if the component uses hooks or browser APIs
- [ ] Checked `src/components/` for reusable existing components
- [ ] Validated final output against the Figma screenshot
