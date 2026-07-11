"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

const QUERY_INBOX = "vivgup64@gmail.com";

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

function isFormSubmitSuccess(data: FormSubmitResponse) {
  return data.success === true || data.success === "true";
}

export function QueryForm() {
  const { tr } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${QUERY_INBOX}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: "PixMorphy — नया प्रश्न / Query",
          _template: "table",
          _captcha: "false",
        }),
      });

      const raw = await response.text();
      let data: FormSubmitResponse = {};

      try {
        data = JSON.parse(raw) as FormSubmitResponse;
      } catch {
        data = {};
      }

      if (!response.ok || !isFormSubmitSuccess(data)) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("done");
      window.history.replaceState(null, "", "/?sent=1#query");
    } catch {
      setStatus("error");
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
      {status === "error" ? (
        <p className="text-sm text-red-600">{tr("formError")}</p>
      ) : null}
    </form>
  );
}
