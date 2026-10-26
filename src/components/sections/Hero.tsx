import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { HERO_STATS } from "@/lib/content";

/** Cells in the lattice that are painted a touch lighter, as in the design. */
const LIT_CELLS = [
  [16, 2],
  [17, 2],
  [3, 4],
  [18, 5],
  [2, 8],
  [3, 8],
  [17, 8],
  [1, 6],
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#02150e] pb-20 pt-[150px] sm:min-h-[640px] lg:h-[727px] lg:py-0"
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

      {/* nested lime glow, drifting */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute"
          style={{
            left: "-12.7%",
            top: "-24%",
            width: "68.9%",
            height: "88.4%",
            background:
              "radial-gradient(closest-side, rgba(196,212,52,0.55), rgba(196,212,52,0) 70%)",
            filter: "blur(40px)",
            animation: "glow-drift 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-5.1%",
            top: "-17.3%",
            width: "53.8%",
            height: "69%",
            background:
              "radial-gradient(closest-side, rgba(209,225,90,0.5), rgba(209,225,90,0) 70%)",
            filter: "blur(30px)",
            animation: "glow-drift 12s ease-in-out infinite 0.8s",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "4.2%",
            top: "-9.3%",
            width: "35.3%",
            height: "45.2%",
            background:
              "radial-gradient(closest-side, rgba(232,240,150,0.45), rgba(232,240,150,0) 70%)",
            filter: "blur(24px)",
            animation: "glow-drift 12s ease-in-out infinite 1.6s",
          }}
        />
      </div>

      {/* vignette so the lattice settles toward the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_45%,rgba(2,14,9,0.55)_100%)]"
      />

      {/* content sits ~26px below the optical centre, as in the design */}
      <div className="shell relative w-full lg:translate-y-[26px]">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          <p className="rise-in text-[12px] leading-4 tracking-[0.02em] text-lime-400">
            IT CONSULTING &amp; DEVELOPMENT
          </p>

          <h1
            className="rise-in t-hero mt-6 max-w-[900px] text-white"
            style={{ animationDelay: "80ms" }}
          >
            Services Built to Scale Your{" "}
            <span className="text-lime-400">Business</span>
          </h1>

          <p
            className="rise-in t-body-lg mt-7 max-w-[640px] text-ink-300"
            style={{ animationDelay: "200ms" }}
          >
            We are a full-service digital agency offering end-to-end design
            solutions from UI/UX and development to marketing and beyond.
            Everything you need to launch, grow, and scale.
          </p>

          <div
            className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-4"
            style={{ animationDelay: "320ms" }}
          >
            <PrimaryButton />
            <SecondaryButton />
          </div>

          <p
            className="rise-in mt-12 text-[14px] leading-5 text-ink-400"
            style={{ animationDelay: "460ms" }}
          >
            {HERO_STATS}
          </p>
        </div>
      </div>
    </section>
  );
}
