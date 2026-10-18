import "server-only";
import { neon } from "@neondatabase/serverless";

export function cmsDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("CMS database is not configured. Set DATABASE_URL.");
  return neon(url);
}

export async function getCmsPublishedPost(slug: string) {
  if (!process.env.DATABASE_URL) return null;
  try { const rows=await cmsDb()`SELECT * FROM cms_posts WHERE slug=${slug} AND status='published'`; return rows[0]??null; }
  catch { return null; }
}

export const DEFAULT_GUIDANCE_SOURCES = [
  "https://developers.google.com/search/updates/search_docs_updates.rss",
  "https://developers.google.com/search/updates",
  "https://developers.google.com/search/blog",
  "https://developers.google.com/search/docs/essentials",
  "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  "https://developers.google.com/search/docs/essentials/spam-policies",
  "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  "https://developers.google.com/search/docs/appearance/structured-data/article",
];
