"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_JOURNEY } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "OUR JOURNEY" — a hand-drawn serpentine path snakes between four
 * milestones, drawing itself in as the section scrolls into view. Card 01
 * sits at top-right with a lime loop leading into it (like the design's
 * lasso), then the line curves left → right → left through the four years.
 * Each milestone card fades + slides in from its side; the current point
 * along the path glows lime for the first entry and cools to muted green
 * further down.
 *
 * Below `md` the ring loses its horizontal room, so the layout collapses
 * to a simple vertical stepper that keeps the same active-first colour
 * treatment without the SVG path.
 */

// Two overlapping SVG paths give the drawing that hand-scribbled feel — the
// primary path draws first, then a subtle secondary shadow follows to fill
// out the curves.
const PATH =
  "M 720 40 " +
  // curl / lasso above card 01
  "C 720 90, 900 90, 940 140 " +
  "C 980 190, 900 220, 820 220 " +
  // long S-curve down to milestone 02 (left side, y≈540)
  "C 700 220, 700 380, 420 500 " +
  "C 300 550, 300 640, 500 680 " +
  // travel across to milestone 03 (right side, y≈820)
  "C 720 720, 780 780, 940 820 " +
  // finally sweep down-left to milestone 04 (left, y≈1080)
  "C 1080 860, 720 1000, 420 1040 " +
  "C 300 1050, 260 1080, 240 1120";

export default function AboutJourney() {
  const { eyebrow, title, intro, milestones } = ABOUT_JOURNEY;
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Draw the path in sync with the section's own scroll progress.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 30%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20 lg:py-[104px]">
      <PatternBackdrop opacity={0.05} />

      <div className="shell relative">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="text-[12px] leading-4 tracking-[0.12em] text-lime-400">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-body-lg mt-5 text-ink-300">{intro}</p>
          </Reveal>
        </div>

        {/* Serpentine path (desktop) + milestone cards */}
        <div ref={trackRef} className="relative mx-auto mt-16 hidden md:block">
          <div className="relative min-h-[1180px]">
            <svg
              viewBox="0 0 1280 1180"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              {/* faint background line — the whole path drawn once */}
              <path
                d={PATH}
                className="text-white/8"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {/* animated lime draw */}
              <motion.path
                d={PATH}
                className="text-lime-400"
                strokeWidth="1.75"
                strokeLinecap="round"
                style={reduce ? undefined : { pathLength }}
                initial={{ pathLength: reduce ? 1 : 0 }}
              />
              {/* milestone dots — position them on the path */}
              {[
                { x: 940, y: 220, first: true },
                { x: 500, y: 680, first: false },
                { x: 940, y: 820, first: false },
                { x: 240, y: 1120, first: false },
              ].map((d, i) => (
                <MilestoneDot
                  key={i}
                  x={d.x}
                  y={d.y}
                  first={d.first}
                  progress={pathLength}
                  delay={i * 0.12}
                />
              ))}
            </svg>

            {/* Cards positioned absolutely at the milestone anchors */}
            {milestones.map((m, i) => {
              const positions = [
                // 01 — top right of the loop
                { left: "58%", top: "3%", side: "right" as const },
                // 02 — lower left
                { left: "18%", top: "36%", side: "left" as const },
                // 03 — mid right
                { left: "58%", top: "60%", side: "right" as const },
                // 04 — bottom left
                { left: "8%", top: "84%", side: "left" as const },
              ];
              const pos = positions[i] ?? positions[0];
              const isFirst = i === 0;
              return (
                <motion.div
                  key={m.year}
                  className="absolute w-[300px] max-w-[42%]"
                  style={{ left: pos.left, top: pos.top }}
                  initial={{ opacity: 0, x: pos.side === "right" ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.15,
                    ease: EASE,
                  }}
                >
                  <span
                    className={`inline-flex items-baseline gap-2 ${
                      pos.side === "left" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="font-body text-[13px] italic text-ink-400">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-[clamp(2rem,1.6rem+1.8vw,2.75rem)] font-bold leading-none tracking-[-0.03em] ${
                        isFirst ? "text-lime-400" : "text-ink-400"
                      }`}
                    >
                      {m.year}
                    </span>
                  </span>
                  <h3 className="t-h5 mt-3 text-white">{m.title}</h3>
                  <p className="t-body mt-2 max-w-[280px] text-ink-300">
                    {m.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Vertical stepper — mobile / small tablet */}
        <ol className="relative mx-auto mt-14 max-w-[620px] space-y-10 md:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[6px] top-3 w-px bg-white/10"
          />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-3 left-[6px] top-3 w-px origin-top bg-lime-400"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {milestones.map((m, i) => (
            <li key={m.year} className="relative pl-8">
              <motion.span
                className={`absolute left-0 top-2 size-3 rounded-full ${
                  i === 0 ? "bg-lime-400" : "bg-brand-200"
                }`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.15,
                  ease: EASE,
                }}
              />
              <span className="inline-flex items-baseline gap-3">
                <span className="font-body text-[13px] italic text-ink-400">
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-[clamp(2rem,1.6rem+1.8vw,2.5rem)] font-bold leading-none tracking-[-0.03em] ${
                    i === 0 ? "text-lime-400" : "text-ink-400"
                  }`}
                >
                  {m.year}
                </span>
              </span>
              <h3 className="t-h5 mt-3 text-white">{m.title}</h3>
              <p className="t-body mt-2 text-ink-300">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * A dot pinned on the SVG path. Uses framer's `motion.circle` so we can
 * fade+scale it in behind the drawing pass, and adds a lime pulse ring for
 * the first (active) milestone.
 */
function MilestoneDot({
  x,
  y,
  first,
  progress,
  delay,
}: {
  x: number;
  y: number;
  first: boolean;
  progress: ReturnType<typeof useTransform<number, number>>;
  delay: number;
}) {
  // opacity is driven by the section scroll progress so dots "pop in" as the
  // path reaches them, feeling like the line drops them off in sequence.
  const opacity = useTransform(progress, [delay, delay + 0.1], [0, 1]);
  const scale = useTransform(progress, [delay, delay + 0.15], [0.4, 1]);
  return (
    <g>
      {first && (
        <motion.circle
          cx={x}
          cy={y}
          r={12}
          className="fill-lime-400/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.circle
        cx={x}
        cy={y}
        r={6}
        className={first ? "fill-lime-400" : "fill-brand-200"}
        style={{ opacity, scale, transformOrigin: `${x}px ${y}px` }}
      />
    </g>
  );
}
