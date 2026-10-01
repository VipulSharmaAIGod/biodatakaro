// End-to-end test of the full flow at mobile width (390px) against a running server.
// Usage: BASE=http://localhost:3100 node scripts/e2e.mjs
import { chromium } from "playwright-core";
import fs, { mkdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = "screenshots";
const EXP = `${OUT}/exports`;
mkdirSync(EXP, { recursive: true });
const log = (...a) => console.log("•", ...a);
const assert = (c, m) => {
  if (!c) throw new Error("ASSERT FAILED: " + m);
  log("ok -", m);
};

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36",
  acceptDownloads: true,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

// 1. Landing
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/01-landing-mobile.png` });
await page.screenshot({ path: `${OUT}/01-landing-mobile-full.png`, fullPage: true });
assert((await page.locator("h1").innerText()).includes("marriage biodata"), "landing h1");
const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
assert(ld.some((t) => t.includes("SoftwareApplication")) && ld.some((t) => t.includes("FAQPage")), "landing JSON-LD SoftwareApplication + FAQPage");

// a photo to upload: the sample avatar from /preview, captured as a PNG
const photoPath = `${EXP}/test-photo.png`;
{
  // draw a portrait-like test photo (600x800) on a canvas
  const dataUrl = await page.evaluate(async () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ec5e8"/><stop offset="1" stop-color="#e8d9c4"/></linearGradient></defs>
      <rect width="600" height="800" fill="url(#bg)"/>
      <path d="M300 120c-95 0-150 70-150 170 0 60 10 130 20 200h260c10-70 20-140 20-200 0-100-55-170-150-170z" fill="#2a1a12"/>
      <ellipse cx="300" cy="300" rx="105" ry="130" fill="#d9a77c"/>
      <path d="M195 280c10-90 60-130 105-130s95 40 105 130c-30-50-70-70-105-70s-75 20-105 70z" fill="#2a1a12"/>
      <ellipse cx="262" cy="300" rx="10" ry="7" fill="#2a1a12"/><ellipse cx="338" cy="300" rx="10" ry="7" fill="#2a1a12"/>
      <path d="M272 372q28 18 56 0" stroke="#9c4a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="300" cy="248" r="6" fill="#c0122c"/>
      <rect x="265" y="420" width="70" height="60" fill="#d9a77c"/>
      <path d="M90 800c0-170 90-330 210-330s210 160 210 330z" fill="#b0123a"/>
      <path d="M230 480l70 90 70-90" stroke="#e0b84a" stroke-width="10" fill="none"/>
    </svg>`;
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    await img.decode();
    const c = document.createElement("canvas"); c.width = 600; c.height = 800;
    c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/png");
  });
  fs.writeFileSync(photoPath, Buffer.from(dataUrl.split(",")[1], "base64"));
}

