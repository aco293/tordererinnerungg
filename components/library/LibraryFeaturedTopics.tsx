import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryTopicCard } from "@/components/library/LibraryTopicCard";
import { cycleMeta, cycleOrder, topicsByCycle } from "@/lib/content/library";

/**
 * Die ersten 20 Themen, gruppiert nach Zyklus (Grundlagen, Erinnerung,
 * Erweiterte Räume). Jeder Zyklus bildet eine eigene, ruhig abgesetzte Gruppe.
 */
export function LibraryFeaturedTopics() {
  return (
    <Section aria-labelledby="library-topics-title">
      <SectionHeading
        eyebrow="Erste Themen"
        title="Wege durch die Bibliothek"
        id="library-topics-title"
      >
        <p>
          Zwanzig erste Themen, in drei Zyklen geordnet – ein behutsamer Anfang,
          der mit der Zeit wächst.
        </p>
      </SectionHeading>

      <div className="mt-20 space-y-20">
        {cycleOrder.map((cycle) => {
          const meta = cycleMeta[cycle];
          const topics = topicsByCycle(cycle);
          const headingId = `cycle-${cycle.replace(/\s+/g, "-").toLowerCase()}`;

          return (
            <section key={cycle} aria-labelledby={headingId}>
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
                  {meta.eyebrow}
                </p>
                <h3
                  id={headingId}
                  className="mt-3 font-serif text-2xl font-light text-white sm:text-3xl"
                >
                  {cycle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400/85">
                  {meta.note}
                </p>
              </div>

              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <LibraryTopicCard topic={topic} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
