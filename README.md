# BiodataKaro: AI marriage biodata maker (v1)

A mobile-first web app for making Indian marriage biodata. You fill in a form, AI writes the "About me" text in 10 languages, you pick one of 8 traditional designs, and you download a PDF or a WhatsApp-ready JPG. There is no login: data stays in the browser's localStorage. Downloads are free with a watermark, and a small one-time payment removes the watermark and unlocks the premium designs.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript and Tailwind v4. It deploys to Vercel with no database.

---

## Quick start

```bash
npm install
cp .env.example .env.local          # all values optional for local use
npm run dev                         # http://localhost:3000 (hot reload)

# production build, the way Vercel runs it
npm run build
npm run start:local                 # http://localhost:3100
npm run restart:local               # restarts the background server on 3100 (log: /tmp/bk-server.log)

npm run e2e                         # full mobile E2E test + screenshots (needs the server running and Chrome at /usr/bin/google-chrome)
npm run thumbs                      # regenerate public/templates/*.webp gallery thumbnails from /preview
npm run lint
```

With no keys set, the app runs in **mock payment mode**. A yellow "TEST MODE" banner shows and the checkout is simulated, so you can test the whole flow without spending anything. The AI text then comes from the built-in template writer.

---

## Features

| Area | What's included |
|---|---|
| Form | Personal details (name, gender, DOB, time and place of birth, height, complexion, religion, optional caste and sub-caste, gotra, manglik, optional rashi and nakshatra, marital status, diet), education and job, income, family (father, mother, siblings, family type, native place), contact, expectations, **photo upload with crop** (react-easy-crop, downscaled to JPEG in the browser), **custom fields**, and a **heading line** with 28 presets grouped by religion (Shree Ganeshay Namah in several scripts, Om Namah Shivaya, Jai Shree Krishna, Bismillah, 786, Ik Onkar, Praise the Lord, Jai Jinendra, Namo Buddhaya and more), or your own text. Empty fields are left out of the document. Saved to localStorage as you type. |
| Languages | English, हिन्दी, मराठी, ગુજરાતી, বাংলা, தமிழ், తెలుగు, ಕನ್ನಡ, ਪੰਜਾਬੀ, മലയാളം. Labels and option values are translated in `src/lib/i18n/labels.ts`. |
| AI writing | `/api/ai/generate` writes About me, About family and Partner expectations, in a traditional or modern tone. The text can be edited. It uses Gemini, then OpenAI, then the built-in template writer (en/hi/mr/gu, gender-aware grammar). Only non-sensitive fields are sent: no phone, email, address or photo. There is a rate limit per IP. A hint appears if the About text is in a different script from the chosen language. |
| Templates | Free: Classic Maroon, Simple Elegant, Rose Floral. Premium: Royal Gold, Mandala Saffron, Peacock Teal, Emerald Heritage, Modern Sidebar. A4, auto-fit to one page, live preview scaled to the phone screen. Noto Serif/Sans for every script (next/font, self-hosted). |
| Export | PDF (A4, jsPDF) and JPG (WhatsApp; uses the Web Share API where available). Rendering happens in the browser, so Indic shaping is exact. Free exports carry a diagonal "Made with BiodataKaro.com" watermark and a footer strip. |
| Payments | Razorpay Standard Checkout: order created on the server, signature verified on the server, then a **stateless HMAC-signed unlock token** tied to the biodata ID (no database). Includes a webhook with signature check, "Restore purchase" by payment ID, mock mode, and a provider interface (`src/lib/payments/types.ts`). |
| SEO | Landing page and 7 targeted pages (`/marriage-biodata-format`, `/biodata-for-marriage-in-hindi`, `/marathi-biodata`, `/gujarati-biodata`, `/free-biodata-maker`, `/biodata-format-for-girl`, `/biodata-format-for-boy`), written in the matching language. Each has metadata, canonical URL, Open Graph and Twitter tags, a generated OG image, `sitemap.xml`, `robots.txt`, and JSON-LD (SoftwareApplication, WebSite, FAQPage, BreadcrumbList). All pages are static; fonts are self-hosted and the main bundle is small. |
| Ads | `<AdSlot />` (`src/components/site/AdSlot.tsx`) renders **nothing** until `NEXT_PUBLIC_ADSENSE_CLIENT` is set. No ad code ships. |
| Legal | `/privacy-policy`, `/terms`, `/refund-policy`, `/shipping-policy` (digital delivery), `/contact`, `/about`, `/pricing`. These are the pages Razorpay checks. Owner details are placeholders (`[CONTACT EMAIL]` etc.) that you fill in through env vars. |

