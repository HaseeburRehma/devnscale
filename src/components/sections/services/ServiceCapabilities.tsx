"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { SectionHeader } from "./ServiceFit";
import {
  CAPABILITY_PANELS,
  type CapabilityTab,
  type ServiceCapabilities as Caps,
} from "@/lib/service-explorer";

const ADVANCE_MS = 6000;
const DESKTOP = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );
}

/* Desktop: Figma's tabs + side panel with 6s auto-advance.
 * Phones: an accordion, so the panel opens right under the item tapped. */
export default function ServiceCapabilities({ caps }: { caps: Caps }) {
  const desktop = useIsDesktop();
  return (
    <section className="bg-white py-[clamp(4rem,1.5rem+6vw,6.875rem)]">
      <div className="shell">
        <SectionHeader title={caps.title} body={caps.body} />
        {desktop ? <Tabs caps={caps} /> : <Accordion caps={caps} />}
      </div>
    </section>
  );
}

function Tabs({ caps }: { caps: Caps }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const count = caps.tabs.length;
  const autoplay = !reduce && !paused && inView;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % count), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, autoplay, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + count) % count;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={ref}
      className="mt-16 grid grid-cols-[minmax(0,400px)_minmax(0,840px)] justify-between gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div role="tablist" aria-orientation="vertical" aria-label={caps.title} className="flex flex-col gap-2" onKeyDown={onKeyDown}>
        {caps.tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={tabClass(isActive)}
            >
              <TabLabel tab={t} index={i} active={isActive} />
              {isActive && (
                <span aria-hidden="true" className="relative h-0.5 w-full bg-ink-200">
                  <span
                    key={`${active}-${autoplay}`}
                    className="absolute inset-y-0 left-0 bg-lime-500"
                    style={
                      autoplay
                        ? { width: "100%", animation: `capability-progress ${ADVANCE_MS}ms linear both` }
                        : { width: "100%" }
                    }
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`}>
        <Panel tabs={caps.tabs} active={active} />
      </div>
    </div>
  );
}

function Accordion({ caps }: { caps: Caps }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="mt-12 flex flex-col gap-2">
      {caps.tabs.map((t, i) => {
        const isOpen = i === open;
        return (
          <div key={t.title} className="flex flex-col gap-3">
            <button
              type="button"
              id={`${baseId}-btn-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-region-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={tabClass(isOpen, true)}
            >
              <TabLabel tab={t} index={i} active={isOpen} />
            </button>
            {isOpen && (
              <div role="region" id={`${baseId}-region-${i}`} aria-labelledby={`${baseId}-btn-${i}`} className="pb-4">
                <Panel tabs={caps.tabs} active={i} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function tabClass(active: boolean, accordion = false) {
  return `relative flex w-full flex-col overflow-hidden rounded-[12px] border px-5 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 sm:px-6 ${
    active
      ? `gap-5 border-border-subtle bg-white pt-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.06),0_1px_2px_0_rgba(0,0,0,0.04)] ${accordion ? "pb-5" : ""}`
      : "border-transparent py-5 hover:bg-ink-50"
  }`;
}

function TabLabel({ tab, index, active }: { tab: CapabilityTab; index: number; active: boolean }) {
  return (
    <span className="flex w-full items-start gap-4">
      <span className={`text-[13px] font-medium leading-4 ${active ? "text-lime-700" : "text-text-muted"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className={`font-display text-[18px] font-medium leading-7 sm:text-[20px] ${active ? "text-ink-900" : "text-text-secondary"}`}>
          {tab.title}
        </span>
        {active && <span className="text-[14px] leading-5 text-text-secondary">{tab.body}</span>}
      </span>
    </span>
  );
}

function Panel({ tabs, active }: { tabs: readonly CapabilityTab[]; active: number }) {
  const current = tabs[active].panel;
  const panel = CAPABILITY_PANELS[current];
  const panelIds = [...new Set(tabs.map((t) => t.panel))];

  return (
    <div className="flex flex-col overflow-hidden rounded-[16px] border border-border-subtle bg-ink-50">
      <div className="relative aspect-[838/440] w-full overflow-hidden">
        {panelIds.map((id) => {
          const shown = id === current;
          return (
            <div
              key={id}
              aria-hidden={!shown}
              className={`absolute inset-0 transition-[opacity,transform] duration-[240ms] ease-out motion-reduce:transition-none ${
                shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <Image
                src={CAPABILITY_PANELS[id].image}
                alt={shown ? CAPABILITY_PANELS[id].alt : ""}
                fill
                sizes="(min-width: 1024px) 840px, 100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-8 border-t border-border-subtle bg-white px-5 pb-8 pt-7 sm:flex-row sm:gap-12 sm:px-8">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <p className="text-[13px] font-medium leading-4 text-text-muted">What you get</p>
          <ul className="flex flex-col gap-3.5">
            {panel.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-[14px] leading-5 text-ink-900">
                {/* eslint-disable-next-line @next/next/no-img-element -- 18px static SVG */}
                <img src="/img/services/check-circle.svg" alt="" width={18} height={18} className="mt-px size-[18px] shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3.5 sm:w-[300px] sm:shrink-0">
          <p className="text-[13px] font-medium leading-4 text-text-muted">Built with</p>
          <ul className="flex flex-wrap gap-2">
            {panel.stack.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 rounded-full border border-border-subtle bg-white py-[7px] pl-3 pr-3.5 text-[13px] font-medium leading-4 text-text-secondary"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-lime-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
