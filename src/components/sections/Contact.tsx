"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_DETAILS, SERVICE_OPTIONS } from "@/lib/content";

const DETAIL_ICONS = {
  mail: MailIcon,
  phone: PhoneIcon,
  pin: MapPinIcon,
};

/* Shared look for every control; height is set per-control so the textarea
   isn't fighting the inputs' fixed 54px. */
const fieldBase =
  "w-full rounded-xl border border-border-subtle bg-ink-50 px-4 text-[16px] text-ink-900 outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-ink-400 hover:border-border-default focus:border-lime-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(189,198,29,0.18)]";
const fieldClass = `${fieldBase} h-[54px]`;
const textareaClass = `${fieldBase} h-32 resize-none py-4`;

export default function Contact() {
  const [service, setService] = useState("");

  return (
    <section id="contact" className="bg-canvas section-y">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[440px_1fr] lg:gap-20">
        {/* Info column */}
        <div>
          <Reveal>
            <p className="t-eyebrow">GET IN TOUCH</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-subsection mt-5 text-ink-900">
              Let&apos;s talk about your project.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-6 text-text-secondary">
              Tell us where you are and where you want to go. We&apos;ll reply
              within one business day with clear next steps.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-5">
            {CONTACT_DETAILS.map((detail, i) => {
              const Icon =
                DETAIL_ICONS[detail.icon as keyof typeof DETAIL_ICONS];
              return (
                <Reveal key={detail.label} delay={0.15 + i * 0.06}>
                  <div className="group flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-b from-ink-800 to-ink-950 shadow-[0_0_14px_1px_rgba(155,167,24,0.22)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-5 text-lime-400" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[12px] leading-4 text-text-muted">
                        {detail.label}
                      </span>
                      <span className="text-[16px] font-medium leading-[19px] text-ink-900">
                        {detail.value}
                      </span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <Reveal delay={0.12}>
          <form
            className="rounded-[24px] bg-white p-6 shadow-[0_5px_15px_rgba(25,33,61,0.06)] sm:p-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First name" htmlFor="first">
                <input
                  id="first"
                  name="first"
                  placeholder="Jane"
                  className={fieldClass}
                />
              </Field>
              <Field label="Last name" htmlFor="last">
                <input
                  id="last"
                  name="last"
                  placeholder="Doe"
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Work email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Company" htmlFor="company">
                <input
                  id="company"
                  name="company"
                  placeholder="Company name"
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="What do you need?" htmlFor="service">
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${fieldClass} appearance-none pr-12 ${
                      service ? "text-ink-900" : "text-ink-400"
                    }`}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-500" />
                </div>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Project details" htmlFor="details">
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Tell us a bit about your goals, timeline, and budget…"
                  className={textareaClass}
                />
              </Field>
            </div>

            <div className="mt-8">
              <PrimaryButton as="button">Send Message</PrimaryButton>
            </div>

            <p className="mt-6 text-right text-[14px] leading-5 text-text-muted">
              We&apos;ll never share your details. No spam, ever.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[12px] leading-4 text-text-secondary"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
