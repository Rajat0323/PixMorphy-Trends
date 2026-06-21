import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { posts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "PixMorphy ke saare Hindi aur Hinglish blog posts — AI tools, tech updates, trending news aur online earning guides.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "PixMorphy Blog",
    description:
      "PixMorphy ke saare Hindi aur Hinglish blog posts — AI tools, tech updates, trending news aur online earning guides.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="Blog Archive"
          title="Saare PixMorphy posts ek searchable archive mein"
          description="AI tools, tech updates, trending topics aur earning guides ko category, keyword ya title se quickly dhundhein."
        />
        <BlogSearch posts={posts} initialQuery={q ?? ""} />
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            Latest posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
