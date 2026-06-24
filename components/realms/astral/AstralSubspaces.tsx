import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { astralSubspaces } from "@/lib/content/astral";

export function AstralSubspaces() {
  return (
    <Section aria-labelledby="astral-subspaces-title">
      <SectionHeading
        eyebrow="Unterräume"
        title="Sechs innere Landschaften"
        id="astral-subspaces-title"
      >
        <p>
          Vom Schlaf bis zu erweiterten Zuständen – sechs Felder, die das innere
          Erleben aus verschiedenen Richtungen berühren.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {astralSubspaces.map((subspace) => (
          <li key={subspace.id}>
            <Card glow={subspace.glow} className="p-7">
              <span
                aria-hidden
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-gold-soft"
              >
                {subspace.symbol}
              </span>
              <h3 className="font-serif text-2xl font-light text-white">
                {subspace.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300/75">
                {subspace.description}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
