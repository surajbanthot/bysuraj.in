import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/portfolioData";

export default function StackSection() {
  return (
    <section id="stack" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="04" title="Stack" kicker="Tools & technologies" />

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={(i % 4) * 80}>
            <h3 className="label border-b border-border pb-2 text-ink">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-lg text-muted transition-colors hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
