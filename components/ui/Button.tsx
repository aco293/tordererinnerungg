import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type Variant = "primary" | "secondary" | "ghost";

/** Gemeinsame Basis-/Varianten-Klassen, damit auch echte <button>-Elemente
 *  (z. B. Overlay-Trigger) exakt wie dieser Link-Button aussehen können. */
export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-abyss";

export const buttonVariants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet-glow to-violet-deep text-white shadow-glow hover:shadow-[0_0_56px_-8px_rgba(124,92,255,0.7)] hover:-translate-y-0.5",
  secondary:
    "border border-gold/40 bg-gold/5 text-gold-soft hover:border-gold/70 hover:bg-gold/10 hover:shadow-glow-gold hover:-translate-y-0.5",
  ghost:
    "text-violet-soft/80 hover:text-violet-soft hover:bg-white/5",
};

type ButtonAsLink = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
