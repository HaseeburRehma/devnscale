import Image from "next/image";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_STORY } from "@/lib/content";

/**
 * "OUR STORY" — a tall visual panel paired with the founding narrative and a
 * signature. The Figma ships the visual as an empty frame; we render a
 * branded panel (logo-mark watermark + "Building since" pill) so the slot
 * reads as intentional rather than missing.
 */
export default function AboutStory() {
  return (
    <section className="bg-white section-y">
      <div className="shell flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* visual */}
        <Reveal className="w-full lg:w-[520px] lg:shrink-0">
          <div className="relative aspect-[520/560] w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-800 to-brand-950">
            {ABOUT_STORY.image ? (
              <Image
                src={ABOUT_STORY.image}
                alt="The Dev N Scale studio"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            ) : (
              <>
                <PatternBackdrop opacity={0.08} />
                {/* corner glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(196,212,52,0.28), rgba(196,212,52,0) 70%)",
                    filter: "blur(20px)",
                  }}
                />
              </>
            )}
            <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-ink-900 shadow-sm">
              <span className="size-1.5 rounded-full bg-lime-500" />
              {ABOUT_STORY.badge}
            </span>
          </div>
        </Reveal>

        {/* narrative */}
        <div className="flex-1">
          <Reveal>
            <p className="t-eyebrow">{ABOUT_STORY.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-5 text-ink-900">
              {ABOUT_STORY.title}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-6 text-[18px] leading-7 text-text-secondary">
            {ABOUT_STORY.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="mt-10 border-l-2 border-lime-400 pl-4">
              <p className="font-display text-[17px] font-medium text-ink-900">
                {ABOUT_STORY.name}
              </p>
              <p className="t-body-sm mt-0.5 text-text-muted">
                {ABOUT_STORY.role}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
