import { SAMPLE_VALUES } from "@/content/samples";
import { DICTS } from "@/lib/i18n/labels";
import { defaultHeading } from "@/lib/headings";
import type { LangCode } from "@/lib/languages";

const GROUPS = [
  { id: "personal", keys: ["fullName", "dob", "birthTime", "birthPlace", "height", "religion", "caste", "gotra", "manglik", "rashi", "nakshatra"] },
  { id: "career", keys: ["education", "occupation", "income"] },
  { id: "family", keys: ["fatherName", "motherName", "brothers", "sisters", "familyType", "nativePlace"] },
  { id: "contact", keys: ["contactPerson", "phone"] },
] as const;

export function SampleTable({ lang, gender, caption }: { lang: LangCode; gender: "girl" | "boy"; caption: string }) {
  const d = DICTS[lang];
  const v = SAMPLE_VALUES[lang]?.[gender] || SAMPLE_VALUES.en![gender];
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm" lang={lang}>
      <div className="bg-brand px-4 py-3 text-center text-white">
        <div className="text-[14px] opacity-90">{defaultHeading("hindu", lang).text}</div>
        <div className="text-[18px] font-bold">{d.title}</div>
      </div>
      <table className="w-full text-[14.5px]">
        <caption className="sr-only">{caption}</caption>
        {GROUPS.map((g) => (
          <tbody key={g.id}>
            <tr>
              <th colSpan={2} scope="colgroup" className="bg-amber-50 px-4 py-2 text-left text-[14px] font-bold text-brand">
                {d.sections[g.id]}
              </th>
            </tr>
            {g.keys
              .filter((k) => v[k])
              .map((k) => (
                <tr key={k} className="border-t border-stone-100">
                  <th scope="row" className="w-[42%] px-4 py-1.5 text-left font-semibold text-stone-700">
                    {d.fields[k]}
                  </th>
                  <td className="px-4 py-1.5 text-stone-800">{v[k]}</td>
                </tr>
              ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
