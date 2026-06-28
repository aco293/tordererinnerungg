/**
 * Supabase-Client für den Server (Server Components, Route Handler, Actions).
 *
 * Liest und schreibt die Session über die Next.js-Cookies. Der Aufruf von
 * `cookies()` markiert die nutzende Seite automatisch als dynamisch.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aufruf aus einer Server Component: kann ignoriert werden, da die
            // Middleware die Session ohnehin aktualisiert.
          }
        },
      },
    },
  );
}
