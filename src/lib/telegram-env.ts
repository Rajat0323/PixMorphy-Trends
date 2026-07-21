function cleanToken(raw: string) {
  return raw.trim().replace(/^["']|["']$/g, "");
}

export function getTelegramBotToken() {
  const candidates = [
    process.env.TELEGRAM_BOT_TOKEN,
    process.env.TELEGRAM_TOKEN,
    process.env.BOT_TOKEN,
  ];

  for (const candidate of candidates) {
    if (candidate?.trim()) {
      return cleanToken(candidate);
    }
  }

  return null;
}

export function getTelegramEnvDiagnostics() {
  const checkedNames = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_TOKEN", "BOT_TOKEN"] as const;
  const present = checkedNames.filter((name) => Boolean(process.env[name]?.trim()));

  return {
    checkedNames,
    presentNames: present,
    tokenConfigured: present.length > 0,
    tokenLength: present.length > 0 ? cleanToken(process.env[present[0]] ?? "").length : 0,
  };
}
