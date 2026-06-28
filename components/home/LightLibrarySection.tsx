import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookCard } from "@/components/books/BookCard";
import { books } from "@/lib/content/books";

/**
 * Homepage-Section „Die Lichtbibliothek" – stellt die geschriebenen Werke als
 * geschriebene Tore vor und führt zur ausführlichen Lichtbibliothek-Seite.
 */
export function LightLibrarySection() {
  return (
    <Section id="lichtbibliothek" aria-labelledby="library-books-title">
      <SectionHeading
        eyebrow="Geschriebene Tore"
        title="Die Lichtbibliothek"
        id="library-books-title"
      >
        <p>
          Hier findest du Werke, die nicht nur gelesen werden wollen. Sie sind
          Räume in Wortform – geschrieben, um Erinnerung, Bewusstsein und innere
          Rückverbindung zu öffnen.
        </p>
      </SectionHeading>

      <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <li key={book.slug} className="h-full">
            <BookCard book={book} />
          </li>
        ))}
      </ul>

      <div className="mt-14 flex justify-center">
        <Button href="/lichtbibliothek" variant="secondary">
          Lichtbibliothek betreten
        </Button>
      </div>
    </Section>
  );
}
