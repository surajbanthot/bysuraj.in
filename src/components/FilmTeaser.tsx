import Link from "next/link";
import FilmFrameCard from "@/components/FilmFrameCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { camera, filmFrames } from "@/lib/portfolioData";

export default function FilmTeaser() {
  return (
    <section id="film" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
      <SectionHeading no="04" title={<>On <em className="text-accent">film</em></>} kicker={`${camera.name} · 6×7`} />

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="display text-3xl leading-tight text-ink">
            Ten frames a roll. I shoot film to slow down and choose each frame on purpose.
          </p>
          <p className="mt-6 leading-relaxed text-muted">{camera.note}</p>
          <Link
            href="/film"
            className="link-underline mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-ink"
          >
            Open the contact sheet <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:col-span-8">
          {filmFrames.slice(0, 4).map((frame, i) => (
            <FilmFrameCard key={frame.title} frame={frame} className={i % 2 ? "md:mt-16" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
