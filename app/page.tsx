import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { MovementSection } from "@/components/home/MovementSection";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";
import { RealmsSection } from "@/components/home/RealmsSection";
import { LightLibrarySection } from "@/components/home/LightLibrarySection";
import { LuminalisSection } from "@/components/home/LuminalisSection";
import { ImpulseSection } from "@/components/home/ImpulseSection";
import { KlangraumSection } from "@/components/home/KlangraumSection";
import { AboutSection } from "@/components/home/AboutSection";
import { QuoteSection } from "@/components/home/QuoteSection";

export default function HomePage() {
  return (
    <>
      {/* 1 · Willkommen am Tor */}
      <HeroSection />
      {/* 2 · Du befindest dich in einem Erinnerungsraum */}
      <IntroSection />
      {/* 3 · So bewegst du dich hier */}
      <MovementSection />
      {/* 4 · Wähle deinen Zugang */}
      <QuickAccessSection />
      {/* 5 · Die Räume der Erinnerung */}
      <RealmsSection />
      {/* 6 · Die Lichtbibliothek – geschriebene Tore */}
      <LightLibrarySection />
      {/* 7 · Luminalis */}
      <LuminalisSection />
      {/* 7 · Aktuelle Impulse */}
      <ImpulseSection />
      <KlangraumSection />
      <AboutSection />
      {/* 8 · Abschluss / Rückkehr zum Tor */}
      <QuoteSection />
    </>
  );
}
