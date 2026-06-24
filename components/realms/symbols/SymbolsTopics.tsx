import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryTopicCard } from "@/components/library/LibraryTopicCard";
import { symbolsTopics } from "@/lib/content/symbols";

export function SymbolsTopics() {
  return (
    <Section aria-labelledby="symbols-topics-title">
      <SectionHeading
        eyebrow="Themenbereich"
        title="Themen dieses Raums"
        id="symbols-topics-title"
      >
        <p>
          Erste Themen, die sich der Sprache der Symbole aus verschiedenen
          Richtungen nähern – sie wachsen mit der Zeit zu vertiefenden Texten
          heran.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {symbolsTopics.map((topic) => (
          <li key={topic.title}>
            <LibraryTopicCard topic={topic} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
