import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { createClient } from "@/lib/supabase/server";
import { safeInternalPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Registrieren",
  description: "Erstelle dein Konto und öffne deinen persönlichen Luminalis-Raum.",
};

export const dynamic = "force-dynamic";

export default async function RegistrierenPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  // Bereits eingeloggte Nutzer brauchen keine Registrierungsseite.
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { weiter } = await searchParams;
      redirect(safeInternalPath(weiter));
    }
  }

  return (
    <AuthShell
      eyebrow="Ein neuer Anfang"
      title="Konto erstellen"
      subtitle="Öffne deinen persönlichen Raum – den Beginn deines Weges mit Luminalis."
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
