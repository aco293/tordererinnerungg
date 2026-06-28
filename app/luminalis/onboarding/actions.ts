"use server";

import { redirect } from "next/navigation";
import {
  getCurrentUser,
  upsertLuminalisProfile,
} from "@/lib/luminalis/profile";

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function saveOnboarding(formData: FormData) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/onboarding");
  }

  const pillars = formData.getAll("pillars").map(String);

  await upsertLuminalisProfile(user.id, {
    display_name: String(formData.get("display_name") ?? "").trim(),
    current_focus: String(formData.get("current_focus") ?? "").trim(),
    guiding_question: String(formData.get("guiding_question") ?? "").trim(),
    selected_pillars: pillars,
    resonance_topics: parseList(formData.get("resonance_topics")),
    first_intention: String(formData.get("first_intention") ?? "").trim(),
  });

  redirect("/luminalis/mein-weg");
}
