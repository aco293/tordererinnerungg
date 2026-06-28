import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { safeInternalPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Melde dich an, um deinen persönlichen Luminalis-Raum zu betreten.",
};

export const dynamic = "force-dynamic";

export default async function AnmeldenPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  // Bereits eingeloggte Nutzer brauchen keine Anmeldeseite.
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
      eyebrow="Willkommen zurück"
      title="Anmelden"
      subtitle="Kehre zu deinem persönlichen Raum zurück und setze deinen Weg fort."
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
