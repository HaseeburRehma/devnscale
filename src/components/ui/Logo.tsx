import Image from "next/image";

/**
 * Brand lockup from the Figma "Logo Brief": the vector mark (pale-lime rounded
 * square + black S + lime arrow) beside the "Dev n Scale" wordmark, with the
 * "Built · System · Growth" tagline.
 *
 * The mark carries a `scrolled` prop the nav flips as the user scrolls: on the
 * transparent hero-glass state it lets the pale-lime fill through, and when
 * the nav settles onto its solid dark backdrop it swaps to a white-tinted
 * fill so it still pops. Purely visual, doesn't affect layout.
 */
export default function Logo({
  withTagline = true,
  href = "/",
  className = "",
  scrolled = false,
}: {
  withTagline?: boolean;
  href?: string;
  className?: string;
  scrolled?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label="Dev n Scale — home"
      className={`group flex shrink-0 items-center gap-2.5 ${className}`}
    >
      {/* Two stacked marks cross-fade on scroll — same SVG, only its container
          filter changes, so no re-layout and no icon flicker. */}
      <span className="relative h-[36px] w-[34px] transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/img/logos/mark.svg"
          alt=""
          width={34}
          height={36}
          priority
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src="/img/logos/mark.svg"
          alt=""
          width={34}
          height={36}
          priority
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            // Desaturate the pale-lime fill so it reads pure white on the
            // solid nav; the black S + lime arrow retain their contrast.
            filter: "saturate(0) brightness(1.08)",
          }}
        />
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-[20px] font-bold tracking-[-0.3px] text-white">
          Dev n <span className="text-lime-400">Scale</span>
        </span>
        {withTagline && (
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-ink-400">
            Built · System · Growth
          </span>
        )}
      </span>
    </a>
  );
}
