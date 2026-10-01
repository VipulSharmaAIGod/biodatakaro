"use client";
import { useState } from "react";
import { track } from "@/lib/analytics/client";
import { DICTS } from "@/lib/i18n/labels";
import { HEADINGS, HEADING_GROUP_LABEL, defaultHeading } from "@/lib/headings";
import { LANGS, type LangCode } from "@/lib/languages";
import { HEIGHT_OPTIONS, OPTION_VALUES, SECTIONS, formatHeight, type Biodata, type FieldDef, type SectionId, type Tone } from "@/lib/schema";
import { TEMPLATES } from "@/lib/templates";
import { ScaledDocument } from "./ScaledDocument";
import { PhotoField } from "./PhotoCropper";
import { Button, Card, Label, Segmented, Spinner, inputCls } from "./ui";

export type Update = (fn: (b: Biodata) => Biodata) => void;

/* ============================== Details ============================== */

function FieldInput({ def, b, update }: { def: FieldDef; b: Biodata; update: Update }) {
  const id = `f-${def.key}`;
  const value = b.fields[def.key] || "";
  const set = (v: string) =>
    update((x) => {
      const next = { ...x, fields: { ...x.fields, [def.key]: v } };
      if (def.key === "religion" && x.headingPreset !== "custom" && x.headingPreset !== "none") {
        const h = defaultHeading(v, x.lang);
        return { ...next, headingPreset: h.id, heading: h.text };
      }
      return next;
    });
  const dict = DICTS[b.lang];
  const en = DICTS.en;
  const label = def.key === "gender" ? "Gender" : en.fields[def.key as keyof typeof en.fields];
  const hint = b.lang !== "en" && def.key !== "gender" ? dict.fields[def.key as keyof typeof dict.fields] : undefined;

  let control: React.ReactNode;
  if (def.type === "select" && def.options) {
    const group = def.options;
    control = (
      <select id={id} className={inputCls} value={value} onChange={(e) => set(e.target.value)}>
        <option value="">— Select —</option>
        {OPTION_VALUES[group].map((v) => {
          const e = en.options[group][v];
          const l = dict.options[group][v];
          const show = (x: string | [string, string] | undefined) => (Array.isArray(x) ? x.join(" / ") : x);
          return (
            <option key={v} value={v}>
              {show(e)}
              {b.lang !== "en" && l ? ` · ${show(l)}` : ""}
            </option>
          );
        })}
      </select>
    );
  } else if (def.type === "height") {
    control = (
      <select id={id} className={inputCls} value={value} onChange={(e) => set(e.target.value)}>
        <option value="">— Select —</option>
        {HEIGHT_OPTIONS.map((h) => (
          <option key={h} value={h}>
            {formatHeight(h)}
          </option>
        ))}
      </select>
    );
  } else if (def.type === "textarea") {
    control = <textarea id={id} className={`${inputCls} min-h-20`} value={value} maxLength={def.maxLength} placeholder={def.placeholder} onChange={(e) => set(e.target.value)} />;
  } else {
    control = (
      <input
        id={id}
        className={inputCls}
        type={def.type === "tel" ? "tel" : def.type}
        inputMode={def.type === "tel" ? "tel" : undefined}
        autoComplete={def.key === "fullName" ? "name" : def.type === "email" ? "email" : "off"}
        value={value}
        maxLength={def.maxLength}
        placeholder={def.placeholder}
        onChange={(e) => set(e.target.value)}
      />
    );
  }
  return (
    <div className={def.wide ? "sm:col-span-2" : ""}>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      {control}
    </div>
  );
}

