/**
 * Die fünf Säulen von Luminalis – geteilte, client-sichere Konstante
 * (enthält keinen Server-Code), genutzt von Onboarding und „Mein Weg".
 *
 * `label` ist zugleich der gespeicherte Wert in `selected_pillars`.
 */

export type LuminalisPillar = {
  id: string;
  label: string;
  question: string;
};

export const LUMINALIS_PILLARS: LuminalisPillar[] = [
  {
    id: "verbindung",
    label: "Verbindung",
    question: "Was gehört in deinem Leben wieder zusammen?",
  },
  {
    id: "erinnerung",
    label: "Erinnerung",
    question: "Welche Erkenntnisse möchten sichtbar bleiben?",
  },
  {
    id: "resonanz",
    label: "Resonanz",
    question: "Welche Themen kehren immer wieder zu dir zurück?",
  },
  {
    id: "innere-ausrichtung",
    label: "Innere Ausrichtung",
    question: "Welche Schritte passen zu deinem inneren Kompass?",
  },
  {
    id: "entfaltung",
    label: "Entfaltung",
    question: "In welche Richtung möchtest du dich entfalten?",
  },
];
