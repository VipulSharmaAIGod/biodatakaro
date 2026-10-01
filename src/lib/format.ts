import { DICTS, optionLabel } from "./i18n/labels";
import { langInfo, type LangCode } from "./languages";
import { SECTIONS, formatHeight, type Biodata, type FieldKey, type SectionId } from "./schema";

export interface Row {
  label: string;
  value: string;
}
export interface DocSection {
  id: SectionId | "other";
  title: string;
  rows: Row[];
}

function formatDate(v: string, lang: LangCode) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return v;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  try {
    return new Intl.DateTimeFormat(langInfo(lang).locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC", numberingSystem: "latn" }).format(d);
  } catch {
    return `${m[3]}-${m[2]}-${m[1]}`;
  }
}

function formatTime(v: string, lang: LangCode) {
  const m = /^(\d{2}):(\d{2})$/.exec(v);
  if (!m) return v;
  const d = new Date(Date.UTC(2000, 0, 1, +m[1], +m[2]));
  try {
    return new Intl.DateTimeFormat(langInfo(lang).locale, { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "UTC", numberingSystem: "latn" }).format(d);
  } catch {
    return v;
  }
}

export function displayValue(b: Biodata, key: FieldKey): string {
  const raw = (b.fields[key] || "").trim();
  if (!raw) return "";
  const def = SECTIONS.flatMap((s) => s.fields).find((f) => f.key === key);
  if (def?.type === "date") return formatDate(raw, b.lang);
  if (def?.type === "time") return formatTime(raw, b.lang);
  if (def?.type === "height") return formatHeight(raw);
  if (def?.type === "select" && def.options) return optionLabel(b.lang, def.options, raw, b.fields.gender);
  return raw;
}

/** Turns biodata into printable sections (empty fields are skipped). */
export function buildDocSections(b: Biodata, opts: { skip?: FieldKey[] } = {}): DocSection[] {
  const dict = DICTS[b.lang];
  const out: DocSection[] = [];
  for (const s of SECTIONS) {
    const rows: Row[] = [];
    for (const f of s.fields) {
      if (f.hidden || opts.skip?.includes(f.key)) continue;
      const v = displayValue(b, f.key);
      if (v) rows.push({ label: dict.fields[f.key as Exclude<FieldKey, "gender">], value: v });
    }
    for (const c of b.custom) {
      if (c.section === s.id && c.label.trim() && c.value.trim()) rows.push({ label: c.label.trim(), value: c.value.trim() });
    }
    if (rows.length) out.push({ id: s.id, title: dict.sections[s.id], rows });
  }
  return out;
}

export function aboutBlocks(b: Biodata): { key: "aboutMe" | "aboutFamily" | "expectations"; title: string; text: string }[] {
  const dict = DICTS[b.lang];
  return (["aboutMe", "aboutFamily", "expectations"] as const)
    .map((k) => ({ key: k, title: dict.sections[k], text: (b.about[k] || "").trim() }))
    .filter((x) => x.text);
}
