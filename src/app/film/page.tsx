import type { Metadata } from "next";
import Kicker from "@/components/atoms/Kicker";
import TextLink from "@/components/atoms/TextLink";
import FilmFrameCard from "@/components/molecules/FilmFrameCard";
import Reveal from "@/components/motion/Reveal";
import SubpageShell from "@/components/templates/SubpageShell";
import { SITE, camera, filmFrames } from "@/lib/portfolioData";

// No request-time data: prerender at build (also lets vinext classify the route).
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Film",
  description: `Medium-format film photography by ${SITE.fullName}, shot on a ${camera.name}.`,
  alternates: { canonical: "/film" },
};

export default function FilmPage() {
  return (
    <SubpageShell>
        <header className="grid gap-10 border-b border-border pb-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Kicker>Contact sheet · {camera.name}</Kicker>
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
            <TextLink href={SITE.instagram} mono className="mt-6">
              More frames on Instagram ↗
            </TextLink>
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
            <TextLink href="/#contact" className="text-accent">
              Book a shoot →
            </TextLink>
          </p>
        </Reveal>
    </SubpageShell>
  );
}
