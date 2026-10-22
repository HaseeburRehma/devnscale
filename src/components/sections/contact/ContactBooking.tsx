"use client";

import { useState } from "react";
import {
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_BOOKING, CONTACT_DETAILS } from "@/lib/content";

/** Icon lookup for the CONTACT_DETAILS rows. */
const DETAIL_ICONS = {
  mail: MailIcon,
  phone: PhoneIcon,
  pin: MapPinIcon,
} as const;

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function ContactBooking() {
  const { title, body, note, formTitle, services } = CONTACT_BOOKING;
  const [picked, setPicked] = useState<string[]>([]);
  const [nda, setNda] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      // The Figma form only asks for an email, so the API's name fields
      // are filled from the address and flagged as coming from this page.
      firstName: String(data.get("email") ?? "").split("@")[0] || "Contact",
      lastName: "(Contact page)",
      email: String(data.get("email") ?? ""),
      service: picked.join(", ") + (nda ? " (NDA required)" : ""),
      details: String(data.get("details") ?? ""),
    };

    if (!payload.email) {
      setStatus({ kind: "error", message: "Please enter your email address." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      form.reset();
      setPicked([]);
      setNda(false);
      setStatus({
        kind: "ok",
        message: "Thanks — we got your message. We'll be in touch soon.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <section className="bg-white section-y">
      <div className="shell grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Intro card — copy pinned to the top, contact rows to the bottom */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between gap-12 rounded-[24px] bg-ink-50 px-6 pb-10 pt-10 sm:px-12 sm:pb-12 sm:pt-14">
            <div className="flex flex-col gap-[22px]">
              <h2 className="t-subsection text-ink-900">{title}</h2>
              <p className="t-body-lg text-text-secondary">{body}</p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Contact rows — CONTACT_DETAILS drives every place the
               *  address surfaces. */}
              <div className="flex flex-col gap-5 pt-4">
                {CONTACT_DETAILS.map((detail) => {
                  const Icon =
                    DETAIL_ICONS[detail.icon as keyof typeof DETAIL_ICONS];
                  const isEmail = detail.icon === "mail";
                  const isPhone = detail.icon === "phone";
                  const href = isEmail
                    ? `mailto:${detail.value}`
                    : isPhone
                      ? `tel:${detail.value.replace(/\s/g, "")}`
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          detail.value,
                        )}`;

                  return (
                    <a
                      key={detail.label}
                      href={href}
                      {...(!isEmail && !isPhone
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-4"
                    >
                      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-[14px] border border-white/[0.08] bg-gradient-to-b from-[#3b3b40] via-[#212126] to-[#0f0f12] shadow-[0_5px_12px_rgba(0,0,0,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.16)] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5 text-lime-400 drop-shadow-[0_0_3.5px_rgba(196,212,51,0.55)]" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-[12px] leading-4 text-text-muted">
                          {detail.label}
                        </span>
                        <span className="text-[16px] font-medium text-ink-900 transition-colors group-hover:text-lime-700">
                          {detail.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <p className="flex items-center gap-2.5 text-[14px] font-medium text-ink-700">
                <span className="size-[9px] rounded-full bg-lime-500 shadow-[0_0_0_3px_rgba(189,198,29,0.25)]" />
                {note}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Enquiry card */}
        <Reveal delay={0.1} className="h-full">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex h-full flex-col gap-[26px] rounded-[24px] bg-brand-950 p-6 sm:p-11"
          >
            <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,1.875rem)] font-bold tracking-[-0.5px] text-white">
              {formTitle}
            </h3>

            {/* Service chips */}
            <fieldset className="flex flex-col gap-3.5">
              <legend className="mb-3.5 text-[15px] font-medium text-white">
                Service I need *
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {services.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      aria-pressed={on}
                      className={`rounded-full border border-lime-500 px-[18px] py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                        on
                          ? "bg-lime-500 text-brand-950"
                          : "text-white hover:bg-lime-500/15"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Email */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="c-email" className="text-[15px] font-medium text-white">
                Email *
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-[52px] w-full rounded-[10px] bg-white px-4 text-[16px] text-ink-900 outline-none transition-shadow duration-200 placeholder:text-ink-500 focus:shadow-[0_0_0_3px_rgba(189,198,29,0.45)]"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="c-details" className="text-[15px] font-medium text-white">
                Optional
              </label>
              <textarea
                id="c-details"
                name="details"
                placeholder="Project details"
                className="h-32 w-full resize-none rounded-[10px] bg-white px-4 py-[15px] text-[16px] text-ink-900 outline-none transition-shadow duration-200 placeholder:text-ink-500 focus:shadow-[0_0_0_3px_rgba(189,198,29,0.45)]"
              />
            </div>

            {/* NDA */}
            <button
              type="button"
              onClick={() => setNda((v) => !v)}
              aria-pressed={nda}
              className="flex items-center gap-3 pt-0.5 text-left"
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-lime-500 transition-colors duration-200 ${
                  nda ? "bg-lime-500 text-brand-950" : ""
                }`}
              >
                {nda && <CheckIcon className="size-3.5" />}
              </span>
              <span className="text-[15px] font-medium text-white">
                This project requires an NDA
              </span>
            </button>

            <PrimaryButton as="button" fullWidth>
              {status.kind === "sending" ? "Sending…" : "Start A Project"}
            </PrimaryButton>

            {status.kind === "ok" && (
              <p className="-mt-2 text-[14px] text-lime-400">{status.message}</p>
            )}
            {status.kind === "error" && (
              <p className="-mt-2 text-[14px] text-red-400">{status.message}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
