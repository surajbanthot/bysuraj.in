import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ShaderFrame from "@/components/ShaderFrame";
import { getProject, projects } from "@/lib/portfolioData";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CasePage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="top" className="pt-28">
      <article className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Link href="/#work" className="label transition-colors hover:!text-accent">
          ← All work
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-9">
            <p className="label text-accent">
              Case {project.no} — {project.client}
            </p>
            <h1 className="display hero-letter mt-5 text-6xl leading-[0.9] text-ink sm:text-8xl">
              {project.title}
            </h1>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-end md:col-span-3 md:grid-cols-1">
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-1 text-ink">{project.period}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1 text-ink">{project.role}</dd>
            </div>
          </dl>
        </header>

        <ShaderFrame
          seed={project.seed}
          src={project.cover}
          alt={`${project.title} — cover`}
          priority
          sizes="100vw"
          className="mt-14 aspect-[16/9]"
        />

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="display text-3xl leading-tight text-ink sm:text-4xl">{project.summary}</p>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={100}>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-sm uppercase tracking-wider text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-24 space-y-px border border-border bg-border">
          {[
            { label: "Problem", body: <p>{project.problem}</p> },
            {
              label: "Approach",
              body: (
                <ol className="space-y-4">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="label pt-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              ),
            },
            { label: "Outcome", body: <p>{project.outcome}</p> },
          ].map((block) => (
            <Reveal key={block.label}>
              <section className="grid gap-6 bg-paper p-7 sm:p-10 md:grid-cols-12">
                <h2 className="label md:col-span-3">{block.label}</h2>
                <div className="text-lg leading-relaxed text-muted md:col-span-8">{block.body}</div>
              </section>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
          Some of this work is under NDA, so these notes describe the problem, the craft and
          my contribution without private product details.
        </p>
      </article>

      <Link
        href={`/work/${next.slug}`}
        data-cursor="Next"
        className="display-hover group mt-28 block border-t border-border"
      >
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 py-16 sm:px-8 sm:py-24">
          <div>
            <span className="label">Next case</span>
            <p className="display mt-4 text-5xl leading-none text-ink transition-colors group-hover:text-accent sm:text-8xl">
              {next.title}
            </p>
          </div>
          <span aria-hidden="true" className="display text-6xl text-accent transition-transform group-hover:translate-x-2">
            →
          </span>
        </div>
      </Link>
    </main>
  );
}
