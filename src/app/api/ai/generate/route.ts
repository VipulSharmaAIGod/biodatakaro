import { NextResponse } from "next/server";
import { templateWrite } from "@/lib/ai/fallback";
import { llmProviderName, llmWrite } from "@/lib/ai/llm";
import { AI_FIELD_KEYS, type AiInput, type AiPart } from "@/lib/ai/types";
import { isLang } from "@/lib/languages";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PARTS: AiPart[] = ["aboutMe", "aboutFamily", "expectations"];
const PER_MIN = Number(process.env.AI_RATE_LIMIT_PER_MIN || 6);
const PER_DAY = Number(process.env.AI_RATE_LIMIT_PER_DAY || 40);

export async function POST(req: Request) {
  const ip = clientIp(req);
  const minute = rateLimit(`ai:m:${ip}`, PER_MIN, 60_000);
  const day = minute.ok ? rateLimit(`ai:d:${ip}`, PER_DAY, 86_400_000) : minute;
  if (!minute.ok || !day.ok) {
    const retry = Math.max(minute.retryAfter, day.retryAfter);
    return NextResponse.json({ error: `Too many requests. Please try again in ${retry > 120 ? Math.ceil(retry / 60) + " minutes" : retry + " seconds"}.` }, { status: 429, headers: { "retry-after": String(retry) } });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 8000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lang = isLang(body.lang) ? body.lang : "en";
  const tone = body.tone === "modern" ? "modern" : "traditional";
  const parts = Array.isArray(body.parts) ? (body.parts.filter((p) => PARTS.includes(p as AiPart)) as AiPart[]) : PARTS;
  const fIn = (body.f && typeof body.f === "object" ? body.f : {}) as Record<string, unknown>;
  const f: AiInput["f"] = {};
  for (const k of AI_FIELD_KEYS) {
    const v = fIn[k];
    if (typeof v === "string" && v.trim()) f[k] = v.trim().slice(0, 140);
  }
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 300) : undefined;
  const input: AiInput = { lang, tone, parts: parts.length ? parts : PARTS, f, notes };

  if (llmProviderName()) {
    const out = await llmWrite(input);
    if (out) return NextResponse.json(out);
    const fb = templateWrite(input);
    return NextResponse.json({ ...fb, note: [fb.note, "AI service was busy, so the built-in writer was used."].filter(Boolean).join(" ") });
  }
  return NextResponse.json(templateWrite(input));
}
