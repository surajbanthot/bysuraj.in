# PRD — bysuraj.in

**Owner:** Suraj
**Type:** Personal portfolio + hiring platform
**Status:** Active development

---

## Goal

Build a memorable, technically impressive personal website that:
1. Showcases skills in frontend dev, 3D graphics, motion design, and AI/ML
2. Converts visitors into hires (full-time roles or freelance clients)
3. Acts as a creative playground — experiments in UI, animation, and interactivity

---

## Pages

### `/` — Home
- Pixelated video background with CRT scanlines and vignette
- Real-time IST clock with contextual activity emoji (sleeping/coding/exercising etc.)
- 3D retro computer (Three.js) as hero element
- Easter egg animated characters: Superman, SpiderMan, Johnny Bravo, F1 car

### `/code` — Skills
- Grid of tech skills across 7 categories (languages, frameworks, tools, etc.)
- 25+ tools with branded gradient icons
- Featured projects section

### `/hireme` — Hire Me
- Tab switcher: Full-time roles vs Freelance services
- Full-time: experience timeline, tech stack, resume download
- Freelance: service cards (UI/UX, frontend, motion, 3D)
- Floating "Top" + "Resume" buttons (tab-aware)

### `/social` — Socials
- Links to Instagram, YouTube
- Medium format film photography enquiry form (via Resend email)

### `/motiongraphics` — Motion Graphics *(WIP)*
- Showcase reel for motion graphics work
- Not linked in nav until ready

---

## Design system — Arctic Shore

**Aesthetic:** Retro-futuristic — pixelation, CRT scanlines, sky-blue glow accents
**Primary palette:** Sky (`sky-600` #0284C7 light / `sky-400` #38BDF8 dark)
**Secondary accent:** Cyan (`cyan-400` #22D3EE) — glows, lightning bolt decorations
**Tertiary accent:** Teal (`teal-400`/`teal-600`)
**Neutrals:** `sky-*` for surfaces/borders, `slate-*` for muted text
**Page bg light:** `sky-50` (#F0F9FF)
**Page bg dark:** `sky-950` (#082F49) — deep navy, not pitch black
**Glow shadow:** `rgba(2,132,199,…)` (sky-600)
**Dark mode:** Full support via `dark:` Tailwind variants
**Fonts:** VT323 (retro), Bungee (display/nav), Bungee Spice (hero), Quantico (UI labels), Geist Sans/Mono (body/code)
**Motion:** Character animations, micro-interactions, hover effects, lightning bolts

---

## Non-goals

- No blog (for now)
- No CMS — content is hardcoded in components
- No auth
- No database — WIP state stored in flat file via API route

---

## Open / WIP items

- [ ] `/motiongraphics` page — content + layout needed
- [ ] Resume button — needs actual resume PDF linked
- [ ] Film photography form — verify Resend integration end-to-end
- [ ] Performance audit on lower-end devices (animation-heavy)
- [ ] OG image / social preview meta tags
