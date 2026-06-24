import type { Metadata } from "next";
import { LibraryHero } from "@/components/library/LibraryHero";
import { LibraryCategoryGrid } from "@/components/library/LibraryCategoryGrid";
import { LibraryFeaturedTopics } from "@/components/library/LibraryFeaturedTopics";
import { libraryHero } from "@/lib/content/library";

export const metadata: Metadata = {
  title: "Lichtbibliothek",
  description: libraryHero.subtitle,
};

export default function LichtbibliothekPage() {
  return (
    <>
      <LibraryHero />
      <LibraryCategoryGrid />
      <LibraryFeaturedTopics />
    </>
  );
}
