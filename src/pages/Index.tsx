import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SportsSection } from "@/components/sections/SportsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { SponsorSection } from "@/components/sections/SponsorSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SportsSection />
      <EventsSection />
      <SponsorSection />
      <Footer />
    </div>
  );
};

export default Index;
