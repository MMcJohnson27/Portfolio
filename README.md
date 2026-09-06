# morgan-portfolio

Portfolio for Morgan Johnson — product designer (UX / UI / research).
Next.js 15 · React 19 · TypeScript · Tailwind v3 · Framer Motion 12.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## The hero

Typography left, arched portrait right, on flat paper — the hero paints its own
`bg-paper` so the blueprint grid on `<body>` starts *below* it, at the hairline.

**It is deliberately short.** No `min-h-screen`: the hero is sized so the top of
the case-study grid clears the fold on a laptop, because a full-height hero
makes a recruiter scroll past an empty screen before seeing any work. Two
numbers control this — the hero's `pb`, and the *top* padding of the work
section, which is why that section's padding is asymmetric. Measured at 1440
wide, the first card starts at 761px, so roughly 140px of it shows on a 900px
viewport and 240px on a 1000px one.

**The arch** is three nested `rounded-t-full` layers with equal padding. That
produces genuinely concentric arcs: each layer's radius grows by exactly its own
inset, so the gap between curves is constant at the crown and at the springline.

Five elements enter in sequence on load — headline, intro, credentials,
portrait, then the nav. The first four share a `staggerChildren` parent; the nav
can't, because it lives in the layout and the hero in the page, so its delay is
hand-matched to the end of that sequence (`NAV_DELAY` in `Nav.tsx`). Measured on
the built page, opacity crosses zero at roughly 400 / 500 / 590 / 775ms.

**There's no portrait yet.** `portrait` in `lib/content.ts` is `null`, so the
frame renders the monogram at the identical size. Drop a vertical image in
`public/`, point `portrait` at it, and nothing in the layout moves.

## What this is right now

A **wireframe at design-system fidelity**. The tokens, the frame system and the
motion are finished; the words and the pictures are not. Every image on the
page is a blank `<Slot>`, and every unwritten line renders as a faint
placeholder, so what you are looking at is the *structure* of the site.

Personality comes back in the next pass — through imagery, UI and the shorts —
not through paragraphs in the hero.

## The design system in one paragraph

**The frame is the system.** An outer hairline, a paper matte, an inner
hairline. The logo is a frame, the nav CTA is a frame, every plate is a frame,
the floating satellites are frames. Because one object repeats at every scale,
the page reads as a single designed thing rather than a stack of sections —
which is also the argument the headline is making.

Two registers hold it together: an **editorial** one (Instrument Serif, warm
paper, generous air) and a **technical** one (JetBrains Mono labels, index
rails, coordinate ticks, drafting annotations). The editorial register carries
the personality; the technical register keeps it from turning precious.

### Tokens

Everything lives in `tailwind.config.ts`. Change a value there, not in a
component.

| Token | Value | Job |
| --- | --- | --- |
| `paper` | `#F5F2EC` | page ground |
| `paper-deep` | `#EDE8DE` | frame mattes, recessed panels |
| `ink` | `#1C1A17` | headlines (never `#000`) |
| `ink-soft` / `ink-mute` / `ink-faint` | | body / captions / hairline text |
| `rule` | `#D6CFC2` | every hairline and frame |
| `clay` | `#B0603C` | the **only** accent — desaturated, ~49% sat |

One accent, deliberately. If something needs emphasis and clay is already
spoken for, use weight or space instead of a second colour.

### Type

| Family | Role |
| --- | --- |
| Instrument Serif | display only — the headline, section heads, the big chip number |
| Outfit | body, UI, buttons |
| JetBrains Mono | labels, indices, data, plate annotations |

## Structure

```
src/
  app/
    layout.tsx          fonts, metadata, <Nav>, grain overlay, <Footer>
    page.tsx            01 Hero · 02 CaseStudies · 03 Shorts
    globals.css         .frame / .frame-inner / .slot / .label / .rule-draw
  components/
    site/
      Hero.tsx          headline, intro, inline avatar — nothing else
      CaseStudies.tsx   the staggered two-column grid
      CaseStudyCard.tsx one card — still, hover video, title, meta
      Shorts.tsx        the 9:16 video gallery
      Footer.tsx        the sign-off
      SectionHeader.tsx one masthead shape for every section
      Slot.tsx          THE BLANK PLACEHOLDER — every image on the page
      Reveal.tsx        scroll-in group + item (keeps sections server-side)
      Nav.tsx           fixed nav, scroll lift, mobile sheet
      Frame.tsx         the frame primitive
      Grain.tsx         fixed paper grain
    plates/index.tsx    PARKED — the six illustrations, not rendered
  lib/
    content.ts          ALL structure + copy — edit here, not in components
    motion.ts           one easing curve, three springs, shared variants
```

