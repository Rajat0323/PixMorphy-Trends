import fs from "fs";
import path from "path";

const covers = [
  { file: "hanuman-aarti-cover.svg", title: "हनुमान आरती", sub: "संपूर्ण पाठ हिंदी में", colors: ["#ea580c", "#dc2626", "#f59e0b"], icon: "🙏" },
  { file: "lakshmi-aarti-cover.svg", title: "लक्ष्मी आरती", sub: "Om Jai Lakshmi Mata", colors: ["#f59e0b", "#d97706", "#b45309"], icon: "🪔" },
  { file: "shiv-aarti-cover.svg", title: "शिव आरती", sub: "Om Jai Shiv Omkara", colors: ["#2563eb", "#4f46e5", "#7c3aed"], icon: "🔱" },
  { file: "ganesh-aarti-cover.svg", title: "गणेश आरती", sub: "Jai Ganesh Deva", colors: ["#f97316", "#ea580c", "#c2410c"], icon: "🐘" },
  { file: "durga-aarti-cover.svg", title: "दुर्गा आरती", sub: "Jai Ambe Gauri", colors: ["#db2777", "#be185d", "#9d174d"], icon: "🌺" },
  { file: "shiv-chalisa-cover.svg", title: "शिव चालीसा", sub: "संपूर्ण पाठ हिंदी में", colors: ["#1d4ed8", "#312e81", "#4338ca"], icon: "🕉️" },
  { file: "savan-somvar-vrat-cover.svg", title: "सavan सोमवार व्रत", sub: "विधि और महत्व 2026", colors: ["#059669", "#047857", "#065f46"], icon: "🌿" },
];

const outDir = path.join(process.cwd(), "public/images/blog");
for (const c of covers) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="100%" y2="100%"><stop offset="0%" stop-color="${c.colors[0]}"/><stop offset="50%" stop-color="${c.colors[1]}"/><stop offset="100%" stop-color="${c.colors[2]}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><circle cx="950" cy="140" r="160" fill="#fff" fill-opacity="0.1"/><text x="100" y="200" font-size="100">${c.icon}</text><text x="100" y="310" fill="#fff" font-family="Arial,sans-serif" font-size="52" font-weight="700">${c.title}</text><text x="100" y="380" fill="#fff" fill-opacity="0.9" font-family="Arial,sans-serif" font-size="30">${c.sub}</text><text x="100" y="460" fill="#fff" fill-opacity="0.75" font-family="Arial,sans-serif" font-size="22">PixMorphy Bhakti</text></svg>`;
  fs.writeFileSync(path.join(outDir, c.file), svg);
}
console.log("Done", covers.length);
