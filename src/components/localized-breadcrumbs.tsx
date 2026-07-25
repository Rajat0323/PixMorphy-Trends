"use client";

import Link from "next/link";
import { getCategoryLabel } from "@/data/bhakti";
import type { BreadcrumbItemInput } from "@/lib/breadcrumbs";
import { getAbsoluteUrl, getCategorySlug } from "@/lib/seo";
import { useLocale } from "@/lib/i18n/locale-provider";
import { getNavLabel } from "@/lib/i18n/translations";

type LocalizedBreadcrumbsProps = {
  items: BreadcrumbItemInput[];
};

export function LocalizedBreadcrumbs({ items }: LocalizedBreadcrumbsProps) {
  const { locale, tr } = useLocale();

  const resolved = items.map((item) => {
    switch (item.type) {
      case "home":
        return { label: getNavLabel(locale, "home"), href: "/" };
      case "blog":
        return { label: tr("blogTitle"), href: "/blog" };
      case "allPosts":
        return { label: tr("footerAllBlogs"), href: "/blog" };
      case "category":
        return {
          label: getCategoryLabel(item.category),
          href: `/category/${getCategorySlug(item.category)}`,
        };
      case "title":
        return { label: item.label };
      default:
        return { label: "" };
    }
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: resolved.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: getAbsoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[color:var(--text-muted)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {resolved.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-[color:var(--accent)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[color:var(--text-secondary)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
