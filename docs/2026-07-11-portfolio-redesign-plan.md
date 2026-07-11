# Clean Systems Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the portfolio into a clean, professional, multi-page Next.js site (light+dark, Sora+Inter, emerald accent, rich motion) that no longer reads as a terminal/AI template.

**Architecture:** Next.js 16 App Router with 6 routes sharing a nav+footer shell. A class-based theme system on `<html>` with a no-flash inline script. Typed `data/*.ts` modules feed server components; `lib/medium.ts` supplies the blog feed. Reusable UI + motion primitives (Framer Motion) compose every page. SEO via per-route metadata + JSON-LD; discoverability via an `llms.txt` route.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, `motion` (Framer Motion), bun.

## Global Constraints

- Package manager: **bun** only (`bun add`, `bun run build`, `bun lint`). Never npm/yarn.
- **No test runner exists.** Per-task verification = `bun lint` (clean) + `bun run build` (passes) + visual check via `bun dev`. There is no `bun test`.
- Next.js **16.1.5**, React **19.2.0**, Tailwind **v4** (`@import "tailwindcss"`), TypeScript strict.
- Fonts: **Sora** (headings, `font-display`) + **Inter** (body default), via `next/font/google`.
- Accent: emerald — `emerald-600` (light) / `emerald-400` (dark). Neutral scaffolding.
- Dark mode: `class` strategy (`.dark` on `<html>`), persisted to `localStorage` key `theme`, no flash.
- **All motion must respect `prefers-reduced-motion`** — reduced users get static, instant content.
- No terminal cues: no mono/JetBrains font, no `// NNN` section numbers, no starfield.
- Site URL: `https://zulfikarditya.com`. Owner: Zulfikar Ditya, Backend Engineer.
- Commit after every task. Conventional Commit messages.

---

## File Structure

**Created:**
- `data/site.ts` — profile, socials, resume, stats, nav config
- `data/experience.ts` — typed work history (from `experience.json`)
- `data/projects.ts` — typed open-source data (from `projects.json`)
- `data/articles.ts` — typed static article fallback (from `articles.json`)
- `data/skills.ts` — typed skills (from `AboutSection`)
- `components/theme/ThemeProvider.tsx` — theme context + toggle
- `components/theme/ThemeScript.tsx` — no-flash inline script
- `components/theme/ThemeToggle.tsx` — toggle button
- `components/layout/SiteNav.tsx` — sticky top nav
- `components/layout/SiteFooter.tsx` — footer
- `components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `SectionHeader.tsx`, `StatTile.tsx`
- `components/motion/Reveal.tsx`, `Stagger.tsx`, `CountUp.tsx` — motion primitives
- `components/sections/*` — home section blocks (Hero, AboutPreview, WorkPreview, ProjectsPreview, ArticlesPreview, ContactCTA)
- `components/work/WorkTimeline.tsx`, `components/projects/ProjectCard.tsx`, `components/articles/ArticleCard.tsx`, `components/resume/ResumeDocument.tsx`
- `app/work/page.tsx`, `app/projects/page.tsx`, `app/articles/page.tsx`, `app/contact/page.tsx`, `app/resume/page.tsx`
- `app/template.tsx` — page-transition wrapper
- `app/llms.txt/route.ts` — plaintext llms.txt
- `lib/seo.ts` — metadata + JSON-LD helpers
- `.claude/rules/ui-design.md`, `.claude/rules/copywriting.md`

**Modified:**
- `app/globals.css` — full token rebuild
- `app/layout.tsx` — fonts, ThemeProvider, nav/footer, refreshed metadata
- `app/page.tsx` — new home composition
- `app/sitemap.ts` — all 6 routes
- `package.json` — add `motion`, remove `ogl`/`three`/`@types/three`/`gsap`/`@gsap/react`/`@types/gsap`

**Deleted (Task 14):**
- `components/react-bits/` (entire dir), `components/FloatingLines.tsx`
- `components/AboutSection.tsx`, `WorkExperienceSection.tsx`, `OpenSourceSection.tsx`, `BlogSection.tsx`, `SocialLinks.tsx`, `HeroProfileCard.tsx`, `SkillCard.tsx`, `SkillBadge.tsx`
- `public/mock/` (after data migration)

---

## Phase 0 — Foundation

### Task 1: Dependencies, fonts, and design tokens

**Files:**
- Modify: `package.json`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (fonts only in this task)

**Interfaces:**
- Produces: Tailwind color utilities `bg-background text-foreground text-muted-fg border-border bg-surface text-accent bg-accent text-accent-fg`; `.font-display` (Sora). CSS var `--font-sora`, `--font-inter`.

- [ ] **Step 1: Add motion, remove unused WebGL/GSAP deps**

```bash
bun add motion
bun remove ogl three @types/three gsap @gsap/react @types/gsap
```

- [ ] **Step 2: Load Sora + Inter in `app/layout.tsx`**

Replace the font imports/consts (lines 1–25) with:

```tsx
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});
```

Update the `<body>` className to `${inter.variable} ${sora.variable} antialiased` and set `<html lang="en" suppressHydrationWarning>`. (Nav/footer/ThemeProvider added in Task 3 — leave `{children}` for now.)

- [ ] **Step 3: Rebuild `app/globals.css`**

Replace the ENTIRE file with:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
	--font-display: var(--font-sora);
	--font-sans: var(--font-inter);

	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-surface: var(--surface);
	--color-border: var(--border);
	--color-muted-fg: var(--muted-fg);
	--color-accent: var(--accent);
	--color-accent-fg: var(--accent-fg);
}

:root {
	--background: #ffffff;
	--foreground: #0a0a0a;      /* neutral-950 */
	--surface: #fafafa;         /* neutral-50 */
	--border: #e5e5e5;          /* neutral-200 */
	--muted-fg: #737373;        /* neutral-500 */
	--accent: #059669;          /* emerald-600 */
	--accent-fg: #ffffff;
}

