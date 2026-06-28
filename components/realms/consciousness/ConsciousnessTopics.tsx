import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryTopicCard } from "@/components/library/LibraryTopicCard";
import { consciousnessTopics } from "@/lib/content/consciousness";
import { toTopicCard } from "@/lib/content/library";

export function ConsciousnessTopics() {
  return (
    <Section aria-labelledby="consciousness-topics-title">
      <SectionHeading
        eyebrow="Themenbereich"
        title="Themen dieses Raums"
        id="consciousness-topics-title"
      >
        <p>
          Erste Themen, die sich dem Bewusstsein aus verschiedenen Richtungen
          nähern – sie wachsen mit der Zeit zu vertiefenden Texten heran.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {consciousnessTopics.map((topic) => (
          <li key={topic.id}>
            <LibraryTopicCard topic={toTopicCard(topic)} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
