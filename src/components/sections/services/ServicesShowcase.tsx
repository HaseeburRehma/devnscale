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
                            <div className="grid grid-cols-1 gap-6 pb-8 sm:pl-9 md:grid-cols-[1fr_auto] md:gap-10">
                              <div>
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
 * A colourful faceted 3D glyph that echoes the Rubik-cube-esque render used
 * in the Figma prototype. Per-service seed picks its palette so each service
 * gets a distinct facet colouring. Rotates in on activate.
 */
function ServiceGlyph({ seed }: { seed: number }) {
  const palettes = [
    ["#c4d434", "#1e8c72", "#012a1c", "#c084fc", "#f472b6", "#22d3ee"],
    ["#f472b6", "#22d3ee", "#facc15", "#a855f7", "#1e8c72", "#012a1c"],
    ["#f97316", "#22c55e", "#3b82f6", "#e11d48", "#eab308", "#1b1b1b"],
    ["#22d3ee", "#a855f7", "#c4d434", "#f472b6", "#0f5749", "#1b1b1b"],
    ["#eab308", "#1e8c72", "#0ea5e9", "#a3e635", "#7c3aed", "#111"],
    ["#f472b6", "#c4d434", "#0f5749", "#1b1b1b", "#a855f7", "#22c55e"],
    ["#22c55e", "#f59e0b", "#c084fc", "#0ea5e9", "#1e8c72", "#1b1b1b"],
    ["#0ea5e9", "#c084fc", "#c4d434", "#e11d48", "#1e8c72", "#1b1b1b"],
  ];
  const p = palettes[seed % palettes.length];

  return (
    <motion.div
      key={seed}
      initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
      className="mx-auto hidden aspect-square w-[200px] shrink-0 md:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="size-full drop-shadow-[0_18px_36px_rgba(1,42,28,0.28)]"
      >
        {/* 3D iso cube composition — a big cube + smaller cubes stacked
            around it for that "faceted geometric" look from Figma. */}
        <g transform="translate(100 100)">
          {/* main cube — top / left / right faces */}
          <polygon points="0,-60 52,-30 0,0 -52,-30" fill={p[0]} />
          <polygon points="-52,-30 0,0 0,60 -52,30" fill={p[1]} />
          <polygon points="52,-30 0,0 0,60 52,30" fill={p[2]} />
          {/* top-right satellite cube */}
          <polygon points="52,-30 78,-45 78,-15 52,0" fill={p[3]} opacity="0.95" />
          <polygon points="52,0 78,-15 78,15 52,30" fill={p[4]} opacity="0.9" />
          <polygon points="52,-30 78,-45 104,-30 78,-15" fill={p[5]} opacity="0.85" />
          {/* bottom-left satellite cube */}
          <polygon points="-52,-30 -78,-15 -78,15 -52,30" fill={p[3]} opacity="0.9" />
          <polygon points="-78,-15 -52,-30 -78,-45 -104,-30" fill={p[4]} opacity="0.85" />
          <polygon points="-52,30 -78,15 -78,45 -52,60" fill={p[5]} opacity="0.9" />
          {/* small top cube */}
          <polygon points="-30,-70 0,-85 30,-70 0,-55" fill={p[0]} opacity="0.85" />
          <polygon points="-30,-70 0,-55 0,-30 -30,-40" fill={p[1]} opacity="0.85" />
          <polygon points="30,-70 0,-55 0,-30 30,-40" fill={p[2]} opacity="0.85" />
        </g>
      </svg>
    </motion.div>
  );
}
