# Stack and tooling

- Package manager is bun (`bun.lock`). Never use npm, yarn or pnpm, and never commit `package-lock.json`.
- Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict. Next 16 differs from older training data: read the matching guide in `node_modules/next/dist/docs/` before using a Next API you are not sure of (see `AGENTS.md`).
- TypeScript is pinned to `^6`. TypeScript 7 breaks `typescript-eslint` (the lint run crashes on load), so do not bump it until typescript-eslint supports it.
- Before calling work done, run `bun lint` and `bun run build`. Report failures with the output; do not hide them.
- Ask before adding a dependency. Prefer what is installed: gsap + `@gsap/react` for animation, three / ogl for WebGL, lucide-react for icons, `cn()` from `lib/utils.ts` for class merging.
- No `any` unless unavoidable. Server components by default; add `"use client"` only to the component that needs browser APIs or animation, not to whole sections.
