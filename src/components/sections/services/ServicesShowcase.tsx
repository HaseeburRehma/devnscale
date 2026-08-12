"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BitcoinIcon,
  ChatIcon,
  CodeIcon,
  LayoutIcon,
  PresentationIcon,
  ShieldIcon,
  SmartphoneIcon,
  TrendingUpIcon,
} from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { SERVICES_INTRO, SERVICE_SHOWCASE } from "@/lib/content";

const ICONS = {
  code: CodeIcon,
  smartphone: SmartphoneIcon,
  layout: LayoutIcon,
  chat: ChatIcon,
  shield: ShieldIcon,
  presentation: PresentationIcon,
  trending: TrendingUpIcon,
  bitcoin: BitcoinIcon,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Figma services page shows one long, interactive list where the active
 * service expands to reveal its blurb, tags, and a facetted glyph, while a
 * circular index on the left tracks position. Hovering or focusing a row makes
 * it active; the first is open by default.
 */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const total = SERVICE_SHOWCASE.length;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        {/* header */}
        <Reveal>
          <p className="t-eyebrow">{SERVICES_INTRO.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 max-w-[760px] text-ink-900">
            {SERVICES_INTRO.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {SERVICES_INTRO.body}
          </p>
        </Reveal>

        {/* interactive list */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* circular index — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <Dial index={active} total={total} />
            </div>
          </div>

          {/* rows */}
          <ul className="divide-y divide-border-subtle border-t border-border-subtle">
            {SERVICE_SHOWCASE.map((service, i) => {
              const open = active === i;
              const Icon = ICONS[service.icon];
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span
                      className={`hidden font-body text-[13px] tabular-nums transition-colors sm:block ${
                        open ? "text-lime-600" : "text-ink-400"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`t-h1 flex-1 transition-colors duration-300 ${
                        open ? "text-ink-900" : "text-ink-300 group-hover:text-ink-500"
                      }`}
                    >
                      {service.title}
                    </span>
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        open
                          ? "bg-gradient-to-b from-ink-800 to-ink-950 text-lime-400"
                          : "bg-ink-100 text-ink-400 group-hover:text-ink-600"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 items-center gap-8 pb-9 sm:grid-cols-[1fr_auto] sm:pl-9">
                          <div>
                            <p className="t-body-lg max-w-[520px] text-text-secondary">
                              {service.body}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2.5">
                              {service.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-lime-100 px-4 py-1.5 text-[13px] font-medium text-lime-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ServiceGlyph seed={i} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Circular progress index — a ring with the current step number. */
function Dial({ index, total }: { index: number; total: number }) {
  const r = 86;
  const c = 2 * Math.PI * r;
  const progress = (index + 1) / total;
  return (
    <div className="relative size-[200px]">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#e5e5e5" strokeWidth="2" />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#bdc61d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - progress) }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-ink-900">
          0{index + 1}
        </span>
        <span className="mt-1 text-[13px] text-ink-400">
          of 0{total}
        </span>
      </div>
    </div>
  );
}

/** Facetted glyph echoing the colourful isometric cluster in the Figma. */
function ServiceGlyph({ seed }: { seed: number }) {
  const palettes = [
    ["#c4d434", "#1e8c72", "#012a1c"],
    ["#1e8c72", "#9cd6bc", "#084234"],
    ["#bdc61d", "#7b8513", "#042f22"],
    ["#d1e15a", "#15705d", "#012a1c"],
  ];
  const p = palettes[seed % palettes.length];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      className="mx-auto hidden size-[160px] shrink-0 sm:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" className="size-full drop-shadow-[0_12px_24px_rgba(1,42,28,0.25)]">
        <polygon points="80,12 140,46 140,114 80,148 20,114 20,46" fill={p[2]} />
        <polygon points="80,12 140,46 80,80 20,46" fill={p[0]} />
        <polygon points="140,46 140,114 80,148 80,80" fill={p[1]} />
        <polygon points="20,46 80,80 80,148 20,114" fill={p[2]} opacity="0.85" />
        <polygon points="80,44 110,61 110,95 80,112 50,95 50,61" fill={p[0]} opacity="0.9" />
      </svg>
    </motion.div>
  );
}
