import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { publicPosts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Bhakti Blog — Aarti, Chalisa aur Vrat",
  description:
    "PixMorphy Bhakti ke saare Hindi posts — aarti, chalisa, vrat katha aur tyohar puja vidhi ek searchable archive mein.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "PixMorphy Bhakti Blog",
    description:
      "Hindi mein aarti, chalisa, vrat katha aur tyohar puja vidhi — saare devotional posts.",
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
            { label: "Bhakti Blog" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="Bhakti Archive"
          title="Saare aarti, chalisa aur vrat path ek jagah"
          description="Title, deity ya keyword se dhundhein — har post mein poora Hindi path, FAQ aur share option."
        />
        <BlogSearch posts={publicPosts} initialQuery={q ?? ""} />
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            Saare bhakti posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publicPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
