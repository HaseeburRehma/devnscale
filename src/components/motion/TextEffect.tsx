"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal a heading in the spirit of motion-primitives' TextEffect. Words
 * animate as clipped boxes and can optionally cascade one letter at a time
 * inside each word for a richer intro. `accent` is appended after `text`
 * and rendered in the same colour as the rest of the headline (matches
 * the Figma inner-page heros); only the home hero uses lime, via its own
 * markup.
 */
export default function TextEffect({
  text,
  accent,
  className = "",
  delay = 0,
  as: Tag = "h2",
  perCharacter = false,
}: {
  text: string;
  accent?: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  /** When true, each letter within a word animates individually. */
  perCharacter?: boolean;
}) {
  const reduce = useReducedMotion();
  const leadWords = text.split(" ");
  const words = accent ? [...leadWords, ...accent.split(" ")] : leadWords;

  if (reduce) {
    return (
      <Tag className={className}>{accent ? `${text} ${accent}` : text}</Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          staggerChildren: perCharacter ? 0.02 : 0.045,
          delayChildren: delay,
        }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block whitespace-pre">
            {perCharacter ? (
              <span className="inline-flex overflow-hidden align-bottom">
                {[...word].map((ch, j) => (
                  <motion.span
                    key={j}
                    className="inline-block"
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ) : (
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            )}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
      {/* accessible non-animated copy for AT */}
      <span className="sr-only">
        {text}
        {accent ? ` ${accent}` : ""}
      </span>
    </Tag>
  );
}
