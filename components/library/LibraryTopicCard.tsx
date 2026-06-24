import { Card } from "@/components/ui/Card";
import type { LibraryTopic } from "@/lib/content/library";

/**
 * Karte für ein einzelnes Thema der Lichtbibliothek.
 *
 * Die Detailseite (`topic.href`) existiert in dieser Phase noch nicht – der
 * Status „geplant“ signalisiert dies, und „Thema öffnen“ ist daher bewusst
 * eine ruhige Platzhalter-Affordanz statt eines toten Links.
 */
export function LibraryTopicCard({
  topic,
  headingLevel: Heading = "h4",
}: {
  topic: LibraryTopic;
  /** Überschriftenebene je nach umgebender Heading-Hierarchie. */
  headingLevel?: "h3" | "h4";
}) {
  return (
    <Card glow="violet" className="p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-violet-soft/70">
          {topic.category}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
          {topic.status}
        </span>
      </div>

      <Heading className="mt-4 font-serif text-xl font-light leading-snug text-white">
        {topic.title}
      </Heading>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300/75">
        {topic.excerpt}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold/60">
        Thema öffnen
        <span aria-hidden>→</span>
        <span className="sr-only">(in Vorbereitung)</span>
      </span>
    </Card>
  );
}
