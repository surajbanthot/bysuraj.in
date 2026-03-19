# CLAUDE.md — bysuraj.in

This file gives Claude Code context about this project so every session starts informed.

## What this project is

Personal portfolio website for Suraj — a design engineer. It's a creative playground and hiring platform that showcases frontend, 3D, motion, and design skills. Hosted at bysuraj.in, deployed on Vercel.

## Tech stack

- **Framework:** Next.js (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4 + custom animations in `src/app/globals.css`
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Email:** Resend (via `/api/send` route)
- **Analytics:** Vercel Analytics (`track()` calls for user interactions)
- **Fonts:** VT323, Bungee, Bungee_Spice, Quantico, Geist (loaded in `layout.tsx`)

## Project structure

```
src/
  app/
    layout.tsx              # Root layout — fonts, analytics, NavBar, FooterBar, WIPSidebar
    globals.css             # All custom keyframe animations and utility classes
    page.tsx                # Home — pixelated video bg, IST clock, 3D retro computer
    code/page.tsx           # Skills/tech stack showcase
    hireme/page.tsx         # Hiring portal (full-time + freelance tabs)
    social/page.tsx         # Social links — Instagram, film photography, YouTube
    motiongraphics/page.tsx # WIP — not linked in nav yet
    api/
      send/route.ts         # Email sending via Resend
      wip/route.ts          # WIP sidebar persistence
  components/               # All reusable UI components
  lib/
    easterEggCoordinator.ts # Mutex for easter egg animations (acquire/release/get)
    useScrollOffset.ts      # Shared hook — scroll visibility + footer offset avoidance
  types/                    # TypeScript type definitions
```

## Key conventions

- All interactive components use `"use client"` directive
- `suppressHydrationWarning` on `<body>` for clock/time components
- Session storage key `"hireMeTab"` tracks active tab on `/hireme`
- Footer uses `data-site-footer` attribute for scroll offset detection
- Easter egg animations use `easterEggCoordinator` to avoid running simultaneously
- Vercel `track()` calls for analytics are placed directly in event handlers

## Pages & nav

| Route | Status | Nav label |
|-------|--------|-----------|
| `/` | Live | Home |
| `/code` | Live | Code |
| `/social` | Live | Socials |
| `/hireme` | Live | Hire me!! |
| `/motiongraphics` | WIP | Not in nav |

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Deployment

Deployed on Vercel. Push to `main` triggers production deploy.
