"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { SERVICES_INTRO, SERVICE_SHOWCASE } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "What we do" — the services showcase from the Figma prototype.
 *
 * Layout at desktop:
 *   Left column   : an oversized partial circle whose numbers (01…08) mark
 *                   each service's slot around the arc. The active number
 *                   sits at 3 o'clock, gets a lime dot, and reads dark;
 *                   inactive numbers are muted and slightly rotated to hug
 *                   the arc, so the whole indicator reads like a big clock.
 *   Middle column : the currently-active service — title, body, tag pills,
 *                   with a small numbered marker at its top and every other
 *                   service listed below as a big muted heading (click or
 *                   hover advances the active service).
 *   Right column  : a colorful 3D-style faceted glyph that swaps per service.
 *
 * Below `md` the indicator collapses; the vertical stepper takes over.
 */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const total = SERVICE_SHOWCASE.length;
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  const activate = (i: number) => {
    setActive((prev) => (prev === i ? prev : i));
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        {/* Header */}
        <Reveal>
          <p className="t-eyebrow">{SERVICES_INTRO.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 max-w-[760px] text-ink-900">
            {SERVICES_INTRO.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {SERVICES_INTRO.body}
          </p>
        </Reveal>
      </div>

      {/* Interactive body */}
      <div className="mt-14 lg:mt-20">
        <div className="relative">
          {/* Left indicator — desktop only, extends off the shell */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] lg:block">
            <div className="sticky top-24 h-[560px]">
              <Dial index={active} total={total} reduce={reduce ?? false} />
            </div>
          </div>

          <div className="shell">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[46%_1fr] lg:gap-0">
              {/* Left spacer for desktop so content flows beside the circle */}
              <div className="hidden lg:block" aria-hidden="true" />

              {/* Right column — service list */}
              <ul
                ref={listRef}
                className="divide-y divide-border-subtle border-t border-border-subtle lg:pl-4"
              >
                {SERVICE_SHOWCASE.map((s, i) => {
                  const open = active === i;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => activate(i)}
                        onMouseEnter={() => activate(i)}
                        onFocus={() => activate(i)}
                        aria-expanded={open}
                        className="group flex w-full items-baseline gap-4 py-5 text-left"
                      >
                        <span
                          className={`hidden font-body text-[13px] tabular-nums transition-colors sm:block ${
                            open ? "text-lime-600" : "text-ink-300"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`flex-1 font-display font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 ${
                            open
                              ? "text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] text-ink-900"
                              : "text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] text-ink-300 group-hover:text-ink-500"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 items-center gap-8 pb-10 md:grid-cols-[minmax(0,1fr)_360px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
                              <div className="sm:pl-9">
                                <p className="t-body-lg max-w-[440px] text-text-secondary">
                                  {s.body}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2.5">
                                  {s.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full bg-lime-400 px-4 py-1.5 text-[13px] font-medium text-brand-950"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <ServiceGlyph seed={i} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Left indicator — a large partial circle sitting off-canvas, with each step
 * number positioned around its arc. The active number is highlighted (lime
 * dot + darker text) and always sits at 3 o'clock; the whole ring animates
 * a rotation on state change so it feels like the number wheel is spinning
 * to the active position, matching the Figma prototype.
 */
function Dial({
  index,
  total,
  reduce,
}: {
  index: number;
  total: number;
  reduce: boolean;
}) {
  // The circle lives at CSS-position (-30%, 0) inside a 760px-tall box, so
  // roughly 30% of it is off-screen left. The active step lives at 3 o'clock.
  const r = 380;
  const cx = -60;
  const cy = 300;

  // rotate the whole ring so the active index lands at 3 o'clock
  const stepAngle = 360 / total;
  const ringRotation = reduce ? 0 : -index * stepAngle;

  return (
    <div className="relative h-full w-full overflow-visible">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: ringRotation }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* the ring */}
        <svg
          viewBox="-500 -50 700 700"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth={1}
          />
        </svg>

        {/* numbers around the arc */}
        {Array.from({ length: total }).map((_, i) => {
          // 0 is at 3 o'clock (0°), positive angles go clockwise
          const angle = i * stepAngle;
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          // rotate the number so it hugs the tangent (radial reads clean)
          const numRotation = angle + 90;
          return (
            <span
              key={i}
              className="absolute origin-center"
              style={{
                left: `calc(${(x / 700) * 100}% + 40px)`,
                top: `calc(${(y / 700) * 100}% + 20px)`,
                transform: `translate(-50%, -50%) rotate(${-ringRotation}deg)`,
              }}
              aria-hidden="true"
            >
              <NumberChip active={i === index} label={`0${i + 1}`} rotation={numRotation} />
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

function NumberChip({
  active,
  label,
  rotation,
}: {
  active: boolean;
  label: string;
  rotation: number;
}) {
  return (
    <span
      className="flex items-center gap-2 font-display tabular-nums"
      style={{
        transform: active ? undefined : `rotate(${rotation}deg)`,
      }}
    >
      {active && (
        <motion.span
          layoutId="services-dot"
          className="size-[9px] rounded-full bg-lime-400"
          transition={{ duration: 0.5, ease: EASE }}
        />
      )}
      <span
        className={`font-medium leading-none ${
          active
            ? "text-[26px] text-ink-900"
            : "text-[15px] text-ink-300 italic"
        }`}
      >
        {label}
      </span>
    </span>
  );
}

/**
 * The Figma prototype pairs each service with a cluster of separate,
 * FLOATING isometric cubes — not a compact hex — with each cube showing its
 * own top/left/right faces in different colours (rainbow, gold, teal, pink,
 * dark). This renders that: 6 disparate cubes spread across the viewbox,
 * each cube gets a stagger-in on activate, and they wobble on a gentle
 * infinite loop.
 */
function ServiceGlyph({ seed }: { seed: number }) {
  // Per-service palettes — each palette is a set of 6 (top,left,right) x 6 cubes
  // The Figma cubes look shiny/gradient — approximate with distinct fills per face.
  const palettes: Array<
    Array<{ top: string; left: string; right: string }>
  > = [
    // Web — the design's reference set (magenta / orange / teal / dark / lime)
    [
      { top: "#e879f9", left: "#c026d3", right: "#7e22ce" },
      { top: "#f97316", left: "#c2410c", right: "#7c2d12" },
      { top: "#22d3ee", left: "#0891b2", right: "#155e75" },
      { top: "#f472b6", left: "#db2777", right: "#831843" },
      { top: "#facc15", left: "#ca8a04", right: "#713f12" },
      { top: "#1f2937", left: "#111827", right: "#030712" },
    ],
    // Mobile — greens + cyan
    [
      { top: "#a3e635", left: "#65a30d", right: "#365314" },
      { top: "#22d3ee", left: "#0891b2", right: "#155e75" },
      { top: "#84cc16", left: "#4d7c0f", right: "#1a2e05" },
      { top: "#e879f9", left: "#a21caf", right: "#4a044e" },
      { top: "#facc15", left: "#a16207", right: "#422006" },
      { top: "#0f172a", left: "#020617", right: "#000" },
    ],
    // Design — pink + purple
    [
      { top: "#f0abfc", left: "#c026d3", right: "#701a75" },
      { top: "#f472b6", left: "#db2777", right: "#500724" },
      { top: "#c4b5fd", left: "#7c3aed", right: "#3b0764" },
      { top: "#fda4af", left: "#e11d48", right: "#4c0519" },
      { top: "#facc15", left: "#a16207", right: "#422006" },
      { top: "#1e1b4b", left: "#0f0a2e", right: "#000" },
    ],
    // AI — cyan / purple electric
    [
      { top: "#67e8f9", left: "#0e7490", right: "#164e63" },
      { top: "#a78bfa", left: "#5b21b6", right: "#2e1065" },
      { top: "#f0abfc", left: "#a21caf", right: "#581c87" },
      { top: "#facc15", left: "#a16207", right: "#422006" },
      { top: "#4ade80", left: "#166534", right: "#052e16" },
      { top: "#020617", left: "#000", right: "#000" },
    ],
    // QA — cool blues + red
    [
      { top: "#93c5fd", left: "#1d4ed8", right: "#1e3a8a" },
      { top: "#fda4af", left: "#e11d48", right: "#4c0519" },
      { top: "#a3e635", left: "#4d7c0f", right: "#1a2e05" },
      { top: "#67e8f9", left: "#0891b2", right: "#164e63" },
      { top: "#facc15", left: "#a16207", right: "#422006" },
      { top: "#111", left: "#020617", right: "#000" },
    ],
    // Pitch — gold + purple
    [
      { top: "#fde047", left: "#a16207", right: "#422006" },
      { top: "#c4b5fd", left: "#7c3aed", right: "#3b0764" },
      { top: "#f0abfc", left: "#a21caf", right: "#581c87" },
      { top: "#fbbf24", left: "#b45309", right: "#451a03" },
      { top: "#4ade80", left: "#166534", right: "#052e16" },
      { top: "#0f172a", left: "#020617", right: "#000" },
    ],
    // Marketing — orange + green
    [
      { top: "#fdba74", left: "#c2410c", right: "#7c2d12" },
      { top: "#4ade80", left: "#166534", right: "#052e16" },
      { top: "#c4b5fd", left: "#5b21b6", right: "#2e1065" },
      { top: "#fda4af", left: "#e11d48", right: "#4c0519" },
      { top: "#67e8f9", left: "#0891b2", right: "#164e63" },
      { top: "#111", left: "#020617", right: "#000" },
    ],
    // Crypto — bright rainbow
    [
      { top: "#67e8f9", left: "#0891b2", right: "#164e63" },
      { top: "#f472b6", left: "#be185d", right: "#500724" },
      { top: "#fde047", left: "#a16207", right: "#422006" },
      { top: "#a3e635", left: "#4d7c0f", right: "#1a2e05" },
      { top: "#c4b5fd", left: "#7c3aed", right: "#3b0764" },
      { top: "#0f172a", left: "#020617", right: "#000" },
    ],
  ];
  const p = palettes[seed % palettes.length];

  // Anchor points for six floating cubes spread across a 300x300 viewbox.
  // Each entry: (cx, cy, size). Kept intentionally uneven so the cluster
  // reads as a physical arrangement rather than a grid — echoing the
  // Figma prototype's disparate iso-cube scatter.
  const cubes: Array<{ cx: number; cy: number; s: number; float: number }> = [
    { cx: 70, cy: 78, s: 34, float: 0 },
    { cx: 175, cy: 55, s: 42, float: 0.3 },
    { cx: 245, cy: 130, s: 30, float: 0.6 },
    { cx: 60, cy: 200, s: 38, float: 0.15 },
    { cx: 165, cy: 200, s: 36, float: 0.75 },
    { cx: 240, cy: 240, s: 28, float: 0.45 },
  ];

  return (
    <motion.div
      key={seed}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
      className="mx-auto hidden aspect-square w-full max-w-[440px] shrink-0 md:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 300"
        className="size-full drop-shadow-[0_18px_36px_rgba(1,42,28,0.28)]"
      >
        <defs>
          {/* white sheen dropped on each cube's top face so the render reads
              lit-from-above rather than flat isometric. */}
          <linearGradient id="cube-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {cubes.map((c, i) => (
          <FloatingCube
            key={`${seed}-${i}`}
            cx={c.cx}
            cy={c.cy}
            size={c.s}
            colors={p[i]}
            delay={i * 0.08}
            floatOffset={c.float}
          />
        ))}
      </svg>
    </motion.div>
  );
}

/**
 * A single isometric cube with a top / left / right face, wrapped in a
 * motion group that fades + drops in on mount and bobs subtly forever.
 */
function FloatingCube({
  cx,
  cy,
  size,
  colors,
  delay,
  floatOffset,
}: {
  cx: number;
  cy: number;
  size: number;
  colors: { top: string; left: string; right: string };
  delay: number;
  floatOffset: number;
}) {
  const s = size;
  // isometric corners around (cx, cy)
  //     A(0,-s)
  //  L(-s√3/2, -s/2)    R(s√3/2, -s/2)
  //     B(0, 0)
  //  L'(-s√3/2, s/2)    R'(s√3/2, s/2)
  //     C(0, s)
  const w = s * 0.866; // sqrt(3)/2
  const Ax = 0,
    Ay = -s;
  const Lx = -w,
    Ly = -s / 2;
  const Rx = w,
    Ry = -s / 2;
  const Bx = 0,
    By = 0;
  const Lpx = -w,
    Lpy = s / 2;
  const Rpx = w,
    Rpy = s / 2;
  const Cx = 0,
    Cy = s;

  const pts = (arr: [number, number][]) =>
    arr.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <motion.g
      initial={{ opacity: 0, y: -8, scale: 0.85 }}
      animate={{
        opacity: 1,
        // gentle infinite bob offset per cube for a "hanging in space" feel
        y: [0, -3, 0, 3, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay, ease: EASE },
        scale: { duration: 0.5, delay, ease: EASE },
        y: {
          duration: 4.5,
          delay: delay + floatOffset,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transform={`translate(${cx} ${cy})`}
    >
      {/* top face */}
      <polygon points={pts([[Ax, Ay], [Rx, Ry], [Bx, By], [Lx, Ly]])} fill={colors.top} />
      {/* left face */}
      <polygon points={pts([[Lx, Ly], [Bx, By], [Cx, Cy], [Lpx, Lpy]])} fill={colors.left} />
      {/* right face */}
      <polygon points={pts([[Rx, Ry], [Rpx, Rpy], [Cx, Cy], [Bx, By]])} fill={colors.right} />
      {/* subtle top-face highlight */}
      <polygon
        points={pts([[Ax, Ay], [Rx, Ry], [Bx, By], [Lx, Ly]])}
        fill="url(#cube-shine)"
        opacity="0.35"
      />
    </motion.g>
  );
}
