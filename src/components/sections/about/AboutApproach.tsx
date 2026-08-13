"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_APPROACH } from "@/lib/content";

/**
 * "OUR APPROACH" — scroll-driven word color fill.
 *
 * The full sentence starts dull (low-opacity ink) and each word "lights up"
 * to its final color as the section scrolls through the viewport. Because
 * the animation is bound directly to scroll progress, scrolling back up
 * naturally rewinds it — no IntersectionObserver / restart logic needed.
 *
 * Colour bands:
 *   • lead  — "We keep teams"          → dark ink
 *   • accent — "small, senior…"        → lime/cream from Figma
 *   • tail  — "It is how good…"        → dark ink
 *
 * Reduced-motion users see the finished sentence at full color.
 */

const DULL = "rgba(17, 24, 20, 0.15)";
const INK = "rgb(17, 24, 20)"; // matches text-ink-900
const ACCENT = "rgb(200, 208, 44)"; // #c8d02c

type Band = "lead" | "accent" | "tail";

function Word({
  progress,
  range,
  color,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  color: string;
  children: React.ReactNode;
}) {
  // Interpolate the word's color between DULL and its final color over its
  // own slice of scroll progress. `clamp` keeps it stable outside the range.
  const c = useTransform(progress, range, [DULL, color], { clamp: true });
  return (
    <motion.span style={{ color: c }} className="transition-colors">
      {children}
    </motion.span>
  );
}

export default function AboutApproach() {
  const { eyebrow, lead, accent, tail } = ABOUT_APPROACH;
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start filling as soon as the section top hits 85% of the viewport;
    // finish when the section top reaches 15%. Feels natural at normal
    // scroll speeds and rewinds smoothly on scroll-back.
    offset: ["start 0.85", "start 0.15"],
  });

  // Split each band into words with a color tag; keep a single flat list so
  // each word gets a contiguous slice of scroll progress.
  const words = useMemo(() => {
    const bands: { text: string; band: Band; color: string }[] = [
      { text: lead, band: "lead", color: INK },
      { text: accent, band: "accent", color: ACCENT },
      { text: tail, band: "tail", color: INK },
    ];
    return bands.flatMap((b, bandIdx) =>
      b.text.split(" ").map((w, i) => ({
        word: w,
        color: b.color,
        // Unique key across bands even when the same word repeats.
        key: `${bandIdx}-${i}-${w}`,
      })),
    );
  }, [lead, accent, tail]);

  const total = words.length;
  // Each word lights over a small overlapping window so the fill reads as
  // a flowing wave rather than a strict staircase.
  const WINDOW = 1.6;

  return (
    <section
      ref={sectionRef}
      className="bg-white section-y"
    >
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{eyebrow}</p>
        </Reveal>

        <p
          className="t-subsection mt-6 max-w-[1080px] leading-[1.15]"
          aria-label={`${lead} ${accent} ${tail}`}
        >
          <span aria-hidden>
            {words.map((w, i) => {
              const start = i / total;
              const end = Math.min(1, (i + WINDOW) / total);
              if (reduce) {
                // Reduced motion → render each word in its final color, no scroll binding.
                return (
                  <span key={w.key} style={{ color: w.color }}>
                    {w.word}
                    {i < total - 1 ? " " : ""}
                  </span>
                );
              }
              return (
                <span key={w.key}>
                  <Word
                    progress={scrollYProgress}
                    range={[start, end]}
                    color={w.color}
                  >
                    {w.word}
                  </Word>
                  {i < total - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        </p>
      </div>
    </section>
  );
}
