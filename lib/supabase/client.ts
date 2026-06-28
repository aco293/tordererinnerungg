/**
 * Supabase-Client für den Browser (Client Components).
 *
 * Nur in Client Components verwenden – und idealerweise erst innerhalb eines
 * Event-Handlers oder Effekts instanziieren, damit beim serverseitigen
 * Vorrendern keine Secrets benötigt werden.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

/** True, sobald die öffentlichen Supabase-Variablen konfiguriert sind. */
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
