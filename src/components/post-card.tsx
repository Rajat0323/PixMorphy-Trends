import Link from "next/link";
import type { Post } from "@/data/content";
import { getCategoryLabel } from "@/data/bhakti";
import { BlogImage } from "@/components/blog-image";
import { getBlogCoverUrl } from "@/lib/blog-cover";

type PostCardProps = { post: Post; compact?: boolean };

export function PostCard({ post }: PostCardProps) {
  const coverUrl = getBlogCoverUrl(post);

  return (
    <article className="blog-card blog-content-lock group">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="blog-card__image">
          <BlogImage
            src={coverUrl}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
            className="object-cover"
            style={{ objectPosition: post.imageObjectPosition ?? "center" }}
          />
        </div>
        <div className="blog-card__body">
          <div className="blog-card__meta">
            <span className="blog-card__category">{getCategoryLabel(post.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="blog-card__title transition group-hover:text-[color:var(--accent)]">{post.title}</h2>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__footer">
            <span>{post.author}</span>
            <span className="blog-card__read">{new Date(post.publishedAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
