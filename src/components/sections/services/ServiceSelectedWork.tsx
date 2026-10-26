import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import WorkCard from "@/components/sections/work/WorkCard";
import { WORK } from "@/lib/content";

const PICKS = [
  { href: "/case-study/lend-saas" },
  { href: "/case-study/opulencex", cover: "/img/work/opulencex-service.jpg" },
];

export default function ServiceSelectedWork() {
  const items = PICKS.flatMap((p) => {
    const item = WORK.cases.find((c) => c.href === p.href);
    return item ? [{ item, cover: p.cover }] : [];
  });

  return (
    <section className="bg-ink-50 py-[clamp(4rem,1.5rem+5.55vw,6.5rem)]">
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
          {items.map(({ item, cover }) => (
            <WorkCard key={item.name} item={item} cover={cover} tall />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
