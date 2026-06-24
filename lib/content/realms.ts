/**
 * Die fünf Bewusstseinsräume.
 * Jeder Raum hat eine eigene Detailseite unter /raeume/[slug].
 */

export type Realm = {
  slug: string;
  title: string;
  symbol: string;
  tagline: string;
  description: string;
  glow: "violet" | "gold" | "blue";
  themes: string[];
  intro: string[];
};

export const realms: Realm[] = [
  {
    slug: "bewusstsein",
    title: "Bewusstsein",
    symbol: "◯",
    tagline: "Der Raum hinter den Gedanken",
    description:
      "Die stille Beobachtung dessen, der wahrnimmt. Bewusstsein als Grund allen Erlebens.",
    glow: "violet",
    themes: ["Gewahrsein", "Stille", "Präsenz", "Innere Beobachtung"],
    intro: [
      "Bevor ein Gedanke entsteht, ist da etwas, das wahrnimmt. Dieser Raum lädt dich ein, hinter die Inhalte des Geistes zu blicken – zu dem, was bleibt, wenn alles andere vergeht.",
      "Bewusstsein ist kein Konzept, das man lernt. Es ist das, was bereits liest, während du diese Worte liest.",
    ],
  },
  {
    slug: "frequenz",
    title: "Frequenz",
    symbol: "≈",
    tagline: "Die Schwingung aller Form",
    description:
      "Alles schwingt. Verstehe die Sprache der Frequenz als Brücke zwischen Materie und Bewusstsein.",
    glow: "gold",
    themes: ["Schwingung", "Resonanz", "Klang", "Heilfrequenzen"],
    intro: [
      "Nichts steht still. Was wir als feste Form wahrnehmen, ist in Wahrheit Bewegung – Schwingung in unzähligen Frequenzen.",
      "In diesem Raum erkundest du, wie Frequenz und Resonanz das Tor zwischen dem Sichtbaren und dem Unsichtbaren bilden.",
    ],
  },
  {
    slug: "erde-kosmos",
    title: "Erde & Kosmos",
    symbol: "✷",
    tagline: "Verwurzelt und verbunden",
    description:
      "Die Polarität von Erde und Kosmos – Erdung und Weite als ein einziges Feld.",
    glow: "blue",
    themes: ["Erdung", "Zyklen", "Sterne", "Naturweisheit"],
    intro: [
      "Der Mensch steht zwischen Himmel und Erde – verwurzelt im Boden, geöffnet zum Kosmos. Beide sind kein Gegensatz, sondern Atemzüge desselben Lebens.",
      "Dieser Raum erinnert an die Zyklen der Natur und die stille Ordnung der Sterne.",
    ],
  },
  {
    slug: "symbole",
    title: "Symbole",
    symbol: "△",
    tagline: "Die Sprache jenseits der Worte",
    description:
      "Symbole sprechen direkt zum Inneren. Eine Sprache, die älter ist als jedes Wort.",
    glow: "violet",
    themes: ["Urzeichen", "Geometrie", "Archetypen", "Bedeutung"],
    intro: [
      "Lange bevor es Worte gab, sprach der Mensch in Symbolen. Sie umgehen den Verstand und berühren etwas Tieferes.",
      "In diesem Raum lernst du, die stille Sprache der Symbole und der heiligen Geometrie wieder zu lesen.",
    ],
  },
  {
    slug: "astralreisen",
    title: "Astralreisen",
    symbol: "☽",
    tagline: "Bewegung jenseits des Körpers",
    description:
      "Bewusste Reisen in die feinstofflichen Ebenen – mit Klarheit, Ruhe und Schutz.",
    glow: "gold",
    themes: ["Traumbewusstsein", "Feinstofflichkeit", "Schutz", "Rückkehr"],
    intro: [
      "Das Bewusstsein ist nicht an den Körper gebunden. In tiefen Zuständen kann es sich frei bewegen – durch Räume jenseits der gewohnten Wahrnehmung.",
      "Dieser Raum führt ruhig und geerdet an das Thema heran: mit Klarheit, Schutz und einem sicheren Weg zurück.",
    ],
  },
];

export function getRealm(slug: string): Realm | undefined {
  return realms.find((realm) => realm.slug === slug);
}
