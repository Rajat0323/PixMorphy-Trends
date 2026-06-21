import fs from "fs";
import path from "path";

const covers = [
  {
    file: "instagram-zero-views-2026.svg",
    title: "Instagram 0 Views Fix",
    subtitle: "7 Practical Solutions",
    gradient: ["#f43f5e", "#a855f7", "#f97316"],
    icon: "📱",
  },
  {
    file: "ai-tools-students-2026.svg",
    title: "Free AI Tools",
    subtitle: "Students Ke Liye 2026",
    gradient: ["#06b6d4", "#2563eb", "#4f46e5"],
    icon: "🎓",
  },
  {
    file: "whatsapp-channel-earning-2026.svg",
    title: "WhatsApp Channel",
    subtitle: "Paise Kamane Ke Tarike",
    gradient: ["#22c55e", "#14b8a6", "#0ea5e9"],
    icon: "💰",
  },
  {
    file: "chatgpt-hindi-guide-2026.svg",
    title: "ChatGPT Hindi Guide",
    subtitle: "Best Prompts & Tips",
    gradient: ["#10b981", "#059669", "#047857"],
    icon: "🤖",
  },
  {
    file: "youtube-vs-reels-2026.svg",
    title: "YouTube Shorts vs Reels",
    subtitle: "Kahan Growth Fast Hai?",
    gradient: ["#ef4444", "#dc2626", "#f97316"],
    icon: "▶️",
  },
  {
    file: "phone-storage-cleanup-2026.svg",
    title: "Phone Storage Full?",
    subtitle: "10 Minute Cleanup Guide",
    gradient: ["#6366f1", "#8b5cf6", "#a855f7"],
    icon: "🗂️",
  },
  {
    file: "freelancing-roadmap-2026.svg",
    title: "Freelancing Roadmap",
    subtitle: "Beginner Guide India",
    gradient: ["#f59e0b", "#d97706", "#ea580c"],
    icon: "💼",
  },
  {
    file: "sarkari-apps-2026.svg",
    title: "Top 5 Sarkari Apps",
    subtitle: "Har Indian Ko Chahiye",
    gradient: ["#0ea5e9", "#0284c7", "#1d4ed8"],
    icon: "🇮🇳",
  },
  {
    file: "ai-creator-tools-2026.svg",
    title: "AI Creator Tools",
    subtitle: "Thumbnail, Caption & Script",
    gradient: ["#ec4899", "#db2777", "#9333ea"],
    icon: "✨",
  },
  {
    file: "upi-fraud-safety-2026.svg",
    title: "UPI Fraud Safety",
    subtitle: "Scam Se Kaise Bachhein",
    gradient: ["#ef4444", "#b91c1c", "#7f1d1d"],
    icon: "🛡️",
  },
];

const outDir = path.join(process.cwd(), "public/images/blog");
fs.mkdirSync(outDir, { recursive: true });

for (const cover of covers) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${cover.title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cover.gradient[0]}"/>
      <stop offset="55%" stop-color="${cover.gradient[1]}"/>
      <stop offset="100%" stop-color="${cover.gradient[2]}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="180" fill="#ffffff" fill-opacity="0.08"/>
  <circle cx="180" cy="520" r="220" fill="#ffffff" fill-opacity="0.06"/>
  <rect x="70" y="70" width="1060" height="490" rx="36" fill="#ffffff" fill-opacity="0.12"/>
  <text x="120" y="210" font-family="Arial, sans-serif" font-size="92">${cover.icon}</text>
  <text x="120" y="320" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="700">${cover.title}</text>
  <text x="120" y="390" fill="#ffffff" fill-opacity="0.92" font-family="Arial, sans-serif" font-size="34" font-weight="500">${cover.subtitle}</text>
  <rect x="120" y="430" width="280" height="56" rx="28" fill="#ffffff" fill-opacity="0.18"/>
  <text x="150" y="468" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="700">PixMorphy 2026</text>
  <rect x="120" y="500" width="420" height="8" rx="4" fill="#ffffff" fill-opacity="0.35"/>
</svg>`;
  fs.writeFileSync(path.join(outDir, cover.file), svg);
}

console.log(`Generated ${covers.length} covers`);
