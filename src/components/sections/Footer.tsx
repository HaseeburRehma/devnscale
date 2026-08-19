"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";
import NewsletterForm from "@/components/ui/NewsletterForm";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Reveal from "@/components/ui/Reveal";
import { FOOTER_LINKS } from "@/lib/content";

/* Social profile URLs — swap the handles the moment real profiles exist.
 * Placeholders point at the platform root rather than a bad handle so the
 * footer never breaks a click. Icons are hidden entirely when `href` is null. */
const SOCIALS: { Icon: typeof XIcon; label: string; href: string | null }[] = [
  { Icon: XIcon, label: "X", href: "https://x.com/devnscale" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/devnscale" },
  { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/devnscale" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/devnscale" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-900 pt-12 sm:pt-16 lg:pt-20">
      <PatternBackdrop />

      <div className="shell relative">
        <FooterCta />

        {/* Link columns — tightened from mt-24 so the whole footer
         *  breathes less around the 3D mark and CTA. */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-16">
          <Reveal>
            <div className="max-w-[420px]">
              <h3 className="font-display text-[26px] font-medium text-white">
                Stay Connected
              </h3>
              <p className="t-body mt-3 text-ink-300">
                Join our newsletter for tips, updates, and project highlights
                only the good stuff.
              </p>

              <NewsletterForm />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <LinkColumn title="Main Links" links={FOOTER_LINKS.main} />
          </Reveal>

          <Reveal delay={0.12}>
            <LinkColumn title="Other Pages" links={FOOTER_LINKS.other} />
          </Reveal>

          <Reveal delay={0.18}>
            <div>
              <h4 className="font-display text-[15px] font-bold text-white">
                Contact Us On
              </h4>
              <ul className="mt-5 flex flex-col gap-4">
                {FOOTER_LINKS.contact.map((item) => (
                  <li key={item} className="text-[16px] text-ink-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 mb-10 flex flex-col items-center justify-between gap-6 rounded-[16px] bg-white/[0.04] px-6 py-6 sm:flex-row sm:px-8">
          <p className="text-[16px] text-ink-300">
            2026 Dev N Scale - All Rights Reserved
          </p>
          <ul className="flex items-center gap-3">
            {SOCIALS.filter((s) => s.href).map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href!}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-[6px] bg-lime-400 text-brand-950 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/**
 * The 3D mark + "FEELS LIKE COLLABORATING?" hero of the footer.
 *
 * The mark slides up from just-below-the-heading as the footer scrolls
 * into view: at the section's first entry (bottom of viewport) the
 * mark sits at y=+120 and 60% opacity, and it settles at y=0 with
 * full opacity by the time the section is fully in frame. Bound to
 * scroll progress via useScroll so scroll-back rewinds it naturally.
 */
function FooterCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  return (
    <div ref={sectionRef} className="flex flex-col items-center text-center">
      {/* 3D mark wrapper — scroll-driven slide up from below the heading */}
      <motion.div
        style={{ y, opacity }}
        className="relative h-[220px] w-[190px] sm:h-[300px] sm:w-[260px]"
      >
        {/* soft pulsing lime glow so the mark reads proud of the tiled bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 motion-safe:animate-[glow-pulse_4.5s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,212,52,0.42), rgba(196,212,52,0) 70%)",
            filter: "blur(32px)",
          }}
        />
        <div className="absolute inset-x-0 top-0 aspect-square">
          <Image
            src="/img/logo-3d.png"
            alt="Dev n Scale"
            fill
            sizes="260px"
            className="relative z-10 object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.55)] motion-safe:animate-[float-sway_9s_ease-in-out_infinite]"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Heading — tightened from mt-0 to sit closer under the mark */}
      <Reveal delay={0.08}>
        <h2 className="-mt-2 font-display text-[clamp(2.25rem,1.2rem+4.7vw,4.25rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white">
          Feels Like
          <br />
          <span className="text-lime-400">Collaborating?</span>
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </Reveal>
    </div>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; active?: boolean }[];
}) {
  return (
    <div>
      <h4 className="font-display text-[15px] font-bold text-white">{title}</h4>
      <ul className="mt-5 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`text-[16px] transition-colors duration-200 hover:text-lime-400 ${
                link.active ? "text-lime-400" : "text-ink-200"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
