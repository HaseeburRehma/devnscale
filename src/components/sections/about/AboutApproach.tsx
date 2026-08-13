"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_APPROACH } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "OUR APPROACH" — a single oversized sentence with three colour bands
 * (dark ink / pale-lime accent / muted tail). Each character reveals in
 * sequence as the section scrolls into view, giving the block that
 * ticker-tape typewriter feel from the design.
 */
export default function AboutApproach() {
  const { eyebrow, lead, accent, tail } = ABOUT_APPROACH;
  const reduce = useReducedMotion();

  // one flat array of {char, color} so the stagger is per-character across
  // the whole sentence rather than per-clause.
  type Piece = { text: string; color: string };
  const pieces: Piece[] = [
    { text: `${lead} `, color: "text-ink-900" },
    { text: `${accent} `, color: "text-[#dfe6a3]" },
    { text: tail, color: "text-ink-300" },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{eyebrow}</p>
        </Reveal>

        {reduce ? (
          <p className="t-subsection mt-6 max-w-[1080px] text-ink-900">
            {pieces.map((p, i) => (
              <span key={i} className={p.color}>
                {p.text}
              </span>
            ))}
          </p>
        ) : (
          <motion.p
            className="t-subsection mt-6 max-w-[1080px] text-ink-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.018, delayChildren: 0.1 }}
            aria-label={pieces.map((p) => p.text).join("")}
          >
            <span aria-hidden>
              {pieces.map((piece, pi) => {
                const words = piece.text.split(" ");
                return words.map((word, wi) => {
                  const isLastWordOfPiece = wi === words.length - 1;
                  return (
                    <span
                      key={`${pi}-${wi}`}
                      className={`inline-block whitespace-pre ${piece.color}`}
                    >
                      <span className="inline-flex overflow-hidden align-bottom">
                        {[...word].map((ch, ci) => (
                          <motion.span
                            key={ci}
                            className="inline-block"
                            variants={{
                              hidden: { y: "110%", opacity: 0 },
                              visible: {
                                y: "0%",
                                opacity: 1,
                                transition: { duration: 0.5, ease: EASE },
                              },
                            }}
                          >
                            {ch}
                          </motion.span>
                        ))}
                      </span>
                      {!isLastWordOfPiece && " "}
                    </span>
                  );
                });
              })}
            </span>
          </motion.p>
        )}
      </div>
    </section>
  );
}
