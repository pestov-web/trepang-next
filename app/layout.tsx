import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/_app/styles/globals.css";
import { SITE } from "@/shared/config/site";

const inter = Inter({ variable: "--font-inter", subsets: ["cyrillic", "latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Доктор Панг — трепанг и морские биокомплексы", template: "%s — Доктор Панг" },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Морские продукты и биокомплексы",
  keywords: ["трепанг", "дальневосточный трепанг", "трепанг на меду", "трепанг в капсулах", "морские биокомплексы", "Доктор Панг", "Владивосток"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { siteName: SITE.name, title: "Доктор Панг — трепанг и морские биокомплексы", description: SITE.description, url: SITE.url, locale: "ru_RU", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Доктор Панг — морские продукты из Владивостока" }] },
  twitter: { card: "summary_large_image", title: "Доктор Панг — трепанг и морские биокомплексы", description: SITE.description, images: ["/opengraph-image"] },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, yandex: process.env.YANDEX_SITE_VERIFICATION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
