import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Registrieren",
  description: "Erstelle dein Konto und öffne deinen persönlichen Luminalis-Raum.",
};

export default function RegistrierenPage() {
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
