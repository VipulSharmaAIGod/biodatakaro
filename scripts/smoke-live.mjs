// Smoke test for a PUBLIC deployment (no Razorpay keys, mock payments disabled).
// Usage: BASE=https://your-app.onrender.com node scripts/smoke-live.mjs
// Checks: landing, builder on mobile, free watermarked PDF+JPG, paid buttons disabled, payment APIs refuse, sitemap/robots use BASE.
import { chromium } from "playwright-core";
import { mkdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";

const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const SITE = (process.env.SITE || BASE).replace(/\/$/, "");
const OUT = "screenshots";
const EXP = `${OUT}/exports/live`;
mkdirSync(EXP, { recursive: true });
const log = (...a) => console.log("•", ...a);
const assert = (c, m) => {
  if (!c) throw new Error("ASSERT FAILED: " + m);
  log("ok -", m);
};

// --- HTTP checks
const j = async (path, init) => {
  const r = await fetch(BASE + path, init);
  return { status: r.status, body: await r.text() };
};
const cfg = await j("/api/payment/config");
assert(cfg.status === 200 && JSON.parse(cfg.body).available === false && JSON.parse(cfg.body).provider === "mock", "payment config: unavailable (no keys, mock off) " + cfg.body);
const post = (p, b) => j(p, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(b) });
const ord = await post("/api/payment/order", { biodataId: "bd_0123456789abcdef01234567", tier: "basic" });
assert(ord.status === 503, `order refused (${ord.status})`);
const mp = await post("/api/payment/mock-pay", { orderId: "order_mock_x" });
assert(mp.status === 404, `mock-pay refused (${mp.status})`);
const ver = await post("/api/payment/verify", { orderId: "x", paymentId: "y", signature: "z", ticket: "a.b" });
assert(ver.status === 503, `verify refused (${ver.status})`);
const sm = await j("/sitemap.xml");
assert(sm.status === 200 && sm.body.includes(`<loc>${SITE}/`) && (SITE.includes("localhost") || !sm.body.includes("localhost")), "sitemap.xml uses " + SITE);
const rb = await j("/robots.txt");
assert(rb.status === 200 && rb.body.includes(`Sitemap: ${SITE}/sitemap.xml`) && (SITE.includes("localhost") || !rb.body.includes("localhost")), "robots.txt uses " + SITE);
const home = await j("/");
assert(home.body.includes(`<link rel="canonical" href="${SITE}`) || home.body.includes(`href="${SITE}"`), "canonical uses " + SITE);

// --- Browser checks
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, acceptDownloads: true,
  userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36",
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 120000 });
assert((await page.locator("h1").innerText()).includes("marriage biodata"), "landing loads");
await page.waitForFunction(() => [...document.images].filter((i) => i.loading !== "lazy").every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30000 });
assert(true, "landing above-the-fold images loaded");
await page.screenshot({ path: process.env.SHOT || `${OUT}/live-landing.png` });

await page.goto(BASE + "/create", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.getByTestId("payments-off-banner").waitFor({ timeout: 15000 });
assert(!(await page.getByTestId("mock-banner").count()), "no TEST MODE banner");
await page.getByTestId("fill-sample").click();
await page.locator("#lang").selectOption("hi");
await page.getByTestId("step-about").click();
await page.getByTestId("ai-generate").click();
await page.waitForFunction(() => /[\u0900-\u097F]/.test(document.querySelector("#about-aboutMe")?.value || ""), null, { timeout: 30000 });
assert(true, "Hindi AI (fallback) text generated");
await page.getByTestId("step-design").click();
await page.getByTestId("tpl-classic").click();
await page.getByTestId("step-download").click();
await page.getByTestId("payments-soon").waitFor();
assert(await page.getByTestId("buy-basic").isDisabled(), "Basic pay button disabled");
assert(await page.getByTestId("buy-premium").isDisabled(), "Premium pay button disabled");
assert((await page.getByTestId("buy-premium").innerText()).includes("Launching soon"), "pay buttons say 'Launching soon'");
assert(!(await page.getByTestId("restore-open").count()), "restore link hidden");
assert(await page.evaluate(() => !!document.querySelector("[aria-hidden] [data-watermark]")), "free export is watermarked");
await page.screenshot({ path: `${OUT}/live-download-step.png`, fullPage: true });
for (const [id, file] of [["dl-pdf", "live-free.pdf"], ["dl-jpg", "live-free.jpg"]]) {
  const [d] = await Promise.all([page.waitForEvent("download", { timeout: 90000 }), page.getByTestId(id).click()]);
  await d.saveAs(`${EXP}/${file}`);
  const size = statSync(`${EXP}/${file}`).size;
  assert(size > 20000, `${file} downloaded (${Math.round(size / 1024)} KB)`);
}
execFileSync("pdftoppm", ["-png", "-r", "80", "-singlefile", `${EXP}/live-free.pdf`, `${EXP}/live-free-pdf`]);
assert(!errors.length, "no page errors " + errors.join(" | "));
await browser.close();
log("SMOKE PASSED");
