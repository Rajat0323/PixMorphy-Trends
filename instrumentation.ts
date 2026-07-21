export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureTelegramWebhook } = await import("./src/lib/telegram-webhook-setup");
    await ensureTelegramWebhook().catch(() => undefined);
  }
}
