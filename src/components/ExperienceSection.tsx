import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/portfolioData";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="03" title="Experience" kicker="A working ledger" />

      <ol className="mt-8">
        {experience.map((entry, i) => (
          <Reveal as="li" key={entry.org} delay={i * 60}>
            <article className="group grid gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-8">
              {/* number + period */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-3">
                  <span className="label">{entry.no}</span>
                  {entry.current && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-accent">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                      Now
                    </span>
                  )}
                </div>
                <p className="mt-2 font-mono text-sm text-faint">{entry.period}</p>
              </div>

              {/* org + role + notes */}
              <div className="md:col-span-9">
                <h3 className="display text-2xl text-ink sm:text-3xl">{entry.org}</h3>
                <p className="mt-1 font-mono text-sm uppercase tracking-widest text-accent">
                  {entry.role}
                </p>
                <ul className="mt-4 space-y-2 text-lg leading-relaxed text-muted">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-px w-4 flex-shrink-0 bg-border" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
