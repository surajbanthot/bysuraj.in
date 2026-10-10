"use client";

import Link from "next/link";
import { useRef } from "react";
import { track } from "@vercel/analytics";
import ShaderFrame from "@/components/ShaderFrame";
import { gsap, useGSAP } from "@/lib/motion";
import { projects } from "@/lib/portfolioData";

/**
 * Selected work as a strip of negatives. On large screens (with motion
 * allowed) the section pins and the strip scrolls sideways; everywhere else
 * it's a plain vertical stack.
 */
export default function WorkStrip() {
  const section = useRef<HTMLElement>(null);
  const track_ = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const strip = track_.current;
        if (!strip) return;
        const distance = () => strip.scrollWidth - window.innerWidth;
        gsap.to(strip, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section id="work" ref={section} className="relative overflow-hidden py-20 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:pb-0 lg:pt-16">
      <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
        <h2 className="display text-6xl leading-none text-ink sm:text-8xl">
          Selected <em className="text-accent">work</em>
        </h2>
        <span className="label hidden pb-2 sm:block">
          {String(projects.length).padStart(2, "0")} case notes · 2022—Now
        </span>
      </div>

      <div
        ref={track_}
        className="flex flex-col gap-6 px-5 sm:px-8 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-[20vw]"
      >
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            data-cursor="View"
            onClick={() => track("case_open", { slug: project.slug })}
            className="display-hover group relative block lg:w-[min(62vw,52rem)]"
          >
            <ShaderFrame
              seed={project.seed}
              src={project.cover}
              alt={`${project.title} — cover`}
              priority={i === 0}
              className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[0.98] lg:aspect-[16/10]"
            />
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="label">
                  {project.no} — {project.client}
                </p>
                <h3 className="display mt-2 text-3xl leading-tight text-ink sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{project.summary}</p>
              </div>
              <span className="label shrink-0 pt-1">{project.period}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
