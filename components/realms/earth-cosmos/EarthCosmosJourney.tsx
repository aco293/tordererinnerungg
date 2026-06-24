import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { earthCosmosJourney } from "@/lib/content/earthCosmos";

/**
 * Erste Kosmosreise: drei Fragen als Einladung zur Kontemplation.
 *
 * Die Karten wirken bewusst hochwertig und klickbar (Hover-Glow), tragen aber
 * in dieser Phase noch keine Funktion – daher reine Darstellungsebene ohne
 * interaktive Rolle, um keine Aktion zu versprechen.
 */
export function EarthCosmosJourney() {
  return (
    <Section aria-labelledby="earth-cosmos-journey-title">
      <SectionHeading
        eyebrow={earthCosmosJourney.eyebrow}
        title={earthCosmosJourney.title}
        id="earth-cosmos-journey-title"
      >
        <p className="font-serif text-xl italic text-violet-soft sm:text-2xl">
          {earthCosmosJourney.text}
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 md:grid-cols-3">
        {earthCosmosJourney.questions.map((question) => (
          <li key={question.id}>
            <div className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow-gold">
              <span
                aria-hidden
                className="absolute -top-6 right-2 font-serif text-7xl text-white/[0.04] transition-colors duration-500 group-hover:text-gold/10"
              >
                {question.numeral}
              </span>
              <span
                aria-hidden
                className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-sm text-gold"
              >
                {question.numeral}
              </span>
              <p className="font-serif text-xl font-light leading-snug text-white sm:text-2xl">
                {question.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
