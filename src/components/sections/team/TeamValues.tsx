import { EyeIcon, PencilIcon, TrendingUpIcon, UsersIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_VALUES, TEAM_VALUES } from "@/lib/content";

const ICONS = {
  eye: EyeIcon,
  pencil: PencilIcon,
  trending: TrendingUpIcon,
  users: UsersIcon,
} as const;

export default function TeamValues() {
  return (
    <section className="bg-ink-50 py-[clamp(4rem,2rem+5vw,6.875rem)]">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900 lg:w-[640px]">
              {TEAM_VALUES.title}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[480px] text-[18px] leading-7 text-text-secondary">{TEAM_VALUES.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((value, i) => {
            const Icon = ICONS[value.icon];
            return (
              <Reveal key={value.title} delay={i * 0.06}>
                <div className="flex flex-col gap-6 border-t border-border-default pt-8">
                  <span className="flex size-12 items-center justify-center rounded-[12px] bg-brand-950 text-lime-500">
                    <Icon className="size-[22px]" />
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-display text-[20px] font-medium leading-7 text-ink-900">{value.title}</h3>
                    <p className="text-[16px] leading-6 text-text-secondary">{value.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
