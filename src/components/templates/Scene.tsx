import type { ReactNode } from "react";
import Kicker from "@/components/atoms/Kicker";
import Layer from "@/components/motion/Layer";
import type { StoryScene } from "@/lib/portfolioData";

/**
 * One shot of the process reel: a layer that fills the player's canvas, with
 * collage layers placed into it and the scene's copy lower-left. StoryPlayer
 * finds scenes by `data-scene` and animates their layers.
 *
 * Scenes lay out against the canvas, not the window: use container variants
 * (`@3xl:` ≈ md, `@5xl:` ≈ lg) and `cqw` units instead of `md:`/`lg:`/`vw`.
 */
export default function Scene({ data, copy, children }: { data: StoryScene; copy?: ReactNode; children: ReactNode }) {
  return (
    <div data-scene={data.id} className="story-scene absolute inset-0 overflow-hidden">
      <div className="relative mx-auto h-full w-full max-w-7xl">
        {children}
        <Layer
          name="Copy"
          depth={0.15}
          className="bottom-10 left-5 right-5 z-10 @2xl:bottom-14 @2xl:left-8 @3xl:right-auto @3xl:max-w-xl"
        >
          {copy ?? <SceneCopy data={data} />}
        </Layer>
      </div>
    </div>
  );
}

/** The standard scene copy block; scenes with custom copy can reuse it and add to it. */
export function SceneCopy({ data }: { data: StoryScene }) {
  return (
    <>
      <Kicker no={data.act}>{data.marker}</Kicker>
      <h3 className="display mt-3 text-[2.75rem] leading-[0.92] text-ink @2xl:text-7xl">{data.title}</h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted @2xl:text-lg">{data.body}</p>
    </>
  );
}
