import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { EditInsightForm } from "@/components/luminalis/insights/EditInsightForm";
import { getLuminalisInsightById } from "@/lib/luminalis/insights";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { updateInsightAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Erkenntnis bearbeiten",
  description: "Bearbeite eine deiner Erkenntnisse.",
};

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const insight = await getLuminalisInsightById(user.id, id);
  if (!insight) {
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
            Erkenntnis bearbeiten
          </h1>
        </div>

        <div className="mt-10">
          <EditInsightForm action={updateInsightAction} insight={insight} />
        </div>

        <div className="mt-8 text-center">
          <Button href={`/luminalis/erkenntnisse/${insight.id}`} variant="ghost">
            Abbrechen
          </Button>
        </div>
      </div>
    </Section>
  );
}
