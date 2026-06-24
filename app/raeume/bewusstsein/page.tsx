import type { Metadata } from "next";
import { ConsciousnessHero } from "@/components/realms/consciousness/ConsciousnessHero";
import { ConsciousnessIntroduction } from "@/components/realms/consciousness/ConsciousnessIntroduction";
import { ConsciousnessSubspaces } from "@/components/realms/consciousness/ConsciousnessSubspaces";
import { ConsciousnessTopics } from "@/components/realms/consciousness/ConsciousnessTopics";
import { ConsciousnessJourney } from "@/components/realms/consciousness/ConsciousnessJourney";
import { ConsciousnessQuote } from "@/components/realms/consciousness/ConsciousnessQuote";
import { consciousnessHero } from "@/lib/content/consciousness";

export const metadata: Metadata = {
  title: "Bewusstsein",
  description: `${consciousnessHero.subtitle} ${consciousnessHero.text}`,
};

export default function BewusstseinPage() {
  return (
    <>
      <ConsciousnessHero />
      <ConsciousnessIntroduction />
      <ConsciousnessSubspaces />
      <ConsciousnessTopics />
      <ConsciousnessJourney />
      <ConsciousnessQuote />
    </>
  );
}
