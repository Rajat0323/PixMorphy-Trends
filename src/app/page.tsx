import Link from "next/link";
import type { Metadata } from "next";
import { QueryForm } from "@/components/query-form";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
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

      <section className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(255,255,255,1))] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
          भारतीय छात्रों के लिए
        </p>
        <h1 className="headline-font mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
          {siteConfig.homepageTitle}
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-[color:var(--text-secondary)]">
          <p>
            यहाँ हम करियर, नौकरी, AI, टेक और वास्तविक जीवन के अनुभव पर हिंदी में
            बात करते हैं — खासकर उन छात्रों के लिए जो B.Tech, ग्रेजुएशन या नई
            नौकरी की तैयारी कर रहे हैं।
          </p>
          <p>
            कोई शॉर्टकट नहीं, कोई झूठी कहानी नहीं। सिर्फ लंबी यात्रा, सीखने की
            प्रक्रिया, गलतियाँ, सफलता और वो सबक जो भारत में करियर बनाते समय
            काम आते हैं।
          </p>
          <p>
            चाहे AI सीखना हो, पहली नौकरी की तैयारी हो, या विदेश/भारत में आगे
            बढ़ने की योजना — यहाँ मिलेंगे सच्चे अनुभव, सुझाव और प्रेरणा।
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] hover:-translate-y-0.5"
          >
            Blogs
          </Link>
          <Link
            href="#query"
            className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            प्रश्न पूछें
          </Link>
        </div>
      </section>

      <section id="blogs" className="space-y-6">
        <SectionHeading
          eyebrow="ब्लॉग"
          title="सभी लेख — करियर, AI, टेक और अन्य विषय"
          description="पहले से मौजूद सभी ब्लॉग यहाँ हैं। नए लेख समय-समय पर जोड़े जाते हैं।"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length > latestPosts.length ? (
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              सभी {posts.length} ब्लॉग देखें →
            </Link>
          </div>
        ) : null}
      </section>

      <section
        id="query"
        className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
      >
        <SectionHeading
          eyebrow="प्रश्न पूछें"
          title="करियर, AI या पढ़ाई से जुड़ा कोई सवाल?"
          description="नीचे फॉर्म भरें — आपका संदेश सीधे हमारी टीम के ईमेल पर पहुँचेगा।"
        />
        {sent === "1" ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            धन्यवाद! आपका प्रश्न भेज दिया गया है। हम जल्द जवाब देंगे।
          </p>
        ) : null}
        <div className="mt-6 max-w-2xl">
          <QueryForm actionEmail={siteConfig.queryEmail} siteUrl={siteConfig.url} />
        </div>
      </section>
    </div>
  );
}
