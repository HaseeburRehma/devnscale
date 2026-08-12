"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { SERVICES_INTRO, SERVICE_SHOWCASE } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "What we do" — matches the Figma prototype 1:1.
 *
 * Layout (desktop, lg+):
 *   • Three-column grid. Left and right columns pin (position:sticky) so
 *     the big off-canvas circle and the 3D cube render sit still while
 *     the centre column scrolls its eight services past them.
 *   • Sticky white → transparent gradients above and below the section
 *     fade services into/out of the visible window, matching the
 *     prototype's masking.
 *   • An IntersectionObserver tracks whichever service is closest to
 *     the vertical centre and drives the active step for the dial +
 *     centre content dimming (inactive services are 40% opacity).
 *
 * Below `lg` the sticky pins collapse; the section becomes a plain
 * vertical list of all eight services with their titles + tags.
 */
export default function ServicesShowcase() {
  const total = SERVICE_SHOWCASE.length;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Which service block sits closest to viewport centre right now.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        let bestDist = Infinity;
        const centreY = window.innerHeight / 2;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const r = e.target.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - centreY);
          if (d < bestDist) {
            bestDist = d;
            best = e;
          }
        }
        if (best) {
          const idx = Number((best.target as HTMLElement).dataset.i);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white pt-16 sm:pt-20 lg:pt-[104px]">
      {/* Header */}
      <div className="shell">
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
      </div>

      {/* ---------- Below lg: plain list ---------- */}
      <div className="shell mt-14 space-y-14 lg:hidden">
        {SERVICE_SHOWCASE.map((s, i) => (
          <ServiceBlock key={s.id} service={s} index={i} />
        ))}
      </div>

      {/* ---------- lg+: three-column pinned deck ---------- */}
      <div className="relative mt-16 hidden lg:block">
        {/* top fade mask (sticky at top of viewport so services drift in
            from behind white) */}
        <div className="services-mask-top" aria-hidden="true" />

        <div className="mx-auto grid max-w-[1440px] grid-cols-[340px_minmax(0,1fr)_380px] gap-x-8 px-8 lg:px-12 xl:grid-cols-[360px_minmax(0,520px)_440px] xl:gap-x-12 xl:px-20">
          {/* Left — off-canvas circle, sticky */}
          <div className="relative">
            <div className="services-side-sticky relative">
              <Dial activeIndex={active} total={total} reduce={reduce ?? false} />
            </div>
          </div>

          {/* Centre — vertical scroll of services */}
          <div className="flex flex-col gap-[160px] py-[30vh]">
            {SERVICE_SHOWCASE.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-i={i}
              >
                <ServiceBlock service={s} index={i} isActive={i === active} />
              </div>
            ))}
          </div>

          {/* Right — cube render, sticky */}
          <div className="relative">
            <div className="services-side-sticky pointer-events-none">
              <motion.div
                key={active}
                initial={{ scale: 0.94, rotate: -8, opacity: 0.6 }}
                animate={
                  reduce
                    ? { scale: 1, rotate: 0, opacity: 1 }
                    : {
                        scale: [0.94, 1.02, 1, 1.01, 1],
                        rotate: [-8, 4, -2, 2, 0],
                        opacity: 1,
                        y: [0, -8, 0, 8, 0],
                      }
                }
                transition={
                  reduce
                    ? { duration: 0.4 }
                    : {
                        scale: { duration: 1.1, ease: EASE },
                        rotate: { duration: 1.2, ease: EASE },
                        opacity: { duration: 0.5, ease: EASE },
                        y: {
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        },
                      }
                }
                className="relative size-full"
              >
                <Image
                  src="/img/services-cubes.png"
                  alt=""
                  fill
                  priority
                  sizes="440px"
                  className="object-contain drop-shadow-[0_28px_50px_rgba(1,42,28,0.28)] motion-safe:animate-[spin_28s_linear_infinite]"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="services-mask-bottom" aria-hidden="true" />
      </div>
    </section>
  );
}

function ServiceBlock({
  service,
  index,
  isActive,
}: {
  service: (typeof SERVICE_SHOWCASE)[number];
  index: number;
  isActive?: boolean;
}) {
  const dim = isActive !== undefined && !isActive;
  return (
    <div
      className={`transition-opacity duration-500 ${
        dim ? "opacity-30" : "opacity-100"
      }`}
    >
      <h3 className="font-display text-[clamp(2rem,1.4rem+2.2vw,3rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink-900">
        {service.title}
      </h3>
      <p className="t-body-lg mt-4 max-w-[500px] text-text-secondary">
        {service.body}
      </p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-lime-600 bg-lime-500 px-3.5 py-[7px] text-[13px] font-medium text-[#41460c]"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-6 block text-[13px] italic tabular-nums text-ink-400 lg:hidden">
        0{index + 1} / 0{SERVICE_SHOWCASE.length}
      </span>
    </div>
  );
}

/**
 * Off-canvas half-dial with a **three-number window** — only the previous
 * step (top), the active step (3 o'clock, with the lime dot), and the next
 * step (bottom) are visible at any time, matching the Figma prototype.
 * Numbers cross-fade between roles when the active index changes so the
 * dial reads as a slowly turning wheel rather than a jumping list.
 */
function Dial({
  activeIndex,
  total,
  reduce,
}: {
  activeIndex: number;
  total: number;
  reduce: boolean;
}) {
  const R = 360;
  const cx = -R + 60; // circle centre 60px in from SVG left; most clips off-canvas
  const cy = R;
  // three fixed slots on the visible arc: top-right (60°), 3-o'clock (0°),
  // bottom-right (-60° / 300°). The active number always lands at 0°.
  const slots = [
    { angle: -60, role: "prev" as const },
    { angle: 0, role: "active" as const },
    { angle: 60, role: "next" as const },
  ];

  return (
    <svg
      viewBox={`${cx - R - 20} 0 ${R * 2 + 40} ${R * 2}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e5e5" strokeWidth={1} />
      {slots.map((slot) => {
        const idx =
          slot.role === "prev"
            ? (activeIndex - 1 + total) % total
            : slot.role === "next"
              ? (activeIndex + 1) % total
              : activeIndex;
        const rad = (slot.angle * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        const isActive = slot.role === "active";
        const numRotation = slot.angle + 90;
        return (
          <motion.g
            key={`${slot.role}-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
            transform={`translate(${x} ${y})`}
          >
            {isActive && (
              <motion.circle
                layoutId="services-dot"
                r={7}
                cx={-18}
                cy={0}
                fill="#bdc61d"
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
              />
            )}
            <text
              x={0}
              y={0}
              textAnchor="start"
              dominantBaseline="middle"
              fontFamily="var(--font-display), sans-serif"
              fontWeight={500}
              fontSize={isActive ? 28 : 22}
              fill={isActive ? "#1b1b1b" : "#d4d4d4"}
              transform={isActive ? undefined : `rotate(${numRotation})`}
            >
              0{idx + 1}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
