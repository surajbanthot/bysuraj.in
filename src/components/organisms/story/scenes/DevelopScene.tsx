import Scribble from "@/components/atoms/Scribble";
import Tape from "@/components/atoms/Tape";
import TextLink from "@/components/atoms/TextLink";
import FilmStrip from "@/components/molecules/FilmStrip";
import Scrap from "@/components/molecules/Scrap";
import ShaderFrame from "@/components/molecules/ShaderFrame";
import Layer from "@/components/motion/Layer";
import Scene, { SceneCopy } from "@/components/templates/Scene";
import { camera, filmFrames, getScene } from "@/lib/portfolioData";

/** 06 — the film interlude: a strip with a circled keeper, linking to /film. */
export default function DevelopScene() {
  const data = getScene("develop");
  return (
    <Scene
      data={data}
      copy={
        <>
          <SceneCopy data={data} />
          <TextLink href="/film" mono className="mt-5">
            Open the contact sheet →
          </TextLink>
        </>
      }
    >
      <Layer name="Film strip" enter="left" depth={0.4} rotate={-4} className="right-4 top-[13%] w-[min(40rem,calc(100cqw-2.5rem))] @3xl:right-[3%]">
        <FilmStrip>
          {filmFrames.slice(0, 3).map((f, i) => (
            <figure key={f.title} className="relative flex-1">
              <ShaderFrame seed={f.seed} src={f.src} alt={f.title} sizes="14rem" className="aspect-[7/6]" />
              <figcaption className="mt-1 font-mono text-sm text-faint">{f.stock}</figcaption>
              {i === 1 && (
                <Scribble viewBox="0 0 100 100" className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" d="M50 4 C 90 4, 98 40, 94 60 C 88 94, 20 98, 8 70 C -2 44, 14 6, 56 8" />
              )}
            </figure>
          ))}
        </FilmStrip>
      </Layer>
      <Layer name="Keeper note" enter="drop" depth={0.8} rotate={-6} className="right-[24%] top-[50%] hidden @3xl:block">
        <p className="display text-4xl italic text-accent">keeper!</p>
      </Layer>
      <Layer name="Camera tag" enter="right" depth={0.6} rotate={3} drag className="right-[4%] top-[58%] hidden @3xl:block">
        <Scrap tone="light" seed={0.71} className="px-4 py-3 font-mono text-sm uppercase">
          {camera.name} · 6×7 · Portra 400
        </Scrap>
        <Tape className="-top-3 left-6" rotate={-10} seed={0.2} />
      </Layer>
    </Scene>
  );
}
