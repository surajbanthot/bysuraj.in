import Keyframe from "@/components/atoms/Keyframe";
import Scribble from "@/components/atoms/Scribble";
import Scrap from "@/components/molecules/Scrap";
import Layer from "@/components/motion/Layer";
import Scene from "@/components/templates/Scene";
import { getScene } from "@/lib/portfolioData";

/** 04 — graph editor, keyframe track with a moving ball, a Rive state machine. */
export default function AnimateScene() {
  return (
    <Scene data={getScene("animate")}>
      <Layer name="Graph editor" enter="up" depth={0.35} rotate={1.5} className="right-4 top-[11%] w-[min(24rem,calc(100vw-2.5rem))] md:right-[6%]">
        <Scrap tone="dark" seed={0.18} className="p-5">
          <p className="font-mono text-sm uppercase text-faint">Graph editor · power3.inOut</p>
          <svg viewBox="0 0 200 150" aria-hidden="true" fill="none" className="mt-3 w-full overflow-visible">
            <path d="M10 140H195M10 140V5" stroke="var(--border)" strokeWidth="1.5" />
            <path d="M10 140 L 95 140 M 190 10 L 105 10" stroke="var(--faint)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="95" cy="140" r="4" fill="var(--ink)" />
            <circle cx="105" cy="10" r="4" fill="var(--ink)" />
            <path data-draw d="M10 140 C 95 140, 105 10, 190 10" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Scrap>
      </Layer>

      <Layer name="Keyframe track" enter="right" depth={0.5} className="right-4 top-[52%] w-[min(30rem,calc(100vw-2.5rem))] md:right-[5%] md:top-[60%]">
        <Scrap tone="light" seed={0.44} className="p-5">
          <div className="relative h-10">
            {[0.18, 0.36, 0.54, 0.72].map((x) => (
              <span key={x} className="absolute top-1 h-8 w-8 rounded-full bg-accent" style={{ left: `calc(${x * 100}% - 1rem)`, opacity: x * 0.5 }} />
            ))}
            <span data-move="calc(100% - 2rem)" className="absolute left-0 top-1 h-8 w-8 rounded-full bg-accent" />
          </div>
          <div className="relative mt-3 flex items-center justify-between border-t border-paper/20 pt-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Keyframe key={i} filled={i % 2 === 0} />
            ))}
          </div>
          <p className="mt-2 font-mono text-sm uppercase text-paper/60">Position · 5 keys · onion skin</p>
        </Scrap>
      </Layer>

      <Layer name="State machine" enter="left" depth={0.7} rotate={-3} drag className="right-[40%] top-[17%] hidden lg:block">
        <Scrap tone="accent" seed={0.83} className="p-4">
          <p className="font-mono text-sm uppercase">Rive state machine</p>
          <p className="mt-2 flex items-center gap-2 font-mono text-sm">
            <span className="border border-paper px-2 py-1">Idle</span>→
            <span className="border border-paper px-2 py-1">Hover</span>→
            <span className="bg-paper px-2 py-1 text-ink">Press</span>
          </p>
        </Scrap>
      </Layer>

      <Layer name="Motion path" enter="fade" depth={0.2} className="right-[30%] top-[40%] hidden w-64 lg:block">
        <Scribble viewBox="0 0 260 120" className="h-28 w-full" strokeWidth={2} d={["M10 100 C 60 10, 160 10, 250 70", "M236 56 L 252 72 L 230 76"]} />
      </Layer>
    </Scene>
  );
}
