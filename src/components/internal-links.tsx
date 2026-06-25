import Link from "next/link";

type InternalLinksProps = {
  links: {
    label: string;
    href: string;
  }[];
};

export function InternalLinks({ links }: InternalLinksProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(234,88,12,0.06),rgba(255,255,255,1))] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <h2 className="headline-font text-xl font-semibold tracking-tight text-[color:var(--text-primary)]">
        संबंधित भक्ति पाठ — आंतरिक लिंक
      </h2>
      <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
        इन पृष्ठों से जुड़कर सम्पूर्ण आरती संग्रह, चालीसा और व्रत विधि पढ़ें।
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
