/**
 * Inhalte des Symbole-Raums (/raeume/symbole).
 *
 * Eine ruhige Galerie der Bedeutung: Symbole als Sprache jenseits der Worte.
 * Alle Inhalte sind hier gebündelt; die Komponenten bleiben rein darstellend.
 *
 * Die sechs Themen tragen den Status „In Vorbereitung“ und eigene Titel und
 * werden daher hier definiert (nicht aus der Lichtbibliothek übernommen).
 */

import type { GlowTone } from "@/lib/content/library";
import type { TopicCardData } from "@/components/library/LibraryTopicCard";

export const symbolsHero = {
  eyebrow: "Symbolraum",
  title: "Symbole",
  subtitle: "Die Sprache jenseits der Worte.",
  text: "Seit Anbeginn nutzen Menschen Zeichen, Muster und Formen, um Bedeutung auszudrücken. Manche Symbole begleiten Kulturen über Jahrtausende hinweg und berühren etwas, das sich oft schwer in Worte fassen lässt.",
  cta: { label: "Den Raum betreten", href: "#einfuehrung" },
} as const;

export const symbolsIntro = {
  eyebrow: "Einführung",
  title: "Warum Symbole wirken",
  paragraphs: [
    "Ein einzelnes Zeichen kann tragen, wofür viele Sätze nötig wären. Wir erkennen es, bevor wir es erklären können – und oft berührt es uns, ohne dass wir genau sagen könnten, warum.",
    "Was hier beschrieben wird, sind keine verborgenen Wahrheiten und keine festen Bedeutungen. Es ist eine Einladung, genauer hinzusehen, welche Bilder wiederkehren und was sie in uns anklingen lassen.",
  ],
  aspects: [
    {
      title: "Verdichtung von Bedeutung",
      text: "Ein Symbol bündelt viele Schichten von Sinn in einer einzigen Form – knapp, und doch vielsagend.",
    },
    {
      title: "Wiederkehrende Muster",
      text: "Ähnliche Zeichen tauchen in weit voneinander entfernten Kulturen auf – ein leiser Hinweis auf gemeinsame Erfahrungen.",
    },
    {
      title: "Bild und Erinnerung",
      text: "Bilder verbinden sich mit dem, was wir erlebt haben, und rufen es manchmal unmittelbar wieder wach.",
    },
    {
      title: "Archetypische Wirkung",
      text: "Manche Urbilder scheinen Menschen über Zeiten hinweg anzusprechen, als kennten wir sie bereits.",
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

export const symbolsSubspaces: Subspace[] = [
  {
    id: "heilige-geometrie",
    title: "Heilige Geometrie",
    symbol: "⬡",
    description:
      "Formen und Muster, die seit Jahrhunderten als Ausdruck von Ordnung und Harmonie betrachtet werden.",
    glow: "violet",
  },
  {
    id: "archetypen",
    title: "Archetypen",
    symbol: "◈",
    description:
      "Urbilder, die sich in Geschichten, Träumen und Kulturen wiederfinden.",
    glow: "gold",
  },
  {
    id: "zahlen",
    title: "Zahlen",
    symbol: "✴",
    description:
      "Die symbolische Bedeutung von Zahlen in verschiedenen Traditionen.",
    glow: "blue",
  },
  {
    id: "kulturelle-symbole",
    title: "Kulturelle Symbole",
    symbol: "❖",
    description: "Zeichen, die Menschen über Generationen hinweg geprägt haben.",
    glow: "gold",
  },
  {
    id: "persoenliche-symbole",
    title: "Persönliche Symbole",
    symbol: "✷",
    description: "Bilder und Zeichen, denen wir individuell Bedeutung verleihen.",
    glow: "violet",
  },
];

export const symbolsTopicStatus = "In Vorbereitung";

export const symbolsTopics: TopicCardData[] = [
  {
    title: "Was ist ein Symbol?",
    category: "Symbole",
    excerpt: "Eine ruhige Annäherung an Zeichen, die mehr meinen als sie zeigen.",
    status: symbolsTopicStatus,
  },
  {
    title: "Die Kraft archetypischer Bilder",
    category: "Archetypen",
    excerpt: "Warum bestimmte Urbilder Menschen über Zeiten hinweg ansprechen.",
    status: symbolsTopicStatus,
  },
  {
    title: "Heilige Geometrie verstehen",
    category: "Heilige Geometrie",
    excerpt: "Form als Ausdruck von Ordnung, Maß und Harmonie.",
    status: symbolsTopicStatus,
  },
  {
    title: "Zahlen und Bedeutung",
    category: "Zahlen",
    excerpt: "Wie Zahlen in Traditionen zu Trägern von Sinn wurden.",
    status: symbolsTopicStatus,
  },
  {
    title: "Symbole in Träumen",
    category: "Persönliche Symbole",
    excerpt: "Die Bildsprache, die uns im Schlaf begegnet.",
    status: symbolsTopicStatus,
  },
  {
    title: "Das persönliche Symbol",
    category: "Persönliche Symbole",
    excerpt: "Zeichen, denen wir ganz eigene Bedeutung schenken.",
    status: symbolsTopicStatus,
  },
];

export const symbolsJourney = {
  eyebrow: "Geführte Reise",
  title: "Erste Symbolreise",
  text: "Welches Zeichen zieht deine Aufmerksamkeit an?",
  questions: [
    {
      id: "begleitende-symbole",
      numeral: "I",
      label: "Welche Symbole begleiten mich immer wieder?",
    },
    {
      id: "beruehrende-bilder",
      numeral: "II",
      label: "Warum berühren mich bestimmte Bilder?",
    },
    {
      id: "symbol-der-lebensphase",
      numeral: "III",
      label: "Welches Symbol würde meine aktuelle Lebensphase beschreiben?",
    },
  ],
} as const;

export const symbolsQuote = {
  lines: [
    "Manchmal sagt ein Bild mehr als ein Gedanke.",
    "Und manchmal erinnert ein Symbol an etwas, das längst vergessen schien.",
  ],
  cta: { label: "Zur Lichtbibliothek", href: "/lichtbibliothek" },
} as const;