// 2. Form
await page.goto(BASE + "/create", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
assert(await page.getByTestId("mock-banner").isVisible(), "mock-mode banner visible");
await page.screenshot({ path: `${OUT}/02-form-empty-mobile.png` });
await page.getByTestId("fill-sample").click();
await page.locator("#lang").selectOption("hi");
await page.getByTestId("photo-input").setInputFiles(photoPath);
await page.getByTestId("crop-save").click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/02-form-filled-hindi-mobile.png` });
assert(await page.locator('img[alt="Your photo"]').isVisible(), "photo cropped and shown");

// 3. AI (fallback) in Hindi
await page.getByTestId("step-about").click();
await page.getByTestId("ai-generate").click();
await page.waitForFunction(() => (document.querySelector("#about-aboutMe")?.value || "").length > 40, null, { timeout: 15000 });
const hiText = await page.locator("#about-aboutMe").inputValue();
assert(/[\u0900-\u097F]/.test(hiText), "Hindi AI text is Devanagari: " + hiText.slice(0, 60));
await page.screenshot({ path: `${OUT}/03-ai-hindi-mobile.png` });

// 4. Design: every template renders
await page.getByTestId("step-design").click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/04-design-picker-mobile.png` });
for (const id of ["classic", "minimal", "floral", "royal", "mandala", "peacock", "emerald", "sidebar"]) {
  await page.getByTestId(`tpl-${id}`).click();
  const ok = await page.evaluate((id) => !!document.querySelector(`[data-template="${id}"]`), id);
  assert(ok, `template ${id} renders`);
}
// preview modal screenshots of two templates
for (const id of ["classic", "royal"]) {
  await page.getByTestId(`tpl-${id}`).click();
  await page.getByTestId("open-preview").click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/05-preview-${id}-hindi-mobile.png` });
  await page.keyboard.press("Escape");
}

async function download(testId, file) {
  const [d] = await Promise.all([page.waitForEvent("download", { timeout: 60000 }), page.getByTestId(testId).click()]);
  await d.saveAs(`${EXP}/${file}`);
  const size = statSync(`${EXP}/${file}`).size;
  assert(size > 20000, `${file} downloaded (${Math.round(size / 1024)} KB)`);
}
const exportHasWatermark = () => page.evaluate(() => !!document.querySelector('[aria-hidden] [data-template] ~ [data-watermark], [aria-hidden] [data-watermark]'));
const pdfToPng = (pdf, png) => execFileSync("pdftoppm", ["-png", "-r", "110", "-singlefile", `${EXP}/${pdf}`, `${OUT}/${png}`]);

// 5. Free download (watermarked) – classic, Hindi
await page.getByTestId("tpl-classic").click();
await page.getByTestId("step-download").click();
await page.waitForTimeout(500);
assert(await exportHasWatermark(), "free export has watermark");
await download("dl-pdf", "hindi-classic-FREE-watermarked.pdf");
await download("dl-jpg", "hindi-classic-FREE-watermarked.jpg");
pdfToPng("hindi-classic-FREE-watermarked.pdf", "06-pdf-hindi-classic-watermarked");
await page.screenshot({ path: `${OUT}/07-download-step-mobile.png`, fullPage: true });

// premium template locked when free
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-royal").click();
await page.getByTestId("step-download").click();
assert(await page.getByTestId("dl-pdf").isDisabled(), "premium template download locked before payment");

// 6. Mock payment – Basic ₹49
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-classic").click();
await page.getByTestId("step-download").click();
await page.getByTestId("buy-basic").click();
await page.getByTestId("mock-checkout").waitFor();
await page.screenshot({ path: `${OUT}/08-mock-checkout-mobile.png` });
await page.getByTestId("mock-pay-success").click();
await page.getByTestId("paid-msg").waitFor();
const paidText = await page.getByTestId("paid-msg").innerText();
const paymentId = /pay_[A-Za-z0-9]+/.exec(paidText)?.[0];
assert(!!paymentId, "basic payment verified, payment id " + paymentId);
assert(!(await exportHasWatermark()), "basic: classic export has NO watermark");
await download("dl-pdf", "hindi-classic-PAID.pdf");
await download("dl-jpg", "hindi-classic-PAID.jpg");
pdfToPng("hindi-classic-PAID.pdf", "09-pdf-hindi-classic-paid");

// Basic does not cover premium
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-royal").click();
await page.getByTestId("step-download").click();
assert(await exportHasWatermark(), "basic: premium template still watermarked/locked");
const upText = await page.getByTestId("buy-premium").innerText();
assert(upText.includes("₹50"), "upgrade price shows ₹50: " + upText);

// 7. Upgrade to Premium
await page.getByTestId("buy-premium").click();
await page.getByTestId("mock-pay-success").click();
await page.waitForFunction(() => document.querySelector('[data-testid="paid-msg"]')?.textContent?.includes("Premium"));
assert(!(await exportHasWatermark()), "premium: royal export has NO watermark");
await download("dl-pdf", "hindi-royal-PAID.pdf");
await download("dl-jpg", "hindi-royal-PAID.jpg");
pdfToPng("hindi-royal-PAID.pdf", "10-pdf-hindi-royal-paid");

// 8. Marathi AI + Tamil + Gujarati exports (other Indic scripts)
await page.getByTestId("step-details").click();
await page.locator("#lang").selectOption("mr");
await page.getByTestId("step-about").click();
await page.getByTestId("ai-generate").click();
await page.waitForFunction(() => /माझे नाव/.test(document.querySelector("#about-aboutMe")?.value || ""), null, { timeout: 15000 });
assert(true, "Marathi AI fallback text generated");
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-mandala").click();
await page.getByTestId("step-download").click();
await download("dl-pdf", "marathi-mandala-PAID.pdf");
pdfToPng("marathi-mandala-PAID.pdf", "11-pdf-marathi-mandala");

await page.getByTestId("step-details").click();
await page.locator("#lang").selectOption("ta");
await page.getByTestId("step-about").click();
assert(await page.getByTestId("lang-mismatch").isVisible(), "language-mismatch hint shown after switching to Tamil");
await page.getByTestId("ai-generate").click();
// no LLM key locally: Tamil falls back to English text + an explanatory note
await page.waitForFunction(() => /My name is|I am/.test(document.querySelector("#about-aboutMe")?.value || ""), null, { timeout: 15000 });
assert(await page.getByRole("status").isVisible(), "Tamil without LLM key: English draft + note shown");
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-peacock").click();
await page.getByTestId("step-download").click();
await download("dl-pdf", "tamil-peacock-PAID.pdf");
pdfToPng("tamil-peacock-PAID.pdf", "12-pdf-tamil-peacock");

await page.getByTestId("step-details").click();
await page.locator("#lang").selectOption("gu");
await page.getByTestId("step-about").click();
await page.getByTestId("ai-generate").click();
await page.waitForFunction(() => /મારું નામ/.test(document.querySelector("#about-aboutMe")?.value || ""), null, { timeout: 15000 });
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-emerald").click();
await page.getByTestId("step-download").click();
await download("dl-jpg", "gujarati-emerald-PAID.jpg");

// 9. Restore purchase after losing the token
await page.evaluate(() => localStorage.removeItem("bk:unlock:v1"));
await page.reload({ waitUntil: "networkidle" });
await page.getByTestId("step-download").click();
assert(await exportHasWatermark(), "after clearing token: watermark is back");
await page.getByTestId("restore-open").click();
await page.getByTestId("restore-input").fill(paymentId);
await page.getByTestId("restore-submit").click();
await page.getByTestId("paid-msg").waitFor();
assert((await page.getByTestId("paid-msg").innerText()).includes("Basic unlocked"), "restore with payment id re-unlocked Basic");
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-floral").click();
await page.getByTestId("step-download").click();
assert(!(await exportHasWatermark()), "restored Basic: free template exports without watermark");

// 10. Persistence across reload
await page.reload({ waitUntil: "networkidle" });
await page.getByTestId("step-details").click();
assert((await page.locator("#f-fullName").inputValue()) === "Priya Sharma", "data persisted in localStorage after reload");

// 11. SEO pages at mobile width
for (const [slug, shot] of [["biodata-for-marriage-in-hindi", "13-seo-hindi-mobile.png"], ["marathi-biodata", "14-seo-marathi-mobile.png"]]) {
  await page.goto(`${BASE}/${slug}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/${shot}` });
}

const real = errors.filter((e) => !/favicon|Failed to load resource: the server responded with a status of 4/.test(e));
assert(real.length === 0, "no page errors" + (real.length ? ": " + real.join(" | ") : ""));
await browser.close();
log("E2E PASSED");
