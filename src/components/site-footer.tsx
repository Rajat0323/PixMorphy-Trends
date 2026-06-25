import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[color:var(--border)] bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            पिक्समॉर्फी भक्ति
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
            हिंदी में आरती, चालीसा, व्रत कथा और त्योहार पूजा विधि — साफ़ देवनागरी पाठ, सरल अर्थ
            और मोबाइल के अनुकूल भक्ति मार्गदर्शिकाएँ।
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            विश्वास
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/about" className="block hover:text-[color:var(--accent)]">
              हमारे बारे में
            </Link>
            <Link href="/contact" className="block hover:text-[color:var(--accent)]">
              संपर्क
            </Link>
            <Link href="/editorial-policy" className="block hover:text-[color:var(--accent)]">
              संपादकीय नीति
            </Link>
            <Link href="/privacy" className="block hover:text-[color:var(--accent)]">
              गोपनीयता नीति
            </Link>
            <Link href="/feed.xml" className="block hover:text-[color:var(--accent)]">
              आरएसएस फ़ीड
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            भक्ति श्रेणियाँ
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/category/aarti" className="block hover:text-[color:var(--accent)]">
              आरती
            </Link>
            <Link href="/category/chalisa" className="block hover:text-[color:var(--accent)]">
              चालीसा
            </Link>
            <Link href="/category/festivals" className="block hover:text-[color:var(--accent)]">
              त्योहार
            </Link>
            <Link href="/category/vrat-katha" className="block hover:text-[color:var(--accent)]">
              व्रत और कथा
            </Link>
            <Link href="/blog" className="block hover:text-[color:var(--accent)]">
              सभी पाठ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
