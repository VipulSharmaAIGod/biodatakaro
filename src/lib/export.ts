"use client";
/**
 * Client-side export. The browser itself lays out the biodata (so Indic shaping is perfect),
 * html-to-image rasterises it via SVG foreignObject, and jsPDF wraps the image in an A4 PDF.
 * Only the font faces actually needed for the text on the page are embedded.
 */
import { toJpeg, toPng } from "html-to-image";

const FONT_VARS = ["--font-ui", "--font-serif", "--font-display", "--font-deva-sans", "--font-deva-serif", "--font-guj", "--font-beng", "--font-taml", "--font-telu", "--font-knda", "--font-guru", "--font-mlym", "--font-arab"];
const dataUrlCache = new Map<string, Promise<string>>();

function familiesFromVars(el: Element): Set<string> {
  const cs = getComputedStyle(el);
  const out = new Set<string>();
  for (const v of FONT_VARS) {
    cs.getPropertyValue(v)
      .split(",")
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean)
      .forEach((f) => out.add(f));
  }
  return out;
}

function parseRanges(r: string): [number, number][] {
  if (!r) return [[0, 0x10ffff]];
  return r.split(",").map((part) => {
    const p = part.trim().replace(/^U\+/i, "");
    if (p.includes("-")) {
      const [a, b] = p.split("-");
      return [parseInt(a, 16), parseInt(b, 16)] as [number, number];
    }
    if (p.includes("?")) return [parseInt(p.replace(/\?/g, "0"), 16), parseInt(p.replace(/\?/g, "F"), 16)] as [number, number];
    const n = parseInt(p, 16);
    return [n, n] as [number, number];
  });
}

function toDataUrl(url: string): Promise<string> {
  let p = dataUrlCache.get(url);
  if (!p) {
    p = fetch(url)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(fr.result as string);
            fr.onerror = rej;
            fr.readAsDataURL(blob);
          }),
      );
    dataUrlCache.set(url, p);
  }
  return p;
}

export async function buildFontEmbedCSS(node: HTMLElement): Promise<string> {
  const families = familiesFromVars(node);
  const codepoints = new Set<number>();
  for (const ch of node.innerText || node.textContent || "") codepoints.add(ch.codePointAt(0)!);
  const rules: CSSFontFaceRule[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let list: CSSRuleList;
    try {
      list = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSFontFaceRule) rules.push(rule);
    }
  }
  const css: string[] = [];
  await Promise.all(
    rules.map(async (rule) => {
      const fam = rule.style.getPropertyValue("font-family").trim().replace(/^['"]|['"]$/g, "");
      if (!families.has(fam)) return;
      const ranges = parseRanges(rule.style.getPropertyValue("unicode-range"));
      let used = false;
      for (const cp of codepoints) {
        if (ranges.some(([a, b]) => cp >= a && cp <= b)) {
          used = true;
          break;
        }
      }
      if (!used) return;
      const src = rule.style.getPropertyValue("src");
      const m = /url\(["']?([^"')]+)["']?\)/.exec(src);
      if (!m) return;
      const abs = new URL(m[1], (rule.parentStyleSheet?.href as string) || location.href).href;
      try {
        const data = await toDataUrl(abs);
        css.push(
          `@font-face{font-family:'${fam}';src:url(${data}) format('woff2');font-weight:${rule.style.getPropertyValue("font-weight") || "400"};font-style:${rule.style.getPropertyValue("font-style") || "normal"};${rule.style.getPropertyValue("unicode-range") ? `unicode-range:${rule.style.getPropertyValue("unicode-range")};` : ""}font-display:block;}`,
        );
      } catch {}
    }),
  );
  return css.join("\n");
}

async function ready(node: HTMLElement) {
  await document.fonts?.ready;
  await Promise.all(
    Array.from(node.querySelectorAll("img")).map((img) => (img.complete ? Promise.resolve() : new Promise((r) => ((img.onload = r), (img.onerror = r))))),
  );
}

export async function renderImage(node: HTMLElement, opts: { type: "jpeg" | "png"; pixelRatio: number; quality?: number }): Promise<string> {
  await ready(node);
  const fontEmbedCSS = await buildFontEmbedCSS(node);
  const common = { pixelRatio: opts.pixelRatio, fontEmbedCSS, backgroundColor: "#ffffff", cacheBust: false, width: 794, height: 1123 };
  return opts.type === "png" ? toPng(node, common) : toJpeg(node, { ...common, quality: opts.quality ?? 0.92 });
}

export async function renderPdf(node: HTMLElement, title: string): Promise<Blob> {
  const jpeg = await renderImage(node, { type: "jpeg", pixelRatio: 2.6, quality: 0.93 });
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  pdf.setProperties({ title, creator: "BiodataKaro" });
  pdf.addImage(jpeg, "JPEG", 0, 0, 210, 297, undefined, "FAST");
  return pdf.output("blob");
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [head, body] = dataUrl.split(",");
  const mime = /data:([^;]+)/.exec(head)?.[1] || "application/octet-stream";
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export function safeFileName(name: string) {
  const base = (name || "my").trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "my";
  return `${base}-biodata`;
}
