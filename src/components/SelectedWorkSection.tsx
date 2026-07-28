import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/portfolioData";

export default function SelectedWorkSection() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading no="01" title="Selected work" kicker="Case notes · 2022—Now" />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 80}>
            <article
              className={`case-card flex min-h-[30rem] h-full flex-col p-7 sm:p-8 ${
                index === 0 ? "case-card-featured" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label !text-current">Case {project.no}</span>
                <span className="label !text-current">{project.period}</span>
              </div>

              <div className="case-card-copy mt-16">
                <p className="label !text-current">{project.context}</p>
                <h3 className="case-card-title display mt-3 text-3xl leading-[1.05] sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed opacity-80">
                  {project.summary}
                </p>
              </div>

              <div className="mt-auto pt-10">
                <p className="border-t border-current/20 pt-5 text-sm leading-relaxed opacity-70">
                  {project.contribution}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="case-tag font-mono text-[0.67rem] uppercase tracking-wider"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="max-w-2xl text-sm leading-relaxed text-faint">
          Some work is covered by confidentiality agreements. These case notes focus on
          the problem, craft, and contribution without exposing private product details.
        </p>
      </Reveal>
    </section>
  );
}
