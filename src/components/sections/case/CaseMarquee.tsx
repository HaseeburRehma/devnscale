const ITEMS = [
  { label: "Perfect Design", icon: "perfect-design" },
  { label: "Smart Growth", icon: "smart-growth" },
  { label: "Scale Fast", icon: "scale-fast" },
  { label: "App Performance", icon: "app-performance" },
  { label: "Raise Capital", icon: "raise-capital" },
  { label: "Zero Bugs", icon: "zero-bugs" },
  { label: "Crypto Vision", icon: "crypto-vision" },
  { label: "Smart Chat", icon: "smart-chat" },
];

/** Figma "Slider" component: one straight 56px lime strip. */
export default function CaseMarquee() {
  return (
    <section
      className="flex h-[56px] items-center overflow-hidden bg-lime-500"
      aria-hidden="true"
    >
      <div
        className="marquee-track marquee-left items-center"
        style={{ ["--marquee-duration" as string]: "40s" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {ITEMS.map((item) => (
              <span
                key={`${copy}-${item.label}`}
                className="flex shrink-0 items-center gap-4 px-9 text-[#012a1c]"
              >
                <span className="whitespace-nowrap font-display text-[20px] font-medium leading-[28px]">
                  {item.label}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/img/slider/${item.icon}.svg`}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
