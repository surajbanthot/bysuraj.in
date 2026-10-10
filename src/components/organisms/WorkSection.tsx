import Tape from "@/components/atoms/Tape";
import CaseCard from "@/components/molecules/CaseCard";
import SectionHeading from "@/components/molecules/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/lib/portfolioData";

const tilt = [-2, 1.5, -1];

/** 02 — the projects as taped-up prints, each opening its case study. */
export default function WorkSection() {
  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        no="02"
        title={
          <>
            Selected <em className="text-accent">work</em>
          </>
        }
        kicker="Case notes · 2022—Now"
      />

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <div className="relative transition-transform duration-500" style={{ rotate: `${tilt[i]}deg` }}>
              <CaseCard project={p} captionSeed={0.2 + i * 0.3} />
              <Tape className="-top-3 left-1/3" rotate={i % 2 ? 6 : -6} seed={0.3 + i * 0.2} />
            </div>
            <p className="mt-8 leading-relaxed text-muted">{p.summary}</p>
            <p className="label mt-3">{p.period}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
