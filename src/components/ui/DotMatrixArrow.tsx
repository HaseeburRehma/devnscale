/**
 * The LED dot-matrix chip that sits inside the primary button.
 *
 * Geometry is lifted directly from the Figma vectors:
 *  - 3px dot pitch on both axes, dot radius 0.65
 *  - base field: 13 rows of #404040 dots filling the 48x38 chip
 *  - arrow field: a ">" chevron, 7 rows tall, repeating every 6 columns,
 *    drawn in #9ca718 and offset 8px from the chip top
 *
 * The chevron tile is 18px wide (6 cols x 3px), so translating the arrow
 * layer by exactly one tile loops seamlessly.
 */

const PITCH = 3;
const DOT_R = 0.85;
const CHIP_W = 48;
const CHIP_H = 38;

/** Rendered dot colours, sampled from the Figma export (the lit dots pick up
 *  the button's lime glow, so they read brighter than the raw vector fill). */
const BASE_FILL = "#3d3d3d";
const LIT_FILL = "#cdd35f";

/** Column offsets lit per row within one 6-column chevron period. */
const CHEVRON_ROWS = [
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5],
  [2, 3, 4],
  [1, 2, 3],
  [0, 1, 2],
];

const BASE_COLS = Math.ceil(CHIP_W / PITCH) + 2;
const BASE_ROWS = Math.ceil(CHIP_H / PITCH);

/** Enough chevron periods to cover the chip plus one extra tile to scroll in. */
const ARROW_PERIODS = Math.ceil(CHIP_W / (6 * PITCH)) + 2;

function baseDots() {
  const dots: React.ReactElement[] = [];
  for (let r = 0; r < BASE_ROWS; r++) {
    for (let c = 0; c < BASE_COLS; c++) {
      dots.push(
        <circle
          key={`b${r}-${c}`}
          cx={c * PITCH + 1}
          cy={r * PITCH + 1}
          r={DOT_R}
          fill={BASE_FILL}
        />,
      );
    }
  }
  return dots;
}

function arrowDots() {
  const dots: React.ReactElement[] = [];
  for (let p = 0; p < ARROW_PERIODS; p++) {
    CHEVRON_ROWS.forEach((cols, r) => {
      cols.forEach((c) => {
        dots.push(
          <circle
            key={`a${p}-${r}-${c}`}
            cx={(p * 6 + c) * PITCH + 1}
            cy={r * PITCH + 1}
            r={DOT_R}
            fill={LIT_FILL}
          />,
        );
      });
    });
  }
  return dots;
}

const BASE_DOTS = baseDots();
const ARROW_DOTS = arrowDots();

export default function DotMatrixArrow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`relative block h-[38px] w-12 shrink-0 overflow-hidden rounded-[10px] border border-[#0b0b0b] bg-ink-900 shadow-[0px_0px_12px_0.5px_rgba(10,10,10,0.4)] ${className}`}
      aria-hidden="true"
    >
      {/* static dark dot field */}
      <svg
        className="absolute inset-0"
        width={CHIP_W}
        height={CHIP_H}
        viewBox={`0 0 ${CHIP_W} ${CHIP_H}`}
      >
        {BASE_DOTS}
      </svg>

      {/* chevrons marching right */}
      <svg
        className="animate-dot-march absolute left-0 top-2"
        width={ARROW_PERIODS * 6 * PITCH}
        height={7 * PITCH}
        viewBox={`0 0 ${ARROW_PERIODS * 6 * PITCH} ${7 * PITCH}`}
      >
        {ARROW_DOTS}
      </svg>
    </span>
  );
}
