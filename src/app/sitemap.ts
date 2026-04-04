import type { MetadataRoute } from "next";
import { posts, siteConfig } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    })),
  ];
}
