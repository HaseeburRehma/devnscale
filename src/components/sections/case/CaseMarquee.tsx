import {
  BriefcaseIcon,
  ChatIcon,
  CheckIcon,
  GlobeIcon,
  PlusIcon,
  ShieldIcon,
  SmartphoneIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { MARQUEE_ITEMS } from "@/lib/content";

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  globe: GlobeIcon,
  smartphone: SmartphoneIcon,
  shield: ShieldIcon,
  briefcase: BriefcaseIcon,
  check: CheckIcon,
  trending: TrendingUpIcon,
  plus: PlusIcon,
  chat: ChatIcon,
};

export default function CaseMarquee() {
  return (
    <section
      className="flex h-[55px] items-center overflow-hidden bg-lime-500"
      aria-hidden="true"
    >
      <div
        className="marquee-track marquee-left items-center"
        style={{ ["--marquee-duration" as string]: "30s" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <span
                  key={`${copy}-${i}`}
                  className="flex shrink-0 items-center gap-5 px-7 text-brand-950"
                >
                  <span className="whitespace-nowrap font-display text-[18px] font-medium tracking-[-0.3px]">
                    {item.label}
                  </span>
                  {Icon && <Icon className="size-5 shrink-0" />}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
