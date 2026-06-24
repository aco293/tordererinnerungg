import { Section } from "@/components/ui/Section";
import type { ArticleMeta } from "@/lib/content/articles";

function formatReadingTime(minutes: number): string {
  return `${minutes} Min. Lesezeit`;
}

export function ArticleHero({ meta }: { meta: ArticleMeta }) {
  return (
    <Section className="pb-10 pt-20 sm:pt-28" aria-labelledby="article-title">
      <div className="mx-auto max-w-2xl text-center animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          {meta.category}
        </p>

        <h1
          id="article-title"
          className="mt-5 font-serif text-4xl font-light leading-tight text-white sm:text-5xl"
        >
          {meta.title}
        </h1>

        {meta.description && (
          <p className="mt-6 text-lg leading-relaxed text-slate-300/80">
            {meta.description}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>{meta.category}</span>
          <span aria-hidden className="text-gold/40">
            •
          </span>
          <span>{formatReadingTime(meta.readingTime)}</span>
          {!meta.published && (
            <>
              <span aria-hidden className="text-gold/40">
                •
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] text-slate-400">
                Entwurf
              </span>
            </>
          )}
        </div>

        <div
          aria-hidden
          className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />
      </div>
    </Section>
  );
}
