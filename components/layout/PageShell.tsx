import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

/**
 * Einheitlicher Rahmen für Inhaltsseiten (alle außer der Startseite):
 * ruhiger Seitenkopf mit Überschrift und optionaler Einleitung,
 * darunter der Seiteninhalt.
 */
export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <>
      <Section className="pb-10 pt-20 sm:pt-28" aria-labelledby="page-title">
        <div className="animate-fade-up">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            align="center"
            as="h1"
            id="page-title"
          >
            {intro}
          </SectionHeading>
        </div>
      </Section>
      <div className="animate-fade-in">{children}</div>
    </>
  );
}
