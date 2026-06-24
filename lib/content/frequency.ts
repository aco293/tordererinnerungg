/**
 * Inhalte des Frequenzraums (/raeume/frequenz).
 *
 * Fortsetzung des Bewusstseinsraums: Wo Bewusstsein fragt „Wer nimmt wahr?“,
 * fragt Frequenz „Wie wirkt Wahrnehmung?“. Alle Inhalte sind hier gebündelt.
 *
 * Die sechs Themen tragen den Status „In Vorbereitung“ und eigene Titel; sie
 * werden daher hier definiert (nicht aus der Lichtbibliothek übernommen).
 */

import type { GlowTone } from "@/lib/content/library";
import type { TopicCardData } from "@/components/library/LibraryTopicCard";

export const frequencyHero = {
  eyebrow: "Frequenzraum",
  title: "Frequenz",
  subtitle: "Die Schwingung aller Form.",
  text: "Alles bewegt sich. Gedanken, Emotionen, Worte und Begegnungen hinterlassen Resonanzen. Dieser Raum lädt dazu ein, die Sprache der Frequenz zu erkunden.",
  cta: { label: "Den Raum betreten", href: "#einfuehrung" },
} as const;

export const frequencyIntro = {
  eyebrow: "Einführung",
  title: "Die unsichtbare Sprache",
  paragraphs: [
    "Vieles, was zwischen Menschen geschieht, lässt sich nicht in Worte fassen. Eine Stimmung im Raum, ein Gefühl bei einer Begegnung, ein Ton, der lange nachklingt – wir spüren mehr, als wir benennen können.",
    "Frequenz ist hier kein Messwert und keine Behauptung über die Welt. Es ist eine ruhige Einladung, genauer hinzuspüren: Was bewegt sich in mir, und wie antwortet das, was mir begegnet?",
  ],
  aspects: [
    {
      title: "Resonanz",
      text: "Manches berührt uns sofort, anderes lässt uns unberührt. In dieser Antwort zeigt sich etwas über uns selbst.",
    },
    {
      title: "Wirkung",
      text: "Was wir denken und fühlen, bleibt selten folgenlos – es färbt, wie wir handeln und wahrgenommen werden.",
    },
    {
      title: "Wahrnehmung",
      text: "Wir nehmen nicht nur Inhalte wahr, sondern auch deren Schwingung – den Ton unter den Worten.",
    },
    {
      title: "Verbindung",
      text: "Zwischen innerem Erleben und äußerer Welt besteht ein leiser, durchlässiger Austausch.",
    },
  ],
} as const;

export type Subspace = {
  id: string;
  title: string;
  symbol: string;
  description: string;
  glow: GlowTone;
};

export const frequencySubspaces: Subspace[] = [
  {
    id: "resonanz",
    title: "Resonanz",
    symbol: "≋",
    description:
      "Warum bestimmte Menschen, Orte und Situationen in uns etwas auslösen.",
    glow: "gold",
  },
  {
    id: "emotionen",
    title: "Emotionen",
    symbol: "◍",
    description: "Die bewegte Sprache unseres inneren Erlebens.",
    glow: "violet",
  },
  {
    id: "gedanken",
    title: "Gedanken",
    symbol: "◌",
    description: "Wie Gedanken Aufmerksamkeit lenken und Wirklichkeit färben.",
    glow: "blue",
  },
  {
    id: "klang",
    title: "Klang",
    symbol: "∿",
    description: "Schwingung als hörbarer Ausdruck von Frequenz.",
    glow: "gold",
  },
  {
    id: "frequenzfelder",
    title: "Frequenzfelder",
    symbol: "❋",
    description: "Die Wechselwirkung zwischen Individuum und Umgebung.",
    glow: "violet",
  },
  {
    id: "synchronizitaet",
    title: "Synchronizität",
    symbol: "✶",
    description: "Bedeutungsvolle Zufälle und Resonanzen im Leben.",
    glow: "gold",
  },
];

export const frequencyTopicStatus = "In Vorbereitung";

export const frequencyTopics: TopicCardData[] = [
  {
    title: "Was bedeutet Resonanz?",
    category: "Resonanz",
    excerpt: "Ein erster Blick darauf, warum manches in uns mitschwingt.",
    status: frequencyTopicStatus,
  },
  {
    title: "Die Wirkung von Emotionen",
    category: "Emotionen",
    excerpt: "Wie Gefühle unser Erleben und unsere Begegnungen formen.",
    status: frequencyTopicStatus,
  },
  {
    title: "Gedanken und Aufmerksamkeit",
    category: "Gedanken",
    excerpt: "Worauf wir schauen, wird größer – eine ruhige Betrachtung.",
    status: frequencyTopicStatus,
  },
  {
    title: "Klang als Brücke",
    category: "Klang",
    excerpt: "Schwingung, die innen und außen miteinander verbindet.",
    status: frequencyTopicStatus,
  },
  {
    title: "Synchronizitäten verstehen",
    category: "Synchronizität",
    excerpt: "Bedeutungsvolle Zusammenklänge jenseits des Zufalls.",
    status: frequencyTopicStatus,
  },
  {
    title: "Die Sprache der Frequenz",
    category: "Frequenz",
    excerpt: "Wie sich das Unsichtbare im Erleben bemerkbar macht.",
    status: frequencyTopicStatus,
  },
];

export const frequencyJourney = {
  eyebrow: "Geführte Reise",
  title: "Erste Resonanzreise",
  text: "Welche Frage berührt dich im Moment am stärksten?",
  questions: [
    { id: "begegnungen", numeral: "I", label: "Warum begegnen mir bestimmte Menschen?" },
    { id: "spiegelung", numeral: "II", label: "Was möchte mir das Leben spiegeln?" },
    { id: "aufmerksamkeit", numeral: "III", label: "Worauf richte ich meine Aufmerksamkeit?" },
  ],
} as const;

export const frequencyQuote = {
  lines: [
    "Vielleicht zieht das Leben nicht an.",
    "Vielleicht antwortet es.",
  ],
  cta: { label: "Zur Lichtbibliothek", href: "/lichtbibliothek" },
} as const;
