import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js 16 Proxy (ehemals Middleware). Frischt die Supabase-Session auf und
 * schützt die Luminalis-Routen. Die Logik liegt in lib/supabase/middleware.ts.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Auf alle Pfade anwenden – außer statischen Assets und Bildern.
     * So bleibt die Session überall aktuell, während Dateien unberührt bleiben.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