---

## Pricing (and why)

| Plan | Price | What you get |
|---|---|---|
| Free | ₹0 | 3 free designs, PDF and JPG **with watermark** |
| Basic | **₹49** | Free designs **without watermark** |
| Premium | **₹99** | **All 8 designs**, no watermark |
| Upgrade Basic → Premium | ₹50 | The difference |

Each purchase is for one biodata and covers unlimited edits and re-downloads for 365 days on the same browser. "Restore purchase" with the Razorpay payment ID works on any device.

Why this structure:
- **₹49 is an impulse price.** It's less than a printout and a cup of chai, and a watermark-free file is the main reason people pay.
- **₹99 acts as an anchor** that makes ₹49 feel cheap, while the premium designs pull the average order value up. Most families will pick the nicer-looking design for a marriage document.
- **One-time and per biodata.** There are no subscriptions, so there are no renewal or cancellation tickets, which keeps support minimal.
- **Gateway fee:** about ₹1.16 on ₹49 and ₹2.34 on ₹99 (Razorpay 2% + 18% GST).

You can change prices in `src/lib/pricing.ts`. The server is the source of truth, so the client can't tamper with the amount.

---

## Environment variables

### True minimum to go live (real payments)

| Var | Why |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain, e.g. `https://biodatakaro.com`. Used for the canonical URL, sitemap and OG tags. |
| `RAZORPAY_KEY_ID` | Razorpay API key ID (`rzp_live_…`). Use `rzp_test_…` first. |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret. |

These are also strongly recommended:
- `UNLOCK_TOKEN_SECRET`: a random 32+ character string (`openssl rand -hex 32`). If it's empty, the Razorpay key secret is used, but then rotating the key secret would invalidate every existing unlock.
- `RAZORPAY_WEBHOOK_SECRET`: lets the webhook at `https://YOUR_DOMAIN/api/payment/webhook` verify signatures. Enable the events `payment.captured`, `order.paid`, `payment.failed` and `refund.processed`.
- `NEXT_PUBLIC_OWNER_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_ADDRESS`, `NEXT_PUBLIC_OWNER_CITY`: fill in the legal and contact pages. **Razorpay reviewers check these.**

### Optional

| Var | Default | Notes |
|---|---|---|
| `GEMINI_API_KEY` | none | **Recommended AI provider.** Google AI Studio key; there's a free tier. Tried first. |
| `GEMINI_MODEL` | `gemini-3.5-flash-lite` | Any Gemini text model ID. |
| `OPENAI_API_KEY` | none | Used if Gemini isn't set or fails (Responses API). |
| `OPENAI_MODEL` | `gpt-6-luna` | Any OpenAI model ID that supports the Responses API. |
| `AI_RATE_LIMIT_PER_MIN` / `AI_RATE_LIMIT_PER_DAY` | 6 / 40 | Per IP, in memory. |
| `PAYMENTS_DISABLE_MOCK` | none | `1` refuses mock payments when there are no keys. |
| `PAYMENTS_ALLOW_MOCK` | none | Mock mode is **off by default on Vercel production** (`VERCEL_ENV=production`). Set this to `1` only to demo it there. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | none | Reserved. The slot stays empty until you add AdSense code yourself. |

If no AI key is set, the template writer covers English, Hindi, Marathi and Gujarati. The other six languages fall back to English text with a note, so set a Gemini key to get real Bengali, Tamil, Telugu, Kannada, Punjabi and Malayalam text.

### External accounts needed

1. **Razorpay** (required for money). Sign up as an individual using your PAN, a savings account in your name and Aadhaar for KYC. Details below.
2. **Vercel** (free Hobby plan for hosting). Note that Vercel's Hobby plan is meant for non-commercial use, so move to Pro when revenue starts, or host anywhere that runs Node.
3. **A domain registrar**, to buy the domain.
4. Optional: **Google AI Studio** (Gemini key), **Google Search Console** (submit the sitemap), and later **AdSense**.

---

## Architecture

