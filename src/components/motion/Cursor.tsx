"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const noopSubscribe = () => () => {};

/**
 * Lens cursor — a ring that trails the pointer, grows over interactive
 * elements and shows the label from the nearest `data-cursor` attribute.
 * Fine pointers only; touch and reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion(),
    () => false,
  );
  const [label, setLabel] = useState("");

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;

    document.documentElement.classList.add("has-lens-cursor");
    const xTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      if (Number(gsap.getProperty(ring, "opacity")) === 0) gsap.to(ring, { opacity: 1, duration: 0.2 });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, input, textarea, label");
      setLabel(labelled?.dataset.cursor ?? "");
      gsap.to(ring, {
        scale: labelled ? 3.2 : interactive ? 1.8 : 1,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to(ring, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-lens-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] opacity-0 -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-accent mix-blend-difference"
    >
      {label && (
        <span className="font-mono text-[0.25rem] uppercase tracking-widest text-ink">
          {label}
        </span>
      )}
    </div>
  );
}
