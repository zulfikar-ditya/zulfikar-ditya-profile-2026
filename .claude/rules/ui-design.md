# UI Design Rules — "Clean Systems"

This documents the design system that shipped in the `redesign/clean-systems` rewrite (Next.js 16 App Router, React 19, Tailwind CSS v4). It replaced the earlier "Terminal Precision" dark-editorial aesthetic — do not reintroduce that system (see Do/Don't below).

**Rule:** style with the semantic tokens below, never raw hex. If a value isn't in this table, add it to `app/globals.css` first.

## Design tokens

Defined in `app/globals.css` as CSS custom properties, re-exposed as Tailwind classes via `@theme inline` (e.g. `bg-background`, `text-foreground`, `border-border`, `text-accent`, `text-muted-fg`, `bg-surface`, `bg-accent`, `text-accent-fg`). Theme switching is a `.dark` class on `<html>` (see Theme section) — `:root` holds light values, `.dark` overrides them.

| Token | Light (`:root`) | Dark (`.dark`) | Use |
| --- | --- | --- | --- |
| `--background` / `bg-background` | `#ffffff` | `#020617` (slate-950) | Page background |
| `--foreground` / `text-foreground` | `#0a0a0a` (neutral-950) | `#f1f5f9` (slate-100) | Primary text |
| `--surface` / `bg-surface` | `#fafafa` (neutral-50) | `#0f172a` (slate-900) | Card/panel backgrounds, elevated surfaces |
| `--border` / `border-border` | `#e5e5e5` (neutral-200) | `#1e293b` (slate-800) | Default borders, dividers |
| `--muted-fg` / `text-muted-fg` | `#737373` (neutral-500) | `#94a3b8` (slate-400) | Secondary/muted text |
| `--accent` / `bg-accent` `text-accent` | `#059669` (emerald-600) | `#34d399` (emerald-400) | Accent color — eyebrows, links, CTAs, highlights |
| `--accent-fg` / `text-accent-fg` | `#ffffff` | `#022c22` (emerald-950) | Text/icon color placed on top of an `--accent` fill |

There is no separate "card" token — cards use `bg-surface border border-border`, with `hover:border-accent/50` for interactive hover state (see Card below). `::selection` uses `--accent` / `--accent-fg`.

## Typography

- `font-display` (utility class in `globals.css`) → **Sora** (`--font-sora`, weights 400–800, loaded in `app/layout.tsx`). Use for headings, section titles, hero name/`<h1>`, card titles (`h2`/`h3`). Apply as `className="font-display font-bold ..."`.
- **Inter** (`--font-inter`) is the default body font, applied globally via `body { font-family: var(--font-sans) }` in `globals.css` — do not add `font-sans` manually on body text, it's already the default. Use `font-display` only where you deliberately want the heading typeface.
- No monospace/JetBrains font anywhere in this system (see Do/Don't).

## Layout

- **Container convention:** `mx-auto max-w-5xl px-6` wraps section/page content (used in `SiteNav`, `SiteFooter`, `app/page.tsx` sections, `/work`, `/projects`). Vertical rhythm is `py-16` per section (hero uses `py-20 md:py-28`).
- **Narrow pages** (`/resume`, `/contact`) use `mx-auto max-w-3xl px-6 py-16` instead — reading-width content, not grid layouts.
- **Split hero** (`components/sections/Hero.tsx`): two-column `grid md:grid-cols-2` — copy (eyebrow role label, `font-display` name as `<h1>`, value-prop paragraph, CTA button pair) on one side, a framed profile image (`rounded-2xl border border-border bg-surface p-3 ring-1 ring-accent/10`) on the other. Staggered `motion` rise-in per element (not `Reveal`, since hero content is above the fold and animates on load, not on scroll).
- **Condensed home previews + "see more":** the homepage (`app/page.tsx`) stacks `Hero`, then `AboutPreview`, `WorkPreview`, `ProjectsPreview`, `ArticlesPreview`, `ContactCTA` inside a `divide-y divide-border` wrapper. Each preview section shows a slice of data (e.g. `experience.slice(0, 3)`, `repos.slice(0, 4)`, articles `.slice(0, 3)`) via `SectionHeader` + a `Stagger`/`StaggerItem` grid, then a `secondary`-variant `Button` linking to the full `/work`, `/projects`, `/articles` page. Keep this pattern for any new preview section: slice on the home page, full list on its own route.
- **Bento-style accents:** `StatTile` grid in `AboutPreview` (`grid grid-cols-2 gap-4 sm:grid-cols-3`) and project card grids (`grid gap-4 sm:grid-cols-2 lg:grid-cols-3`) are the two recurring "bento" layouts — uniform tiles/cards in a responsive grid, no asymmetric spans.
- **Alternating work timeline** (`components/work/WorkTimeline.tsx`, used on `/work`): a vertical rule (`absolute left-4 top-0 h-full w-px bg-border md:left-1/2`) with entries alternating left/right on desktop via `md:w-1/2` + `i % 2` odd/even logic (`md:ml-auto` vs `md:mr-auto`, and mirrored text alignment). Each entry is a `Reveal`-wrapped card with title, company, dates, description bullets, and skill `Badge`s.

## Components (`components/ui/`)

| Component | Props | Notes |
| --- | --- | --- |
| `Button` | `variant?: "primary" \| "secondary" \| "ghost"` (default `primary`), `href?`, `className?`, plus native `<button>` attrs | Renders a Next `<Link>` when `href` is passed, otherwise a `<button>`. `primary` = filled `bg-accent`; `secondary` = outlined `border-border` that turns `border-accent` on hover; `ghost` = text-only. |
| `Card` | `className?`, `children` | `rounded-xl border border-border bg-surface p-6`, hover state brightens border to `accent/50` + subtle shadow. |
| `Badge` | `className?`, `children` | Small pill: `rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-fg`. Used for skill/tag lists. |
| `SectionHeader` | `eyebrow: string`, `title: string`, `intro?: string` | Standard section-opening block: accent eyebrow label, `font-display` `<h2>`, optional muted intro paragraph. Use at the top of every section/page — see Copywriting rules for the eyebrow+heading+intro formula. |
| `StatTile` | `value: string`, `label: string` | Card-like tile wrapping `CountUp` for the number + muted label underneath. Used in stat grids (e.g. About stats). |

## Motion (`components/motion/`)

- `Reveal` — fade/rise-in on scroll (`whileInView`, `viewport={{ once: true }}`), optional `delay`.
- `Stagger` / `StaggerItem` — wrap a grid/list in `Stagger`, wrap each child in `StaggerItem`, to stagger children in on scroll (`staggerChildren: 0.08`).
- `CountUp` — animates a numeric string (e.g. `"5+"`, `"10"`) counting up on view; used inside `StatTile`.

**Rule: all motion goes through these three primitives.** Each one calls `useReducedMotion()` from `motion/react` and short-circuits to a static, immediately-visible state when the user has `prefers-reduced-motion` set — never hand-roll a `motion.div`/animation outside `Reveal`/`Stagger`/`CountUp` that skips this check. (The one sanctioned exception is `Hero.tsx`'s own inline `motion.*` rise-in, which explicitly reads `useReducedMotion()` itself — follow that same pattern if you ever need a bespoke animation.) `globals.css` also has a global CSS-level fallback (`@media (prefers-reduced-motion: reduce)` collapses all animation/transition durations to ~0), but don't rely on the CSS fallback alone — respect reduced motion at the component level too.

## Theme

- Class-based dark mode: Tailwind's `@custom-variant dark (&:is(.dark *))` in `globals.css` means dark styles apply when an ancestor has the `.dark` class, which is toggled on `<html>` (`document.documentElement`).
- `ThemeScript` (`components/theme/ThemeScript.tsx`) is an inline `<script>` in `<head>` (before hydration) that reads `localStorage.getItem('theme')`, falls back to `prefers-color-scheme: dark`, and adds `.dark` to `<html>` synchronously — this prevents a flash of the wrong theme.
- `ThemeProvider` (`components/theme/ThemeProvider.tsx`) starts state at `"light"` to match SSR markup exactly, then corrects itself from the DOM in an effect (avoids hydration mismatch). `toggle()` flips the `.dark` class and persists the choice to `localStorage["theme"]`.
- `ThemeToggle` is the sun/moon icon button (`lucide-react`) wired to `useTheme()`.
- **Both themes must be styled.** Every token in the table above has a light and dark value — when adding new UI, check it reads correctly in both (don't assume dark-only, this system is light-first by default and dark is opt-in/system-preference).

## Assets note

The resume "Download PDF" button (`app/resume/page.tsx`) currently links to `site.resumeUrl` (an external Google Drive URL, opened via `target="_blank" rel="noopener noreferrer"`, no `download` attribute). `data/site.ts` already has `site.resumePdf = "/resume.pdf"` reserved for when a real PDF is dropped into `public/resume.pdf`. **When that file exists:** switch the `href` to `site.resumePdf`, add the `download` attribute, and the `target="_blank"`/`rel` can be dropped since it's now a same-origin file download. There's a `// TODO` comment marking this exact spot in the source.

## Do / Don't

**Don't** (these belong to the removed "Terminal Precision" aesthetic — do not reintroduce):
- No monospace/JetBrains Mono font for labels or headings — this system uses Sora (`font-display`) + Inter only.
- No `// 001`-style numbered section labels — use `SectionHeader`'s `eyebrow` prop (plain text label, e.g. "About", "Experience", "Open Source") instead.
- No WebGL starfield / canvas hero backgrounds (`Galaxy`, `FloatingLines`, `ogl`, `three.js`) — the hero is a static split layout with a framed photo, animated only via `motion/react` fade-ins.
- No raw hex codes in components — always reference the semantic tokens (`bg-background`, `text-accent`, etc.) so light/dark both work automatically.

**Do:**
- External links (GitHub, LinkedIn, Medium, mailto, project repos, etc.) always use `target="_blank" rel="noopener noreferrer"` — see `SiteFooter`, `/projects`, `/contact` for the pattern.
- No nested anchors — e.g. don't wrap a `Button`/`Link` inside another `<a>`/`Link`; `Card`/`ProjectCard`/`ArticleCard`-style components should be a single clickable link, not a link-in-a-link.
- New sections should follow the existing composition: `SectionHeader` → `Stagger`/`Reveal`-wrapped content → optional `secondary` `Button` to a "see all" route, inside the `mx-auto max-w-5xl px-6 py-16` container.
