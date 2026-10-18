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
      <p className="eyebrow">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <Heading className="headline-font text-2xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
          {title}
        </Heading>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
