import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { RealmsSection } from "@/components/home/RealmsSection";
import { LuminalisSection } from "@/components/home/LuminalisSection";
import { KlangraumSection } from "@/components/home/KlangraumSection";
import { AboutSection } from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <RealmsSection />
      <LuminalisSection />
      <KlangraumSection />
      <AboutSection />
    </>
  );
}
