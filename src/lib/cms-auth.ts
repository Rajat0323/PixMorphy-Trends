import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "pixmorphy_admin";
const MAX_AGE = 60 * 60 * 8;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  return value;
}

function signature(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function issueAdminSession(email: string) {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = Buffer.from(JSON.stringify({ email, expires })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${signature(payload)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
  };
  // Clear both paths because older deployments scoped the cookie to /admin.
  store.set(COOKIE, "", { ...options, path: "/" });
  store.set(COOKIE, "", { ...options, path: "/admin" });
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;
  let expected: string;
  try { expected = signature(payload); } catch { return false; }
  const a = Buffer.from(mac), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.email === "string" && data.email === process.env.ADMIN_EMAIL && data.expires > Date.now() / 1000;
  } catch { return false; }
}
