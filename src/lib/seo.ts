import { posts, siteConfig } from "@/data/content";

export function getAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getAbsoluteImageUrl(imageSrc: string) {
  return getAbsoluteUrl(imageSrc);
}

export const categorySlugMap: Record<string, string> = {
  Trending: "trending",
  "Tech Update": "tech-update",
  "AI Tools": "ai-tools",
  "Online Earning": "online-earning",
};

export const slugToCategory: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([name, slug]) => [slug, name]),
);

export function getCategorySlug(category: string) {
  return categorySlugMap[category] ?? category.toLowerCase().replace(/\s+/g, "-");
}

export function getPostsByCategorySlug(slug: string) {
  const category = slugToCategory[slug];
  if (!category) {
    return [];
  }

  return posts.filter((post) => post.category === category);
}