export function DetailsStep({ b, update }: { b: Biodata; update: Update }) {
  const addCustom = (section: SectionId) =>
    update((x) => ({ ...x, custom: [...x.custom, { id: Math.random().toString(36).slice(2, 9), label: "", value: "", section }] }));
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="lang">Biodata language</Label>
            <select
              id="lang"
              className={inputCls}
              value={b.lang}
              onChange={(e) => {
                const lang = e.target.value as LangCode;
                update((x) => {
                  const keepHeading = x.headingPreset === "custom" || x.headingPreset === "none";
                  const h = defaultHeading(x.fields.religion, lang);
                  return { ...x, lang, ...(keepHeading ? {} : { headingPreset: h.id, heading: h.text }) };
                });
              }}
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
            <p className="mt-1 text-[12px] text-stone-500">Labels on the biodata appear in this language. Type values in any language.</p>
          </div>
          <div>
            <Label>Biodata for</Label>
            <Segmented
              name="Biodata for"
              value={(b.fields.gender as "female" | "male") || ("" as "female")}
              onChange={(v) => update((x) => ({ ...x, fields: { ...x.fields, gender: v } }))}
              options={[
                { value: "female", label: "Girl" },
                { value: "male", label: "Boy" },
              ]}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Photo</Label>
            <PhotoField value={b.photo} onChange={(photo) => update((x) => ({ ...x, photo }))} />
          </div>
        </div>
      </Card>

      {SECTIONS.map((s) => (
        <Card key={s.id}>
          <h3 className="mb-3 text-[17px] font-bold text-stone-900">
            {s.title}
            {b.lang !== "en" && <span className="ml-2 text-[14px] font-medium text-stone-500">{DICTS[b.lang].sections[s.id]}</span>}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.fields.filter((f) => f.key !== "gender").map((f) => (
              <FieldInput key={f.key} def={f} b={b} update={update} />
            ))}
          </div>
          {b.custom.filter((c) => c.section === s.id).length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {b.custom
                .filter((c) => c.section === s.id)
                .map((c) => (
                  <div key={c.id} className="grid grid-cols-[1fr_1.4fr_auto] gap-2">
                    <input
                      aria-label="Custom field label"
                      className={inputCls}
                      placeholder="Label (e.g. Hobbies)"
                      maxLength={40}
                      value={c.label}
                      onChange={(e) => update((x) => ({ ...x, custom: x.custom.map((y) => (y.id === c.id ? { ...y, label: e.target.value } : y)) }))}
                    />
                    <input
                      aria-label="Custom field value"
                      className={inputCls}
                      placeholder="Value"
                      maxLength={120}
                      value={c.value}
                      onChange={(e) => update((x) => ({ ...x, custom: x.custom.map((y) => (y.id === c.id ? { ...y, value: e.target.value } : y)) }))}
                    />
                    <button type="button" aria-label="Remove field" className="grid w-10 place-items-center rounded-xl text-xl text-stone-500 hover:bg-stone-100" onClick={() => update((x) => ({ ...x, custom: x.custom.filter((y) => y.id !== c.id) }))}>
                      ×
                    </button>
                  </div>
                ))}
            </div>
          )}
          <button type="button" className="mt-3 text-[14px] font-semibold text-brand" onClick={() => addCustom(s.id)}>
            + Add custom field
          </button>
        </Card>
      ))}
    </div>
  );
}

/* ============================== About (AI) ============================== */

/** Rough script detection so we can warn when the About text doesn't match the chosen language. */
const SCRIPT_RE: Record<string, RegExp> = {
  en: /[A-Za-z]/g, hi: /[\u0900-\u097F]/g, mr: /[\u0900-\u097F]/g, gu: /[\u0A80-\u0AFF]/g, bn: /[\u0980-\u09FF]/g, ta: /[\u0B80-\u0BFF]/g,
  te: /[\u0C00-\u0C7F]/g, kn: /[\u0C80-\u0CFF]/g, pa: /[\u0A00-\u0A7F]/g, ml: /[\u0D00-\u0D7F]/g,
};
function scriptMismatch(text: string, lang: string): boolean {
  const t = text.replace(/\s/g, "");
  if (t.length < 30) return false;
  const re = SCRIPT_RE[lang];
  if (!re) return false;
  const share = (t.match(re)?.length ?? 0) / t.length;
  // English names/companies are common inside Indic text, so only flag when very little of the text is in the expected script.
  return lang === "en" ? share < 0.3 : share < 0.15;
}

