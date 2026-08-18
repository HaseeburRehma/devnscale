/**
 * Tiled brand-mark watermark behind the dark sections (Process,
 * Testimonial, Footer, AboutJourney).
 *
 * Matches the Figma reference (frame 4418:594):
 *   • large circular container per tile (not the rounded-square I had
 *     before — the Figma clearly rings each mark in a full circle),
 *   • S curve + arrow badge inside, all outlined,
 *   • hair-thin white stroke (~0.18px per the design token),
 *   • tiles are big (320×320) so a desktop viewport shows ~4–5 rings
 *     wide and ~3 tall,
 *   • a linear-gradient overlay solidifies the middle band with
 *     brand-950 so headlines land on clean green — pattern reads at
 *     the top and bottom edges the way the Figma section does.
 */

const MARK_WIDTH = 64;

/** S curve — outline only. */
const S_CURVE_A =
  "M30.4229 5.10254C30.8439 5.10255 31.2622 5.13901 31.6738 5.21973H31.6748C42.9886 7.42458 51 17.1004 50.9961 27.4492C50.992 39.7642 39.6358 50.7952 25.6514 49.998V38.3408C33.1445 39.029 39.1137 33.4119 39.1426 27.5488C39.1627 23.4164 36.2281 19.3377 31.7588 17.4668L31.3213 17.293C30.9157 17.1408 30.4845 17.0605 30.0508 17.0605H11.6592V21.5547C9.80528 22.665 7.49975 24.2827 5.16604 26.583C2.87481 28.8424 1.24063 31.0905 0.10256 32.9238V5.10254H30.4229Z";
const S_CURVE_B =
  "M12.9961 24.4732C22.518 19.3157 31.756 22.1606 34.1299 23.0308C34.3723 23.1195 34.5845 23.2743 34.7471 23.4752L34.8135 23.564C35.4294 24.4611 36.647 26.6698 35.9756 29.4019C35.2678 32.2774 32.9749 33.6788 31.835 34.2125C31.4829 34.3771 31.0788 34.3889 30.7139 34.2506H30.7129C25.3487 32.2118 19.6151 32.9289 15.8447 36.2721C13.6241 38.2413 12.6161 40.6505 12.1445 42.2545L12.0566 42.564C11.9885 42.8175 11.9541 43.0797 11.9541 43.3433V55.8346H38.1562V50.6578C39.6616 50.0403 41.4194 49.1649 43.251 47.9058C46.4015 45.7411 48.54 43.2935 49.9092 41.4137V57.7945H0.102539L0.102539 41.9967C0.391056 40.5408 2.66465 30.0688 12.9961 24.4732Z";

/** Arrow badge outline at the top-right corner of each tile. */
const ARROW = "M 38 8 L 60 8 L 60 30 M 60 8 L 38 30";

export default function PatternBackdrop({
  className = "",
  /** Overall alpha applied to the whole pattern layer. */
  opacity = 0.12,
  /** When true, layer a 180° linear gradient over the pattern that lets
   *  the marks read at the top/bottom of the section and fades them
   *  behind a solid brand-950 band across the middle (per Figma spec).
   *  Turn off for sections where you want the pattern edge-to-edge. */
  gradient = true,
}: {
  className?: string;
  opacity?: number;
  gradient?: boolean;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        style={{ opacity }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="dns-mark"
              width="320"
              height="320"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-6)"
            >
              {/* Circular container — Figma tiles are rings, not
               *  rounded-squares. Center of a 320 tile at (160,160)
               *  with r=155 so adjacent circles just kiss. */}
              <circle
                cx="160"
                cy="160"
                r="155"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.18"
              />

              {/* Mark inside — center a 64×64 unit and scale to ~240px so
               *  the S sits comfortably inside the ring. */}
              <g
                transform={`translate(${(320 - 240) / 2} ${(320 - 240) / 2}) scale(${240 / MARK_WIDTH})`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.18"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={S_CURVE_A} />
                <path d={S_CURVE_B} />
                <path d={ARROW} />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dns-mark)" />
        </svg>
      </div>

      {/* Figma overlay — solid brand-950 band in the middle so main
       *  content sits on clean green while the pattern reads at the
       *  section top and bottom. Matches the design token spec:
       *  linear-gradient(180deg, rgba(1,42,28,0) 0%, #012A1C 47.6%,
       *  rgba(1,42,28,0) 100%). */}
      {gradient ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(1,42,28,0) 0%, #012a1c 47.6%, rgba(1,42,28,0) 100%)",
          }}
        />
      ) : null}
    </>
  );
}
