import OpenScene from "@/components/organisms/story/scenes/OpenScene";
import BriefScene from "@/components/organisms/story/scenes/BriefScene";
import StoryboardScene from "@/components/organisms/story/scenes/StoryboardScene";
import DesignScene from "@/components/organisms/story/scenes/DesignScene";
import AnimateScene from "@/components/organisms/story/scenes/AnimateScene";
import BuildScene from "@/components/organisms/story/scenes/BuildScene";
import DevelopScene from "@/components/organisms/story/scenes/DevelopScene";
import FinalCutScene from "@/components/organisms/story/scenes/FinalCutScene";

/** The home page's story, in order. StoryStage turns these into a scroll-driven piece. */
export default function StoryScenes() {
  return (
    <>
      <OpenScene />
      <BriefScene />
      <StoryboardScene />
      <DesignScene />
      <AnimateScene />
      <BuildScene />
      <DevelopScene />
      <FinalCutScene />
    </>
  );
}
