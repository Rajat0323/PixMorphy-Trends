import type { Metadata } from "next";
import { BlogIndexUi } from "@/components/blog-index-ui";
import { posts, siteConfig } from "@/data/content";
import { getCmsPublishedPosts } from "@/lib/cms-db";

export const metadata: Metadata = {
  title: "Career and AI Guides for Students",
  description:
    "Browse practical career guides for choosing a first role, learning applied AI, building projects, preparing job applications, and comparing salary research.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Career and AI Guides | PixMorphy",
    description: "Practical, clearly sourced guides for students and early-career professionals.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    locale: "en_IN",
  },
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const [{ q }, cmsPosts] = await Promise.all([searchParams, getCmsPublishedPosts()]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BlogIndexUi posts={posts} cmsPosts={cmsPosts} initialQuery={q ?? ""} />
    </main>
  );
}
