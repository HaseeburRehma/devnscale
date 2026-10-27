import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import FounderStage from "./FounderStage";
import { INSTAGRAM_ICON, LINKEDIN_ICON, SocialLink } from "./TeamMembers";
import { TEAM_FOUNDER, TEAM_SOCIAL_FALLBACK } from "@/lib/content";

/* Figma "Option 06 · Giant name" (1440 × 820). Positions are in cqw of the
 * stage so the frame scales: 1cqw = 14.4px at full width. */
export default function TeamFounder() {
  const { eyebrow, name, body, photo } = TEAM_FOUNDER;

  return (
    <section className="bg-ink-50">
      <FounderStage name={name}>
        {/* Portrait 600 × 700 at y=170: 60px below the name's box top. */}
        <div className="relative z-10 mx-auto -mt-[26cqw] aspect-[600/700] w-[72cqw] lg:w-[41.67cqw]">
          <span
            aria-hidden="true"
            className="absolute left-[13.17%] top-[18.57%] aspect-square w-[73.33%] rounded-full bg-lime-500 opacity-35 blur-[40px] lg:blur-[77px]"
          />
          <Image
            src={photo}
            alt={`${name}, founder and CEO of Dev N Scale`}
            fill
            sizes="(min-width: 1440px) 600px, (min-width: 1024px) 42vw, 72vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-20 flex flex-col gap-8 border-t border-border-subtle bg-ink-50 px-4 pb-16 pt-8 sm:px-8 lg:contents">
          <Reveal className="flex flex-col gap-[22px] lg:absolute lg:left-[6.25cqw] lg:top-[38.89cqw] lg:w-[22.92cqw] lg:gap-[1.53cqw]">
            <p className="text-[12px] font-medium tracking-[1.5px] text-lime-700">{eyebrow}</p>
            <p className="max-w-[420px] text-[18px] leading-7 text-text-secondary lg:text-[16px] lg:leading-6 xl:text-[18px] xl:leading-7">
              {body}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="flex flex-col items-start gap-4 lg:absolute lg:right-[6.25cqw] lg:top-[43.06cqw] lg:origin-top-right lg:items-end lg:max-xl:scale-[0.85]"
          >
            <PrimaryButton />
            <div className="flex gap-2">
              <SocialLink href={TEAM_SOCIAL_FALLBACK.linkedin} label="Dev N Scale on LinkedIn">
                {LINKEDIN_ICON}
              </SocialLink>
              <SocialLink href={TEAM_SOCIAL_FALLBACK.instagram} label="Dev N Scale on Instagram">
                {INSTAGRAM_ICON}
              </SocialLink>
            </div>
          </Reveal>
        </div>
      </FounderStage>
    </section>
  );
}
