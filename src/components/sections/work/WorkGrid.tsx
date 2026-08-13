import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import Tilt from "@/components/motion/Tilt";
import { WORK } from "@/lib/content";

/**
 * The Work page portfolio grid — six case cards. Cover images are exported
 * from Figma with the category pill + lime arrow already baked in, so this
 * component renders the cover as-is and adds only the card body below
 * (project name, url + year, tag pills).
 */
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

        <AnimatedGroup className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {WORK.cases.map((c) => (
            <a key={c.name} href={c.href} className="group block">
              <Tilt max={5} className="[transform-style:preserve-3d]">
                <div className="overflow-hidden rounded-[20px] border border-border-subtle bg-white shadow-[0_10px_26px_0_rgba(5,28,18,0.06)] transition-[border-color,box-shadow] duration-300 group-hover:border-border-default group-hover:shadow-[0_18px_42px_rgba(5,28,18,0.12)]">
                  {/* Cover — badge + arrow are baked into the Figma export. */}
                  <div className="relative aspect-[624/368] w-full overflow-hidden">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes="(min-width: 768px) 624px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* Body */}
                  <div className="px-7 py-6">
                    <h3 className="t-h5 text-ink-950 transition-colors duration-300 group-hover:text-lime-700">
                      {c.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between gap-4 text-[14px]">
                      <span className="truncate font-medium text-ink-700">
                        {c.url}
                      </span>
                      <span className="shrink-0 text-ink-500">{c.year}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </a>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}
