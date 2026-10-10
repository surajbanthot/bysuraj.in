import Tag from "@/components/atoms/Tag";
import Tape from "@/components/atoms/Tape";
import Scrap from "@/components/molecules/Scrap";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene } from "@/lib/portfolioData";

/** 03 — a UI window, type specimen, tokens and the grid behind them. */
export default function DesignScene() {
  return (
    <Scene data={getScene("design")}>
      <Layer name="UI window" enter="up" depth={0.35} rotate={-2} className="right-4 top-[12%] w-[min(30rem,calc(100vw-2.5rem))] md:right-[5%]">
        <Scrap tone="dark" seed={0.29} className="p-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-border" />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-3 h-16 bg-paper" />
            <div className="col-span-2 space-y-2">
              <div className="h-3 w-3/4 bg-ink/70" />
              <div className="h-3 w-full bg-border" />
              <div className="h-3 w-5/6 bg-border" />
              <Tag tone="accent" className="mt-2">
                Send ↗
              </Tag>
            </div>
            <div className="aspect-square bg-paper" />
          </div>
        </Scrap>
        <Tape className="-top-3 right-12" rotate={6} />
      </Layer>

      <Layer name="Type specimen" enter="left" depth={0.6} rotate={5} drag className="right-[36%] top-[50%] hidden lg:block">
        <Scrap tone="light" seed={0.52} className="px-6 py-4">
          <p className="display text-7xl leading-none">Aa</p>
          <p className="mt-1 font-mono text-sm uppercase text-paper/60">Fraunces · Geist</p>
        </Scrap>
      </Layer>

      <Layer name="Swatches" enter="right" depth={0.7} rotate={-4} drag className="right-[4%] top-[60%] hidden md:block">
        <Scrap tone="light" seed={0.66} className="p-4">
          <div className="flex gap-2">
            {["bg-paper", "bg-paper-raised", "bg-muted", "bg-accent"].map((c) => (
              <span key={c} className={`h-11 w-11 rounded-full border border-paper/20 ${c}`} />
            ))}
          </div>
          <p className="mt-2 font-mono text-sm uppercase text-paper/60">Tokens</p>
        </Scrap>
      </Layer>

      <Layer name="Toggle" enter="drop" depth={0.9} drag className="right-[46%] top-[26%] hidden lg:block">
        <span className="flex h-9 w-16 items-center justify-end rounded-full bg-accent p-1">
          <span className="h-7 w-7 rounded-full bg-ink" />
        </span>
      </Layer>

      <Layer name="Grid" enter="fade" depth={0.1} className="inset-y-[8%] right-[3%] hidden w-[46%] md:block">
        <div className="grid h-full grid-cols-12 gap-3 opacity-30">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="border-x border-accent/40" />
          ))}
        </div>
      </Layer>
    </Scene>
  );
}
