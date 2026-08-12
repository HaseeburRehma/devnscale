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

        <div className="mx-auto grid max-w-[1440px] grid-cols-[46%_1fr_360px] gap-x-8 px-20 xl:grid-cols-[46%_1fr_440px]">
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
                animate={{ rotate: reduce ? 0 : [0, 3, 0, -3, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-full"
              >
                <Image
                  src="/img/services-cubes.png"
                  alt=""
                  fill
                  priority
                  sizes="440px"
                  className="object-contain drop-shadow-[0_28px_50px_rgba(1,42,28,0.28)]"
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
 * Off-canvas partial circle with orbiting step numbers. 720×720 circle
 * centred on the left edge of its column, so only the right arc peeks in.
 * 01 sits at 3 o'clock, each subsequent step 30° clockwise. Numbers are
 * rotated to hug the tangent; the active step lights up dark and gets a
 * lime dot beside it.
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
  const cx = -R + 60; // circle centre is 60px in from the SVG left, so most of it clips off-canvas
  const cy = R; // vertical centre matches the SVG's own centre
  const stepAngle = 30;

  return (
    <svg
      viewBox={`${cx - R - 20} 0 ${R * 2 + 40} ${R * 2}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e5e5" strokeWidth={1} />
      {Array.from({ length: total }).map((_, i) => {
        // 01 at 3 o'clock (angle 0), stepping clockwise: 02 at 30°, …
        const angle = i * stepAngle;
        const rad = (angle * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        const isActive = i === activeIndex;
        const numRotation = angle + 90;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
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
              fontSize={isActive ? 24 : 22}
              fill={isActive ? "#1b1b1b" : "#d4d4d4"}
              transform={isActive ? undefined : `rotate(${numRotation})`}
            >
              0{i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
