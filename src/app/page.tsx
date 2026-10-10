import StoryStage from "@/components/organisms/story/StoryStage";
import StoryScenes from "@/components/organisms/story/StoryScenes";
import CapabilitiesSection from "@/components/organisms/CapabilitiesSection";
import ExperienceSection from "@/components/organisms/ExperienceSection";
import ContactSection from "@/components/organisms/ContactSection";
import { storyScenes } from "@/lib/portfolioData";

// No request-time data: prerender at build (also lets vinext classify the route).
export const dynamic = "force-static";

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
