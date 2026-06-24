import type { Metadata } from "next";
import { AstralHero } from "@/components/realms/astral/AstralHero";
import { AstralIntroduction } from "@/components/realms/astral/AstralIntroduction";
import { AstralSubspaces } from "@/components/realms/astral/AstralSubspaces";
import { AstralTopics } from "@/components/realms/astral/AstralTopics";
import { AstralJourney } from "@/components/realms/astral/AstralJourney";
import { AstralQuote } from "@/components/realms/astral/AstralQuote";
import { astralHero } from "@/lib/content/astral";

export const metadata: Metadata = {
  title: "Astralreisen",
  description: `${astralHero.subtitle} ${astralHero.text}`,
};

export default function AstralreisenPage() {
  return (
    <>
      <AstralHero />
      <AstralIntroduction />
      <AstralSubspaces />
      <AstralTopics />
      <AstralJourney />
      <AstralQuote />
    </>
  );
}
