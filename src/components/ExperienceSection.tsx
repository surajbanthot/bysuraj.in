import Reveal from "@/components/Reveal";
import { SITE, experience } from "@/lib/portfolioData";

/** Experience as the piece's end credits. */
export default function ExperienceSection() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="label text-accent">09 — Credits</p>
          <h2 className="display mt-4 text-6xl leading-none text-ink sm:text-8xl">
            In order of <em className="text-accent">appearance</em>
          </h2>
        </Reveal>

        <dl className="mt-20 space-y-14">
          {experience.map((job) => (
            <Reveal key={job.org}>
              <div className="display-hover group">
                <dt className="label">
                  {job.role} · {job.period}
                </dt>
                <dd className="display mt-3 text-4xl text-ink sm:text-5xl">
                  {job.org}
                  {job.current && <span className="label ml-3 align-middle !text-accent">Now</span>}
                </dd>
                <dd className="mx-auto mt-3 max-w-lg leading-relaxed text-muted">{job.note}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-24 border-t border-border pt-14">
          <p className="label">Written, designed, animated &amp; built by</p>
          <p className="display mt-3 text-5xl text-ink sm:text-6xl">
            {SITE.fullName}
            <span className="text-accent">.</span>
          </p>
          <p className="label mt-6">B.E. Information Science — Ramaiah Institute of Technology, 2018</p>
        </Reveal>
      </div>
    </section>
  );
}
