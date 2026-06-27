import { Card } from "@/components/ui/Card";

/**
 * Minimale Datenform für eine Themenkarte. Bewusst strukturell (nicht an
 * `LibraryTopic` gebunden), damit auch Raum-Themen mit eigenem Status
 * (z. B. „In Vorbereitung“) dieselbe Karte wiederverwenden können.
 */
export type TopicCardData = {
  title: string;
  category: string;
  excerpt: string;
  status: string;
  /** Ziel der Detailseite – nur bei veröffentlichten Themen verlinkt. */
  href?: string;
};

/** Ein Thema gilt als lesbar, sobald es veröffentlicht ist und ein Ziel hat. */
function isPublished(topic: TopicCardData): boolean {
  return topic.status.trim().toLowerCase().startsWith("ver") && Boolean(topic.href);
}

/**
 * Karte für ein einzelnes Thema (Lichtbibliothek und Raum-Themen).
 *
 * Veröffentlichte Themen werden zur ganzflächigen Karten-Verlinkung auf ihre
 * Artikelseite. Geplante Themen besitzen noch keine Detailseite – der Status
 * signalisiert dies, und „Thema öffnen“ bleibt eine ruhige Platzhalter-
 * Affordanz statt eines toten Links.
 */
export function LibraryTopicCard({
  topic,
  headingLevel: Heading = "h4",
}: {
  topic: TopicCardData;
  /** Überschriftenebene je nach umgebender Heading-Hierarchie. */
  headingLevel?: "h3" | "h4";
}) {
  const published = isPublished(topic);

  return (
    <Card
      glow="violet"
      className="p-6"
      href={published ? topic.href : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-soft/70">
          {topic.category}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] ${
            published
              ? "border-gold/30 text-gold/80"
              : "border-white/10 text-slate-400"
          }`}
        >
          {topic.status}
        </span>
      </div>

      <Heading className="mt-4 font-serif text-xl font-light leading-snug text-white">
        {topic.title}
      </Heading>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/75">
        {topic.excerpt}
      </p>

      {published ? (
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold transition-colors group-hover:text-gold-soft">
          Thema öffnen
          <span aria-hidden>→</span>
        </span>
      ) : (
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/60">
          Thema öffnen
          <span aria-hidden>→</span>
          <span className="sr-only">(in Vorbereitung)</span>
        </span>
      )}
    </Card>
  );
}
