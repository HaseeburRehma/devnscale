import Image from "next/image";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Magnetic from "@/components/motion/Magnetic";
import TextEffect from "@/components/motion/TextEffect";

const LIT_CELLS = [
  [16, 2],
  [3, 3],
  [18, 4],
  [2, 6],
  [17, 6],
];

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
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  size?: "lg" | "sm";
  showSecondary?: boolean;
  backgroundImage?: string;
  eyebrowClassName?: string;
}) {
  const sm = size === "sm";
  const hasImage = Boolean(backgroundImage);
  return (
    <section
      id="top"
      className={`relative isolate flex items-center overflow-hidden bg-[#02150e] pb-16 pt-[150px] ${
        sm ? "min-h-[500px] lg:h-[557px]" : "min-h-[560px] lg:h-[653px]"
      } lg:py-0`}
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
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              backgroundColor: "#02150e",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "72.8px 72.8px",
              backgroundPosition: "28px 4px",
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            {LIT_CELLS.map(([cx, cy], i) => (
              <span
                key={i}
                className="absolute bg-white/[0.022]"
                style={{
                  left: 28 + cx * 72.8,
                  top: 4 + cy * 72.8,
                  width: 72.8,
                  height: 72.8,
                }}
              />
            ))}
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute"
              style={{
                right: "-14%",
                top: "-26%",
                width: "60%",
                height: "82%",
                background:
                  "radial-gradient(closest-side, rgba(196,212,52,0.4), rgba(196,212,52,0) 70%)",
                filter: "blur(48px)",
                animation: "glow-drift 14s ease-in-out infinite",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "-8%",
                bottom: "-30%",
                width: "44%",
                height: "60%",
                background:
                  "radial-gradient(closest-side, rgba(30,140,114,0.45), rgba(30,140,114,0) 70%)",
                filter: "blur(40px)",
                animation: "glow-drift 14s ease-in-out infinite 1.2s",
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_45%,rgba(2,14,9,0.6)_100%)]"
          />
        </>
      )}

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          <p
            className={`rise-in text-[12px] leading-4 tracking-[0.12em] ${
              eyebrowClassName ?? "text-lime-400"
            }`}
          >
            {eyebrow}
          </p>

          <TextEffect
            as="h1"
            text={title}
            accent={accent}
            perCharacter
            className={`mt-6 max-w-[1200px] text-balance text-white ${
              sm ? "t-subsection" : "t-page-hero"
            }`}
          />

          <p
            className="rise-in t-body-lg mt-7 max-w-[620px] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {subtitle}
          </p>

          <div
            className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "320ms" }}
          >
            <Magnetic>
              <PrimaryButton />
            </Magnetic>
            {showSecondary && (
              <Magnetic>
                <SecondaryButton />
              </Magnetic>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
