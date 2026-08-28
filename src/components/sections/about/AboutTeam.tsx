"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ABOUT_TEAM } from "@/lib/content";

/**
 * "OUR TEAM" — a 4-column grid of member cards with staggered reveal
 * animations. Each card shows name + role on top, then the portrait
 * inside a decorative concentric-circle frame (matching the Figma
 * Teams frame 5746:54789).
 *
 * No marquee — the grid stays still, each card fades + slides up on
 * scroll with a staggered delay so the row reads left-to-right.
 */
export default function AboutTeam() {
  const { eyebrow, title, subtitle, members, hiring } = ABOUT_TEAM;

  return (
    <section id="team" className="overflow-hidden bg-white section-y">
      <div className="shell">
        {/* Header row */}
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

        {/* Member grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>

        {/* Hiring card */}
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

/** Concentric ring sizes (% of container width) — matching Figma Group 1
 *  with four ellipses that create the decorative circular frame. */
const RINGS = [100, 76, 53.5, 32.2];

function MemberCard({
  member,
}: {
  member: (typeof ABOUT_TEAM)["members"][number];
}) {
  return (
    <div className="group w-full">
      {/* Name + Role — above the photo, matching Figma */}
      <div className="mb-3 pl-2">
        <h3 className="font-display text-[clamp(1.125rem,0.9rem+0.8vw,1.375rem)] font-semibold uppercase tracking-[-0.01em] text-ink-900">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[14px] leading-5 text-text-muted">
          {member.role}
        </p>
      </div>

      {/* Photo with concentric circle decoration */}
      <div className="relative aspect-[285/378] w-full overflow-hidden">
        {/* Concentric rings — decorative */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {RINGS.map((size, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute rounded-full border border-ink-200/30"
              style={{
                width: `${size}%`,
                height: `${size}%`,
              }}
            />
          ))}
        </div>

        {/* Portrait image */}
        {member.photo ? (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 310px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-[64px] font-bold tracking-[-0.03em] text-ink-300">
            {member.initials}
          </span>
        )}
      </div>
    </div>
  );
}
