type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <Heading className="text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
          {title}
        </Heading>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
