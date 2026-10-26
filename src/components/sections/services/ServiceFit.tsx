import Reveal from "@/components/ui/Reveal";
import type { ServiceFit as Fit } from "@/lib/service-explorer";

export default function ServiceFit({ fit }: { fit: Fit }) {
  return (
    <section className="bg-ink-50 py-[clamp(4rem,2rem+5vw,6.875rem)]">
      <div className="shell">
        <SectionHeader title={fit.title} body={fit.body} />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {fit.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <div className="flex flex-col gap-6 border-t border-border-default pt-8">
                <span className="flex size-12 items-center justify-center rounded-[12px] bg-brand-950">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 22px static SVG */}
                  <img src={card.icon} alt="" width={22} height={22} className="size-[22px]" />
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-[20px] font-medium leading-7 text-ink-900">{card.title}</h3>
                  <p className="text-[16px] leading-6 text-text-secondary">{card.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <Reveal>
        <h2 className="max-w-[640px] font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="max-w-[480px] text-[18px] leading-7 text-text-secondary lg:w-[480px]">{body}</p>
      </Reveal>
    </div>
  );
}
