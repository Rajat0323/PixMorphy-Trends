import { NextResponse } from "next/server";
import { getTelegramBotProfile } from "@/lib/telegram-bot";
import { ensureTelegramWebhook } from "@/lib/telegram-webhook-setup";

export async function GET() {
  const bot = await getTelegramBotProfile();

  if (!bot.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "TELEGRAM_BOT_TOKEN missing or invalid in Vercel env.",
      },
      { status: 500 },
    );
  }

  const webhook = await ensureTelegramWebhook();

  if (!webhook.ok) {
    return NextResponse.json(
      {
        ok: false,
        bot: `@${bot.username}`,
        error: `Webhook setup failed: ${webhook.reason}`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    bot: `@${bot.username}`,
    webhookUrl: webhook.webhookUrl,
    alreadySet: webhook.alreadySet,
    message: `Webhook ready. Ab @${bot.username} par /start bhejein — Chat ID reply mein aayega.`,
  });
}

export async function POST(request: Request) {
  const setupSecret = process.env.TELEGRAM_SETUP_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.replace(/^Bearer\s+/i, "");

  if (setupSecret && bearer !== setupSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await ensureTelegramWebhook();

  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 500 });
  }

  return NextResponse.json(result);
}
