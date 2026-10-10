import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { lanes } from "@/lib/portfolioData";

/** Two lanes, equal weight: hire me full-time, or commission me. */
export default function CapabilitiesSection() {
  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
      <SectionHeading no="08" title={<>Two ways <em className="text-accent">in</em></>} kicker="Roles · Commissions" />

      <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
        {lanes.map((lane, i) => (
          <Reveal key={lane.id} delay={i * 120} className="h-full">
            <article className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-500 hover:bg-paper-raised sm:p-10">
              <span className="label">{lane.kicker}</span>
              <h3 className="display mt-4 text-5xl leading-none text-ink transition-colors group-hover:text-accent sm:text-6xl">
                {lane.title}
              </h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{lane.pitch}</p>

              <ul className="mt-10 border-t border-border">
                {lane.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-ink">{item.title}</span>
                    <span className="font-mono text-sm text-faint sm:text-right">{item.detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                {lane.cta.map((cta, c) => {
                  const external = cta.href.startsWith("http");
                  return (
                    <a
                      key={cta.label}
                      href={cta.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm uppercase tracking-wider transition-colors ${
                        c === 0
                          ? "bg-ink text-paper hover:bg-accent"
                          : "border border-border text-ink hover:border-accent hover:text-accent"
                      }`}
                    >
                      {cta.label}
                      <span aria-hidden="true">{external ? "↗" : "→"}</span>
                    </a>
                  );
                })}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
