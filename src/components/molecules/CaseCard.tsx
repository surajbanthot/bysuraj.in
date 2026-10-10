import Link from "next/link";
import ShaderFrame from "@/components/molecules/ShaderFrame";
import Scrap from "@/components/molecules/Scrap";
import type { Project } from "@/lib/portfolioData";

/** A project as a taped-up print: cover frame with a torn caption, linking to its case study. */
export default function CaseCard({ project, captionSeed = 0.2 }: { project: Project; captionSeed?: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="display-hover group block transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]"
    >
      <ShaderFrame seed={project.seed} src={project.cover} alt={`${project.title} — cover`} sizes="20rem" className="aspect-[4/3]" />
      <Scrap tone="light" seed={captionSeed} className="-mt-3 ml-3 mr-[-0.5rem] p-3 sm:p-4">
        <p className="font-mono text-sm uppercase text-paper/60">
          {project.no} · {project.client}
        </p>
        <p className="display mt-1 text-lg leading-tight sm:text-2xl">{project.title}</p>
      </Scrap>
    </Link>
  );
}
