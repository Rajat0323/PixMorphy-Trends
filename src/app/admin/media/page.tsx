import Link from "next/link";
import { redirect } from "next/navigation";
import { MediaLibrary } from "@/components/admin/media-library";
import { isAdmin } from "@/lib/cms-auth";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  if (!await isAdmin()) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/admin">← Dashboard</Link>
      <h1 className="mt-5 text-3xl font-bold">Media library</h1>
      <p className="mt-2 text-sm text-slate-600">
        Public image files are hosted in Vercel Blob. JPEG, PNG, WebP, or GIF up to 10 MB.
      </p>
      <MediaLibrary />
    </main>
  );
}
