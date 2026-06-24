import type { Metadata } from "next";
import { SymbolsHero } from "@/components/realms/symbols/SymbolsHero";
import { SymbolsIntroduction } from "@/components/realms/symbols/SymbolsIntroduction";
import { SymbolsSubspaces } from "@/components/realms/symbols/SymbolsSubspaces";
import { SymbolsTopics } from "@/components/realms/symbols/SymbolsTopics";
import { SymbolsJourney } from "@/components/realms/symbols/SymbolsJourney";
import { SymbolsQuote } from "@/components/realms/symbols/SymbolsQuote";
import { symbolsHero } from "@/lib/content/symbols";

export const metadata: Metadata = {
  title: "Symbole",
  description: `${symbolsHero.subtitle} ${symbolsHero.text}`,
};

export default function SymbolePage() {
  return (
    <>
      <SymbolsHero />
      <SymbolsIntroduction />
      <SymbolsSubspaces />
      <SymbolsTopics />
      <SymbolsJourney />
      <SymbolsQuote />
    </>
  );
}
