import type { Metadata } from "next";
import { FrequencyHero } from "@/components/realms/frequency/FrequencyHero";
import { FrequencyIntroduction } from "@/components/realms/frequency/FrequencyIntroduction";
import { FrequencySubspaces } from "@/components/realms/frequency/FrequencySubspaces";
import { FrequencyTopics } from "@/components/realms/frequency/FrequencyTopics";
import { FrequencyJourney } from "@/components/realms/frequency/FrequencyJourney";
import { FrequencyQuote } from "@/components/realms/frequency/FrequencyQuote";
import { frequencyHero } from "@/lib/content/frequency";

export const metadata: Metadata = {
  title: "Frequenz",
  description: `${frequencyHero.subtitle} ${frequencyHero.text}`,
};

export default function FrequenzPage() {
  return (
    <>
      <FrequencyHero />
      <FrequencyIntroduction />
      <FrequencySubspaces />
      <FrequencyTopics />
      <FrequencyJourney />
      <FrequencyQuote />
    </>
  );
}
