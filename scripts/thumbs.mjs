// Generates public/templates/<id>.webp gallery thumbnails from /preview (needs the server running).
// Usage: BASE=http://localhost:3100 node scripts/thumbs.mjs
import { chromium } from "playwright-core";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:3100";
const IDS = ["classic", "minimal", "floral", "royal", "mandala", "peacock", "emerald", "sidebar"];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1.5 });
mkdirSync("public/templates", { recursive: true });
for (const id of IDS) {
  await page.goto(`${BASE}/preview?tpl=${id}&lang=${process.env.LANG_CODE || "en"}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = await page.locator("#doc").screenshot({ type: "png" });
  const webp = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = 400;
    c.height = 566;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, 400, 566);
    return c.toDataURL("image/webp", 0.82).split(",")[1];
  }, png.toString("base64"));
  writeFileSync(`public/templates/${id}.webp`, Buffer.from(webp, "base64"));
  console.log("wrote", id, Math.round(Buffer.from(webp, "base64").length / 1024) + "KB");
}
await browser.close();
