import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/books/BookCover";
import { BookBuyButton } from "@/components/books/BookBuyButton";
import { Section } from "@/components/ui/Section";
import { books, getBook, bookStatusLabel } from "@/lib/content/books";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <Section className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/lichtbibliothek#buecher"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-gold-soft"
        >
          <span aria-hidden>←</span> Zur Lichtbibliothek
        </Link>

        {/* Kopf: Cover + Eckdaten */}
        <div className="mt-8 grid gap-10 md:grid-cols-[260px_1fr] md:items-start">
          <div className="mx-auto w-48 sm:w-56 md:w-full">
            <BookCover symbol={book.symbol} glow={book.glow} large />
          </div>

          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-violet-soft/70">
              {bookStatusLabel[book.status]}
              <span aria-hidden className="text-gold/30">
                •
              </span>
              {book.format}
            </p>

            <h1 className="mt-5 font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
              <span className="text-gold-gradient">{book.title}</span>
            </h1>
            <p className="mt-2 text-lg italic text-gold-soft/70">{book.subtitle}</p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300/85">
              {book.longDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200/80"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookBuyButton slug={book.slug} />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Der Kaufbereich wird vorbereitet. Format: {book.format}.
            </p>
          </div>
        </div>

        {/* Vertiefung */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-xl font-light text-white">
              Für wen ist dieses Buch?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
              {book.forWhom}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-serif text-xl font-light text-white">
              Was öffnet dieses Buch?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
              {book.opens}
            </p>
          </div>
        </div>

        {/* Inhaltsübersicht */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-serif text-xl font-light text-white">
            Inhaltsübersicht
          </h2>
          <ol className="mt-5 space-y-3">
            {book.contents.map((entry, index) => (
              <li key={entry} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 font-serif text-xs text-gold-soft"
                >
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-slate-300/80">
                  {entry}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <BookBuyButton slug={book.slug} withHint />
        </div>
      </div>
    </Section>
  );
}
