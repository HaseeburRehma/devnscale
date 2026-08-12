import Reveal from "@/components/ui/Reveal";
import { CASE_STUDY } from "@/lib/content";

/** The 4-column meta strip under the case-study hero (Year / Services / …). */
export default function CaseMeta() {
  return (
    <section className="border-b border-border-subtle bg-white">
      <div className="shell grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4 sm:divide-x sm:divide-border-subtle">
        {CASE_STUDY.meta.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06} className="sm:px-8 sm:first:pl-0">
            <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-medium leading-tight text-ink-900">
              {m.value}
            </p>
            <p className="mt-2 text-[12px] tracking-[0.12em] text-text-muted">
              {m.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
