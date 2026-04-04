type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
