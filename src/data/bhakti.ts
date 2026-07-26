export const BLOG_CATEGORIES = ["Career"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  Career: "करियर",
};

export const CATEGORY_SLUG_LABELS: Record<string, string> = {
  career: "करियर",
};

export function getCategoryLabel(category: string) {
  return CATEGORY_LABELS[category as BlogCategory] ?? category;
}
