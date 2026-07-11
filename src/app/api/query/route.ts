import { NextResponse } from "next/server";
import { buildMailtoLink, sendQueryEmail } from "@/lib/send-query-email";

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

    const result = await sendQueryEmail({ name, email, message });

    if (!result.ok) {
      return NextResponse.json({
        ok: false,
        useMailto: true,
        mailto: buildMailtoLink({ name, email, message }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "सर्वर त्रुटि" }, { status: 500 });
  }
}
