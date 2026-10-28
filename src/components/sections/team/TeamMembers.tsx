import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import { INSTAGRAM_ICON, LINKEDIN_ICON, SocialLink } from "@/components/ui/SocialLink";
import {
  TEAM_MEMBERS,
  TEAM_SOCIAL_FALLBACK,
  type TeamPageMember,
} from "@/lib/content";

export default function TeamMembers() {
  const { title, body, members } = TEAM_MEMBERS;

  return (
    <section className="bg-white py-[clamp(4rem,1.5rem+6vw,6.875rem)]">
      <div className="shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-bold leading-[1.17] tracking-[-1.5px] text-ink-900">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[480px] text-[18px] leading-7 text-text-secondary">{body}</p>
          </Reveal>
        </div>

        <AnimatedGroup stagger={0.04} amount={0.05} className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {members.map((m) => (
            <MemberCard key={`${m.name}-${m.role}`} member={m} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamPageMember }) {
  const linkedin = member.linkedin ?? TEAM_SOCIAL_FALLBACK.linkedin;
  const instagram = member.instagram ?? TEAM_SOCIAL_FALLBACK.instagram;
  const own = Boolean(member.linkedin || member.instagram);

  return (
    <article className="group flex flex-col gap-3 sm:gap-[18px]">
      <div className="relative aspect-[302/354] w-full overflow-hidden rounded-[16px] bg-[radial-gradient(closest-side,#fefef8,#e8e7a4)]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 1024px) 302px, 50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-ink-400 opacity-70">
              <path
                d="M38 42v-4a8 8 0 0 0-8-8H18a8 8 0 0 0-8 8v4M32 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] ring-2 ring-inset ring-lime-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-display text-[17px] font-medium leading-6 text-ink-900 sm:text-[20px] sm:leading-7">{member.name}</h3>
          <p className="text-[13px] leading-5 text-text-secondary sm:text-[14px]">{member.role}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <SocialLink
            href={linkedin}
            label={own ? `${member.name} on LinkedIn` : "Dev N Scale on LinkedIn"}
          >
            {LINKEDIN_ICON}
          </SocialLink>
          <SocialLink
            href={instagram}
            label={own ? `${member.name} on Instagram` : "Dev N Scale on Instagram"}
          >
            {INSTAGRAM_ICON}
          </SocialLink>
        </div>
      </div>
    </article>
  );
}
