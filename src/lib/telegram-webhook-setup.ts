import { siteConfig } from "@/data/content";
import {
  getTelegramWebhookInfo,
  setTelegramWebhook,
} from "@/lib/telegram-bot";

export async function ensureTelegramWebhook() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return { ok: false as const, reason: "missing_token" as const };
  }

  const webhookUrl = `${siteConfig.url}/api/telegram/webhook`;
  const info = await getTelegramWebhookInfo();

  if (!info.ok) {
    return { ok: false as const, reason: "info_failed" as const };
  }

  if (info.url === webhookUrl) {
    return { ok: true as const, webhookUrl, alreadySet: true as const };
  }

  const setResult = await setTelegramWebhook(webhookUrl);

  if (!setResult.ok) {
    return { ok: false as const, reason: "set_failed" as const };
  }

  return { ok: true as const, webhookUrl, alreadySet: false as const };
}
