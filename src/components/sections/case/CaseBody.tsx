import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import InView from "@/components/motion/InView";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import { CASE_STUDY, type CaseStudy } from "@/lib/content";

/**
 * All case-study body sections take a `study` prop so the same components
 * render both the MCA Calculator and the OpulenceX Lend SaaS pages (and any
 * future case). `study` defaults to the MCA export so existing call sites
 * keep working.
 */
type StudyProps = { study?: CaseStudy };

/* Full-width hero product shot directly under the meta strip. */
export function CaseHeroImage({ study = CASE_STUDY }: StudyProps) {
  return (
    <section className="bg-white pt-14 sm:pt-16">
      <div className="shell">
        <InView>
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[24px]">
            <Image
              src={study.heroImage}
              alt={`${study.title} — hero`}
              fill
              priority
              sizes="(min-width: 1440px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </InView>
      </div>
    </section>
  );
}

function StatRow({
  stats,
  withDividers = false,
}: {
  stats: readonly { value: string; label: string }[];
  withDividers?: boolean;
}) {
  return (
    <div
      className={
        withDividers
          ? "flex flex-wrap items-center justify-center gap-y-10 divide-x divide-border-subtle sm:flex-nowrap"
          : "flex flex-wrap items-start gap-x-16 gap-y-8"
      }
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={
            withDividers
              ? "flex flex-1 flex-col items-center px-8 text-center first:pl-0 last:pr-0"
              : ""
          }
        >
          <p className="font-display text-[clamp(2.25rem,1.8rem+2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-ink-900">
            {s.value}
          </p>
          <p className="mt-3 t-body-sm text-text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* Overview — split heading/body (white); stats live in their own canvas band. */
export function CaseOverview({ study = CASE_STUDY }: StudyProps) {
  const { overview } = study;
  return (
    <>
      <section className="bg-white section-y">
        <div className="shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="t-eyebrow">{overview.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-subsection mt-4 text-ink-900">{overview.title}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="t-body-lg text-text-secondary lg:pt-2">{overview.body}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section-y-sm border-y border-border-subtle bg-canvas">
        <div className="shell">
          <Reveal>
            <StatRow stats={overview.stats} withDividers />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Rounded rectangle backed by a real product screenshot. */
function CaseImagePanel({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[20px] bg-canvas shadow-[0_10px_26px_0_rgba(5,28,18,0.06)]"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 730px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/* THE PROBLEM — text left, image right. */
export function CaseProblem({ study = CASE_STUDY }: StudyProps) {
  const { problem } = study;
  return (
    <section className="bg-white section-y">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,470px)_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="t-eyebrow">{problem.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{problem.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 text-text-secondary">{problem.body}</p>
          </Reveal>
        </div>
        <InView>
          <CaseImagePanel src={problem.image} alt={problem.title} ratio="730 / 520" />
        </InView>
      </div>
    </section>
  );
}

/* DESIGNED FOR REAL WORK — image left, text right. */
export function CaseDesignedForWork({ study = CASE_STUDY }: StudyProps) {
  const { designSystem } = study;
  return (
    <section className="bg-canvas section-y">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,470px)] lg:gap-20">
        <InView>
          <CaseImagePanel
            src={designSystem.image}
            alt={designSystem.title}
            ratio="730 / 520"
          />
        </InView>
        <div>
          <Reveal>
            <p className="t-eyebrow">{designSystem.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{designSystem.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 text-text-secondary">{designSystem.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* THE RESULT — text + stats beside a product shot. */
export function CaseResults({ study = CASE_STUDY }: StudyProps) {
  const { results } = study;
  return (
    <section className="bg-white section-y">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,470px)_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="t-eyebrow">{results.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{results.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 text-text-secondary">{results.body}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10">
              <StatRow stats={results.stats} />
            </div>
          </Reveal>
        </div>
        <InView>
          <CaseImagePanel src={results.image} alt={results.title} ratio="730 / 470" />
        </InView>
      </div>
    </section>
  );
}

/* THE EXPERIENCE — heading + two large product mocks below. */
export function CaseExperience({ study = CASE_STUDY }: StudyProps) {
  const { experience } = study;
  return (
    <section className="bg-canvas section-y">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{experience.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-subsection mt-4 max-w-[760px] text-ink-900">
            {experience.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {experience.body}
          </p>
        </Reveal>

        <AnimatedGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <CaseImagePanel
            src={experience.mock1}
            alt={`${experience.title} — mock 1`}
            ratio="624 / 540"
          />
          <CaseImagePanel
            src={experience.mock2}
            alt={`${experience.title} — mock 2`}
            ratio="624 / 540"
          />
        </AnimatedGroup>
      </div>
    </section>
  );
}

/* THE FULL PICTURE — centred header + a wide gallery panel. */
export function CaseGallery({ study = CASE_STUDY }: StudyProps) {
  const { gallery } = study;
  return (
    <section className="bg-white section-y">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <p className="t-eyebrow">{gallery.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{gallery.title}</h2>
          </Reveal>
          {gallery.body && (
            <Reveal delay={0.12}>
              <p className="t-body-lg mt-5 text-text-secondary">
                {gallery.body}
              </p>
            </Reveal>
          )}
        </div>
        <InView className="mt-12">
          <div className="relative aspect-[1280/700] w-full overflow-hidden rounded-[20px]">
            <Image
              src={gallery.image}
              alt={gallery.title}
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
