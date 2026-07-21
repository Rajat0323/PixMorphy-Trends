import { NextResponse } from "next/server";
import { buildMailtoLink } from "@/lib/query-mailto";
import { sendTelegramQuery, sendWeb3FormsQuery } from "@/lib/send-query-providers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "सभी फ़ील्ड भरें" }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const payload = { name, email, message };
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    const telegram = await sendTelegramQuery(payload);
    if (telegram.ok) {
      return NextResponse.json({ ok: true, channel: "telegram" });
    }

    if (web3Key) {
      const web3 = await sendWeb3FormsQuery(web3Key, payload);
      if (web3.ok) {
        return NextResponse.json({ ok: true, channel: "email" });
      }
    }

    return NextResponse.json({
      ok: false,
      useMailto: true,
      mailto: buildMailtoLink(payload),
    });
  } catch {
    return NextResponse.json({ error: "सर्वर त्रुटि" }, { status: 500 });
  }
}
