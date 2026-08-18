import Image from "next/image";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIAL } from "@/lib/content";

export default function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-brand-900 section-y">
      <PatternBackdrop />

      <div className="shell relative flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <Reveal>
            <p className="text-[12px] leading-4 text-lime-400">CLIENT VOICES</p>
          </Reveal>

          <Reveal delay={0.06}>
            <blockquote className="mt-6 max-w-[788px] font-display text-[clamp(1.5rem,1.06rem+1.94vw,2rem)] font-medium leading-[1.25] tracking-[-0.5px] text-white">
              {TESTIMONIAL.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.12}>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="relative size-[52px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/15">
                <Image
                  src={TESTIMONIAL.image}
                  alt={TESTIMONIAL.name}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-[17px] font-medium text-white">
                  {TESTIMONIAL.name}
                </span>
                <span className="text-[14px] leading-5 text-ink-400">
                  {TESTIMONIAL.role}
                </span>
              </span>
            </figcaption>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full lg:w-[420px] lg:shrink-0">
          <div className="relative aspect-[420/500] w-full overflow-hidden rounded-[24px]">
            <Image
              src={TESTIMONIAL.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
              priority={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
