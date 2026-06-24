import Link from "next/link";
import type { ReactNode } from "react";

type GlowTone = "violet" | "gold" | "blue";

const glowRing: Record<GlowTone, string> = {
  violet: "hover:border-violet-glow/50 hover:shadow-glow",
  gold: "hover:border-gold/50 hover:shadow-glow-gold",
  blue: "hover:border-abyss-600 hover:shadow-[0_0_44px_-12px_rgba(26,36,85,0.9)]",
};

type CardProps = {
  children: ReactNode;
  href?: string;
  glow?: GlowTone;
  className?: string;
};

export function Card({ children, href, glow = "violet", className = "" }: CardProps) {
  const classes = `group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 ${glowRing[glow]} hover:-translate-y-1 ${className}`;

  const aura = (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-glow/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
    />
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {aura}
        {children}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {aura}
      {children}
    </div>
  );
}
