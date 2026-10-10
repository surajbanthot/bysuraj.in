# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Personal portfolio website for Suraj — a design engineer who also shoots medium-format film and does cinematography/motion. The home page is **one scroll-driven motion piece**: a collage that tells how a piece of work gets made (brief → storyboard → design → animate → build → develop → final cut), with After Effects-style editor chrome. It pitches him equally for **full-time roles** and **freelance commissions**. Hosted at bysuraj.in, deployed on Vercel.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 + tokens/helpers in `src/app/globals.css`
- **Motion:** GSAP + ScrollTrigger (`@gsap/react`), Lenis smooth scroll
- **WebGL:** three + `@react-three/fiber` (hero shader only, lazy-loaded)
- **Email:** Resend (via `/api/send` route)
- **Analytics:** Vercel Analytics (`track()` calls placed directly in event handlers)
- **Fonts:** Geist (body), Geist Mono (labels), Fraunces variable with `SOFT`/`WONK`/`opsz` axes (`--font-display`) — loaded via `next/font` in `layout.tsx`

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run build:sites  # vinext / Cloudflare build (outputs to dist/)
npm run start        # Start production server
npm run lint         # ESLint (flat config, eslint.config.mjs)
```

Storybook and Vitest are configured for component development and testing.

## Environment

- `.env.local` must contain `RESEND_API_KEY` for the `/api/send` email route
- Deployed on Vercel. Push to `main` triggers production deploy.

## Design language — Darkroom

A single fixed **dark** theme (no toggle, no `dark:` variants): near-black stock, warm ink, lit by a **safelight orange** accent. The site plays on developing a photograph — letters "develop" in, film frames start as orange negatives and develop on scroll.

Tokens (defined once in `src/app/globals.css` `:root` + `@theme inline` — the **source of truth**):

- `--paper` `#0e0c0a` — canvas · `--paper-raised` `#1a1612` — cards/wells
- `--border` `#2e2721` — hairlines
- `--ink` `#f2ebe0` — headings/primary · `--muted` `#b5aa9b` — body · `--faint` `#9a8f81` — labels
- `--accent` `#ff5b24` (safelight) · `--accent-press` `#ff7a4a`

Shaders can't read CSS vars, so `src/lib/palette.ts` mirrors the tokens — keep the two in sync.

Helpers: `.display` (Fraunces; goes soft/wonky/italic inside a `.display-hover` parent on hover), `.label` (mono uppercase marginalia), `.reveal`/`.is-visible`, `.link-underline`, `.develop` (negative → positive), `.hero-letter` (CSS develop-in keyframe).

**Type floor:** nothing smaller than 13px. `.label` is 13px; mono buttons/tags use `text-sm`. Don't use `text-xs` or arbitrary sub-`0.8rem` sizes.

## Architecture

Root layout: `<SmoothScroll />`, `<Cursor />`, `<EditorialNav />`, `{children}`, `<FooterBar />`, `<Analytics />`.

- **`EditorialNav`** — fixed top bar (transparent until scrolled), anchor links (`/#id` on subpages via `usePathname`) plus a Film page link, IST clock, full-screen mobile menu. Inside the story it highlights from `useStory()`.
- **`SmoothScroll`** — Lenis driven by the GSAP ticker, synced to ScrollTrigger.
- **`Cursor`** — lens ring for fine pointers; elements opt into a label with `data-cursor="View"`.
- **`src/lib/motion.ts`** — registers GSAP plugins once; always import `gsap`/`ScrollTrigger`/`useGSAP` from here.

