"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import { PROCESS_STEPS } from "@/lib/content";

/**
 * Scroll-driven work process, matching the live site's mechanics.
 *
 * The section is a 3-viewport-tall track with a pinned panel. The lime arc is
 * a 90° segment (dash = quarter, gap = three quarters) that travels clockwise
 * around the ring as you scroll: at step 1 it spans Consultation → Strategy,
 * at step 2 Strategy → Implementation, and so on. Exactly one node is lit at
 * a time, and the centre card cross-fades on each quarter boundary.
 *
 * Figma geometry (frame 791x584): 500px circle at (163,42) → centre (413,292),
 * r=250. Node dots are 12px at the four cardinal points.
 *
 * Below `md` the ring needs more width than there is, so the same scroll
 * progress drives a vertical stepper.
 */

const R = 250;
const CX = 413;
const CY = 292;
const VB_W = 791;
const VB_H = 584;
const CIRCUMFERENCE = 2 * Math.PI * R;
const QUARTER = CIRCUMFERENCE / 4;
const STEP_COUNT = PROCESS_STEPS.length;

/** Angle each node sits at, measured clockwise from 12 o'clock. */
const ANGLES = [0, 90, 180, 270];

function polar(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

export default function Process() {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(v * STEP_COUNT)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const goToStep = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + distance * ((i + 0.4) / STEP_COUNT);
    window.scrollTo({ top: Math.max(el.offsetTop, target), behavior: "smooth" });
  };

  const step = PROCESS_STEPS[active];

  return (
    <section ref={trackRef} className="relative h-[190vh] bg-brand-900 md:h-[300vh]">
      {/* On phones the stepper is only ~370px tall, so a full-height pinned
          panel would centre it in a sea of empty green. Shorter panel there,
          with top padding to clear the fixed nav. */}
      <div className="sticky top-0 flex h-[68svh] min-h-[480px] items-center overflow-hidden pt-[74px] md:h-screen md:min-h-[600px] md:pt-0">
        <PatternBackdrop opacity={0.045} />

        <div className="shell relative w-full">
          <h2 className="t-subsection text-center text-white">
            Our Work Process
          </h2>

          {/* ---------- Ring (md and up) ---------- */}
          <div className="relative mx-auto mt-8 hidden w-full max-w-[791px] md:block">
            <div
              className="relative w-full"
              style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            >
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth={1}
                />
                {/* 90° lime segment: it spans the active node to the next one,
                    gliding a quadrant each time scroll advances the step, so
                    the arc and the lit node stay in lockstep. */}
                <motion.circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke="#c4d434"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                  strokeDasharray={`${QUARTER} ${CIRCUMFERENCE - QUARTER}`}
                  initial={false}
                  animate={{ strokeDashoffset: -active * QUARTER }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {ANGLES.map((angle, i) => {
                  const { x, y } = polar(angle);
                  const isActive = i === active;
                  return (
                    <motion.circle
                      key={angle}
                      cx={x}
                      cy={y}
                      r={6}
                      animate={{
                        fill: isActive ? "#c4d434" : "#a3a3a3",
                        scale: isActive ? 1.25 : 1,
                      }}
                      transition={{ duration: 0.35 }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  );
                })}
              </svg>

              {PROCESS_STEPS.map((s, i) => {
                const { x, y } = polar(ANGLES[i]);
                const isActive = i === active;
                const translate =
                  i === 0
                    ? "translate(-50%, -160%)"
                    : i === 2
                      ? "translate(-50%, 60%)"
                      : i === 1
                        ? "translate(10%, -50%)"
                        : "translate(-110%, -50%)";
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={isActive}
                    className={`absolute whitespace-nowrap font-display text-[clamp(1rem,0.62rem+1.67vw,1.75rem)] font-medium transition-colors duration-400 hover:text-lime-300 ${
                      isActive ? "text-lime-400" : "text-ink-400"
                    }`}
                    style={{
                      left: `${(x / VB_W) * 100}%`,
                      top: `${(y / VB_H) * 100}%`,
                      transform: translate,
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}

              <div className="absolute left-1/2 top-1/2 w-[min(60%,243px)] -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative mx-auto aspect-square w-[min(45%,100px)]">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </div>
                {/* initial={false} so the first paint isn't animated — it also
                    keeps the SSR markup identical to the hydrated markup. */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="mt-6 font-display text-[clamp(0.875rem,0.75rem+0.56vw,1rem)] font-medium text-white">
                      {step.heading}
                    </h3>
                    <p className="mt-2 text-[clamp(0.75rem,0.69rem+0.28vw,0.875rem)] leading-5 text-ink-300">
                      {step.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ---------- Vertical stepper (below md) ---------- */}
          <ol className="relative mt-10 flex flex-col gap-7 md:hidden">
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[5px] top-3 w-px bg-white/15"
            />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-lime-400"
              style={{ scaleY: progress }}
            />

            {PROCESS_STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.label} className="relative pl-8">
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={isActive}
                    className="block w-full text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-2 size-[11px] rounded-full transition-colors duration-400 ${
                        isActive ? "bg-lime-400" : "bg-ink-400"
                      }`}
                    />
                    <span
                      className={`font-display text-[20px] font-medium transition-colors duration-400 ${
                        isActive ? "text-lime-400" : "text-ink-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-4 pt-4">
                          <div className="relative size-[72px] shrink-0">
                            <Image
                              src={s.image}
                              alt=""
                              fill
                              sizes="72px"
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-display text-[16px] font-medium text-white">
                              {s.heading}
                            </h3>
                            <p className="mt-1.5 text-[14px] leading-5 text-ink-300">
                              {s.body}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
