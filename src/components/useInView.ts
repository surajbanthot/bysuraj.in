"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element visible before it counts as in view. */
  threshold?: number;
  /** Reveal only once, then stop observing. */
  once?: boolean;
  /** Shrink the viewport so reveals fire slightly before the edge. */
  rootMargin?: string;
};

/**
 * Tiny IntersectionObserver hook powering the scroll-reveals.
 * Returns a ref to attach and a boolean for whether it's on screen.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
  rootMargin = "0px 0px -10% 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Users who prefer reduced motion are handled in CSS — the `.reveal`
    // utility is forced visible under the prefers-reduced-motion media query,
    // so no JS fallback is needed here.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}
