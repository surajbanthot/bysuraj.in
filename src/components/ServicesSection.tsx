import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/portfolioData";

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="05" title="Services" kicker="Available for freelance" />

      <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={(i % 2) * 90}>
            <article className="service-card flex h-full flex-col gap-5 bg-paper p-7 sm:p-9">
              <div className="flex items-baseline justify-between">
                <span className="service-number label">{service.no}</span>
              </div>
              <div>
                <h3 className="service-title display text-2xl text-ink sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{service.blurb}</p>
              </div>

              <ul className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="service-tag border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-4 pt-2">
                {service.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="micro-link link-underline font-mono text-sm uppercase tracking-widest text-ink"
                  >
                    <span>{link.label}</span>
                    <span className="micro-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
