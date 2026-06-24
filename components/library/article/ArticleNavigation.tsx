import Link from "next/link";
import { Section } from "@/components/ui/Section";
import type { ArticleMeta } from "@/lib/content/articles";

type ArticleNavigationProps = {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
};

export function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  return (
    <Section className="pt-4" aria-label="Artikelnavigation">
      <nav className="mx-auto max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/lichtbibliothek/${prev.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-glow/50 hover:shadow-glow"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <span aria-hidden>←</span> Vorheriger Artikel
              </span>
              <span className="mt-2 block font-serif text-lg font-light text-white">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}

          {next ? (
            <Link
              href={`/lichtbibliothek/${next.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-glow/50 hover:shadow-glow sm:col-start-2"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Nächster Artikel <span aria-hidden>→</span>
              </span>
              <span className="mt-2 block font-serif text-lg font-light text-white">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/lichtbibliothek"
            className="inline-flex items-center gap-2 text-sm text-violet-soft/80 transition-colors hover:text-violet-soft"
          >
            <span aria-hidden>↑</span> Zur Lichtbibliothek
          </Link>
        </div>
      </nav>
    </Section>
  );
}
