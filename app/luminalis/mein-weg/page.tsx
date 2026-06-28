import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";
import { getRecentLuminalisEntries } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { getResonanceOverview } from "@/lib/luminalis/resonance";

export const metadata: Metadata = {
  title: "Mein Weg",
  description:
    "Dein persönlicher Luminalis-Raum für Verbindung, Erinnerung, Resonanz und Ausrichtung.",
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export const dynamic = "force-dynamic";

export default async function MeinWegPage() {
  // Schutz auch auf Seitenebene (zusätzlich zum Proxy).
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

  const [recentEntries, overview] = await Promise.all([
    getRecentLuminalisEntries(user.id, 3),
    getResonanceOverview(user.id),
  ]);
  const entryCount = overview.totalEntries;
  const selected = new Set(profile.selected_pillars);
  const greetingName = profile.display_name?.trim();

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <LuminalisSubnav />
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center animate-fade-up">
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

      {/* Überblick über die Weg-Einträge */}
      <div className="mx-auto mt-12 max-w-2xl">
        {entryCount > 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Einträge
                </p>
                <p className="mt-1 font-serif text-xl font-light text-white">
                  {entryCount}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Häufigste Säule
                </p>
                <p className="mt-1 font-serif text-xl font-light text-white">
                  {overview.activePillar ?? "–"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Letzter Eintrag
                </p>
                <p className="mt-1 font-serif text-xl font-light text-white">
                  {overview.lastEntryAt ? formatDate(overview.lastEntryAt) : "–"}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href="/luminalis/dialog"
                className="text-gold/80 transition-colors hover:text-gold"
              >
                Zum Dialograum →
              </Link>
              <Link
                href="/luminalis/frequenzspiegel"
                className="text-gold/80 transition-colors hover:text-gold"
              >
                Zum Frequenzspiegel →
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 text-center backdrop-blur-sm">
            <p className="text-base leading-relaxed text-slate-300/85">
              Beginne im Dialograum mit deinem ersten Weg-Eintrag.
            </p>
          </div>
        )}
      </div>

      {/* Persönliche Ausrichtung */}
      <div className="mx-auto mt-8 max-w-2xl space-y-5">
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

      {/* Dialograum-Einstieg */}
      <div className="mx-auto mt-8 max-w-2xl">
        <Card glow="gold" className="p-7">
          <h2 className="font-serif text-2xl font-light text-white">
            Dialograum
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300/80">
            Halte fest, was in dir präsent ist. Aus diesen Einträgen entsteht
            später die Grundlage deiner persönlichen Frequenzintelligenz.
          </p>

          {recentEntries.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
              {recentEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="truncate text-slate-300/85">
                    {entry.title?.trim() || "Unbenannter Eintrag"}
                  </span>
                  <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-slate-500">
                    {formatDate(entry.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7">
            <Button href="/luminalis/dialog">Dialograum öffnen</Button>
          </div>
        </Card>
      </div>

      {/* Frequenzspiegel-Einstieg */}
      <div className="mx-auto mt-6 max-w-2xl">
        <Card glow="violet" className="p-7">
          <h2 className="font-serif text-2xl font-light text-white">
            Frequenzspiegel
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300/80">
            Erkenne, welche Säulen, Modi und Resonanzthemen in deinen eigenen
            Weg-Einträgen wiederkehren.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400/85">
            {entryCount > 0
              ? `Aus ${entryCount} ${
                  entryCount === 1 ? "Eintrag" : "Einträgen"
                } entsteht dein erster Spiegel.`
              : "Der Frequenzspiegel wird sichtbar, sobald du erste Einträge im Dialograum speicherst."}
          </p>
          <div className="mt-7">
            <Button href="/luminalis/frequenzspiegel" variant="secondary">
              Frequenzspiegel öffnen
            </Button>
          </div>
        </Card>
      </div>

      {/* Die fünf Säulen – gewählte sind hervorgehoben */}
      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {LUMINALIS_PILLARS.map((pillar) => {
          const active = selected.has(pillar.label);
          return (
            <li key={pillar.id}>
              <Card
                glow={active ? "gold" : "violet"}
                className={`p-7 ${active ? "border-gold/40 bg-gold/[0.04]" : ""}`}
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
