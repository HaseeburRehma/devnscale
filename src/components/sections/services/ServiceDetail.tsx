"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Magnetic from "@/components/motion/Magnetic";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import type { ServiceDetail } from "@/lib/content";

/**
 * Full Service Detail page body, per the Figma template at frame
 * 4979:40344 (Full Stack Development). One component drives all eight
 * service pages — every piece of copy is pulled from SERVICE_DETAILS.
 *
 * Sections, top to bottom:
 *   1. Hero              — dark green, index + title + body + 2 CTAs
 *   2. Stats strip       — 4 short metrics (Custom Built / Clean / …)
 *   3. What Is Included  — eyebrow + title + body + N alternating rows,
 *                          each row: title + body, with a visual pane
 *                          that reserves space for a Figma export.
 *   4. Our Process       — sidebar header + numbered timeline, over the
 *                          shared S-mark pattern backdrop.
 *
 * Testimonial / FAQs / SelectedWork / Footer are composed at the page
 * level so each service page can decide what tail sections to include.
 */
export default function ServiceDetail({ detail }: { detail: ServiceDetail }) {
  return (
    <>
      <ServiceHero detail={detail} />
      <ServiceStats detail={detail} />
      <ServiceIncluded detail={detail} />
      <ServiceProcess detail={detail} />
    </>
  );
}

/* ---------- 1. Hero ---------- */

