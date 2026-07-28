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
 * and cross at (centre, 95px) inside the 164px band. The dark ribbon paints
 * over the lime one at the intersection.
 */
const CROSS_Y = 95;
const BAND_H = 55;

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
      className={`marquee-host absolute left-[-15%] flex w-[130%] items-center overflow-hidden ${
        isLime ? "bg-lime-500" : "bg-brand-950"
      }`}
      style={{
        top: CROSS_Y,
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
      className="relative h-[164px] overflow-hidden bg-white"
      aria-hidden="true"
    >
      <Band tone="lime" direction="left" rotate={5} duration="38s" z={1} />
      <Band tone="dark" direction="right" rotate={-5} duration="32s" z={2} />
    </div>
  );
}
