// Drives a real browser through the BiodataKaro funnel so every analytics event fires once.
// Local:  BASE=http://localhost:3100 LOG=/tmp/bk-server.log node scripts/analytics-funnel.mjs   (asserts the log lines)
// Live:   BASE=https://biodatakaro.onrender.com node scripts/analytics-funnel.mjs           (then fetch logs via Render)
// Traffic is tagged utm_source=agent_test (override with UTM=...) so reports can tell it apart.
import fs from "node:fs";
import { chromium } from "playwright-core";

const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const LOG = process.env.LOG;
const UTM = process.env.UTM || "agent_test";
const pos = LOG ? fs.statSync(LOG).size : 0;
const log = (...a) => console.log("•", ...a);

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, acceptDownloads: true,
  userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36",
});
const page = await ctx.newPage();
await page.goto(`${BASE}/?allowbot=1&utm_source=${UTM}`, { waitUntil: "networkidle", timeout: 120000 });
await page.getByRole("link", { name: /Create my biodata/i }).first().click();
await page.waitForURL(/\/create/);
await page.getByTestId("fill-sample").waitFor({ timeout: 30000 });
await page.getByTestId("fill-sample").click();
await page.getByTestId("step-about").click();
await page.getByTestId("ai-generate").click();
await page.waitForFunction(() => (document.querySelector("#about-aboutMe")?.value || "").length > 40, null, { timeout: 30000 });
await page.getByTestId("open-preview").click();
await page.waitForTimeout(500);
await page.keyboard.press("Escape");
await page.getByTestId("step-download").click();
for (const id of ["dl-pdf", "dl-jpg"]) {
  const [d] = await Promise.all([page.waitForEvent("download", { timeout: 90000 }), page.getByTestId(id).click()]);
  await d.path();
}
const cfg = await (await fetch(BASE + "/api/payment/config")).json();
if (cfg.available) {
  await page.getByTestId("buy-basic").click();
  if (cfg.provider === "mock") {
    await page.getByTestId("mock-pay-success").click();
    await page.getByTestId("paid-msg").waitFor({ timeout: 15000 });
  }
  log("checkout done (" + cfg.mode + ")");
} else log("payments unavailable → no checkout events");
await page.waitForTimeout(1500); // let beacons flush
await browser.close();

if (LOG) {
  await new Promise((r) => setTimeout(r, 500));
  const lines = fs.readFileSync(LOG).subarray(pos).toString("utf8").split("\n").filter((l) => l.startsWith("ANALYTICS ")).map((l) => JSON.parse(l.slice(10)));
  const count = (e) => lines.filter((l) => l.e === e).length;
  const want = ["pageview", "builder_start", "ai_generate", "preview_template", "download_step_view", "download_free_pdf", "download_free_jpg"];
  if (cfg.available) want.push("checkout_open", "order_created", "payment_success");
  let bad = 0;
  for (const e of want) {
    const n = count(e);
    console.log(`${n ? "ok  " : "FAIL"} - ${e}: ${n}`);
    if (!n) bad++;
  }
  const pv = lines.find((l) => l.e === "pageview" && l.p === "/");
  console.log(`${pv?.utm === UTM ? "ok  " : "FAIL"} - landing pageview carries utm_source=${UTM}`);
  if (pv?.utm !== UTM) bad++;
  const vids = new Set(lines.filter((l) => l.src === "c").map((l) => l.vid));
  console.log(`${vids.size === 1 ? "ok  " : "FAIL"} - one visitor id across the session (${vids.size})`);
  if (vids.size !== 1) bad++;
  const pay = lines.find((l) => l.e === "payment_success");
  if (cfg.available) {
    console.log(`${pay?.x?.amt === 4900 ? "ok  " : "FAIL"} - payment_success amount = 4900 paise (${pay?.x?.amt})`);
    if (pay?.x?.amt !== 4900) bad++;
  }
  console.log(bad ? `FUNNEL FAILED (${bad})` : "FUNNEL PASSED");
  process.exit(bad ? 1 : 0);
}
log("FUNNEL DONE");
