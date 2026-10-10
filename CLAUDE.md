# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Personal portfolio website for Suraj — a design engineer who also shoots medium-format film and does cinematography/motion. The home page opens on a conventional hero (name, headline, CTAs); right below it sits a **process reel** — a framed, autoplaying collage piece that tells how a piece of work gets made (brief → storyboard → design → animate → build → develop → final cut), with After Effects-style editor controls. The reel is an attention-grabber that never takes over the page scroll. It pitches him equally for **full-time roles** and **freelance commissions**. Hosted at bysuraj.in, deployed on Vercel.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 + tokens/helpers in `src/app/globals.css`
- **Motion:** GSAP + ScrollTrigger (`@gsap/react`), Lenis smooth scroll
- **WebGL:** one hand-written WebGL2 fragment shader (`HeroCanvas`), lazy-loaded — no 3D library
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

```bash
npm run storybook        # Component library (localhost:6006)
npm run build-storybook  # Static Storybook build
```

Storybook documents every atom and molecule (stories sit next to each component as `*.stories.tsx`). It uses its own `.storybook/vite.config.ts` — the root `vite.config.ts` is the vinext/Cloudflare build and must not be loaded by Storybook. Vitest runs stories as tests via `@storybook/addon-vitest` (needs Playwright's Chromium: `npx playwright install chromium`).

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

## Component architecture — atomic design

`src/components/` follows atomic design. Put new components at the lowest level that fits, and build upward from existing pieces:

| Folder | What lives there | Examples |
|---|---|---|
| `atoms/` | Smallest UI pieces; no other components except `Anchor` | `Anchor`, `Button`, `TextLink`, `Tag`, `Kicker`, `Tape`, `Halftone`, `Stamp`, `Scribble`, `Keyframe`, `IstClock`, `SplitText` |
| `molecules/` | Small compositions of atoms | `Scrap`, `FilmStrip`, `ShaderFrame`, `SectionHeading`, `FormField`, `CaseCard`, `FilmFrameCard` |
| `organisms/` | Page sections and site chrome | `EditorialNav`, `FooterBar`, `CapabilitiesSection`, `ExperienceSection`, `ContactSection`, `story/` (stage, timeline, `scenes/*Scene.tsx`) |
| `templates/` | Page/frame layouts with slots | `SubpageShell` (/film, /work/[slug]), `Scene` (+ `SceneCopy`) |
| `motion/` | Behaviour, not visuals — scroll, cursor, reveal, WebGL | `SmoothScroll`, `Cursor`, `Reveal`, `Layer`, `HeroBackdrop`, `HeroCanvas` |
| `src/app/**` | Pages (Next.js routes) | |

Rules:
- **Use the atoms instead of re-styling.** Pill buttons → `Button` (`variant` primary/outline/accent/quiet, `size` sm/md/lg, `pressed` for toggles, `href` makes it a link). Links → `Anchor`/`TextLink` (external URLs get `target=_blank` automatically; never hand-write `rel`). Section/act labels → `Kicker` (`no="09"`). Chips → `Tag`. Form inputs → `FormField`.
- A component may import only from its own level or below (atoms never import molecules, etc.). `motion/` and `templates/` can be used by any level that needs them.
- Import by full path (`@/components/atoms/Button`) — no barrel `index.ts` files.
- Every atom and molecule gets a colocated `*.stories.tsx`.
- Hooks and helpers live in `src/lib/` (`useInView`, `tornEdge`, `fonts`, `motion`).

## Architecture

Root layout: `<SmoothScroll />`, `<Cursor />`, `<EditorialNav />`, `{children}`, `<FooterBar />`, `<Analytics />`.

- **`EditorialNav`** — fixed top bar (transparent until scrolled), anchor links (`/#id` on subpages via `usePathname`) plus a Film page link, IST clock, full-screen mobile menu. Highlights the section in view.
- **`SmoothScroll`** — Lenis driven by the GSAP ticker, synced to ScrollTrigger.
- **`Cursor`** — lens ring for fine pointers; elements opt into a label with `data-cursor="View"`.
- **`src/lib/motion.ts`** — registers GSAP plugins once; always import `gsap`/`ScrollTrigger`/`useGSAP` from here.

Home (`src/app/page.tsx`): `HeroSection` (#top) → `ReelSection` (#reel, 01 Process) → `WorkSection` (#work, 02) → `CapabilitiesSection` (#services, 03 "Two ways in") → `ExperienceSection` (#experience, 04, styled as end credits) → `ContactSection` (05). The hero is deliberately shorter than the screen on desktop so the top of the reel peeks into the first view. Projects always appear in `WorkSection` — never only inside the reel.

All content lives in **`src/lib/portfolioData.ts`** (SITE, `storyScenes` copy, projects, experience, lanes, filmFrames, camera, socials, navSections).

### The process reel

- **`organisms/story/scenes/*Scene.tsx`** — one file per scene, each a `Scene` template (`data-scene`, `id`) filled with collage `Layer`s plus a Copy layer. Scene copy comes from `storyScenes` (via `getScene(id)`); compositions (positions, rotations) live in the scene file. `StoryScenes.tsx` renders them in order.
- **Collage kit** — atoms `Tape`, `Halftone`, `Stamp`, `Scribble` (paths with `data-draw` are drawn on), `Keyframe`; molecules `Scrap` (torn paper, `light`/`dark`/`accent`), `FilmStrip`, `CaseCard`; `tornEdge()` in `src/lib/tornEdge.ts` (seeded clip-path, deterministic for SSR).
- **`motion/Layer`** props drive everything: `enter` (how it arrives), `depth` (scroll drift + pointer parallax), `rotate`, `drag` (Draggable, fine pointers), `name` (shown in keyframe view). It nests three boxes so the timeline (outer), Draggable (middle) and parallax/rotation (inner) never share a transform — keep that structure.
- **`organisms/story/StoryPlayer.tsx`** — plays the scenes as one time-based GSAP timeline (~50s, loops) inside a framed canvas. Scenes are composed on a fixed canvas (1440×900 when the frame is ≥640px wide, 390×760 below) and CSS-scaled to fit, like a video; fullscreen fits it to the screen. Per scene: dissolve (outgoing layers drift up and fade, incoming settle in with short, soft moves — no full-screen wipes or flashes) → label (`addLabel(sceneId)`) → ~4.5s hold with depth drift; stamps (`data-spin`) turn. Autoplays when ≥40% on screen, pauses when scrolled away or when the visitor pauses. Also: chapter jumps (`seek(label, false)` so the UI updates while paused), click-to-seek, pointer parallax via `--mx/--my`, draggable scraps, keyframe view (`data-craft="on"`).
- **Scenes lay out against the canvas, not the window**: use container variants (`@2xl:` ≈ sm, `@3xl:` ≈ md, `@5xl:` ≈ lg) and `cqw` units — never `md:`/`lg:`/`vw`/`svh` inside a scene.
- **`organisms/story/StoryTimeline.tsx`** — editor bar: play/pause, timecode, clickable scene markers, playhead, layer keyframe ticks, Keyframes toggle.
- To add a scene: add copy to `storyScenes`, create `organisms/story/scenes/<Name>Scene.tsx`, and render it in order in `StoryScenes.tsx`. Markers/timecode update automatically.

### WebGL & placeholders

- `HeroBackdrop` (behind the hero) always paints a CSS poster, then lazy-loads `HeroCanvas` (a plain WebGL2 fluid shader on a full-screen triangle) via `next/dynamic` only when WebGL2 is available, `hardwareConcurrency >= 4` and motion is allowed. The canvas stops rendering offscreen. Don't add three.js/R3F for this — one quad doesn't need ~900 KB. Keep it the only WebGL context: the reel uses a static CSS backdrop.
- `ShaderFrame` renders a seeded, token-coloured CSS placeholder — or `next/image` once a `cover`/`src` exists. **To add real images:** drop files in `public/` and set `cover` on a project or `src` on a film frame.

### Motion rules

- Reduced motion: the reel doesn't autoplay — it shows the title card composed and waits for Play (chapter jumps are instant); no Lenis, cursor, dragging, parallax or WebGL. Without JS only the first scene renders. `.reveal`/`.develop`/`.hero-letter` are neutralised in CSS. Gate GSAP work with `gsap.matchMedia` or `prefersReducedMotion()`.
- Lenis is exposed via `getLenis()` in `src/lib/motion.ts` for programmatic scrolls; import gsap/ScrollTrigger/Draggable/useGSAP from there.
- The hero name is server-rendered and animated with CSS (not GSAP) so it never flashes and stays the LCP element.
- Don't `setState` synchronously in effects for environment checks — use `useSyncExternalStore` (see `Cursor`, `HeroBackdrop`).

## Key conventions

- `"use client"` only for components with hooks/events/browser APIs
- Never hardcode hex — use tokens / Tailwind token utilities
- `SITE.resume` points to `public/Suraj-Banthot-Resume.pdf` — add that file or the Résumé CTA 404s
- Pages are static: metadata is static (`metadataBase` = `SITE.url`, never `headers()`), and each page exports `dynamic = "force-static"` so both Next and vinext prerender it. Keep builds and `npm run lint` warning-free (lint ignores `dist/`, `.vinext/`, `.wrangler/`)

## Routes

| Route | Notes |
|-------|-------|
| `/` | Home — hero, process reel, work, services, credits, contact |
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

- UI components live in `src/components/` organised by atomic design (`atoms/`, `molecules/`, `organisms/`, `templates/`, `motion/` — see **Component architecture**), PascalCase filenames (e.g. `molecules/MyCard.tsx`)
- Page files live in `src/app/<route>/page.tsx` (Next.js App Router)
- Shared utilities/hooks live in `src/lib/`
- IMPORTANT: Check `src/components/` (and Storybook) for an existing atom/molecule before creating a new one; map Figma components to the matching atomic level

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
- The hero sits under a fixed nav (shorter than the screen on desktop so the reel peeks in); anchor offset is handled by `scroll-padding-top` on `html` and Lenis `anchors.offset`
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
