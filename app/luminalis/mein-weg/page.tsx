import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { GlowTone } from "@/lib/content/library";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mein Weg",
  description: "Dein persönlicher Luminalis-Raum für Verbindung, Erinnerung, Resonanz und Ausrichtung.",
};

const pillars: { title: string; question: string; glow: GlowTone }[] = [
  {
    title: "Verbindung",
    question: "Was gehört in deinem Leben wieder zusammen?",
    glow: "violet",
  },
  {
    title: "Erinnerung",
    question: "Welche Erkenntnisse möchten sichtbar bleiben?",
    glow: "gold",
  },
  {
    title: "Resonanz",
    question: "Welche Themen kehren immer wieder zu dir zurück?",
    glow: "blue",
  },
  {
    title: "Ausrichtung",
    question: "Welche Schritte passen zu deinem inneren Kompass?",
    glow: "violet",
  },
];

export default async function MeinWegPage() {
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
      <div className="mx-auto max-w-2xl text-center animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          Luminalis
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
          Mein Weg
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300/85">
          Luminalis ist noch im Entstehen. Dieser Raum wird später deine
          persönlichen Erkenntnisse, Reisen, Notizen und Resonanzmuster sammeln.
        </p>
      </div>

      <ul className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
        {pillars.map((pillar) => (
          <li key={pillar.title}>
            <Card glow={pillar.glow} className="p-7">
              <h2 className="font-serif text-2xl font-light leading-snug text-white">
                {pillar.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300/80">
                {pillar.question}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/60">
                Bald verfügbar
                <span aria-hidden>→</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
