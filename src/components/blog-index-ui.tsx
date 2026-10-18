"use client";

import type { Post } from "@/data/content";
import type { CmsPostPreview } from "@/data/types";
import { BlogSearch } from "@/components/blog-search";
import { CmsPostCard } from "@/components/cms-post-card";
import { LocalizedBreadcrumbs } from "@/components/localized-breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

type BlogIndexUiProps = {
  posts: Post[];
  cmsPosts: CmsPostPreview[];
  initialQuery: string;
};

export function BlogIndexUi({ posts, cmsPosts, initialQuery }: BlogIndexUiProps) {
  const { tr } = useLocale();

  return (
    <div className="space-y-8">
      <LocalizedBreadcrumbs items={[{ type: "home" }, { type: "blog" }]} />
      <SectionHeading
        as="h1"
        eyebrow={tr("blogEyebrow")}
        title={tr("blogHeading")}
        description={tr("blogDesc")}
      />
      <BlogSearch posts={posts} cmsPosts={cmsPosts} initialQuery={initialQuery} />
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
          {tr("blogAllCount", { count: posts.length + cmsPosts.length })}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cmsPosts.map((post) => (
            <CmsPostCard key={post.slug} post={post} />
          ))}
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
