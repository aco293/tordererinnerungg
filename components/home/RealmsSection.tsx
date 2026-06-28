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

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {realms.map((realm) => (
          <li key={realm.slug}>
            <Card href={`/raeume/${realm.slug}`} glow={realm.glow} className="p-6">
              <span
                aria-hidden
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-lg text-gold-soft shadow-[inset_0_0_18px_rgba(243,217,164,0.06)] transition-all duration-500 group-hover:border-gold/40 group-hover:text-gold group-hover:shadow-glow-gold"
              >
                {realm.symbol}
              </span>
              <h3 className="font-serif text-xl font-light text-white">
                {realm.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-violet-soft/60">
                {realm.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/75">
                {realm.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 group-hover:translate-x-1">
                Raum betreten <span aria-hidden>→</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
