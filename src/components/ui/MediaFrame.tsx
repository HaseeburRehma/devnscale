import Image from "next/image";
import PatternBackdrop from "@/components/ui/PatternBackdrop";

/**
 * A media slot. The Figma case-study ships product shots and photos as empty
 * frames, so until real assets exist this renders a branded panel (brand
 * gradient + logo-mark watermark + lime corner glow + optional label). Pass
 * `src` to drop in a real image with no layout change.
 */
export default function MediaFrame({
  src,
  alt = "",
  label,
  className = "",
  rounded = "rounded-[24px]",
  tone = "dark",
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  rounded?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${
        dark ? "bg-gradient-to-br from-brand-800 to-brand-950" : "bg-ink-100"
      } ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      ) : (
        <>
          <PatternBackdrop opacity={dark ? 0.08 : 0.04} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56"
            style={{
              background:
                "radial-gradient(closest-side, rgba(196,212,52,0.28), rgba(196,212,52,0) 70%)",
              filter: "blur(20px)",
            }}
          />
          {label && (
            <span
              className={`absolute bottom-5 left-5 rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
                dark ? "bg-white/10 text-ink-100" : "bg-white text-ink-700 shadow-sm"
              }`}
            >
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
