import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CategoryRail } from "@/components/category-rail";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredPosts, publicPosts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "हिंदी आरती, चालीसा और त्योहार मार्गदर्शिका",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

function HomepageHero() {
  const lead = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1);

  if (!lead) {
    return null;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.32fr_0.88fr]">
      <Link
        href={`/blog/${lead.slug}`}
        className="group self-start overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
      >
        <div className="relative h-[360px] overflow-hidden sm:h-[430px]">
          <Image
            src={lead.imageSrc}
            alt={lead.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 860px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${lead.heroAccent} opacity-15`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.74))]" />
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3 text-white/92">
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur">
                विशेष भक्ति
              </span>
              <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                {lead.featuredLabel}
              </span>
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="headline-font text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {lead.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-white/82 sm:text-base">
                {lead.excerpt}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid gap-6">
        {sidePosts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}

function TopicHighlights() {
  return (
    <section className="grid gap-4 rounded-[32px] border border-[color:var(--border)] bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
      {[
        ["आरती संग्रह", "हनुमान, लक्ष्मी, गणेश, शिव, दुर्गा — ५ आरती शुद्ध हिंदी में एक पेज पर।", "/aarti-sangrah"],
        ["आरती", "हनुमान, लक्ष्मी, शिव, गणेश और दुर्गा आरती — संपूर्ण पाठ हिंदी में।", "/category/aarti"],
        ["चालीसा", "हनुमान और शिव चालीसा सहित साफ़ देवनागरी पाठ और अर्थ।", "/category/chalisa"],
        ["त्योहार", "दीपावली, नवरात्रि, श्रावण जैसे त्योहारों की पूजा विधि और महत्व।", "/category/festivals"],
        ["व्रत और कथा", "सोमवार व्रत, व्रत कथा और नियम — सरल हिंदी मार्गदर्शिका।", "/category/vrat-katha"],
      ].map(([title, copy, href]) => (
        <Link
          key={title}
          href={href}
          className="rounded-[24px] bg-[color:var(--surface-muted)] p-5 transition hover:-translate-y-0.5"
        >
          <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{copy}</p>
        </Link>
      ))}
    </section>
  );
}

export default function Home() {
  const aartiPosts = publicPosts.filter((post) => post.category === "Aarti");
  const chalisaPosts = publicPosts.filter((post) => post.category === "Chalisa");
  const vratPosts = publicPosts.filter(
    (post) => post.category === "Vrat & Katha" || post.category === "Festivals",
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="sr-only">
        पिक्समॉर्फी भक्ति — हिंदी आरती, चालीसा, व्रत और त्योहार पूजा मार्गदर्शिका
      </h1>
      <section className="space-y-6 pt-4">
        <HomepageHero />
        <CategoryRail />
      </section>

      <TopicHighlights />

      <section id="aarti" className="space-y-6">
        <SectionHeading
          eyebrow="आरती संग्रह"
          title="सम्पूर्ण आरती संग्रह — ५ देवी-देवता"
          description="पूजा के समय पढ़ने के लिए शुद्ध हिंदी पाठ। सभी आरती एक ही पेज पर।"
        />
        <div className="flex justify-center">
          <Link
            href="/aarti-sangrah"
            className="inline-flex items-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)]"
          >
            🪔 सम्पूर्ण आरती संग्रह देखें →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aartiPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section
        id="chalisa"
        className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(234,88,12,0.08),rgba(255,255,255,1))] px-5 py-6 sm:px-8"
      >
        <SectionHeading
          eyebrow="चालीसा पाठ"
          title="हनुमान और शिव चालीसा — संपूर्ण पाठ"
          description="मंगलवार, शनिवार और सोमवार के लिए भक्तों की सबसे अधिक खोजी जाने वाली सामग्री।"
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {chalisaPosts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>

      <section id="vrat" className="space-y-6">
        <SectionHeading
          eyebrow="व्रत और त्योहार"
          title="व्रत विधि, कथा और त्योहार पूजा मार्गदर्शिका"
          description="श्रावण सोमवार से लेकर बड़े त्योहारों तक — व्यावहारिक हिंदी भक्ति सामग्री।"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {vratPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section id="latest" className="space-y-6">
        <SectionHeading
          eyebrow="सभी भक्ति पाठ"
          title="नए और पुराने सभी भक्ति लेख"
          description="मोबाइल पर पढ़ने के लिए अनुकूलित — अक्सर पूछे जाने वाले प्रश्न, स्कीमा और साझा करने योग्य प्रारूप।"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {publicPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          eyebrow="व्हाट्सऐप साझा"
          title="परिवार और मंदिर समूह में पाठ साझा करें"
          description="हर लेख पर व्हाट्सऐप साझा बटन है — आरती और चालीसा जल्दी पहुँचाएँ।"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          {siteConfig.categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
