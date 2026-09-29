import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import InView from "@/components/motion/InView";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import type { CaseStudy } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  CS · Hero                                                          */
/* ------------------------------------------------------------------ */

export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[560px] flex-col items-center overflow-hidden pb-14 pt-[120px] sm:min-h-[640px] sm:pt-[140px] lg:min-h-[720px] lg:pt-[160px]"
    >
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: study.heroGradient }}
      />

      {/* Hero overlay image */}
      {study.heroImage && (
        <Image
          src={study.heroImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          sizes="100vw"
          className="-z-10 object-cover mix-blend-soft-light opacity-40"
        />
      )}

      {/* Subtle darkening at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_100%)]"
      />

      <div className="shell relative flex w-full flex-1 flex-col">
        {/* Breadcrumb */}
        <nav className="rise-in mb-8">
          <ol className="flex items-center gap-2 text-[13px] text-white/70">
            <li>
              <Link href="/work" className="transition-colors hover:text-white">
                Our Work
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              &gt;
            </li>
            <li className="text-white">{study.name}</li>
          </ol>
        </nav>

        {/* Title + subtitle */}
        <div className="mx-auto max-w-[900px] text-center">
          <h1
            className="rise-in font-display text-[clamp(1.75rem,1rem+3.2vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white"
            style={{ animationDelay: "80ms" }}
          >
            {study.title}
          </h1>
          <p
            className="rise-in mx-auto mt-6 max-w-[680px] text-[clamp(0.938rem,0.85rem+0.4vw,1.125rem)] leading-[1.6] text-white/80"
            style={{ animationDelay: "180ms" }}
          >
            {study.subtitle}
          </p>
        </div>

        {/* Meta strip — embedded in hero */}
        <div
          className="rise-in mt-auto grid grid-cols-2 gap-y-6 pt-12 sm:grid-cols-4 sm:gap-x-8"
          style={{ animationDelay: "300ms" }}
        >
          {(
            [
              ["Industry", study.meta.industry],
              ["Platform", study.meta.platform],
              ["Scope", study.meta.scope],
              ["Services", study.meta.services],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                {label}
              </p>
              <p className="mt-2 text-[14px] leading-[1.4] text-white/90">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CS · Cover                                                         */
/* ------------------------------------------------------------------ */

export function CaseCover({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-white pt-0">
      <InView>
        <div className="relative aspect-[1440/720] w-full overflow-hidden">
          <Image
            src={study.coverImage}
            alt={`${study.name} — cover`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </InView>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CS · Overview                                                      */
/* ------------------------------------------------------------------ */

export function CaseOverview({ study }: { study: CaseStudy }) {
  const { overview } = study;
  return (
    <section className="bg-white section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* Left — heading */}
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.5px] text-ink-900">
              Overview
            </h2>
          </Reveal>

          {/* Right — lead + challenge/approach */}
          <div>
            <Reveal delay={0.06}>
              <p className="text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] leading-[1.6] text-text-secondary">
                {overview.lead}
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
              <Reveal delay={0.12}>
                <div>
                  <h3 className="font-display text-[18px] font-medium leading-[1.3] text-ink-900">
                    The Challenge
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
                    {overview.challenge}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div>
                  <h3 className="font-display text-[18px] font-medium leading-[1.3] text-ink-900">
                    Our Approach
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
                    {overview.approach}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CS · What we designed                                              */
/* ------------------------------------------------------------------ */

export function CaseFeatures({ study }: { study: CaseStudy }) {
  const { features } = study;
  return (
    <section className="bg-canvas section-y">
      <div className="shell">
        {/* Header — split layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.5px] text-ink-900">
              What we designed
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[560px] text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] leading-[1.6] text-text-secondary">
              {features.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Feature cards */}
        <AnimatedGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.items.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-[20px] border border-border-subtle bg-white"
            >
              {/* Image */}
              <div className="relative aspect-[400/300] w-full overflow-hidden bg-ink-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Body */}
              <div className="p-6">
                <h3 className="font-display text-[18px] font-medium leading-[1.3] text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CS · Screens                                                       */
/* ------------------------------------------------------------------ */

export function CaseScreens({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-white section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.5px] text-ink-900">
              Screens
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[560px] text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] leading-[1.6] text-text-secondary">
              A closer look at the key screens and flows we designed.
            </p>
          </Reveal>
        </div>
        <InView className="mt-12">
          <div className="relative aspect-[1280/900] w-full overflow-hidden rounded-[20px]">
            <Image
              src={study.screensImage}
              alt={`${study.name} — screens`}
              fill
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </InView>
      </div>
    </section>
  );
}
