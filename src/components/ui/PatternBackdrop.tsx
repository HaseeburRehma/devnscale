/**
 * Tiled "Logo Mark" watermark behind the dark sections (Process,
 * Testimonial, Footer).
 *
 * Matches the Figma reference: a subtle diagonal grid of the S mark
 * filled with a very-low-opacity lime that reads warm against the brand-
 * 900 backdrop, plus a hair-thin lime hairline so the shape doesn't
 * disappear on darker tones. Tile is 80×98 at slight rotation, dense
 * enough that you always see several marks in a single viewport.
 */
export default function PatternBackdrop({
  className = "",
  /** Overall alpha applied to the whole backdrop. Default matches Figma. */
  opacity = 0.08,
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
            width="80"
            height="98"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-6)"
          >
            <g transform="scale(1.05)" fill="#c4d434" stroke="#c4d434" strokeWidth="0.4">
              <path d="M30.4229 0.102539C30.8439 0.102552 31.2622 0.139011 31.6738 0.219727H31.6748C42.9886 2.42458 51 12.1004 50.9961 22.4492C50.992 34.7642 39.6358 45.7952 25.6514 44.998V33.3408C33.1445 34.029 39.1137 28.4119 39.1426 22.5488C39.1627 18.4164 36.2281 14.3377 31.7588 12.4668L31.3213 12.293C30.9157 12.1408 30.4845 12.0605 30.0508 12.0605H11.6592V16.5547C9.80528 17.665 7.49975 19.2827 5.16604 21.583C2.87481 23.8424 1.24063 26.0905 0.10256 27.9238V0.102539H30.4229Z" />
              <path d="M12.9961 19.4732C22.518 14.3157 31.756 17.1606 34.1299 18.0308C34.3723 18.1195 34.5845 18.2743 34.7471 18.4752L34.8135 18.564C35.4294 19.4611 36.647 21.6698 35.9756 24.4019C35.2678 27.2774 32.9749 28.6788 31.835 29.2125C31.4829 29.3771 31.0788 29.3889 30.7139 29.2506H30.7129C25.3487 27.2118 19.6151 27.9289 15.8447 31.2721C13.6241 33.2413 12.6161 35.6505 12.1445 37.2545L12.0566 37.564C11.9885 37.8175 11.9541 38.0797 11.9541 38.3433V50.8346H38.1562V45.6578C39.6616 45.0403 41.4194 44.1649 43.251 42.9058C46.4015 40.7411 48.54 38.2935 49.9092 36.4137V62.7945H0.102539L0.102539 36.9967C0.391056 35.5408 2.66465 25.0688 12.9961 19.4732Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dns-mark)" />
      </svg>
    </div>
  );
}
