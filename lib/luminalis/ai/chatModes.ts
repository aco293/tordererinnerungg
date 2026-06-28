/**
 * Chat-Modi mit ruhigen deutschen Beschriftungen.
 *
 * Bewusst frei von serverseitigen Importen, damit auch Client-Komponenten
 * (z. B. die Modus-Auswahl) diese Werte verwenden können.
 */

import type { LuminalisChatMode } from "@/lib/luminalis/ai/systemPrompt";

export type ChatModeOption = {
  value: LuminalisChatMode;
  label: string;
  description: string;
};

export const CHAT_MODES: ChatModeOption[] = [
  {
    value: "begleitung",
    label: "Begleitung",
    description: "Ruhiger, allgemeiner Begleiter.",
  },
  {
    value: "klarheit",
    label: "Klarheit",
    description: "Sortieren, strukturieren, die nächste Frage finden.",
  },
  {
    value: "erinnerung",
    label: "Erinnerung",
    description: "Frühere Erkenntnisse und wiederkehrende Themen einbeziehen.",
  },
  {
    value: "integration",
    label: "Integration",
    description: "Sanfte nächste Schritte aus Erkenntnissen betrachten.",
  },
  {
    value: "frequenzspiegel",
    label: "Frequenzspiegel",
    description: "Muster aus Einträgen und Themen spiegeln, ohne zu urteilen.",
  },
];

export function chatModeLabel(value: string): string {
  return CHAT_MODES.find((mode) => mode.value === value)?.label ?? "Begleitung";
}
