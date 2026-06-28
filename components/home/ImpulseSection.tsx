import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedArticles } from "@/lib/content/articles";

/**
 * „Aktuelle Impulse" – zeigt die neuesten veröffentlichten Beiträge der
 * Lichtbibliothek. Nutzt echte Inhalte; ohne veröffentlichte Beiträge wird
 * die Sektion ruhig ausgeblendet.
 */
export function ImpulseSection() {
  const articles = getPublishedArticles().slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <Section aria-labelledby="impulse-title">
      <SectionHeading
        eyebrow="Lichtbibliothek"
        title="Aktuelle Impulse"
        id="impulse-title"
      >
        <p>
          Stille Anstöße zum Erinnern – Texte, die nicht belehren, sondern
          wachrufen, was bereits in dir liegt.
        </p>
      </SectionHeading>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Card href={`/lichtbibliothek/${article.slug}`} glow="gold">
              <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-violet-soft/60">
                <span>{article.category}</span>
                <span aria-hidden className="text-gold/30">
                  •
                </span>
                <span>{article.readingTime} Min</span>
              </p>
              <h3 className="mt-4 font-serif text-2xl font-light leading-snug text-white">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/75">
                {article.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 group-hover:translate-x-1">
                Weiterlesen <span aria-hidden>→</span>
              </span>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex justify-center">
        <Button href="/lichtbibliothek" variant="ghost">
          Alle Impulse ansehen <span aria-hidden>→</span>
        </Button>
      </div>
    </Section>
  );
}
