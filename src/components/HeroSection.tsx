"use client";

import { useRef } from "react";
import HeroBackdrop from "@/components/HeroBackdrop";
import IstClock from "@/components/IstClock";
import SplitText from "@/components/SplitText";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { SITE, disciplines } from "@/lib/portfolioData";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  // As you scroll away, the name drifts up and the frame darkens — like
  // pulling a print out of the tray.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-hero-name]", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-8 pt-28 sm:px-8"
    >
      <HeroBackdrop />

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="label flex items-center gap-2 !text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to roles & commissions
          </span>
          <span className="label">{SITE.location}</span>
          <IstClock className="label" />
        </div>

        <h1 data-hero-name className="display text-[16vw] leading-[0.82] text-ink lg:text-[13.5rem]">
          <SplitText
            text={SITE.fullName}
            letterClassName="hero-letter"
            stagger={45}
            trailing={
              <span className="hero-letter inline-block text-accent" style={{ animationDelay: "650ms" }}>
                .
              </span>
            }
          />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-border pt-6 md:grid-cols-12">
          <p className="display text-3xl leading-tight text-ink sm:text-4xl md:col-span-7">
            <span className="text-accent">{SITE.role}.</span> {SITE.headline}
          </p>
          <div className="flex flex-col justify-between gap-6 md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-muted">{SITE.intro}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                data-cursor="Work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-accent"
              >
                See the work
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Discipline marquee */}
      <div className="relative -mx-5 mt-12 overflow-hidden border-y border-border py-4 sm:-mx-8" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {[...disciplines, ...disciplines].map((d, i) => (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span className="display px-8 text-3xl italic text-ink sm:text-4xl">{d}</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
