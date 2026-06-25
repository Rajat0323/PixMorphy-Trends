import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { CATEGORY_SLUG_LABELS } from "@/data/bhakti";
import { siteConfig } from "@/data/content";
import { getPostsByCategorySlug, slugToCategory } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(slugToCategory).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory[slug];
  const label = CATEGORY_SLUG_LABELS[slug] ?? category;

  if (!category) {
    return {};
  }

  return {
    title: `${label} — लेख`,
    description: `पिक्समॉर्फी पर ${label} श्रेणी के नवीनतम हिंदी भक्ति लेख।`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${label} | पिक्समॉर्फी`,
      description: `पिक्समॉर्फी पर ${label} श्रेणी के नवीनतम हिंदी भक्ति लेख।`,
      url: `${siteConfig.url}/category/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slugToCategory[slug];
  const label = CATEGORY_SLUG_LABELS[slug] ?? category;
  const categoryPosts = getPostsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "मुख्य पृष्ठ", href: "/" },
            { label: "सभी पाठ", href: "/blog" },
            { label: label ?? category },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="श्रेणी"
          title={`${label} — लेख`}
          description={`${label} श्रेणी के चुने हुए भक्ति पाठ, अर्थ और पूजा विधि।`}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
