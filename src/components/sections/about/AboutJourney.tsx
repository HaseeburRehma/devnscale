"use client";

import { motion } from "motion/react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_JOURNEY } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The "OUR JOURNEY" timeline. A central spine draws itself top-to-bottom as
 * the section enters view; each milestone dot pops in on the spine and its
 * card slides in from its side (alternating left / right on desktop, all
 * left-aligned on mobile). The first milestone reads lime — "you are here at
 * the start" — the rest cool to muted green going down.
 */
export default function AboutJourney() {
  const { eyebrow, title, intro, milestones } = ABOUT_JOURNEY;

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-20 lg:py-[104px]">
      <PatternBackdrop opacity={0.05} />

      {/* soft top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,212,52,0.16), rgba(196,212,52,0) 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="shell relative">
        {/* header */}
        <div className="mx-auto max-w-[760px] text-center">
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

        {/* timeline */}
        <div className="relative mx-auto mt-16 max-w-[900px]">
          {/* spine — sits on the left rail on mobile, centred on desktop */}
          <div className="absolute bottom-2 left-[11px] top-2 w-px md:left-1/2 md:-translate-x-1/2">
            {/* faint static rail */}
            <div className="absolute inset-0 bg-white/10" />
            {/* animated lime draw */}
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, #c4d434 0%, #bdc61d 22%, rgba(30,140,114,0.6) 60%, rgba(30,140,114,0.15) 100%)",
                bottom: 0,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </div>

          <ol className="space-y-12 md:space-y-4">
            {milestones.map((m, i) => {
              const isFirst = i === 0;
              const rightSide = i % 2 === 0; // 01 & 03 on the right (desktop)
              return (
                <li
                  key={m.year}
                  className="relative grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-2 md:gap-x-16"
                >
                  {/* dot on the spine */}
                  <span className="relative z-10 md:absolute md:left-1/2 md:top-1.5 md:-translate-x-1/2">
                    <motion.span
                      className={`block size-[14px] translate-x-[4px] rounded-full ring-4 md:translate-x-0 ${
                        isFirst
                          ? "bg-lime-400 ring-lime-400/20"
                          : "bg-brand-200 ring-brand-200/15"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25 + i * 0.28,
                        ease: EASE,
                      }}
                    />
                    {isFirst && (
                      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-lime-400/40" />
                    )}
                  </span>

                  {/* content — column + side chosen per milestone */}
                  <motion.div
                    className={`min-w-0 pb-2 ${
                      rightSide
                        ? "md:col-start-2 md:pl-4 md:text-left"
                        : "md:col-start-1 md:row-start-1 md:pr-4 md:text-right"
                    }`}
                    initial={{
                      opacity: 0,
                      x: rightSide ? 28 : -28,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.28,
                      ease: EASE,
                    }}
                  >
                    <span
                      className={`inline-flex items-baseline gap-3 ${
                        rightSide ? "" : "md:flex-row-reverse"
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
                    <p
                      className={`t-body mt-2 max-w-[360px] text-ink-300 ${
                        rightSide ? "" : "md:ml-auto"
                      }`}
                    >
                      {m.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
