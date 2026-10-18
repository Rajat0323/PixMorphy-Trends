import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL_UNPOOLED or DATABASE_URL before running the CMS migration.");
}

const sql = neon(connectionString);
const migration = await readFile(new URL("../migrations/001_cms.sql", import.meta.url), "utf8");
const statements = migration.split(";").map((statement) => statement.trim()).filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

const [{ posts, media, seoRules }] = await sql`
  SELECT
    to_regclass('public.cms_posts') IS NOT NULL AS posts,
    to_regclass('public.cms_media') IS NOT NULL AS media,
    to_regclass('public.cms_seo_rules') IS NOT NULL AS "seoRules"
`;
if (!posts || !media || !seoRules) {
  throw new Error("CMS migration ran, but expected tables were not found.");
}

console.log(`CMS migration applied (${statements.length} statements); posts, media, and SEO rules are present.`);
