"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_JOURNEY } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "OUR JOURNEY" — a hand-drawn lime path lassoes down between four year
 * milestones, drawing itself in with scroll progress. The four milestones
 * live at fixed x/y anchors and the path passes through each dot.
 *
 * Path geometry — coordinates match the Figma prototype layout:
 *   • start:  x=720  y=  0     (below the header)
 *   • loop:   circles around milestone 01 (top-right)
 *   • 01 dot: x=940  y=200
 *   • S-curves down/left to 02 (left, y=520)
 *   • 02 dot: x=460  y=520
 *   • curves down/right to 03 (right, y=800)
 *   • 03 dot: x=940  y=800
 *   • curves down/left to 04 (left, y=1100)
 *   • 04 dot: x=340  y=1100
 *   • trails off at bottom-left
 */
const VB_W = 1280;
const VB_H = 1200;

// Cubic Bézier path — hand-tuned so the line reads as a genuine serpentine
// walking between the four milestones, complete with a loop-de-loop above 01.
const PATH_D = [
  "M 640 20",
  // small loop above 01
  "C 900 80 990 100 970 180",
  "C 950 250 830 260 800 220",
  "C 780 195 810 170 860 190",
  // travel down/right to 01 dot
  "C 900 210 930 200 940 200",
  // 01 dot lives here — continue toward 02 (left side)
  "C 950 210 780 400 520 440",
  "C 420 460 380 520 460 520",
  // 02 dot lives here — continue toward 03 (right side)
  "C 560 520 780 620 940 800",
  // 03 dot — continue toward 04 (left)
  "C 1000 880 620 1000 340 1100",
  "L 260 1150",
].join(" ");

const MILESTONES_XY = [
  { x: 940, y: 200 },
  { x: 460, y: 520 },
  { x: 940, y: 800 },
  { x: 340, y: 1100 },
] as const;

// text/card anchors — position each card next to its dot on the correct side
const CARD_POS = [
  { left: "calc(50% + 60px)", top: "12%", side: "right" as const },
  { left: "12%", top: "38%", side: "left" as const },
  { left: "calc(50% + 60px)", top: "62%", side: "right" as const },
  { left: "6%", top: "88%", side: "left" as const },
];

export default function AboutJourney() {
  const { eyebrow, title, intro, milestones } = ABOUT_JOURNEY;
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 25%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20 lg:py-[104px]">
      <PatternBackdrop opacity={0.05} />

      {/* soft top glow so the path's origin looks like it's pouring out of
          the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,212,52,0.14), rgba(196,212,52,0) 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="shell relative">
        <div className="mx-auto max-w-[860px] text-center">
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

        {/* Desktop — SVG path + absolute cards */}
        <div
          ref={trackRef}
          className="relative mx-auto mt-16 hidden md:block"
          style={{ height: 1250 }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            {/* faint background path so viewers see the full shape before it draws */}
            <path
              d={PATH_D}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* animated lime draw */}
            <motion.path
              d={PATH_D}
              stroke="#c4d434"
              strokeWidth="1.75"
              strokeLinecap="round"
              style={reduce ? undefined : { pathLength }}
              initial={{ pathLength: reduce ? 1 : 0 }}
            />
            {/* milestone dots — placed exactly on the path anchors */}
            {MILESTONES_XY.map((p, i) => (
              <MilestoneDot
                key={i}
                x={p.x}
                y={p.y}
                first={i === 0}
                progress={pathLength}
                threshold={0.18 + i * 0.2}
              />
            ))}
          </svg>

          {/* Cards — absolute inside the track, sized so they never crowd
              the arc that the path uses */}
          {milestones.map((m, i) => {
            const pos = CARD_POS[i] ?? CARD_POS[0];
            const isFirst = i === 0;
            return (
              <motion.div
                key={m.year}
                className="absolute w-[300px] max-w-[38%]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: pos.side === "left" ? "translateX(-40%)" : "none",
                  textAlign: pos.side === "left" ? "right" : "left",
                }}
                initial={{ opacity: 0, x: pos.side === "right" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.15,
                  ease: EASE,
                }}
              >
                <span
                  className={`inline-flex items-baseline gap-3 ${
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
                <p className="t-body mt-2 text-ink-300">{m.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile — clean vertical stepper */}
        <ol className="relative mx-auto mt-14 max-w-[560px] space-y-10 md:hidden">
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
              <span
                className={`absolute left-0 top-2 size-3 rounded-full ${
                  i === 0 ? "bg-lime-400" : "bg-brand-200"
                }`}
              />
              <span className="inline-flex items-baseline gap-3">
                <span className="font-body text-[13px] italic text-ink-400">
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-[2rem] font-bold leading-none tracking-[-0.03em] ${
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
 * Dot pinned on the SVG path — fades and scales in when the drawn portion
 * of the line reaches its progress threshold, so dots appear to be dropped
 * off by the animated stroke as it passes.
 */
function MilestoneDot({
  x,
  y,
  first,
  progress,
  threshold,
}: {
  x: number;
  y: number;
  first: boolean;
  progress: ReturnType<typeof useTransform<number, number>>;
  threshold: number;
}) {
  const opacity = useTransform(progress, [threshold, threshold + 0.08], [0, 1]);
  const scale = useTransform(progress, [threshold, threshold + 0.12], [0.3, 1]);
  return (
    <g>
      {first && (
        <motion.circle
          cx={x}
          cy={y}
          r={14}
          fill="#c4d434"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.4 }}
        />
      )}
      <motion.circle
        cx={x}
        cy={y}
        r={7}
        fill={first ? "#c4d434" : "#9cd6bc"}
        style={{ opacity, scale, transformOrigin: `${x}px ${y}px` }}
      />
    </g>
  );
}
