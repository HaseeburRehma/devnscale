import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { PROJECTS } from "@/lib/content";

/**
 * Figma card metrics at full width (1280 x 438, node 4541:446):
 *   padding 40 / left 56 / right 40 · text fluid · gap 48 · visual 580x358
 * Below `xl` the two columns stay side by side fluidly; below `md` the
 * image moves under the text.
 *
 * The scroll stacking is the `.stack-card` rule in globals.css: every card
 * pins at the same 100px offset, and the ascending z-index below makes each
 * one slide completely over the last. Deliberately CSS-only — no media-query
 * hook — so the markup is identical on the server and the client.
 */

export default function Projects() {
  return (
    <section id="work" className="bg-canvas section-y">
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
              className="stack-card mb-8 last:mb-0"
              style={{ zIndex: i + 1 }}
            >
              <div className="rounded-[24px] bg-[linear-gradient(90deg,#c4d434_0%,#7eb863_50%,#59a773_75%,#2f9580_100%)] p-[1.5px] shadow-[0_10px_30px_0_rgba(5,28,18,0.06)]">
                <article className="group grid grid-cols-1 items-center gap-8 rounded-[22.5px] bg-white p-6 sm:p-8 md:grid-cols-[1fr_1.043fr] xl:grid-cols-[1fr_580px] xl:gap-12 xl:py-10 xl:pl-14 xl:pr-10">
                  <div className="flex flex-col items-start gap-6">
                    <span className="rounded-full border border-[#e5e5e5] bg-white px-3.5 py-2 text-[13px] font-medium text-[#525252]">
                      {project.pill}
                    </span>

                    <h3 className="max-w-[460px] font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-medium leading-[1.2] tracking-[-1px] text-[#1b1b1b]">
                      {project.title}
                    </h3>

                    <p className="max-w-[540px] text-[clamp(0.938rem,0.85rem+0.3vw,1.0625rem)] leading-[1.55] text-[#525252]">
                      {project.body}
                    </p>

                    <SecondaryButton variant="light" href={project.href} className="w-[220px]">
                      View Case Study
                    </SecondaryButton>
                  </div>

                  <div className="relative aspect-[580/358] w-full overflow-hidden rounded-[20px]">
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
