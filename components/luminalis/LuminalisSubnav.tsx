"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Mein Weg", href: "/luminalis/mein-weg" },
  { label: "Dialograum", href: "/luminalis/dialog" },
  { label: "Erkenntnisse", href: "/luminalis/erkenntnisse" },
  { label: "Integration", href: "/luminalis/integration" },
  { label: "Frequenzspiegel", href: "/luminalis/frequenzspiegel" },
  { label: "Frequenzintelligenz", href: "/luminalis/frequenzintelligenz" },
  { label: "KI-Dialog", href: "/luminalis/chat" },
  { label: "Ausrichtung bearbeiten", href: "/luminalis/onboarding" },
];

/** Interne Navigation innerhalb des geschützten Luminalis-Bereichs. */
export function LuminalisSubnav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Luminalis-Navigation">
      <ul className="flex flex-wrap justify-center gap-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  active
                    ? "border-gold/40 bg-gold/5 text-gold-soft"
                    : "border-white/10 text-slate-300/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