function ServiceHero({ detail }: { detail: ServiceDetail }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-brand-950 pb-12 pt-[110px] sm:min-h-[560px] sm:pb-16 sm:pt-[130px] lg:h-[653px] lg:py-0"
    >
      {/* Grid lattice — same 72.8×72.8 square grid as the home Hero,
       *  layered UNDER the S-mark tiles so the hero reads as textured
       *  brand-950 rather than flat green. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          backgroundColor: "#02150e",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "72.8px 72.8px",
          backgroundPosition: "28px 4px",
        }}
      />

      {/* Subtle bottom fade so the hero settles into the Stats band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_60%,rgba(2,14,9,0.45)_100%)]"
      />

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <p className="rise-in text-[12px] leading-4 tracking-[0.16em] text-lime-400">
            {detail.index}
          </p>
          <h1
            className="rise-in t-page-hero mt-4 max-w-[1000px] uppercase text-white"
            style={{ animationDelay: "80ms" }}
          >
            {detail.hero.title}
          </h1>
          <p
            className="rise-in t-body-lg mt-6 max-w-[620px] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {detail.hero.body}
          </p>

          <div
            className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "320ms" }}
          >
            <Magnetic>
              <PrimaryButton />
            </Magnetic>
            <Magnetic>
              <SecondaryButton />
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Stats strip ---------- */

function ServiceStats({ detail }: { detail: ServiceDetail }) {
  return (
    <section className="border-y border-border-subtle bg-ink-100">
      <div className="shell grid grid-cols-2 gap-y-8 py-8 sm:grid-cols-4 sm:divide-x sm:divide-border-subtle sm:py-10">
        {detail.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.05}
            className="sm:px-8 sm:first:pl-0"
          >
            <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-medium leading-tight text-ink-900">
              {stat.value}
            </p>
            <p className="mt-2 text-[13px] leading-[1.3] text-text-muted">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 3. What Is Included ---------- */

function ServiceIncluded({ detail }: { detail: ServiceDetail }) {
  const { included } = detail;
  return (
    <>
      {/* Header band — white */}
      <section className="bg-white pt-[clamp(3rem,1.75rem+3.6vw,5rem)] pb-10 sm:pb-14">
        <div className="shell">
          <div className="max-w-[820px]">
            <Reveal>
              <p className="t-eyebrow">{included.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-subsection mt-4 text-ink-900">{included.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
                {included.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rows — full-width bands with alternating backgrounds.
       *  Odd rows (1,3,5) = white; even rows (2,4,6) = #F4F4F5. */}
      {included.rows.map((row, i) => {
        const flipped = i % 2 === 1;
        const bandBg = flipped ? "bg-ink-100" : "bg-white";
        return (
          <section key={row.title} className={`${bandBg} py-10 sm:py-14`}>
            <div className="shell">
              <Reveal delay={0.04}>
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 ${
                    flipped ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="max-w-[500px]">
                    <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.5px] text-ink-900">
                      {row.title}
                    </h3>
                    <p className="t-body mt-4 text-text-secondary">
                      {row.body}
                    </p>
                  </div>
                  {row.image ? (
                    <div className="relative aspect-[604/380] w-full overflow-hidden rounded-[20px] bg-ink-50 shadow-[0_10px_26px_0_rgba(5,28,18,0.06)]">
                      <Image
                        src={row.image}
                        alt={row.title}
                        fill
                        sizes="(min-width: 1024px) 604px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="relative aspect-[604/380] w-full overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#f4f7ea_0%,#c4d434_45%,#c7e8d9_100%)] shadow-[0_10px_26px_0_rgba(5,28,18,0.06)]"
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-[13px] uppercase tracking-[0.14em] text-brand-900/40">
                        {row.title}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ---------- 4. Our Process ---------- */

function ServiceProcess({ detail }: { detail: ServiceDetail }) {
  const { process } = detail;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress across the whole Process section — used to draw the
  // vertical rail on the timeline and to phase each step's marker fill
  // as it comes into view. Spring-smoothed so scrubbing feels buttery.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  // Softer spring settings — more damping + less stiffness so the rail
  // and marker fills glide with the wheel instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    mass: 0.4,
  });

  const total = process.steps.length;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-900 section-y"
    >
      <PatternBackdrop />
      <div className="shell relative grid grid-cols-1 gap-12 lg:grid-cols-[400px_1fr] lg:gap-24">
        {/* Sidebar header */}
        <div>
          <Reveal>
            <p className="text-[12px] leading-4 tracking-[0.14em] text-lime-400">
              {process.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.5px] text-white">
              {process.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[400px] text-[15px] leading-[1.5] text-ink-300">
              {process.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Magnetic>
                <PrimaryButton />
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Numbered timeline — rail scaleY driven by scroll, each step
         *  fades + slides in on its own slice of the section's progress. */}
        <ol className="relative">
          {/* dim rail track behind everything (always visible) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-5 h-[calc(100%-40px)] w-px -translate-x-1/2 bg-white/10"
          />
          {/* lime rail on top — grows from 0 → 100% of that same track */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress, transformOrigin: "top" }}
            className="pointer-events-none absolute left-5 top-5 h-[calc(100%-40px)] w-px -translate-x-1/2 bg-gradient-to-b from-lime-400 via-lime-400/60 to-lime-400/0"
          />
          {process.steps.map((step, i) => (
            <TimelineStep
              key={step.title}
              step={step}
              index={i}
              total={total}
              progress={progress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** One numbered step in the Our Process timeline. Its marker "fills"
 *  with lime and its body fades up as the scroll progress crosses this
 *  step's slice of the section — creates a continuous flowing reveal
 *  down the column rather than a staircase of individual pop-ins. */
function TimelineStep({
  step,
  index,
  total,
  progress,
}: {
  step: { title: string; body: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each step owns a slice of [0..1] scroll progress. Reveals overlap so
  // adjacent steps ease into each other instead of snapping.
  const start = index / total;
  const end = Math.min(1, (index + 1) / total + 0.15);
  const bodyOpacity = useTransform(progress, [start, end], [0.35, 1]);
  const bodyY = useTransform(progress, [start, end], [12, 0]);
  const markerFill = useTransform(progress, [start, end], [0, 1]);
  const markerScale = useTransform(progress, [start, end], [0.85, 1]);
  const n = String(index + 1).padStart(2, "0");

  return (
    <li className="relative flex gap-6 pb-10 last:pb-0">
      {/* Marker column */}
      <motion.div
        style={{ scale: markerScale }}
        className="relative flex flex-col items-center"
      >
        <span className="relative z-10 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-lime-400/50 bg-brand-950 text-[13px] font-medium text-white">
          {/* lime fill wipes in behind the number as the step activates */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: markerFill, transformOrigin: "bottom" }}
            className="absolute inset-0 -z-0 bg-lime-400"
          />
          <motion.span
            style={{ color: useTransform(markerFill, [0, 0.6, 1], ["#facc15", "#facc15", "#012a1c"]) }}
            className="relative z-10 font-display"
          >
            {n}
          </motion.span>
        </span>
      </motion.div>
      {/* Body */}
      <motion.div style={{ opacity: bodyOpacity, y: bodyY }} className="pb-3 pt-1">
        <h3 className="font-display text-[20px] font-medium leading-[1.3] text-white">
          {step.title}
        </h3>
        <p className="t-body mt-2 max-w-[520px] text-ink-300">
          {step.body}
        </p>
      </motion.div>
    </li>
  );
}
