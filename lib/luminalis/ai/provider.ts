/**
 * Serverseitige Kapselung des KI-Anbieters.
 *
 * Wichtige Regeln:
 * - Nur serverseitig verwenden (kein NEXT_PUBLIC_, kein Client-Import).
 * - Der API-Schlüssel wird niemals geloggt oder zurückgegeben.
 * - Fehler werden als ruhiges Resultat-Objekt gemeldet, niemals als roher
 *   Provider-Fehler ins UI gereicht.
 * - Ist die KI nicht aktiviert oder unvollständig konfiguriert, antwortet die
 *   Funktion mit einem Fehlerstatus, ohne die App zum Absturz zu bringen.
 *
 * Bewusst anbieterneutral aufgebaut: Aktuell OpenAI-kompatibel (Chat
 * Completions). Weitere Anbieter oder lokale Modelle können hier ergänzt
 * werden, ohne die aufrufenden Stellen zu verändern.
 */

import type {
  GenerateLuminalisInput,
  GenerateLuminalisResult,
} from "@/lib/luminalis/ai/types";

/** Ist die KI grundsätzlich freigeschaltet? */
export function isAiEnabled(): boolean {
  return process.env.AI_ENABLED === "true";
}

/** Ist die KI vollständig konfiguriert (aktiviert, Schlüssel, Modell)? */
export function isAiConfigured(): boolean {
  return (
    isAiEnabled() &&
    Boolean(process.env.OPENAI_API_KEY) &&
    Boolean(process.env.OPENAI_MODEL)
  );
}

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function generateLuminalisResponse(
  input: GenerateLuminalisInput,
): Promise<GenerateLuminalisResult> {
  if (!isAiEnabled()) {
    return {
      ok: false,
      reason: "disabled",
      message: "Die KI ist derzeit nicht aktiviert.",
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      reason: "missing_key",
      message: "Es ist kein KI-Schlüssel hinterlegt.",
    };
  }

  const model = process.env.OPENAI_MODEL;
  if (!model) {
    return {
      ok: false,
      reason: "missing_model",
      message: "Es ist kein KI-Modell hinterlegt.",
    };
  }

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: input.temperature ?? 0.6,
        max_tokens: input.maxTokens ?? 900,
        messages: [
          { role: "system", content: input.systemPrompt },
          ...input.messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      // Keine rohen Provider-Details ins UI – nur ein ruhiger Status.
      return {
        ok: false,
        reason: "request_failed",
        message: "Die KI-Antwort konnte nicht erzeugt werden.",
      };
    }

    const data: unknown = await response.json();
    const content = extractContent(data);

    if (!content) {
      return {
        ok: false,
        reason: "empty_response",
        message: "Die KI hat keine verwertbare Antwort zurückgegeben.",
      };
    }

    return { ok: true, content };
  } catch {
    // Netzwerk-/Parsing-Fehler bewusst neutral behandeln; keine Keys loggen.
    return {
      ok: false,
      reason: "request_failed",
      message: "Die KI-Antwort konnte nicht erzeugt werden.",
    };
  }
}

/** Antworttext aus einer OpenAI-kompatiblen Chat-Completion herauslesen. */
function extractContent(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;
  const message = (choices[0] as { message?: unknown }).message;
  if (typeof message !== "object" || message === null) return null;
  const content = (message as { content?: unknown }).content;
  if (typeof content !== "string") return null;
  const trimmed = content.trim();
  return trimmed.length > 0 ? trimmed : null;
}
