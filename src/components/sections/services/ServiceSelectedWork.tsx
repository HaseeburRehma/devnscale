import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import WorkCard from "@/components/sections/work/WorkCard";
import { WORK } from "@/lib/content";

const PICKS = ["/case-study/lend-saas", "/case-study/opulencex"];

export default function ServiceSelectedWork() {
  const items = PICKS.map((href) => WORK.cases.find((c) => c.href === href)).filter(
    (c): c is (typeof WORK)["cases"][number] => Boolean(c),
  );

  return (
    <section className="bg-ink-50 py-[clamp(4rem,2rem+5vw,6.5rem)]">
      <div className="shell">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[1.5px] text-lime-700">{WORK.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[820px] font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900">
            {WORK.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-[620px] text-[18px] leading-7 text-text-secondary">{WORK.subtitle}</p>
        </Reveal>

        <AnimatedGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((c) => (
            <WorkCard key={c.name} item={c} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
