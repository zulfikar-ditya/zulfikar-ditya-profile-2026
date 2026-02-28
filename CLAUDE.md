# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev       # Start dev server (Next.js)
bun build     # Production build
bun start     # Start production server
bun lint      # Run ESLint
```

> This project uses **bun** as the package manager (lockfile: `bun.lock`). Do not use npm or yarn.

## Architecture Overview

Personal portfolio site built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. It is a single-page app (`app/page.tsx`) composed of vertically stacked sections.

### Directory Structure

- `app/` — Next.js App Router: `layout.tsx` (metadata, JSON-LD SEO), `page.tsx` (section composition), `sitemap.ts`, `robots.ts`
- `components/` — Portfolio section components (`AboutSection`, `WorkExperienceSection`, `OpenSourceSection`, `BlogSection`, `SocialLinks`, `FloatingLines`, `SkillCard`, `SkillBadge`)
- `components/react-bits/` — Reusable animated UI primitives: `SplitText` (GSAP scroll-triggered char animation), `TextType` (typewriter), `SpotlightCard` (mouse-tracking glow), `LightPillar`. Barrel-exported from `index.ts`.
- `lib/medium.ts` — Server-side Medium RSS parser and fetcher
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `public/mock/` — Static JSON data files that drive content

### Data Flow

Content comes from two sources:

1. **Static JSON files** in `public/mock/`:
   - `experience.json` → `WorkExperienceSection`
   - `projects.json` → `OpenSourceSection`
   - `articles.json` → fallback for blog (currently unused — empty array shown on fetch failure)

2. **Medium RSS API** (`lib/medium.ts`) → `BlogSection` (async server component, `next: { revalidate: 86400 }` — 24h ISR)

To update work experience, skills, or open source projects, edit the corresponding JSON file in `public/mock/` or the `skillsData` object in `components/AboutSection.tsx`.

### Client vs Server Components

- **Server components**: `AboutSection`, `WorkExperienceSection`, `OpenSourceSection`, `BlogSection` (async)
- **Client components** (`"use client"`): `FloatingLines` (Three.js WebGL shader), all `react-bits/` primitives (GSAP animations)

### Styling Conventions

- Tailwind CSS v4 with PostCSS (`postcss.config.mjs`)
- shadcn/ui configured (`components.json`), with aliases `@/components/ui` and `@/lib/utils`
- Primary accent: `#00bba7` (teal), secondary: `#e12afb` (purple). Dark-only palette: `bg-black`, `bg-zinc-900`, `bg-gray-950`
- Gradient used throughout: `from-[#00bba7] to-[#e12afb]`

### Key Libraries

- **Three.js** — `FloatingLines` renders an animated GLSL shader (wave lines) on a fullscreen WebGL canvas in the hero section
- **GSAP / @gsap/react** — powers `SplitText` (scroll-triggered character reveal) and `TextType` (typewriter effect)
- **lucide-react** — icon library
- **radix-ui** — accessible primitives (via shadcn)
