import Link from "next/link";
import type { CmsPostPreview } from "@/data/types";

export function CmsPostCard({ post }: { post: CmsPostPreview }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || ""}
            loading="lazy"
            className="h-48 w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 text-4xl font-bold text-blue-700"
          >
            PM
          </div>
        )}
        <div className="space-y-3 p-5">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-[color:var(--accent)]">
            {(post.categories ?? []).map((category) => (
              <span key={category} className="rounded-full bg-blue-50 px-2.5 py-1">
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold leading-8 tracking-tight text-[color:var(--text-primary)] transition group-hover:text-[color:var(--accent)]">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
              {post.excerpt}
            </p>
          ) : null}
          <div className="flex items-center justify-between gap-3 text-sm text-[color:var(--text-muted)]">
            <span>{post.author || "PixMorphy"}</span>
            {post.published_at ? (
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("hi-IN")}
              </time>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
