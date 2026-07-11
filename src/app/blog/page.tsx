import type { Metadata } from "next";
import { BlogIndexUi } from "@/components/blog-index-ui";
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
      <BlogIndexUi posts={posts} initialQuery={q ?? ""} />
    </div>
  );
}
