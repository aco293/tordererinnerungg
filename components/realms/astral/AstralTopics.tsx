import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryTopicCard } from "@/components/library/LibraryTopicCard";
import { astralTopics } from "@/lib/content/astral";

export function AstralTopics() {
  return (
    <Section aria-labelledby="astral-topics-title">
      <SectionHeading
        eyebrow="Themenbereich"
        title="Themen dieses Raums"
        id="astral-topics-title"
      >
        <p>
          Erste Themen, die Traum, Schlaf und innere Erfahrung offen betrachten
          – sie wachsen mit der Zeit zu vertiefenden Texten heran.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {astralTopics.map((topic) => (
          <li key={topic.title}>
            <LibraryTopicCard topic={topic} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
