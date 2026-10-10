import type { Metadata } from "next";
import Link from "next/link";
import FilmFrameCard from "@/components/FilmFrameCard";
import Reveal from "@/components/Reveal";
import { SITE, camera, filmFrames } from "@/lib/portfolioData";

export const metadata: Metadata = {
  title: "Film",
  description: `Medium-format film photography by ${SITE.fullName}, shot on a ${camera.name}.`,
  alternates: { canonical: "/film" },
};

export default function FilmPage() {
  return (
    <main id="top" className="pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <header className="grid gap-10 border-b border-border pb-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label text-accent">Contact sheet · {camera.name}</p>
            <h1 className="display hero-letter mt-5 text-7xl leading-[0.85] text-ink sm:text-[10rem]">
              On <em className="text-accent">film</em>
            </h1>
          </div>
          <div className="self-end md:col-span-4">
            <p className="leading-relaxed text-muted">{camera.note}</p>
            <p className="mt-4 leading-relaxed text-muted">
              I look for quiet light, strong geometry and subjects with texture. Frames start
              out as negatives here and develop as you scroll.
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-6 inline-flex font-mono text-sm uppercase tracking-wider text-ink"
            >
              More frames on Instagram ↗
            </a>
          </div>
        </header>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filmFrames.map((frame, i) => (
            <FilmFrameCard key={frame.title} frame={frame} className={i % 3 === 1 ? "lg:mt-20" : ""} />
          ))}
        </div>

        <Reveal className="my-28 border-t border-border pt-10">
          <p className="display max-w-3xl text-4xl leading-tight text-ink">
            I take portrait and editorial commissions on 6×7.{" "}
            <Link href="/#contact" className="link-underline text-accent">
              Book a shoot →
            </Link>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
