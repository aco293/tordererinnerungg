import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { realms } from "@/lib/content/realms";

export function RealmsSection() {
  return (
    <Section id="raeume" aria-labelledby="realms-title">
      <SectionHeading
        eyebrow="Die Bewusstseinsräume"
        title="Fünf Räume der Erinnerung"
        id="realms-title"
      >
        <p>
          Jeder Raum ist eine Schwelle. Wähle, wohin deine Aufmerksamkeit dich
          zieht – es gibt keine falsche Reihenfolge.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {realms.map((realm) => (
          <li key={realm.slug}>
            <Card href={`/raeume/${realm.slug}`} glow={realm.glow}>
              <span
                aria-hidden
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-gold-soft transition-colors duration-500 group-hover:border-gold/40"
              >
                {realm.symbol}
              </span>
              <h3 className="font-serif text-2xl font-light text-white">
                {realm.title}
              </h3>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-violet-soft/60">
                {realm.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300/75">
                {realm.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 group-hover:translate-x-1">
                Raum betreten <span aria-hidden>→</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
