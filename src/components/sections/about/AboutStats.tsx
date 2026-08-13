"use client";

import { useEffect, useRef } from "react";
import { ABOUT_STATS } from "@/lib/content";

/**
 * The white stat bar under the hero — three figures split by hairline rules.
 * Each number counts up from zero the first time the bar scrolls into view,
 * preserving the trailing "+", "%+" etc. from the source string.
 */
export default function AboutStats() {
  return (
    <section className="section-y-sm border-b border-border-subtle bg-white">
      <div className="shell grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {ABOUT_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 px-6 py-8 text-center"
          >
            <CountUp value={stat.value} />
            <span className="t-body-sm text-text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  // The count is written straight to the DOM node rather than through React
  // state: it's a purely visual animation with no bearing on the tree, and it
  // keeps the effect free of synchronous setState. SSR renders the final value
  // so it's correct with JS disabled.
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = parseInt(value, 10);
    const suffix = value.replace(/^[\d]+/, ""); // "+", "%+", …
    if (Number.isNaN(target)) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) return;

    // hold at zero until revealed
    el.textContent = `0${suffix}`;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries, obs) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        obs.disconnect();

        const duration = 1100;
        let start: number | null = null;
        const tick = (t: number) => {
          if (start === null) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = `${Math.round(eased * target)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className="font-display text-[clamp(2rem,1.5rem+2.2vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-ink-900 tabular-nums"
    >
      {value}
    </span>
  );
}
