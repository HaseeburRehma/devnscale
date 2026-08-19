import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Magnetic from "@/components/motion/Magnetic";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import type { ServiceDetail } from "@/lib/content";

/**
 * Full Service Detail page body, per the Figma template at frame
 * 4979:40344 (Full Stack Development). One component drives all eight
 * service pages — every piece of copy is pulled from SERVICE_DETAILS.
 *
 * Sections, top to bottom:
 *   1. Hero              — dark green, index + title + body + 2 CTAs
 *   2. Stats strip       — 4 short metrics (Custom Built / Clean / …)
 *   3. What Is Included  — eyebrow + title + body + N alternating rows,
 *                          each row: title + body, with a visual pane
 *                          that reserves space for a Figma export.
 *   4. Our Process       — sidebar header + numbered timeline, over the
 *                          shared S-mark pattern backdrop.
 *
 * Testimonial / FAQs / SelectedWork / Footer are composed at the page
 * level so each service page can decide what tail sections to include.
 */
export default function ServiceDetail({ detail }: { detail: ServiceDetail }) {
  return (
    <>
      <ServiceHero detail={detail} />
      <ServiceStats detail={detail} />
      <ServiceIncluded detail={detail} />
      <ServiceProcess detail={detail} />
    </>
  );
}

/* ---------- 1. Hero ---------- */

function ServiceHero({ detail }: { detail: ServiceDetail }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-brand-950 pb-12 pt-[110px] sm:min-h-[560px] sm:pb-16 sm:pt-[130px] lg:h-[653px] lg:py-0"
    >
      <PatternBackdrop opacity={0.14} gradient={false} />
      {/* Very light center-only vignette so text has enough contrast but
       *  the tile grid still reads across the full hero background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 50% 50%, rgba(1,42,28,0.55) 0%, rgba(1,42,28,0) 75%)",
        }}
      />

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <p className="rise-in text-[12px] leading-4 tracking-[0.16em] text-lime-400">
            {detail.index}
          </p>
          <h1
            className="rise-in t-page-hero mt-4 max-w-[1000px] uppercase text-white"
            style={{ animationDelay: "80ms" }}
          >
            {detail.hero.title}
          </h1>
          <p
            className="rise-in t-body-lg mt-6 max-w-[620px] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {detail.hero.body}
          </p>

          <div
            className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "320ms" }}
          >
            <Magnetic>
              <PrimaryButton />
            </Magnetic>
            <Magnetic>
              <SecondaryButton />
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Stats strip ---------- */

function ServiceStats({ detail }: { detail: ServiceDetail }) {
  return (
    <section className="border-y border-border-subtle bg-white">
      <div className="shell grid grid-cols-2 gap-y-8 py-8 sm:grid-cols-4 sm:divide-x sm:divide-border-subtle sm:py-10">
        {detail.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.05}
            className="sm:px-8 sm:first:pl-0"
          >
            <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-medium leading-tight text-ink-900">
              {stat.value}
            </p>
            <p className="mt-2 text-[13px] leading-[1.3] text-text-muted">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 3. What Is Included ---------- */

function ServiceIncluded({ detail }: { detail: ServiceDetail }) {
  const { included } = detail;
  return (
    <section className="bg-white section-y">
      <div className="shell">
        {/* Header */}
        <div className="mb-14 max-w-[820px]">
          <Reveal>
            <p className="t-eyebrow">{included.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-subsection mt-4 text-ink-900">{included.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
              {included.body}
            </p>
          </Reveal>
        </div>

        {/* Rows — alternating text / visual layout */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {included.rows.map((row, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={row.title} delay={i * 0.04}>
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 ${
                    flipped ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="max-w-[500px]">
                    <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.5px] text-ink-900">
                      {row.title}
                    </h3>
                    <p className="t-body mt-4 text-text-secondary">
                      {row.body}
                    </p>
                  </div>
                  {/* Visual pane — reserves space for a Figma export.
                   *  Uses a lime→brand gradient so the section reads with
                   *  colour even before per-row images ship. */}
                  <div
                    aria-hidden="true"
                    className="relative aspect-[604/380] w-full overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#f4f7ea_0%,#c4d434_45%,#c7e8d9_100%)] shadow-[0_10px_26px_0_rgba(5,28,18,0.06)]"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[13px] uppercase tracking-[0.14em] text-brand-900/40">
                      {row.title}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Our Process ---------- */

function ServiceProcess({ detail }: { detail: ServiceDetail }) {
  const { process } = detail;
  return (
    <section className="relative overflow-hidden bg-brand-900 section-y">
      <PatternBackdrop />
      <div className="shell relative grid grid-cols-1 gap-12 lg:grid-cols-[400px_1fr] lg:gap-24">
        {/* Sidebar header */}
        <div>
          <Reveal>
            <p className="text-[12px] leading-4 tracking-[0.14em] text-lime-400">
              {process.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.5px] text-white">
              {process.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[400px] text-[15px] leading-[1.5] text-ink-300">
              {process.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Magnetic>
                <PrimaryButton />
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Numbered timeline */}
        <ol className="relative">
          {process.steps.map((step, i) => {
            const isLast = i === process.steps.length - 1;
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={step.title} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Marker column */}
                <div className="relative flex flex-col items-center">
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-lime-400/40 bg-brand-950 text-[13px] font-medium text-lime-400">
                    {n}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-10 h-[calc(100%-40px+32px)] w-px -translate-x-1/2 bg-white/15"
                    />
                  )}
                </div>
                {/* Body */}
                <Reveal delay={i * 0.05} className="pb-3 pt-1">
                  <h3 className="font-display text-[20px] font-medium leading-[1.3] text-white">
                    {step.title}
                  </h3>
                  <p className="t-body mt-2 max-w-[520px] text-ink-300">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
