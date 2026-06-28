import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Melde dich an, um deinen persönlichen Luminalis-Raum zu betreten.",
};

export default function AnmeldenPage() {
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
