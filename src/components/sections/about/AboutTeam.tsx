"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_TEAM, TEAM_MEMBERS } from "@/lib/content";

const ADVANCE_MS = 3000;
const SLIDE_MS = 700;

/* Dawood leads the carousel; the rest follow the team page order. */
const FIRST = "Dawood";
const MEMBERS = TEAM_MEMBERS.members
  .filter((m) => m.photo)
  .sort((a, b) => Number(b.name === FIRST) - Number(a.name === FIRST))
  .map((m) => ({ ...m, card: m.photo! }));
const N = MEMBERS.length;
/* Three copies so the active card always has neighbours on both sides;
 * the index snaps back to the middle copy without animating. */
const LOOP = [...MEMBERS, ...MEMBERS, ...MEMBERS];

/**
 * "OUR TEAM" — Figma 07b · Team cards (302×378, frosted name card) in a
 * centred auto-slider. The active member is centred, in full colour with a
 * lime ring; the rest dim. No pagination: it advances every 3s, pauses on
 * hover or focus, and can be swiped or clicked.
 */
export default function AboutTeam() {
  const { eyebrow, title, subtitle } = ABOUT_TEAM;
  const [index, setIndex] = useState(N);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const t = setTimeout(() => go(index + 1), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [index, paused, visible, reduce, go]);

  // After a slide lands in an outer copy, jump to the same member in the middle copy.
  useEffect(() => {
    if (index >= N && index < 2 * N) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex((i) => ((i % N) + N) % N + N);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const active = MEMBERS[index % N];

  return (
    <section id="team" className="overflow-hidden bg-ink-50 py-[clamp(4rem,1.5rem+5.55vw,6.5rem)]">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[18px]">
            <Reveal>
              <p className="text-[12px] leading-4 text-lime-700">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900">
                {title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[320px] text-[16px] leading-6 text-text-secondary">{subtitle}</p>
          </Reveal>
        </div>
      </div>

      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label="Team members"
        className="relative mt-12 touch-pan-y select-none [--cw:min(72vw,302px)] [--gap:16px] sm:[--cw:260px] lg:[--cw:302px] lg:[--gap:24px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={(e) => {
          pointerX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (pointerX.current === null) return;
          const dx = e.clientX - pointerX.current;
          pointerX.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <p className="sr-only" aria-live="polite">
          {`${active.name}, ${active.role}`}
        </p>
        <ul
          className="ml-[50%] flex gap-[var(--gap)] py-3"
          style={{
            transform: `translateX(calc(-${index} * (var(--cw) + var(--gap)) - var(--cw) / 2))`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
          }}
        >
          {LOOP.map((m, i) => {
            const isActive = i === index;
            const clone = i < N || i >= 2 * N;
            return (
              <li
                key={i}
                aria-hidden={clone || undefined}
                onClick={() => !isActive && go(i)}
                className={`relative aspect-[302/378] w-[var(--cw)] shrink-0 overflow-hidden rounded-[20px] bg-ink-100 ${
                  animate ? "transition-[transform,opacity,filter,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
                } ${
                  isActive
                    ? "scale-100 opacity-100 shadow-[0_18px_40px_rgba(1,42,28,0.22)] ring-2 ring-lime-400"
                    : "scale-[0.9] cursor-pointer opacity-55 grayscale-[40%] hover:opacity-80"
                }`}
              >
                <Image
                  src={m.card}
                  alt={clone ? "" : `${m.name}, ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 302px, (min-width: 640px) 260px, 72vw"
                  className="object-cover"
                />
                <div
                  className={`absolute inset-x-4 bottom-4 flex flex-col items-center gap-1 rounded-[14px] p-4 text-center backdrop-blur-md transition-colors duration-700 ${
                    isActive ? "bg-[rgba(1,42,28,0.62)]" : "bg-black/20"
                  }`}
                >
                  <p className="font-display text-[18px] font-medium leading-6 text-white">{m.name}</p>
                  <p
                    className={`text-[14px] leading-5 transition-colors duration-700 ${
                      isActive ? "text-lime-300" : "text-ink-300"
                    }`}
                  >
                    {m.role}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
