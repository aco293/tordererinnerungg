import Link from "next/link";
import { BookCover } from "@/components/books/BookCover";
import { BookBuyButton } from "@/components/books/BookBuyButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { books, bookStatusLabel } from "@/lib/content/books";

/**
 * Ausführliche Vorstellung der Bücher auf der Lichtbibliothek-Seite.
 * Jedes Buch als breites Panel: Cover, Beschreibung, Tags, Format, Status
 * sowie vorbereiteter Kaufbutton und Link zur Detailseite.
 */
export function LibraryBooks() {
  return (
    <Section id="buecher" aria-labelledby="library-books-heading">
      <SectionHeading
        eyebrow="Geschriebene Tore"
        title="Bücher der Lichtbibliothek"
        id="library-books-heading"
      >
        <p>
          Drei Werke. Drei Wege. Jedes Buch öffnet eine andere Schwelle – für
          Bewusstsein, Verbindung und Erinnerung.
        </p>
      </SectionHeading>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-8">
        {books.map((book, index) => {
          const detailHref = `/lichtbibliothek/buch/${book.slug}`;
          return (
            <article
              key={book.slug}
              className="group relative grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold/30 sm:p-8 md:grid-cols-[200px_1fr] md:items-start"
            >
              {/* Cover */}
              <Link
                href={detailHref}
                aria-label={`${book.title} ansehen`}
                className={`mx-auto w-40 sm:w-48 md:w-full ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <BookCover symbol={book.symbol} glow={book.glow} large />
              </Link>

              {/* Inhalt */}
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-violet-soft/70">
                  {bookStatusLabel[book.status]}
                  <span aria-hidden className="text-gold/30">
                    •
                  </span>
                  {book.format}
                </p>

                <h3 className="mt-4 font-serif text-2xl font-light leading-snug text-white sm:text-3xl">
                  {book.title}
                </h3>
                <p className="mt-1 text-base italic text-gold-soft/70">
                  {book.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-300/80 sm:text-base">
                  {book.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <BookBuyButton slug={book.slug} />
                  <Link
                    href={detailHref}
                    className="inline-flex items-center gap-2 text-sm text-gold/80 transition-transform duration-300 hover:translate-x-1"
                  >
                    Mehr erfahren <span aria-hidden>→</span>
                  </Link>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Der Kaufbereich wird vorbereitet.
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
