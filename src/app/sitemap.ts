import type { MetadataRoute } from "next";
import { posts, siteConfig } from "@/data/content";
import { getActiveCategorySlugs } from "@/lib/seo";
import { getCmsPublishedPosts } from "@/lib/cms-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/editorial-policy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...getActiveCategorySlugs().map((slug) => ({
      url: `${siteConfig.url}/category/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const cmsPosts = await getCmsPublishedPosts(1000);
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
