import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/content/library";

/**
 * Die fünf Haupträume der Lichtbibliothek als edle Karten.
 *
 * Die Detailseiten (`category.href`) folgen in einer späteren Phase; daher
 * sind die Karten hier noch nicht verlinkt, sondern zeigen einen ruhigen
 * Platzhalter „Raum erkunden“.
 */
export function LibraryCategoryGrid() {
  return (
    <Section aria-labelledby="library-rooms-title">
      <SectionHeading
        eyebrow="Die fünf Haupträume"
        title="Räume der Lichtbibliothek"
        id="library-rooms-title"
      >
        <p>
          Jeder Raum gliedert sich in stille Unterräume – eine Landkarte, die mit
          der Zeit zu echten Inhalten heranwächst.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <Card glow={category.glow} className="p-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-gold-soft"
                >
                  {category.symbol}
                </span>
                <h3 className="font-serif text-2xl font-light text-white">
                  {category.title}
                </h3>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-300/75">
                {category.description}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-medium uppercase tracking-[0.25em] text-violet-soft/60">
                  Unterräume
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {category.subrooms.map((subroom) => (
                    <li
                      key={subroom}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200/80"
                    >
                      {subroom}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="mt-7 inline-flex items-center gap-2 text-sm text-gold/60">
                Raum erkunden
                <span aria-hidden>→</span>
                <span className="sr-only">(in Vorbereitung)</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
