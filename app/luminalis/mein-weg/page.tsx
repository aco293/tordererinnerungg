import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const metadata: Metadata = {
  title: "Mein Weg",
  description:
    "Dein persönlicher Luminalis-Raum für Verbindung, Erinnerung, Resonanz und Ausrichtung.",
};

export default async function MeinWegPage() {
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

  // Ohne erste Ausrichtung führt der Weg zuerst durchs Onboarding.
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const selected = new Set(profile.selected_pillars);
  const greetingName = profile.display_name?.trim();

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl text-center animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          Luminalis
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
          Mein Weg
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300/85">
          {greetingName
            ? `Willkommen zurück, ${greetingName}.`
            : "Willkommen zurück."}
        </p>
      </div>

      {/* Persönliche Ausrichtung */}
      <div className="mx-auto mt-12 max-w-2xl space-y-5">
        {profile.guiding_question && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Deine Leitfrage
            </p>
            <p className="mt-2 font-serif text-xl font-light italic text-violet-soft">
              „{profile.guiding_question}"
            </p>
          </div>
        )}

        {profile.current_focus && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Aktueller Fokus
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-300/85">
              {profile.current_focus}
            </p>
          </div>
        )}

        {profile.resonance_topics.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Resonanzthemen
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.resonance_topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/80"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Die fünf Säulen – gewählte sind hervorgehoben */}
      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {LUMINALIS_PILLARS.map((pillar) => {
          const active = selected.has(pillar.label);
          return (
            <li key={pillar.id}>
              <Card
                glow={active ? "gold" : "violet"}
                className={`p-7 ${
                  active ? "border-gold/40 bg-gold/[0.04]" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-serif text-2xl font-light leading-snug text-white">
                    {pillar.label}
                  </h2>
                  {active && (
                    <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold-soft">
                      Gewählt
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-300/80">
                  {pillar.question}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/60">
                  Bald verfügbar
                  <span aria-hidden>→</span>
                </span>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
