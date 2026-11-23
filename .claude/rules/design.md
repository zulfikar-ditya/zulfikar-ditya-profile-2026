# Design direction: the ride

Reading this as: a personal portfolio for people hiring AI and backend engineers, in an isometric "wrapped story" style, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

The career is a train ride through an isometric city. The page opens on one full-screen scene. Scrolling moves the world under a train that stays put; each station has a board, and the number for that chapter is printed on the board, inside the scene. Each job is a building that rises as the train nears it. The sky changes colour at every station. Below the ride the page turns into plain, readable sections for people who want the details.

Reference: https://github.com/habibiahmada/wrapyourgit (the story ride). Borrow its structure (one world, numbers printed on solids, progress segments on top), not its look.

## Reasons (keep these true when changing anything)
- **Isometric world, not a hero with text**: the owner asked for an animation timeline; the ride is the timeline.
- **No text laid over the scene**: the board is a solid in the world, so the number belongs to the place. Only the progress bar and two small controls sit on top.
- **Train livery (cream, red and marigold stripes)**: taken from Jakarta's commuter trains, where the owner works.
- **Flat colour skies** (paper, cobalt, marigold, red, cobalt, paper, marigold, green, paper): one colour per chapter, never the same as its neighbour, so you know where you are without reading. Green appears once, for the AI line.
- **Boards show what was built, not how good it was**: the owner dropped the uptime and bug-count figures as showing off or overclaiming. A number goes on a board only when it describes the work (40% faster integration, 8 parts of a business). Never frame a period as holding several jobs at once.
- **The resume is a button on a board**: "Open my resume" is printed on the first and the last billboard (`board.button`). The owner rejected a sign on the train and eyes on the train; keep the train plain.
- **The ride ends with the train leaving**: the last stop is a thank-you board, and one more screen of scroll sends the train away until its last car is gone, then the page continues.
- **Nunito for everything**: the owner's choice. It is a plain, friendly face that a non-technical visitor reads easily, and it avoids the condensed poster fonts that AI-built sites lean on.
- **Light page below the ride**: details are for reading, so they sit on paper with ink text.

## Colours
Tokens live in `app/globals.css`. Use tokens, never raw hex in components.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F3EDE0` | page background, first sky |
| `white` | `#FFFDF7` | lit faces of buildings, platform, train |
| `ink` | `#17150F` | text, boards |
| `asphalt` | `#35322B` | ground slab |
| `steel` | `#B9B2A3` | rails, wagon beds |
| `red` | `#D9342B` | core colour: sky, stripe, terminus |
| `marigold` | `#F2B21B` | core colour: sky, board numbers, backend crates |
| `cobalt` | `#2B4ACB` | core colour: sky, tower roofs |
| `green` | `#39D353` | the one accent: AI line only |

- Text on `red` and `cobalt` is `paper`; text on `marigold`, `green` and `paper` is `ink`. Small text never sits directly on a sky: it goes on an ink chip.
- Shading comes from `tone()` in `lib/iso.ts` (three shades of one colour). No gradients, glows, blur or shadows.

## Type
- `font-display`: Nunito 900, sentence case. Board numbers and section headings only.
- `font-sans`: Nunito 400 to 800. Everything else.
- No monospace, no all-caps headings, and no small uppercase labels with wide letter-spacing.

## The ride
- Geometry and projection: `lib/iso.ts`; scene: `components/ride/RideScene.tsx` (server-rendered SVG); scroll logic: `components/ride/RideStage.tsx`.
- No two neighbouring stops look the same. Each stop in `content/stations.ts` sets a `look` and a `camera`:
  - `billboard`: tall ink board, big value in colour, three caption lines.
  - `wide`: low white board for a paragraph, no big value.
  - `wall`: the words lettered on the side of a building.
  - `sign`: a marigold sign on one post with an ink band for the kicker (red would vanish into its red sky). Ink boards carry a thin steel frame so their edge reads against the dark ground; no board part uses the colour of its own sky.
  - `crates`: a stack of coloured crates, one thing built on each (`board.items`), kicker on the cap, note on the base.
  - `list`: a tall ink board listing a few things, each under a heading in the accent colour (`board.items`).
  - `camera`: zoom, `yaw`, and a nudge. `yaw` decides which side of the train the viewer stands on, like a passenger stepping off to the left or the right. Near 0 the stop's text sits to the right of the train; near -90 the view has swung round and the text sits to the left. Neighbouring stops alternate sides, so the journey swings round the train between them. The stop's text is centred automatically whatever the angle.
- Phones only ever stop square-on to one side or the other (yaw snaps to 0 or -90) and keep the zoom in a narrow range, because a board seen at an in-between angle is wider than the screen.
- The scene is drawn as flat faces (`Face` / `Box` in `RideScene.tsx`), each placed by the `.f-*` rules in `app/globals.css` from three CSS variables the stage sets: `--c`, `--s` (the turn) and `--t` (where the train is). Draw anything on a face in that face's flat coordinates; never bake a projection into coordinates.
- Keep yaw between -100 and 30. A box draws both end walls and CSS shows the one facing the viewer (`data-view` on the scene flips at -45). Lettering on a building wall (`wall` look) is only on the right-hand end, so a `wall` stop must be viewed from the right.
- A board button is a real link inside the SVG, kept out of the tab order because the contact section has the same link. A board with a button is drawn 72 taller.
- Text is drawn on its face, so it follows the turn. Wrap lines by hand: about 30 characters on a board, about 21 on a wall. Each stop has a plain caption and one `note` line of specifics (see `content.md`).
- One building per job, by type: tower or office (full-time), shop (freelance), school (internship), lab (AI).
- Portrait screens zoom the scene out (`.ride-zoom`) so a whole board stays in frame.

## Below the ride
Each section has its own composition and field: a moving band (ink, the role in a few words), about (paper, three paragraphs), work (white, one row per job with a plain summary and the technical details behind a toggle), tools (ink, a quiet list: what each group is for, six tools named, the rest behind "and N more"), open source (marigold, repo list), writing (paper, two columns), contact (red, footer). Do not turn them into identical card grids.

The train is the idea of the ride, not a shape to force onto everything. Below the ride, sections are plain: do not draw wagons, tracks or tickets around content. Lists of many items stay text, never rows of coloured chips.

## Copy
See `content.md` for voice and audience. No em dashes in text we write. Buttons say what they do ("Skip to my work history", "Read my articles on Medium"). Every number comes from `public/mock/experience.json`; `getStationEntries` fails the build if a board quotes wording that is no longer there.
