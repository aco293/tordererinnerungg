"use server";

import { redirect } from "next/navigation";
import { createLuminalisIntegration } from "@/lib/luminalis/integrations";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type IntegrationFormState = { error: string | null };

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

const ALLOWED_STATUS = ["open", "in_motion", "integrated", "released"];

export async function createIntegrationAction(
  _prevState: IntegrationFormState,
  formData: FormData,
): Promise<IntegrationFormState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const intention = String(formData.get("intention") ?? "").trim();
  if (!intention) {
    return { error: "Bitte halte zuerst deine Intention fest." };
  }

  const statusRaw = String(formData.get("status") ?? "").trim();
  const status = ALLOWED_STATUS.includes(statusRaw) ? statusRaw : "open";
  const insightId = String(formData.get("insight_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const nextStep = String(formData.get("next_step") ?? "").trim();
  const rhythm = String(formData.get("rhythm") ?? "").trim();

  const { data, error } = await createLuminalisIntegration(user.id, {
    insight_id: insightId || null,
    title: title || null,
    intention,
    next_step: nextStep || null,
    rhythm: rhythm || null,
    status,
    resonance_topics: parseList(formData.get("resonance_topics")),
  });

  if (error || !data) {
    return {
      error:
        "Die Integration konnte nicht gespeichert werden. Bitte versuche es erneut.",
    };
  }

  redirect(`/luminalis/integration/${data.id}`);
}
