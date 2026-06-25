import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import {
  aartiSangrahItems,
  aartiSangrahMeta,
  aartiSangrahRelated,
} from "@/data/aarti-sangrah";
import { siteConfig } from "@/data/content";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: aartiSangrahMeta.title,
  description: aartiSangrahMeta.description,
  keywords: aartiSangrahMeta.keywords,
  alternates: {
    canonical: "/aarti-sangrah",
  },
  openGraph: {
    title: aartiSangrahMeta.title,
    description: aartiSangrahMeta.description,
    url: getAbsoluteUrl("/aarti-sangrah"),
    type: "website",
  },
};

export default function AartiSangrahPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "सम्पूर्ण आरती संग्रह",
    description: aartiSangrahMeta.description,
    url: getAbsoluteUrl("/aarti-sangrah"),
    numberOfItems: aartiSangrahItems.length,
    itemListElement: aartiSangrahItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: getAbsoluteUrl(item.href),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "सम्पूर्ण आरती संग्रह में कौन-कौन सी आरती हैं?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "हनुमान, लक्ष्मी, गणेश, शिव और दुर्गा — पाँचों देवी-देवताओं की सम्पूर्ण आरती शुद्ध हिंदी में उपलब्ध है।",
        },
      },
      {
        "@type": "Question",
        name: "आरती हिंदी में कहाँ से पढ़ें?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PixMorphy Bhakti के आरती संग्रह पेज से सभी आरती का पूरा पाठ, पूजा विधि और FAQ एक ही जगह मिलता है।",
        },
      },
      {
        "@type": "Question",
        name: "मंगलवार और शुक्रवार की आरती कौन सी है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "मंगलवार — हनुमान आरती, शुक्रवार — लक्ष्मी और दुर्गा आरती, सोमवार — शिव आरती।",
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "मुख्य पृष्ठ", href: "/" },
            { label: "आरती संग्रह", href: "/aarti-sangrah" },
          ]}
        />
      </div>

      <header className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
          🪔 शुद्ध हिंदी भक्ति
        </p>
        <h1 className="headline-font mt-4 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
          सम्पूर्ण आरती संग्रह
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          {aartiSangrahMeta.description} {siteConfig.name} पर हनुमान, लक्ष्मी, गणेश,
          शिव और दुर्गा की आरती — सटीक देवनागरी पाठ, पूजा विधि और भारत में
          खोजे जाने वाले keywords के साथ।
        </p>
      </header>

      <section className="mt-10 space-y-6">
        <SectionHeading
          eyebrow="५ पवित्र आरती"
          title="हनुमान, लक्ष्मी, गणेश, शिव, दुर्गा — पूरा पाठ"
          description="हर आरती का अलग पेज — वहाँ से पूरा पाठ, FAQ और संबंधित लेख पढ़ें।"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aartiSangrahItems.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${item.accent}`} />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {item.subtitle}
                </p>
                <h2 className="headline-font mt-2 text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm italic leading-7 text-[color:var(--text-secondary)]">
                  {item.openingLine}…
                </p>
                <p className="mt-4 text-sm font-semibold text-[color:var(--accent)]">
                  पूरा पाठ पढ़ें →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <SectionHeading
          eyebrow="संबंधित पाठ"
          title="व्रत, चालीसा और अन्य भक्ति लेख"
          description="मजबूत आंतरिक लिंकिंग — इन पृष्ठों से जुड़कर पूरी भक्ति यात्रा पूरी करें।"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {aartiSangrahRelated.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
            >
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-[color:var(--border)] bg-white p-6 sm:p-8">
        <h2 className="headline-font text-2xl font-semibold text-[color:var(--text-primary)]">
          अक्सर पूछे जाने वाले प्रश्न
        </h2>
        <dl className="mt-6 space-y-6">
          {[
            [
              "हनुमान आरती कब करें?",
              "मंगलवार और शनिवार को विशेष। पूरा पाठ यहाँ: /blog/hanuman-aarti-hindi-sampoorna",
            ],
            [
              "लक्ष्मी आरती शुक्रवार को?",
              "हाँ — ॐ जय लक्ष्मी माता शुक्रवार और दीपावली पर अनिवार्य।",
            ],
            [
              "सावन में कौन सी आरती?",
              "शिव आरती (ॐ जय शिव ओंकारा) और सावन सोमवार व्रत विधि।",
            ],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl bg-[color:var(--surface-muted)] p-5">
              <dt className="font-semibold text-[color:var(--text-primary)]">{q}</dt>
              <dd className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
