import type { MetadataRoute } from "next";
import { SEO_SLUGS } from "@/content/seo-pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-01");
  const main = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/create", priority: 0.9, freq: "monthly" as const },
    ...SEO_SLUGS.map((s) => ({ path: `/${s}`, priority: 0.8, freq: "monthly" as const })),
    { path: "/pricing", priority: 0.5, freq: "monthly" as const },
    { path: "/about", priority: 0.3, freq: "yearly" as const },
    { path: "/contact", priority: 0.3, freq: "yearly" as const },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" as const },
    { path: "/terms", priority: 0.2, freq: "yearly" as const },
    { path: "/refund-policy", priority: 0.2, freq: "yearly" as const },
    { path: "/shipping-policy", priority: 0.2, freq: "yearly" as const },
  ];
  return main.map((m) => ({ url: `${SITE_URL}${m.path === "/" ? "" : m.path}`, lastModified: now, changeFrequency: m.freq, priority: m.priority }));
}
