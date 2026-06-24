/**
 * „Das erste Tor“ – die vier Wege des Eintritts.
 * Wird vom FirstGateOverlay auf der Startseite genutzt.
 *
 * Jeder Weg trägt sowohl die Auswahl-Darstellung (title, symbol, description)
 * als auch die Ergebnisansicht (resultTitle, resultText, href).
 */

export type GatePath = {
  id: string;
  title: string;
  symbol: string;
  description: string;
  resultTitle: string;
  resultText: string;
  href: string;
};

export const firstGateIntro = {
  title: "Willkommen, Reisender.",
  subtitle: "Was ruft dich heute?",
} as const;

export const firstGatePaths: GatePath[] = [
  {
    id: "klarheit",
    title: "Klarheit",
    symbol: "🜂",
    description: "Ich suche Antworten, Ordnung und innere Ausrichtung.",
    resultTitle: "Dein erster Pfad öffnet sich.",
    resultText: "Beginne im Raum Bewusstsein.",
    href: "/raeume/bewusstsein",
  },
  {
    id: "erinnerung",
    title: "Erinnerung",
    symbol: "✦",
    description: "Ich möchte mich erinnern, wer ich bin und was in mir bereits weiß.",
    resultTitle: "Dein erster Pfad öffnet sich.",
    resultText: "Beginne im Raum Symbole.",
    href: "/raeume/symbole",
  },
  {
    id: "verbindung",
    title: "Verbindung",
    symbol: "◌",
    description: "Ich suche Resonanz, Begegnung und ein größeres Feld.",
    resultTitle: "Dein erster Pfad öffnet sich.",
    resultText: "Beginne bei Luminalis.",
    href: "/luminalis",
  },
  {
    id: "stille",
    title: "Stille",
    symbol: "☽",
    description: "Ich möchte zur Ruhe kommen und mein Inneres wieder hören.",
    resultTitle: "Dein erster Pfad öffnet sich.",
    resultText: "Beginne im Klangraum.",
    href: "/klangraum",
  },
];
