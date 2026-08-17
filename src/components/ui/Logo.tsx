import Image from "next/image";

/**
 * Brand lockup — the S mark + "Dev n Scale" wordmark + tagline, exported as
 * a single PNG (`public/img/logos/lockup.png`, 188×54).
 *
 * The mark carries a `scrolled` prop the nav flips as the user scrolls;
 * on the transparent hero-glass state it renders untouched, and once the
 * nav settles onto the solid dark backdrop we bump brightness slightly so
 * it doesn't disappear into the darker fill.
 *
 * `withTagline` is kept for API compatibility. The tagline is baked into
 * the exported image, so it's a no-op today — flip if a future export
 * ships a mark-only variant.
 */
export default function Logo({
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
      className={`group flex shrink-0 items-center ${className}`}
    >
      <Image
        src="/img/logos/lockup.png"
        alt="Dev n Scale"
        width={188}
        height={54}
        priority
        className={`h-11 w-auto shrink-0 transition-[transform,filter] duration-300 group-hover:scale-[1.03] sm:h-12 ${
          scrolled ? "brightness-110" : ""
        }`}
      />
    </a>
  );
}
