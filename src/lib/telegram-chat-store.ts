const CHAT_ID_KEY = "telegram_chat_id";

let memoryChatId: string | null = null;

export function getStoredTelegramChatId() {
  return process.env.TELEGRAM_CHAT_ID ?? memoryChatId;
}

export function rememberTelegramChatId(chatId: string) {
  memoryChatId = chatId;
}

export async function loadTelegramChatIdFromUpstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return getStoredTelegramChatId();
  }

  try {
    const response = await fetch(`${url}/get/${CHAT_ID_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return getStoredTelegramChatId();
    }

    const data = (await response.json()) as { result?: string | null };
    const chatId = data.result ?? null;

    if (chatId) {
      rememberTelegramChatId(chatId);
      return chatId;
    }
  } catch {
    return getStoredTelegramChatId();
  }

  return getStoredTelegramChatId();
}

export async function saveTelegramChatIdToUpstash(chatId: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  rememberTelegramChatId(chatId);

  if (!url || !token) {
    return false;
  }

  try {
    const response = await fetch(`${url}/set/${CHAT_ID_KEY}/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}
