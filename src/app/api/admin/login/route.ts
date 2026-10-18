import { createHash, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cmsDb } from "@/lib/cms-db";
import { issueAdminSession } from "@/lib/cms-auth";

const scrypt = promisify(scryptCallback);
export async function POST(request: Request) {
  const sql = cmsDb();
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "unknown";
  const ipHash = createHash("sha256").update(`${process.env.ADMIN_SESSION_SECRET}:${ip}`).digest("hex");
  try {
    const attempts = await sql`SELECT count(*)::int AS count FROM cms_login_attempts WHERE ip_hash=${ipHash} AND created_at > now() - interval '15 minutes' AND success=false`;
    if (Number(attempts[0]?.count ?? 0) >= 8) return Response.json({ error: "Too many login attempts. Try again in 15 minutes." }, { status: 429 });
    const body = await request.json();
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");
    const expected = process.env.ADMIN_PASSWORD_HASH ?? "";
    let valid = false;
    if (email === process.env.ADMIN_EMAIL?.toLowerCase() && expected.includes(":")) {
      const [salt, digest] = expected.split(":");
      const actual = await scrypt(password, salt, 64) as Buffer;
      const target = Buffer.from(digest, "hex");
      valid = actual.length === target.length && timingSafeEqual(actual, target);
    }
    await sql`INSERT INTO cms_login_attempts(ip_hash,success) VALUES(${ipHash},${valid})`;
    if (!valid) return Response.json({ error: "Invalid email or password." }, { status: 401 });
    await issueAdminSession(email);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("CMS login failed", error);
    return Response.json({ error: "Admin database is not configured or unavailable." }, { status: 503 });
  }
}
