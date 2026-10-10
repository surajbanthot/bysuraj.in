"use client";

import ShaderFrame from "@/components/molecules/ShaderFrame";
import { useInView } from "@/lib/useInView";
import type { FilmFrame } from "@/lib/portfolioData";

/** A film frame that starts as a negative and develops once it scrolls in. */
export default function FilmFrameCard({
  frame,
  className = "",
}: {
  frame: FilmFrame;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.5 });

  return (
    <figure ref={ref} className={`group ${className}`}>
      <ShaderFrame
        seed={frame.seed}
        src={frame.src}
        alt={frame.title}
        sizes="(min-width: 768px) 33vw, 100vw"
        className={`develop aspect-[7/6] ${inView ? "is-visible" : ""}`}
      />
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-sm text-ink">{frame.title}</span>
        <span className="label">{frame.stock}</span>
      </figcaption>
    </figure>
  );
}
