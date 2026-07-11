import type { QueryPayload } from "./query-mailto";

export async function sendTelegramQuery({ name, email, message }: QueryPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const text = [
    "📩 PixMorphy — New Query",
    "",
    `👤 Name: ${name}`,
    `📧 Reply to: ${email}`,
    "",
    "💬 Message:",
    message,
    "",
    "↩️ User se contact karne ke liye upar wale email par reply karein.",
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const };
}

export async function sendWeb3FormsQuery(
  accessKey: string,
  { name, email, message }: QueryPayload,
) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: "PixMorphy — नया प्रश्न / Query",
      from_name: "PixMorphy",
      botcheck: "",
    }),
  });

  const data = (await response.json()) as { success?: boolean };

  if (!response.ok || !data.success) {
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const };
}
