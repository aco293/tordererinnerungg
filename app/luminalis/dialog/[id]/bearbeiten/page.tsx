import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { EditEntryForm } from "@/components/luminalis/dialog/EditEntryForm";
import { getLuminalisEntryById } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { updateEntryAction } from "./actions";

export const metadata: Metadata = {
  title: "Eintrag bearbeiten",
  description: "Bearbeite einen deiner Weg-Einträge.",
};

export const dynamic = "force-dynamic";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const entry = await getLuminalisEntryById(user.id, id);
  if (!entry) {
    notFound();
  }

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <LuminalisSubnav />

        <div className="mt-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            Luminalis
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            Eintrag bearbeiten
          </h1>
        </div>

        <div className="mt-10">
          <EditEntryForm action={updateEntryAction} entry={entry} />
        </div>

        <div className="mt-8 text-center">
          <Button href={`/luminalis/dialog/${entry.id}`} variant="ghost">
            Abbrechen
          </Button>
        </div>
      </div>
    </Section>
  );
}
