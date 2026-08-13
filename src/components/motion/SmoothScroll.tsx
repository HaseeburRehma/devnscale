"use client";

import { ReactLenis, useLenis } from "lenis/react";

export { useLenis };

/**
 * Real, physics-based momentum scrolling for the whole site — every section,
 * every page. Wraps the app once in the root layout, using the official
 * `lenis/react` integration (`root` renders no wrapper DOM, `autoRaf` drives
 * Lenis's own internal rAF loop rather than a hand-rolled one).
 *
 * Lenis animates the *actual* document scroll position every frame (not a
 * transformed/virtual scroll), so everything that already reads native
 * scroll — IntersectionObserver-driven reveals, the Services dial's active
 * tracking, anchor links — keeps working unchanged underneath it.
 *
 * `respectReducedMotion` (on by default) has Lenis itself fall back to 1:1,
 * unsmoothed scrolling for visitors with `prefers-reduced-motion` set,
 * rather than us needing to skip mounting it entirely.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
