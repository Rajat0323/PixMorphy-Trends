import type { MetadataRoute } from "next";
import { posts, siteConfig } from "@/data/content";
import { getActiveCategorySlugs } from "@/lib/seo";
import { cmsDb } from "@/lib/cms-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...getActiveCategorySlugs().map((slug) => ({
      url: `${siteConfig.url}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  let cmsPosts: {slug:string;updated_at:string}[]=[];
  if(process.env.DATABASE_URL){try{cmsPosts=await cmsDb()`SELECT slug,updated_at FROM cms_posts WHERE status='published'` as typeof cmsPosts;}catch{/* an unavailable CMS database does not remove the static sitemap */}}
  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cmsPosts.map((post)=>({url:`${siteConfig.url}/blog/${post.slug}`,lastModified:new Date(post.updated_at),changeFrequency:"weekly" as const,priority:0.8})),
  ];
}
