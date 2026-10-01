"use client";
import { useSearchParams } from "next/navigation";
import { BiodataDocument } from "@/components/biodata/BiodataDocument";
import { templateWrite } from "@/lib/ai/fallback";
import { defaultHeading } from "@/lib/headings";
import { isLang } from "@/lib/languages";
import { sampleBiodata } from "@/lib/schema";

const PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f3e3d3'/><stop offset='1' stop-color='#d9bfa6'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><circle cx='200' cy='190' r='86' fill='#8d6748'/><path d='M60 500c10-120 80-180 140-180s130 60 140 180z' fill='#7a1f2b'/><path d='M114 170c0-70 40-110 86-110s86 40 86 110c-20-40-50-56-86-56s-66 16-86 56z' fill='#2b1d16'/></svg>`,
  );

export function PreviewClient() {
  const q = useSearchParams();
  const lang = isLang(q.get("lang")) ? (q.get("lang") as "en") : "en";
  const b = sampleBiodata();
  b.lang = lang;
  b.templateId = q.get("tpl") || "classic";
  if (q.get("photo") !== "0") b.photo = PHOTO;
  const h = defaultHeading(b.fields.religion, lang);
  b.heading = h.text;
  const f = b.fields;
  const t = templateWrite({ lang, tone: "traditional", parts: ["aboutMe", "aboutFamily", "expectations"], f: { ...f, height: undefined } });
  b.about = { aboutMe: t.texts.aboutMe || "", aboutFamily: q.get("full") === "1" ? t.texts.aboutFamily || "" : "", expectations: t.texts.expectations || "" };
  const wm = q.get("wm");
  return (
    <div style={{ padding: 0, background: "#fff" }}>
      <div id="doc" style={{ width: 794, height: 1123 }}>
        <BiodataDocument b={b} watermark={wm === "free" || wm === "premium" ? wm : false} />
      </div>
    </div>
  );
}
