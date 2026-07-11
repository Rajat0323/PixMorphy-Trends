import { NextResponse } from "next/server";

const QUERY_INBOX = "vivgup64@gmail.com";

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

    const response = await fetch(`https://formsubmit.co/ajax/${QUERY_INBOX}`, {
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
