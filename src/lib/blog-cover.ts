import type { Post } from "@/data/types";

const RASTER_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

function getExtension(src: string) {
  return src.split(".").pop()?.toLowerCase() ?? "";
}

/** Cover shown on blog page, cards, and in-article hero */
export function getBlogCoverUrl(post: Pick<Post, "slug" | "imageSrc">) {
  if (post.imageSrc) {
    return post.imageSrc;
  }
  return `/og/blog/${post.slug}`;
}

/** Open Graph / Twitter card — prefer dynamic PNG for SVG covers */
export function getBlogSocialCoverUrl(post: Pick<Post, "slug" | "imageSrc">) {
  const extension = getExtension(post.imageSrc);

  if (post.imageSrc && RASTER_EXTENSIONS.has(extension)) {
    return post.imageSrc;
  }

  return `/og/blog/${post.slug}`;
}

export function isUnoptimizedImageSrc(src: string) {
  return src.startsWith("/og/") || getExtension(src) === "svg";
}
