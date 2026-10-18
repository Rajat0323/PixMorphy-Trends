import Link from "next/link";
import type { CmsPostPreview } from "@/data/types";
import { CmsFeaturedImage } from "@/components/cms-featured-image";

export function CmsPostCard({ post }: { post: CmsPostPreview }) {
  return (
    <article className="blog-card group">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="blog-card__image">
          {post.featured_image ? (
            <CmsFeaturedImage src={post.featured_image} alt={post.featured_image_alt || post.title} title={post.title} compact />
          ) : (
            <div aria-hidden="true" className="flex h-full items-center justify-center bg-[color:var(--surface-muted)] text-2xl font-bold tracking-tight text-[color:var(--accent)]">PM</div>
          )}
        </div>
        <div className="blog-card__body">
          <div className="blog-card__meta">
            {(post.categories ?? []).map((category) => <span key={category} className="blog-card__category">{category}</span>)}
            {post.published_at ? <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString("en-IN")}</time> : null}
          </div>
          <h2 className="blog-card__title transition group-hover:text-[color:var(--accent)]">{post.title}</h2>
          {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
          <div className="blog-card__footer"><span>{post.author || "PixMorphy"}</span><span className="blog-card__read">Read article →</span></div>
        </div>
      </Link>
    </article>
  );
}
