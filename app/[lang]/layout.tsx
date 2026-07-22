import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { locales, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL("https://villa-kalkan.net"),
    title: {
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}`]),
        ["x-default", "/en"],
      ]),
    },
    openGraph: {
      title: dict.meta.titleDefault,
      description: dict.meta.description,
      url: `https://villa-kalkan.net/${lang}`,
      siteName: dict.meta.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.titleDefault,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar lang={lang} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict.footer} />
        <SpeedInsights />
      </body>
    </html>
  );
}
