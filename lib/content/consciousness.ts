/**
 * Inhalte des Bewusstseinsraums (/raeume/bewusstsein).
 *
 * Die Themen werden bewusst aus der zentralen Lichtbibliothek (library.ts)
 * übernommen, damit Titel, Beschreibung und Status nur an einer Stelle gepflegt
 * werden müssen.
 */

import { featuredTopics, type LibraryTopic } from "@/lib/content/library";
import type { GlowTone } from "@/lib/content/library";

export const consciousnessHero = {
  eyebrow: "Bewusstseinsraum",
  title: "Bewusstsein",
  subtitle: "Der Raum hinter den Gedanken.",
  text: "Bevor Gedanken erscheinen, bevor Identitäten entstehen und bevor Entscheidungen getroffen werden, gibt es etwas, das wahrnimmt. Dieser Raum ist eine Einladung, die Natur des Bewusstseins zu erforschen.",
  cta: { label: "Die Reise beginnen", href: "#einfuehrung" },
} as const;

export const consciousnessIntro = {
  eyebrow: "Einführung",
  title: "Der stille Beobachter",
  paragraphs: [
    "Bewusstsein lässt sich schwer in Worte fassen – und vielleicht muss es das auch nicht. Es ist nicht eine weitere Sache unter vielen, sondern der stille Raum, in dem alle Dinge überhaupt erst erscheinen.",
    "Was hier beschrieben wird, ist keine Lehre, die du glauben sollst, und keine Wahrheit, die jemand für dich besitzt. Es sind nur leise Hinweise – Einladungen, selbst zu schauen.",
  ],
  aspects: [
    {
      title: "Beobachtung",
      text: "Bemerke, dass da etwas ist, das deine Gedanken bemerkt, ohne selbst ein Gedanke zu sein.",
    },
    {
      title: "Wahrnehmung",
      text: "Alles, was du erlebst, erscheint in einem Feld des Gewahrseins – noch bevor du es benennst.",
    },
    {
      title: "Präsenz",
      text: "Im gegenwärtigen Augenblick ist Bewusstsein am unmittelbarsten zu spüren – nicht als Idee, sondern als Da-Sein.",
    },
    {
      title: "Innere Stille",
      text: "Unter dem Strom der Gedanken liegt eine Ruhe, die nichts hinzufügen muss, um vollständig zu sein.",
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

export const consciousnessSubspaces: Subspace[] = [
  {
    id: "wer-bin-ich",
    title: "Wer bin ich?",
    symbol: "◯",
    description: "Identität, Selbstbild und das Wesen des Selbst.",
    glow: "violet",
  },
  {
    id: "der-beobachter",
    title: "Der Beobachter",
    symbol: "◉",
    description: "Der stille Zeuge aller Erfahrungen.",
    glow: "gold",
  },
  {
    id: "unterbewusstsein",
    title: "Unterbewusstsein",
    symbol: "≋",
    description: "Programme, Muster und unbewusste Prozesse.",
    glow: "blue",
  },
  {
    id: "realitaet",
    title: "Realität",
    symbol: "◈",
    description: "Wie Wahrnehmung unsere Welt formt.",
    glow: "violet",
  },
  {
    id: "schoepfung",
    title: "Schöpfung",
    symbol: "✶",
    description: "Aufmerksamkeit, Entscheidung und Ausrichtung.",
    glow: "gold",
  },
];

// Die sechs Themen dieses Raums – referenziert aus der Lichtbibliothek.
const consciousnessTopicIds = [
  "wer-bin-ich-wirklich",
  "was-ist-bewusstsein",
  "das-auge-des-beobachters",
  "das-unterbewusstsein-verstehen",
  "realitaet-als-spiegel",
  "das-schoepferische-bewusstsein",
] as const;

export const consciousnessTopics: LibraryTopic[] = consciousnessTopicIds
  .map((id) => featuredTopics.find((topic) => topic.id === id))
  .filter((topic): topic is LibraryTopic => Boolean(topic));

export const consciousnessJourney = {
  eyebrow: "Geführte Reise",
  title: "Erste Reise",
  text: "Wenn du heute nur eine Frage mitnehmen würdest – welche wäre es?",
  questions: [
    { id: "wer-bin-ich", numeral: "I", label: "Wer bin ich?" },
    { id: "beobachtet-gedanken", numeral: "II", label: "Was beobachtet meine Gedanken?" },
    { id: "was-bleibt", numeral: "III", label: "Was bleibt, wenn alles still wird?" },
  ],
} as const;

export const consciousnessQuote = {
  lines: [
    "Vielleicht geht es nicht darum, etwas Neues zu lernen.",
    "Vielleicht geht es darum, zu erkennen, was immer da war.",
  ],
  cta: { label: "Zur Lichtbibliothek", href: "/lichtbibliothek" },
} as const;
