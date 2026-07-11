"use client";

import Link from "next/link";
import type { Post } from "@/data/content";
import { QueryForm } from "@/components/query-form";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

type HomePageUiProps = {
  latestPosts: Post[];
  totalPosts: number;
  showSentMessage: boolean;
};

export function HomePageUi({ latestPosts, totalPosts, showSentMessage }: HomePageUiProps) {
  const { tr } = useLocale();

  return (
    <>
      <section className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
          {tr("homeEyebrow")}
        </p>
        <h1 className="headline-font mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
          {tr("homeTitle")}
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-[color:var(--text-secondary)]">
          <p>{tr("homeP1")}</p>
          <p>{tr("homeP2")}</p>
          <p>{tr("homeP3")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] hover:-translate-y-0.5"
          >
            {tr("navBlogsBtn")}
          </Link>
          <Link
            href="#query"
            className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            {tr("homeAskQuery")}
          </Link>
        </div>
      </section>

      <section id="blogs" className="space-y-6">
        <SectionHeading
          eyebrow={tr("homeBlogEyebrow")}
          title={tr("homeBlogTitle")}
          description={tr("homeBlogDesc")}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 notranslate blog-content-lock">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {totalPosts > latestPosts.length ? (
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              {tr("homeViewAll", { count: totalPosts })}
            </Link>
          </div>
        ) : null}
      </section>

      <section
        id="query"
        className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
      >
        <SectionHeading
          eyebrow={tr("queryEyebrow")}
          title={tr("queryTitle")}
          description={tr("queryDesc")}
        />
        {showSentMessage ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {tr("querySuccess")}
          </p>
        ) : null}
        <div className="mt-6 max-w-2xl">
          <QueryForm />
        </div>
      </section>
    </>
  );
}
