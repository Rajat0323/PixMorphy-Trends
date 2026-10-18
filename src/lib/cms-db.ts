import "server-only";
import { neon } from "@neondatabase/serverless";
import type { CmsPostPreview } from "@/data/types";

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

export async function getCmsPublishedPosts(limit = 100): Promise<CmsPostPreview[]> {
  if (!process.env.DATABASE_URL) return [];
  const safeLimit = Math.max(1, Math.min(Math.floor(limit), 1000));
  try {
    const rows = await cmsDb()`
      SELECT slug,title,excerpt,categories,tags,'PixMorphy Editorial Team' AS author,published_at,updated_at,featured_image,featured_image_alt
      FROM cms_posts
      WHERE status='published'
      ORDER BY published_at DESC NULLS LAST, updated_at DESC
      LIMIT ${safeLimit}
    `;
    return rows as unknown as CmsPostPreview[];
  } catch (error) {
    console.error("Could not load published CMS articles", error);
    return [];
  }
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
