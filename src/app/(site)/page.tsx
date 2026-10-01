import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/site/AdSlot";
import { Faq, type FaqItem } from "@/components/site/Faq";
import { JsonLd } from "@/components/site/JsonLd";
import { TemplateGallery } from "@/components/site/TemplateGallery";
import { LANGS } from "@/lib/languages";
import { PRICES, rupees } from "@/lib/pricing";
import { BRAND, SITE_URL } from "@/lib/site";

const FAQS: FaqItem[] = [
  { q: "Is BiodataKaro free?", a: "Yes. You can create, preview and download your marriage biodata free in 3 designs (with a small watermark). Removing the watermark costs ₹49 once; all 8 designs without watermark cost ₹99 once." },
  { q: "Do I need to sign up or install an app?", a: "No. It works directly in your phone's browser. No login, no OTP, no app download." },
  { q: "Which languages are supported?", a: "Biodata labels and AI writing are available in English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Punjabi and Malayalam." },
  { q: "Is my data and photo safe?", a: "Your details and photo are saved only in your own browser. We do not keep a copy of your biodata on our servers. Only the text needed to write ‘About Me’ is sent to the AI." },
  { q: "Will Hindi and other Indian scripts look correct in the PDF?", a: "Yes. We use Google's Noto fonts for every Indian script and render the PDF exactly as you see it in the preview, so matras and conjuncts are correct." },
  { q: "How do I share the biodata on WhatsApp?", a: "Download the JPG image (best for WhatsApp chats) or tap ‘Share on WhatsApp’ on Android. Keep the PDF for printing." },
  { q: "What if my payment succeeds but download doesn't unlock?", a: "Use ‘Restore purchase’ on the download step and enter the Razorpay payment ID from your receipt. If that fails, email us and we will fix it or refund you." },
];

const STEPS = [
  ["Fill details", "Simple form made for phones. Only name is required — skip anything you like."],
  ["Let AI write", "Get a warm ‘About Me’, family intro and partner expectations in your language."],
  ["Pick a design & download", "Live preview, auto-fit to one page, PDF + WhatsApp image."],
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `${BRAND} – AI Marriage Biodata Maker`,
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web, Android, iOS",
            url: SITE_URL,
            inLanguage: LANGS.map((l) => l.locale),
            description: "Free online marriage biodata maker with AI-written About Me in 10 Indian languages. Download PDF or WhatsApp image.",
            offers: [
              { "@type": "Offer", price: "0", priceCurrency: "INR", name: "Free" },
              { "@type": "Offer", price: String(PRICES.basic.amountPaise / 100), priceCurrency: "INR", name: "Basic – no watermark" },
              { "@type": "Offer", price: String(PRICES.premium.amountPaise / 100), priceCurrency: "INR", name: "Premium – all designs" },
            ],
          },
          { "@context": "https://schema.org", "@type": "WebSite", name: BRAND, url: SITE_URL },
        ]}
      />

      <section className="bg-gradient-to-b from-white via-cream to-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-8 sm:pt-14 md:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-[13px] font-bold text-brand">Free · No login · 10 Indian languages</p>
            <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-tight text-stone-900 sm:text-[48px]">
              Make a beautiful <span className="text-brand">marriage biodata</span> in 5 minutes
            </h1>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-stone-600">
              Fill a simple form on your phone. Our AI writes your ‘About Me’ in English, हिन्दी, मराठी, ગુજરાતી and more. Choose a traditional design and download a PDF or WhatsApp image.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/create" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-brand px-7 text-[17px] font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-dark">
                Create my biodata — free
              </Link>
              <Link href="/marriage-biodata-format" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-stone-300 bg-white px-6 text-[16px] font-semibold text-stone-800 hover:bg-stone-50">
                See biodata format
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-[14px] text-stone-700 sm:flex sm:flex-wrap sm:gap-5">
              <li>✓ Data stays on your phone</li>
              <li>✓ Auto-fits one A4 page</li>
              <li>✓ Hindi &amp; regional fonts</li>
              <li>✓ PDF + JPG</li>
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[380px]">
            <Image src="/templates/royal.webp" alt="Royal Gold marriage biodata design sample" width={400} height={566} priority sizes="(max-width: 768px) 70vw, 300px" className="absolute -right-2 top-6 hidden w-[62%] rotate-6 rounded-xl shadow-2xl sm:block" />
            <Image src="/templates/classic.webp" alt="Classic Maroon marriage biodata format sample" width={400} height={566} priority sizes="(max-width: 768px) 80vw, 300px" className="relative w-[80%] -rotate-2 rounded-xl shadow-2xl sm:w-[72%]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-center text-2xl font-extrabold text-stone-900 sm:text-3xl">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-[16px] font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 text-[17px] font-bold">{t}</h3>
              <p className="mt-1 text-[15px] text-stone-600">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">Biodata designs</h2>
          <Link href="/create" className="text-[15px] font-semibold text-brand">
            Use a design →
          </Link>
        </div>
        <p className="mt-1 text-[15px] text-stone-600">3 free designs and 5 premium traditional designs with borders, mandalas and gold accents.</p>
        <div className="mt-5">
          <TemplateGallery />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-brand px-5 py-8 text-white sm:px-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">AI writes your ‘About Me’ — in your language</h2>
          <p className="mt-2 max-w-2xl text-[16px] text-white/85">
            Not sure what to write? Pick a traditional or modern tone and get a respectful paragraph about you, your family and your expectations. Edit anything.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <li key={l.code} lang={l.code} className="rounded-full bg-white/10 px-3 py-1.5 text-[15px]">
                {l.native}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8" id="pricing">
        <h2 className="text-center text-2xl font-extrabold text-stone-900 sm:text-3xl">Simple, one-time pricing</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { name: "Free", price: "₹0", features: ["3 designs", "PDF + JPG download", "Small watermark", "AI About Me"] },
            { name: PRICES.basic.label, price: rupees(PRICES.basic.amountPaise), features: PRICES.basic.features },
            { name: PRICES.premium.label, price: rupees(PRICES.premium.amountPaise), features: PRICES.premium.features, hot: true },
          ].map((p) => (
            <div key={p.name} className={`rounded-2xl border-2 bg-white p-5 ${p.hot ? "border-brand shadow-lg" : "border-stone-200"}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[18px] font-bold">{p.name}</h3>
                <span className="text-[28px] font-extrabold text-brand">{p.price}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-[14px] text-stone-700">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[13px] text-stone-500">One-time payment per biodata. No subscription. Pay with UPI, cards or netbanking.</p>
      </section>

      <AdSlot id="home-mid" />

      <div className="py-8">
        <Faq items={FAQS} />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h2 className="text-2xl font-extrabold">Ready? It takes 5 minutes.</h2>
        <Link href="/create" className="mt-4 inline-flex min-h-13 items-center justify-center rounded-xl bg-brand px-8 text-[17px] font-bold text-white shadow-lg hover:bg-brand-dark">
          Create my biodata — free
        </Link>
      </section>
    </>
  );
}
