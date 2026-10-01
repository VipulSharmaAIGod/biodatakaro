import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/site/AdSlot";
import { Faq } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { TemplateGallery } from "@/components/site/TemplateGallery";
import type { SeoPageData } from "@/content/seo-pages";
import { BRAND, SITE_URL } from "@/lib/site";
import { SampleTable } from "./SampleTable";

const RELATED: [string, string][] = [
  ["/marriage-biodata-format", "Marriage biodata format"],
  ["/biodata-for-marriage-in-hindi", "हिंदी बायोडाटा"],
  ["/marathi-biodata", "मराठी बायोडाटा"],
  ["/gujarati-biodata", "ગુજરાતી બાયોડેટા"],
  ["/biodata-format-for-girl", "Biodata for girl"],
  ["/biodata-format-for-boy", "Biodata for boy"],
  ["/free-biodata-maker", "Free biodata maker"],
];

export function SeoPage({ p }: { p: SeoPageData }) {
  const href = `/create${p.createQuery}`;
  return (
    <article lang={p.lang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: BRAND, item: SITE_URL },
            { "@type": "ListItem", position: 2, name: p.h1, item: `${SITE_URL}/${p.slug}` },
          ],
        }}
      />
      <header className="bg-gradient-to-b from-white to-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider text-brand">{p.kicker}</p>
            <h1 className="mt-2 text-[28px] font-extrabold leading-tight text-stone-900 sm:text-[40px]">{p.h1}</h1>
            {p.intro.map((t, i) => (
              <p key={i} className="mt-4 text-[16px] leading-relaxed text-stone-600">
                {t}
              </p>
            ))}
            <Link href={href} className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-brand px-6 text-[16px] font-bold text-white shadow hover:bg-brand-dark">
              {p.cta} →
            </Link>
          </div>
          <div className="mx-auto w-full max-w-[320px]">
            <Image src={`/templates/${p.slug.includes("girl") ? "floral" : p.slug.includes("boy") ? "minimal" : "classic"}.webp`} alt={`${p.h1} – sample design`} width={400} height={566} priority sizes="320px" className="h-auto w-full rounded-xl shadow-xl" />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.3fr_1fr]">
        <div className="prose-bk min-w-0">
          {p.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.body?.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <aside className="md:pt-8">
          <h2 className="mb-3 text-[18px] font-extrabold text-stone-900">{p.sampleTitle || "Sample"}</h2>
          <SampleTable lang={p.sample.lang} gender={p.sample.gender} caption={p.sample.caption} />
          <Link href={href} className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-[16px] font-bold text-white shadow hover:bg-brand-dark">
            {p.cta} →
          </Link>
        </aside>
      </div>

      <AdSlot id={`seo-${p.slug}`} />

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="mb-4 text-2xl font-extrabold text-stone-900">Biodata designs</h2>
        <TemplateGallery />
      </section>

      <div className="mt-14">
        <Faq items={p.faqs} title={p.faqTitle} lang={p.lang} />
      </div>

      <nav aria-label="Related" className="mx-auto mt-12 max-w-3xl px-4">
        <h2 className="text-[15px] font-bold text-stone-500">More biodata formats</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {RELATED.filter(([h]) => h !== `/${p.slug}`).map(([h, l]) => (
            <li key={h}>
              <Link href={h} className="inline-block rounded-full border border-stone-300 bg-white px-3 py-1.5 text-[14px] text-stone-700 hover:border-brand hover:text-brand">
                {l}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
