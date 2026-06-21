import Link from "next/link";
import { getAbsoluteUrl, getCategorySlug } from "@/lib/seo";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
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
        {items.map((item, index) => (
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

export function getBlogBreadcrumbs(post: {
  title: string;
  slug: string;
  category: string;
}) {
  const categorySlug = getCategorySlug(post.category);

  return [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.category, href: `/category/${categorySlug}` },
    { label: post.title },
  ];
}
