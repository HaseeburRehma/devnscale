"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  OPEN_SETTINGS_EVENT,
  getConsent,
  loadGtm,
  setConsent,
  type Consent,
} from "@/lib/tracking";

/** Cookie banner: Google Analytics (via GTM) only runs after "Accept". */
export default function CookieConsent() {
  const [consent, setLocal] = useState<Consent | "unknown">("unknown");

  useEffect(() => {
    const t = setTimeout(() => setLocal(getConsent()), 0);
    const onChange = (e: Event) => setLocal((e as CustomEvent<Consent>).detail);
    const reopen = () => setLocal(null);
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    };
  }, []);

  useEffect(() => {
    if (consent === "granted") loadGtm();
  }, [consent]);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-[520px] rounded-2xl border border-white/10 bg-brand-950/95 p-5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="font-display text-[16px] font-medium">We use analytics cookies</p>
      <p className="mt-1.5 text-[14px] leading-5 text-ink-300">
        With your permission we use Google Analytics to see which pages help visitors, so we can improve the
        site. No advertising cookies. Details in our{" "}
        <Link href="/privacy#cookies" className="text-lime-400 underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="h-10 flex-1 basis-32 rounded-lg bg-lime-500 px-4 text-[14px] font-medium text-ink-950 transition-colors hover:bg-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="h-10 flex-1 basis-32 rounded-lg border border-white/20 px-4 text-[14px] text-ink-200 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
