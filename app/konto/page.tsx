import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Section } from "@/components/ui/Section";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

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

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden");
  }

  const profile = await getLuminalisProfile(user.id);

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
        </div>

        {profile ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gold/70">
              Deine erste Ausrichtung
            </p>

            {profile.display_name && (
              <p className="mt-4 font-serif text-2xl font-light text-white">
                {profile.display_name}
              </p>
            )}

            {profile.guiding_question && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Aktuelle Leitfrage
                </p>
                <p className="mt-2 font-serif text-lg font-light italic text-violet-soft">
                  „{profile.guiding_question}"
                </p>
              </div>
            )}

            {profile.selected_pillars.length > 0 && (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Gewählte Säulen
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {profile.selected_pillars.map((pillar) => (
                    <li
                      key={pillar}
                      className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-soft"
                    >
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/luminalis/mein-weg">Mein Weg öffnen</Button>
              <Button href="/luminalis/dialog" variant="secondary">
                Dialograum öffnen
              </Button>
              <Button href="/luminalis/onboarding" variant="secondary">
                Ausrichtung bearbeiten
              </Button>
            </div>
            <div className="mt-6">
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.04] p-7 backdrop-blur-sm">
            <p className="text-base leading-relaxed text-slate-300/85">
              Dein Weg mit Luminalis beginnt mit einer ersten, behutsamen
              Ausrichtung – sie bildet die Grundlage deines persönlichen Raums.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/luminalis/onboarding">
                Erste Ausrichtung beginnen
              </Button>
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