```
src/
  app/(site)/          landing, SEO pages ([slug] SSG), pricing, legal pages
  app/(doc)/create     the maker (client-only; loads Indic fonts only here)
  app/(doc)/preview    noindex sample render used for gallery thumbnails
  app/api/ai/generate  AI writer (Gemini → OpenAI → template fallback) + rate limit
  app/api/payment/*    config, order, verify, webhook, restore, mock-pay
  app/api/unlock/verify  validates a stored unlock token
  components/biodata/  8 templates, ornaments (inline SVG), watermark
  components/maker/    form steps, photo cropper, scaled live preview
  lib/payments/        provider interface + razorpay + mock
  lib/unlock-token.ts  stateless HMAC tokens
  content/             SEO page copy + FAQs
scripts/               e2e.mjs, thumbs.mjs, restart-server.sh
```

### The stateless payment flow (no database)

1. The browser calls `POST /api/payment/order {biodataId, tier, currentToken?}`. The server works out the price (or the ₹50 upgrade), creates a Razorpay order with notes `{bid, tier, product}`, and returns the order plus a signed **ticket** (an HMAC of orderId, biodataId, tier, amount and expiry).
2. The browser opens Razorpay Standard Checkout (`checkout.js`) for that order.
3. On success, the browser calls `POST /api/payment/verify` with `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature` and the ticket. The server checks `HMAC_SHA256(order_id|payment_id, key_secret)` and the ticket, then issues an **unlock token**: `base64url({v,bid,tier,pid,mode,iat,exp}).HMAC`.
4. The token is stored in localStorage. When exporting, the app checks it with `/api/unlock/verify` and renders without the watermark. Mock tokens are rejected as soon as real keys exist.
5. **Restore purchase:** `POST /api/payment/restore {paymentId}` fetches the payment from the Razorpay API. If it's captured and the notes match the product, the token is re-issued. This covers cleared browsers, new phones, and the case where the checkout closed before verify ran.
6. **Webhook:** verifies `x-razorpay-signature` against the raw body using `RAZORPAY_WEBHOOK_SECRET` and logs the event for reconciliation in the Vercel logs.

### Swapping in Cashfree or Instamojo

Implement `PaymentProvider` (`src/lib/payments/types.ts`): `createOrder`, `verifyPayment`, `verifyWebhook`, `fetchPayment` and `publicConfig`. Then select it in `src/lib/payments/index.ts`, and on the client replace the `checkout.js` call in `src/lib/pay-client.ts` with that provider's JS SDK (Cashfree `cashfree.js` `checkout()`, or an Instamojo payment-request redirect). The tokens, tickets, restore flow and UI stay the same.

---

## Payment gateway research (checked 1 Oct 2026)

### Razorpay (recommended)

