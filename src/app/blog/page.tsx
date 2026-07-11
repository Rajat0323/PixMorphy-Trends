import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { posts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "ब्लॉग — करियर, AI, टेक और हिंदी लेख",
  description:
    "PixMorphy के सभी हिंदी ब्लॉग — करियर मार्गदर्शन, AI, टेक, क्रिकेट, भक्ति और अन्य विषय एक खोज योग्य संग्रह में।",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "PixMorphy ब्लॉग",
    description: siteConfig.description,
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
            { label: "मुख्य पृष्ठ", href: "/" },
            { label: "ब्लॉग" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="ब्लॉग संग्रह"
          title="सभी हिंदी ब्लॉग एक जगह"
          description="शीर्षक या विषय से खोजें — करियर, AI, टेक, क्रिकेट, भक्ति और अन्य सभी लेख।"
        />
        <BlogSearch posts={posts} initialQuery={q ?? ""} />
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            सभी ब्लॉग ({posts.length})
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
