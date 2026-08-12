import Image from "next/image";
import { LinkedInIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ABOUT_TEAM } from "@/lib/content";

/** A distinct brand-tinted portrait wash per member, cycled by index. */
const TINTS = [
  "from-brand-700 to-brand-950",
  "from-ink-700 to-ink-950",
  "from-brand-800 to-brand-950",
  "from-lime-700 to-brand-950",
];

/**
 * "OUR TEAM" — the people grid. The design ships photo cards; without shipped
 * portraits we render branded monogram tiles (gradient wash + initials) that
 * lift on hover and reveal a LinkedIn affordance, so the slot looks
 * deliberate. Swap the tile for <Image> once portraits are supplied.
 */
export default function AboutTeam() {
  const { eyebrow, title, subtitle, members, hiring } = ABOUT_TEAM;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="t-eyebrow">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-subsection mt-4 text-ink-900">{title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-body max-w-[320px] text-text-secondary lg:text-right">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group">
                <div
                  className={`relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-gradient-to-br ${
                    TINTS[i % TINTS.length]
                  } transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* branded monogram fallback until a portrait is supplied */
                    <span className="absolute inset-0 flex items-center justify-center font-display text-[64px] font-bold tracking-[-0.03em] text-white/90 transition-transform duration-500 group-hover:scale-105">
                      {member.initials}
                    </span>
                  )}

                  {/* subtle sheen */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 80% 0%, rgba(196,212,52,0.22), rgba(196,212,52,0) 55%)",
                    }}
                  />

                  {/* LinkedIn affordance */}
                  <a
                    href={member.linkedin || "#"}
                    aria-label={`${member.name} on LinkedIn`}
                    className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-lime-400 text-brand-950 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-lime-300"
                  >
                    <LinkedInIcon className="size-[18px]" />
                  </a>
                </div>

                <h3 className="t-h6 mt-4 text-ink-900">{member.name}</h3>
                <p className="t-body-sm mt-0.5 text-text-muted">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* hiring card */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[20px] bg-brand-900 p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-[560px]">
              <h3 className="t-h3 text-white">{hiring.title}</h3>
              <p className="t-body mt-2 text-ink-300">{hiring.body}</p>
            </div>
            <PrimaryButton href="/contact">Apply To Join Us</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
