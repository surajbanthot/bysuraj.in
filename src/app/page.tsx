import StoryStage from "@/components/StoryStage";
import StoryScenes from "@/components/StoryScenes";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { storyScenes } from "@/lib/portfolioData";

export default function Home() {
  return (
    <main>
      <StoryStage scenes={storyScenes}>
        <StoryScenes />
      </StoryStage>
      <CapabilitiesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
