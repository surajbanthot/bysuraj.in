import IstClock from "@/components/IstClock";
import { InteractiveLens } from "@/components/PortfolioInteractions";
import { SITE, navSections } from "@/lib/portfolioData";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-6xl flex-col overflow-hidden px-5 pb-12 pt-8 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:pb-10 sm:pt-10"
    >
      <div className="flex items-center justify-between">
        <span className="label">
          Index / 01—0{navSections.length}
        </span>
        <span className="label flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Available for select projects
        </span>
      </div>

      <div className="grid flex-1 items-center gap-8 py-10 md:grid-cols-12 md:py-6">
        <div className="relative z-10 md:col-span-8">
          <p className="label mb-5">{SITE.role}</p>
          <h1 className="display text-[21vw] leading-[0.78] text-ink sm:text-[9.5rem] lg:text-[12rem]">
            {SITE.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-muted sm:text-3xl">
            {SITE.tagline}
          </p>
        </div>

        <div className="relative hidden h-full min-h-[25rem] md:col-span-4 md:block">
          <InteractiveLens />
          <span className="label absolute bottom-6 right-0 [writing-mode:vertical-rl]">
            Compose with intent
          </span>
        </div>
      </div>

      <div className="grid gap-6 border-t border-border pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid max-w-2xl grid-cols-3 gap-4">
          <div>
            <span className="display text-2xl text-ink">8+</span>
            <p className="label mt-1">Years shipping</p>
          </div>
          <div>
            <span className="display text-2xl text-ink">04</span>
            <p className="label mt-1">Disciplines</p>
          </div>
          <div>
            <IstClock className="display text-2xl text-ink" />
            <p className="label mt-1">{SITE.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#work"
            className="bg-ink px-6 py-3 font-mono text-sm uppercase tracking-widest text-paper transition-colors hover:bg-accent"
          >
            View work
          </a>
          <a
            href="#contact"
            className="link-underline font-mono text-sm uppercase tracking-widest text-ink"
          >
            Start a project ↓
          </a>
        </div>
      </div>
    </section>
  );
}
