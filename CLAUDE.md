# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev       # Start dev server (Next.js)
bun build     # Production build
bun start     # Start production server
bun lint      # Run ESLint (eslint-config-next)
```

> This project uses **bun** as the package manager (lockfile: `bun.lock`). Do not use npm or yarn. There is no test runner configured — verify changes with `bun lint` and `bun build`, plus a visual check in `bun dev`.

## Architecture Overview

Personal portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. It is a **multi-page** site with a shared nav/footer shell. The current design system is **"Clean Systems"** (see `.claude/rules/ui-design.md`), which replaced the earlier dark "Terminal Precision" look.

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — split hero + condensed previews of each section with "see more" links |
| `/work` | Full work experience (alternating timeline) |
| `/projects` | All open-source orgs/repos (bento card grid) |
| `/articles` | Full Medium feed (24h ISR) with static fallback |
| `/contact` | Email + social links |
| `/resume` | Printable HTML resume + Download button |
| `/llms.txt` | Plaintext AI-discoverability doc (`app/llms.txt/route.ts`) |

Each page exports per-route `metadata` (via `lib/seo.ts` `pageMetadata`) and the collection pages inject `BreadcrumbList` + `ItemList`/`CollectionPage` JSON-LD. `app/sitemap.ts` lists all routes; `app/robots.ts` unchanged.

### Directory Structure

- `app/` — App Router: `layout.tsx` (fonts, ThemeScript, SiteNav/SiteFooter, root metadata + Person/WebSite JSON-LD), `page.tsx` (home composition), route folders (`work/`, `projects/`, `articles/`, `contact/`, `resume/`, `llms.txt/`), `template.tsx` (page-transition crossfade), `globals.css` (design tokens), `sitemap.ts`, `robots.ts`
- `components/ui/` — presentational primitives: `Button` (variants primary/secondary/ghost; renders `<Link>` when given `href`), `Card`, `Badge`, `SectionHeader` (eyebrow + title + intro), `StatTile`
- `components/motion/` — `Reveal`, `Stagger`/`StaggerItem`, `CountUp` — all `prefers-reduced-motion` aware. **All motion goes through these**; never hand-roll motion that ignores reduced-motion.
- `components/theme/` — `ThemeProvider` (`useTheme() → { theme, toggle }`), `ThemeToggle`, `ThemeScript` (no-flash inline script)
- `components/layout/` — `SiteNav` (sticky, active-route, mobile menu), `SiteFooter`
- `components/sections/` — home blocks: `Hero`, `AboutPreview`, `WorkPreview`, `ProjectsPreview`, `ArticlesPreview`, `ContactCTA`
- `components/work/`, `components/projects/`, `components/articles/`, `components/resume/` — per-route components (`WorkTimeline`, `ProjectCard`, `ArticleCard`, `ResumeDocument`)
- `data/` — typed content modules: `site.ts` (profile, socials, stats, nav, resume URLs), `experience.ts`, `projects.ts`, `articles.ts` (Medium fallback), `skills.ts`
- `lib/medium.ts` — Server-side Medium RSS parser/fetcher
- `lib/seo.ts` — `pageMetadata()` + JSON-LD builders (`breadcrumbJsonLd`, `collectionJsonLd`)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Design System — "Clean Systems"

Clean, professional, light-default with a persisted dark toggle. **Sora** display + **Inter** body, emerald accent, neutral scaffolding. **Style with the semantic tokens, never raw hex.** Full rules live in `.claude/rules/ui-design.md`; copy voice/patterns in `.claude/rules/copywriting.md`.

Tokens are semantic CSS vars in `app/globals.css` (`:root` light, `.dark` overrides), exposed as Tailwind utilities via `@theme inline`:

| Token / utility | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg-background` | `#ffffff` | `#020617` | page background |
| `text-foreground` | `#0a0a0a` | `#f1f5f9` | primary text |
| `bg-surface` | `#fafafa` | `#0f172a` | cards, elevated surfaces |
| `border-border` | `#e5e5e5` | `#1e293b` | borders, dividers |
| `text-muted-fg` | `#737373` | `#94a3b8` | secondary/muted text |
| `text-accent` / `bg-accent` | `#059669` | `#34d399` | emerald accent — eyebrows, links, CTAs |
| `text-accent-fg` | `#ffffff` | `#022c22` | text/icon on an accent fill |

- **Fonts:** `font-display` → Sora (`--font-sora`, headings/name); Inter (`--font-inter`) is the body default. Loaded in `app/layout.tsx` via `next/font/google`.
- **Dark mode:** class strategy (`.dark` on `<html>`), persisted to `localStorage` key `theme`, no flash via the inline `ThemeScript` in `<head>`. Both themes are fully designed.
- **Layout convention:** page content in `mx-auto max-w-5xl px-6` (contact/resume use `max-w-3xl`). Bento appears as accents (stat-tile grid, project grid), not as the whole page.
- **Motion:** Framer Motion (`motion` package, import from `motion/react`) via the `components/motion/*` primitives.

### Data Flow

Content is file-driven from typed `data/*.ts` modules (edit these to update content). The blog is the one runtime source: `lib/medium.ts` fetches the Medium RSS feed (`next: { revalidate: 86400 }` — 24h ISR) and `data/articles.ts` provides the static fallback shown on fetch failure.

### Do / Don't

The following are the removed "Terminal Precision" cues — do **not** reintroduce them: monospace/JetBrains font, `// NNN` numbered-section labels, WebGL starfield backgrounds (`Galaxy`/`FloatingLines`/`ogl`/`three`), GSAP, or raw hex in components. External links use `target="_blank" rel="noopener noreferrer"`; never nest anchors.

## Working on this repo

This repo carries a large set of skills under `.claude/skills/`. Reach for them rather than working freehand:

- **`brainstorming`** — before any new feature or redesign, to nail intent and requirements
- **`frontend-design`**, **`ui-ux-pro-max`**, **`impeccable`**, **`web-design-guidelines`** — visual design, layout, and UI review
- **`copywriting`** / **`copy-editing`** — hero, section, and CTA copy (follow `.claude/rules/copywriting.md`)
- **`ai-seo`**, **`seo-audit`**, **`site-architecture`**, **`programmatic-seo`** — discoverability (the site ships per-route metadata, JSON-LD, a sitemap, and `/llms.txt`)
- **`writing-plans`** / **`executing-plans`**, **`systematic-debugging`**, **`verification-before-completion`** — process discipline

When changing design, update tokens in `globals.css` in one place rather than sprinkling raw hex through components, and keep the Sora/`font-display` + Inter typography and the token-driven conventions documented in `.claude/rules/ui-design.md`.
