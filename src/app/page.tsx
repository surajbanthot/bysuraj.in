import HeroSection from "@/components/organisms/HeroSection";
import ReelSection from "@/components/organisms/ReelSection";
import WorkSection from "@/components/organisms/WorkSection";
import CapabilitiesSection from "@/components/organisms/CapabilitiesSection";
import ExperienceSection from "@/components/organisms/ExperienceSection";
import ContactSection from "@/components/organisms/ContactSection";

// No request-time data: prerender at build (also lets vinext classify the route).
export const dynamic = "force-static";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ReelSection />
      <WorkSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