- **Can an unregistered individual sign up?** Yes. Choose business type "Unregistered" and then "Individual". You need your **personal PAN** and a **savings account in your own name**. GST and a current account are *not* required for unregistered businesses. KYC runs automatically through **CKYC** (PAN plus an OTP to your CKYC-linked mobile). If that fails, you verify with **DigiLocker or Aadhaar**, or by **Video KYC**, and bank verification may ask for a cancelled cheque.
  - Sources: [Razorpay FAQs](https://razorpay.com/docs/payments/faqs/), [Set up](https://razorpay.com/docs/payments/set-up/), [Business types & KYC documents](https://razorpay.com/docs/payments/business-types-kyc-documents/), [Activation support](https://razorpay.com/docs/payments/account-activation-support/)
- **Website requirements:** to accept payments on a website or app (which is what **live API keys / Standard Checkout** require), you submit the live website URL, and Razorpay reviews it. The site must show **About us, Contact us (with email, phone and address), Pricing, Terms & Conditions, Privacy Policy, Cancellation/Refund policy and Shipping/Delivery policy**, with the products clearly described. Razorpay may ask for a sample invoice. Payments from a website that isn't registered with Razorpay are blocked. Without website details you can only use **Payment Links, Payment Pages and QR**.
  - So yes, individuals do get API keys and Standard Checkout once the site passes review. This app already contains every required page.
  - Source: [Business website details](https://razorpay.com/docs/payments/dashboard/account-settings/business-website-details/)
- **Fees:** **2%** per transaction on domestic cards, UPI, netbanking and wallets, plus **18% GST** on the fee. Corporate and commercial cards are higher (about 2.15% or more). There's no setup fee and no annual fee.
  - Sources: [Razorpay pricing](https://razorpay.com/pricing/), [Pricing explained (blog)](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/)
- **Settlement:** **T+2 working days** to the linked bank account by default. Instant or same-day settlement is available at an extra charge. The first settlement can take longer while the account is new.
  - Source: [Settlement FAQs](https://razorpay.com/docs/payments/settlements/faqs/)

### Cashfree Payments (strong backup)

- **Individuals are supported:** PAN, Aadhaar or CKYC, and a bank account in the owner's name. Business proof is asked for only if the automated checks fail. Activation usually takes **24–48 working hours** after the documents are verified, and the website is checked for the same kinds of policy pages.
- **Fees:** **1.95%** standard (plus GST). A **festive offer** is running: merchants who sign up on or after 21 Jul 2026 pay **0% platform fee on the first ₹20 lakh GMV until 31 Mar 2027**, with **T+1 settlement**. Read the terms when you apply; GST may still apply. Standard settlement is T+2.
- Sources: [Onboarding FAQs](https://www.cashfree.com/docs/help/onboarding-related/onboarding-faqs), [Account activation](https://www.cashfree.com/docs/help/account/account-activation), [Pricing](https://www.cashfree.com/payment-gateway-charges/)

### Instamojo (simplest, most expensive)

- Individuals can sign up with **PAN and a bank account**. KYC takes about 2 business days. It's built for small sellers and offers hosted payment links and a simple online store.
- **Fees:** **2% + ₹3 + GST** per payment on links and the gateway. Digital products and the free store plan cost **5% + ₹3**. That's ₹5–6 on a ₹49 sale, about 12%, which hurts at these price points.
- **Settlement:** **T+3**, with faster payouts available for a fee.
- Sources: [Online payments](https://www.instamojo.com/online-payments/), [Pricing](https://www.instamojo.com/pricing/), [Wise: Instamojo charges overview](https://wise.com/in/blog/instamojo-payment-gateway-pricing-charges-features)

### Recommendation

1. **Apply to Razorpay** (Standard Checkout, already built) as soon as the site is live on its domain with the owner details filled in, because the website review is the slow part. Test end to end with `rzp_test_` keys first.
2. **Apply to Cashfree in parallel** as a backup. Its 0% offer and T+1 settlement are genuinely attractive, and the provider interface makes a switch a small change.
3. If website review is delayed, a **Razorpay Payment Link** can collect payments manually in the meantime, but it won't unlock automatically.
4. Avoid Instamojo here unless both others refuse: its fee is about 12% on ₹49.

*These policies change. Re-check each link when you apply.*

---

## Known limitations (v1)

- The **watermark is applied in the browser**, so a technical user could get around it. That's acceptable for ₹49; a server-rendered export would close the gap.
- **Rate limits are in memory** and per serverless instance. Use Upstash Redis if you see abuse.
- **No database:** the webhook only logs, and refunds are handled manually in the Razorpay dashboard. Tokens are bound to the biodata ID, not to its content, so one purchase covers unlimited edits of that biodata. Mock orders are stored in memory.
- PDFs are **rasterised** (an image inside the PDF), so the text isn't selectable. This was a deliberate choice so that Indic shaping is perfect in every script.
- One biodata per browser. Starting a new one keeps the unlock only for the old ID.
- The template writer covers en/hi/mr/gu. Other languages need `GEMINI_API_KEY` or `OPENAI_API_KEY`.
- Translations of labels and SEO copy were written without a native-speaker review. Get each language checked.
- Real LLM calls and real Razorpay payments were **not** exercised (no keys). The code paths were tested against the APIs with fake credentials, which correctly returned 401, and against mock mode end to end.

## Launch checklist

1. Buy the domain (ideas: `biodatakaro.com`, `biodatakaro.in`, `biodatabano.com`).
2. Push to GitHub and import into Vercel. Set `NEXT_PUBLIC_SITE_URL`, the owner details, `UNLOCK_TOKEN_SECRET` and the Razorpay **test** keys, and point the domain at Vercel.
3. Apply to Razorpay (and Cashfree) with the live URL. Once approved, switch to `rzp_live_` keys and add the webhook.
4. Add `GEMINI_API_KEY`.
5. Set up Google Search Console: verify the domain, submit `/sitemap.xml`, and request indexing of the SEO pages.
6. Ongoing: more long-tail pages (each language, communities, "biodata for second marriage", sample PDFs), sharing in WhatsApp and Facebook groups, YouTube Shorts and Reels demos, privacy-friendly analytics, then AdSense once traffic exists.
