# Motion

Motion tells the story: scrolling is the ride. It is not decoration.

- Scroll position is the only clock. `RideStage` reads one ScrollTrigger and derives everything from its progress: world position, the turn and zoom of the view, building growth, sky wipe, number count-up, progress segments. It sets three CSS variables on the scene; CSS places every face from them. Nothing runs on a timer. After the last stop there is one more screen of scroll: the world stays still and the train runs on out of view (`DEPART` in `RideStage`).
- Each effect has a job: the world moving shows time passing; a building rising is a job starting; the sky wipe marks a new chapter; the count-up lands the number as the train arrives.
- With `prefers-reduced-motion`, the ride cuts from stop to stop: no gliding, no growing, no counting.
- Without JavaScript the scene renders at the first stop with every building standing, and all content is still in the sections below.
- No WebGL. The scene is inline SVG, drawn on the server.
- GSAP code uses `useGSAP` with a scope ref. Do not create a tween per element.
- Keep the SVG node count modest: every face is restyled each frame. Windows and sleepers are merged into single paths.
- Turning the view changes what overlaps what, so the stage re-sorts the standing things (`.ride-thing`) by depth when the order changes.

## React Bits
React Bits (https://reactbits.dev) is the component source for motion below the ride. Components live in `components/react-bits/`, are used with the site's tokens, and are varied on purpose so the page does not repeat one move:
- `SplitText`: headings whose words rise (About, Contact) or whose letters flip (open source).
- `FoldText`: headings that unfold like paper, from the top (tools) or from the side (writing).
- `SplitFlapText`: the work history heading flaps into place like a station board.
- `TextLoop`: the moving band between the ride and the page. Its text must stay short (about 25 characters), because one repeat is stretched to the band's length. It always ships with its stop button (`components/sections/Ribbon.tsx`).
- `CountUp` (needs the `motion` package): the job, project and article counts tick up when they scroll into view. Always use it through `components/sections/Count.tsx`.

All of these go through `components/sections/Heading.tsx`, `Ribbon.tsx` or `Count.tsx`. Anything that starts hidden or at zero must have a `js-only` / `no-js-only` pair or a `<noscript>` rule in `app/layout.tsx`, so the page reads correctly without JavaScript.

Rules for adding more: one job per effect, no fade-up on every block, each must respect `prefers-reduced-motion`, and anything that moves for more than five seconds needs a visible stop control.
