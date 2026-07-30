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
          <p className="t-subsection mt-6 max-w-[960px] text-ink-900">
            {ABOUT_APPROACH.lead}{" "}
            <span className="text-lime-600">{ABOUT_APPROACH.accent}</span>{" "}
            <span className="text-ink-400">{ABOUT_APPROACH.tail}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
