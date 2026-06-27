/**
 * Inhaltliche Grundlage der Lichtbibliothek.
 *
 * Zwei Ebenen:
 *  1. categories – die fünf Haupträume mit ihren Unterräumen.
 *  2. featuredTopics – erste 20 Themen, gruppiert in drei Zyklen.
 *
 * Alle `href`-Felder sind bewusst als Platzhalter angelegt, damit die
 * Struktur später ohne Umbau auf echte Detailseiten erweitert werden kann.
 */

export type GlowTone = "violet" | "gold" | "blue";

export type LibraryCategory = {
  id: string;
  title: string;
  symbol: string;
  description: string;
  subrooms: string[];
  glow: GlowTone;
  href: string;
};

export type TopicCycle = "Grundlagen" | "Erinnerung" | "Erweiterte Räume";

export type TopicStatus = "geplant" | "veröffentlicht";

export type LibraryTopic = {
  id: string;
  title: string;
  cycle: TopicCycle;
  category: string;
  excerpt: string;
  status: TopicStatus;
  href: string;
};

export const libraryHero = {
  title: "Lichtbibliothek",
  subtitle:
    "Eine wachsende Sammlung von Bewusstseinsräumen, Erinnerungen und inneren Landkarten.",
  text: "Die Lichtbibliothek sammelt keine Informationen um der Information willen. Sie ordnet Themen, die helfen können, Bewusstsein, Wahrnehmung und innere Entwicklung klarer zu verstehen.",
} as const;

export const categories: LibraryCategory[] = [
  {
    id: "bewusstsein",
    title: "Bewusstsein",
    symbol: "◯",
    description:
      "Der Raum des inneren Beobachters, der Wahrnehmung und der Frage: Wer bin ich wirklich?",
    subrooms: ["Wer bin ich?", "Beobachter", "Unterbewusstsein", "Realität", "Schöpfung"],
    glow: "violet",
    href: "/lichtbibliothek/bewusstsein",
  },
  {
    id: "frequenz",
    title: "Frequenz",
    symbol: "≈",
    description:
      "Der Raum der Schwingung, Resonanz und unsichtbaren Verbindungen zwischen Gedanken, Emotionen und Feldern.",
    subrooms: ["Resonanz", "Emotionen", "Gedanken", "Klang", "Frequenzfelder", "Synchronizität"],
    glow: "gold",
    href: "/lichtbibliothek/frequenz",
  },
  {
    id: "erde-kosmos",
    title: "Erde & Kosmos",
    symbol: "✷",
    description:
      "Der Raum zwischen Verwurzelung und Weite – Erde, Mond, Sonne, Sterne, Raum und Zeit.",
    subrooms: ["Erde", "Mond", "Sonne", "Planeten", "Sterne", "Universum", "Zeit"],
    glow: "blue",
    href: "/lichtbibliothek/erde-kosmos",
  },
  {
    id: "symbole",
    title: "Symbole",
    symbol: "△",
    description:
      "Der Raum der Zeichen, Geometrien und archetypischen Sprachen jenseits der Worte.",
    subrooms: ["Geometrie", "Archetypen", "Zahlen", "Symbole der Kulturen", "Persönliche Symbole"],
    glow: "violet",
    href: "/lichtbibliothek/symbole",
  },
  {
    id: "astralreisen",
    title: "Astralreisen",
    symbol: "☽",
    description:
      "Der Raum der Träume, Bewusstseinszustände und inneren Reisen jenseits des gewöhnlichen Wachbewusstseins.",
    subrooms: ["Schlaf", "Träume", "Luzides Träumen", "Astralreisen", "Meditation", "Bewusstseinsreisen"],
    glow: "gold",
    href: "/lichtbibliothek/astralreisen",
  },
];

