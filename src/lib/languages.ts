export const LANGS = [
  { code: "en", name: "English", native: "English", locale: "en-IN" },
  { code: "hi", name: "Hindi", native: "हिन्दी", locale: "hi-IN" },
  { code: "mr", name: "Marathi", native: "मराठी", locale: "mr-IN" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", locale: "gu-IN" },
  { code: "bn", name: "Bengali", native: "বাংলা", locale: "bn-IN" },
  { code: "ta", name: "Tamil", native: "தமிழ்", locale: "ta-IN" },
  { code: "te", name: "Telugu", native: "తెలుగు", locale: "te-IN" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", locale: "kn-IN" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", locale: "pa-IN" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", locale: "ml-IN" },
] as const;

export type LangCode = (typeof LANGS)[number]["code"];
export const LANG_CODES = LANGS.map((l) => l.code) as LangCode[];
export function isLang(x: unknown): x is LangCode {
  return typeof x === "string" && (LANG_CODES as string[]).includes(x);
}
export function langInfo(code: LangCode) {
  return LANGS.find((l) => l.code === code)!;
}

/** Font stacks: Latin face first, then every Indic script face so mixed-script text renders correctly. */
const SCRIPT_STACK =
  "var(--font-deva-sans), var(--font-guj), var(--font-beng), var(--font-taml), var(--font-telu), var(--font-knda), var(--font-guru), var(--font-mlym), var(--font-arab)";
export const FONT_STACK = {
  sans: `var(--font-ui), ${SCRIPT_STACK}, system-ui, sans-serif`,
  serif: `var(--font-serif), var(--font-deva-serif), ${SCRIPT_STACK}, Georgia, serif`,
  display: `var(--font-display), var(--font-deva-serif), ${SCRIPT_STACK}, Georgia, serif`,
};
