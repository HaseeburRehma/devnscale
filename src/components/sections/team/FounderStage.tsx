"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Figma "Option 06 · Giant name": the founder's name sits behind the portrait.
 * As the stage scrolls into view each letter rises out of the line it rests on,
 * one after another, tied to scroll so it plays back when scrolling up.
 *
 * Sizes use container units (cqw) of the stage, so the 1440px Figma frame
 * scales down without breakpoints: 340px type = 23.61cqw, 110px top = 7.64cqw.
 */
export default function FounderStage({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.2"] });
  const letters = name.toUpperCase().split("");

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[1440px] overflow-hidden [container-type:inline-size] lg:aspect-[1440/820]"
    >
      <h2 className="overflow-hidden pt-[7.64cqw] text-center font-display text-[23.61cqw] font-bold leading-[1.276] tracking-[-0.0294em] text-brand-950">
        <span className="sr-only">{name}, founder of Dev N Scale</span>
        <span aria-hidden="true" className="inline-flex">
          {letters.map((l, i) => (
            <Letter key={i} char={l} i={i} count={letters.length} progress={scrollYProgress} still={!!reduce} />
          ))}
        </span>
      </h2>
      {children}
    </div>
  );
}

function Letter({
  char,
  i,
  count,
  progress,
  still,
}: {
  char: string;
  i: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Each letter gets a 55% slice of the scroll range, starting 9% after the last.
  const start = (i / count) * 0.45;
  const y = useTransform(progress, [start, start + 0.55], ["105%", "0%"]);

  return (
    <motion.span data-founder-letter="" className="inline-block will-change-transform" style={still ? undefined : { y }}>
      {char}
    </motion.span>
  );
}
