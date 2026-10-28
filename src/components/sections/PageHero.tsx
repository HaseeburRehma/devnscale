import Image from "next/image";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Magnetic from "@/components/motion/Magnetic";
import TextEffect from "@/components/motion/TextEffect";

/**
 * Shared inner-page hero: the dark lattice + drifting lime glow from the home
 * hero, with a word-staggered headline (optional lime accent tail), subtitle,
 * and magnetic CTAs. `size="sm"` is the tighter case-study variant.
 *
 * `backgroundImage` swaps the site-default grid+glow for a full-bleed image
 * (used by each case-study page to render its own Figma hero background).
 * When set, `eyebrowClassName` also lets a case override the eyebrow color so
 * it stays legible against non-green backgrounds.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  size = "lg",
  showSecondary = true,
  backgroundImage,
  eyebrowClassName,
  primary = { label: "Start A Project", href: "/contact" },
  meta,
  lgHeight,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  size?: "lg" | "sm";
  showSecondary?: boolean;
  backgroundImage?: string;
  eyebrowClassName?: string;
  /** Primary CTA; `null` hides it (and the action row when there's no secondary). */
  primary?: { label: string; href: string } | null;
  /** Extra row under the subtitle, e.g. an article's author and date. */
  meta?: React.ReactNode;
  /** Desktop height from the page's Figma frame; defaults to 653 (557 for sm). */
  lgHeight?: number;
}) {
  const sm = size === "sm";
  const hasImage = Boolean(backgroundImage);
  return (
    <section
      id="top"
      className={`relative isolate flex items-center overflow-hidden bg-[#02150e] pb-12 pt-[110px] sm:pb-16 sm:pt-[130px] ${
        sm
          ? "min-h-[440px] sm:min-h-[500px] lg:h-[557px] lg:pt-[74px]"
          : `min-h-[500px] sm:min-h-[560px] lg:items-start lg:pt-[170px] ${lgHeight ? "lg:h-[var(--hero-h)] lg:min-h-0" : "lg:h-[653px]"}`
      } lg:pb-0`}
      style={lgHeight ? ({ "--hero-h": `${lgHeight}px` } as React.CSSProperties) : undefined}
    >
      {hasImage ? (
        <>
          <Image
            src={backgroundImage!}
            alt=""
            fill
            priority
            aria-hidden="true"
            sizes="100vw"
            className="-z-20 object-cover"
          />
          {/* subtle darkening from the bottom so the CTAs stay legible on
           *  bright backgrounds (the OpulenceX gradient especially). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.35)_100%)]"
          />
        </>
      ) : (
        <Image
          src="/img/hero-grid.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          sizes="100vw"
          className="-z-20 object-cover object-top"
        />
      )}

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <p
            className={`rise-in text-[12px] font-medium leading-4 tracking-[1.5px] ${
              eyebrowClassName ?? "text-lime-300"
            }`}
          >
            {eyebrow}
          </p>

          <TextEffect
            as="h1"
            text={title}
            accent={accent}
            perCharacter
            className={`mt-7 text-white ${
              sm ? "t-subsection" : "t-page-hero"
            }`}
          />

          <p
            className="rise-in mt-7 text-[18px] leading-[1.55] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {subtitle}
          </p>

          {meta && (
            <div className="rise-in mt-7" style={{ animationDelay: "260ms" }}>
              {meta}
            </div>
          )}

          {(primary || showSecondary) && (
            <div
              className="rise-in mt-7 flex flex-col items-center gap-4 sm:flex-row"
              style={{ animationDelay: "320ms" }}
            >
              {primary && (
                <Magnetic>
                  <PrimaryButton href={primary.href}>{primary.label}</PrimaryButton>
                </Magnetic>
              )}
              {showSecondary && (
                <Magnetic>
                  <SecondaryButton />
                </Magnetic>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
