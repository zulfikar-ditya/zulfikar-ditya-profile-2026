# Content and positioning

- The site positions the owner for **AI engineering and backend engineering roles**. Lead with AI work (RAG, embeddings, vector search, guardrails, provider routing), backed by backend depth (APIs, databases, queues, reliability). Older full-stack, ERP and low-code work stays, but compressed.
- Content lives in data files, not in JSX. Experience, projects and articles come from `public/mock/*.json` (or their typed successors in `content/` if the revamp moves them); Medium posts come from `lib/medium.ts`. Changing a section's copy should mean editing data, not components.
- Facts come only from the existing data files and the resume. Never invent metrics, employers, dates, clients or technologies. If a stat or number is needed and does not exist, ask.
- Numbers shown as stats must be derivable from data (years from dates, counts from arrays) or already stated in the data. Estimates carry a `~`.
- Keep SEO metadata and JSON-LD in `app/layout.tsx` in sync with any change to title, role or summary.

## One text for two readers
The page has to work for a visitor with no technical background and for an engineer or hiring manager, in the same copy. There is no mode switch (the owner rejected one). The pattern:
- Say it first in everyday words, then name the technical thing in the same breath: "I build that part. Engineers call it the backend: the APIs, databases and queues behind the screen."
- A non-technical reader must be able to stop after the first sentence and have understood. A technical reader must find the real terms, tools and numbers without digging.
- On a ride board: the caption (`lines`) is plain, and one short `note` line under it carries the specifics.
- In the work history: a plain summary for every job, with the full technical bullets behind "Show the technical details".
- Never write two separate versions of the same paragraph.

## Audience and voice
- Explain, don't label. One or two clever words explain nothing; say what happened and why it mattered to a person ("fewer problems reaching customers, because I tested the software before release").
- The train is the picture, not the vocabulary. Never use railway or developer words as headings or labels ("branch lines", "cargo", "terminus", "repos"). Say "Where I've worked", "Things I've built and given away".
- First person, in the owner's voice: plain, direct, a little informal, honest about learning by doing. Contractions are fine. No hype, no buzzwords, no forced slang, no exclamation marks.
- Use an everyday comparison when a concept is abstract, and define an unavoidable term the first time it appears.
- Voice sources: the owner's own private writing and speaking-persona notes, kept outside this repo. Read them for tone only; never publish their content or name them here.
- Use the `copywriting` skill (`.claude/skills/copywriting`) for any copy change, including its AI-tells check.

## Names
- Work described from the owner's private notes is written without client, employer or project names ("a government's public documents", "an in-store promotion program"). Only names already in the public resume data may appear.
