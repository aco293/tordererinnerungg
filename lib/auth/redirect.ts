/**
 * Sicherer interner Redirect-Pfad. Lässt nur projektinterne Pfade zu und
 * verhindert offene Redirects (z. B. zu externen URLs oder protokoll-relativ).
 */
export function safeInternalPath(
  value: string | null | undefined,
  fallback = "/konto",
): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  return value;
}
