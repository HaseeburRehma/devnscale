"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal a heading word-by-word as it scrolls into view — a per-word stagger
 * in the spirit of motion-primitives' TextEffect. Words wrap normally and an
 * optional trailing run of `accent` words is tinted lime.
 */
export default function TextEffect({
  text,
  accent,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  accent?: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  // `accent` is appended after `text`; on inner pages the extra word(s) render
  // in the same colour as the rest of the headline (matching the Figma design),
  // and only the home hero uses the lime tint via its own markup.
  const leadWords = text.split(" ");
  const words = accent ? [...leadWords, ...accent.split(" ")] : leadWords;

  if (reduce) {
    return (
      <Tag className={className}>
        {accent ? `${text} ${accent}` : text}
      </Tag>
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
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
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
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
      {/* accessible, non-animated copy for AT */}
      <span className="sr-only">
        {text}
        {accent ? ` ${accent}` : ""}
      </span>
    </Tag>
  );
}
