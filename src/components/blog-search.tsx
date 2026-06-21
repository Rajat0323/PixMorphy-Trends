"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/data/content";

type BlogSearchProps = {
  posts: Post[];
  initialQuery?: string;
};

export function BlogSearch({ posts, initialQuery = "" }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return posts;
    }

    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.author,
        ...post.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [posts, query]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="sr-only">Search posts</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, topic, category or keyword..."
          className="w-full rounded-[24px] border border-[color:var(--border)] bg-white px-5 py-4 text-sm text-[color:var(--text-primary)] shadow-sm outline-none transition focus:border-[color:var(--accent)]"
        />
      </label>

      <p className="text-sm text-[color:var(--text-muted)]">
        {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"} found
      </p>

      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-[24px] border border-[color:var(--border)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              {post.category}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[color:var(--text-primary)]">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
