"use client";

import { motion, type Variants, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animate children in the first time they enter the viewport.
 *
 * A motion-primitives-style wrapper (ibelick/motion-primitives) adapted for
 * this project: variants-driven, respects prefers-reduced-motion, and defaults
 * to the site's fade-and-rise with the shared easeOut curve.
 */
const DEFAULT: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function InView({
  children,
  variants = DEFAULT,
  delay = 0,
  duration = 0.6,
  amount = 0.3,
  once = true,
  as = "div",
  className,
}: {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  amount?: number | "some" | "all";
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "ul";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
