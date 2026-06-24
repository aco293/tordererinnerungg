import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { getRealm, realms } from "@/lib/content/realms";

type Params = { slug: string };

// Räume mit eigener, vollständig gestalteter Route. Diese werden hier nicht
// generiert, da ihre statische Route Vorrang vor der dynamischen [slug] hat.
const CUSTOM_REALM_ROUTES = new Set<string>([
  "bewusstsein",
  "frequenz",
  "symbole",
  "erde-kosmos",
  "astralreisen",
]);

// Erzeugt die übrigen Raumseiten statisch (frequenz, erde-kosmos, …).
export function generateStaticParams(): Params[] {
  return realms
    .filter((realm) => !CUSTOM_REALM_ROUTES.has(realm.slug))
    .map((realm) => ({ slug: realm.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realm = getRealm(slug);
  if (!realm) return {};
  return {
    title: realm.title,
    description: realm.description,
  };
}

export default async function RealmPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const realm = getRealm(slug);

  if (!realm) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={realm.tagline}
      title={realm.title}
      intro={<p>{realm.description}</p>}
    >
      <Section className="pt-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 flex justify-center">
            <span
              aria-hidden
              className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold shadow-glow-gold animate-float"
            >
              {realm.symbol}
            </span>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-slate-300/85">
            {realm.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
              Themen dieses Raums
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {realm.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200/80"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-relaxed text-slate-400">
            Dieser Raum wächst. Vertiefende Texte, Klangformeln und Übungen
            werden hier mit der Zeit Form annehmen.
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/raeume"
              className="inline-flex items-center gap-2 text-sm text-violet-soft/80 transition-colors hover:text-violet-soft"
            >
              <span aria-hidden>←</span> Zurück zu allen Räumen
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
