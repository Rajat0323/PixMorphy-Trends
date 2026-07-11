"use client";

import { getAbsoluteUrl } from "@/lib/seo";
import { useLocale } from "@/lib/i18n/locale-provider";

type ShareButtonsProps = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const { tr } = useLocale();
  const shareUrl = getAbsoluteUrl(`/blog/${slug}`);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title} - ${shareUrl}`);

  const items = [
    {
      label: tr("shareWhatsapp"),
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      label: tr("shareFacebook"),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: tr("shareTelegram"),
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: tr("shareX"),
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
