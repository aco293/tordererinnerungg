import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Hinweise zum Datenschutz bei TorDerErinnerung.",
};

export default function DatenschutzPage() {
  return (
    <PageShell
      eyebrow="Rechtliches"
      title="Datenschutz"
      intro={
        <p>
          Der Schutz deiner Daten ist ein tragendes Prinzip dieses Ortes.
        </p>
      }
    >
      <Section className="pt-0">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-8">
            <p className="text-lg leading-relaxed text-slate-300/85">
              Diese Seite wird vor Veröffentlichung rechtlich geprüft und
              vollständig ausgearbeitet.
            </p>

            <div className="mt-8">
              <h2 className="font-serif text-xl font-light text-white">
                Persönlicher Bereich (Luminalis)
              </h2>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-300/80">
                <li>
                  Für den persönlichen Luminalis-Bereich wird ein Konto benötigt.
                </li>
                <li>
                  Gespeichert werden können deine E-Mail-Adresse, dein
                  Anzeigename, deine gewählten Säulen, deine Leitfrage sowie deine
                  eigenen Eingaben.
                </li>
                <li>
                  Diese Daten dienen ausschließlich deiner persönlichen
                  Begleitung – nicht der Auswertung durch Dritte.
                </li>
                <li>
                  Vor öffentlicher Veröffentlichung wird die Datenschutzerklärung
                  rechtlich geprüft und vollständig ausgearbeitet.
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="font-serif text-xl font-light text-white">
                Persönliche Weg-Einträge
              </h2>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-300/80">
                <li>
                  Luminalis kann persönliche Weg-Einträge speichern, die du im
                  Dialograum verfasst.
                </li>
                <li>
                  Diese Einträge sind privat und ausschließlich deinem
                  Nutzerkonto zugeordnet.
                </li>
                <li>
                  Sie dienen später als Grundlage für persönliche Reflexion sowie
                  mögliche Resonanz- und Erinnerungsfunktionen.
                </li>
                <li>
                  Aus gespeicherten Weg-Einträgen können im persönlichen Bereich
                  einfache Muster angezeigt werden, z. B. häufige Säulen, Modi
                  oder Resonanzthemen.
                </li>
                <li>
                  Diese Muster dienen der persönlichen Reflexion. Sie sind keine
                  psychologische Diagnose und keine endgültige Aussage über den
                  Menschen.
                </li>
                <li>
                  Sie werden ausschließlich im jeweiligen Nutzerkonto angezeigt.
                </li>
                <li>
                  Auch hierfür gilt: Vor Veröffentlichung wird der Text rechtlich
                  geprüft und vollständig ausgearbeitet.
                </li>
              </ul>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-slate-400/80">
              Hinweis: Dieser Text ist ein vorläufiger Entwurf und stellt noch
              keine abschließende Datenschutzerklärung dar.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
