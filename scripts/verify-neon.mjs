import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { neon } from "@neondatabase/serverless";

const report = [];
const pass = (service, detail) => report.push({ service, status: "PASS", detail });
const blocked = (service, detail) => report.push({ service, status: "BLOCKED", detail });
const fail = (service, error) => report.push({ service, status: "FAIL", detail: error instanceof Error ? error.message : String(error) });

try {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing.");
  const sql = neon(process.env.DATABASE_URL);
  const [{ connected, cmsTables }] = await sql`
    SELECT
      current_database() IS NOT NULL AS connected,
      to_regclass('public.cms_posts') IS NOT NULL
        AND to_regclass('public.cms_media') IS NOT NULL AS "cmsTables"
  `;
  if (!connected || !cmsTables) throw new Error("Connected, but CMS tables are missing; run npm run db:migrate.");
  pass("Postgres", "connected and CMS tables are present");
} catch (error) {
  fail("Postgres", error);
}

try {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION;
  if (!endpoint || !region || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Neon Object Storage credentials are missing; run neon env pull.");
  }
  const client = new S3Client({ endpoint, region, forcePathStyle: true });
  const key = `verification/${randomUUID()}.txt`;
  const body = `PixMorphy Neon verification ${key}`;
  try {
    await client.send(new PutObjectCommand({ Bucket: "assets", Key: key, Body: body, ContentType: "text/plain" }));
    const response = await client.send(new GetObjectCommand({ Bucket: "assets", Key: key }));
    const downloaded = await response.Body?.transformToString();
    if (downloaded !== body) throw new Error("Uploaded object did not match the downloaded object.");
    pass("Object Storage", "uploaded, downloaded, and verified an object");
  } finally {
    await client.send(new DeleteObjectCommand({ Bucket: "assets", Key: key })).catch(() => {});
    client.destroy();
  }
} catch (error) {
  fail("Object Storage", error);
}

try {
  const url = process.env.NEON_FUNCTION_HELLO_BASE_URL;
  if (!url) throw new Error("NEON_FUNCTION_HELLO_BASE_URL is missing; deploy the hello Function and pull env vars.");
  const response = await fetch(url);
  const body = await response.text();
  if (!response.ok || !body.includes("Hello from Neon Functions")) {
    throw new Error(`Function returned HTTP ${response.status} with an unexpected response.`);
  }
  pass("Functions", `hello endpoint returned HTTP ${response.status}`);
} catch (error) {
  fail("Functions", error);
}

try {
  const url = process.env.NEON_AUTH_BASE_URL;
  if (!url) throw new Error("NEON_AUTH_BASE_URL is missing; run neon env pull.");
  const response = await fetch(`${url.replace(/\/$/, "")}/get-session`);
  if (!response.ok) throw new Error(`Auth session endpoint returned HTTP ${response.status}.`);
  pass("Neon Auth", `session endpoint returned HTTP ${response.status}`);
} catch (error) {
  fail("Neon Auth", error);
}

if (process.env.NEON_AI_GATEWAY_BASE_URL && process.env.NEON_AI_GATEWAY_TOKEN) {
  try {
    const response = await fetch(`${process.env.NEON_AI_GATEWAY_BASE_URL.replace(/\/$/, "")}/v1/models`, {
      headers: { Authorization: `Bearer ${process.env.NEON_AI_GATEWAY_TOKEN}` },
    });
    if (response.ok) {
      pass("AI Gateway", `model catalog returned HTTP ${response.status}`);
    } else if (response.status === 403 || response.status === 404 || response.status === 503) {
      blocked("AI Gateway", `model catalog returned HTTP ${response.status}; Neon Free plan does not serve gateway requests`);
    } else {
      fail("AI Gateway", `model catalog returned HTTP ${response.status}`);
    }
  } catch (error) {
    fail("AI Gateway", error);
  }
} else {
  blocked("AI Gateway", "Neon Free plan prevents gateway provisioning; upgrade to a paid plan to enable it");
}

for (const result of report) {
  console.log(`${result.status} ${result.service}: ${result.detail}`);
}

if (report.some((result) => result.status === "FAIL")) {
  process.exitCode = 1;
}
