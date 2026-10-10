import Kicker from "@/components/atoms/Kicker";
import StoryPlayer from "@/components/organisms/story/StoryPlayer";
import StoryScenes from "@/components/organisms/story/StoryScenes";
import Reveal from "@/components/motion/Reveal";
import { storyScenes } from "@/lib/portfolioData";

/** 01 — the process reel, framed like a video so it never takes over the page. */
export default function ReelSection() {
  return (
    <section id="reel" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:pb-24 lg:pt-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <Kicker no="01">Process</Kicker>
            <h2 className="display mt-3 text-5xl leading-none text-ink sm:text-6xl">
              Watch me <em className="text-accent">work.</em>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-muted">
            A half-minute reel of how a piece gets made, cut like a motion piece. Pause it, jump
            to a chapter, drag the scraps around, or switch on keyframes to see how it&apos;s built.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 lg:mt-6">
        <StoryPlayer scenes={storyScenes}>
          <StoryScenes />
        </StoryPlayer>
        <p className="label mt-4 hidden [@media(pointer:fine)]:block">
          Keyboard: Space pause · ← → chapters · 0–7 jump · F fullscreen
        </p>
      </div>
    </section>
  );
}
