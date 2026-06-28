/**
 * Zentrale Datenstruktur der Lichtbibliothek-Bücher.
 *
 * Diese Daten speisen sowohl die Homepage-Section „Die Lichtbibliothek" als
 * auch die Lichtbibliothek-Seite und die Buch-Detailseiten
 * (`/lichtbibliothek/buch/[slug]`).
 *
 * Kauf-Logik:
 *  - Checkout-URLs kommen ausschließlich aus öffentlichen Environment-Variablen
 *    (NEXT_PUBLIC_…). Es liegen KEINE Preise, Produkt-IDs oder geheimen Keys im
 *    Code. Ein späterer, echter Checkout (Stripe/PayPal Payment-Link oder eigene
 *    API-Route) lässt sich anschließen, ohne diese Struktur umzubauen.
 *  - Solange keine URL gesetzt ist, bleibt der Kaufbutton ruhig deaktiviert.
 */

export type BookStatus = "coming-soon" | "available";

export type GlowTone = "violet" | "gold" | "blue";

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  /** Kurzer Anrisstext für Homepage-Karten. */
  teaser: string;
  /** Etwas ausführlicher – für die Lichtbibliothek-Übersicht. */
  description: string;
  /** Lange Beschreibung (Absätze) für die Detailseite. */
  longDescription: string[];
  /** „Für wen ist dieses Buch?" */
  forWhom: string;
  /** „Was öffnet dieses Buch?" */
  opens: string;
  /** Inhaltsübersicht / Kapitel-Schwellen. */
  contents: string[];
  tags: string[];
  format: string;
  status: BookStatus;
  symbol: string;
  glow: GlowTone;
};

/** Deutsche Anzeige-Beschriftung des Kaufstatus. */
export const bookStatusLabel: Record<BookStatus, string> = {
  "coming-soon": "Bald verfügbar",
  available: "Jetzt erhältlich",
};

