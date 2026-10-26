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
import type { ServiceCapabilities as Caps, ServiceFit as Fit } from "@/lib/service-explorer";
import ServiceFit from "./ServiceFit";
import ServiceCapabilities from "./ServiceCapabilities";

/**
 * Service detail body, per the Figma service frames: hero, who it's for,
 * capability explorer and process. Selected work, testimonial and FAQs are
 * composed by the page.
 */
export default function ServiceDetail({
  detail,
  fit,
  caps,
}: {
  detail: ServiceDetail;
  fit: Fit;
  caps: Caps;
}) {
  return (
    <>
      <ServiceHero detail={detail} />
      <ServiceFit fit={fit} />
      <ServiceCapabilities caps={caps} />
      <ServiceProcess detail={detail} />
    </>
  );
}

/* ---------- 1. Hero ---------- */

function ServiceHero({ detail }: { detail: ServiceDetail }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-brand-950 pb-12 pt-[110px] sm:min-h-[560px] sm:pb-16 sm:pt-[130px] lg:h-[653px] lg:items-start lg:pb-0 lg:pt-[170px]"
    >
      <Image
        src="/img/hero-grid.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        sizes="100vw"
        className="-z-20 object-cover object-top"
      />

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <p className="rise-in text-[12px] font-medium leading-4 tracking-[1.5px] text-lime-300">
            {detail.index}
          </p>
          <h1
            className="rise-in t-page-hero mt-7 uppercase text-white"
            style={{ animationDelay: "80ms" }}
          >
            {detail.hero.title}
          </h1>
          <p
            className="rise-in mt-7 max-w-[620px] text-[18px] leading-[1.55] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {detail.hero.body}
          </p>

          <div
            className="rise-in mt-7 flex flex-col items-center gap-4 sm:flex-row"
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

/* ---------- 4. Our Process ---------- */

function ServiceProcess({ detail }: { detail: ServiceDetail }) {
  const { process } = detail;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress across the whole Process section — used to draw the
  // vertical rail on the timeline and to phase each step's marker fill
  // as it comes into view. Spring-smoothed so scrubbing feels buttery.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start tracking when the section's top crosses 85% of the viewport
    // and finish when its bottom crosses 55% — this gives the last step
    // enough scroll room to fill completely before the section exits.
    offset: ["start 0.85", "end 0.55"],
  });
  // Snappier spring so the rail and marker fills track the scroll
  // closely and reach 1.0 without lagging.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const total = process.steps.length;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-950 py-[clamp(4rem,1.5rem+6vw,6.875rem)]"
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
            <p className="mt-5 max-w-[400px] text-[18px] leading-7 text-ink-300">
              {process.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Magnetic>
                <PrimaryButton href="/services">Explore Service</PrimaryButton>
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
            className="pointer-events-none absolute left-5 top-5 h-[calc(100%-40px)] w-0.5 -translate-x-1/2 bg-ink-400"
          />
          {/* lime rail on top — grows from 0 → 100% of that same track */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress, transformOrigin: "top" }}
            className="pointer-events-none absolute left-5 top-5 h-[calc(100%-40px)] w-0.5 -translate-x-1/2 bg-lime-400"
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
      {/* Figma stacks its pattern layer over this section, dimming everything ~22%. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand-950/[0.22]" />
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
  // Each step owns a slice of [0..1] scroll progress. The step fills
  // within the first 70% of its slice so the last step finishes well
  // before progress needs to hit 1.0.
  const sliceSize = 1 / total;
  const start = index * sliceSize;
  const end = start + sliceSize * 0.7;
  const fill = useTransform(progress, [start, end], [0, 1]);
  const numberColor = useTransform(fill, [0, 0.5, 1], ["#737373", "#737373", "#012a1c"]);
  const titleColor = useTransform(fill, [0, 1], ["#a3a3a3", "#c4d434"]);
  const entryOpacity = useTransform(fill, [0, 1], [0.85, 1]);
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.li style={{ opacity: entryOpacity }} className="relative flex gap-7">
      <div className="relative flex w-10 shrink-0 flex-col items-center">
        <span className="relative z-10 flex size-10 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-ink-400 bg-ink-200">
          <motion.span
            aria-hidden="true"
            style={{ opacity: fill }}
            className="absolute inset-0 bg-[#c4d434]"
          />
          <motion.span style={{ color: numberColor }} className="relative font-display text-[14px] font-medium">
            {n}
          </motion.span>
        </span>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col gap-[9px] pt-1.5 ${index === total - 1 ? "" : "pb-12"}`}>
        <motion.h3
          style={{ color: titleColor }}
          className="font-display text-[22px] font-medium leading-tight tracking-[-0.3px]"
        >
          {step.title}
        </motion.h3>
        <p className="max-w-[560px] text-[15.5px] leading-[1.56] text-ink-400">{step.body}</p>
      </div>
    </motion.li>
  );
}
