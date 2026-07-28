"use client";

import { motion } from "motion/react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import { CHART_BARS, WHY_STATS } from "@/lib/content";

/**
 * The chart bars ship collapsed (h-px) in Figma — they're meant to grow to
 * 60 / 30 / 10 percent of the plot area once the card scrolls into view.
 * Each bar has a lighter 26px cap sitting on a solid body.
 */
/** Pixel height the 60% bar grows to; the others scale against it. */
const MAX_BAR = 300;

export default function WhyUs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">WHY DEV N SCALE</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 text-ink-900">
            A Partner That Delivers. Full-Service. Proven. At Scale.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-12 lg:flex-row lg:gap-[72px]">
          {/* Chart card */}
          <Reveal delay={0.1} className="w-full lg:flex-1">
            <div className="flex h-[440px] flex-col justify-end rounded-[24px] bg-ink-50 px-8 pb-10 pt-12 sm:px-12 lg:h-[560px]">
              <div className="flex items-end gap-5">
                {CHART_BARS.map((bar, i) => (
                  <div
                    key={bar.label}
                    className="flex flex-1 flex-col justify-end gap-4"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="font-display text-[26px] font-bold leading-none tracking-[-0.5px]"
                        style={{ color: bar.text }}
                      >
                        {bar.value}%
                      </span>
                      <span className="text-[16px] font-medium text-ink-900">
                        {bar.label}
                      </span>
                    </div>

                    {/* the bar itself grows from the 1px state Figma ships */}
                    <motion.div
                      className="flex flex-col overflow-hidden rounded-xl"
                      initial={{ height: 1 }}
                      whileInView={{
                        height: (bar.value / 60) * MAX_BAR,
                      }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 1.1,
                        delay: 0.15 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span
                        className="h-[26px] shrink-0"
                        style={{ background: bar.cap }}
                      />
                      <span
                        className="min-h-0 flex-1"
                        style={{ background: bar.solid }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right column */}
          <div className="w-full lg:flex-1">
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-7">
                <Stat stat={WHY_STATS[0]} />
                <div className="flex flex-wrap gap-x-14 gap-y-7">
                  <Stat stat={WHY_STATS[1]} />
                  <Stat stat={WHY_STATS[2]} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="t-body-lg mt-8 max-w-[560px] text-text-secondary">
                One team, all your needs. No vendor juggling. No coordination
                headaches. Integrated. Cohesive. Proven across 500+ projects in
                50+ countries.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 text-[17px] font-medium text-ink-900">
                Interested in working together?
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <PrimaryButton />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ stat }: { stat: (typeof WHY_STATS)[number] }) {
  return (
    <div className="flex items-center gap-3">
      <span className="t-subsection text-ink-900">{stat.value}</span>
      <span className="flex flex-col text-[15px] font-medium leading-tight text-ink-500">
        {stat.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </div>
  );
}
