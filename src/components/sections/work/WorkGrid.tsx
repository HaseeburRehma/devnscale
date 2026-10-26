import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import { WORK } from "@/lib/content";
import WorkCard from "./WorkCard";

export default function WorkGrid() {
  return (
    <section className="bg-canvas section-y">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{WORK.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 max-w-[820px] text-ink-900">
            {WORK.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-5 max-w-[620px] text-text-secondary">
            {WORK.subtitle}
          </p>
        </Reveal>

        <AnimatedGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {WORK.cases.map((c) => (
            <WorkCard key={c.name} item={c} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
