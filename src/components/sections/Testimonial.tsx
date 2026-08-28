"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/content";

const TYPING_SPEED = 28;
const PAUSE_AFTER_TYPED = 4000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charRef = useRef(0);
  const inView = useRef(false);

  const current = TESTIMONIALS[activeIdx];

  const startTyping = useCallback((text: string) => {
    charRef.current = 0;
    setDisplayedText("");
    setIsTyping(true);

    const tick = () => {
      charRef.current++;
      setDisplayedText(text.slice(0, charRef.current));
      if (charRef.current < text.length) {
        timerRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        setIsTyping(false);
        timerRef.current = setTimeout(() => {
          if (inView.current) {
            setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
          }
        }, PAUSE_AFTER_TYPED);
      }
    };
    timerRef.current = setTimeout(tick, TYPING_SPEED);
  }, []);

  useEffect(() => {
    startTyping(current.quote);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIdx, current.quote, startTyping]);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-950 section-y"
    >
      <PatternBackdrop />

      <div className="shell relative flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <Reveal>
            <p className="text-[12px] leading-4 text-lime-400">CLIENT VOICES</p>
          </Reveal>

          <div className="mt-6 min-h-[180px] sm:min-h-[160px]">
            <blockquote className="max-w-[788px] font-display text-[clamp(1.5rem,1.06rem+1.94vw,2rem)] font-medium leading-[1.25] tracking-[-0.5px] text-white">
              &ldquo;{displayedText}
              {isTyping && (
                <motion.span
                  className="ml-0.5 inline-block h-[1.1em] w-[3px] translate-y-[0.15em] bg-lime-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )}
              {!isTyping && displayedText.length > 0 && "&rdquo;"}
            </blockquote>
          </div>

          <AnimatePresence mode="wait">
            <motion.figcaption
              key={current.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="relative size-[52px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/15">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-[17px] font-medium text-white">
                  {current.name}
                </span>
                <span className="text-[14px] leading-5 text-ink-400">
                  {current.role}
                </span>
              </span>
            </motion.figcaption>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-6 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (timerRef.current) clearTimeout(timerRef.current);
                  setActiveIdx(i);
                }}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-[6px] rounded-full transition-all duration-400 ${
                  i === activeIdx
                    ? "w-8 bg-lime-400"
                    : "w-[6px] bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right image — crossfade between testimonials */}
        <div className="relative w-full lg:w-[420px] lg:shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative aspect-[420/500] w-full overflow-hidden rounded-[24px]"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
