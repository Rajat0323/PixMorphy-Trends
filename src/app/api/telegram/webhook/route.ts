import { NextResponse } from "next/server";
import { registerTelegramChat } from "@/lib/telegram-bot";

type TelegramUpdate = {
  message?: {
    chat: {
      id: number;
      first_name?: string;
    };
    text?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const headerSecret = request.headers.get("x-telegram-bot-api-secret-token");

  if (secret && headerSecret !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update = (await request.json()) as TelegramUpdate;
    const message = update.message;

    if (!message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const text = message.text?.trim() ?? "";

    if (text.startsWith("/start")) {
      await registerTelegramChat(chatId, message.chat.first_name);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
