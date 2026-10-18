import { sanitizeCmsContent } from "@/lib/cms-content";
import { isPinterestPinPage } from "@/lib/cms-image";
import { cmsDb } from "@/lib/cms-db";
import { isAdmin } from "@/lib/cms-auth";
import { evaluateSeo } from "@/lib/cms-seo";
import { posts as staticPosts } from "@/data/content";
import { revalidateCmsPublicPages } from "@/lib/cms-cache";
import { checkCmsPublicationPrivacy } from "@/lib/cms-privacy";

function clean(value: unknown, max = 50000) { return String(value ?? "").slice(0, max); }
export async function GET() {
  if (!await isAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try { const sql=cmsDb(); const rows=await sql`SELECT id,slug,title,status,updated_at,created_at FROM cms_posts ORDER BY updated_at DESC`; return Response.json(rows); }
  catch { return Response.json({ error: "Configure DATABASE_URL and run migrations/001_cms.sql." }, { status: 503 }); }
}
export async function POST(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body=await request.json(); const sql=cmsDb();
    const title=clean(body.title,300).trim(); const slug=clean(body.slug,180).toLowerCase().trim();
    if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return Response.json({error:"Add a title and a URL-safe lowercase slug."},{status:400});
    if(staticPosts.some((post)=>post.slug===slug)) return Response.json({error:"This URL is already used by an existing PixMorphy article."},{status:409});
    const featuredImage=clean(body.featuredImage,1000).trim();
    if(body.status === "published" && isPinterestPinPage(featuredImage)) return Response.json({error:"Featured image must be a direct image URL. Upload it in Media or use the image file URL, not its Pinterest pin page."},{status:400});
    const content=sanitizeCmsContent(body.content); const quality=body.quality && typeof body.quality === "object" ? body.quality : {};
    const status=body.status === "published" ? "published" : "draft";
    if (status === "published") {
      const privacyIssues = checkCmsPublicationPrivacy({ ...body, content, quality: JSON.stringify(quality) });
      if (!body.privacyReviewConfirmed || privacyIssues.length) return Response.json({ error: privacyIssues.length ? `Review privacy findings: ${privacyIssues.join(", ")}. Remove them, then confirm the manual privacy review.` : "Complete the manual privacy review before publishing.", privacyIssues }, { status: 400 });
    }
    const rows=await sql`INSERT INTO cms_posts(slug,title,excerpt,content,status,categories,tags,author,published_at,seo_title,meta_description,og_title,og_description,sources,keyword,canonical,featured_image,featured_image_alt,internal_links,quality)
      VALUES(${slug},${title},${clean(body.excerpt,1000)},${content},${status},${Array.isArray(body.categories)?body.categories.map(String):[]},${Array.isArray(body.tags)?body.tags.map(String):[]},${"PixMorphy Editorial Team"},${status === "published" ? new Date().toISOString() : null},${clean(body.seoTitle,300)},${clean(body.metaDescription,500)},${clean(body.ogTitle,300)},${clean(body.ogDescription,500)},${clean(body.sources,10000)},${clean(body.keyword,200)},${clean(body.canonical,1000)},${featuredImage},${clean(body.featuredImageAlt,500)},${clean(body.internalLinks,5000)},${JSON.stringify(quality)}::jsonb) RETURNING id,slug,status`;
    const created=rows[0]; const evaluation=evaluateSeo({title,slug,excerpt:clean(body.excerpt),content,seoTitle:clean(body.seoTitle),metaDescription:clean(body.metaDescription),keyword:clean(body.keyword),canonical:clean(body.canonical),featuredImageAlt:clean(body.featuredImageAlt),internalLinks:clean(body.internalLinks),quality});
    await sql`INSERT INTO cms_evaluations(post_id,score,rules_version,checks) VALUES(${created.id},${evaluation.score},'1',${JSON.stringify(evaluation.checks)}::jsonb)`;
    await sql`INSERT INTO cms_audit_log(actor,action,entity_id) VALUES(${process.env.ADMIN_EMAIL},${status === "published"?"publish":"create"},${created.id})`;
    if(status === "published") revalidateCmsPublicPages(slug);
    return Response.json(created,{status:201});
  } catch(error) { const message=error instanceof Error && error.message.includes("duplicate key") ? "That URL slug is already in use." : "Could not save this article. Check database configuration."; console.error("CMS post save failed",error); return Response.json({error:message},{status:500}); }
}
