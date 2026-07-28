"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-[#03150f]/80 backdrop-blur-md"
            : "border-white/20 bg-black/30"
        }`}
      >
        <div className="shell relative flex h-[74px] items-center justify-between">
          {/* Logo */}
          <a href="#top" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-[34px] items-center justify-center rounded-[9px] bg-lime-400 px-[11px] font-display text-[18px] font-bold text-brand-950 transition-transform duration-300 group-hover:scale-105">
              D
            </span>
            <span className="font-display text-[21px] font-bold tracking-[-0.3px] text-white">
              DEV N SCALE
            </span>
          </a>

          {/* Centred links */}
          {/* links stay out to ~900px, matching the live site */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[38px] min-[900px]:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-[16px] text-ink-200 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 min-[900px]:block">
            <PrimaryButton />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-10 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-lime-400 hover:text-lime-400 min-[900px]:hidden"
          >
            {open ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-b border-white/10 bg-[#03150f]/95 backdrop-blur-md transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] min-[900px]:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 45 + 60}ms` : "0ms" }}
              className={`rounded-lg px-3 py-3 text-[17px] text-ink-200 transition-all duration-300 hover:bg-white/5 hover:text-lime-400 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 px-3">
            <PrimaryButton />
          </div>
        </nav>
      </div>
    </header>
  );
}
