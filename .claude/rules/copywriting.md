# Copywriting Rules — "Clean Systems"

This documents the voice and copy patterns that shipped with the `redesign/clean-systems` rewrite. Content lives in `data/site.ts` (voice source of truth), `data/experience.ts`, `data/projects.ts`, `data/articles.ts`, `data/skills.ts`, and inline in `components/sections/*` / `app/**/page.tsx` (`SectionHeader` copy).

## Voice & tone

Clear, confident, engineer-to-engineer. Concrete over abstract. No hype, no buzzword soup, no exclamation points.

- **Specific technologies over vague claims.** `site.tagline`: `"Laravel · Go · Node.js"` — not "modern tech stack." `site.valueProp`: "I build scalable APIs and high-performance backend systems — clean architecture, tuned databases, and CI/CD that ships reliably." Concrete nouns (APIs, databases, CI/CD), not adjectives doing the work alone.
- **First person, declarative sentences.** "I build...", not "passionate about building..." or "results-driven engineer who...".
- **Understated humor is fine when it's earned and concrete**, not jokey filler: `ContactCTA` — "infrastructure that doesn't page you at 3am" is the one deliberately colorful line in the whole system; it works because it's a specific, relatable engineering pain, not a generic quip. Don't add more than one moment like this per page.
- **No hype adjectives** ("revolutionary," "cutting-edge," "passionate," "rockstar," "ninja," "world-class"). If you want to signal quality, name the outcome or the metric instead (see Patterns below).
- **Plain section labels**, not jargon or gimmicks: eyebrows read "About", "Experience", "Open Source", "Writing", "Contact" — single words or short plain phrases, never a numbered/coded label.

## Section copy formula

Every section/page opens with `SectionHeader { eyebrow, title, intro }`:

1. **Eyebrow** — 1–2 plain words, accent-colored, sets the category. E.g. `"About"`, `"Experience"`, `"Open Source"`, `"Writing"`, `"Contact"`.
2. **Heading** (`font-display`, bold) — a short, benefit- or identity-oriented phrase, not a generic noun repeating the eyebrow. Examples from the shipped copy:
   - Hero: the name itself (`site.name`) with `site.role` as the eyebrow above it.
   - About: *"Backend systems, built to last"*
   - Work (home preview): *"Recent roles"*; Work (full page): *"Where I've worked"*
   - Projects (home preview): *"Selected projects"*; Projects (full page): *"Things I've built and shared"*
   - Articles: *"Latest articles"*
   - Contact: *"Let's talk"*
   - Contact CTA (homepage closer): *"Let's build something reliable"*
   
   Note the pattern: the **home preview** heading and the **full page** heading for the same section are deliberately different phrasings (e.g. "Recent roles" vs. "Where I've worked") — don't reuse the exact same string in both places.
3. **Intro** (one sentence, muted color) — states what the visitor is about to see, plainly. E.g. *"A snapshot of where I've shipped backend systems most recently."* / *"Boilerplates and tools I maintain for cleaner, faster backend work."* / *"Notes on backend architecture, performance, and shipping reliable systems."* Keep it to one sentence; it's a preview, not a paragraph.

### CTA copy

Buttons are short, verb-first, lowercase-after-first-word:

- `"View work"` / `"View full experience"` (hero → work)
- `"Contact"` / `"Get in touch"` / `"Email me"` (contact variants — `Get in touch` links to `/contact`, `Email me` is a direct `mailto:` — keep that distinction if adding more contact CTAs)
- `"All projects"`, `"Read all articles"` — "see more" links off home preview sections use this "[verb] [scope]" shape: verb + what they'll see, not "Learn more" or "Click here"
- `"Download PDF"` (resume) — icon + label, describes the exact action and file type

## Patterns for role / project / article descriptions

**Role descriptions** (`data/experience.ts`, rendered as bullet lists in `WorkPreview`/`WorkTimeline`):
- Active voice, past tense, one accomplishment per bullet: "Architected and implemented RESTful APIs using Laravel and NestJS...", "Optimized database performance through efficient schema design and strategic indexing, resulting in 30% faster query execution."
- Lead with the verb (Architected, Engineered, Optimized, Integrated, Established, Led, Mentored) — never "Responsible for..." or "Worked on...".
- Include a real metric when you have one — "30% faster query execution", "99.9% application uptime", "reducing implementation time by 40%", "50% [downtime] reduction". Don't invent a percentage; only include a metric if it's a real, known number. It's fine for a bullet to have no metric if none is real — don't pad with fake precision.
- Skills list (`skills: string[]`) is the tag/`Badge` list per role — specific technology and practice names (e.g. `"Database Optimization"`, `"CI/CD"`), not soft-skill filler unless it's genuinely relevant (leadership roles do list "Mentorship", "Team Leadership" — that's fine when the role actually was a lead role).

**Project descriptions** (`data/projects.ts`):
- One sentence, states what the repo *is* and its core stack, not a marketing pitch: *"Clean architecture starter with Elysia.js, Drizzle ORM, PostgreSQL, and BullMQ"*, *"Admin dashboard template built with Laravel Blade and Tailwind CSS"*.
- Group-level `description` explains the shared purpose of a repo family in one line: *"Production-ready boilerplate templates with clean architecture"*.
- `tags: string[]` mirror the actual stack named in the description — keep them in sync (don't tag a repo with a technology not mentioned or actually used).

**Article titles/descriptions:** sourced from Medium RSS at runtime (`lib/medium.ts`) with `data/articles.ts` as a static fallback — you don't write article copy directly here, but if editing `fallbackArticles`, match the tone of real Medium titles (specific, technical, no clickbait).

**Titles/metadata:** keep page `<title>` values plain and specific (e.g. `"Resume"`, `"Work Experience"`, `"Open Source Projects"`, `"Contact"`) — the metadata template in `app/layout.tsx` (`template: "%s | Zulfikar Ditya"`) automatically appends `" | Zulfikar Ditya"`, so don't include the site name in the page-level title yourself.

## Rewrite checklist

When editing or adding content, check each of these before shipping:

- [ ] Does the eyebrow use a plain 1–2 word label (no numbering, no jargon)?
- [ ] Is the heading distinct from its eyebrow and from the equivalent heading elsewhere (home preview vs. full page)?
- [ ] Is the intro exactly one sentence, describing what's below rather than selling it?
- [ ] Are role/project bullets active-voice, verb-first, past tense?
- [ ] Is every metric in a bullet real (not invented for effect)?
- [ ] Are technology names specific (Laravel, Go, PostgreSQL — not "modern frameworks")?
- [ ] Is CTA copy verb-first and scoped ("View work", not "Learn more" or "Click here")?
- [ ] Any hype adjectives ("passionate," "cutting-edge," "world-class")? Cut them.
- [ ] Does the page `<title>` avoid duplicating the site name (the layout template appends it)?
- [ ] External links carry `target="_blank" rel="noopener noreferrer"` (a UI rule, but copy edits often touch these links too)?
