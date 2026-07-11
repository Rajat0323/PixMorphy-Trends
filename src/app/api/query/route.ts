import { NextResponse } from "next/server";
import { siteConfig } from "@/data/content";

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export async function POST(request: Request) {
  if (!WEB3FORMS_KEY) {
    return NextResponse.json(
      { error: "Form backend not configured. Use the website form directly." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "सभी फ़ील्ड भरें" }, { status: 400 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteConfig.url,
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        message,
        subject: "PixMorphy — नया प्रश्न / Query",
        from_name: siteConfig.name,
        botcheck: "",
      }),
    });

    const data = (await response.json()) as Web3FormsResponse;

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.message ?? "भेजने में समस्या हुई" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "सर्वर त्रुटि" }, { status: 500 });
  }
}
