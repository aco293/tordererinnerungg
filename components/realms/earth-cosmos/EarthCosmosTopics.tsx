import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryTopicCard } from "@/components/library/LibraryTopicCard";
import { earthCosmosTopics } from "@/lib/content/earthCosmos";

export function EarthCosmosTopics() {
  return (
    <Section aria-labelledby="earth-cosmos-topics-title">
      <SectionHeading
        eyebrow="Themenbereich"
        title="Themen dieses Raums"
        id="earth-cosmos-topics-title"
      >
        <p>
          Erste Themen, die Erde und Kosmos aus verschiedenen Richtungen
          betrachten – sie wachsen mit der Zeit zu vertiefenden Texten heran.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {earthCosmosTopics.map((topic) => (
          <li key={topic.title}>
            <LibraryTopicCard topic={topic} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
