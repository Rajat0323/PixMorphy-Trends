export type BreadcrumbItemInput =
  | { type: "home" }
  | { type: "blog" }
  | { type: "allPosts" }
  | { type: "category"; category: string }
  | { type: "title"; label: string };

export function getBlogBreadcrumbItems(post: {
  title: string;
  category: string;
}): BreadcrumbItemInput[] {
  return [
    { type: "home" },
    { type: "allPosts" },
    { type: "category", category: post.category },
    { type: "title", label: post.title },
  ];
}
