"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import PatternBackdrop from "@/components/ui/PatternBackdrop";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/content";

const CHAR_MS = 24;
const PAUSE_AFTER = 3500;
const EASE = [0.22, 1, 0.36, 1] as const;

function charDelay(ch: string) {
  if (ch === "." || ch === "!" || ch === "?") return CHAR_MS * 6;
  if (ch === "," || ch === ";") return CHAR_MS * 3;
  if (ch === " ") return CHAR_MS * 0.5;
  return CHAR_MS;
}

export default function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "done" | "fading">("typing");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charRef = useRef(0);
  const inView = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const current = TESTIMONIALS[activeIdx];

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const advance = useCallback(() => {
    setPhase("fading");
    timerRef.current = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 400);
  }, []);

  const startTyping = useCallback(
    (text: string) => {
      charRef.current = 0;
      setDisplayedText("");
      setPhase("typing");
      setProgress(0);

      const tick = () => {
        charRef.current++;
        const slice = text.slice(0, charRef.current);
        setDisplayedText(slice);
        setProgress(charRef.current / text.length);

        if (charRef.current < text.length) {
          timerRef.current = setTimeout(tick, charDelay(text[charRef.current - 1]));
        } else {
          setPhase("done");
          timerRef.current = setTimeout(() => {
            if (inView.current) advance();
          }, PAUSE_AFTER);
        }
      };
      timerRef.current = setTimeout(tick, 300);
    },
    [advance],
  );

  useEffect(() => {
    startTyping(current.quote);
    return clear;
  }, [activeIdx, current.quote, startTyping]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goTo = (i: number) => {
    if (i === activeIdx) return;
    clear();
    setPhase("fading");
    timerRef.current = setTimeout(() => setActiveIdx(i), 400);
  };

  const isFading = phase === "fading";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-950 section-y"
    >
      <PatternBackdrop />

      <div className="shell relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text side */}
        <div className="flex-1 min-w-0">
          <Reveal>
            <p className="text-[12px] leading-4 tracking-[0.14em] text-lime-400">
              CLIENT VOICES
            </p>
          </Reveal>

          <motion.div
            className="mt-6 min-h-[200px] sm:min-h-[180px] lg:min-h-[160px]"
            animate={{ opacity: isFading ? 0 : 1 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <blockquote className="max-w-[788px] font-display text-[clamp(1.25rem,0.9rem+1.56vw,2rem)] font-medium leading-[1.3] tracking-[-0.4px] text-white">
              {"“"}
              {displayedText}
              {phase === "typing" && (
                <motion.span
                  className="ml-px inline-block h-[1em] w-[2.5px] translate-y-[0.12em] rounded-full bg-lime-400"
                  animate={{ opacity: [1, 0.2] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              )}
              {phase === "done" && "”"}
            </blockquote>
          </motion.div>

          <motion.div
            animate={{ opacity: isFading ? 0 : 1, y: isFading ? 8 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              <motion.figcaption
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 flex items-center gap-4"
              >
                <span className="relative size-[48px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/15 sm:size-[52px]">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="52px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-[16px] font-medium text-white sm:text-[17px]">
                    {current.name}
                  </span>
                  <span className="text-[13px] leading-5 text-ink-400 sm:text-[14px]">
                    {current.role}
                  </span>
                </span>
              </motion.figcaption>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="mt-8 flex items-center gap-2.5">
              {TESTIMONIALS.map((_, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className="group relative flex h-8 items-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ease-out ${
                        isActive
                          ? "h-[5px] w-10 bg-white/15"
                          : "size-[7px] bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        className="absolute left-0 top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-lime-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <div className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:w-[420px] lg:max-w-none lg:shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative aspect-[420/500] w-full overflow-hidden rounded-[20px] sm:rounded-[24px]"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 360px, 420px"
                className="object-cover"
                priority={activeIdx === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