.dark {
	--background: #020617;       /* slate-950 */
	--foreground: #f1f5f9;       /* slate-100 */
	--surface: #0f172a;          /* slate-900 */
	--border: #1e293b;           /* slate-800 */
	--muted-fg: #94a3b8;         /* slate-400 */
	--accent: #34d399;           /* emerald-400 */
	--accent-fg: #022c22;        /* emerald-950 */
}

html {
	scroll-behavior: smooth;
}

body {
	background-color: var(--background);
	color: var(--foreground);
	font-family: var(--font-sans), system-ui, sans-serif;
	overflow-x: hidden;
}

.font-display {
	font-family: var(--font-display), system-ui, sans-serif;
}

::selection {
	background-color: var(--accent);
	color: var(--accent-fg);
}

@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.001ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.001ms !important;
		scroll-behavior: auto !important;
	}
}
```

- [ ] **Step 4: Verify lint + build**

Run: `bun lint && bun run build`
Expected: lint clean; build fails ONLY on pre-existing components still importing removed libs (ogl/gsap). That is expected — those are deleted in later tasks. If build errors are limited to `Galaxy`/`SplitText`/`TextType`/`FloatingLines`/`react-bits`, proceed. (Task 3 replaces `page.tsx`/`layout.tsx` imports; Task 14 deletes the files.)

> To keep the tree building between tasks, temporarily simplify `app/page.tsx` to a minimal placeholder now:
> ```tsx
> export default function Home() {
> 	return <main className="p-10 font-display text-2xl">Rebuilding…</main>;
> }
> ```
> and remove all imports at the top of `app/page.tsx`. Re-run `bun run build` — it must now pass.

- [ ] **Step 5: Commit**

```bash
git add package.json bun.lock app/globals.css app/layout.tsx app/page.tsx
git commit -m "feat: rebuild design tokens, load Sora+Inter, add motion, drop WebGL/GSAP deps"
```

---

### Task 2: Typed data modules

**Files:**
- Create: `data/site.ts`, `data/experience.ts`, `data/projects.ts`, `data/articles.ts`, `data/skills.ts`

**Interfaces:**
- Produces:
  - `site: { name; role; tagline; valueProp; location; email; resumeUrl; resumePdf; socials: Social[]; stats: Stat[]; nav: NavItem[] }`
  - `type Social = { name: string; url: string; label: string }`
  - `type Stat = { value: string; label: string }`
  - `type NavItem = { href: string; label: string }`
  - `experience: Experience[]` where `Experience = { title; company; type; dateStart; dateEnd; skills: string[]; descriptions: string[] }`
  - `projects: ProjectGroup[]` where `ProjectGroup = { category; description; orgUrl; repos: Repo[] }`, `Repo = { name; description; url; tags: string[] }`
  - `fallbackArticles: Article[]` where `Article = { title; link; pubDate; description; categories: string[] }`
  - `skills: SkillGroup[]` where `SkillGroup = { category: string; items: string[] }`

- [ ] **Step 1: Create `data/site.ts`**

```ts
export type Social = { name: string; url: string; label: string };
export type Stat = { value: string; label: string };
export type NavItem = { href: string; label: string };

export const site = {
	name: "Zulfikar Ditya",
	role: "Backend Engineer",
	tagline: "Laravel · Go · Node.js",
	valueProp:
		"I build scalable APIs and high-performance backend systems — clean architecture, tuned databases, and CI/CD that ships reliably.",
	location: "Indonesia · Remote",
	email: "zulfikarditya.work@gmail.com",
	url: "https://zulfikarditya.com",
	resumeUrl:
		"https://drive.google.com/file/d/11Ix693nenmXZ-JMHmwNSI4XwxAgnnfwv/view?usp=sharing",
	resumePdf: "/resume.pdf", // user drops file here; UI falls back to resumeUrl if 404
	mediumUsername: "zulfikarditya",
	socials: [
		{ name: "Email", url: "mailto:zulfikarditya.work@gmail.com", label: "zulfikarditya.work@gmail.com" },
		{ name: "GitHub", url: "https://github.com/zulfikar-ditya", label: "@zulfikar-ditya" },
		{ name: "LinkedIn", url: "https://www.linkedin.com/in/zulfikar-ditya", label: "in/zulfikar-ditya" },
		{ name: "Medium", url: "https://medium.com/@zulfikarditya", label: "@zulfikarditya" },
		{ name: "Instagram", url: "https://www.instagram.com/zulfikar.ditya", label: "@zulfikar.ditya" },
	] satisfies Social[],
	stats: [
		{ value: "5+", label: "Years experience" },
		{ value: "10", label: "Roles delivered" },
		{ value: "8", label: "Open-source repos" },
	] satisfies Stat[],
	nav: [
		{ href: "/work", label: "Work" },
		{ href: "/projects", label: "Projects" },
		{ href: "/articles", label: "Articles" },
		{ href: "/contact", label: "Contact" },
	] satisfies NavItem[],
};
```

- [ ] **Step 2: Create `data/experience.ts`**

Define the type, then paste all 10 entries from `public/mock/experience.json`, renaming `date_start`→`dateStart`, `date_end`→`dateEnd`:

```ts
export type Experience = {
	title: string;
	company: string;
	type: string;
	dateStart: string;
	dateEnd: string;
	skills: string[];
	descriptions: string[];
};

