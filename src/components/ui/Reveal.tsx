"use client";

import { useEffect, useRef } from "react";

/**
 * Fades + lifts its children into view the first time they're scrolled to.
 *
 * The hidden state is applied by CSS that is scoped to `html.js`, and the `js`
 * class is only set by the inline script in the layout. So if scripts never
 * run the content simply renders visible instead of being stuck at opacity 0.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.dataset.revealed = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.revealed = "true";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type varies by tag, all are HTMLElement
      ref={ref}
      data-reveal=""
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
