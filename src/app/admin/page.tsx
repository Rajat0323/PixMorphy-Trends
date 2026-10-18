import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms-auth";
import { cmsDb } from "@/lib/cms-db";
export const dynamic = "force-dynamic";
export default async function AdminHome() {
  if(!await isAdmin()) redirect("/admin/login");
  let posts=0,published=0; try { const sql=cmsDb(); const rows=await sql`SELECT count(*)::int AS total, count(*) FILTER(WHERE status='published')::int AS published FROM cms_posts WHERE status <> 'trash'`; posts=Number(rows[0]?.total??0); published=Number(rows[0]?.published??0); } catch { /* show setup link; database errors are explained in setup docs */ }
  const links=[["Posts",`/admin/posts`],["Categories","/admin/categories"],["Media","/admin/media"],["SEO meter & rules","/admin/seo"],["Google guidance updates","/admin/seo/guidelines"],["Settings","/admin/settings"]];
  return <main className="mx-auto max-w-6xl px-5 py-12"><p className="font-bold text-blue-700">PixMorphy CMS</p><h1 className="mt-2 text-4xl font-bold">Dashboard</h1><p className="mt-2 text-slate-600">{posts} CMS posts · {published} published. Publishing is always an explicit editor action.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{links.map(([label,href])=><Link key={href} href={href} className="rounded-2xl border bg-white p-6 font-semibold shadow-sm hover:border-blue-400">{label}<span className="mt-2 block text-sm font-normal text-slate-500">Open {label.toLowerCase()} →</span></Link>)}</div><form action="/api/admin/logout" method="post" className="mt-8"><button className="text-sm text-slate-600 underline">Sign out</button></form></main>;
}
