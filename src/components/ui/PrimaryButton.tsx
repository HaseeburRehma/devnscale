import DotMatrixArrow from "./DotMatrixArrow";

/**
 * Primary CTA.
 *
 * In Figma the 54px shell clips a column holding TWO 42px lime pills
 * separated by a 10px gap. Hovering rolls the column up by one pill + gap so
 * the second face takes over.
 *
 * Figma's second face uses a white label, but white on lime only reaches
 * ~1.9:1 contrast, so both faces keep the black label (~11:1). The hover
 * still reads through the roll, the lift and the lime glow.
 */
export default function PrimaryButton({
  children = "Start A Project",
  href = "/#contact",
  className = "",
  fullWidth = false,
  as = "a",
}: {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  fullWidth?: boolean;
  as?: "a" | "button";
}) {
  const Tag = as;
  return (
    <Tag
      {...(as === "a" ? { href } : { type: "submit" as const })}
      className={`group inline-flex h-[54px] ${
        fullWidth ? "w-full" : "w-[232px]"
      } max-w-full flex-col items-center overflow-hidden rounded-xl border border-ink-950 bg-gradient-to-b from-ink-800 to-ink-950 p-1.5 shadow-[0px_0px_12px_0.5px_rgba(10,10,10,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0px_6px_20px_1px_rgba(189,198,29,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 active:translate-y-0 ${className}`}
    >
      <span className="flex w-full flex-col gap-2.5 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[52px]">
        <Face>{children}</Face>
        <Face>{children}</Face>
      </span>
    </Tag>
  );
}

function Face({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block h-[42px] w-full shrink-0 overflow-hidden rounded-xl bg-lime-500 shadow-[0px_1px_5px_0.5px_rgba(238,243,188,0.25)]">
      {/* inner lime glow ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0px_0px_8px_1px_#eef3bc]"
      />
      <span className="absolute inset-y-0.5 left-0.5 right-0 flex items-center gap-3 pr-3">
        <DotMatrixArrow />
        <span className="min-w-0 flex-1 text-center font-display text-[17.053px] font-medium uppercase leading-[1.2] tracking-[-0.3553px] text-ink-950">
          {children}
        </span>
      </span>
    </span>
  );
}
