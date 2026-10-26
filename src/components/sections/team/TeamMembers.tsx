import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import {
  TEAM_MEMBERS,
  TEAM_SOCIAL_FALLBACK,
  type TeamPageMember,
} from "@/lib/content";

export default function TeamMembers() {
  const { title, body, members } = TEAM_MEMBERS;

  return (
    <section className="bg-white py-[clamp(4rem,2rem+5vw,6.875rem)]">
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

        <AnimatedGroup stagger={0.04} amount={0.05} className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-4">
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
    <article className="group flex flex-col gap-[18px]">
      <div className="relative aspect-[302/354] w-full overflow-hidden rounded-[16px] bg-brand-900">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 1024px) 302px, (min-width: 480px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-[0.22]">
              <path
                d="M38 42v-4a8 8 0 0 0-8-8H18a8 8 0 0 0-8 8v4M32 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                stroke="#fff"
                strokeWidth="4"
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

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="font-display text-[20px] font-medium leading-7 text-ink-900">{member.name}</h3>
          <p className="text-[14px] leading-5 text-text-secondary">{member.role}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <SocialLink
            href={linkedin}
            label={own ? `${member.name} on LinkedIn` : "Dev N Scale on LinkedIn"}
          >
            <path d="M10.672 5.336a4.002 4.002 0 0 1 4.002 4.002v4.669h-2.668V9.338a1.334 1.334 0 0 0-2.668 0v4.669H6.67V9.338a4.002 4.002 0 0 1 4.002-4.002ZM1.334 6.003h2.668v8.004H1.334V6.003ZM2.668 4.002a1.334 1.334 0 1 0 0-2.668 1.334 1.334 0 0 0 0 2.668Z" />
          </SocialLink>
          <SocialLink
            href={instagram}
            label={own ? `${member.name} on Instagram` : "Dev N Scale on Instagram"}
          >
            <path d="M4.669 1.334h6.67a3.335 3.335 0 0 1 3.335 3.335v6.67a3.335 3.335 0 0 1-3.335 3.335h-6.67a3.335 3.335 0 0 1-3.335-3.335v-6.67a3.335 3.335 0 0 1 3.335-3.335Z" />
            <path d="M10.672 7.584a2.668 2.668 0 1 1-5.278.782 2.668 2.668 0 0 1 5.278-.782ZM11.673 4.336h.006" />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white text-ink-700 transition-colors duration-300 hover:border-brand-950 hover:bg-brand-950 hover:text-lime-400 group-hover:border-brand-950 group-hover:bg-brand-950 group-hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16.008 16.008"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.334"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}
