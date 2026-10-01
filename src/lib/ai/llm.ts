import "server-only";
import { langInfo } from "../languages";
import type { AboutTexts } from "../schema";
import type { AiInput, AiOutput } from "./types";

const TIMEOUT_MS = 20_000;

const PART_DESC: Record<keyof AboutTexts, string> = {
  aboutMe: "aboutMe: 60-90 words, first person, about the person's nature, education, work and values",
  aboutFamily: "aboutFamily: 40-70 words, first person, about the family (parents, siblings, family type, roots, values)",
  expectations: "expectations: 40-70 words, first person, what kind of life partner they hope for",
};

export function buildPrompt(i: AiInput): string {
  const L = langInfo(i.lang);
  const facts = Object.entries(i.f)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `- ${k}: ${String(v).trim()}`)
    .join("\n");
  return [
    `You write short sections for an Indian marriage biodata (rishta / matrimonial profile).`,
    `Write in ${L.name} (${L.native}) using its native script${i.lang === "en" ? "" : " (proper names, company names and degrees may stay in English letters)"}.`,
    `Tone: ${i.tone === "traditional" ? "traditional, respectful, family-oriented, warm" : "modern, warm, confident, simple everyday language"}.`,
    `Rules: use ONLY the facts given; never invent facts, numbers, hobbies or achievements; no caste, colour or dowry preferences; no emojis; no headings; correct gender grammar for a ${i.f.gender === "female" ? "woman" : i.f.gender === "male" ? "man" : "person"}; natural, polite language that families share on WhatsApp.`,
    `Return ONLY a JSON object with these string keys:`,
    i.parts.map((p) => `- ${PART_DESC[p]}`).join("\n"),
    `Facts:\n${facts || "- (few details given; keep it general)"}`,
    i.notes ? `Extra notes from the person (hobbies / nature):\n${i.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function parseJson(text: string, parts: (keyof AboutTexts)[]): Partial<AboutTexts> | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const obj = JSON.parse(m[0]) as Record<string, unknown>;
    const out: Partial<AboutTexts> = {};
    for (const p of parts) {
      const v = obj[p];
      if (typeof v === "string" && v.trim()) out[p] = v.trim().slice(0, 1200);
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

async function callGemini(prompt: string, key: string): Promise<string> {
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 1500, responseMimeType: "application/json" },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
}

async function callOpenAI(prompt: string, key: string): Promise<string> {
  const model = process.env.OPENAI_MODEL || "gpt-6-luna";
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      input: [
        { role: "system", content: "You are a careful Indian matrimonial biodata writer. Reply with JSON only." },
        { role: "user", content: prompt },
      ],
      text: { format: { type: "json_object" } },
      max_output_tokens: 1500,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { output_text?: string; output?: { content?: { type?: string; text?: string }[] }[] };
  if (data.output_text) return data.output_text;
  return (data.output || []).flatMap((o) => o.content || []).map((c) => c.text || "").join("");
}

export function llmProviderName(): "gemini" | "openai" | null {
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.OPENAI_API_KEY) return "openai";
  return null;
}

/** Tries Gemini first (if key set), then OpenAI. Returns null if no key or every provider failed. */
export async function llmWrite(i: AiInput): Promise<AiOutput | null> {
  const prompt = buildPrompt(i);
  const providers: ["gemini" | "openai", string | undefined][] = [
    ["gemini", process.env.GEMINI_API_KEY],
    ["openai", process.env.OPENAI_API_KEY],
  ];
  for (const [name, key] of providers) {
    if (!key) continue;
    try {
      const raw = name === "gemini" ? await callGemini(prompt, key) : await callOpenAI(prompt, key);
      const texts = parseJson(raw, i.parts);
      if (texts) return { texts, source: name };
      console.warn(`[ai] ${name} returned unparseable output`);
    } catch (e) {
      console.warn(`[ai] ${name} failed:`, (e as Error).message);
    }
  }
  return null;
}
