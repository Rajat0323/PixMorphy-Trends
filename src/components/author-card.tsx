import { authors } from "@/data/content";

export function AuthorCard({ author }: { author: string }) {
  const profile = authors[author as keyof typeof authors];

  return (
    <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
        Author
      </p>
      <div className="mt-4 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-lg font-bold text-white">
          {author
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
            {author}
          </h2>
          <p className="text-sm font-medium text-[color:var(--text-muted)]">
            {profile?.role}
          </p>
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            {profile?.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
