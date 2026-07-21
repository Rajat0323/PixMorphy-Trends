import { NextResponse } from "next/server";
import { setTelegramWebhook } from "@/lib/telegram-bot";
import { siteConfig } from "@/data/content";

export async function POST(request: Request) {
  const setupSecret = process.env.TELEGRAM_SETUP_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.replace(/^Bearer\s+/i, "");

  if (!setupSecret || bearer !== setupSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = `${siteConfig.url}/api/telegram/webhook`;
  const result = await setTelegramWebhook(webhookUrl);

  if (!result.ok) {
    return NextResponse.json({ error: "Webhook setup failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    webhookUrl,
    message: "Telegram webhook set. Ab @Pixmorphy_bot par /start karein.",
  });
}
