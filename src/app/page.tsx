import HeroSection from "@/components/HeroSection";
import WorkStrip from "@/components/WorkStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import FilmTeaser from "@/components/FilmTeaser";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkStrip />
      <CapabilitiesSection />
      <ExperienceSection />
      <FilmTeaser />
      <ContactSection />
    </main>
  );
}
