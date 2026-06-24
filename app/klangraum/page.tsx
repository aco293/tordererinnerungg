import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Klangraum",
  description:
    "Klangformeln, meditative Sequenzen und Aktivierungen – ein Raum, in dem Stille und Schwingung zusammenfinden.",
};

const formen = [
  {
    symbol: "≈",
    title: "Klangformeln",
    text: "Frequenzsequenzen, die Zustände der Sammlung und inneren Klarheit unterstützen.",
  },
  {
    symbol: "☽",
    title: "Meditative Sequenzen",
    text: "Ruhige, geführte Wege nach innen – Schritt für Schritt, Atemzug für Atemzug.",
  },
  {
    symbol: "✦",
    title: "Aktivierungen",
    text: "Klang als sanfter Impuls – um Aufmerksamkeit zu wecken und zu sammeln.",
  },
];

export default function KlangraumPage() {
  return (
    <PageShell
      eyebrow="Klang & Frequenz"
      title="Klangraum"
      intro={
        <p>
          Ein Raum, in dem Stille und Schwingung zusammenfinden. Klang, der
          nicht zerstreut, sondern sammelt.
        </p>
      }
    >
      <Section className="pt-4">
        {/* Klangwellen-Motiv */}
        <div aria-hidden className="mb-14 flex justify-center gap-1.5">
          {[14, 28, 44, 34, 20, 38, 50, 30, 18, 26, 12].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-violet-glow/40 to-gold/70 animate-pulse-soft"
              style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formen.map((f) => (
            <li key={f.title}>
              <Card glow="violet">
                <span
                  aria-hidden
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-violet-soft"
                >
                  {f.symbol}
                </span>
                <h2 className="font-serif text-2xl font-light text-white">
                  {f.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/75">
                  {f.text}
                </p>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm leading-relaxed text-slate-400">
          Der Klangraum wird klingend werden. Hörbare Sequenzen und Formeln
          folgen in einer späteren Entwicklungsstufe.
        </p>
      </Section>
    </PageShell>
  );
}
