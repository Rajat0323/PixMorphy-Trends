import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/data/content";
import { getCategoryLabel } from "@/data/bhakti";

export const runtime = "edge";

const CATEGORY_THEMES: Record<string, { from: string; to: string; emoji: string }> = {
  Career: { from: "#1d4ed8", to: "#7c3aed", emoji: "🎓" },
  Chalisa: { from: "#ea580c", to: "#dc2626", emoji: "🙏" },
  Aarti: { from: "#f97316", to: "#db2777", emoji: "🪔" },
  Festivals: { from: "#d97706", to: "#e11d48", emoji: "🎉" },
  "Vrat & Katha": { from: "#9333ea", to: "#2563eb", emoji: "📿" },
  Cricket: { from: "#15803d", to: "#0f766e", emoji: "🏏" },
  Tech: { from: "#0891b2", to: "#4f46e5", emoji: "📱" },
  "AI Tools": { from: "#06b6d4", to: "#4f46e5", emoji: "🤖" },
  Discover: { from: "#2563eb", to: "#db2777", emoji: "🔥" },
  News: { from: "#dc2626", to: "#7c2d12", emoji: "📰" },
};

function getTheme(category: string) {
  return (
    CATEGORY_THEMES[category] ?? {
      from: "#2563eb",
      to: "#6d28d9",
      emoji: "✨",
    }
  );
}

function trimTitle(title: string, max = 90) {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trim()}…`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const theme = getTheme(post.category);
  const categoryLabel = getCategoryLabel(post.category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.24)",
            }}
          >
            PixMorphy
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
            }}
          >
            {categoryLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 72 }}>{theme.emoji}</div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              textShadow: "0 8px 30px rgba(15,23,42,0.25)",
            }}
          >
            {trimTitle(post.title)}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              opacity: 0.92,
              maxWidth: 900,
            }}
          >
            {trimTitle(post.excerpt, 120)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, fontWeight: 600, opacity: 0.9 }}>{post.readTime}</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
            }}
          >
            www.pixmorphy.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
