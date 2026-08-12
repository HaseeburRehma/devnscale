import Reveal from "@/components/ui/Reveal";
import InView from "@/components/motion/InView";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import MediaFrame from "@/components/ui/MediaFrame";
import { CASE_STUDY } from "@/lib/content";

/* The big product shot directly under the hero. */
export function CaseHeroImage() {
  return (
    <section className="bg-white pt-14 sm:pt-16">
      <div className="shell">
        <InView>
          <MediaFrame
            label="Fieldnote · Dispatch control room"
            className="aspect-[2/1] w-full"
          />
        </InView>
      </div>
    </section>
  );
}

function StatRow({
  stats,
}: {
  stats: readonly { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-start gap-x-16 gap-y-8">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="font-display text-[clamp(2.25rem,1.8rem+2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-ink-900">
            {s.value}
          </p>
          <p className="mt-3 t-body-sm text-text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* Overview — split heading/body, then a stat row. */
export function CaseOverview() {
  const { overview } = CASE_STUDY;
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
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
        <div className="mt-14 border-t border-border-subtle pt-12">
          <StatRow stats={overview.stats} />
        </div>
      </div>
    </section>
  );
}

/* The product — heading then two device mockups. */
export function CaseProduct() {
  const { product } = CASE_STUDY;
  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{product.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-subsection mt-4 max-w-[760px] text-ink-900">
            {product.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {product.body}
          </p>
        </Reveal>

        <AnimatedGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <MediaFrame label="Driver app" className="aspect-[624/480] w-full" />
          <MediaFrame
            label="Dispatch board"
            tone="light"
            className="aspect-[624/480] w-full"
          />
        </AnimatedGroup>
      </div>
    </section>
  );
}

/* Results — text + stats beside a product shot. */
export function CaseResults() {
  const { results } = CASE_STUDY;
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="t-eyebrow">{results.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{results.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 max-w-[460px] text-text-secondary">
              {results.body}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10">
              <StatRow stats={results.stats} />
            </div>
          </Reveal>
        </div>
        <InView className="lg:order-last">
          <MediaFrame label="Live status" className="aspect-[730/470] w-full" />
        </InView>
      </div>
    </section>
  );
}

/* Gallery — centred header + a wide collage panel. */
export function CaseGallery() {
  const { gallery } = CASE_STUDY;
  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="mx-auto max-w-[640px] text-center">
          <Reveal>
            <p className="t-eyebrow">{gallery.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{gallery.title}</h2>
          </Reveal>
        </div>
        <InView className="mt-12">
          <MediaFrame label="Fieldnote — every screen" className="aspect-[1280/700] w-full" />
        </InView>
      </div>
    </section>
  );
}
