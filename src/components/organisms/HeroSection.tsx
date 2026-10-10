import Button from "@/components/atoms/Button";
import IstClock from "@/components/atoms/IstClock";
import SplitText from "@/components/atoms/SplitText";
import HeroBackdrop from "@/components/motion/HeroBackdrop";
import { SITE } from "@/lib/portfolioData";

/**
 * The first view: who, what, and two ways forward. Deliberately a little
 * shorter than the screen so the top of the process reel shows below it.
 */
export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-7rem)] flex-col justify-end overflow-hidden px-5 pb-14 pt-32 sm:px-8 lg:min-h-[calc(100svh-15rem)] lg:pb-8 lg:pt-28"
    >
      <HeroBackdrop />

      <div className="mx-auto w-full max-w-7xl">
        <p className="label flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="flex items-center gap-2 !text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to roles & commissions
          </span>
          <span>{SITE.location}</span>
          <IstClock className="tabular-nums" />
        </p>

        <h1 className="display mt-6 text-[16vw] leading-[0.82] text-ink lg:text-[10rem]">
          <SplitText
            text={SITE.fullName}
            letterClassName="hero-letter"
            stagger={28}
            trailing={
              <span className="hero-letter inline-block text-accent" style={{ animationDelay: "420ms" }}>
                .
              </span>
            }
          />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-12 lg:mt-8 lg:pt-6">
          <p className="display text-3xl leading-tight text-ink sm:text-4xl md:col-span-7">
            <span className="text-accent">{SITE.role}.</span> {SITE.headline}
          </p>
          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-muted">{SITE.intro}</p>
            <div className="flex flex-wrap gap-3">
              <Button href="#work" icon="↓" data-cursor="Work">
                See the work
              </Button>
              <Button href="#reel" variant="outline" icon="▶">
                Watch how I work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
