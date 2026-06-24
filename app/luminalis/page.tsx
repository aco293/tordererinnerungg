import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { luminalisIntro, luminalisModules } from "@/lib/content/luminalis";

export const metadata: Metadata = {
  title: "Luminalis",
  description: luminalisIntro.subtitle,
};

export default function LuminalisPage() {
  return (
    <PageShell
      eyebrow={luminalisIntro.eyebrow}
      title={luminalisIntro.title}
      intro={<p>{luminalisIntro.subtitle}</p>}
    >
      <Section className="pt-4">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-slate-300/85">
          {luminalisIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {luminalisModules.map((module) => (
            <li key={module.key}>
              <Card glow="violet">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-glow/30 text-lg text-violet-soft"
                  >
                    {module.symbol}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                    {module.status}
                  </span>
                </div>
                <h2 className="mt-5 font-serif text-xl font-light text-white">
                  {module.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300/75">
                  {module.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm leading-relaxed text-slate-400">
          Luminalis ist ein Versprechen an die Zukunft. Diese Übersicht wächst
          mit dem System – Schritt für Schritt, Schwelle für Schwelle.
        </p>
      </Section>
    </PageShell>
  );
}
