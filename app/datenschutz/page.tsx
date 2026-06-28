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
            <p className="mt-6 text-base leading-relaxed text-slate-300/70">
              Sobald der persönliche Bereich Luminalis aktiv genutzt wird,
              findest du hier eine klare, vollständige Datenschutzerklärung –
              wie und warum Daten verarbeitet werden und welche Rechte du hast.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
