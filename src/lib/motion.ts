"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

// Register GSAP plugins once, client-side. Import gsap/ScrollTrigger from here
// so every component shares the same registered instance.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The live Lenis instance (null under reduced motion), so components can
// drive programmatic scrolls — scene jumps, "play the reel".
let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export { gsap, ScrollTrigger, Draggable, useGSAP };
