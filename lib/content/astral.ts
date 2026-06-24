/**
 * Inhalte des Raums „Astralreisen“ (/raeume/astralreisen).
 *
 * Eine ruhige Schwelle zwischen Wachsein, Traum und innerer Erfahrung –
 * offen, reflektiert und respektvoll, ohne Behauptungen über objektive
 * Wahrheiten. Alle Inhalte sind hier gebündelt; die Komponenten bleiben
 * rein darstellend.
 *
 * Die sechs Themen tragen den Status „In Vorbereitung“ und eigene Titel und
 * werden daher hier definiert (nicht aus der Lichtbibliothek übernommen).
 */

import type { GlowTone } from "@/lib/content/library";
import type { TopicCardData } from "@/components/library/LibraryTopicCard";

export const astralHero = {
  eyebrow: "Schwelle zwischen Traum und Wachsein",
  title: "Astralreisen",
  subtitle: "Zwischen Traum und Bewusstsein.",
  text: "Seit jeher berichten Menschen von Träumen, außergewöhnlichen Bewusstseinszuständen und Erfahrungen, die sich größer anfühlen als der gewöhnliche Alltag. Dieser Raum lädt dazu ein, diese Erfahrungen offen und bewusst zu erkunden.",
  cta: { label: "Den Raum betreten", href: "#einfuehrung" },
} as const;

export const astralIntro = {
  eyebrow: "Einführung",
  title: "Die inneren Landschaften",
  paragraphs: [
    "Jede Nacht treten wir über eine Schwelle. Der Alltag löst sich, und etwas anderes beginnt: Schlaf, Traum, manchmal ein Gewahrsein, das sich weiter anfühlt als das Vertraute.",
    "Was hier beschrieben wird, ist weder Beweis noch Behauptung. Es ist eine offene Einladung, diesen inneren Landschaften neugierig zu begegnen – ohne zu werten, was darin als „wirklich“ gilt.",
  ],
  aspects: [
    {
      title: "Schlaf",
      text: "Der tägliche Übergang, in dem der Körper ruht und das Erleben sich nach innen verlagert.",
    },
    {
      title: "Träume",
      text: "Bilder und Geschichten, die nachts entstehen – flüchtig, vielschichtig, oft überraschend.",
    },
    {
      title: "Luzides Träumen",
      text: "Momente, in denen Menschen bemerken, dass sie träumen – und mit dem Traum bewusster umgehen.",
    },
    {
      title: "Meditation & Zustände",
      text: "Formen der Sammlung, in denen Aufmerksamkeit und Wahrnehmung sich verändern können.",
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

export const astralSubspaces: Subspace[] = [
  {
    id: "schlaf",
    title: "Schlaf",
    symbol: "☾",
    description:
      "Der tägliche Übergang zwischen Aktivität, Regeneration und innerem Erleben.",
    glow: "blue",
  },
  {
    id: "traeume",
    title: "Träume",
    symbol: "❂",
    description: "Bilder, Geschichten und Erfahrungen, die uns im Schlaf begegnen.",
    glow: "violet",
  },
  {
    id: "luzides-traeumen",
    title: "Luzides Träumen",
    symbol: "◉",
    description: "Bewusst werden, während man träumt.",
    glow: "gold",
  },
  {
    id: "astralreisen",
    title: "Astralreisen",
    symbol: "✶",
    description:
      "Berichte über Erfahrungen jenseits des gewöhnlichen Traumzustands.",
    glow: "violet",
  },
  {
    id: "meditation",
    title: "Meditation",
    symbol: "◯",
    description: "Innere Sammlung, Präsenz und bewusstes Wahrnehmen.",
    glow: "gold",
  },
  {
    id: "bewusstseinsreisen",
    title: "Bewusstseinsreisen",
    symbol: "✷",
    description: "Erweiterte Zustände von Aufmerksamkeit und Erfahrung.",
    glow: "blue",
  },
];

export const astralTopicStatus = "In Vorbereitung";

export const astralTopics: TopicCardData[] = [
  {
    title: "Warum träumen wir?",
    category: "Träume",
    excerpt: "Annäherungen an eine Frage, die Menschen seit jeher begleitet.",
    status: astralTopicStatus,
  },
  {
    title: "Die Welt der Träume",
    category: "Träume",
    excerpt: "Die vielschichtige Bildsprache, die uns im Schlaf begegnet.",
    status: astralTopicStatus,
  },
  {
    title: "Luzides Träumen verstehen",
    category: "Luzides Träumen",
    excerpt: "Was es bedeutet, im Traum bewusst zu werden.",
    status: astralTopicStatus,
  },
  {
    title: "Was sind Astralreisen?",
    category: "Astralreisen",
    excerpt: "Berichte und Perspektiven – offen und ohne Wertung betrachtet.",
    status: astralTopicStatus,
  },
  {
    title: "Meditation und Bewusstsein",
    category: "Meditation",
    excerpt: "Wie Sammlung Wahrnehmung und Präsenz verändern kann.",
    status: astralTopicStatus,
  },
  {
    title: "Erweiterte Bewusstseinszustände",
    category: "Bewusstseinsreisen",
    excerpt: "Zustände, in denen sich Aufmerksamkeit und Erleben weiten.",
    status: astralTopicStatus,
  },
];

export const astralJourney = {
  eyebrow: "Geführte Reise",
  title: "Erste Traumreise",
  text: "Welche Frage begleitet dich in die Nacht?",
  questions: [
    { id: "traeume-zeigen", numeral: "I", label: "Was möchten mir meine Träume zeigen?" },
    { id: "bewusst-im-traum", numeral: "II", label: "Wie bewusst bin ich im Traum?" },
    {
      id: "praegende-erfahrungen",
      numeral: "III",
      label: "Welche Erfahrungen prägen mein inneres Erleben?",
    },
  ],
} as const;

export const astralQuote = {
  lines: [
    "Vielleicht beginnt die Reise nicht dort, wo wir die Augen öffnen.",
    "Vielleicht beginnt sie dort, wo wir lernen, anders zu sehen.",
  ],
  cta: { label: "Zur Lichtbibliothek", href: "/lichtbibliothek" },
} as const;
