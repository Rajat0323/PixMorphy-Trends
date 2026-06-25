"use client";

import { getAbsoluteUrl } from "@/lib/seo";

type ShareButtonsProps = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const shareUrl = getAbsoluteUrl(`/blog/${slug}`);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title} - ${shareUrl}`);

  const items = [
    {
      label: "व्हाट्सऐप",
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      label: "फ़ेसबुक",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "टेलीग्राम",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "एक्स",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ];

  return (
    <section className="flex flex-wrap gap-3">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:text-[color:var(--accent)]"
        >
          {item.label}
        </a>
      ))}
    </section>
  );
}
