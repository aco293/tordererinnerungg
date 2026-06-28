import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Section } from "@/components/ui/Section";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dein persönlicher Raum",
  description: "Der Beginn deines persönlichen Luminalis-Raums.",
};

export default async function KontoPage() {
  // Schutz auch auf Seitenebene (zusätzlich zur Middleware).
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/anmelden");
  }

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          Luminalis
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
          Dein persönlicher Raum
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300/85">
          Hier beginnt Luminalis, dein Begleiter für Verbindung, Erinnerung,
          Resonanz und innere Ausrichtung.
        </p>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Angemeldet als
          </p>
          <p className="mt-2 break-all font-serif text-xl font-light text-white">
            {user.email}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-slate-300/75">
            Dieser Raum wächst nach und nach. Schritt für Schritt entstehen hier
            persönliche Werkzeuge für deine Reise – ruhig, klar und ganz auf dich
            ausgerichtet.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="/luminalis/mein-weg">Mein Weg öffnen</Button>
          <LogoutButton />
        </div>
      </div>
    </Section>
  );
}
