"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_BOOKING } from "@/lib/content";

/**
 * "Book your Appointment" — intro column beside the dark-green enquiry card
 * from the Figma contact page. Service chips toggle, and there's an NDA
 * checkbox; the form is inert (no backend) and just previews the interaction.
 */
export default function ContactBooking() {
  const { title, body, note, formTitle, services } = CONTACT_BOOKING;
  const [picked, setPicked] = useState<string[]>(["Web Development"]);
  const [nda, setNda] = useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <section className="bg-white section-y">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Intro */}
        <div className="flex flex-col">
          <Reveal>
            <h2 className="t-subsection text-ink-900">{title}</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-body-lg mt-6 max-w-[500px] text-text-secondary">
              {body}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-auto flex items-center gap-2.5 pt-10 text-[14px] text-text-muted">
              <span className="size-2 rounded-full bg-lime-500" />
              {note}
            </p>
          </Reveal>
        </div>

        {/* Enquiry card */}
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-[24px] bg-brand-900 p-6 sm:p-11"
          >
            <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,1.875rem)] font-medium text-white">
              {formTitle}
            </h3>

            {/* Service chips */}
            <div className="mt-8">
              <label className="text-[14px] font-medium text-ink-200">
                Service I need <span className="text-lime-400">*</span>
              </label>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {services.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-200 ${
                        on
                          ? "border-lime-400 bg-lime-400 font-medium text-brand-950"
                          : "border-white/15 text-ink-200 hover:border-lime-400/60 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div className="mt-7">
              <label htmlFor="c-email" className="text-[14px] font-medium text-ink-200">
                Email <span className="text-lime-400">*</span>
              </label>
              <input
                id="c-email"
                type="email"
                placeholder="you@company.com"
                className="mt-3 h-[52px] w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-lime-400 focus:bg-white/[0.06]"
              />
            </div>

            {/* Details */}
            <div className="mt-6">
              <label htmlFor="c-details" className="text-[14px] font-medium text-ink-200">
                Optional
              </label>
              <textarea
                id="c-details"
                rows={4}
                placeholder="Project details"
                className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-lime-400 focus:bg-white/[0.06]"
              />
            </div>

            {/* NDA */}
            <button
              type="button"
              onClick={() => setNda((v) => !v)}
              aria-pressed={nda}
              className="mt-6 flex items-center gap-3 text-left"
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 ${
                  nda ? "border-lime-400 bg-lime-400 text-brand-950" : "border-white/25"
                }`}
              >
                {nda && <CheckIcon className="size-3.5" />}
              </span>
              <span className="text-[14px] text-ink-200">
                This project requires an NDA
              </span>
            </button>

            <div className="mt-8">
              <PrimaryButton as="button" fullWidth>
                Start A Project
              </PrimaryButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
