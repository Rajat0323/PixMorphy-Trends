"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type MediaItem = { id: string; url: string; filename: string; content_type: string };

function isUnauthorized(response: Response) {
  return response.status === 401;
}

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const loadMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/media");
      if (isUnauthorized(response)) {
        setNeedsLogin(true);
        setMessage("Your admin session has expired. Sign in again to view or upload images.");
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load the media library.");
      setItems(Array.isArray(result) ? result : []);
      setNeedsLogin(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load the media library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadMedia(), 0);
    return () => window.clearTimeout(timer);
  }, [loadMedia]);

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setUploading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (isUnauthorized(response)) {
        setNeedsLogin(true);
        setMessage("Your admin session has expired. Sign in again, then retry the upload.");
        return;
      }
      if (!response.ok) throw new Error(result.error || "Image upload failed.");
      form.reset();
      setMessage("Image uploaded. Copy its URL below and use it in the article editor.");
      await loadMedia();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <form onSubmit={upload} className="mt-5 flex flex-wrap items-center gap-3">
        <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required />
        <button disabled={uploading} className="rounded-xl bg-blue-700 px-4 py-2 font-bold text-white disabled:cursor-wait disabled:opacity-60">
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      </form>
      {message && (
        <div role="status" className="mt-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800">
          <p>{message}</p>
          {needsLogin && <Link className="mt-2 inline-block font-semibold text-blue-700 underline" href="/admin/login">Go to admin sign in</Link>}
        </div>
      )}
      {loading ? <p className="mt-6 text-sm text-slate-600">Loading media library…</p> : null}
      {!loading && !items.length && !needsLogin && !message && <p className="mt-6 text-sm text-slate-600">No images uploaded yet.</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border bg-white p-3">
            <img src={item.url} alt="" className="h-40 w-full rounded-lg object-cover" />
            <p className="mt-2 text-sm font-medium">{item.filename}</p>
            <input aria-label={`URL for ${item.filename}`} readOnly value={item.url} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full rounded border p-2 text-xs" />
          </article>
        ))}
      </div>
    </>
  );
}
