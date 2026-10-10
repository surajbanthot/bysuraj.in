import IstClock from "@/components/atoms/IstClock";
import SplitText from "@/components/atoms/SplitText";
import Halftone from "@/components/atoms/Halftone";
import Stamp from "@/components/atoms/Stamp";
import Tape from "@/components/atoms/Tape";
import FilmStrip from "@/components/molecules/FilmStrip";
import ShaderFrame from "@/components/molecules/ShaderFrame";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { SITE, filmFrames, getScene } from "@/lib/portfolioData";

/** 00 — the title card. The only scene that assembles on load rather than on scroll. */
export default function OpenScene() {
  const data = getScene("open");
  return (
    <Scene
      data={data}
      copy={
        <div className="collage-in" style={{ animationDelay: "650ms" }}>
          <p className="label flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2 !text-ink">
              <span className="h-2 w-2 rounded-full bg-accent" /> Open to roles & commissions
            </span>
            <span>{SITE.location}</span>
            <IstClock />
          </p>
          <p className="display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
            <span className="text-accent">{SITE.role}.</span> {data.title}
          </p>
          <p className="label mt-5 !text-ink">{data.body} ↓</p>
        </div>
      }
    >
      <Layer name="Halftone sun" enter="scale" depth={0.8} intro={0} className="-right-[12%] top-[6%] w-[70vw] max-w-[34rem] md:right-[2%]">
        <Halftone className="aspect-square w-full opacity-60" />
      </Layer>

      <Layer name="Title" enter="fade" depth={0.3} className="left-5 right-5 top-[15%] sm:left-8 md:top-[16%]">
        <h1 className="display text-[17vw] leading-[0.82] text-ink lg:text-[11.5rem]">
          <SplitText
            text={SITE.fullName}
            letterClassName="hero-letter"
            stagger={28}
            trailing={
              <span className="hero-letter inline-block text-accent" style={{ animationDelay: "420ms" }}>
                .
              </span>
            }
          />
        </h1>
      </Layer>

      <Layer name="Stamp" enter="spin" depth={0.9} intro={1} className="right-[6%] top-[52%] hidden w-36 md:block">
        <Stamp text="EST · 2018 · BENGALURU · INDIA · " />
      </Layer>

      <Layer name="Contact sheet" enter="right" depth={0.7} rotate={7} drag intro={2} className="right-[20%] top-[50%] hidden w-[24rem] lg:block">
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
