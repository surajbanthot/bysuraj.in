import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/portfolioData";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
      <SectionHeading no="03" title="Experience" kicker={`${experience.length} roles · since 2018`} />

      <ol className="mt-6">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.org} delay={i * 60}>
            <div className="display-hover group grid gap-2 border-b border-border py-7 transition-colors hover:bg-paper-raised/50 md:grid-cols-12 md:items-baseline md:gap-6 md:px-4">
              <span className="label md:col-span-2">{job.period}</span>
              <h3 className="display text-3xl leading-tight text-ink sm:text-4xl md:col-span-4">
                {job.org}
                {job.current && (
                  <span className="label ml-3 align-middle !text-accent">Now</span>
                )}
              </h3>
              <span className="font-mono text-sm uppercase tracking-wider text-muted md:col-span-2">
                {job.role}
              </span>
              <p className="leading-relaxed text-muted md:col-span-4">{job.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-6">
        <p className="label">B.E. Information Science — Ramaiah Institute of Technology, 2018</p>
      </Reveal>
    </section>
  );
}
