/**
 * Zentrale Content-Library der Lichtbibliothek.
 *
 * Liest MDX-Dateien aus `content/<kategorie>/<slug>.mdx`, parst das Frontmatter
 * mit gray-matter und stellt einheitlich typisierte Artikel bereit.
 *
 * Reines Server-Modul (nutzt `node:fs`) – wird nur in Server Components bzw.
 * zur Build-Zeit ausgeführt, niemals im Client-Bundle.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Reihenfolge der Kategorien für Listen und Vor/Zurück-Navigation. */
export const CATEGORY_ORDER = [
  "bewusstsein",
  "frequenz",
  "symbole",
  "erde-kosmos",
  "astralreisen",
] as const;

/**
 * Interne, robuste Statuswerte. Das MDX-Frontmatter darf deutsch geschrieben
 * sein ("geplant" / "entwurf" / "veröffentlicht") – beim Parsen wird auf diese
 * englischen Werte normalisiert. `published` (Boolean) bleibt das eigentliche
 * Sichtbarkeits-Tor.
 */
export type ArticleStatus = "planned" | "draft" | "published";

function normalizeStatus(raw: unknown): ArticleStatus {
  const value = String(raw ?? "").trim().toLowerCase();
  if (["published", "veröffentlicht", "veroeffentlicht"].includes(value)) {
    return "published";
  }
  if (["planned", "geplant"].includes(value)) return "planned";
  return "draft";
}

/** Deutsche Anzeige-Beschriftung für die UI. */
export const articleStatusLabel: Record<ArticleStatus, string> = {
  planned: "Geplant",
  draft: "Entwurf",
  published: "Veröffentlicht",
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ArticleStatus;
  /** Geschätzte Lesedauer in Minuten (aus dem Inhalt berechnet). */
  readingTime: number;
  published: boolean;
  featured: boolean;
  coverImage: string | null;
  tags: string[];
  // Ergänzend für Gruppierung/Sortierung (nicht Teil des öffentlichen Schemas):
  categorySlug: string;
  order: number;
};

export type Article = {
  meta: ArticleMeta;
  /** Roher MDX-Inhalt ohne Frontmatter (wird von MDXRemote kompiliert). */
  content: string;
};

/** Wörter pro Minute für die Lesedauer-Schätzung. */
const WORDS_PER_MINUTE = 200;

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toReadableCategory(categorySlug: string): string {
  return categorySlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" & ");
}

function parseArticleFile(categorySlug: string, fileName: string): Article {
  const filePath = path.join(CONTENT_DIR, categorySlug, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.mdx?$/, "");

  const meta: ArticleMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? toReadableCategory(categorySlug)),
    status: normalizeStatus(data.status),
    readingTime: computeReadingTime(content),
    published: Boolean(data.published ?? false),
    featured: Boolean(data.featured ?? false),
    coverImage: data.coverImage ? String(data.coverImage) : null,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    categorySlug,
    order: typeof data.order === "number" ? data.order : 0,
  };

  return { meta, content };
}

/** Alle Artikel als Roh-Objekte (Meta + Inhalt), in stabiler Reihenfolge. */
function readAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const categoryDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const articles: Article[] = [];
  for (const categorySlug of categoryDirs) {
    const dir = path.join(CONTENT_DIR, categorySlug);
    const files = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
    for (const file of files) {
      articles.push(parseArticleFile(categorySlug, file));
    }
  }

  return articles.sort(compareArticles);
}

function compareArticles(a: Article, b: Article): number {
  const ai = CATEGORY_ORDER.indexOf(a.meta.categorySlug as never);
  const bi = CATEGORY_ORDER.indexOf(b.meta.categorySlug as never);
  const aCat = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bCat = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
  if (aCat !== bCat) return aCat - bCat;
  if (a.meta.order !== b.meta.order) return a.meta.order - b.meta.order;
  return a.meta.title.localeCompare(b.meta.title, "de");
}

/** Alle Artikel-Metadaten in stabiler Reihenfolge. */
export function getAllArticles(): ArticleMeta[] {
  return readAllArticles().map((article) => article.meta);
}

/** Nur veröffentlichte Artikel (für öffentliche Listen). */
export function getPublishedArticles(): ArticleMeta[] {
  return getAllArticles().filter((meta) => meta.published);
}

/** Alle Slugs (inkl. Entwürfe) – z. B. für interne Werkzeuge. */
export function getArticleSlugs(): string[] {
  return readAllArticles().map((article) => article.meta.slug);
}

/** Nur Slugs veröffentlichter Artikel – Grundlage für generateStaticParams. */
export function getPublishedArticleSlugs(): string[] {
  return readAllArticles()
    .filter((article) => article.meta.published)
    .map((article) => article.meta.slug);
}

/** Einzelnen Artikel inklusive MDX-Inhalt laden. */
export function getArticleBySlug(slug: string): Article | null {
  return readAllArticles().find((article) => article.meta.slug === slug) ?? null;
}

/**
 * Vorheriger und nächster Artikel – ausschließlich über veröffentlichte
 * Artikel, damit die Navigation keine Entwürfe verlinkt.
 */
export function getAdjacentArticles(slug: string): {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
} {
  const all = readAllArticles().filter((article) => article.meta.published);
  const index = all.findIndex((article) => article.meta.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1].meta : null,
    next: index < all.length - 1 ? all[index + 1].meta : null,
  };
}
