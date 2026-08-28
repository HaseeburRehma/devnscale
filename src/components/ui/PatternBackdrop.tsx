/**
 * Brand-mark watermark background for dark sections (Process,
 * Testimonial, Footer, AboutJourney, ServiceDetail).
 *
 * Uses the exported Footer.jpg asset — a dark brand-950 background
 * with S-mark logo pattern tiles and a radial vignette that fades
 * the pattern toward the centre, keeping the focus area clean.
 *
 * The image covers the section absolutely and is purely decorative.
 */

import Image from "next/image";

export default function PatternBackdrop({
  className = "",
  /** Overall alpha applied to the whole pattern layer. */
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <Image
        src="/Footer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        quality={85}
        priority={false}
      />
    </div>
  );
}
