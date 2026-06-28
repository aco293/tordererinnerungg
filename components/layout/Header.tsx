"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";
import { AuthStatus } from "@/components/auth/AuthStatus";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menü bei Navigationswechsel schließen.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-abyss/60 backdrop-blur-xl">
      {/* Feine goldene Lichtlinie am unteren Rand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} – zur Startseite`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-glow-gold"
            >
              ✦
            </span>
          </span>
          <span className="font-serif text-lg tracking-wide text-white">
            {site.name}
          </span>
        </Link>

        {/* Desktop-Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Hauptnavigation">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive(item.href)
                        ? "text-gold-soft"
                        : "text-slate-300/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span
                        aria-hidden
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <AuthStatus />
        </div>

        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] text-gold-soft transition-colors duration-300 hover:border-gold/50 md:hidden"
        >
          <span aria-hidden className="text-lg">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile-Navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Hauptnavigation mobil"
          className="animate-fade-in-fast px-6 pb-4 sm:px-8 md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 rounded-2xl border border-white/10 bg-abyss-900/95 p-3 shadow-glow backdrop-blur-xl">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                    isActive(item.href)
                      ? "border border-gold/30 bg-gold/[0.06] text-gold-soft"
                      : "text-slate-200/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-gold/40">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-white/10 pt-2">
              <AuthStatus variant="mobile" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
