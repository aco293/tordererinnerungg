import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

/**
 * Ruhiger Rahmen für die Auth-Seiten: kosmischer Hintergrund (global),
 * weiche Aura und eine zentrierte Schwellen-Karte in der Designsprache
 * von TorDerErinnerung.
 */
export function AuthShell({ eyebrow, title, subtitle, children }: AuthShellProps) {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]"
      />

      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate-300/80">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glow backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Geteilte Feld-Stile, damit Login und Registrierung identisch wirken. */
export const authFieldClass =
  "w-full rounded-xl border border-white/10 bg-abyss-800/60 px-4 py-3 text-base text-white placeholder:text-slate-500 transition-colors focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-violet-soft/40";

export const authLabelClass =
  "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400";
