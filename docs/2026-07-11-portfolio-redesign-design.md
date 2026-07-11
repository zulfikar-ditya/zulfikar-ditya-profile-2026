# Portfolio Redesign — Design Spec ("Clean Systems")

**Date:** 2026-07-11
**Status:** Approved (brainstorming) — pending implementation plan
**Author:** Zulfikar Ditya (with Claude Code)

## 1. Goal

Rewrite the personal portfolio to shed the current "Terminal Precision" aesthetic
— mono font, numbered sections (`// 001`), thin borders, WebGL starfield — which
reads as an obvious AI/template default. Replace it with a clean, professional,
multi-page site that feels intentional and human, with richer motion and stronger
SEO / AI discoverability.

**Non-goals:** No CMS, no backend, no auth. Content stays file-driven. This is a
front-end redesign + IA restructure, not a platform.

## 2. Direction (approved decisions)

| Dimension | Decision |
|---|---|
| Personality | Clean & professional — neutral scaffolding, one accent, whitespace |
| Theme | Light default + persisted dark toggle (both fully designed) |
| Accent | Emerald green (`emerald-600` light / `emerald-400` dark) |
| Typography | **Sora** (headings) + **Inter** (body) |
| Motion | Rich & expressive — staggered reveals, counters, parallax, page transitions |
| Home layout | Split hero + clean stacked sections; bento used as *accents* only |
| Structure | Multi-page (6 routes) with condensed home + "see more" |

**Explicitly removed:** mono/JetBrains labels, `// NNN` section numbering, terminal
card styling, `Galaxy` (ogl), `FloatingLines` (three.js), all `react-bits/`
primitives, floating `SocialLinks` widget, `ogl` + `three` dependencies.

**Kept:** Next.js 16 App Router, React 19, Tailwind v4, bun, `lib/medium.ts`,
`lib/utils.ts` `cn()`, `next/font/google`, JSON-LD approach (expanded per-route).

## 3. Information Architecture

| Route | Purpose | Home preview |
|---|---|---|
| `/` | Condensed landing | Split hero + preview of each block |
| `/work` | All 10 roles, full detail, alternating timeline | latest 2–3 → *View full experience* |
| `/projects` | All open-source orgs/repos, bento grid | 3–4 highlights → *All projects* |
| `/articles` | Full Medium feed (24h ISR) | latest 3 → *Read all articles* |
| `/contact` | Email, LinkedIn, GitHub, Instagram, Medium + CTA | inline contact CTA on home |
| `/resume` | On-page HTML resume + Download button | "Resume" button in nav |

**Shared shell:**
- **Sticky top nav** — name/logo (left), route links (center/right), theme toggle,
  emerald "Resume" button. Mobile: hamburger → slide-in menu. Active-route styling.
- **Footer** — social links, quick nav, © line.

## 4. Design System

Rebuild tokens in `app/globals.css` (`@theme inline`). Class-based dark mode on
`<html>` with an inline no-flash script in `layout.tsx` and `localStorage`
persistence.

**Semantic tokens** (each has light + dark value):

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#ffffff` / neutral-50 | slate-950 | page background |
| `surface` | neutral-50 | slate-900 | cards, raised areas |
| `border` | neutral-200 | slate-800 | dividers, card borders |
| `text` | neutral-900 | slate-100 | primary text |
| `muted` | neutral-500 | slate-400 | secondary text |
| `accent` | emerald-600 | emerald-400 | links, buttons, highlights |
| `accent-fg` | white | slate-950 | text on accent |

**Fonts** (loaded via `next/font/google` in `layout.tsx`):
- `--font-sora` → `font-display` utility (headings, name)
- `--font-inter` → default body

**Component conventions:**
- Cards: `rounded-xl border border-border bg-surface`, soft shadow, hover lift.
- Buttons: primary (emerald fill), secondary (border), ghost. `rounded-lg`.
- Section header: eyebrow (accent, small caps — *not* mono, no numbers) + Sora H2 + intro line.
- Bento accents: stat tiles (`5+ years` · `10 roles` · `8 repos`), skills grid.

Full rules captured in `.claude/rules/ui-design.md` (created during implementation).

## 5. Layout Patterns

