import Image from "next/image";
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

const SOCIALS = [
  { Icon: XIcon, label: "X" },
  { Icon: LinkedInIcon, label: "LinkedIn" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-900 pt-16 sm:pt-20">
      <PatternBackdrop opacity={0.04} />

      <div className="shell relative">
        {/* CTA */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            {/* Figma sizes this box 394x498 (mark hugs the top, ~27% of
                the box height left empty below it as the gap before the
                heading) — replicate with a square inner wrapper pinned to
                top:-6.59%, rather than centering the mark in the box. */}
            <div className="relative h-[240px] w-[190px] sm:h-[350px] sm:w-[280px]">
              {/* soft pulsing lime glow, so the mark reads proud of the tiled bg */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-0 motion-safe:animate-[glow-pulse_4.5s_ease-in-out_infinite]"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(196,212,52,0.42), rgba(196,212,52,0) 70%)",
                  filter: "blur(32px)",
                }}
              />
              <div className="absolute inset-x-0 top-[-6.59%] aspect-square">
                {/* the mark itself — floats, drifts, and gets a subtle tilt sway */}
                <Image
                  src="/img/logo-3d.png"
                  alt="Dev n Scale"
                  fill
                  sizes="280px"
                  className="relative z-10 object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.5)] motion-safe:animate-[float-sway_7s_ease-in-out_infinite]"
                  priority={false}
                />
                {/* highlight sheen sweep, gated on motion */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay motion-safe:animate-[shimmer_9s_ease-in-out_infinite]"
                  style={{
                    background:
                      "conic-gradient(from 210deg at 60% 40%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 25%, rgba(255,255,255,0) 40%)",
                    filter: "blur(2px)",
                  }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2.25rem,1.2rem+4.7vw,4.25rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white">
              Feels Like
              <br />
              <span className="text-lime-400">Collaborating?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <PrimaryButton />
              <SecondaryButton />
            </div>
          </Reveal>
        </div>

        {/* Link columns */}
        <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-16">
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
            {SOCIALS.map(({ Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
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
