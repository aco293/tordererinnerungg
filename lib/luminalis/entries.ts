/**
 * Serverseitige Helfer für Luminalis-Weg-Einträge.
 *
 * Nutzt den anonymen Supabase-Client über die Nutzer-Session; Row Level
 * Security stellt sicher, dass jeder nur seine eigenen Einträge sieht.
 * Kein Service-Role-Key, keine Secrets. Nur serverseitig verwenden.
 */

import { createClient } from "@/lib/supabase/server";

export type LuminalisEntry = {
  id: string;
  user_id: string;
  entry_type: string;
  pillar: string | null;
  mode: string | null;
  title: string | null;
  content: string;
  resonance_topics: string[];
  created_at: string;
  updated_at: string;
};

export type LuminalisEntryInput = {
  entry_type?: string;
  pillar?: string | null;
  mode?: string | null;
  title?: string | null;
  content: string;
  resonance_topics?: string[];
};

/** Die jüngsten Einträge eines Nutzers (neueste zuerst). */
export async function getRecentLuminalisEntries(
  userId: string,
  limit = 10,
): Promise<LuminalisEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as LuminalisEntry[] | null) ?? [];
}

/** Neuen Eintrag anlegen. */
export async function createLuminalisEntry(
  userId: string,
  input: LuminalisEntryInput,
): Promise<{ data: LuminalisEntry | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_entries")
    .insert({
      user_id: userId,
      entry_type: input.entry_type ?? "dialog",
      pillar: input.pillar ?? null,
      mode: input.mode ?? null,
      title: input.title ?? null,
      content: input.content,
      resonance_topics: input.resonance_topics ?? [],
    })
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisEntry | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Eigenen Eintrag löschen (RLS erzwingt Eigentümerschaft zusätzlich). */
export async function deleteLuminalisEntry(
  userId: string,
  entryId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  return { error: error?.message ?? null };
}