- **Home hero:** split — left column (name in Sora, role, one-line value prop, two
  CTAs: "View work" + "Contact"), right column (profile card using
  `public/octocat.png`, framed with subtle emerald ring/gradient).
- **Home body:** stacked sections separated by dividers, each = eyebrow + heading +
  condensed content + "see more" link. Order: About/stats → Work → Projects →
  Articles → Contact CTA.
- **`/work`:** alternating left/right timeline entries (role, company, dates,
  skills chips, bullet descriptions). Vertical connector line.
- **`/projects`:** bento card grid grouped by org (Fexend, Clean Starter, …), each
  repo a card with tags + external link.
- **`/articles`:** responsive card grid/list from Medium feed, static fallback from
  `data/articles.ts` on fetch failure.
- **`/resume`:** print-optimized single-column HTML resume (summary, experience,
  skills, education) + sticky "Download PDF" button + print stylesheet.
- **`/contact`:** heading + large tappable link rows (email, socials) + copy-email
  affordance.

## 6. Motion (Framer Motion / `motion`)

- Scroll-triggered staggered fade + rise on section content (`whileInView`, `once`).
- Animated stat counters (count-up on first view).
- Subtle parallax on hero and section accents.
- Route/page transitions: springy crossfade via `AnimatePresence` in a template.
- One elegant hero reveal on first load (headline + card).
- **All motion gated behind `prefers-reduced-motion`** — reduced users get instant,
  static content.

## 7. Content / Data

Migrate content to typed TypeScript modules (better DX, type safety, no runtime fetch):

- `data/site.ts` — profile (name, title, value prop, location), socials, resume
  URL/path, stats.
- `data/experience.ts` — from `public/mock/experience.json` (typed).
- `data/projects.ts` — from `public/mock/projects.json` (typed).
- `data/articles.ts` — static fallback list (typed).
- `data/skills.ts` — moved out of `AboutSection`.

`lib/medium.ts` stays (server fetch, 24h ISR). Old `public/mock/*.json` removed
after migration.

**Assets:** hero photo = `public/octocat.png`. Resume download = `public/resume.pdf`
(user-supplied) with graceful fallback to the existing Google Drive link until the
file exists.

## 8. SEO + AI Discoverability

- Per-route `metadata` (title, description, canonical, OG) via `generateMetadata`
  or static `metadata` exports; refreshed, page-specific copy.
- Structured data: keep Person + WebSite (root); add `BreadcrumbList` on inner
  pages and `ItemList`/`CollectionPage` for `/work`, `/projects`, `/articles`;
  `ProfilePage` for `/`.
- Update `app/sitemap.ts` to include all 6 routes; `robots.ts` unchanged.
- **`/llms.txt`** — served via `app/llms.txt/route.ts` (plain-text route): who I am,
  role, skills, selected work, links, contact. Markdown-style per the llms.txt
  convention so AI crawlers can summarize and cite. Optional mirror at
  `/.well-known/llms.txt`.
- Copy refresh across all pages via the copywriting skill; captured in
  `.claude/rules/copywriting.md`.

## 9. Deliverables

1. **`docs/`** — this spec + implementation plan (from writing-plans).
2. **`.claude/rules/ui-design.md`** — tokens, fonts, spacing scale, component
   patterns, motion rules, do/don't (seeded via frontend-design / ui-ux-pro-max).
3. **`.claude/rules/copywriting.md`** — voice, tone, section copy formulas, CTA
   patterns (seeded via copywriting / copy-editing).
4. Rewritten `app/` (routes) + `components/` + `data/` + rebuilt `globals.css`.

## 10. Success Criteria

- No terminal/mono/numbered-section cues remain; site does not read as templated.
- All 6 routes work; home shows condensed previews with functioning "see more".
- Light/dark toggle works with no flash-of-wrong-theme, persisted.
- Motion present and smooth; fully disabled under `prefers-reduced-motion`.
- `bun build` and `bun lint` pass clean.
- `llms.txt` reachable; sitemap lists all routes; per-page metadata present.
- `.claude/rules/*.md` written so future edits stay on-system.

## 11. Out of Scope (YAGNI)

- No blog CMS / MDX authoring (Medium stays the source).
- No i18n, no analytics wiring, no contact form backend (mailto only).
- No profile-photo redesign beyond framing `octocat.png`.
- No search, no comments, no newsletter.
