"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createLuminalisEntry,
  deleteLuminalisEntry,
} from "@/lib/luminalis/entries";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type DialogState = { error: string | null; ok: boolean };

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function createDialogEntry(
  _prevState: DialogState,
  formData: FormData,
): Promise<DialogState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const content = String(formData.get("content") ?? "").trim();
  if (!content) {
    return {
      error: "Bitte schreibe ein paar Worte, bevor du speicherst.",
      ok: false,
    };
  }

  const title = String(formData.get("title") ?? "").trim();
  const mode = String(formData.get("mode") ?? "").trim();
  const pillar = String(formData.get("pillar") ?? "").trim();

  const { error } = await createLuminalisEntry(user.id, {
    entry_type: "dialog",
    mode: mode || null,
    pillar: pillar || null,
    title: title || null,
    content,
    resonance_topics: parseList(formData.get("resonance_topics")),
  });

  if (error) {
    return {
      error:
        "Dein Eintrag konnte nicht gespeichert werden. Bitte versuche es noch einmal.",
      ok: false,
    };
  }

  revalidatePath("/luminalis/dialog");
  return { error: null, ok: true };
}

/** Löschen (Liste und Detailseite) – danach zurück in den Dialograum. */
export async function deleteEntryAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const entryId = String(formData.get("entry_id") ?? "").trim();
  if (entryId) {
    await deleteLuminalisEntry(user.id, entryId);
  }

  revalidatePath("/luminalis/dialog");
  redirect("/luminalis/dialog");
}
