/**
 * Geteilte, client-sichere Konstanten für den Luminalis-Dialograum.
 * Enthält keinen Server-Code.
 */

export const DIALOG_MODES = [
  "Stille",
  "Klarheit",
  "Suche",
  "Kreation",
  "Integration",
  "Übergang",
] as const;

export type DialogMode = (typeof DIALOG_MODES)[number];

/**
 * Ruhige Reflexionsfragen je Säule – keine KI, keine Diagnose, keine Bewertung.
 * Schlüssel sind die Säulen-Labels aus LUMINALIS_PILLARS.
 */
export const REFLECTION_PROMPTS: Record<string, string> = {
  Verbindung:
    "Welche Teile deines Lebens möchten wieder miteinander in Verbindung kommen?",
  Erinnerung: "Welche Erkenntnis möchtest du nicht wieder verlieren?",
  Resonanz: "Welches Thema kehrt immer wieder zu dir zurück?",
  "Innere Ausrichtung":
    "Welcher Schritt fühlt sich stimmig an – auch wenn er klein ist?",
  Entfaltung: "Was möchte in dir wachsen, ohne Druck?",
};

export const GENERAL_REFLECTION = "Schreibe nicht perfekt. Schreibe wahr.";
