import Reveal from "@/components/ui/Reveal";
import { ABOUT_APPROACH } from "@/lib/content";

/**
 * A single oversized statement of intent. The middle clause is highlighted in
 * lime, matching the Figma "OUR APPROACH" block.
 */
export default function AboutApproach() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{ABOUT_APPROACH.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="t-subsection mt-6 max-w-[1080px] text-ink-900">
            {ABOUT_APPROACH.lead}{" "}
            {/* Pale-lime cream, matching Figma — a very soft accent that keeps
                the sentence feeling like one continuous line rather than a
                highlight break. */}
            <span className="text-[#dfe6a3]">{ABOUT_APPROACH.accent}</span>{" "}
            <span className="text-ink-300">{ABOUT_APPROACH.tail}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
