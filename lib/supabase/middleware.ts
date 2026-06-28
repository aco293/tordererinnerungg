/**
 * Session-Auffrischung und Routen-Schutz für die Middleware.
 *
 * Folgt dem empfohlenen @supabase/ssr-Muster für den Next.js App Router:
 * Die Session wird bei jedem Request aktualisiert, und geschützte Routen
 * leiten nicht eingeloggte Nutzer zu /anmelden weiter.
 *
 * Schutzklausel: Sind die Supabase-Variablen nicht gesetzt, bleibt die
 * öffentliche Seite unangetastet (kein Crash, keine Weiterleitung).
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Routen, die nur eingeloggten Nutzern offenstehen. */
export const PROTECTED_PREFIXES = [
  "/konto",
  "/luminalis/mein-weg",
  "/luminalis/onboarding",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Solange Supabase nicht konfiguriert ist, läuft die öffentliche Seite
  // unverändert weiter.
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // WICHTIG: getUser() direkt nach createServerClient aufrufen – kein Code
  // dazwischen, damit die Session zuverlässig aufgefrischt wird.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && isProtectedPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/anmelden";
    url.searchParams.set("weiter", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
