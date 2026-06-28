/**
 * Serverseitige Helfer rund um das Luminalis-Profil.
 *
 * Nutzt ausschließlich den anonymen Supabase-Client über die Nutzer-Session
 * (Row Level Security schützt die Daten). Kein Service-Role-Key, keine Secrets.
 * Nur in Server Components, Route Handlern oder Server Actions verwenden.
 */

import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string | null;
  created_at: string;
  updated_at: string;
};

export type LuminalisProfile = {
  user_id: string;
  display_name: string | null;
  current_focus: string | null;
  guiding_question: string | null;
  selected_pillars: string[];
  resonance_topics: string[];
  first_intention: string | null;
  created_at: string;
  updated_at: string;
};

export type LuminalisProfileInput = {
  display_name: string;
  current_focus: string;
  guiding_question: string;
  selected_pillars: string[];
  resonance_topics: string[];
  first_intention: string;
};

/** Aktuell eingeloggter Nutzer oder null. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Basisprofil eines Nutzers. */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

/** Persönliches Luminalis-Profil eines Nutzers. */
export async function getLuminalisProfile(
  userId: string,
): Promise<LuminalisProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as LuminalisProfile | null) ?? null;
}

/** Luminalis-Profil anlegen oder aktualisieren (Upsert auf user_id). */
export async function upsertLuminalisProfile(
  userId: string,
  input: LuminalisProfileInput,
): Promise<{ data: LuminalisProfile | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_profiles")
    .upsert(
      {
        user_id: userId,
        ...input,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisProfile | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Existiert bereits ein Luminalis-Profil? */
export async function hasLuminalisProfile(userId: string): Promise<boolean> {
  const profile = await getLuminalisProfile(userId);
  return profile !== null;
}
