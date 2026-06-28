/**
 * Kontext-Paket für die Luminalis-Frequenzintelligenz.
 *
 * Lädt serverseitig die eigenen Daten des Nutzers (über RLS geschützt, kein
 * Service-Role-Key) und verdichtet sie zu einem kompakten, gekürzten
 * Kontext-Paket. Es wird bewusst nicht alles ungefiltert in den KI-Prompt
 * gegeben: Texte werden begrenzt, lange Inhalte gekürzt, Fehlendes neutral
 * behandelt. `sourceSummary` macht transparent, welche Datenbereiche genutzt
 * wurden.
 */

import { getRecentLuminalisEntries } from "@/lib/luminalis/entries";
import { getRecentLuminalisInsights } from "@/lib/luminalis/insights";
import { getRecentLuminalisIntegrations } from "@/lib/luminalis/integrations";
import { integrationStatusLabel } from "@/lib/luminalis/integrationStatus";
import { getLuminalisProfile } from "@/lib/luminalis/profile";
import { getResonanceOverview } from "@/lib/luminalis/resonance";

export type LuminalisContextPack = {
  profileSummary: string;
  recentEntriesSummary: string;
  insightsSummary: string;
  integrationsSummary: string;
  resonanceSummary: string;
  sourceSummary: string;
};

/** Text behutsam kürzen, damit der Prompt kompakt bleibt. */
function shorten(value: string | null | undefined, max = 180): string {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trimEnd()} …` : text;
}

export async function buildLuminalisContext(
  userId: string,
): Promise<LuminalisContextPack> {
  const [profile, entries, insights, integrations, resonance] =
    await Promise.all([
      getLuminalisProfile(userId),
      getRecentLuminalisEntries(userId, 10),
      getRecentLuminalisInsights(userId, 10),
      getRecentLuminalisIntegrations(userId, 10),
      getResonanceOverview(userId),
    ]);

  // Profil
  const profileLines: string[] = [];
  if (profile?.guiding_question?.trim()) {
    profileLines.push(`Leitfrage: ${shorten(profile.guiding_question, 160)}`);
  }
  if (profile?.current_focus?.trim()) {
    profileLines.push(`Aktueller Fokus: ${shorten(profile.current_focus, 160)}`);
  }
  if (profile?.selected_pillars?.length) {
    profileLines.push(`Gewählte Säulen: ${profile.selected_pillars.join(", ")}`);
  }
  if (profile?.resonance_topics?.length) {
    profileLines.push(
      `Resonanzthemen: ${profile.resonance_topics.slice(0, 8).join(", ")}`,
    );
  }
  const profileSummary = profileLines.length
    ? profileLines.join("\n")
    : "Noch keine Ausrichtung hinterlegt.";

  // Weg-Einträge (gekürzt)
  const recentEntriesSummary = entries.length
    ? entries
        .slice(0, 10)
        .map((entry) => {
          const title = entry.title?.trim() || "Eintrag";
          const pillar = entry.pillar?.trim() ? ` [${entry.pillar.trim()}]` : "";
          return `- ${title}${pillar}: ${shorten(entry.content, 160)}`;
        })
        .join("\n")
    : "Noch keine Weg-Einträge vorhanden.";

  // Erkenntnisse, markierte zuerst
  const pinned = insights.filter((insight) => insight.pinned);
  const insightLines = insights.slice(0, 10).map((insight) => {
    const title = insight.title?.trim() || "Erkenntnis";
    const mark = insight.pinned ? "★ " : "";
    return `- ${mark}${title}: ${shorten(insight.insight, 160)}`;
  });
  const insightsSummary = insights.length
    ? `${pinned.length} markiert von ${insights.length} jüngsten.\n${insightLines.join("\n")}`
    : "Noch keine Erkenntnisse vorhanden.";

  // Integrationen, offene/in Bewegung hervorheben
  const active = integrations.filter(
    (integration) =>
      integration.status === "open" || integration.status === "in_motion",
  );
  const integrationLines = integrations.slice(0, 10).map((integration) => {
    const title = integration.title?.trim() || "Integration";
    const status = integrationStatusLabel(integration.status);
    return `- ${title} (${status}): ${shorten(integration.intention, 140)}`;
  });
  const integrationsSummary = integrations.length
    ? `${active.length} offen/in Bewegung von ${integrations.length} jüngsten.\n${integrationLines.join("\n")}`
    : "Noch keine Integrationen vorhanden.";

  // Frequenzspiegel (reine Muster aus eigenen Einträgen)
  const resonanceLines: string[] = [];
  resonanceLines.push(`Einträge insgesamt: ${resonance.totalEntries}`);
  if (resonance.activePillar) {
    resonanceLines.push(`Häufigste Säule: ${resonance.activePillar}`);
  }
  if (resonance.activeMode) {
    resonanceLines.push(`Häufigster Modus: ${resonance.activeMode}`);
  }
  if (resonance.topTopics.length) {
    resonanceLines.push(`Häufige Themen: ${resonance.topTopics.join(", ")}`);
  }
  const resonanceSummary = resonanceLines.join("\n");

  // Transparente Quellenangabe
  const sourceParts = [
    profile ? "Luminalis-Profil" : null,
    `${entries.length} Weg-Einträge`,
    `${insights.length} Erkenntnisse`,
    `${integrations.length} Integrationen`,
    "Frequenzspiegel",
  ].filter(Boolean);
  const sourceSummary = `Genutzter Kontext: ${sourceParts.join(", ")}.`;

  return {
    profileSummary,
    recentEntriesSummary,
    insightsSummary,
    integrationsSummary,
    resonanceSummary,
    sourceSummary,
  };
}

/** Kontext-Paket zu einem kompakten Textblock für den Prompt verbinden. */
export function contextPackToText(pack: LuminalisContextPack): string {
  return [
    `Profil:\n${pack.profileSummary}`,
    `Weg-Einträge:\n${pack.recentEntriesSummary}`,
    `Erkenntnisse:\n${pack.insightsSummary}`,
    `Integrationen:\n${pack.integrationsSummary}`,
    `Frequenzspiegel:\n${pack.resonanceSummary}`,
    pack.sourceSummary,
  ].join("\n\n");
}

/** Grobe Einschätzung, ob genug Material für einen stabilen Spiegel vorliegt. */
export function hasEnoughContext(pack: LuminalisContextPack): boolean {
  // Mindestens etwas Substanz aus Einträgen, Erkenntnissen oder Integrationen.
  const empty =
    pack.recentEntriesSummary.startsWith("Noch keine") &&
    pack.insightsSummary.startsWith("Noch keine") &&
    pack.integrationsSummary.startsWith("Noch keine");
  return !empty;
}
