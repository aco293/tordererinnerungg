"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

type AuthStatusProps = {
  variant?: "desktop" | "mobile";
};

/**
 * Leichte clientseitige Anzeige des Login-Status im Header.
 *
 * Vermeidet Server-Auth im Header: Der Supabase-Client wird ausschließlich im
 * Effekt instanziiert, damit Build/SSR ohne Secrets funktionieren. Ist Supabase
 * nicht konfiguriert, fällt die Anzeige still auf „Anmelden" zurück.
 */
export function AuthStatus({ variant = "desktop" }: AuthStatusProps) {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setLoggedIn(Boolean(data.user));
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(Boolean(session?.user));
      },
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const href = loggedIn ? "/konto" : "/anmelden";
  const label = loggedIn ? "Konto" : "Anmelden";
  const isActive = pathname.startsWith(href);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className="mt-2 block rounded-lg border border-gold/30 px-3 py-3 text-center text-base text-gold-soft transition-colors hover:bg-gold/10"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold-soft transition-colors duration-300 hover:bg-gold/10 hover:text-gold"
    >
      {label}
    </Link>
  );
}
