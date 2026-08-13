import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import Tilt from "@/components/motion/Tilt";
import { ArrowRightIcon } from "@/components/icons";
import { CASE_STUDY, type CaseStudy } from "@/lib/content";

/**
 * "SELECTED WORK" — two proud-of case cards. Cover images now come from the
 * Figma export; each cover carries a category badge (top-left) and a lime
 * arrow badge (top-right), matching the design's overlay treatment.
 *
 * Accepts an optional `study` prop so both `/case-study` and per-slug case
 * pages (`/case-study/lend-saas` etc.) share the same component.
 */
export default function SelectedWork({
  study = CASE_STUDY,
}: {
  study?: CaseStudy;
}) {
  const { selectedWork } = study;
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{selectedWork.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 max-w-[820px] text-ink-900">
            {selectedWork.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {selectedWork.subtitle}
          </p>
        </Reveal>

        {/* Two-card row on md+. Sticky pin on tall viewports so the pair
            stacks like the projects deck on the home page. */}
        <AnimatedGroup className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {selectedWork.cases.map((c, i) => (
            <a
              key={c.name}
              href="/case-study"
              className="stack-card group block"
              style={{ zIndex: i + 1 }}
            >
              <Tilt max={5} className="[transform-style:preserve-3d]">
                <div className="overflow-hidden rounded-[20px] border border-border-subtle bg-white shadow-[0_10px_26px_0_rgba(5,28,18,0.06)] transition-[border-color,box-shadow] duration-300 group-hover:border-border-default group-hover:shadow-[0_16px_40px_rgba(25,33,61,0.1)]">
                  <div className="relative aspect-[624/368] w-full overflow-hidden">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes="(min-width: 768px) 624px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* dark bottom gradient (per Figma) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90" />

                    {/* category pill top-left (dark glass) */}
                    <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-[12px] font-medium tracking-[0.02em] text-white backdrop-blur-sm">
                      {c.badge}
                    </span>

                    {/* lime arrow badge top-right */}
                    <span className="absolute right-6 top-6 flex size-[42px] items-center justify-center rounded-full bg-lime-500 text-ink-950 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <ArrowRightIcon className="size-[18px] -rotate-45" />
                    </span>

                    {/* project title on the cover (per Figma) */}
                    <h3 className="absolute bottom-6 left-6 right-6 font-display text-[32px] font-medium leading-[1.1] tracking-[-1px] text-white">
                      {c.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-7 py-6">
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-4 text-[14px]">
                        <span className="truncate font-medium text-ink-700">
                          {c.url}
                        </span>
                        <span className="shrink-0 text-ink-500">{c.year}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </a>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