export const experience: Experience[] = [
	// ... all 10 entries copied verbatim from public/mock/experience.json,
	//     keys renamed to camelCase (dateStart/dateEnd). Order preserved.
];
```

> Implementer: copy every object from `public/mock/experience.json` — do not summarize or drop any.

- [ ] **Step 3: Create `data/projects.ts`**

```ts
export type Repo = { name: string; description: string; url: string; tags: string[] };
export type ProjectGroup = { category: string; description: string; orgUrl: string; repos: Repo[] };

export const projects: ProjectGroup[] = [
	// ... both groups (Fexend, Clean Starter) copied verbatim from public/mock/projects.json
	//     Fix the "Fexend" category typo ("Fexend" not "Fexend").
];
```

> Implementer: the JSON has `"category": "Fexend"` mistyped as `"Fexend"` — correct it to `"Fexend"`.

- [ ] **Step 4: Create `data/articles.ts`**

```ts
export type Article = {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	categories: string[];
};

export const fallbackArticles: Article[] = [
	// ... entries copied from public/mock/articles.json (used when Medium fetch fails)
];
```

- [ ] **Step 5: Create `data/skills.ts`**

Read the current `skillsData` object in `components/AboutSection.tsx` and reshape into groups:

```ts
export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
	// ... derived from skillsData in components/AboutSection.tsx, preserving categories
];
```

- [ ] **Step 6: Verify**

Run: `bun lint`
Expected: clean (unused modules are fine at this stage).

- [ ] **Step 7: Commit**

```bash
git add data/
git commit -m "feat: add typed data modules for site, experience, projects, articles, skills"
```

---

### Task 3: Theme system + app shell (nav, footer, layout)

**Files:**
- Create: `components/theme/ThemeScript.tsx`, `components/theme/ThemeProvider.tsx`, `components/theme/ThemeToggle.tsx`
- Create: `components/layout/SiteNav.tsx`, `components/layout/SiteFooter.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `site` (Task 2).
- Produces: `<ThemeProvider>`, `useTheme(): { theme, toggle }`, `<SiteNav />`, `<SiteFooter />`.

- [ ] **Step 1: Create `components/theme/ThemeScript.tsx`** (runs before paint, no flash)

```tsx
export function ThemeScript() {
	const code = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;
	return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
```

- [ ] **Step 2: Create `components/theme/ThemeProvider.tsx`**

```tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
	theme: "light",
	toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
	}, []);

	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			document.documentElement.classList.toggle("dark", next === "dark");
			try { localStorage.setItem("theme", next); } catch {}
			return next;
		});
	};

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
```

- [ ] **Step 3: Create `components/theme/ThemeToggle.tsx`** (uses `lucide-react`, already installed)

```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return (
		<button
			onClick={toggle}
			aria-label="Toggle theme"
			className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-fg transition-colors hover:text-foreground hover:border-accent"
		>
			{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
```

