import "server-only";
import { createHash } from "node:crypto";
import { cmsDb } from "@/lib/cms-db";

const DOCUMENT_PAGES=[
  "https://developers.google.com/search/docs/essentials",
  "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  "https://developers.google.com/search/docs/essentials/spam-policies",
  "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  "https://developers.google.com/search/docs/appearance/structured-data/article",
];

async function checkDocumentationPage(url:string){
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
  try{const response=await fetch(url,{signal:controller.signal,headers:{"user-agent":"PixMorphy-Guidance-Monitor/1.0 (official documentation change monitor)"},cache:"no-store"});if(response.status===404||response.status===410)return {url,removed:true as const};if(!response.ok)return {url,error:`HTTP ${response.status}`};const html=await response.text();if(html.length>3_000_000)return {url,error:"Page exceeded the 3 MB monitoring limit."};const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<(nav|footer|header)\b[^>]*>[\s\S]*?<\/\1>/gi," ").replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/gi," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();if(text.length<100)return {url,error:"Page content could not be extracted reliably."};const hash=createHash("sha256").update(text).digest("hex");return {url,hash};}catch(error){return {url,error:error instanceof Error?error.message:"Network error"};}finally{clearTimeout(timeout);}
}

export async function syncGoogleGuidance() {
  const sql=cmsDb(); const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),12000);
  const pageChecksPromise=Promise.all(DOCUMENT_PAGES.map(checkDocumentationPage));
  try {
    const response=await fetch("https://developers.google.com/search/updates/search_docs_updates.rss",{signal:controller.signal,headers:{"user-agent":"PixMorphy-Guidance-Monitor/1.0 (official RSS reader)","accept":"application/rss+xml, application/xml, text/xml"},cache:"no-store"});
    if(!response.ok)throw new Error(`Official RSS returned HTTP ${response.status}`);
    const xml=await response.text();if(!xml.includes("<rss")||xml.length>2_000_000)throw new Error("RSS response was invalid or too large.");
    const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match=>{const b=match[1];const read=(tag:string)=>b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.replace(/<!\[CDATA\[|\]\]>/g,"").trim()??"";const unescape=(s:string)=>s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'");return {id:unescape(read("guid")),title:unescape(read("title")),description:unescape(read("description").replace(/<[^>]+>/g," ")).replace(/\s+/g," ").slice(0,3000),source:"https://developers.google.com/search/updates",publishedAt:read("pubDate")};}).filter(i=>i.id&&i.title);
    let added=0;for(const item of items){const exists=await sql`SELECT 1 FROM cms_guidance_changes WHERE id=${item.id}`;if(exists.length)continue;await sql`INSERT INTO cms_guidance_changes(id,title,description,source_url,published_at,status) VALUES(${item.id},${item.title},${item.description},${item.source},${item.publishedAt||null},'review')`;added++;}
    const pageChecks=await pageChecksPromise;const pageErrors:string[]=[];
    for(const page of pageChecks){if("error" in page){pageErrors.push(`${page.url}: ${page.error}`);continue;}if("removed" in page){const id=`removed-${createHash("sha256").update(page.url).digest("hex").slice(0,32)}`;const rows=await sql`INSERT INTO cms_guidance_changes(id,title,description,source_url,status) VALUES(${id},'Official guidance page returned 404/410','The previously monitored Google Search Central page returned HTTP 404/410. Confirm the official update feed before changing any rule.',${page.url},'review') ON CONFLICT(id) DO NOTHING RETURNING id`;added+=rows.length;continue;}const key=`google-doc:${page.url}`;const previous=await sql`SELECT value FROM cms_sync_state WHERE key=${key}`;const oldHash=String((previous[0]?.value as {hash?:string}|undefined)?.hash??"");if(oldHash&&oldHash!==page.hash){const id=`doc-${createHash("sha256").update(`${page.url}:${page.hash}`).digest("hex").slice(0,40)}`;const rows=await sql`INSERT INTO cms_guidance_changes(id,title,description,source_url,status) VALUES(${id},'Monitored Google documentation page changed',${`Text fingerprint changed. Previous: ${oldHash.slice(0,16)}; current: ${page.hash.slice(0,16)}. Compare the official page to identify the human-readable change.`},${page.url},'review') ON CONFLICT(id) DO NOTHING RETURNING id`;added+=rows.length;}await sql`INSERT INTO cms_sync_state(key,value,updated_at) VALUES(${key},${JSON.stringify({hash:page.hash,checkedAt:new Date().toISOString()})}::jsonb,now()) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=now()`;}
    const latest=items[0]??null;const lastSuccess=new Date().toISOString();await sql`INSERT INTO cms_sync_state(key,value,updated_at) VALUES('google-search-docs',${JSON.stringify({lastSuccess,latest,itemsSeen:items.length,pageErrors})}::jsonb,now()) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=now()`;
    return {ok:true,added,itemsSeen:items.length,pagesChecked:pageChecks.length,pageErrors,lastSuccess,latest};
  }catch(error){const message=error instanceof Error?error.message:"Unknown RSS synchronization error";try{await sql`INSERT INTO cms_sync_state(key,value,updated_at) VALUES('google-search-docs-error',${JSON.stringify({message,failedAt:new Date().toISOString()})}::jsonb,now()) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=now()`;}catch{}return {ok:false,error:message};}finally{clearTimeout(timeout);}
}
