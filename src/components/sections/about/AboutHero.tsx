import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { ABOUT_HERO } from "@/lib/content";

/** Cells in the lattice painted a touch lighter, mirroring the home hero. */
const LIT_CELLS = [
  [16, 2],
  [3, 3],
  [18, 4],
  [2, 6],
  [17, 6],
];

/**
 * About-page hero. Same dark lattice + drifting lime glow as the home hero,
 * tuned a little calmer, with the headline accent word in lime and the three
 * about-page stats as a strip beneath the CTAs.
 */
export default function AboutHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#02150e] pb-20 pt-[150px] sm:min-h-[620px] lg:h-[653px] lg:py-0"
    >
      {/* 72.8px lattice */}
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

      {/* a handful of slightly-lit cells */}
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

      {/* nested lime glow, drifting — anchored right so it doesn't fight the
          copy, which is centred */}
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

      {/* vignette so the lattice settles toward the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_45%,rgba(2,14,9,0.6)_100%)]"
      />

      <div className="shell relative w-full">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          <p className="rise-in text-[12px] leading-4 tracking-[0.12em] text-lime-400">
            {ABOUT_HERO.eyebrow}
          </p>

          <h1
            className="rise-in t-hero mt-6 max-w-[900px] text-white"
            style={{ animationDelay: "80ms" }}
          >
            {ABOUT_HERO.titleLead}{" "}
            <span className="text-lime-400">{ABOUT_HERO.titleAccent}</span>
          </h1>

          <p
            className="rise-in t-body-lg mt-7 max-w-[620px] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            {ABOUT_HERO.subtitle}
          </p>

          <div
            className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ animationDelay: "320ms" }}
          >
            <PrimaryButton />
            <SecondaryButton />
          </div>
        </div>
      </div>
    </section>
  );
}
