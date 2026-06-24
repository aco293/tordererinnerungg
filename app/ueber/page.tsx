import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Über",
  description:
    "Über TorDerErinnerung und Aureon Thal’Emar – ein Wegbegleiter, kein Guru.",
};

const grundsaetze = [
  {
    title: "Erinnerung statt Belehrung",
    text: "Hier wird nichts behauptet, was du glauben sollst. Es geht um das Wiedererkennen dessen, was in dir bereits gewusst wird.",
  },
  {
    title: "Begleitung statt Autorität",
    text: "Aureon Thal’Emar ist Wegbegleiter, nicht Guru. Du gehst deinen Weg selbst – die Verantwortung bleibt bei dir.",
  },
  {
    title: "Ruhe statt Lärm",
    text: "Kein überladenes Design, keine Reizüberflutung. Ein stiller Raum, der Sammlung ermöglicht.",
  },
];

export default function UeberPage() {
  return (
    <PageShell
      eyebrow="Über das Tor"
      title="TorDerErinnerung"
      intro={
        <p>
          Ein digitaler Raum für Bewusstsein, Erinnerung und innere
          Rückverbindung – getragen von Klarheit und Ruhe.
        </p>
      }
    >
      <Section className="pt-4">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-6 text-lg leading-relaxed text-slate-300/85">
            <p>
              {site.name} ist als digitales Eingangstor gedacht: ein Ort, der
              nicht ablenkt, sondern sammelt. Die Räume, der Klangraum und das
              werdende System Luminalis bilden gemeinsam einen Weg der
              Erinnerung – behutsam, klar und ohne Druck.
            </p>
            <p>
              Begleitet wird dieser Weg von {site.author}. Verstanden nicht als
              Lehrer über dir, sondern als eine Stimme an deiner Seite, die
              erinnert: Die Antworten, die du suchst, wohnen bereits in dir.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            <h2 className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
              Drei Grundsätze
            </h2>
            <ul className="space-y-4">
              {grundsaetze.map((g) => (
                <li
                  key={g.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="font-serif text-xl font-light text-white">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300/75">
                    {g.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
