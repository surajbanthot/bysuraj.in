import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import StackSection from "@/components/StackSection";
import ServicesSection from "@/components/ServicesSection";
import FilmSection from "@/components/FilmSection";
import ContactSection from "@/components/ContactSection";
import { DarkroomEasterEgg } from "@/components/PortfolioInteractions";

export default function Home() {
  return (
    <main className="relative z-[2]">
      <HeroSection />
      <SelectedWorkSection />
      <AboutSection />
      <ExperienceSection />
      <StackSection />
      <ServicesSection />
      <FilmSection />
      <ContactSection />
      <DarkroomEasterEgg />
    </main>
  );
}