export const featuredTopics: LibraryTopic[] = [
  // Zyklus 1 – Grundlagen
  {
    id: "wer-bin-ich-wirklich",
    title: "Wer bin ich wirklich?",
    cycle: "Grundlagen",
    category: "Bewusstsein",
    excerpt: "Eine erste Annäherung an die Frage hinter allen Fragen.",
    status: "veröffentlicht",
    href: "/lichtbibliothek/wer-bin-ich-wirklich",
  },
  {
    id: "was-ist-bewusstsein",
    title: "Was ist Bewusstsein?",
    cycle: "Grundlagen",
    category: "Bewusstsein",
    excerpt: "Das Gewahrsein, in dem jede Erfahrung erscheint.",
    status: "geplant",
    href: "/lichtbibliothek/was-ist-bewusstsein",
  },
  {
    id: "das-auge-des-beobachters",
    title: "Das Auge des Beobachters",
    cycle: "Grundlagen",
    category: "Bewusstsein",
    excerpt: "Wer schaut, wenn du nach innen schaust?",
    status: "geplant",
    href: "/lichtbibliothek/das-auge-des-beobachters",
  },
  {
    id: "das-unterbewusstsein-verstehen",
    title: "Das Unterbewusstsein verstehen",
    cycle: "Grundlagen",
    category: "Bewusstsein",
    excerpt: "Die stillen Schichten, die unser Erleben formen.",
    status: "geplant",
    href: "/lichtbibliothek/das-unterbewusstsein-verstehen",
  },
  {
    id: "realitaet-als-spiegel",
    title: "Realität als Spiegel",
    cycle: "Grundlagen",
    category: "Bewusstsein",
    excerpt: "Was uns begegnet und was es über uns sagt.",
    status: "geplant",
    href: "/lichtbibliothek/realitaet-als-spiegel",
  },
  {
    id: "resonanz-warum-menschen-in-unser-leben-treten",
    title: "Resonanz – warum Menschen in unser Leben treten",
    cycle: "Grundlagen",
    category: "Frequenz",
    excerpt: "Über die unsichtbaren Fäden zwischen Begegnungen.",
    status: "geplant",
    href: "/lichtbibliothek/resonanz-warum-menschen-in-unser-leben-treten",
  },
  {
    id: "die-sprache-der-frequenz",
    title: "Die Sprache der Frequenz",
    cycle: "Grundlagen",
    category: "Frequenz",
    excerpt: "Schwingung als Brücke zwischen Innen und Außen.",
    status: "geplant",
    href: "/lichtbibliothek/die-sprache-der-frequenz",
  },
  {
    id: "die-erde-als-erfahrungsraum",
    title: "Die Erde als Erfahrungsraum",
    cycle: "Grundlagen",
    category: "Erde & Kosmos",
    excerpt: "Der Planet als Bühne des bewussten Erlebens.",
    status: "geplant",
    href: "/lichtbibliothek/die-erde-als-erfahrungsraum",
  },
  {
    id: "der-mond-und-seine-symbolik",
    title: "Der Mond und seine Symbolik",
    cycle: "Grundlagen",
    category: "Erde & Kosmos",
    excerpt: "Zyklen, Rhythmus und das Spiegelnde im Verborgenen.",
    status: "geplant",
    href: "/lichtbibliothek/der-mond-und-seine-symbolik",
  },
  {
    id: "was-ist-zeit",
    title: "Was ist Zeit?",
    cycle: "Grundlagen",
    category: "Erde & Kosmos",
    excerpt: "Eine Betrachtung jenseits von Uhr und Kalender.",
    status: "geplant",
    href: "/lichtbibliothek/was-ist-zeit",
  },

  // Zyklus 2 – Erinnerung
  {
    id: "warum-vergessen-wir",
    title: "Warum vergessen wir?",
    cycle: "Erinnerung",
    category: "Bewusstsein",
    excerpt: "Vom Schleier, der zwischen uns und dem Wissen liegt.",
    status: "geplant",
    href: "/lichtbibliothek/warum-vergessen-wir",
  },
  {
    id: "erinnerung-und-erwachen",
    title: "Erinnerung und Erwachen",
    cycle: "Erinnerung",
    category: "Bewusstsein",
    excerpt: "Wie Erinnern zum stillen Wiedererkennen wird.",
    status: "geplant",
    href: "/lichtbibliothek/erinnerung-und-erwachen",
  },
  {
    id: "archetypen-des-bewusstseins",
    title: "Archetypen des Bewusstseins",
    cycle: "Erinnerung",
    category: "Symbole",
    excerpt: "Urbilder, die in jedem Menschen wirken.",
    status: "geplant",
    href: "/lichtbibliothek/archetypen-des-bewusstseins",
  },
  {
    id: "symbole-als-sprache",
    title: "Symbole als Sprache",
    cycle: "Erinnerung",
    category: "Symbole",
    excerpt: "Zeichen, die das Innere direkt berühren.",
    status: "geplant",
    href: "/lichtbibliothek/symbole-als-sprache",
  },
  {
    id: "die-kraft-der-stille",
    title: "Die Kraft der Stille",
    cycle: "Erinnerung",
    category: "Bewusstsein",
    excerpt: "Im Schweigen wird das Innere wieder hörbar.",
    status: "geplant",
    href: "/lichtbibliothek/die-kraft-der-stille",
  },

  // Zyklus 3 – Erweiterte Räume
  {
    id: "traeume-verstehen",
    title: "Träume verstehen",
    cycle: "Erweiterte Räume",
    category: "Astralreisen",
    excerpt: "Die nächtliche Sprache des Bewusstseins.",
    status: "geplant",
    href: "/lichtbibliothek/traeume-verstehen",
  },
  {
    id: "luzides-traeumen",
    title: "Luzides Träumen",
    cycle: "Erweiterte Räume",
    category: "Astralreisen",
    excerpt: "Bewusst sein im Traum – wach im Inneren.",
    status: "geplant",
    href: "/lichtbibliothek/luzides-traeumen",
  },
  {
    id: "astralreisen",
    title: "Astralreisen",
    cycle: "Erweiterte Räume",
    category: "Astralreisen",
    excerpt: "Bewegung jenseits des Körpers – ruhig und geerdet.",
    status: "geplant",
    href: "/lichtbibliothek/astralreisen",
  },
  {
    id: "synchronizitaeten",
    title: "Synchronizitäten",
    cycle: "Erweiterte Räume",
    category: "Frequenz",
    excerpt: "Bedeutungsvolle Zusammenklänge ohne Zufall.",
    status: "geplant",
    href: "/lichtbibliothek/synchronizitaeten",
  },
  {
    id: "das-schoepferische-bewusstsein",
    title: "Das schöpferische Bewusstsein",
    cycle: "Erweiterte Räume",
    category: "Bewusstsein",
    excerpt: "Wie Aufmerksamkeit Wirklichkeit gestaltet.",
    status: "geplant",
    href: "/lichtbibliothek/das-schoepferische-bewusstsein",
  },
];

/** Reihenfolge der Zyklen für die gruppierte Darstellung. */
export const cycleOrder: TopicCycle[] = [
  "Grundlagen",
  "Erinnerung",
  "Erweiterte Räume",
];

/** Kurze Begleittexte je Zyklus. */
export const cycleMeta: Record<TopicCycle, { eyebrow: string; note: string }> = {
  Grundlagen: {
    eyebrow: "Zyklus I",
    note: "Erste Schritte über die Schwelle – die Fragen, mit denen alles beginnt.",
  },
  Erinnerung: {
    eyebrow: "Zyklus II",
    note: "Vom Wissen, das bereits in uns ruht, und seinem stillen Erwachen.",
  },
  "Erweiterte Räume": {
    eyebrow: "Zyklus III",
    note: "Bewusstseinszustände und Reisen jenseits des gewohnten Wachseins.",
  },
};

/** Themen eines Zyklus in ihrer definierten Reihenfolge. */
export function topicsByCycle(cycle: TopicCycle): LibraryTopic[] {
  return featuredTopics.filter((topic) => topic.cycle === cycle);
}
