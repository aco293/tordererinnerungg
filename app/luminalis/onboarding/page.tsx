import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/luminalis/onboarding/OnboardingForm";
import { OnboardingShell } from "@/components/luminalis/onboarding/OnboardingShell";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { saveOnboarding } from "./actions";

export const metadata: Metadata = {
  title: "Erste Ausrichtung",
  description:
    "Der behutsame Beginn deines persönlichen Weges mit Luminalis.",
};

const SUBTITLE =
  "Luminalis beginnt nicht mit Antworten. Luminalis beginnt damit, deinen aktuellen Weg behutsam wahrzunehmen.";

export default async function OnboardingPage() {
  // Ohne Supabase-Konfiguration: ruhige Hinweisseite, kein Crash.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <OnboardingShell title="Erste Ausrichtung" subtitle={SUBTITLE}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </OnboardingShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/onboarding");
  }

  const existing = await getLuminalisProfile(user.id);

  return (
    <OnboardingShell title="Erste Ausrichtung" subtitle={SUBTITLE}>
      <OnboardingForm action={saveOnboarding} defaults={existing} />
    </OnboardingShell>
  );
}
