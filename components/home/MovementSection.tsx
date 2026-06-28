import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Principle = {
  symbol: string;
  step: string;
  label: string;
  text: string;
};

const principles: Principle[] = [
  {
    symbol: "◯",
    step: "I",
    label: "Langsam lesen",
    text: "Es gibt nichts zu erreichen. Lass die Worte wirken, statt sie zu sammeln.",
  },
  {
    symbol: "≈",
    step: "II",
    label: "Resonanz spüren",
    text: "Folge nicht nur dem Kopf, sondern dem, was in dir leise mitschwingt.",
  },
  {
    symbol: "✦",
    step: "III",
    label: "Dem inneren Ruf folgen",
    text: "Wähle den Raum, der dich still werden lässt. Dort ist deine Schwelle.",
  },
];

/**
 * Schritt 3 der Dramaturgie: erklärt ruhig, wie sich der Nutzer durch das Tor
 * bewegt – nicht suchend, sondern der Resonanz folgend.
 */
export function MovementSection() {
  return (
    <Section aria-labelledby="movement-title">
      <SectionHeading
        eyebrow="Orientierung"
        title="So bewegst du dich hier"
        id="movement-title"
      >
        <p>
          Du musst hier nichts suchen. Lies langsam und spüre, welcher Raum dich
          ruft. Wenn ein Wort, ein Bild oder ein Satz in dir still wird, bist du
          an der richtigen Schwelle.
        </p>
      </SectionHeading>

      <ol className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
        {principles.map((principle) => (
          <li
            key={principle.label}
            className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors duration-500 hover:border-gold/30"
          >
            <span
              aria-hidden
              className="absolute right-4 top-3 font-serif text-xs tracking-[0.3em] text-gold/30"
            >
              {principle.step}
            </span>
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-lg text-gold-soft shadow-[inset_0_0_18px_rgba(243,217,164,0.06)] transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold group-hover:shadow-glow-gold"
            >
              {principle.symbol}
            </span>
            <p className="mt-5 font-serif text-lg font-light text-white">
              {principle.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/75">
              {principle.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
