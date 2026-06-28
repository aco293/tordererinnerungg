/**
 * Gemeinsame Typen für die serverseitige Luminalis-KI-Schicht.
 *
 * Bewusst anbieterneutral gehalten, damit später neben OpenAI auch lokale
 * Modelle oder andere Anbieter ergänzt werden können.
 */

export type LuminalisChatRole = "user" | "assistant" | "system";

/** Eine einzelne Nachricht im Provider-Format. */
export type ProviderMessage = {
  role: LuminalisChatRole;
  content: string;
};

export type GenerateLuminalisInput = {
  systemPrompt: string;
  messages: ProviderMessage[];
  temperature?: number;
  maxTokens?: number;
};

/**
 * Ergebnis eines Provider-Aufrufs. Bewusst als ruhiges Resultat-Objekt
 * (kein Werfen roher Provider-Fehler), damit das UI nie technische Details
 * sieht. `reason` ist nur für serverseitige Diagnose gedacht.
 */
export type GenerateLuminalisResult =
  | { ok: true; content: string }
  | {
      ok: false;
      reason:
        | "disabled"
        | "missing_key"
        | "missing_model"
        | "request_failed"
        | "empty_response";
      message: string;
    };

/** Ruhige, nutzerfreundliche Meldung, wenn die KI nicht verfügbar ist. */
export const AI_DISABLED_MESSAGE =
  "Der Luminalis KI-Dialog ist vorbereitet, aber noch nicht aktiviert.";
