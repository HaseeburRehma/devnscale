import {
  CircleCheckIcon,
  GlobeIcon,
  MapPinIcon,
  MessageSquareIcon,
  SendIcon,
  SquarePenIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { HIRING, WHY_JOIN } from "@/lib/careers";

const STEP_ICONS = {
  send: SendIcon,
  chat: MessageSquareIcon,
  pen: SquarePenIcon,
  check: CircleCheckIcon,
};
const PERK_ICONS = {
  globe: GlobeIcon,
  user: UserIcon,
  star: StarIcon,
  pin: MapPinIcon,
};
/* Cards step up 300 / 340 / 380 / 420 to show progression (Figma "Careers/Hiring Step"). */
const STEP_HEIGHTS = [
  "lg:h-[300px]",
  "lg:h-[340px]",
  "lg:h-[380px]",
  "lg:h-[420px]",
];

const sectionTitle =
  "font-display text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] font-bold leading-[1.14] tracking-[-2px]";

/** Figma "Careers · Hiring Process" on the brand-green pattern. */
export function CareersProcess() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-[clamp(4rem,1.5rem+6vw,7rem)]">
      <PatternBackdrop />
      <div className="shell relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className={`${sectionTitle} text-white`}>{HIRING.title}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[440px] text-[18px] leading-7 text-ink-300">
              {HIRING.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Timeline marks sit above their steps on desktop. */}
        <div aria-hidden="true" className="mt-10 hidden gap-6 lg:flex">
          {HIRING.steps.map((s, i) => (
            <div key={s.day} className="flex flex-1 items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-lime-500" />
              <span className="font-mono text-[12px] text-lime-500">
                {s.day}
              </span>
              <span
                className={`h-px flex-1 ${i === HIRING.steps.length - 1 ? "bg-white/[0.04]" : "bg-white/20"}`}
              />
            </div>
          ))}
        </div>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-5 lg:flex lg:items-end">
          {HIRING.steps.map((s, i) => {
            const Icon = STEP_ICONS[s.icon];
            const last = i === HIRING.steps.length - 1;
            return (
              <li key={s.title} className={`flex-1 ${STEP_HEIGHTS[i]}`}>
                <Reveal delay={i * 0.1} className="h-full">
                  <div
                    className={`flex h-full min-h-[260px] flex-col justify-between gap-10 rounded-[20px] p-7 ${
                      last
                        ? "bg-lime-500"
                        : "border border-white/[0.12] bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex size-12 items-center justify-center rounded-xl ${
                          last
                            ? "bg-brand-950 text-lime-500"
                            : "bg-lime-500/[0.08] text-lime-500"
                        }`}
                      >
                        <Icon className="size-[22px]" />
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[12px] leading-4 ${
                          last
                            ? "border-brand-950 text-brand-950"
                            : "border-white/20 text-ink-300"
                        }`}
                      >
                        {s.duration}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <span
                        className={`font-display text-[56px] font-bold leading-[64px] tracking-[-2px] ${last ? "text-brand-950" : "text-lime-500"}`}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        className={`font-display text-[20px] font-medium leading-7 ${last ? "text-brand-950" : "text-white"}`}
                      >
                        <span className="sr-only">{s.day}: </span>
                        {s.title}
                      </h3>
                      <p
                        className={`text-[14px] leading-5 ${last ? "text-brand-900" : "text-ink-300"}`}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Figma "Careers · Why Join": four perks under a hairline. */
export function CareersWhyJoin() {
  return (
    <section className="bg-canvas py-[clamp(4rem,1.5rem+6vw,7.5rem)]">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className={`${sectionTitle} text-ink-900`}>{WHY_JOIN.title}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[440px] text-[18px] leading-7 text-text-secondary">
              {WHY_JOIN.subtitle}
            </p>
          </Reveal>
        </div>
        <AnimatedGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY_JOIN.perks.map((p) => {
            const Icon = PERK_ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="flex flex-col gap-4 border-t border-border-subtle pt-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-950 text-lime-500">
                  <Icon className="size-[22px]" />
                </span>
                <h3 className="mt-2 font-display text-[20px] font-medium leading-7 text-ink-900">
                  {p.title}
                </h3>
                <p className="text-[16px] leading-6 text-text-secondary">
                  {p.body}
                </p>
              </div>
            );
          })}
        </AnimatedGroup>
      </div>
    </section>
  );
}
