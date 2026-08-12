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
  device,
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  rounded?: string;
  tone?: "dark" | "light";
  device?: "laptop";
}) {
  const dark = tone === "dark";

  // Bare panel used both standalone and as the "screen" inside a laptop frame.
  const panel = (
    <div
      className={`relative overflow-hidden ${
        device ? "rounded-t-md" : rounded
      } ${dark ? "bg-gradient-to-br from-brand-800 to-brand-950" : "bg-ink-100"} ${
        device ? "size-full" : className
      }`}
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

  if (device !== "laptop") return panel;

  // Laptop mockup: browser chrome + screen + rounded lid + base bar.
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-x-0 top-0 bottom-[6%] rounded-lg bg-ink-800 shadow-[0_20px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
        <div className="flex h-7 items-center gap-1.5 rounded-t-md bg-ink-900 px-3">
          <span className="size-2 rounded-full bg-[#ff5f56]" />
          <span className="size-2 rounded-full bg-[#ffbd2e]" />
          <span className="size-2 rounded-full bg-[#27c93f]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-7">{panel}</div>
      </div>
      {/* laptop base */}
      <div className="absolute inset-x-[-4%] bottom-0 h-[6%] rounded-b-xl bg-gradient-to-b from-ink-300 to-ink-500 shadow-[0_10px_30px_rgba(0,0,0,0.15)]" />
      <div className="absolute inset-x-[42%] bottom-[calc(6%-4px)] h-1.5 rounded-b-md bg-ink-400" />
    </div>
  );
}
