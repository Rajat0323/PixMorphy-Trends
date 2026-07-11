"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { buildMailtoLink } from "@/lib/query-mailto";
import { useLocale } from "@/lib/i18n/locale-provider";

type QueryFormProps = {
  redirectUrl?: string;
};

type ApiResponse = {
  ok?: boolean;
  useMailto?: boolean;
  mailto?: string;
  error?: string;
};

export function QueryForm({ redirectUrl }: QueryFormProps) {
  const { tr } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error" | "mailto">("idle");

  const redirect = redirectUrl ?? `${siteConfig.url}/?sent=1#query`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const payload = { name, email, message };

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (data.ok) {
        form.reset();
        setStatus("done");
        window.history.replaceState(null, "", redirect);
        return;
      }

      if (data.useMailto) {
        const mailto = data.mailto ?? buildMailtoLink(payload);
        window.location.href = mailto;
        setStatus("mailto");
        return;
      }

      setStatus("error");
    } catch {
      window.location.href = buildMailtoLink(payload);
      setStatus("mailto");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--text-primary)]">
            {tr("formName")}
          </span>
          <input
            type="text"
            name="name"
            required
            placeholder={tr("formNamePlaceholder")}
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--text-primary)]">
            {tr("formEmail")}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={tr("formEmailPlaceholder")}
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--text-primary)]">
          {tr("formMessage")}
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={tr("formMessagePlaceholder")}
          className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? tr("formSubmitting") : tr("formSubmit")}
      </button>

      {status === "done" ? (
        <p className="text-sm text-emerald-700">{tr("formSuccess")}</p>
      ) : null}
      {status === "mailto" ? (
        <p className="text-sm text-emerald-700">{tr("formMailtoHint")}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-600">{tr("formError")}</p>
      ) : null}

      <p className="text-sm text-[color:var(--text-muted)]">
        {tr("formDirectEmail")}{" "}
        <Link
          href={`mailto:${siteConfig.contactEmail}`}
          className="font-medium text-[color:var(--accent)] hover:underline"
        >
          {siteConfig.contactEmail}
        </Link>
      </p>
    </form>
  );
}
