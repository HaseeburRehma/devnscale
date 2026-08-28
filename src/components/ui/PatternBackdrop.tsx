/**
 * Brand-mark watermark background for dark sections (Process,
 * Testimonial, Footer, AboutJourney, ServiceDetail).
 *
 * Uses the exported Footer.jpg asset — a dark brand-950 background
 * with S-mark logo pattern tiles and a radial vignette that fades
 * the pattern toward the centre, keeping the focus area clean.
 *
 * Rendered as a CSS background-image (not next/image) because this
 * is a purely decorative layer that must load eagerly and cover
 * the section regardless of IntersectionObserver / lazy-load state.
 */

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
      style={{
        opacity,
        backgroundImage: "url(/Footer.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
