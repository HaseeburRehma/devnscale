"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_TEAM } from "@/lib/content";

/**
 * "OUR TEAM" — 4-column grid of member cards matching the Figma Teams
 * frame (5746:54789). Each card is a white rounded container with name +
 * role on top, then the portrait over a dark-green background with
 * blurred concentric gradient rings (dark → brand-950 → lime → cream).
 */
export default function AboutTeam() {
  const { eyebrow, title, subtitle, members } = ABOUT_TEAM;

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
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  member,
}: {
  member: (typeof ABOUT_TEAM)["members"][number];
}) {
  return (
    <div className="group overflow-hidden rounded-[20px] border border-ink-200 bg-white px-3 py-2">
      {/* Name + Role */}
      <div className="px-1 py-2">
        <h3 className="font-display text-[clamp(1.125rem,0.9rem+0.8vw,1.5rem)] font-medium uppercase leading-[32px] tracking-[-0.5px] text-ink-900">
          {member.name}
        </h3>
        <p className="text-[14px] leading-5 text-ink-500">
          {member.role}
        </p>
      </div>

      {/* Photo container — dark green bg with gradient concentric rings */}
      <div className="relative h-[320px] overflow-hidden bg-brand-950 sm:h-[378px]">
        {/* Concentric gradient rings SVG */}
        <img
          aria-hidden="true"
          src="/img/team/rings.svg"
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        {/* Portrait */}
        {member.photo && (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 310px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
    </div>
  );
}
