import type { ReactNode } from "react";
import Kicker from "@/components/atoms/Kicker";
import Layer from "@/components/motion/Layer";
import type { StoryScene } from "@/lib/portfolioData";

/**
 * One shot of the story: a full-screen frame that collage layers are placed
 * into, with the scene's copy lower-left. StoryStage finds scenes by
 * `data-scene` and animates their layers.
 */
export default function Scene({ data, copy, children }: { data: StoryScene; copy?: ReactNode; children: ReactNode }) {
  return (
    <div data-scene={data.id} id={data.id} className="story-scene relative min-h-svh overflow-hidden">
      <div className="relative mx-auto h-svh w-full max-w-7xl">
        {children}
        <Layer
          name="Copy"
          depth={0.15}
          className="bottom-24 left-5 right-5 z-10 sm:bottom-28 sm:left-8 md:right-auto md:max-w-xl"
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
      <h2 className="display mt-3 text-[2.75rem] leading-[0.92] text-ink sm:text-7xl">{data.title}</h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{data.body}</p>
    </>
  );
}
