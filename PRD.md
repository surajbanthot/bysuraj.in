# PRD — bysuraj.in

**Owner:** Suraj
**Type:** Personal portfolio + hiring front door
**Status:** Darkroom redesign (Oct 2026)

---

## Goal

1. Win **full-time design-engineer / product-engineer roles** and **freelance commissions** in equal measure.
2. Prove design-engineering range through the site itself: motion, WebGL, typography, performance and accessibility together.
3. Stay easy to update. All content lives in `src/lib/portfolioData.ts`.

## Positioning

> **Design Engineer.** I build interfaces, AI products and moving images.

Eight years shipping React at Microsoft Teams scale, now building conversational AI. On the side: motion work and medium-format film.

Two lanes, equal weight:
- **Hire me:** full-time roles. CTAs: résumé, email.
- **Commission me:** motion graphics, Rive interactions, AI builds, film portraits. CTAs: enquiry form, Contra.

## Pages

| Route | Content |
|---|---|
| `/` | WebGL hero, pinned horizontal work strip, two lanes, experience timeline, film teaser, contact form with Hire/Commission toggle |
| `/work/[slug]` | Case study: problem, approach, outcome, tags, next case |
| `/film` | Contact-sheet gallery where frames develop from negative on scroll |
| `/api/send` | Resend email endpoint |

## Design system — Darkroom

See CLAUDE.md for tokens and rules. In short: single dark theme, safelight orange accent, Fraunces display type with variable-axis hover, Geist/Geist Mono, film grain, and develop-in motion. 13px minimum type size.

## Non-goals

- No blog, CMS, auth or database
- No light/dark toggle

## Open items

- [ ] Real assets: project covers (`projects[].cover`), film scans (`filmFrames[].src`), optional motion reel
- [ ] Résumé PDF at `public/Suraj-Banthot-Resume.pdf`
- [ ] Review rewritten copy in `portfolioData.ts`, especially case-study problem/approach/outcome wording
- [ ] Refresh `public/og.png` to match the Darkroom look
- [ ] Lighthouse pass on a real mid-range phone
