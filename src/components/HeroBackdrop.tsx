"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// three.js only loads on capable devices, after hydration.
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

const noopSubscribe = () => () => {};

const canRunWebGL = () => {
  if (prefersReducedMotion()) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
};

/**
 * Hero background. Always paints a static safelight poster (CSS only), then
 * layers the live WebGL fluid on top when the device can afford it. The canvas
 * stops rendering while the hero is offscreen.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const webgl = useSyncExternalStore(noopSubscribe, canRunWebGL, () => false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !webgl) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [webgl]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_95%_5%,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_55%),radial-gradient(ellipse_at_20%_80%,var(--paper-raised),transparent_60%)]" />
      {webgl && (
        <div className="absolute inset-0 animate-[fade-in_1.6s_ease-out_both]">
          <HeroCanvas active={onScreen} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
