import {
  BriefcaseIcon,
  ChatIcon,
  CheckIcon,
  GlobeIcon,
  PlusIcon,
  ShieldIcon,
  SmartphoneIcon,
  TrendingUpIcon,
} from "@/components/icons";
import { MARQUEE_ITEMS } from "@/lib/content";

const ICONS = {
  globe: GlobeIcon,
  smartphone: SmartphoneIcon,
  shield: ShieldIcon,
  briefcase: BriefcaseIcon,
  check: CheckIcon,
  trending: TrendingUpIcon,
  plus: PlusIcon,
  chat: ChatIcon,
};

/**
 * Measured from the Figma render: both ribbons are 55px thick, tilted ±5°,
 * crossing at the centre. The dark ribbon paints over the lime one there.
 *
 * A ±5° tilt makes each ribbon rise or fall by (width/2)·tan5° by the time it
 * reaches the viewport edge, so a fixed-height strip clips their far corners —
 * and worse the wider the screen. The strip height therefore tracks the
 * viewport: tan(5°) ≈ 0.0875, so it needs about 8.75vw plus the band
 * thickness, with a floor so it still reads on phones.
 */
const BAND_H = 55;
const STRIP_H = `max(120px, calc(9vw + ${BAND_H + 5}px))`;

function Band({
  tone,
  direction,
  rotate,
  duration,
  z,
}: {
  tone: "lime" | "dark";
  direction: "left" | "right";
  rotate: number;
  duration: string;
  z: number;
}) {
  const isLime = tone === "lime";
  return (
    <div
      className={`marquee-host absolute left-[-20%] top-1/2 flex w-[140%] items-center overflow-hidden ${
        isLime ? "bg-lime-500" : "bg-brand-950"
      }`}
      style={{
        height: BAND_H,
        zIndex: z,
        transform: `translateY(-50%) rotate(${rotate}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        className={`marquee-track ${
          direction === "left" ? "marquee-left" : "marquee-right"
        } items-center`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item, i) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS];
              return (
                <span
                  key={`${copy}-${i}`}
                  className={`flex shrink-0 items-center gap-5 px-7 ${
                    isLime ? "text-brand-950" : "text-lime-400"
                  }`}
                >
                  <span className="whitespace-nowrap font-display text-[18px] font-medium tracking-[-0.3px]">
                    {item.label}
                  </span>
                  <Icon className="size-5 shrink-0" />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two ribbons crossing in an X between the About and Services sections. */
export default function DiagonalMarquees() {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ height: STRIP_H }}
      aria-hidden="true"
    >
      <Band tone="lime" direction="left" rotate={5} duration="38s" z={1} />
      <Band tone="dark" direction="right" rotate={-5} duration="32s" z={2} />
    </div>
  );
}
