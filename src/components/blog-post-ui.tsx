"use client";

import Link from "next/link";
import type { Post } from "@/data/content";
import { BHAKTI_CATEGORIES, getCategoryLabel } from "@/data/bhakti";
import { AdSlot } from "@/components/ad-slot";
import { QueryForm } from "@/components/query-form";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";
import { useLocale } from "@/lib/i18n/locale-provider";
import { getCategorySlug } from "@/lib/seo";

type PostUpdatedLabelProps = {
  date: string;
};

export function PostUpdatedLabel({ date }: PostUpdatedLabelProps) {
  const { tr } = useLocale();
  return (
    <span>
      {tr("postUpdatedPrefix")} {date}
    </span>
  );
}

type BlogPostInternalLinksProps = {
  links: NonNullable<Post["internalLinks"]>;
};

export function BlogPostInternalLinks({ links }: BlogPostInternalLinksProps) {
  const { tr } = useLocale();

  return (
    <section className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(37,99,235,0.06),rgba(255,255,255,1))] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <h2 className="headline-font text-xl font-semibold text-[color:var(--text-primary)]">
        {tr("postInternalLinks")}
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BlogPostFaqSection({ children }: { children: React.ReactNode }) {
  const { tr } = useLocale();

  return (
    <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <SectionHeading
        eyebrow={tr("postFaqEyebrow")}
        title={tr("postFaqTitle")}
        description={tr("postFaqDesc")}
      />
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function BlogPostQuerySection({ slug }: { slug: string }) {
  const { tr } = useLocale();
  const redirectUrl = `${siteConfig.url}/blog/${slug}?sent=1#query`;

  return (
    <section
      id="query"
      className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(234,88,12,0.06),rgba(255,255,255,1))] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
    >
      <SectionHeading
        eyebrow={tr("postQueryEyebrow")}
        title={tr("postQueryTitle")}
        description={tr("postQueryDesc")}
      />
      <div className="mt-6 max-w-2xl">
        <QueryForm redirectUrl={redirectUrl} />
      </div>
    </section>
  );
}

type BlogPostRelatedSectionProps = {
  relatedPosts: Post[];
};

export function BlogPostRelatedSection({ relatedPosts }: BlogPostRelatedSectionProps) {
  const { tr } = useLocale();

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow={tr("postRelatedEyebrow")}
        title={tr("postRelatedTitle")}
        description={tr("postRelatedDesc")}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {relatedPosts.map((relatedPost) => (
          <PostCard key={relatedPost.slug} post={relatedPost} compact />
        ))}
      </div>
    </section>
  );
}

type BlogPostSidebarUiProps = {
  currentSlug: string;
  posts: Post[];
};

export function BlogPostSidebarUi({ currentSlug, posts }: BlogPostSidebarUiProps) {
  const { tr } = useLocale();

  return (
    <>
      <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
          {tr("postLatest")}
        </h2>
        <div className="mt-5 space-y-4">
          {posts
            .filter((item) => item.slug !== currentSlug)
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="block rounded-[22px] bg-[color:var(--surface-muted)] p-4 transition hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {getCategoryLabel(item.category)}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-7 text-[color:var(--text-primary)]">
                  {item.title}
                </h3>
              </Link>
            ))}
        </div>
      </div>
      <AdSlot label={tr("adSidebar")} />
      <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
          {tr("postCategories")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {BHAKTI_CATEGORIES.map((item) => (
            <Link
              key={item}
              href={`/category/${getCategorySlug(item)}`}
              className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)]"
            >
              {getCategoryLabel(item)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function SponsoredAdSlot({ compact = false }: { compact?: boolean }) {
  const { tr } = useLocale();
  return <AdSlot label={tr("adSponsored")} compact={compact} />;
}
