import type { Faq } from "@/data/content";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[24px] border border-[color:var(--border)] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
        >
          <summary className="cursor-pointer list-none text-base font-semibold text-[color:var(--text-primary)]">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
