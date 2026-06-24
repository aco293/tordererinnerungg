import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { earthCosmosSubspaces } from "@/lib/content/earthCosmos";

export function EarthCosmosSubspaces() {
  return (
    <Section aria-labelledby="earth-cosmos-subspaces-title">
      <SectionHeading
        eyebrow="Unterräume"
        title="Sieben Felder zwischen Erde und Weite"
        id="earth-cosmos-subspaces-title"
      >
        <p>
          Von der Verwurzelung im Boden bis zur Weite des Universums – sieben
          Felder, die zusammen ein einziges Feld bilden.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {earthCosmosSubspaces.map((subspace) => (
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
