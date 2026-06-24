import type { Metadata } from "next";
import { EarthCosmosHero } from "@/components/realms/earth-cosmos/EarthCosmosHero";
import { EarthCosmosIntroduction } from "@/components/realms/earth-cosmos/EarthCosmosIntroduction";
import { EarthCosmosSubspaces } from "@/components/realms/earth-cosmos/EarthCosmosSubspaces";
import { EarthCosmosTopics } from "@/components/realms/earth-cosmos/EarthCosmosTopics";
import { EarthCosmosJourney } from "@/components/realms/earth-cosmos/EarthCosmosJourney";
import { EarthCosmosQuote } from "@/components/realms/earth-cosmos/EarthCosmosQuote";
import { earthCosmosHero } from "@/lib/content/earthCosmos";

export const metadata: Metadata = {
  title: "Erde & Kosmos",
  description: `${earthCosmosHero.subtitle} ${earthCosmosHero.text}`,
};

export default function ErdeKosmosPage() {
  return (
    <>
      <EarthCosmosHero />
      <EarthCosmosIntroduction />
      <EarthCosmosSubspaces />
      <EarthCosmosTopics />
      <EarthCosmosJourney />
      <EarthCosmosQuote />
    </>
  );
}