const PART_LABEL = { aboutMe: "About me", aboutFamily: "About family", expectations: "Partner expectations" } as const;
type Part = keyof typeof PART_LABEL;

export function AboutStep({ b, update }: { b: Biodata; update: Update }) {
  const [parts, setParts] = useState<Part[]>(["aboutMe", "aboutFamily", "expectations"]);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null);
  const dict = DICTS[b.lang];

  const generate = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const f = b.fields;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lang: b.lang,
          tone: b.tone,
          parts,
          notes,
          f: {
            fullName: f.fullName, gender: f.gender, birthPlace: f.birthPlace, religion: f.religion, education: f.education, occupation: f.occupation, company: f.company,
            workLocation: f.workLocation, income: f.income, fatherName: f.fatherName, fatherOccupation: f.fatherOccupation, motherName: f.motherName,
            motherOccupation: f.motherOccupation, brothers: f.brothers, sisters: f.sisters, familyType: f.familyType, nativePlace: f.nativePlace, diet: f.diet,
            height: f.height ? formatHeight(f.height) : undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not write text");
      update((x) => ({ ...x, about: { ...x.about, ...data.texts } }));
      track("ai_generate", { lang: b.lang, tone: b.tone, src: data.source || "unknown", parts: parts.length });
      setMsg({
        kind: data.note ? "info" : "ok",
        text: data.note || (data.source === "template" ? "Draft written. Edit it to make it yours." : "AI draft ready. Read it and edit anything that isn't right."),
      });
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h3 className="text-[17px] font-bold text-stone-900">Write with AI ✨</h3>
        <p className="mt-1 text-[14px] text-stone-600">
          We use your details to write warm, respectful paragraphs in <b>{LANGS.find((l) => l.code === b.lang)?.native}</b>. You can edit everything afterwards.
        </p>
        <div className="mt-4 grid gap-4">
          <div>
            <Label>Tone</Label>
            <Segmented<Tone>
              name="Tone"
              value={b.tone}
              onChange={(tone) => update((x) => ({ ...x, tone }))}
              options={[
                { value: "traditional", label: "Traditional" },
                { value: "modern", label: "Modern" },
              ]}
            />
          </div>
          <div>
            <Label htmlFor="notes" hint="optional">
              Hobbies / nature (a few words)
            </Label>
            <input id="notes" className={inputCls} maxLength={200} placeholder="e.g. reading, cooking, travelling; calm and caring" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <fieldset>
            <legend className="mb-1 text-[13px] font-semibold text-stone-700">Write these sections</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PART_LABEL) as Part[]).map((p) => (
                <label key={p} className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-3 text-[14px] ${parts.includes(p) ? "border-brand bg-brand/5 text-brand" : "border-stone-300 text-stone-600"}`}>
                  <input type="checkbox" className="accent-[#7a1f2b]" checked={parts.includes(p)} onChange={(e) => setParts((x) => (e.target.checked ? [...x, p] : x.filter((y) => y !== p)))} />
                  {PART_LABEL[p]}
                </label>
              ))}
            </div>
          </fieldset>
          {scriptMismatch(b.about.aboutMe, b.lang) && (
            <p className="rounded-xl bg-amber-50 p-3 text-[13px] text-amber-900" data-testid="lang-mismatch">
              Your About text seems to be in a different language from {LANGS.find((l) => l.code === b.lang)?.name}. Tap “Rewrite with AI” to write it again, or edit it below.
            </p>
          )}
          {!b.fields.gender && <p className="rounded-xl bg-amber-50 p-3 text-[13px] text-amber-900">Tip: choose Girl or Boy on the Details step so the grammar is correct.</p>}
          <Button onClick={generate} disabled={busy || !parts.length} data-testid="ai-generate">
            {busy ? <Spinner /> : "✨"} {busy ? "Writing…" : b.about.aboutMe ? "Rewrite with AI" : "Write with AI"}
          </Button>
          {msg && (
            <p role="status" className={`rounded-xl p-3 text-[13px] ${msg.kind === "err" ? "bg-red-50 text-red-800" : msg.kind === "info" ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>
              {msg.text}
            </p>
          )}
        </div>
      </Card>
      {(Object.keys(PART_LABEL) as Part[]).map((p) => (
        <Card key={p}>
          <Label htmlFor={`about-${p}`} hint={b.lang !== "en" ? dict.sections[p] : undefined}>
            {PART_LABEL[p]}
          </Label>
          <textarea
            id={`about-${p}`}
            className={`${inputCls} min-h-32 leading-relaxed`}
            maxLength={1200}
            placeholder={p === "aboutMe" ? "Write a few lines, or tap “Write with AI”" : "Optional"}
            value={b.about[p]}
            onChange={(e) => update((x) => ({ ...x, about: { ...x.about, [p]: e.target.value } }))}
          />
          <div className="mt-1 flex justify-between text-[12px] text-stone-500">
            <span>Leave empty to hide this section.</span>
            <span>{b.about[p].length}/1200</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ============================== Design ============================== */

export function DesignStep({ b, update, ownedTier }: { b: Biodata; update: Update; ownedTier: "basic" | "premium" | null }) {
  const groups = Object.keys(HEADING_GROUP_LABEL) as (keyof typeof HEADING_GROUP_LABEL)[];
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h3 className="mb-3 text-[17px] font-bold text-stone-900">Choose a design</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEMPLATES.map((t) => {
            const active = b.templateId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                data-testid={`tpl-${t.id}`}
                onClick={() => update((x) => ({ ...x, templateId: t.id }))}
                className={`group relative rounded-2xl border-2 p-1.5 text-left transition ${active ? "border-brand ring-2 ring-brand/20" : "border-stone-200 hover:border-stone-400"}`}
                aria-pressed={active}
              >
                <div className="pointer-events-none overflow-hidden rounded-xl">
                  <ScaledDocument b={{ ...b, templateId: t.id }} shadow={false} />
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-1 px-1 pb-0.5">
                  <span className="truncate text-[13px] font-semibold text-stone-800">{t.name}</span>
                  {t.premium ? (
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${ownedTier === "premium" ? "bg-emerald-100 text-emerald-800" : "bg-gold/20 text-amber-900"}`}>
                      {ownedTier === "premium" ? "UNLOCKED" : "PREMIUM"}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">FREE</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
      <Card>
        <h3 className="mb-3 text-[17px] font-bold text-stone-900">Heading line</h3>
        <select
          aria-label="Heading line"
          className={inputCls}
          value={b.headingPreset}
          onChange={(e) => {
            const id = e.target.value;
            const h = HEADINGS.find((x) => x.id === id);
            update((x) => ({ ...x, headingPreset: id, heading: id === "none" ? "" : id === "custom" ? x.heading : h?.text || "" }));
          }}
        >
          {groups.map((g) => (
            <optgroup key={g} label={HEADING_GROUP_LABEL[g]}>
              {HEADINGS.filter((h) => h.group === g).map((h) => (
                <option key={h.id} value={h.id}>
                  {h.text}
                </option>
              ))}
            </optgroup>
          ))}
          <optgroup label="Other">
            <option value="custom">Custom text…</option>
            <option value="none">No heading</option>
          </optgroup>
        </select>
        {b.headingPreset === "custom" && (
          <input className={`${inputCls} mt-2`} maxLength={70} placeholder="Type your heading" value={b.heading} onChange={(e) => update((x) => ({ ...x, heading: e.target.value }))} />
        )}
        <label className="mt-3 flex items-center gap-2 text-[14px] text-stone-700">
          <input type="checkbox" className="h-4 w-4 accent-[#7a1f2b]" checked={b.showTitle} onChange={(e) => update((x) => ({ ...x, showTitle: e.target.checked }))} />
          Show title “{DICTS[b.lang].title}”
        </label>
      </Card>
    </div>
  );
}
