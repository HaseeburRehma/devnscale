"use client";

import {
  motion,
  type Variants,
  useReducedMotion,
} from "motion/react";
import { Children, type ReactNode } from "react";

/**
 * Stagger a set of children into view — motion-primitives' AnimatedGroup idea.
 * Wrap a list/grid; each direct child animates in sequence.
 */
const ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  item = ITEM,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  item?: Variants;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={item}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
