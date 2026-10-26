import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import { TEAM_FOUNDER } from "@/lib/content";

/* Composition box from the Figma frame: 780 × 820, origin at x = -10. */
const W = 780;
const H = 820;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const box = (left: number, top: number, w: number, h = w) => ({
  left: pct(left, W),
  top: pct(top, H),
  width: pct(w, W),
  height: pct(h, H),
});

/* Right-hand tags anchor to the right edge so they stay inside on phones. */
const TAGS: ({ top: number } & ({ left: number } | { right: number }))[] = [
  { right: 62, top: 210 },
  { left: 51, top: 450 },
  { right: 70, top: 650 },
];

export default function TeamFounder() {
  const { eyebrow, title, body, photo, tags } = TEAM_FOUNDER;

  return (
    <section className="relative overflow-hidden bg-ink-50 pt-12 xl:min-h-[820px] xl:pt-0">
      <div className="relative mx-auto aspect-[780/820] w-full max-w-[560px] xl:absolute xl:left-[calc(50%-730px)] xl:top-0 xl:w-[780px] xl:max-w-none">
        <span
          aria-hidden="true"
          className="absolute rounded-full border border-lime-500/50"
          style={box(0, 80, 780)}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full border border-lime-500"
          style={box(60, 140, 660)}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full bg-brand-950"
          style={box(120, 200, 540)}
        />
        <span
          aria-hidden="true"
          className="absolute rounded-full bg-lime-500 opacity-35 blur-[56px]"
          style={box(230, 350, 320)}
        />
        <div className="absolute" style={box(120, 0, 540, 740)}>
          <Image
            src={photo}
            alt="Waseeq, founder and CEO of Dev N Scale"
            fill
            priority
            sizes="(min-width: 1280px) 540px, 70vw"
            className="object-contain"
          />
        </div>
        {tags.map((tag, i) => (
          <span
            key={tag}
            className="absolute flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-white py-[7px] pl-3 pr-3.5 text-[12px] font-medium leading-5 text-ink-900 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.08),0_4px_6px_-1px_rgba(0,0,0,0.06)] sm:py-[9px] sm:pl-[14px] sm:pr-4 sm:text-[14px]"
            style={{
              top: pct(TAGS[i].top, H),
              ...("left" in TAGS[i]
                ? { left: pct((TAGS[i] as { left: number }).left, W) }
                : { right: pct((TAGS[i] as { right: number }).right, W) }),
            }}
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-lime-500" />
            {tag}
          </span>
        ))}
      </div>

      <div className="shell relative pb-16 pt-10 xl:max-w-none xl:px-0 xl:pb-0 xl:pt-0">
        <div className="flex flex-col gap-[22px] xl:ml-[calc(50%+100px)] xl:w-[520px] xl:pt-[260px]">
          <Reveal>
            <p className="text-[12px] font-medium tracking-[1.5px] text-lime-700">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[18px] leading-7 text-text-secondary">{body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="pt-2">
              <PrimaryButton />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
