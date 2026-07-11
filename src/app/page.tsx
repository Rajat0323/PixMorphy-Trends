import type { Metadata } from "next";
import { HomePageUi } from "@/components/home-page-ui";
import { posts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: siteConfig.homepageTitle,
  description: siteConfig.description,
  keywords: siteConfig.homepageKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.homepageTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    locale: "hi_IN",
  },
};

const latestPosts = [...posts]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  .slice(0, 9);

type PageProps = {
  searchParams: Promise<{ sent?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const { sent } = await searchParams;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "hi-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <HomePageUi
        latestPosts={latestPosts}
        totalPosts={posts.length}
        showSentMessage={sent === "1"}
      />
    </div>
  );
}
