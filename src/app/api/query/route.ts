import { NextResponse } from "next/server";

const FORMSUBMIT_ID =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ID ?? "c11b349aff2b9c98ec77c0e4f38859f7";

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

function isFormSubmitSuccess(data: FormSubmitResponse) {
  return data.success === true || data.success === "true";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "सभी फ़ील्ड भरें" }, { status: 400 });
    }

    const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: "PixMorphy — नया प्रश्न / Query",
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = (await response.json()) as FormSubmitResponse;

    if (!response.ok || !isFormSubmitSuccess(data)) {
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
