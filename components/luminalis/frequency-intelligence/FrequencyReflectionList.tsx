import { FrequencyReflectionCard } from "@/components/luminalis/frequency-intelligence/FrequencyReflectionCard";
import { FrequencyIntelligenceEmptyState } from "@/components/luminalis/frequency-intelligence/FrequencyIntelligenceEmptyState";
import type { FrequencyReflection } from "@/lib/luminalis/ai/frequencyIntelligence";

export function FrequencyReflectionList({
  reflections,
}: {
  reflections: FrequencyReflection[];
}) {
  if (reflections.length === 0) {
    return <FrequencyIntelligenceEmptyState />;
  }

  return (
    <ul className="space-y-6">
      {reflections.map((reflection) => (
        <li key={reflection.id}>
          <FrequencyReflectionCard reflection={reflection} />
        </li>
      ))}
    </ul>
  );
}
