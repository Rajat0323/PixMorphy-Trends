import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/cms-auth";
import { cmsDb } from "@/lib/cms-db";

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function imageMatchesType(type: string, bytes: Uint8Array) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
  if (type === "image/gif") return new TextDecoder().decode(bytes.slice(0, 6)).startsWith("GIF8");
  return (
    [...bytes.slice(0, 4)].map((byte) => String.fromCharCode(byte)).join("") === "RIFF" &&
    [...bytes.slice(8, 12)].map((byte) => String.fromCharCode(byte)).join("") === "WEBP"
  );
}

async function uploadImage(file: File) {
  const key = `cms/${randomUUID()}.${extensions[file.type]}`;
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  if (endpoint && process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    const client = new S3Client({ endpoint, region: process.env.AWS_REGION, forcePathStyle: true });
    try {
      await client.send(new PutObjectCommand({
        Bucket: "assets",
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
      }));
    } finally {
      client.destroy();
    }
    const publicKey = key.split("/").map(encodeURIComponent).join("/");
    return `${endpoint.replace(/\/$/, "")}/assets/${publicKey}`;
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, file, { access: "public", addRandomSuffix: false, contentType: file.type });
    return blob.url;
  }

  throw new Error("Configure Neon Object Storage credentials or BLOB_READ_WRITE_TOKEN to enable media uploads.");
}

export async function GET() {
  if (!await isAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const rows = await cmsDb()`SELECT id,url,filename,content_type,size_bytes,created_at FROM cms_media ORDER BY created_at DESC`;
    return Response.json(rows);
  } catch {
    return Response.json({ error: "Database unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0 || file.size > 10 * 1024 * 1024) {
      return Response.json({ error: "Choose an image up to 10 MB." }, { status: 400 });
    }
    if (!extensions[file.type]) {
      return Response.json({ error: "Allowed image types: JPEG, PNG, WebP, GIF." }, { status: 400 });
    }

    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (!imageMatchesType(file.type, header)) {
      return Response.json({ error: "File content does not match its declared image type." }, { status: 400 });
    }

    const url = await uploadImage(file);
    const sql = cmsDb();
    await sql`INSERT INTO cms_media(url,filename,content_type,size_bytes) VALUES(${url},${file.name.slice(0, 255)},${file.type},${file.size})`;
    return Response.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Media upload failed", error);
    const missingStorage = error instanceof Error && error.message.includes("Configure Neon");
    return Response.json(
      { error: missingStorage ? error.message : "Image upload failed." },
      { status: missingStorage ? 503 : 500 },
    );
  }
}
