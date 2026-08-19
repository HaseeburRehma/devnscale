"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Logo from "@/components/ui/Logo";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS, SERVICES, SERVICE_DETAILS } from "@/lib/content";

/** The 8 service detail slugs, in the order they appear in the SERVICES grid. */
const SERVICE_NAV = SERVICES.map((s) => ({
  label: s.title,
  href: `/services/${SERVICE_DETAILS[s.id]?.slug ?? ""}`,
}));

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
        className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#03150f]/80 backdrop-blur-xl"
            : "border-b border-white/[0.06] bg-gradient-to-b from-black/55 via-black/20 to-transparent backdrop-blur-[6px]"
        }`}
      >
        <div className="shell relative flex h-[74px] items-center justify-between">
          {/* Logo — its inner mark fill washes from pale-lime to white as the
              nav settles onto its solid backdrop. */}
          <Logo scrolled={scrolled} />

          {/* Centred links */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[38px] min-[900px]:flex">
            {NAV_LINKS.map((link) => {
              if (link.label === "Our Services") {
                return <ServicesDropdown key={link.label} />;
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative text-[16px] text-ink-200 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime-400 transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
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
          open ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
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
          {/* Nested service links so mobile users can jump to any of the 8. */}
          <div className="mt-3 border-t border-white/5 pt-3">
            <p className="mb-2 px-3 text-[11px] uppercase tracking-[0.14em] text-text-muted">
              Services
            </p>
            {SERVICE_NAV.map((s, i) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${(NAV_LINKS.length + i) * 40 + 60}ms` : "0ms",
                }}
                className={`block rounded-lg px-3 py-2 text-[15px] text-ink-300 transition-all duration-300 hover:bg-white/5 hover:text-lime-400 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="mt-4 px-3">
            <PrimaryButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Desktop "Our Services" nav item — a link that opens a mega-menu on
 * hover / focus, listing the 8 service detail pages so users can jump
 * to any one directly. The header keeps its own visited/open state so
 * the panel doesn't flicker between two adjacent hovers.
 */
function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <Link
        href="/services"
        aria-haspopup="menu"
        aria-expanded={open}
        className="group relative flex items-center gap-1.5 text-[16px] text-ink-200 transition-colors duration-200 hover:text-white"
      >
        Our Services
        <svg
          aria-hidden="true"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime-400 transition-all duration-300 group-hover:w-full" />
      </Link>

      {/* Dropdown — grid of 8 service links. Hairline lime accent
       *  above the panel matches the underline colour so the whole
       *  header reads as one lockup. */}
      <div
        role="menu"
        aria-label="Services"
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="w-[560px] overflow-hidden rounded-[16px] border border-white/10 bg-[#03150f]/95 shadow-[0_18px_44px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <ul className="grid grid-cols-2 gap-x-1 gap-y-0 p-2">
            {SERVICE_NAV.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  role="menuitem"
                  className="block rounded-lg px-3 py-2.5 text-[14px] text-ink-200 transition-colors duration-200 hover:bg-white/5 hover:text-lime-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
