import type { MetadataRoute } from "next";
import { villas } from "@/data/villas";

const SITE_URL = "https://villa-kalkan.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/villas`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const villaRoutes: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${SITE_URL}/villas/${villa.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...villaRoutes];
}
