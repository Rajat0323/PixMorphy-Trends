export function getTelegramBotUsername() {
  return process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "pixmorphy1_bot";
}

export function getTelegramBotUrl(startPayload?: string) {
  const username = getTelegramBotUsername();
  if (startPayload) {
    return `https://t.me/${username}?start=${encodeURIComponent(startPayload)}`;
  }
  return `https://t.me/${username}`;
}

export function isTelegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}
