import type { Post } from "@/data/types";

const RASTER_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

export function getBlogCoverUrl(post: Pick<Post, "slug" | "imageSrc">) {
  const extension = post.imageSrc.split(".").pop()?.toLowerCase() ?? "";

  if (RASTER_EXTENSIONS.has(extension)) {
    return post.imageSrc;
  }

  return `/og/blog/${post.slug}`;
}
