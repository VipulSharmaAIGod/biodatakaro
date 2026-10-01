import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoPage } from "@/components/seo/SeoPage";
import { SEO_PAGES, SEO_SLUGS } from "@/content/seo-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = SEO_PAGES[slug];
  if (!p) return {};
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: p.title, description: p.description, url: `/${p.slug}`, locale: p.lang === "en" ? "en_IN" : `${p.lang}_IN` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = SEO_PAGES[slug];
  if (!p) notFound();
  return <SeoPage p={p} />;
}
