/**
 * Tiled "Logo Mark" watermark behind the dark sections (Process,
 * Testimonial, Footer, AboutJourney).
 *
 * Matches the Figma reference — larger outlined tiles instead of the
 * old dense fill:
 *   • rounded-rectangle container the size of an app-icon
 *   • S curve inside, outline only
 *   • arrow badge at the top-right, outline only
 * The tile rotates ~-8° and repeats at 300×300 so a full desktop
 * viewport shows ~4 marks wide and 3 rows tall, matching the Figma
 * mock. Stroke is a hair-thin lime hairline on brand-900, and the
 * whole layer is composited under `opacity` for the ghosted feel.
 */

/* Mark path metrics — the S curve is designed inside a 51×63 box, with
 * a 42×42 arrow badge sitting at its top-right. Both live inside a
 * 64×64 rounded-square container so a tile has an obvious silhouette
 * even when the strokes fall on the darker patches. */
const MARK_WIDTH = 64;

/** Rounded-rect container that gives each tile its app-icon silhouette. */
const CONTAINER = "M 6 0 L 58 0 A 6 6 0 0 1 64 6 L 64 58 A 6 6 0 0 1 58 64 L 6 64 A 6 6 0 0 1 0 58 L 0 6 A 6 6 0 0 1 6 0 Z";

/** The S curve, outline only (paths from icon.svg, scaled to fit inside
 *  the container with a little breathing room). */
const S_CURVE_A =
  "M30.4229 5.10254C30.8439 5.10255 31.2622 5.13901 31.6738 5.21973H31.6748C42.9886 7.42458 51 17.1004 50.9961 27.4492C50.992 39.7642 39.6358 50.7952 25.6514 49.998V38.3408C33.1445 39.029 39.1137 33.4119 39.1426 27.5488C39.1627 23.4164 36.2281 19.3377 31.7588 17.4668L31.3213 17.293C30.9157 17.1408 30.4845 17.0605 30.0508 17.0605H11.6592V21.5547C9.80528 22.665 7.49975 24.2827 5.16604 26.583C2.87481 28.8424 1.24063 31.0905 0.10256 32.9238V5.10254H30.4229Z";
const S_CURVE_B =
  "M12.9961 24.4732C22.518 19.3157 31.756 22.1606 34.1299 23.0308C34.3723 23.1195 34.5845 23.2743 34.7471 23.4752L34.8135 23.564C35.4294 24.4611 36.647 26.6698 35.9756 29.4019C35.2678 32.2774 32.9749 33.6788 31.835 34.2125C31.4829 34.3771 31.0788 34.3889 30.7139 34.2506H30.7129C25.3487 32.2118 19.6151 32.9289 15.8447 36.2721C13.6241 38.2413 12.6161 40.6505 12.1445 42.2545L12.0566 42.564C11.9885 42.8175 11.9541 43.0797 11.9541 43.3433V55.8346H38.1562V50.6578C39.6616 50.0403 41.4194 49.1649 43.251 47.9058C46.4015 45.7411 48.54 43.2935 49.9092 41.4137V57.7945H0.102539L0.102539 41.9967C0.391056 40.5408 2.66465 30.0688 12.9961 24.4732Z";

/** Arrow badge outline sitting at the top-right of each tile. */
const ARROW = "M 38 8 L 60 8 L 60 30 M 60 8 L 38 30";

export default function PatternBackdrop({
  className = "",
  /** Overall alpha applied to the whole backdrop. Default matches Figma. */
  opacity = 0.05,
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
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="dns-mark"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <g
              /* Center the 64×64 mark inside the 280 tile so the surrounding
               * negative space matches the airy Figma spacing. */
              transform={`translate(${(280 - 260) / 2} ${(280 - 260) / 2}) scale(${260 / MARK_WIDTH})`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.55"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={CONTAINER} />
              <path d={S_CURVE_A} />
              <path d={S_CURVE_B} />
              <path d={ARROW} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dns-mark)" />
      </svg>
    </div>
  );
}
