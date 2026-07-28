"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { FAQS } from "@/lib/content";

export default function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-canvas py-16 sm:py-20 lg:py-[104px]">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[1fr_800px] lg:gap-20">
        <div>
          <Reveal>
            <p className="t-eyebrow">FAQ</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-subsection mt-4 text-ink-900">
              Questions,
              <br />
              answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body mt-6 max-w-[380px] text-text-secondary">
              Can&apos;t find what you&apos;re looking for? Reach out and
              we&apos;ll get back to you quickly.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="mailto:hello@devnscale.com"
              className="group mt-6 inline-flex items-center gap-2 text-[14px] text-lime-700 transition-colors hover:text-lime-600"
            >
              hello@devnscale.com
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div
                  className={`rounded-[20px] border bg-white transition-[border-color,box-shadow] duration-300 ${
                    isOpen
                      ? "border-border-subtle shadow-[0_5px_15px_rgba(25,33,61,0.06)]"
                      : "border-border-subtle hover:border-border-default"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <span className="t-h6 text-ink-900">{faq.q}</span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-gradient-to-b from-ink-800 to-ink-950 text-lime-400"
                          : "bg-ink-100 text-ink-900"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronDownIcon className="size-4" />
                      ) : (
                        <ChevronRightIcon className="size-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="t-body px-6 pb-7 text-text-secondary sm:px-8">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
