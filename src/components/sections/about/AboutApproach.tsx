"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_APPROACH } from "@/lib/content";

/**
 * "OUR APPROACH" — types the sentence out character by character each time
 * the section scrolls into view (restarts on every visit, per user ask).
 *
 * The sentence is split into three colour bands:
 *   • lead  — "We keep teams "   → dark ink
 *   • accent — "small, senior…"  → yellow/lime cream (matches Figma)
 *   • tail  — "It is how good…"  → dark ink
 *
 * Typing runs at ~55ms/character; a caret pulses at the current write head.
 * When the user scrolls the section out of view the state resets so a
 * scroll-back replays the animation. Reduced-motion users see the full
 * sentence immediately with no caret.
 */

const TYPE_MS = 55; // per character
const START_DELAY = 250; // small pause before the first char lands

// Read once at module load — SSR-safe fallback (`false`) and the effect below
// keeps it in sync if the OS setting changes at runtime.
function initialReduce(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function AboutApproach() {
  const { eyebrow, lead, accent, tail } = ABOUT_APPROACH;
  const fullLen = `${lead} `.length + `${accent} `.length + tail.length;
  const [reduce, setReduce] = useState(initialReduce);
  const [len, setLen] = useState<number>(() => (initialReduce() ? fullLen : 0));
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Sync reduced-motion via the external media-query change event.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  // Watch scroll — when the section enters view, reset & start typing;
  // when it leaves, reset so the next entry replays from zero.
  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLen(0);
            setActive(true);
          } else {
            setActive(false);
            setLen(0);
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Advance the character counter while active.
  useEffect(() => {
    if (!active || reduce) return;
    if (len >= fullLen) return;
    const t = setTimeout(
      () => setLen((n) => n + 1),
      len === 0 ? START_DELAY : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [active, len, reduce, fullLen]);

  // Slice the running character count into the three coloured runs.
  const leadRun = `${lead} `;
  const accentRun = `${accent} `;
  const shownLead = leadRun.slice(0, Math.min(len, leadRun.length));
  const shownAccent =
    len > leadRun.length
      ? accentRun.slice(0, Math.min(len - leadRun.length, accentRun.length))
      : "";
  const shownTail =
    len > leadRun.length + accentRun.length
      ? tail.slice(0, len - leadRun.length - accentRun.length)
      : "";
  const done = len >= fullLen;

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-[104px]"
    >
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{eyebrow}</p>
        </Reveal>

        <p
          className="t-subsection mt-6 max-w-[1080px] text-ink-900"
          aria-label={`${lead} ${accent} ${tail}`}
        >
          <span aria-hidden>
            {shownLead}
            <span className="text-[#c8d02c]">{shownAccent}</span>
            <span className="text-ink-900">{shownTail}</span>
            {!reduce && !done && (
              <span className="typewriter-caret ml-0.5 inline-block w-[2px] align-baseline">
                &nbsp;
              </span>
            )}
          </span>
        </p>
      </div>
    </section>
  );
}