## How to fill it in

Everything lives in `src/lib/content.ts`. Optional fields are **slots**: leave
one out and the UI prints a faint placeholder, write a real value and the same
line upgrades itself.

| To do this | Edit |
| --- | --- |
| Edit a case study | `caseStudies[n]` — `title`, `meta`, `summary` |
| Make a card clickable | add `href` — a card with no `href` is deliberately not an anchor, so nothing ships a dead link |
| Add a 5th project | add an entry with its still + clip; the grid re-flows, and the stagger follows the new order |
| Add a short | `shorts[n].title` / `.duration` |
| Drop media into a placeholder | pass it as `children` to the `<Slot>` — the frame, ratio and captions don't move |

### Case-study media

Each card holds three files in `public/case-studies/`:

| File | Source | Job |
| --- | --- | --- |
| `<id>.mp4` | `<Project> Thumbnail.mp4` | loops by default |
| `<id>-hover.mp4` | `<Project> Thumbnail Hover.mov` | crossfades in on hover, carrying the summary text |
| `<id>-still.jpg` | pulled from the thumbnail | `poster`, so the frame is never empty on first paint |

The thumbnails are the original exports — every re-encode came out *larger*, so
they are copied in untouched. The hover clips are re-encoded from the `.mov`
recordings with `avconvert -p Preset960x540 -s IN -o OUT.mp4`; they are abstract
distortion loops with no fine detail, so 960x540 is indistinguishable from
source at card size. Stills come from `qlmanage -t -s 1920 -o DIR <video>` then
`sips -s format jpeg`.

**Every clip ships silent.** Both `<video>` elements are `muted`, and the files
themselves carry no audio track — two of the thumbnail exports arrived with a
stereo AAC track, which was stripped losslessly (passthrough, no video
re-encode) with [`scripts/strip-audio.swift`](scripts/strip-audio.swift):

```bash
swift scripts/strip-audio.swift in.mp4 out.mp4
```

Check any new clip with `mdls -name kMDItemCodecs <file>` — it should read
`"H.264"` alone. Muting in markup is enough to keep a page quiet, but shipping
the track anyway wastes bytes and leaves sound one attribute-edit away.

**The hover clips carry the type.** Nothing is layered behind the overlay — no
scrim, tint or `backdrop-blur` — so legibility is a property of the asset, not
the CSS. Mean luminance measured under the bottom-left text block, sampled at
five points across each clip:

| clip | mean L | share of the block above L=140 |
| --- | --- | --- |
| Forge | 11–21 | 0% |
| Fitlogs | 18–24 | ≤0.3% |
| Jurni | 54 | 0% |
| Cognativ | 87–99 | 1.4–2.3% |

All four are comfortable for white text. Cognativ is the brightest and was
regraded once for exactly this reason — the earlier export measured 99–108 mean
with up to 5.1% of the block above L=140. Re-measure with `scratchpad/luma.mjs`
after any change to a hover clip or to where the text sits; the fix for a clip
that fails belongs in the export, not in a CSS scrim.

**Adding a project:** drop in `<id>.mp4` and `<id>-hover.mp4`, pull a still with
the two commands above, then add the entry to `caseStudies`.

## The plates

`src/components/plates/index.tsx` holds six hand-drawn SVGs (interface, pizza,
cognition, tennis, joinery, a ski line) on a shared 320 × 400 stage.

**They're parked, not deleted.** They carried the personality the hero has
stepped back from. The file is self-contained, so it compiles on its own and
can be dropped back in whenever the illustrated register is wanted again.

## Performance rules this code follows

- Pointer parallax and magnetic buttons use `useMotionValue` / `useSpring`
  only. Moving the mouse never triggers a React render.
- Every infinite animation is isolated in a `memo()` leaf in `Perpetual.tsx`,
  so nothing loops inside the layout tree.
- Only `transform` and `opacity` are animated.
- The grain is `fixed` and `pointer-events-none` — grain on a scrolling
  container forces continuous GPU repaints.
- `min-h-[100dvh]`, never `h-screen` (iOS Safari address-bar jump).
- `prefers-reduced-motion` disables the deck auto-advance and all transitions.

## Before you ship

- [ ] Write the six case-study titles, disciplines and years in `lib/content.ts`.
- [ ] Cover images into the case-study slots, poster frames into the shorts.
- [ ] Give each case study an `href` (a route, or a link out) — until then the
      cards are correctly inert.
- [ ] Add a vertical portrait to `public/` and set `portrait` in `lib/content.ts`.
- [ ] Swap `metadataBase` if the domain isn't `morganjohnson.work`.
