import Reveal from "@/components/ui/Reveal";
import InView from "@/components/motion/InView";
import { CASE_STUDY } from "@/lib/content";

const SWATCHES = [
  "#012a1c",
  "#0f5749",
  "#1e8c72",
  "#9cd6bc",
  "#bdc61d",
  "#eef3bc",
  "#1b1b1b",
  "#a3a3a3",
  "#f4f4f5",
];

const TYPE_ROWS = [
  { size: "text-[26px]", label: "Display" },
  { size: "text-[20px]", label: "Heading" },
  { size: "text-[16px]", label: "Body" },
  { size: "text-[13px]", label: "Caption" },
];

/** "DESIGN SYSTEM" — narrative + tags beside a colour/type specimen sheet. */
export default function CaseDesignSystem() {
  const { designSystem } = CASE_STUDY;
  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-[104px]">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* narrative */}
        <div>
          <Reveal>
            <p className="t-eyebrow">{designSystem.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-subsection mt-4 text-ink-900">{designSystem.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-5 max-w-[460px] text-text-secondary">
              {designSystem.body}
            </p>
          </Reveal>
        </div>

        {/* specimen sheet */}
        <InView>
          <div className="rounded-[24px] border border-border-subtle bg-white p-7 shadow-[0_10px_30px_rgba(25,33,61,0.06)] sm:p-9">
            <p className="text-[12px] font-medium tracking-[0.12em] text-text-muted">
              COLOR THEME
            </p>
            <div className="mt-4 grid grid-cols-9 gap-1.5">
              {SWATCHES.map((c) => (
                <span
                  key={c}
                  className="aspect-square rounded-md ring-1 ring-inset ring-black/5"
                  style={{ background: c }}
                />
              ))}
            </div>

            <p className="mt-8 text-[12px] font-medium tracking-[0.12em] text-text-muted">
              TYPOGRAPHY
            </p>
            <div className="mt-4 space-y-3">
              {TYPE_ROWS.map((row) => (
                <div key={row.label} className="flex items-baseline gap-4">
                  <span className="w-16 shrink-0 text-[11px] text-ink-400">
                    {row.label}
                  </span>
                  <span
                    className={`font-display font-medium tracking-[-0.02em] text-ink-900 ${row.size}`}
                  >
                    The quick brown fox jumps
                  </span>
                </div>
              ))}
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
