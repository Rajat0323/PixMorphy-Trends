import { clearAdminSession } from "@/lib/cms-auth";
export async function POST() { await clearAdminSession(); return Response.json({ ok: true }); }
