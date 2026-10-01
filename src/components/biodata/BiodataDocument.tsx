"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { aboutBlocks, buildDocSections } from "@/lib/format";
import { DICTS } from "@/lib/i18n/labels";
import type { Biodata } from "@/lib/schema";
import { BRAND } from "@/lib/site";
import { getTemplate } from "@/lib/templates";
import { NAME_IN_HEADER, TEMPLATE_COMPONENTS, type Block } from "./templates";

export interface BiodataDocumentProps {
  b: Biodata;
  watermark?: false | "free" | "premium";
  className?: string;
}

/** Shrinks (or slightly grows) the type scale so every section fits on one A4 page. */
function fitToPage(root: HTMLElement) {
  const boxes = Array.from(root.querySelectorAll<HTMLElement>("[data-fit]"));
  if (!boxes.length) return;
  const over = () => boxes.some((el) => el.scrollHeight > el.clientHeight + 1);
  let lo = 0.5;
  let hi = 1.08;
  root.style.setProperty("--s", String(hi));
  if (!over()) return;
  let best = lo;
  for (let i = 0; i < 9; i++) {
    const mid = (lo + hi) / 2;
    root.style.setProperty("--s", mid.toFixed(4));
    if (over()) hi = mid;
    else {
      best = mid;
      lo = mid;
    }
  }
  root.style.setProperty("--s", best.toFixed(4));
}

export const BiodataDocument = forwardRef<HTMLDivElement, BiodataDocumentProps>(function BiodataDocument({ b, watermark = false, className }, outer) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(outer, () => ref.current as HTMLDivElement);

  const tpl = getTemplate(b.templateId);
  const dict = DICTS[b.lang];
  const nameInHeader = NAME_IN_HEADER.includes(tpl.id);
  const sections = buildDocSections(b, { skip: nameInHeader ? ["fullName"] : [] });
  const about = aboutBlocks(b);
  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
  const aboutById = Object.fromEntries(about.map((a) => [a.key, a]));
  const order = ["aboutMe", "personal", "career", "family", "aboutFamily", "expectations", "contact"] as const;
  let blocks: Block[] = order
    .map((id) => {
      const s = byId[id];
      if (s) return { id, title: s.title, rows: s.rows } as Block;
      const a = aboutById[id];
      if (a) return { id, title: a.title, text: a.text } as Block;
      return null;
    })
    .filter(Boolean) as Block[];
  let contact: Block | undefined;
  if (tpl.id === "sidebar") {
    contact = blocks.find((x) => x.id === "contact");
    blocks = blocks.filter((x) => x.id !== "contact");
  }
  const Tpl = TEMPLATE_COMPONENTS[tpl.id];
  const deps = JSON.stringify([b.fields, b.about, b.custom, b.templateId, b.lang, b.heading, b.showTitle, !!b.photo]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    fitToPage(el);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled && ref.current) fitToPage(ref.current);
    });
    return () => {
      cancelled = true;
    };
  }, [deps]);

  return (
    <div ref={ref} className={className} lang={b.lang} data-template={tpl.id} data-script={b.lang === "en" ? "latin" : "indic"} style={{ position: "relative", width: 794, height: 1123 }}>
      <Tpl b={b} name={(b.fields.fullName || "").trim()} heading={b.heading} title={dict.title} blocks={blocks} contact={contact} />
      {watermark && <Watermark kind={watermark} dark={tpl.id === "royal"} />}
    </div>
  );
});

function Watermark({ kind, dark }: { kind: "free" | "premium"; dark: boolean }) {
  const text = kind === "premium" ? `PREMIUM DESIGN PREVIEW · ${BRAND}.com` : `Made with ${BRAND}.com`;
  const color = dark ? "rgba(255,255,255,0.13)" : "rgba(60,40,40,0.10)";
  const rows = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div aria-hidden data-watermark style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 50 }}>
      <div style={{ position: "absolute", left: -300, top: -200, width: 1400, height: 1500, transform: "rotate(-30deg)", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        {rows.map((i) => (
          <div key={i} style={{ whiteSpace: "nowrap", color, fontFamily: "var(--font-ui), sans-serif", fontWeight: 700, fontSize: kind === "premium" ? 30 : 34, letterSpacing: "0.08em", marginLeft: (i % 2) * 180 }}>
            {`${text}   ·   ${text}   ·   ${text}`}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.88)", color: dark ? "#fff" : "#444", fontFamily: "var(--font-ui), sans-serif", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.02em", borderTop: dark ? "none" : "1px solid #e5e5e5" }}>
        {kind === "premium" ? `Premium design — unlock to download without watermark on ${BRAND}.com` : `Free biodata made on ${BRAND}.com · Remove watermark from ₹49`}
      </div>
    </div>
  );
}
