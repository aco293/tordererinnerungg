import type { Metadata } from "next";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Section } from "@/components/ui/Section";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Setup-Check",
  description: "Statusübersicht zur Einrichtung des persönlichen Bereichs.",
};

type Check = { label: string; ok: boolean };

async function isTableReachable(
  supabase: SupabaseClient,
  table: string,
): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .select("*", { head: true, count: "exact" })
    .limit(1);
  return !error;
}

export default async function SetupCheckPage() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const configured = hasUrl && hasKey;

  // KI-Konfiguration: nur Ja/Nein – niemals Schlüssel oder Werte anzeigen.
  const aiEnabled = process.env.AI_ENABLED === "true";
  const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY);
  const hasOpenAiModel = Boolean(process.env.OPENAI_MODEL);

  let userPresent = false;
  let profilesOk = false;
  let luminalisProfilesOk = false;
  let entriesOk = false;
  let insightsOk = false;
  let integrationsOk = false;
  let chatSessionsOk = false;
  let chatMessagesOk = false;
  let frequencyReflectionsOk = false;

  if (configured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userPresent = Boolean(user);

    [
      profilesOk,
      luminalisProfilesOk,
      entriesOk,
      insightsOk,
      integrationsOk,
      chatSessionsOk,
      chatMessagesOk,
      frequencyReflectionsOk,
    ] = await Promise.all([
      isTableReachable(supabase, "profiles"),
      isTableReachable(supabase, "luminalis_profiles"),
      isTableReachable(supabase, "luminalis_entries"),
      isTableReachable(supabase, "luminalis_insights"),
      isTableReachable(supabase, "luminalis_integrations"),
      isTableReachable(supabase, "luminalis_chat_sessions"),
      isTableReachable(supabase, "luminalis_chat_messages"),
      isTableReachable(supabase, "luminalis_frequency_reflections"),
    ]);
  }

  const checks: Check[] = [
    { label: "Supabase URL gesetzt", ok: hasUrl },
    { label: "Supabase Anon Key gesetzt", ok: hasKey },
    { label: "Aktueller User vorhanden", ok: userPresent },
    { label: "Tabelle profiles erreichbar", ok: profilesOk },
    { label: "Tabelle luminalis_profiles erreichbar", ok: luminalisProfilesOk },
    { label: "Tabelle luminalis_entries erreichbar", ok: entriesOk },
    { label: "Tabelle luminalis_insights erreichbar", ok: insightsOk },
    { label: "Tabelle luminalis_integrations erreichbar", ok: integrationsOk },
    { label: "AI_ENABLED true", ok: aiEnabled },
    { label: "OPENAI_API_KEY gesetzt", ok: hasOpenAiKey },
    { label: "OPENAI_MODEL gesetzt", ok: hasOpenAiModel },
    {
      label: "Tabelle luminalis_chat_sessions erreichbar",
      ok: chatSessionsOk,
    },
    {
      label: "Tabelle luminalis_chat_messages erreichbar",
      ok: chatMessagesOk,
    },
    {
      label: "Tabelle luminalis_frequency_reflections erreichbar",
      ok: frequencyReflectionsOk,
    },
  ];

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          Einrichtung
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
          Setup-Check
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-300/80">
          Eine schlichte Statusübersicht zur Einrichtung des persönlichen
          Bereichs. Es werden keine Schlüssel oder Inhalte angezeigt – nur
          „Ja" oder „Nein".
        </p>

        {!configured && (
          <p className="mt-6 rounded-xl border border-gold/20 bg-gold/[0.05] px-4 py-3 text-sm leading-relaxed text-gold-soft">
            Die Supabase-Umgebungsvariablen fehlen noch. Sobald sie gesetzt sind,
            zeigt diese Seite den vollständigen Status.
          </p>
        )}

        <ul className="mt-10 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {checks.map((check) => (
            <li
              key={check.label}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <span className="text-sm text-slate-200">{check.label}</span>
              <span
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                  check.ok
                    ? "border-gold/30 text-gold-soft"
                    : "border-white/10 text-slate-400"
                }`}
              >
                {check.ok ? "Ja" : "Nein"}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          Hinweis: „Aktueller User vorhanden" ist nur dann „Ja", wenn du
          eingeloggt bist. Die Tabellen-Prüfungen gelingen, sobald die
          Migrationen ausgeführt wurden und eine gültige Session besteht.
        </p>
      </div>
    </Section>
  );
}
