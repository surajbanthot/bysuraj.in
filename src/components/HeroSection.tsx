import IstClock from "@/components/IstClock";
import { SITE, navSections } from "@/lib/portfolioData";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-10 sm:min-h-[calc(100svh-4rem)] sm:px-8"
    >
      {/* Top marginalia */}
      <div className="flex items-center justify-between">
        <span className="label">
          Index / 01—0{navSections.length}
        </span>
        <span className="label">Est. {SITE.estYear}</span>
      </div>

      {/* Headline */}
      <div className="mt-auto">
        <p className="label mb-5">{SITE.role} · Film · Cinema · Code</p>
        <h1 className="display text-[20vw] leading-[0.85] text-ink sm:text-[14rem]">
          {SITE.name}
          <span className="text-accent">.</span>
        </h1>

        <div className="mt-6 h-1 w-24 bg-accent" />

        <p className="mt-7 max-w-xl font-display text-2xl italic text-muted sm:text-3xl">
          {SITE.tagline}
        </p>
      </div>

      {/* Bottom row */}
      <div className="mt-auto flex flex-col gap-6 pt-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-sm text-ink">📍 {SITE.location}</p>
          <IstClock className="font-mono text-sm text-faint" />
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#contact"
            className="bg-ink px-6 py-3 font-mono text-sm uppercase tracking-widest text-paper transition-colors hover:bg-accent"
          >
            Get in touch
          </a>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-mono text-sm uppercase tracking-widest text-ink"
          >
            Résumé ↗
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <span className="label mt-10 animate-pulse sm:absolute sm:bottom-6 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2">
        ↓ Scroll
      </span>
    </section>
  );
}
