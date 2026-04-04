import { siteConfig } from "@/data/content";

export function CategoryRail() {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {siteConfig.categories.map((category) => (
        <a
          key={category.name}
          href={category.href}
          className="snap-start whitespace-nowrap rounded-full border border-[color:var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[color:var(--text-secondary)] shadow-sm transition hover:-translate-y-0.5 hover:text-[color:var(--text-primary)]"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}
