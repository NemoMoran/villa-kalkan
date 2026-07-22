import type { MetadataRoute } from "next";
import { villas } from "@/data/villas";
import { locales } from "@/lib/i18n/config";

const SITE_URL = "https://villa-kalkan.net";

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/villas", changeFrequency: "weekly", priority: 0.9 },
    { path: "/guide", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.2 },
    { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(
    ({ path, changeFrequency, priority }) =>
      locales.map((locale) => ({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      }))
  );

  const villaRoutes: MetadataRoute.Sitemap = villas.flatMap((villa) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/villas/${villa.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: languageAlternates(`/villas/${villa.slug}`) },
    }))
  );

  return [...staticRoutes, ...villaRoutes];
}
