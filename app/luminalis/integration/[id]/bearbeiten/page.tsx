import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { EditIntegrationForm } from "@/components/luminalis/integrations/EditIntegrationForm";
import { getLuminalisIntegrationById } from "@/lib/luminalis/integrations";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { updateIntegrationAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integration bearbeiten",
  description: "Bearbeite eine deiner Integrationen.",
};

export default async function EditIntegrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const integration = await getLuminalisIntegrationById(user.id, id);
  if (!integration) {
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
            Integration bearbeiten
          </h1>
        </div>

        <div className="mt-10">
          <EditIntegrationForm
            action={updateIntegrationAction}
            integration={integration}
          />
        </div>

        <div className="mt-8 text-center">
          <Button
            href={`/luminalis/integration/${integration.id}`}
            variant="ghost"
          >
            Abbrechen
          </Button>
        </div>
      </div>
    </Section>
  );
}
