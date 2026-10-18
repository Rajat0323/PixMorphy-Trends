"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/data/content";
import type { CmsPostPreview } from "@/data/types";
import { getCategoryLabel } from "@/data/bhakti";
import { useLocale } from "@/lib/i18n/locale-provider";

type BlogSearchProps = { posts: Post[]; cmsPosts: CmsPostPreview[]; initialQuery?: string };
type SearchResult = { slug: string; title: string; excerpt: string; category: string; author: string; keywords: string[]; publishedAt?: string | null };

export function BlogSearch({ posts, cmsPosts, initialQuery = "" }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const { tr, locale } = useLocale();

  const searchablePosts = useMemo<SearchResult[]>(() => [
    ...cmsPosts.map((post) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, category: (post.categories ?? []).join(" · "), author: post.author || "PixMorphy", keywords: post.tags ?? [], publishedAt: post.published_at })),
    ...posts.map((post) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, category: getCategoryLabel(post.category), author: post.author, keywords: post.keywords, publishedAt: post.publishedAt })),
  ], [posts, cmsPosts]);

  const categories = [...new Set(searchablePosts.flatMap((post) => post.category.split(" · ").filter(Boolean)))];
  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return searchablePosts.filter((post) => {
      const categoryMatch = !category || post.category.split(" · ").includes(category);
      const searchableText = [post.title, post.excerpt, post.category, post.author, ...post.keywords].join(" ").toLocaleLowerCase();
      return categoryMatch && (!normalized || searchableText.includes(normalized));
    });
  }, [searchablePosts, query, category]);

  return (
    <div className="space-y-5">
      <div className="blog-search-tools rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 sm:p-5">
        <label className="block">
          <span className="sr-only">{tr("navSearch")}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={tr("blogSearchPlaceholder")}
            className="min-h-12 w-full rounded-xl border border-[color:var(--border)] bg-white px-4 text-sm text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--accent)]"
          />
        </label>
        {categories.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={locale === "en" ? "Filter articles by category" : "श्रेणी से लेख छाँटें"}>
            <button type="button" onClick={() => setCategory("")} aria-pressed={!category} className={`rounded-full px-4 py-2 text-xs font-bold transition ${!category ? "bg-[color:var(--accent)] text-white" : "border border-[color:var(--border)] text-[color:var(--text-secondary)] hover:border-[color:var(--accent)]"}`}>
              {locale === "en" ? "All guides" : "सभी गाइड"}
            </button>
            {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? "bg-[color:var(--accent)] text-white" : "border border-[color:var(--border)] text-[color:var(--text-secondary)] hover:border-[color:var(--accent)]"}`}>{item}</button>)}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[color:var(--border)] pb-3">
        <h2 className="text-base font-bold text-[color:var(--text-primary)]">{tr("blogAllCount", { count: filteredPosts.length })}</h2>
        <p aria-live="polite" className="text-sm text-[color:var(--text-muted)]">{tr("blogSearchResults", { count: filteredPosts.length })}</p>
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="search-result-card">
              <Link href={`/blog/${post.slug}`} className="block p-5 sm:p-6">
                <p className="text-xs font-bold text-[color:var(--accent)]">{post.category}</p>
                <h3 className="mt-2 text-lg font-bold leading-7 tracking-tight text-[color:var(--text-primary)]">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--text-secondary)]">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[color:var(--text-muted)]">
                  <span>{post.author}</span>
                  {post.publishedAt ? <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString(locale === "en" ? "en-IN" : "hi-IN")}</time> : null}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[color:var(--border-strong)] bg-[color:var(--surface)] px-6 py-12 text-center">
          <h3 className="text-lg font-bold">{locale === "en" ? "No matching guides" : "कोई मेल खाता लेख नहीं"}</h3>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{locale === "en" ? "Try a different search or clear the category filter." : "दूसरा शब्द खोजें या श्रेणी फ़िल्टर हटाएँ।"}</p>
          <button type="button" onClick={() => { setQuery(""); setCategory(""); }} className="mt-5 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-bold text-white">{locale === "en" ? "Clear filters" : "फ़िल्टर हटाएँ"}</button>
        </div>
      )}
    </div>
  );
}
