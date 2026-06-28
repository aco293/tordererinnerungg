import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

type OnboardingShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

/**
 * Ruhiger Rahmen für das Luminalis-Onboarding in der Designsprache des Projekts.
 */
export function OnboardingShell({
  title,
  subtitle,
  children,
}: OnboardingShellProps) {
  return (
    <Section className="pt-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-deep/25 blur-[130px]"
      />
      <div className="mx-auto max-w-2xl animate-fade-up">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            Luminalis
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300/85">
            {subtitle}
          </p>
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </Section>
  );
}
