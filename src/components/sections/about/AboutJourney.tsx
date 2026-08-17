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
const VB_H = 1240;

// Hand-tuned cubic Bézier path. Layout matches the Figma: dots stay near
// the CENTRAL SPINE of the section with only small horizontal drift, and
// the ink line meanders down between them (starting with a small lasso
// loop above 01). Cards alternate right/left of the spine.
const PATH_D = [
  // enter from centre-top (below the "OUR JOURNEY" header)
  "M 640 0",
  // gentle drift right to set up the lasso
  "C 650 60 690 100 690 150",
  // lasso: loops up-right, wraps back, exits down toward 01
  "C 690 220 620 240 600 200",
  "C 590 170 640 150 675 180",
  "C 700 210 700 260 660 300",
  // === 01 dot (660, 300) ===
  // curve down-left through center to 02 (slightly left of centre)
  "C 620 380 560 420 560 480",
  "C 560 540 620 560 580 580",
  // === 02 dot (580, 580) ===
  // sweep down-right through 03
  "C 550 640 640 720 680 800",
  "C 700 840 700 850 690 860",
  // === 03 dot (690, 860) ===
  // sweep down-left to 04
  "C 660 940 580 1020 560 1100",
  "C 555 1120 555 1130 560 1140",
  // === 04 dot (560, 1140) ===
  // trail off bottom-left
  "C 540 1170 500 1200 460 1220",
].join(" ");

const MILESTONES_XY = [
  { x: 660, y: 300 },
  { x: 580, y: 580 },
  { x: 690, y: 860 },
  { x: 560, y: 1140 },
] as const;

// Card anchors. Cards sit next to their dots on the correct side and stay
// off-centre so the path can breathe.
const CARD_POS = [
  // 01 — dot slightly right of centre, card to its RIGHT
  { left: "56%", top: "18%", side: "right" as const },
  // 02 — dot slightly left of centre, card fully to LEFT (right-aligned)
  { left: "8%", top: "36%", side: "left" as const },
  // 03 — dot slightly right of centre, card to its RIGHT
  { left: "58%", top: "60%", side: "right" as const },
  // 04 — dot near centre, card to LEFT (right-aligned)
  { left: "6%", top: "84%", side: "left" as const },
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
    <section className="relative overflow-hidden bg-brand-900 py-20 sm:py-24 lg:py-28">
      <PatternBackdrop opacity={0.03} />

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
          style={{ height: 1280 }}
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
