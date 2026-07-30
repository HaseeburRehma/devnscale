import {
  EyeIcon,
  PencilIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_VALUES } from "@/lib/content";

const ICONS = {
  eye: EyeIcon,
  pencil: PencilIcon,
  trending: TrendingUpIcon,
  users: UsersIcon,
} as const;

/**
 * "WHAT WE VALUE" — four principle cards. Each carries a dark icon chip with a
 * lime glyph; the card lifts and its chip warms to lime on hover.
 */
export default function AboutValues() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">WHAT WE VALUE</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-4 text-ink-900">What we care about.</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((value, i) => {
            const Icon = ICONS[value.icon];
            return (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="group h-full rounded-[20px] border border-border-subtle bg-ink-50 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-default hover:shadow-[0_12px_30px_rgba(25,33,61,0.08)]">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-b from-ink-800 to-ink-950 text-lime-400 shadow-[0_6px_16px_rgba(10,10,10,0.25)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="t-h6 mt-6 text-ink-900">{value.title}</h3>
                  <p className="t-body-sm mt-2.5 text-text-secondary">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