Home (`src/app/page.tsx`): `<StoryStage>` wrapping `<StoryScenes />`, then `CapabilitiesSection` (#services, "Two ways in"), `ExperienceSection` (#experience, styled as end credits), `ContactSection`. Acts are numbered continuously: 00–07 in the story, 08–10 after it.

All content lives in **`src/lib/portfolioData.ts`** (SITE, `storyScenes` copy, projects, experience, lanes, filmFrames, camera, socials, navSections).

### The story stage

- **`StoryScenes.tsx`** — one component per scene, each a `Scene` (`data-scene`, `id`) filled with collage `Layer`s plus a Copy layer. Scene copy comes from `storyScenes`; compositions (positions, rotations) live here.
- **`Collage.tsx`** — the kit: `Layer`, `Scrap` (torn paper, `light`/`dark`/`accent`), `Tape`, `Halftone`, `Stamp`, `Scribble` (paths with `data-draw` are drawn on), `Keyframe`, `FilmStrip`, `tornEdge()` (seeded clip-path, deterministic for SSR).
- **`Layer`** props drive everything: `enter` (how it arrives), `depth` (scroll drift + pointer parallax), `rotate`, `drag` (Draggable, fine pointers), `intro` (first-scene load animation), `name` (shown in keyframe view). It nests three boxes so the timeline (outer), Draggable/intro (middle) and parallax/rotation (inner) never share a transform — keep that structure.
- **`StoryStage.tsx`** — builds one GSAP timeline scrubbed by ScrollTrigger over a tall section with a sticky stage (`.story-live` in globals.css). Per scene: dissolve (outgoing layers drift up and fade, incoming layers settle in with short, soft moves — no full-screen wipes or flashes) → label (`tl.addLabel(sceneId)`) → hold with depth drift; stamps (`data-spin`) turn with scroll. Also: pointer parallax via `--mx/--my`, scene-anchor clicks (`#work` etc.) redirected to `labelToScroll`, Play (Lenis `scrollTo` at a 60s runtime; any manual input stops it), keyframe view (`data-craft="on"`).
- **`StoryTimeline.tsx`** — editor bar: play/pause, timecode, clickable scene markers, playhead, layer keyframe ticks, Keyframes toggle.
- **`src/lib/storyStore.ts`** — `useStory()` lets the nav follow the active scene.
- To add a scene: add copy to `storyScenes`, a composition in `StoryScenes.tsx`, and render it in order. Markers/timecode update automatically.

### WebGL & placeholders

- `HeroBackdrop` (behind the stage) always paints a CSS poster, then lazy-loads `HeroCanvas` (R3F fluid shader) via `next/dynamic` only when WebGL2 is available, `hardwareConcurrency >= 4` and motion is allowed. The canvas stops rendering offscreen. Keep three.js out of every other component.
- `ShaderFrame` renders a seeded, token-coloured CSS placeholder — or `next/image` once a `cover`/`src` exists. **To add real images:** drop files in `public/` and set `cover` on a project or `src` on a film frame.

### Motion rules

- Reduced motion (or no JS): no `.story-live`, so scenes stack one per screen, fully composed, with no timeline, wipes, Lenis, cursor, dragging or WebGL. `.reveal`/`.develop`/`.hero-letter`/`.collage-in`/marquee are neutralised in CSS. Gate GSAP work with `gsap.matchMedia` or `prefersReducedMotion()`.
- Lenis is exposed via `getLenis()` in `src/lib/motion.ts` for programmatic scrolls; import gsap/ScrollTrigger/Draggable/useGSAP from there.
- The first scene's name is server-rendered and animated with CSS (not GSAP) so it never flashes and stays the LCP element.
- Don't `setState` synchronously in effects for environment checks — use `useSyncExternalStore` (see `Cursor`, `HeroBackdrop`).

## Key conventions

- `"use client"` only for components with hooks/events/browser APIs
- Never hardcode hex — use tokens / Tailwind token utilities
- `SITE.resume` points to `public/Suraj-Banthot-Resume.pdf` — add that file or the Résumé CTA 404s

## Routes

| Route | Notes |
|-------|-------|
| `/` | Home — the scroll-driven story (00–07), then services, credits, contact |
| `/work/[slug]` | Case study, statically generated from `projects` |
| `/film` | Film contact sheet |
| `/api/send` | Resend email endpoint (Contact form) |

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
- IMPORTANT: Never hardcode hex colors — use the Darkroom token utilities (`text-ink`, `text-muted`, `text-faint`, `text-accent`, `bg-paper`, `bg-paper-raised`, `border-border`) or `var(--*)`
- Single fixed theme — do **not** add `dark:` variants
- Accent is `--accent` (#FF5B24). Glows/light leaks in accent are part of the Darkroom look; keep them soft
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

- Home is composed of `<section id>` blocks; sections use `py-24 sm:py-36` inside `max-w-7xl px-5 sm:px-8` containers
- The hero is `min-h-svh` under a fixed nav; anchor offset is handled by `scroll-padding-top` on `html` and Lenis `anchors.offset`
- Wrap entering content in `<Reveal>` for the scroll-in animation

### Implementation Checklist

When implementing a Figma design:
- [ ] Fetched `get_design_context` for the node
- [ ] Fetched `get_screenshot` for visual reference
- [ ] Replaced any hardcoded hex values with Darkroom token utilities (`text-ink`, `bg-paper`, `text-accent`, …)
- [ ] Did NOT add `dark:` variants (single fixed theme)
- [ ] Used `@/` imports
- [ ] Added `"use client"` only if the component uses hooks or browser APIs
- [ ] Checked `src/components/` for reusable existing components
- [ ] Validated final output against the Figma screenshot
