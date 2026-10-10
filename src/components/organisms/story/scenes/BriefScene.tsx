import Halftone from "@/components/atoms/Halftone";
import Scribble from "@/components/atoms/Scribble";
import Tape from "@/components/atoms/Tape";
import Scrap from "@/components/molecules/Scrap";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene } from "@/lib/portfolioData";

const brief = [
  ["Client", "Shell × Quantzig"],
  ["Problem", "Thousands of documents. Nobody can find anything."],
  ["Goal", "Answers people trust, with the source attached."],
  ["Due", "Yesterday."],
];

/** 01 — a creative brief with sticky-note questions around it. */
export default function BriefScene() {
  return (
    <Scene data={getScene("brief")}>
      <Layer name="Brief doc" enter="drop" depth={0.4} rotate={2} className="right-4 top-[12%] w-[min(26rem,calc(100vw-2.5rem))] md:right-[6%]">
        <Scrap tone="light" seed={0.13} className="p-6 sm:p-7">
          <p className="font-mono text-sm uppercase tracking-wider text-paper/60">Creative brief</p>
          <dl className="mt-4 space-y-3 text-paper">
            {brief.map(([k, v]) => (
              <div key={k} className="relative grid grid-cols-[5rem_1fr] gap-2">
                <dt className="font-mono text-sm uppercase text-paper/60">{k}</dt>
                <dd className="text-base leading-snug">{v}</dd>
                {k === "Goal" && (
                  <Scribble
                    viewBox="0 0 300 70"
                    className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]"
                    d="M20 40 C 20 8, 280 2, 290 30 C 298 60, 60 70, 14 52 C 0 44, 30 20, 80 14"
                  />
                )}
              </div>
            ))}
          </dl>
        </Scrap>
        <Tape className="-top-3 left-8" rotate={-6} />
        <Tape className="-bottom-3 right-10" rotate={5} seed={0.9} />
      </Layer>

      <Layer name="Sticky — who" enter="drop" depth={0.8} rotate={-8} drag className="right-[38%] top-[13%] hidden lg:block">
        <Scrap tone="accent" seed={0.33} className="w-44 p-4">
          <p className="display text-2xl leading-tight">Who is it for?</p>
        </Scrap>
      </Layer>
      <Layer name="Sticky — change" enter="right" depth={0.6} rotate={6} drag className="right-[2%] top-[64%] hidden md:block">
        <Scrap tone="dark" seed={0.47} className="w-48 p-4">
          <p className="display text-2xl leading-tight">What has to change?</p>
        </Scrap>
      </Layer>
      <Layer name="Sticky — proof" enter="up" depth={0.7} rotate={-3} drag className="right-[31%] top-[52%] hidden lg:block">
        <Scrap tone="light" seed={0.61} className="w-52 p-4">
          <p className="display text-2xl leading-tight">How will we know it worked?</p>
        </Scrap>
      </Layer>
      <Layer name="Halftone" enter="scale" depth={0.9} className="right-[22%] top-[6%] hidden w-40 md:block">
        <Halftone tone="ink" className="aspect-square w-full" />
      </Layer>
    </Scene>
  );
}
