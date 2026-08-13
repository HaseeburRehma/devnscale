import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { PROJECTS } from "@/lib/content";

/**
 * Figma card metrics at full width (1280 x 418):
 *   padding-left 56 · text 556 · gap 48 · visual 580x320 · padding-right 40
 *   the visual is inset 49px top and bottom — (418 - 320) / 2
 * Below `xl` the two columns hold that 556:580 ratio fluidly; below `md` the
 * image moves under the text.
 *
 * The scroll stacking is the `.stack-card` rule in globals.css: every card
 * pins at the same 100px offset, and the ascending z-index below makes each
 * one slide completely over the last. Deliberately CSS-only — no media-query
 * hook — so the markup is identical on the server and the client.
 */

export default function Projects() {
  return (
    <section id="work" className="bg-canvas py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">SELECTED WORK</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 text-ink-900">
            Outcomes we&apos;re proud of.
          </h2>
        </Reveal>

        <div className="relative mt-12">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="stack-card mb-8 last:mb-0 md:mb-20"
              style={{ zIndex: i + 1 }}
            >
              <div className="rounded-[24px] bg-[linear-gradient(103deg,#c4d434_0%,#9cd6bc_45%,#7fb8d4_100%)] p-px shadow-[0_18px_40px_-24px_rgba(1,42,28,0.35)]">
                <article className="group grid grid-cols-1 items-center gap-8 rounded-[23px] bg-white p-6 sm:p-8 md:grid-cols-[1fr_1.043fr] xl:grid-cols-[556px_580px] xl:gap-12 xl:p-0 xl:pl-14 xl:pr-10">
                  <div className="xl:py-10">
                    <span className="inline-flex h-8 items-center rounded-full border border-border-subtle bg-white px-3.5 text-[12px] leading-4 text-text-secondary">
                      {project.pill}
                    </span>

                    <h3 className="t-h1 mt-6 text-ink-900">{project.title}</h3>

                    <p className="t-body-sm mt-6 max-w-[540px] text-text-secondary">
                      {project.body}
                    </p>

                    <div className="mt-6 flex items-center gap-2.5">
                      <span className="font-display text-[26px] font-bold leading-none tracking-[-0.5px] text-lime-700">
                        {project.metric}
                      </span>
                      <span className="t-body-sm text-text-secondary">
                        {project.metricLabel}
                      </span>
                    </div>

                    <div className="mt-8">
                      <SecondaryButton variant="light" href={project.href}>
                        View Case Study
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="relative aspect-[580/320] w-full overflow-hidden rounded-[16px] xl:my-[49px]">
                    <Image
                      src={project.image}
                      alt={`${project.title} — project preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 580px"
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
