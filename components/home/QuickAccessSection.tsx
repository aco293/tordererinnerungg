import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Access = {
  title: string;
  symbol: string;
  text: string;
  href: string;
  cta: string;
  glow: "violet" | "gold" | "blue";
};

const accesses: Access[] = [
  {
    title: "Bewusstseinsräume",
    symbol: "◯",
    text: "Betritt Räume, die dich zurück zu innerer Klarheit, Stille und Selbstbeobachtung führen.",
    href: "/raeume",
    cta: "Räume öffnen",
    glow: "violet",
  },
  {
    title: "Luminalis",
    symbol: "✶",
    text: "Eine stille Frequenzintelligenz, die deine gespeicherten Impulse behutsam spiegelt.",
    href: "/luminalis",
    cta: "Luminalis öffnen",
    glow: "gold",
  },
  {
    title: "Lichtbibliothek",
    symbol: "❖",
    text: "Impulse, Texte und Felder für Erinnerung, Tiefe und Rückverbindung.",
    href: "/lichtbibliothek",
    cta: "Bibliothek betreten",
    glow: "blue",
  },
  {
    title: "Klangraum",
    symbol: "≈",
    text: "Schwingung, Stille und Klang als Brücke zu deinem inneren Feld.",
    href: "/klangraum",
    cta: "Klangraum öffnen",
    glow: "violet",
  },
];

/** Schritt 4 der Dramaturgie: klare Einstiegspunkte – wähle deinen Zugang. */
export function QuickAccessSection() {
  return (
    <Section aria-labelledby="access-title">
      <SectionHeading eyebrow="Beginne hier" title="Wähle deinen Zugang" id="access-title">
        <p>
          Jeder Zugang öffnet einen anderen Raum. Du musst nicht alles verstehen
          – wähle das, was dich innerlich berührt.
        </p>
      </SectionHeading>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {accesses.map((access) => (
          <li key={access.href}>
            <Card href={access.href} glow={access.glow} className="p-6">
              <span
                aria-hidden
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-lg text-gold-soft shadow-[inset_0_0_18px_rgba(243,217,164,0.06)] transition-all duration-500 group-hover:border-gold/40 group-hover:text-gold group-hover:shadow-glow-gold"
              >
                {access.symbol}
              </span>
              <h3 className="font-serif text-xl font-light text-white">
                {access.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300/75">
                {access.text}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 group-hover:translate-x-1">
                {access.cta} <span aria-hidden>→</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
