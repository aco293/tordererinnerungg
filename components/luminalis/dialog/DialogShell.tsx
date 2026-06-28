import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";

type DialogShellProps = {
  title: string;
  subtitle: string;
  intro?: string;
  children: ReactNode;
};

/** Ruhiger Rahmen für den Dialograum in der Designsprache des Projekts. */
export function DialogShell({
  title,
  subtitle,
  intro,
  children,
}: DialogShellProps) {
  return (
    <Section className="pt-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-deep/25 blur-[130px]"
      />
      <div className="mx-auto max-w-3xl animate-fade-up">
        <LuminalisSubnav />

        <div className="mt-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            Luminalis
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300/85">
            {subtitle}
          </p>
          {intro && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400/85">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </Section>
  );
}
