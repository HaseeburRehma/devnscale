"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { useLenis } from "@/components/motion/SmoothScroll";
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
  const lenis = useLenis();

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

  const goTo = (i: number) => {
    setActive(i);
    const el = cardRefs.current[i];
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -window.innerHeight / 2 + el.offsetHeight / 2 });
    } else {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };

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

        <div className="mx-auto grid max-w-[1560px] grid-cols-[320px_minmax(0,1fr)_440px] gap-x-8 px-8 lg:px-12 xl:grid-cols-[360px_minmax(0,540px)_500px] xl:gap-x-12 xl:px-16">
          {/* Left — off-canvas circle, sticky */}
          <div className="relative">
            <div className="services-side-sticky relative overflow-hidden">
              <Dial
                activeIndex={active}
                total={total}
                reduce={reduce ?? false}
                onSelect={goTo}
              />
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

          {/* Right — cube render, sticky. Bigger footprint + a soft coloured
              backdrop so the render feels like it's floating in a lit
              environment. Each service swap replays a scale+rotate pop,
              and the mark continues to bob + slowly rotate. */}
          <div className="relative">
            <div className="services-side-sticky pointer-events-none">
              {/* radial glow behind the cube — pulses gently */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-10%] motion-safe:animate-[glow-pulse_5s_ease-in-out_infinite]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(196,212,52,0.16), rgba(196,212,52,0) 62%), radial-gradient(closest-side at 60% 40%, rgba(232,121,249,0.14), rgba(232,121,249,0) 55%)",
                  filter: "blur(20px)",
                }}
              />
              <motion.div
                key={active}
                initial={{ scale: 0.9, rotate: -14, opacity: 0.5 }}
                animate={
                  reduce
                    ? { scale: 1, rotate: 0, opacity: 1 }
                    : {
                        scale: [0.9, 1.05, 0.98, 1.02, 1],
                        rotate: [-14, 6, -3, 2, 0],
                        opacity: 1,
                      }
                }
                transition={
                  reduce
                    ? { duration: 0.4 }
                    : {
                        scale: { duration: 1.3, ease: EASE },
                        rotate: { duration: 1.4, ease: EASE },
                        opacity: { duration: 0.6, ease: EASE },
                      }
                }
                className="relative size-full"
              >
                {/* separate wrapper for the continuous idle motion so the
                    key-change replay above stays clean */}
                <div
                  className="relative size-full motion-safe:animate-[float-sway_9s_ease-in-out_infinite]"
                >
                  <Image
                    src="/img/services-cubes.png"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1280px) 500px, 440px"
                    className="object-contain drop-shadow-[0_36px_60px_rgba(1,42,28,0.35)] motion-safe:animate-[spin_36s_linear_infinite]"
                  />
                </div>
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
 * Off-canvas dial — every service number sits on a circle at a slot
 * 180°/(total-1) apart. The active number always sits at the 3 o'clock
 * slot (angle 0, unrotated, dark, with the lime dot); every other number
 * sits at `(index - active) * step` degrees — so numbers *before* the
 * active one curve up-and-away above it, numbers after curve away below
 * it. Each number is a stable, keyed element so Framer Motion glides it
 * smoothly along the circle to its new slot whenever the active service
 * changes, rather than cross-fading in place — this is what makes the
 * dial read as a slowly turning wheel, matching the prototype.
 *
 * The circle is sized from the *actual* rendered box (via ResizeObserver)
 * rather than a fixed viewBox, so it always renders at true 1:1 pixel
 * scale — no SVG letterboxing shrinking the numbers down. The radius
 * tracks the box height (so the full arc fits top-to-bottom) and the
 * centre is pinned near the right edge, which keeps the active number
 * anchored close to the column's edge — the right "half" of the circle
 * stays inside the column, the rest bleeds off-canvas to the left, at
 * any column width.
 *
 * PAD_X/PAD_Y inset the circle from the container edges. They matter
 * because `.services-side-sticky` clips overflow: the active label uses
 * textAnchor="start", so its text draws *rightward* from its anchor —
 * without horizontal clearance the active number's own text overflows
 * past the column's right edge and gets clipped to nothing (invisible,
 * only the dot showing). Vertical clearance keeps whichever label lands
 * near the top/bottom of the arc (±90°) from being cut in half by the
 * same clip.
 */
const PAD_X = 44;
const PAD_Y = 24;

function Dial({
  activeIndex,
  total,
  reduce,
  onSelect,
}: {
  activeIndex: number;
  total: number;
  reduce: boolean;
  onSelect: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState({ width: 400, height: 640 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const R = Math.max(0, box.height / 2 - PAD_Y);
  const cx = box.width - PAD_X - R;
  const cy = box.height / 2;
  const step = 180 / (total - 1);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        viewBox={`0 0 ${box.width} ${box.height}`}
        className="absolute inset-0 h-full w-full"
      >
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e5e5e5" strokeWidth={1} />
      {SERVICE_SHOWCASE.map((service, i) => {
        const angle = (i - activeIndex) * step;
        const rad = (angle * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        const isActive = i === activeIndex;
        return (
          <motion.g
            key={service.id}
            role="button"
            tabIndex={0}
            aria-label={`Jump to ${service.title}`}
            className="cursor-pointer outline-none"
            animate={{ x, y, rotate: isActive ? 0 : angle }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 110, damping: 18, mass: 0.9 }
            }
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(i);
              }
            }}
          >
            {/* invisible larger hit-area — the number glyph alone is too
                small/thin a target to click or tap comfortably */}
            <circle cx={10} cy={0} r={24} fill="transparent" />
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
            <motion.text
              x={0}
              y={0}
              textAnchor="start"
              dominantBaseline="middle"
              fontFamily="var(--font-display), sans-serif"
              fontWeight={500}
              fontSize={24}
              animate={{ fill: isActive ? "#1b1b1b" : "#d4d4d4" }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              0{i + 1}
            </motion.text>
          </motion.g>
        );
      })}
      </svg>
    </div>
  );
}
