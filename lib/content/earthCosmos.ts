/**
 * Inhalte des Raums „Erde & Kosmos“ (/raeume/erde-kosmos).
 *
 * Der Raum zwischen Verwurzelung und Weite – Boden und Sterne als ein Feld.
 * Alle Inhalte sind hier gebündelt; die Komponenten bleiben rein darstellend.
 *
 * Die sechs Themen tragen den Status „In Vorbereitung“ und eigene Titel und
 * werden daher hier definiert (nicht aus der Lichtbibliothek übernommen).
 */

import type { GlowTone } from "@/lib/content/library";
import type { TopicCardData } from "@/components/library/LibraryTopicCard";

export const earthCosmosHero = {
  eyebrow: "Raum zwischen Boden und Sternen",
  title: "Erde & Kosmos",
  subtitle: "Verwurzelt und verbunden.",
  text: "Zwischen Erde und Sternen öffnet sich ein Raum der Erfahrung. Dieser Raum lädt dazu ein, unsere Verbindung zur Erde, zum Himmel und zum größeren Ganzen bewusster wahrzunehmen.",
  cta: { label: "Den Raum betreten", href: "#einfuehrung" },
} as const;

export const earthCosmosIntro = {
  eyebrow: "Einführung",
  title: "Zwischen Boden und Sternen",
  paragraphs: [
    "Wir stehen mit den Füßen auf der Erde und blicken in einen Himmel, der kein Ende kennt. Beides gehört zusammen: das Nahe und das Ferne, das Greifbare und das Unermessliche.",
    "Was hier beschrieben wird, sind keine Lehrsätze über das Universum, sondern leise Einladungen, die eigene Stellung zwischen Boden und Sternen wieder zu spüren – ruhig, ehrfürchtig, ohne Anspruch auf letzte Antworten.",
  ],
  aspects: [
    {
      title: "Erde als Erfahrungsraum",
      text: "Der Boden trägt uns – ein Ort der Verkörperung, an dem Erfahrung überhaupt erst geschieht.",
    },
    {
      title: "Kosmos als Weite",
      text: "Der Blick nach oben öffnet einen Raum, der jedes Maß übersteigt und doch seltsam vertraut wirkt.",
    },
    {
      title: "Körper und Bewusstsein",
      text: "Der Mensch lebt zwischen beidem: gebunden an einen Körper, geöffnet zu einem weiten Gewahrsein.",
    },
    {
      title: "Zyklen und Orientierung",
      text: "In den Rhythmen der Natur und im Lauf der Gestirne finden Menschen seit jeher Halt und Richtung.",
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

export const earthCosmosSubspaces: Subspace[] = [
  {
    id: "erde",
    title: "Erde",
    symbol: "⊕",
    description: "Der Ort der Erfahrung, Verkörperung und Verwurzelung.",
    glow: "blue",
  },
  {
    id: "mond",
    title: "Mond",
    symbol: "☾",
    description: "Zyklen, Spiegelung und die stille Ordnung der Nacht.",
    glow: "violet",
  },
  {
    id: "sonne",
    title: "Sonne",
    symbol: "☉",
    description: "Licht, Rhythmus, Lebenskraft und Ausrichtung.",
    glow: "gold",
  },
  {
    id: "planeten",
    title: "Planeten",
    symbol: "♁",
    description:
      "Himmelskörper als Symbole für Kräfte, Bewegungen und Perspektiven.",
    glow: "violet",
  },
  {
    id: "sterne",
    title: "Sterne",
    symbol: "✶",
    description: "Orientierung, Ferne und Erinnerung an das größere Feld.",
    glow: "gold",
  },
  {
    id: "universum",
    title: "Universum",
    symbol: "✷",
    description: "Weite, Ordnung, Geheimnis und die Frage nach dem Ursprung.",
    glow: "blue",
  },
  {
    id: "zeit",
    title: "Zeit",
    symbol: "∞",
    description: "Wandel, Rhythmus und die Bewegung des Erlebens.",
    glow: "gold",
  },
];

export const earthCosmosTopicStatus = "In Vorbereitung";

export const earthCosmosTopics: TopicCardData[] = [
  {
    title: "Die Erde als Erfahrungsraum",
    category: "Erde",
    excerpt: "Der Boden als Bühne von Verkörperung und Erleben.",
    status: earthCosmosTopicStatus,
  },
  {
    title: "Der Mond und seine Symbolik",
    category: "Mond",
    excerpt: "Zyklen, Rhythmus und das Spiegelnde im Verborgenen.",
    status: earthCosmosTopicStatus,
  },
  {
    title: "Die Sonne als Lebensrhythmus",
    category: "Sonne",
    excerpt: "Licht und Wiederkehr als Takt des Lebendigen.",
    status: earthCosmosTopicStatus,
  },
  {
    title: "Was bedeuten Planeten symbolisch?",
    category: "Planeten",
    excerpt: "Himmelskörper als Bilder für Kräfte und Perspektiven.",
    status: earthCosmosTopicStatus,
  },
  {
    title: "Sterne als Orientierung",
    category: "Sterne",
    excerpt: "Ferne Lichter, die seit jeher Richtung geben.",
    status: earthCosmosTopicStatus,
  },
  {
    title: "Was ist Zeit?",
    category: "Zeit",
    excerpt: "Eine Betrachtung jenseits von Uhr und Kalender.",
    status: earthCosmosTopicStatus,
  },
];

export const earthCosmosJourney = {
  eyebrow: "Geführte Reise",
  title: "Erste Kosmosreise",
  text: "Was ruft dich heute mehr – Verwurzelung oder Weite?",
  questions: [
    { id: "verbindung-erde", numeral: "I", label: "Was verbindet mich mit der Erde?" },
    { id: "zeigt-himmel", numeral: "II", label: "Was zeigt mir der Himmel?" },
    { id: "orientierung", numeral: "III", label: "Wo finde ich Orientierung?" },
  ],
} as const;

export const earthCosmosQuote = {
  lines: [
    "Vielleicht sind wir nicht getrennt vom Kosmos.",
    "Vielleicht ist der Kosmos auch in uns.",
  ],
  cta: { label: "Zur Lichtbibliothek", href: "/lichtbibliothek" },
} as const;
