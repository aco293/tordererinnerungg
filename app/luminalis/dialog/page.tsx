import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DialogEntryForm } from "@/components/luminalis/dialog/DialogEntryForm";
import { DialogShell } from "@/components/luminalis/dialog/DialogShell";
import { RecentEntries } from "@/components/luminalis/dialog/RecentEntries";
import { getRecentLuminalisEntries } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { createDialogEntry } from "./actions";

export const metadata: Metadata = {
  title: "Dialograum",
  description:
    "Ein ruhiger Raum, um wahrzunehmen, was gerade in dir präsent ist.",
};

const SUBTITLE =
  "Ein ruhiger Raum, um wahrzunehmen, was gerade in dir präsent ist.";
const INTRO =
  "Luminalis antwortet hier noch nicht als KI. Dieser Raum sammelt deine eigenen Worte, damit Verbindung, Erinnerung und Resonanz mit der Zeit sichtbar werden können.";

export default async function DialogPage() {
  // Ohne Supabase-Konfiguration: ruhige Hinweisseite, kein Crash.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <DialogShell title="Dialograum" subtitle={SUBTITLE} intro={INTRO}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </DialogShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const entries = await getRecentLuminalisEntries(user.id, 10);

  return (
    <DialogShell title="Dialograum" subtitle={SUBTITLE} intro={INTRO}>
      <DialogEntryForm action={createDialogEntry} />

      <div className="mt-16">
        <h2 className="font-serif text-2xl font-light text-white">
          Letzte Weg-Einträge
        </h2>
        <div className="mt-6">
          <RecentEntries entries={entries} />
        </div>
      </div>
    </DialogShell>
  );
}
