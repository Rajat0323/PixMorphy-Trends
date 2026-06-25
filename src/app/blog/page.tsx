import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { publicPosts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "भक्ति लेख — आरती, चालीसा और व्रत",
  description:
    "पिक्समॉर्फी भक्ति के सभी हिंदी लेख — आरती, चालीसा, व्रत कथा और त्योहार पूजा विधि एक खोज योग्य संग्रह में।",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "पिक्समॉर्फी भक्ति लेख",
    description:
      "हिंदी में आरती, चालीसा, व्रत कथा और त्योहार पूजा विधि — सभी भक्ति लेख।",
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
            { label: "भक्ति लेख" },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="भक्ति संग्रह"
          title="सभी आरती, चालीसा और व्रत पाठ एक जगह"
          description="शीर्षक, देवता या कीवर्ड से खोजें — हर लेख में संपूर्ण हिंदी पाठ, अक्सर पूछे जाने वाले प्रश्न और साझा विकल्प।"
        />
        <BlogSearch posts={publicPosts} initialQuery={q ?? ""} />
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            सभी भक्ति लेख
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