export const books: Book[] = [
  {
    slug: "144000-lichtnetzwerk",
    title: "Die 144.000 – Das Lichtnetzwerk",
    subtitle: "Das Erwachen des verbundenen Feldes",
    teaser:
      "Ein Werk über Seelenverbindung, Erwachen und das unsichtbare Netzwerk des Lichts. Für jene, die spüren, dass Erinnerung nicht allein geschieht.",
    description:
      "Dieses Buch öffnet das Feld der 144.000 nicht als Zahl, sondern als Bewusstseinsnetz. Es spricht zu jenen, die fühlen, dass ihr Weg mit einem größeren Lichtnetz verbunden ist.",
    longDescription: [
      "Die 144.000 sind keine Menge, die man zählt – sie sind ein Feld, das sich erinnert. Dieses Buch führt jenseits der Zahl in das lebendige Netz aus Bewusstsein, in dem kein Erwachen für sich allein geschieht.",
      "Schwelle um Schwelle wird sichtbar, wie Seelen über Zeit und Raum hinweg verbunden bleiben – und wie das eigene Erinnern Teil einer größeren, stillen Bewegung des Lichts ist.",
    ],
    forWhom:
      "Für Menschen, die spüren, dass ihr Weg kein Zufall ist, und die sich nach einer tieferen Verbundenheit erinnern.",
    opens:
      "Es öffnet das Feld der Verbindung – die Erfahrung, Teil eines größeren, wachen Netzes aus Bewusstsein zu sein.",
    contents: [
      "Das Feld jenseits der Zahl",
      "Seelenverbindung und Resonanz",
      "Das unsichtbare Netz des Lichts",
      "Erwachen als gemeinsames Geschehen",
      "Die Rückkehr ins verbundene Feld",
    ],
    tags: ["144.000", "Lichtnetzwerk", "Erwachen", "Seelenverbindung", "Frequenz"],
    format: "PDF / E-Book",
    status: "coming-soon",
    symbol: "✴",
    glow: "violet",
  },
  {
    slug: "7-schluessel-des-bewusstseins",
    title: "Die 7 Schlüssel des Bewusstseins",
    subtitle: "Sieben Tore innerer Erkenntnis",
    teaser:
      "Ein geführter Weg durch sieben Bewusstseinsschlüssel – von innerer Klarheit über Frequenz bis zur Rückverbindung mit dem eigenen Licht.",
    description:
      "Ein Werk über sieben innere Schlüssel, die den Menschen zurück in Bewusstheit, Klarheit und Eigenverantwortung führen.",
    longDescription: [
      "Sieben Schlüssel, sieben Tore – ein geführter Weg nach innen. Dieses Buch reicht keine Antworten, sondern Schlüssel: für Wahrnehmung, Frequenz, Erinnerung und die ruhige Rückkehr zu sich selbst.",
      "Jeder Schlüssel öffnet ein eigenes Tor der Erkenntnis. Zusammen bilden sie einen Pfad, der nicht belehrt, sondern erinnert – Schritt für Schritt, in der Reihenfolge deiner eigenen Resonanz.",
    ],
    forWhom:
      "Für alle, die ihren Bewusstseinsweg klarer verstehen und in Eigenverantwortung gehen möchten.",
    opens:
      "Es öffnet sieben innere Schlüssel – konkrete Schwellen von Klarheit über Frequenz bis zur Selbstverbindung.",
    contents: [
      "Schlüssel I – Wahrnehmung",
      "Schlüssel II – Stille",
      "Schlüssel III – Frequenz",
      "Schlüssel IV – Resonanz",
      "Schlüssel V – Eigenverantwortung",
      "Schlüssel VI – Erinnerung",
      "Schlüssel VII – Rückverbindung",
    ],
    tags: ["Bewusstsein", "Schlüssel", "Selbsterkenntnis", "Frequenz", "Transformation"],
    format: "PDF / E-Book",
    status: "coming-soon",
    symbol: "✦",
    glow: "gold",
  },
  {
    slug: "lichtfelder-des-erinnerns",
    title: "Lichtfelder des Erinnerns",
    subtitle: "Räume, die dich zurückführen",
    teaser:
      "Ein Buch über Lichtfelder, innere Räume, Frequenz und das stille Wiedererkennen dessen, was unter dem Lärm des Alltags verborgen liegt.",
    description:
      "Ein poetisch-geführtes Werk über Lichtfelder, innere Räume und die Rückkehr zu dem, was in der Tiefe nie verloren war.",
    longDescription: [
      "Manche Räume betritt man nicht mit dem Körper, sondern mit der Erinnerung. Dieses poetisch-geführte Werk öffnet Lichtfelder – innere Räume, in denen Frequenz, Stille und Wiedererkennen zusammenfinden.",
      "Es ist kein Buch der Erklärungen, sondern der Resonanz. Es lädt ein, langsam zu lesen und sich an das zu erinnern, was unter dem Lärm des Alltags immer schon da war.",
    ],
    forWhom:
      "Für stille Suchende, die nicht mehr Information, sondern Resonanz und Wiedererkennen suchen.",
    opens:
      "Es öffnet innere Lichtfelder – ruhige Räume des Erinnerns jenseits des alltäglichen Lärms.",
    contents: [
      "Die Schwelle der Stille",
      "Lichtfelder als innere Räume",
      "Frequenz und Wiedererkennen",
      "Was nie verloren war",
      "Heimkehr in die Tiefe",
    ],
    tags: ["Lichtfelder", "Erinnerung", "Innere Räume", "Resonanz", "Rückverbindung"],
    format: "PDF / E-Book",
    status: "coming-soon",
    symbol: "❋",
    glow: "blue",
  },
];

/**
 * Öffentliche Checkout-URLs aus Environment-Variablen.
 *
 * Wichtig: Die Schlüssel werden bewusst als LITERALE `process.env.NEXT_PUBLIC_…`
 * referenziert, damit Next.js sie korrekt ins Client-Bundle inlinet. Ein
 * dynamischer Zugriff (`process.env[key]`) würde dabei NICHT ersetzt.
 */
const checkoutUrls: Record<string, string | undefined> = {
  "144000-lichtnetzwerk": process.env.NEXT_PUBLIC_BOOK_144000_CHECKOUT_URL,
  "7-schluessel-des-bewusstseins": process.env.NEXT_PUBLIC_BOOK_7_KEYS_CHECKOUT_URL,
  "lichtfelder-des-erinnerns": process.env.NEXT_PUBLIC_BOOK_LICHTFELDER_CHECKOUT_URL,
};

/** Liefert eine gültige Checkout-URL oder `undefined`, wenn keine gesetzt ist. */
export function getCheckoutUrl(slug: string): string | undefined {
  const url = checkoutUrls[slug];
  return url && url.trim().length > 0 ? url.trim() : undefined;
}

export function getBook(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}
