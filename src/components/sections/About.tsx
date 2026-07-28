import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <Reveal>
            <p className="t-eyebrow">WHO WE ARE</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="t-subsection mt-5 text-text-primary">
              We Build Software That Scales
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-h2 mt-5 text-ink-900">
              A design-led software house. We take ideas from concept to
              production.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-5 space-y-7 text-[18px] leading-7 text-text-secondary">
              <p>
                Most software projects fail because they&apos;re built without
                understanding the people who&apos;ll use them. We start with
                strategy, layer in exceptional design, and execute with
                technical excellence.
              </p>
              <p>
                We&apos;ve spent 7+ years perfecting this approach. The result:
                500+ projects delivered. Clients in 50+ countries. A team that
                treats your software like it&apos;s our own.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="t-body mt-5 text-text-muted">
              Whether you&apos;re a startup raising capital or an enterprise
              scaling to millions of users, we build systems designed to last.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12">
              <PrimaryButton />
            </div>
          </Reveal>
        </div>

        {/* Right visual — the design ships this as an empty 480px rounded
            frame ("About image"), so it renders as a neutral image slot. */}
        <Reveal delay={0.15} className="w-full lg:w-[480px] lg:shrink-0">
          <div className="aspect-[480/560] w-full rounded-[24px] bg-ink-50 lg:aspect-auto lg:h-[560px]" />
        </Reveal>
      </div>
    </section>
  );
}
