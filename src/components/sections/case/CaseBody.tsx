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

      {/* Grid overlay — fades out toward the bottom so the transition
           into the cover section is seamless, not a hard line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 80px)," +
            "repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 1px,transparent 1px 80px)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      <div className="shell relative flex w-full flex-1 flex-col">
        {/* Breadcrumb */}
        <nav className="rise-in mb-8 text-center">
          <ol className="inline-flex items-center gap-2 text-[13px] text-white/70">
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
            className="rise-in font-display text-[clamp(1.75rem,1rem+3.2vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.04em] text-white"
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

          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rise-in mx-auto mt-8 inline-flex items-center justify-center rounded-[12px] border border-[#eef3bc] bg-[#012a1c] px-8 py-3.5 font-display text-[15px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#013d28]"
              style={{ animationDelay: "240ms" }}
            >
              Visit Live Site
            </a>
          )}
        </div>

        {/* Divider line */}
        <div
          aria-hidden="true"
          className="rise-in mt-auto h-px w-full bg-white/20"
          style={{ animationDelay: "280ms" }}
        />

        {/* Meta strip — embedded in hero */}
        <div
          className="rise-in grid grid-cols-2 gap-y-6 pt-8 sm:grid-cols-4 sm:gap-x-8"
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
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/50">
                {label}
              </p>
              <p className="mt-2 font-display text-[18px] leading-[1.4] text-white/90">
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
    <section className="relative overflow-hidden pt-0">
      {/* Top band continues the hero gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: study.heroGradient }}
      />

      {/* Fade the gradient band to white so there's no hard line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background: "linear-gradient(to bottom, transparent 30%, white 100%)",
        }}
      />

      {/* Grid overlay continues from hero, fading out */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 80px)," +
            "repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 1px,transparent 1px 80px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
        }}
      />

      <InView>
        <div className="shell relative">
          <div className="relative aspect-[1280/720] w-full overflow-hidden rounded-[20px]">
            <Image
              src={study.coverImage}
              alt={`${study.name} — cover`}
              fill
              priority
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
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
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {/* Left — heading */}
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,2.5rem)] font-medium leading-[1.2] tracking-[-1px] text-ink-900 lg:w-[400px] lg:shrink-0">
              Overview
            </h2>
          </Reveal>

          {/* Right — lead + challenge/approach */}
          <div className="min-w-0 flex-1">
            <Reveal delay={0.06}>
              <p className="font-display text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.5px] text-ink-900">
                {overview.lead}
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
              <Reveal delay={0.12}>
                <div className="border-t border-border-subtle pt-6">
                  <h3 className="font-display text-[18px] font-medium leading-[1.3] text-ink-900">
                    The challenge
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-text-secondary">
                    {overview.challenge}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="border-t border-border-subtle pt-6">
                  <h3 className="font-display text-[18px] font-medium leading-[1.3] text-ink-900">
                    Our approach
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-text-secondary">
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900 lg:w-[620px] lg:shrink-0">
              What we designed
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-[18px] leading-[1.55] text-text-secondary">
              {features.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Feature cards */}
        <AnimatedGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.items.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-white pb-7 pt-3 px-3"
            >
              {/* Image */}
              <div className="relative aspect-[384/300] w-full overflow-hidden rounded-[12px] bg-ink-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Body */}
              <div className="px-3 pt-6">
                <h3 className="font-display text-[20px] font-medium leading-[1.4] text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.43] text-text-secondary">
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
  const s = study.screens;

  if (!s) {
    return (
      <section className="bg-white section-y">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900 lg:w-[900px] lg:shrink-0">
                Screens
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-[300px] text-[18px] leading-[1.55] text-text-secondary">
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

  return (
    <section className="bg-white section-y">
      <div className="shell flex flex-col gap-20">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-20">
            <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900 lg:w-[900px] lg:shrink-0">
              {s.title}
            </h2>
            <p className="max-w-[300px] text-[18px] leading-[1.55] text-text-secondary">
              {s.description}
            </p>
          </div>
        </Reveal>

        {/* Categories */}
        {s.categories.map((cat, ci) => (
          <div key={cat.title} className="flex flex-col gap-10 border-t border-border-subtle pt-10">
            {/* Category header */}
            <Reveal delay={ci * 0.06}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-20">
                <div className="lg:w-[520px] lg:shrink-0">
                  <h3 className="font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-medium leading-[1.25] tracking-[-1px] text-ink-900">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] text-text-tertiary">
                    {cat.screens.length} screens
                  </p>
                </div>
                <p className="text-[18px] leading-[1.55] text-text-secondary">
                  {cat.description}
                </p>
              </div>
            </Reveal>

            {/* Screen grid */}
            <AnimatedGroup
              className={
                s.mobile
                  ? "grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
                  : "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2"
              }
            >
              {cat.screens.map((screen) => (
                <div key={screen.caption} className="flex flex-col gap-4">
                  <div
                    className={`relative w-full overflow-hidden rounded-[20px] border border-border-subtle ${
                      s.mobile ? "aspect-[302/654]" : "aspect-[628/393]"
                    }`}
                  >
                    <Image
                      src={screen.image}
                      alt={screen.caption}
                      fill
                      sizes={s.mobile ? "(min-width: 640px) 25vw, 50vw" : "(min-width: 640px) 50vw, 100vw"}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[13px] font-medium text-ink-800">
                    {screen.caption}
                  </p>
                </div>
              ))}
            </AnimatedGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
