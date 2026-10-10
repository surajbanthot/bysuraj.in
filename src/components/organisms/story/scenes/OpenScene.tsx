import Halftone from "@/components/atoms/Halftone";
import Stamp from "@/components/atoms/Stamp";
import Tape from "@/components/atoms/Tape";
import FilmStrip from "@/components/molecules/FilmStrip";
import Scrap from "@/components/molecules/Scrap";
import ShaderFrame from "@/components/molecules/ShaderFrame";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { filmFrames, getScene } from "@/lib/portfolioData";

/** 00 — the reel's title card. */
export default function OpenScene() {
  const data = getScene("open");
  return (
    <Scene
      data={data}
      copy={
        <>
          <p className="label !text-ink">
            {data.act} — {data.marker} · A process reel
          </p>
          <h3 className="display mt-4 text-[3.25rem] leading-[0.9] text-ink @2xl:text-8xl">
            How a piece <em className="text-accent">gets made.</em>
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted @2xl:text-lg">{data.body}</p>
        </>
      }
    >
      <Layer name="Halftone sun" enter="scale" depth={0.8} className="-right-[12%] top-[4%] w-[70cqw] max-w-[34rem] @3xl:right-[2%]">
        <Halftone className="aspect-square w-full opacity-60" />
      </Layer>

      <Layer name="Slate" enter="drop" depth={0.5} rotate={-4} drag className="left-5 top-[8%] @2xl:left-8 @3xl:top-[10%]">
        <Scrap tone="light" seed={0.42} className="px-5 py-4 font-mono text-sm uppercase">
          <p className="text-paper/60">Reel · Take 01</p>
          <p className="mt-1">Brief → Final cut · 8 scenes</p>
        </Scrap>
        <Tape className="-top-3 left-6" rotate={-6} seed={0.15} />
      </Layer>

      <Layer name="Stamp" enter="spin" depth={0.9} className="right-[6%] top-[52%] hidden w-36 @3xl:block">
        <Stamp text="EST · 2018 · BENGALURU · INDIA · " />
      </Layer>

      <Layer name="Contact sheet" enter="right" depth={0.7} rotate={7} drag className="right-[20%] top-[46%] hidden w-[24rem] @5xl:block">
        <FilmStrip>
          {filmFrames.slice(0, 3).map((f) => (
            <ShaderFrame key={f.title} seed={f.seed} src={f.src} alt={f.title} sizes="8rem" className="aspect-square flex-1" />
          ))}
        </FilmStrip>
        <Tape className="-top-2 right-6" rotate={-8} seed={0.7} />
      </Layer>
    </Scene>
  );
}
