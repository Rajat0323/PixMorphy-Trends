import type { MetadataRoute } from "next";
import { posts, siteConfig } from "@/data/content";
import { slugToCategory } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
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
      changeFrequency: "daily",
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
    ...Object.keys(slugToCategory).map((slug) => ({
      url: `${siteConfig.url}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
