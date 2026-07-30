import { ArrowRightIcon, CalendarIcon } from "@/components/icons";

/**
 * Secondary CTA, in the two variants the design uses:
 *
 *  - `dark`  (hero, footer): #08120e fill, lime hairline, calendar icon.
 *  - `light` (project cards): white fill, neutral hairline, arrow icon.
 *
 * Both share the hover Figma draws — a full-height panel parked at the left
 * edge with width 0 that wipes across to invert the button.
 */
export default function SecondaryButton({
  children = "Book a Consultation",
  href = "/#contact",
  variant = "dark",
  className = "",
}: {
  children?: React.ReactNode;
  href?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const isDark = variant === "dark";
  const Icon = isDark ? CalendarIcon : ArrowRightIcon;

  return (
    <a
      href={href}
      className={`group relative inline-flex h-[54px] items-center gap-[6.429px] overflow-hidden rounded-xl border-[0.643px] px-[16.714px] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 active:translate-y-0 ${
        isDark
          ? "border-lime-100 bg-[#08120e]"
          : "border-border-default bg-white"
      } ${className}`}
    >
      {/* wipe fill */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 rounded-xl transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
          isDark ? "bg-white" : "bg-[#08120e]"
        }`}
      />
      <span
        className={`relative whitespace-nowrap font-display text-[15.43px] font-medium uppercase leading-[20.571px] tracking-[-0.5px] transition-colors duration-300 ${
          isDark
            ? "text-white group-hover:text-ink-950"
            : "text-ink-950 group-hover:text-white"
        }`}
      >
        {children}
      </span>
      <Icon
        className={`relative size-[15.429px] shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-0.5 ${
          isDark
            ? "text-lime-400 group-hover:text-ink-950"
            : "text-ink-950 group-hover:text-lime-400"
        }`}
      />
    </a>
  );
}
