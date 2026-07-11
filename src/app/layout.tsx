import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/content";

const headingFont = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Noto_Sans_Devanagari({
  variable: "--font-body",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.homepageTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      "hi-IN": "/",
      "en-IN": "/",
    },
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon?size=32", sizes: "32x32", type: "image/png" },
      { url: "/icon?size=192", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/icon?size=512`,
        width: 512,
        height: 512,
        alt: "पिक्समॉर्फी लोगो",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/icon?size=512`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon?size=512`,
    sameAs: siteConfig.socialLinks,
  };

  return (
    <html
      lang="hi"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MV8BT8T3J1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MV8BT8T3J1');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="site-shell">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
