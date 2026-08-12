import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import Tilt from "@/components/motion/Tilt";
import MediaFrame from "@/components/ui/MediaFrame";
import { ArrowRightIcon } from "@/components/icons";
import { CASE_STUDY } from "@/lib/content";

/** "SELECTED WORK" — two more case-study cards with cover, url, year, tags. */
export default function SelectedWork() {
  const { selectedWork } = CASE_STUDY;
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

        <AnimatedGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {selectedWork.cases.map((c, i) => (
            <a key={c.name} href="/case-study" className="group block">
              <Tilt max={5} className="[transform-style:preserve-3d]">
                <div className="overflow-hidden rounded-[20px] border border-border-subtle bg-white transition-[border-color,box-shadow] duration-300 group-hover:border-border-default group-hover:shadow-[0_16px_40px_rgba(25,33,61,0.1)]">
                  <div className="relative">
                    <MediaFrame
                      tone={i % 2 === 0 ? "dark" : "light"}
                      rounded="rounded-none"
                      className="aspect-[624/368] w-full"
                    />
                    {/* arrow badge on the cover, lime on hover */}
                    <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-ink-950/70 text-white transition-colors duration-300 group-hover:bg-lime-400 group-hover:text-ink-950">
                      <ArrowRightIcon className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </div>
                  <div className="px-7 py-6">
                    <h3 className="t-h5 text-ink-900 transition-colors duration-300 group-hover:text-lime-700">
                      {c.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[14px] text-text-secondary">{c.url}</span>
                      <span className="text-[13px] text-ink-400">{c.year}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border-default bg-white px-3 py-1 text-[12px] font-medium text-ink-700"
                        >
                          {t}
                        </span>
                      ))}
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
