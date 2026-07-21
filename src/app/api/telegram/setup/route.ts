import { NextResponse } from "next/server";
import { getTelegramBotProfile } from "@/lib/telegram-bot";
import { getTelegramEnvDiagnostics } from "@/lib/telegram-env";
import { ensureTelegramWebhook } from "@/lib/telegram-webhook-setup";

const setupHints = [
  "Vercel → Project → Settings → Environment Variables",
  "Name exactly: TELEGRAM_BOT_TOKEN",
  "Value: BotFather token for @pixmorphy1_bot (no quotes, no spaces)",
  "Environment: Production checkbox ON",
  "Save ke baad Deployments → Redeploy (required)",
];

export async function GET() {
  const env = getTelegramEnvDiagnostics();
  const bot = await getTelegramBotProfile();

  if (!bot.ok && bot.reason === "missing_token") {
    return NextResponse.json(
      {
        ok: false,
        error: "TELEGRAM_BOT_TOKEN server par load nahi hua.",
        env,
        hints: setupHints,
      },
      { status: 500 },
    );
  }

  if (!bot.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Token mila lekin Telegram ne reject kiya — naya token BotFather se banayein.",
        env,
        telegramError: bot.telegramError,
        hints: setupHints,
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
        env,
        error: `Webhook setup failed: ${webhook.reason}`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    bot: `@${bot.username}`,
    env,
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
