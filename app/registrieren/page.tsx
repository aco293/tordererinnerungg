import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Registrieren",
  description: "Erstelle dein Konto und öffne deinen persönlichen Luminalis-Raum.",
};

export const dynamic = "force-dynamic";

/** Nur interne Pfade zulassen – keine offenen Redirects. */
function safeNext(value: string | undefined): string {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/konto";
}

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
      redirect(safeNext(weiter));
    }
  }

  return (
    <AuthShell
      eyebrow="Ein neuer Anfang"
      title="Konto erstellen"
      subtitle="Öffne deinen persönlichen Raum – den Beginn deines Weges mit Luminalis."
    >
      <RegisterForm />
    </AuthShell>
  );
}