- [ ] **Step 4: Create `components/layout/SiteNav.tsx`** (sticky, active-route, mobile menu)

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
			<nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
				<Link href="/" className="font-display text-lg font-bold">{site.name}</Link>
				<div className="hidden items-center gap-6 md:flex">
					{site.nav.map((n) => (
						<Link key={n.href} href={n.href}
							className={cn("text-sm text-muted-fg transition-colors hover:text-foreground",
								isActive(n.href) && "text-foreground")}>
							{n.label}
						</Link>
					))}
					<Link href="/resume"
						className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90">
						Resume
					</Link>
					<ThemeToggle />
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<button aria-label="Menu" onClick={() => setOpen(!open)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border">
						{open ? <X size={18} /> : <Menu size={18} />}
					</button>
				</div>
			</nav>
			{open && (
				<div className="border-t border-border px-6 py-4 md:hidden">
					<div className="flex flex-col gap-3">
						{[...site.nav, { href: "/resume", label: "Resume" }].map((n) => (
							<Link key={n.href} href={n.href} onClick={() => setOpen(false)}
								className="text-sm text-muted-fg hover:text-foreground">{n.label}</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
```

- [ ] **Step 5: Create `components/layout/SiteFooter.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-muted-fg">© {new Date().getFullYear()} {site.name}. {site.role}.</p>
				<div className="flex flex-wrap gap-4">
					{site.socials.map((s) => (
						<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
							className="text-sm text-muted-fg transition-colors hover:text-accent">{s.name}</a>
					))}
				</div>
			</div>
		</footer>
	);
}
```

- [ ] **Step 6: Wire into `app/layout.tsx`**

Add `import { ThemeScript } from "@/components/theme/ThemeScript";` etc. In `<head>` render `<ThemeScript />` (before the JSON-LD scripts). Wrap body content:

```tsx
<body className={`${inter.variable} ${sora.variable} antialiased`}>
	<ThemeProvider>
		<SiteNav />
		<main className="min-h-screen">{children}</main>
		<SiteFooter />
	</ThemeProvider>
</body>
```

- [ ] **Step 7: Verify**

Run: `bun run build && bun dev`
Expected: build passes. In browser: nav sticky, theme toggle flips light/dark and persists across reload with no flash.

- [ ] **Step 8: Commit**

```bash
git add components/theme components/layout app/layout.tsx
git commit -m "feat: add theme system (no-flash toggle) and nav/footer app shell"
```

---

## Phase 1 — UI + motion primitives

### Task 4: Reusable UI + motion primitives

**Files:**
- Create: `components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `SectionHeader.tsx`, `StatTile.tsx`
- Create: `components/motion/Reveal.tsx`, `Stagger.tsx`, `CountUp.tsx`

**Interfaces:**
- Produces:
  - `<Button variant?="primary"|"secondary"|"ghost" href? onClick? >` (renders `<Link>` if `href`, else `<button>`)
  - `<Card>` — `rounded-xl border border-border bg-surface` wrapper with hover lift
  - `<Badge>` — small chip for skills/tags
  - `<SectionHeader eyebrow title intro? />`
  - `<StatTile value label />` (uses `CountUp` for numeric part)
  - `<Reveal>` — fade+rise `whileInView` wrapper (once)
  - `<Stagger>` + `<Stagger.Item>` — staggered children
  - `<CountUp value />` — count-up number on first view

- [ ] **Step 1: Create `components/motion/Reveal.tsx`**

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, className }: {
	children: React.ReactNode; delay?: number; className?: string;
}) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={reduce ? false : { opacity: 0, y: 24 }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}
```

- [ ] **Step 2: Create `components/motion/Stagger.tsx`**

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
	const reduce = useReducedMotion();
	return (
		<motion.div className={className}
			initial={reduce ? false : "hidden"}
			whileInView={reduce ? undefined : "show"}
			viewport={{ once: true, margin: "-80px" }}
			variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<motion.div className={className}
			variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
			{children}
		</motion.div>
	);
}
```

- [ ] **Step 3: Create `components/motion/CountUp.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function CountUp({ value, className }: { value: string; className?: string }) {
	const num = parseInt(value.replace(/\D/g, ""), 10);
	const suffix = value.replace(/[0-9]/g, "");
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduce = useReducedMotion();
	const [n, setN] = useState(reduce ? num : 0);

	useEffect(() => {
		if (!inView || reduce || isNaN(num)) return;
		let raf = 0; const start = performance.now(); const dur = 900;
		const tick = (t: number) => {
			const p = Math.min((t - start) / dur, 1);
			setN(Math.round(p * num));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, num, reduce]);

	return <span ref={ref} className={className}>{isNaN(num) ? value : `${n}${suffix}`}</span>;
}
```

- [ ] **Step 4: Create `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all";
const variants = {
	primary: "bg-accent text-accent-fg hover:opacity-90",
	secondary: "border border-border text-foreground hover:border-accent",
	ghost: "text-muted-fg hover:text-foreground",
};

type Props = {
	variant?: keyof typeof variants;
	href?: string;
	className?: string;
	children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", href, className, children, ...rest }: Props) {
	const cls = cn(base, variants[variant], className);
	if (href) return <Link href={href} className={cls}>{children}</Link>;
	return <button className={cls} {...rest}>{children}</button>;
}
```

- [ ] **Step 5: Create `components/ui/Card.tsx`, `Badge.tsx`, `SectionHeader.tsx`, `StatTile.tsx`**

```tsx
// Card.tsx
import { cn } from "@/lib/utils";
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
	return <div className={cn("rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-sm", className)}>{children}</div>;
}
```

```tsx
// Badge.tsx
import { cn } from "@/lib/utils";
export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
	return <span className={cn("inline-block rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-fg", className)}>{children}</span>;
}
```

```tsx
// SectionHeader.tsx
export function SectionHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
	return (
		<div className="mb-8 max-w-2xl">
			<p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">{eyebrow}</p>
			<h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
			{intro && <p className="mt-3 text-muted-fg">{intro}</p>}
		</div>
	);
}
```

```tsx
// StatTile.tsx
import { CountUp } from "@/components/motion/CountUp";
export function StatTile({ value, label }: { value: string; label: string }) {
	return (
		<div className="rounded-xl border border-border bg-surface p-6">
			<CountUp value={value} className="font-display text-4xl font-bold text-accent" />
			<p className="mt-1 text-sm text-muted-fg">{label}</p>
		</div>
	);
}
```

- [ ] **Step 6: Verify**

Run: `bun lint && bun run build`
Expected: clean + passes.

- [ ] **Step 7: Commit**

```bash
git add components/ui components/motion
git commit -m "feat: add UI primitives and reduced-motion-aware motion components"
```

---

## Phase 2 — Pages

### Task 5: Home page (split hero + condensed sections)

**Files:**
- Create: `components/sections/Hero.tsx`, `AboutPreview.tsx`, `WorkPreview.tsx`, `ProjectsPreview.tsx`, `ArticlesPreview.tsx`, `ContactCTA.tsx`
- Create: `app/template.tsx` (page transition)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site`, `experience`, `projects`, `skills`, `fetchMediumArticles`, `fallbackArticles`, all UI + motion primitives.
- Produces: home route rendering.

- [ ] **Step 1: Create `app/template.tsx`** (springy crossfade on route change)

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
	const reduce = useReducedMotion();
	if (reduce) return <>{children}</>;
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
			{children}
		</motion.div>
	);
}
```

- [ ] **Step 2: Create `components/sections/Hero.tsx`** (split hero, `octocat.png`)

```tsx
"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
	const reduce = useReducedMotion();
	const rise = (d: number) => ({
		initial: reduce ? false : { opacity: 0, y: 24 },
		animate: reduce ? undefined : { opacity: 1, y: 0 },
		transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
	});
	return (
		<section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
			<div>
				<motion.p {...rise(0)} className="mb-3 text-sm font-medium uppercase tracking-wide text-accent">
					{site.role}
				</motion.p>
				<motion.h1 {...rise(0.08)} className="font-display text-5xl font-extrabold leading-tight sm:text-6xl">
					{site.name}
				</motion.h1>
				<motion.p {...rise(0.16)} className="mt-4 text-lg text-muted-fg">{site.valueProp}</motion.p>
				<motion.div {...rise(0.24)} className="mt-8 flex gap-3">
					<Button href="/work">View work</Button>
					<Button href="/contact" variant="secondary">Contact</Button>
				</motion.div>
			</div>
			<motion.div {...rise(0.2)} className="flex justify-center">
				<div className="rounded-2xl border border-border bg-surface p-3 shadow-sm ring-1 ring-accent/10">
					<Image src="/octocat.png" alt={site.name} width={320} height={320}
						className="rounded-xl" priority />
				</div>
			</motion.div>
		</section>
	);
}
```

- [ ] **Step 3: Create the preview sections**

Each preview = `<section>` with `<SectionHeader>`, condensed content wrapped in `<Reveal>`/`<Stagger>`, and a `<Button variant="secondary" href=...>` "see more". Build:
- `AboutPreview.tsx` — short bio paragraph + stat tiles (`site.stats` → `StatTile`) + skills as `Badge` grid (`skills`). No "see more".
- `WorkPreview.tsx` — `experience.slice(0, 3)`, each a `Card` (title, company, dates, top 2 descriptions). Button → `/work` "View full experience".
- `ProjectsPreview.tsx` — first 3–4 repos flattened from `projects`, each a `Card` with tags. Button → `/projects` "All projects".
- `ArticlesPreview.tsx` — **async server component**: `const articles = await fetchMediumArticles(site.mediumUsername); const list = (articles.length ? articles : fallbackArticles).slice(0,3);` render `ArticleCard` (created Task 8; for now inline a simple card). Button → `/articles` "Read all articles".
- `ContactCTA.tsx` — heading + line + `Button href="/contact"` and email button.

> Keep each section server-rendered where possible; only Hero and motion wrappers are client. Wrap section bodies in `<Reveal>`.

- [ ] **Step 4: Compose `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
	return (
		<>
			<Hero />
			<div className="divide-y divide-border">
				<AboutPreview />
				<WorkPreview />
				<ProjectsPreview />
				<ArticlesPreview />
				<ContactCTA />
			</div>
		</>
	);
}
```

Wrap each section's outer element with `mx-auto max-w-5xl px-6 py-16`.

- [ ] **Step 5: Verify**

Run: `bun run build && bun dev`
Expected: build passes; home shows split hero (octocat image), stat counters animate on scroll, previews with working "see more" links, page fades in.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/template.tsx components/sections
git commit -m "feat: build home page — split hero + condensed sections with motion"
```

---

### Task 6: `/work` page

**Files:**
- Create: `components/work/WorkTimeline.tsx`, `app/work/page.tsx`

**Interfaces:**
- Consumes: `experience`, `Reveal`, `Badge`.
- Produces: `/work` route.

- [ ] **Step 1: Create `components/work/WorkTimeline.tsx`**

Alternating left/right timeline. Each entry is a `Reveal`-wrapped row: on `md+`, odd/even entries offset to opposite columns around a center line; on mobile, single column with left rail. Render title, company · type, `dateStart – dateEnd`, `descriptions` as a bulleted list, `skills` as `Badge` chips.

```tsx
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

export function WorkTimeline() {
	return (
		<div className="relative">
			<div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" aria-hidden />
			<div className="space-y-10">
				{experience.map((e, i) => (
					<Reveal key={`${e.company}-${i}`} className={`relative pl-12 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:pl-0 md:text-right"}`}>
						<div className="rounded-xl border border-border bg-surface p-6 text-left">
							<h3 className="font-display text-xl font-bold">{e.title}</h3>
							<p className="text-sm text-muted-fg">{e.company} · {e.type}</p>
							<p className="mt-1 text-xs text-accent">{e.dateStart} – {e.dateEnd}</p>
							<ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-fg">
								{e.descriptions.map((d, j) => <li key={j}>{d}</li>)}
							</ul>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{e.skills.map((s) => <Badge key={s}>{s}</Badge>)}
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Create `app/work/page.tsx`**

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkTimeline } from "@/components/work/WorkTimeline";

export default function WorkPage() {
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Experience" title="Where I've worked"
				intro="Backend and full-stack roles across product teams, agencies, and freelance clients." />
			<WorkTimeline />
		</div>
	);
}
```

- [ ] **Step 3: Verify** — `bun run build && bun dev`, visit `/work`. Alternating layout on desktop, single column mobile.

- [ ] **Step 4: Commit**

```bash
git add app/work components/work
git commit -m "feat: add /work timeline page"
```

---

### Task 7: `/projects` page

**Files:**
- Create: `components/projects/ProjectCard.tsx`, `app/projects/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Card`, `Badge`, `Stagger`/`StaggerItem`.
- Produces: `/projects` route + `ProjectCard` reused by `ProjectsPreview`.

- [ ] **Step 1: Create `components/projects/ProjectCard.tsx`**

```tsx
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Repo } from "@/data/projects";

export function ProjectCard({ repo }: { repo: Repo }) {
	return (
		<a href={repo.url} target="_blank" rel="noopener noreferrer" className="block">
			<Card className="h-full">
				<h3 className="font-display text-lg font-bold">{repo.name}</h3>
				<p className="mt-1 text-sm text-muted-fg">{repo.description}</p>
				<div className="mt-4 flex flex-wrap gap-1.5">
					{repo.tags.map((t) => <Badge key={t}>{t}</Badge>)}
				</div>
			</Card>
		</a>
	);
}
```

- [ ] **Step 2: Create `app/projects/page.tsx`** — bento grid grouped by org

```tsx
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function ProjectsPage() {
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Open source" title="Things I've built and shared"
				intro="Boilerplates and tools I maintain for cleaner, faster backend work." />
			<div className="space-y-12">
				{projects.map((group) => (
					<div key={group.category}>
						<a href={group.orgUrl} target="_blank" rel="noopener noreferrer" className="font-display text-2xl font-bold hover:text-accent">{group.category}</a>
						<p className="mt-1 text-sm text-muted-fg">{group.description}</p>
						<Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{group.repos.map((r) => <StaggerItem key={r.name}><ProjectCard repo={r} /></StaggerItem>)}
						</Stagger>
					</div>
				))}
			</div>
		</div>
	);
}
```

- [ ] **Step 3: Verify** — `bun run build && bun dev`, visit `/projects`. Update `ProjectsPreview` (Task 5) to reuse `ProjectCard`.

- [ ] **Step 4: Commit**

```bash
git add app/projects components/projects components/sections/ProjectsPreview.tsx
git commit -m "feat: add /projects bento grid page"
```

---

### Task 8: `/articles` page

**Files:**
- Create: `components/articles/ArticleCard.tsx`, `app/articles/page.tsx`

**Interfaces:**
- Consumes: `fetchMediumArticles` (`lib/medium.ts`), `site.mediumUsername`, `fallbackArticles`, `Card`.
- Produces: `/articles` route + `ArticleCard` reused by `ArticlesPreview`.

- [ ] **Step 1: Create `components/articles/ArticleCard.tsx`**

```tsx
import { Card } from "@/components/ui/Card";
import type { Article } from "@/data/articles";
import type { MediumArticle } from "@/lib/medium";

export function ArticleCard({ article }: { article: Article | MediumArticle }) {
	const date = new Date(article.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
	return (
		<a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
			<Card className="h-full">
				<p className="text-xs text-accent">{date}</p>
				<h3 className="mt-1 font-display text-lg font-bold">{article.title}</h3>
				<p className="mt-2 text-sm text-muted-fg line-clamp-3">{article.description}</p>
			</Card>
		</a>
	);
}
```

> `line-clamp-3` needs `@tailwindcss/typography` OR the built-in `line-clamp` utility (Tailwind v4 ships `line-clamp-*` core — no plugin needed). Verify it renders; if not, use inline style with `-webkit-line-clamp`.

- [ ] **Step 2: Create `app/articles/page.tsx`** (async server component)

```tsx
import { fetchMediumArticles } from "@/lib/medium";
import { fallbackArticles } from "@/data/articles";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";

export const revalidate = 86400;

export default async function ArticlesPage() {
	const fetched = await fetchMediumArticles(site.mediumUsername);
	const articles = fetched.length ? fetched : fallbackArticles;
	return (
		<div className="mx-auto max-w-5xl px-6 py-16">
			<SectionHeader eyebrow="Writing" title="Articles & notes"
				intro="I write about backend architecture, APIs, and developer workflow on Medium." />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{articles.map((a) => <ArticleCard key={a.link} article={a} />)}
			</div>
		</div>
	);
}
```

- [ ] **Step 3: Verify** — `bun run build && bun dev`, visit `/articles`. Update `ArticlesPreview` (Task 5) to reuse `ArticleCard`.

- [ ] **Step 4: Commit**

```bash
git add app/articles components/articles components/sections/ArticlesPreview.tsx
git commit -m "feat: add /articles page with Medium feed + fallback"
```

---

### Task 9: `/contact` page

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `site.socials`, `site.email`, `SectionHeader`, `Stagger`.

- [ ] **Step 1: Create `app/contact/page.tsx`**

Large tappable link rows for each `site.socials` entry (name + label + external arrow via `lucide-react` `ArrowUpRight`), plus a prominent email row. Wrap rows in `Stagger`/`StaggerItem`.

```tsx
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function ContactPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<SectionHeader eyebrow="Contact" title="Let's talk"
				intro="Open to backend and full-stack roles, freelance work, and collaboration. The fastest way to reach me is email." />
			<Stagger className="divide-y divide-border rounded-xl border border-border">
				{site.socials.map((s) => (
					<StaggerItem key={s.name}>
						<a href={s.url} target="_blank" rel="noopener noreferrer"
							className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-surface">
							<span><span className="font-display font-bold">{s.name}</span>
								<span className="ml-3 text-sm text-muted-fg">{s.label}</span></span>
							<ArrowUpRight size={18} className="text-muted-fg" />
						</a>
					</StaggerItem>
				))}
			</Stagger>
		</div>
	);
}
```

- [ ] **Step 2: Verify** — `bun run build && bun dev`, visit `/contact`.

- [ ] **Step 3: Commit**

```bash
git add app/contact
git commit -m "feat: add /contact page"
```

---

### Task 10: `/resume` page

**Files:**
- Create: `components/resume/ResumeDocument.tsx`, `app/resume/page.tsx`

**Interfaces:**
- Consumes: `site`, `experience`, `skills`, `Button`.
- Produces: `/resume` route with on-page HTML resume + download button + print stylesheet.

- [ ] **Step 1: Create `components/resume/ResumeDocument.tsx`**

Print-friendly single column: header (name, role, contact line), summary (`site.valueProp`), Experience (map `experience`: title, company, dates, descriptions), Skills (`skills` grouped). Use semantic headings; keep neutral colors for print.

- [ ] **Step 2: Create `app/resume/page.tsx`**

```tsx
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { ResumeDocument } from "@/components/resume/ResumeDocument";

export default function ResumePage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<div className="mb-8 flex items-center justify-between print:hidden">
				<h1 className="font-display text-3xl font-bold">Resume</h1>
				<a href={site.resumePdf} download
					className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90">
					<Download size={16} /> Download PDF
				</a>
			</div>
			<ResumeDocument />
		</div>
	);
}
```

> Download points to `public/resume.pdf`. Add a note in `.claude/rules/ui-design.md` that the user must drop `resume.pdf` in `public/`; until then, change `href` to `site.resumeUrl` (Google Drive) as a fallback. Add `@media print` rules in `globals.css` to hide nav/footer if needed (`.print\\:hidden`).

- [ ] **Step 3: Verify** — `bun run build && bun dev`, visit `/resume`, test browser print preview looks clean.

- [ ] **Step 4: Commit**

```bash
git add app/resume components/resume
git commit -m "feat: add /resume page with printable HTML resume + download"
```

---

## Phase 3 — SEO + discoverability

### Task 11: Per-route metadata, JSON-LD, sitemap

**Files:**
- Create: `lib/seo.ts`
- Modify: `app/layout.tsx`, each `app/*/page.tsx`, `app/sitemap.ts`

**Interfaces:**
- Produces: `pageMetadata({ title, description, path })`, `breadcrumbJsonLd(items)`, `collectionJsonLd({...})`.

- [ ] **Step 1: Create `lib/seo.ts`** with `pageMetadata()` returning a `Metadata` object (title, description, `alternates.canonical`, OpenGraph) and JSON-LD builder helpers (`breadcrumbJsonLd`, `collectionJsonLd`).

- [ ] **Step 2: Add `export const metadata` (or `generateMetadata`) to each page** using `pageMetadata`:
  - `/work` — "Work Experience | ..." 
  - `/projects` — "Open Source Projects | ..."
  - `/articles` — "Articles | ..."
  - `/contact` — "Contact | ..."
  - `/resume` — "Resume | ..."
  - `/` — refresh default; add `ProfilePage` JSON-LD.

- [ ] **Step 3: Add `BreadcrumbList` + `ItemList`/`CollectionPage` JSON-LD** `<script type="application/ld+json">` to `/work`, `/projects`, `/articles`.

- [ ] **Step 4: Update `app/sitemap.ts`** to list all 6 routes with `lastModified`, `changeFrequency`, `priority`.

- [ ] **Step 5: Verify** — `bun run build`; check page `<head>` in `bun dev` for correct titles/canonical/JSON-LD; visit `/sitemap.xml`.

- [ ] **Step 6: Commit**

```bash
git add lib/seo.ts app/sitemap.ts app/**/page.tsx app/layout.tsx
git commit -m "feat: per-route metadata, JSON-LD, and updated sitemap"
```

---

### Task 12: `llms.txt` route

**Files:**
- Create: `app/llms.txt/route.ts`

**Interfaces:**
- Consumes: `site`, `experience`, `projects`.

- [ ] **Step 1: Create `app/llms.txt/route.ts`** — a `GET` route handler returning `text/plain` with an llms.txt-style document (name, role, summary, key skills, selected experience, projects, links, contact). Build the string from `data/*` so it stays in sync.

```ts
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export function GET() {
	const body = `# ${site.name}\n\n> ${site.role} — ${site.valueProp}\n\n## Contact\n${site.socials.map(s => `- ${s.name}: ${s.url}`).join("\n")}\n\n## Experience\n${experience.slice(0,6).map(e => `- ${e.title} @ ${e.company} (${e.dateStart}–${e.dateEnd})`).join("\n")}\n\n## Open source\n${projects.flatMap(g => g.repos.map(r => `- ${r.name}: ${r.description} — ${r.url}`)).join("\n")}\n`;
	return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
```

- [ ] **Step 2: Verify** — `bun run build && bun dev`, visit `/llms.txt`, confirm plaintext renders.

- [ ] **Step 3: Commit**

```bash
git add app/llms.txt
git commit -m "feat: add /llms.txt route for AI discoverability"
```

---

## Phase 4 — Cleanup + rules

### Task 13: Remove dead code

**Files:**
- Delete: `components/react-bits/` (dir), `components/FloatingLines.tsx`, `components/AboutSection.tsx`, `WorkExperienceSection.tsx`, `OpenSourceSection.tsx`, `BlogSection.tsx`, `SocialLinks.tsx`, `HeroProfileCard.tsx`, `SkillCard.tsx`, `SkillBadge.tsx`, `public/mock/`

- [ ] **Step 1: Confirm nothing imports them**

Run: `grep -rn "react-bits\|FloatingLines\|AboutSection\|WorkExperienceSection\|OpenSourceSection\|BlogSection\|SocialLinks\|HeroProfileCard\|SkillCard\|SkillBadge\|/mock/" app components lib`
Expected: no matches (all replaced). Fix any stragglers.

- [ ] **Step 2: Delete the files/dirs**

```bash
git rm -r components/react-bits components/FloatingLines.tsx components/AboutSection.tsx components/WorkExperienceSection.tsx components/OpenSourceSection.tsx components/BlogSection.tsx components/SocialLinks.tsx components/HeroProfileCard.tsx components/SkillCard.tsx components/SkillBadge.tsx public/mock
```

- [ ] **Step 3: Verify** — `bun lint && bun run build`. Both clean/pass.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove terminal-era components, react-bits, and mock JSON"
```

---

### Task 14: Author `.claude/rules/*.md`

**Files:**
- Create: `.claude/rules/ui-design.md`, `.claude/rules/copywriting.md`

- [ ] **Step 1: Write `.claude/rules/ui-design.md`** — document the shipped system: tokens table (light/dark values), fonts (`font-display`=Sora, body=Inter), spacing/`max-w-5xl` container rule, component patterns (Button/Card/Badge/SectionHeader/StatTile), motion rules (Reveal/Stagger/CountUp + reduced-motion requirement), the `resume.pdf` asset note, and a do/don't list ("no mono font, no `// NNN` numbering, no starfield"). Seed depth using the **frontend-design** / **ui-ux-pro-max** skills.

- [ ] **Step 2: Write `.claude/rules/copywriting.md`** — voice (clear, confident, engineer-to-engineer, no hype), tone, section copy formulas (eyebrow + heading + intro), CTA patterns, and rewrite guidance for future content. Seed using the **copywriting** / **copy-editing** skills.

- [ ] **Step 3: Commit**

```bash
git add .claude/rules
git commit -m "docs: add UI design and copywriting rules"
```

---

### Task 15: Final verification pass

- [ ] **Step 1: Full build + lint**

Run: `bun lint && bun run build`
Expected: both clean/pass, no warnings about unused deps.

- [ ] **Step 2: Manual QA in `bun dev`** — checklist:
  - All 6 routes load; nav active states correct; mobile menu works.
  - Theme toggle: light↔dark, persists, no flash on reload.
  - Home previews link to full pages; hero shows `octocat.png`.
  - Stat counters animate; sections reveal on scroll; route change crossfades.
  - `/resume` print preview is clean; download button present.
  - `/llms.txt` and `/sitemap.xml` serve correctly.
  - **Set OS "reduce motion"** and reload — content is static/instant, no animation.

- [ ] **Step 3: Update `CLAUDE.md`** — replace the "Terminal Precision" design-system section with the new Clean Systems system (tokens, fonts, routes, motion) so repo docs match reality.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to Clean Systems design system"
```

---

## Self-Review Notes

- **Spec coverage:** direction/tokens (T1), data (T2), theme+shell (T3), primitives (T4), home split-hero (T5), /work (T6), /projects (T7), /articles (T8), /contact (T9), /resume both-modes (T10), SEO (T11), llms.txt (T12), cleanup+dep removal (T13), `.claude/rules` (T14), reduced-motion + CLAUDE.md (T15). All spec sections mapped.
- **No test runner:** verification is lint + build + visual, stated in Global Constraints and every task — intentional, not a placeholder.
- **Type consistency:** `Experience` uses `dateStart/dateEnd` (renamed from JSON) everywhere; `Repo`/`Article`/`SkillGroup`/`Stat`/`Social`/`NavItem` names are consistent across producing (T2) and consuming (T5–T12) tasks.
- **Bento:** delivered as accents (StatTile grid, /projects grid) per approved "split hero + clean stack" home choice.
