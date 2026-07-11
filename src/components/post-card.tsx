import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/content";
import { getCategoryLabel } from "@/data/bhakti";
import { getBlogCoverUrl } from "@/lib/blog-cover";

type PostCardProps = {
  post: Post;
  compact?: boolean;
};

export function PostCard({ post, compact = false }: PostCardProps) {
  const coverUrl = getBlogCoverUrl(post);

  return (
    <article
      className="blog-content-lock group overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition hover:-translate-y-1"
      translate="no"
    >
      <div
        className={`relative overflow-hidden ${compact ? "h-44" : "h-56"} bg-slate-900`}
      >
        <Image
          src={coverUrl}
          alt={post.imageAlt}
          fill
          unoptimized={coverUrl.startsWith("/og/")}
          sizes={compact ? "(max-width: 1024px) 100vw, 420px" : "(max-width: 768px) 100vw, 520px"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          style={{
            objectPosition: post.imageObjectPosition ?? "center",
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${post.heroAccent} opacity-25`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.52))]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.featuredLabel}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3 text-xs text-[color:var(--text-muted)]">
          <span className="rounded-full bg-[color:var(--surface-muted)] px-2.5 py-1 font-semibold text-[color:var(--accent)]">
            {getCategoryLabel(post.category)}
          </span>
          <span>{post.readTime}</span>
        </div>
        <div className="space-y-2">
          <Link href={`/blog/${post.slug}`} className="block">
            <h3 className="text-xl font-semibold leading-8 tracking-tight text-[color:var(--text-primary)] transition group-hover:text-[color:var(--accent)]">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-[color:var(--text-muted)]">
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("hi-IN")}</span>
        </div>
      </div>
    </article>
  );
}
