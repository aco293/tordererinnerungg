"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateLuminalisIntegration } from "@/lib/luminalis/integrations";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type EditIntegrationState = { error: string | null };

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

export async function updateIntegrationAction(
  _prevState: EditIntegrationState,
  formData: FormData,
): Promise<EditIntegrationState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const integrationId = String(formData.get("integration_id") ?? "").trim();
  if (!integrationId) {
    return { error: "Die Integration konnte nicht gefunden werden." };
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
  const reflection = String(formData.get("reflection") ?? "").trim();

  const { error } = await updateLuminalisIntegration(user.id, integrationId, {
    insight_id: insightId || null,
    title: title || null,
    intention,
    next_step: nextStep || null,
    rhythm: rhythm || null,
    status,
    reflection: reflection || null,
    resonance_topics: parseList(formData.get("resonance_topics")),
  });

  if (error) {
    return {
      error:
        "Die Integration konnte nicht aktualisiert werden. Bitte versuche es erneut.",
    };
  }

  revalidatePath("/luminalis/integration");
  revalidatePath(`/luminalis/integration/${integrationId}`);
  redirect(`/luminalis/integration/${integrationId}`);
}
