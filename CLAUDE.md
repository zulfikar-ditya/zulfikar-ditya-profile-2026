# CLAUDE.md

@AGENTS.md

Personal portfolio for a backend and AI engineer. Single page, Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.

The page (branch `revamp-2027`) opens on a scroll-driven isometric train ride through the career, then continues as plain sections: about, work history, tools, open source, writing, contact. All copy is written for a non-technical reader (see `.claude/rules/content.md`). Read `.claude/rules/design.md` before touching anything visual, and apply the `antislop` skill to UI work and the `copywriting` skill to copy (both in `.claude/skills/`).

## Commands

```bash
bun dev          # dev server
bun run build    # production build
bun start        # serve the build
bun lint         # ESLint
```

## Rules

Project rules are in `.claude/rules/` and load automatically:
- `stack.md`: tooling, versions, what to run before calling work done
- `content.md`: positioning (AI + backend roles), where content lives, no invented facts
- `design.md`: direction, colours, type, and the reason behind each choice
- `motion.md`: how the ride is animated

## Layout

- `app/`: `layout.tsx` (fonts, metadata, JSON-LD), `page.tsx` (composes the page), `sitemap.ts`, `robots.ts`, `globals.css` (Tailwind theme tokens)
- `components/ride/`: the isometric ride (`RideScene` draws it, `RideStage` scrolls it, `config.ts` holds its constants)
- `components/sections/`: the sections below the ride
- `content/`: station boards, skills, links
- `lib/iso.ts`: isometric projection helpers; `lib/experience.ts`: typed experience data and station lookups; `lib/medium.ts`: Medium RSS fetch (revalidated every 24h); `lib/utils.ts`: `cn()`
- `public/mock/`: source data (`experience.json`, `projects.json`)
