import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import StackSection from "@/components/StackSection";
import ServicesSection from "@/components/ServicesSection";
import FilmSection from "@/components/FilmSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative z-[2]">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StackSection />
      <ServicesSection />
      <FilmSection />
      <ContactSection />
    </main>
  );
}
