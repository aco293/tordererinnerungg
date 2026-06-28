import type { Metadata } from "next";
import { LibraryHero } from "@/components/library/LibraryHero";
import { LibraryCategoryGrid } from "@/components/library/LibraryCategoryGrid";
import { LibraryFeaturedTopics } from "@/components/library/LibraryFeaturedTopics";
import { LibraryBooks } from "@/components/books/LibraryBooks";
import { libraryHero } from "@/lib/content/library";

export const metadata: Metadata = {
  title: "Lichtbibliothek",
  description: libraryHero.subtitle,
};

export default function LichtbibliothekPage() {
  return (
    <>
      <LibraryHero />
      {/* Geschriebene Tore – die Bücher als zentrales Highlight */}
      <LibraryBooks />
      {/* Wissensräume der Lichtbibliothek (bestehende Inhalte) */}
      <LibraryCategoryGrid />
      <LibraryFeaturedTopics />
    </>
  );
}
