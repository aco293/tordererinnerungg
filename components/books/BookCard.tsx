import Link from "next/link";
import { BookCover } from "@/components/books/BookCover";
import { BookBuyButton } from "@/components/books/BookBuyButton";
import { bookStatusLabel, type Book } from "@/lib/content/books";

type BookCardProps = {
  book: Book;
};

/**
 * Buchkarte im „geschriebenes Tor"-Stil: abstraktes CSS-Cover, Titel,
 * Untertitel, Anriss und zwei Aktionen (Detailseite + vorbereiteter Kauf).
 */
export function BookCard({ book }: BookCardProps) {
  const detailHref = `/lichtbibliothek/buch/${book.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_8px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow-gold sm:p-6">
      <Link href={detailHref} className="block" aria-label={`${book.title} ansehen`}>
        <BookCover symbol={book.symbol} glow={book.glow} />
      </Link>

      <p className="mt-5 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-violet-soft/60">
        {bookStatusLabel[book.status]}
      </p>

      <h3 className="mt-2 font-serif text-xl font-light leading-snug text-white">
        <Link href={detailHref} className="transition-colors hover:text-gold-soft">
          {book.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm italic text-gold-soft/70">{book.subtitle}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/75">
        {book.teaser}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 group-hover:translate-x-1"
        >
          Buch ansehen <span aria-hidden>→</span>
        </Link>
        <BookBuyButton slug={book.slug} className="w-full" />
      </div>
    </article>
  );
}
