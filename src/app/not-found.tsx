import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
        404
      </p>
      <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
        Page nahi mila
      </h1>
      <p className="max-w-xl text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
        Yeh URL exist nahi karta ya move ho chuka hai. Homepage ya blog archive se continue karein.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--text-secondary)]"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}
