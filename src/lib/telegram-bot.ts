import {
  loadTelegramChatIdFromUpstash,
  saveTelegramChatIdToUpstash,
} from "./telegram-chat-store";
import { getTelegramBotToken } from "./telegram-env";

type TelegramApiResponse = {
  ok: boolean;
  description?: string;
};

async function callTelegramApi<T>(method: string, body: Record<string, unknown>) {
  const token = getTelegramBotToken();

  if (!token) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as TelegramApiResponse & T;

  if (!response.ok || !data.ok) {
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const, data };
}

export async function sendTelegramText(chatId: string, text: string) {
  return callTelegramApi("sendMessage", {
    chat_id: chatId,
    text,
  });
}

export async function registerTelegramChat(chatId: string, firstName?: string) {
  await saveTelegramChatIdToUpstash(chatId);

  const name = firstName ? ` ${firstName}` : "";
  const persistedNote = process.env.TELEGRAM_CHAT_ID
    ? "Site ke query form se ab aapko messages yahan milenge."
    : "Ab site ke query form se messages yahan aayenge. (Vercel mein TELEGRAM_CHAT_ID set karein taaki har deploy par stable rahe.)";

  return sendTelegramText(
    chatId,
    [
      `✅ PixMorphy Telegram connect ho gaya${name}!`,
      "",
      persistedNote,
      "",
      `Aapka Chat ID: ${chatId}`,
      "",
      "Query form: https://www.pixmorphy.in/#query",
    ].join("\n"),
  );
}

export async function resolveTelegramChatId() {
  return loadTelegramChatIdFromUpstash();
}

export async function setTelegramWebhook(webhookUrl: string) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  return callTelegramApi("setWebhook", {
    url: webhookUrl,
    allowed_updates: ["message"],
    drop_pending_updates: true,
    ...(secret ? { secret_token: secret } : {}),
  });
}

export async function getTelegramWebhookInfo() {
  const token = getTelegramBotToken();

  if (!token) {
    return { ok: false as const, url: null };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`, {
    cache: "no-store",
  });
  const data = (await response.json()) as {
    ok: boolean;
    result?: { url?: string; last_error_message?: string };
  };

  if (!response.ok || !data.ok) {
    return { ok: false as const, url: null };
  }

  return {
    ok: true as const,
    url: data.result?.url ?? "",
    lastError: data.result?.last_error_message ?? null,
  };
}

export async function getTelegramBotProfile() {
  const token = getTelegramBotToken();

  if (!token) {
    return { ok: false as const, reason: "missing_token" as const };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/getMe`, {
    cache: "no-store",
  });
  const data = (await response.json()) as {
    ok: boolean;
    description?: string;
    result?: { username?: string; first_name?: string };
  };

  if (!response.ok || !data.ok || !data.result?.username) {
    return {
      ok: false as const,
      reason: "invalid_token" as const,
      telegramError: data.description ?? "Telegram getMe failed",
    };
  }

  return {
    ok: true as const,
    username: data.result.username,
    firstName: data.result.first_name ?? "Bot",
  };
}
