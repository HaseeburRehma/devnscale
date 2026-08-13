"use client";

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
 * "OUR TEAM" — a horizontal marquee of member cards, matching the Figma
 * Teams frame where the six-member set repeats so it reads as an endless
 * roster of "the people you meet are the people who build".
 *
 * The track duplicates the members once and slides at 45 s per full loop.
 * Hovering the track pauses the animation; individual cards keep their
 * hover lift + LinkedIn reveal.
 */
export default function AboutTeam() {
  const { eyebrow, title, subtitle, members, hiring } = ABOUT_TEAM;
  // Duplicate the member list so a full 50% translate loops seamlessly.
  const roster = [...members, ...members];

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-[104px]">
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
      </div>

      {/* Marquee — sits outside `.shell` so it bleeds full width */}
      <div className="marquee-host relative mt-12 overflow-hidden">
        {/* edge fades to soften the wrap */}
        <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div
          className="marquee-track marquee-left flex gap-6"
          style={{ ["--marquee-duration" as string]: "45s" }}
        >
          {roster.map((member, i) => (
            <MemberCard
              key={`${member.name}-${i}`}
              member={member}
              tintIndex={i % members.length}
              ariaHidden={i >= members.length}
            />
          ))}
        </div>
      </div>

      <div className="shell">
        {/* hiring card */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[20px] bg-brand-900 p-8 sm:flex-row sm:items-center sm:p-10">
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

function MemberCard({
  member,
  tintIndex,
  ariaHidden,
}: {
  member: (typeof ABOUT_TEAM)["members"][number];
  tintIndex: number;
  ariaHidden: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="group w-[280px] shrink-0 sm:w-[320px]"
    >
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-gradient-to-br ${
          TINTS[tintIndex % TINTS.length]
        } transition-transform duration-300 group-hover:-translate-y-1`}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
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

        {/* LinkedIn affordance — hidden when no real profile URL is set. */}
        {member.linkedin && member.linkedin !== "#" ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-lime-400 text-brand-950 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-lime-300"
          >
            <LinkedInIcon className="size-[18px]" />
          </a>
        ) : null}
      </div>

      <h3 className="t-h6 mt-4 text-ink-900">{member.name}</h3>
      <p className="t-body-sm mt-0.5 text-text-muted">{member.role}</p>
    </div>
  );
}
