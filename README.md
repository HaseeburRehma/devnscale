# Dev N Scale — Home Page

Implementation of the [Figma home page design](https://www.figma.com/design/TPPGnC88wDqNWaCvQOwpu1/Dev-N-Scale?node-id=1-10)
(`DEV N SCALE — Homepage`, node `4418:594`).

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx          Space Grotesk + Inter, reveal bootstrap script
    globals.css         Figma design tokens, type ramp, keyframes
    page.tsx            section composition
  components/
    icons/index.tsx     every glyph transcribed from the Figma exports
    sections/           one file per design section
    ui/
      PrimaryButton     dark shell + lime pill, roll-up hover
      SecondaryButton   dark / light variants, wipe-fill hover
      DotMatrixArrow    LED chevron marquee (3px pitch, 6-col period)
      PatternBackdrop   tiled logo-mark watermark
      Reveal            scroll-in wrapper (no-JS safe)
      NewsletterForm
  lib/content.ts        all copy from the design
```

## Design tokens

`src/app/globals.css` maps the Figma variable collection 1:1 — `accent-lime/*` →
`--color-lime-*`, `brand-green/*` → `--color-brand-*`, `neutrals/*` →
`--color-ink-*`, plus the semantic text/border/canvas colours. The display type
ramp (`.t-hero`, `.t-subsection`, `.t-h1`…) carries the Figma sizes, line
heights and letter-spacing, made fluid so they scale down on small screens.

## Animations

| Element | Behaviour |
|---|---|
| Primary button | 54px shell clips two stacked 42px lime faces; hover rolls the column, plus lift + lime glow. Figma's second face uses white text, but white on lime is only ~1.9:1, so both faces keep the black label (~11:1) |
| Secondary button | Zero-width panel at the left edge wipes across on hover, inverting label and icon |
| Dot-matrix chip | Chevrons march right one 18px tile per loop over a static dot field |
| Hero | Copy rises in via CSS (paints before hydration); three nested lime glows drift |
| Logo strip / ribbons | Duplicated tracks translated -50%; the two ribbons cross at ±5°, pausing on hover |
| Service cards | Lift, border/shadow shift, icon tilt-and-scale, sheen sweep, arrow nudge |
| Project cards | **Scroll-stacked**, matching devnscale.com: every card pins at the same 100px offset with an ascending z-index, so each slides completely over the last, separated by 80px |
| Work process | **Scroll-driven**, matching devnscale.com: a 3-viewport track with a pinned panel. The lime arc is a 90° segment spanning the active node to the next, gliding one quadrant per step so arc and lit node stay in lockstep. One node lit at a time; clicking a label scrolls to that point |
| Why us chart | Bars grow from the 1px state Figma ships to 60 / 30 / 10 on scroll |
| FAQ | Height + opacity accordion, one panel open at a time |
| Sections | Fade-and-lift on first scroll into view |

Everything respects `prefers-reduced-motion`.

## Responsive

Verified at 1440 / 916 / 390 with no horizontal overflow. Notable adaptations:

- Nav keeps its links out to 900px, then collapses to a hamburger sheet.
- Service grid goes 3 → 2 → 1 column; the featured card spans 2 columns only at `lg`.
- Project cards keep the two-column layout down to `md`, holding the 556:580
  ratio fluidly and snapping to the exact Figma pixels at `xl`. Below `md` the
  image moves under the text.
- Card stacking needs `(min-width: 768px) and (min-height: 640px)` — pinning a
  card taller than the viewport traps the scroll.
- The work-process ring needs ~790px for its side labels, so below `md` the same
  scroll progress drives a vertical stepper.

## Notes

- The About section's right-hand panel and the "View all projects" link are
  empty / hidden in the source file, so they render as a neutral image slot and
  are omitted respectively.
- The design only contains the "Consultation" state of the work-process
  component; copy for the other three steps follows its pattern. The file also
  ships a single illustration (the four raster assets in that subtree are the
  same artwork at different scales), so all four steps share
  `public/img/process/step.png` — set `image` per step in `src/lib/content.ts`
  once per-step artwork exists.
- Downloaded raster assets had a checkerboard or light matte baked in; these
  were keyed to true transparency in `public/img/`.
