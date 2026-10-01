import type { LangCode } from "../languages";
import type { AboutTexts, Tone } from "../schema";

export type AiPart = keyof AboutTexts;

/** Only non-sensitive text fields are sent to the AI (never photo, phone, email or address). */
export interface AiInput {
  lang: LangCode;
  tone: Tone;
  parts: AiPart[];
  notes?: string;
  f: {
    fullName?: string;
    gender?: string;
    birthPlace?: string;
    religion?: string;
    education?: string;
    occupation?: string;
    company?: string;
    workLocation?: string;
    income?: string;
    fatherName?: string;
    fatherOccupation?: string;
    motherName?: string;
    motherOccupation?: string;
    brothers?: string;
    sisters?: string;
    familyType?: string;
    nativePlace?: string;
    diet?: string;
    height?: string;
  };
}

export interface AiOutput {
  texts: Partial<AboutTexts>;
  source: "gemini" | "openai" | "template";
  note?: string;
}

export const AI_FIELD_KEYS = [
  "fullName", "gender", "birthPlace", "religion", "education", "occupation", "company", "workLocation", "income",
  "fatherName", "fatherOccupation", "motherName", "motherOccupation", "brothers", "sisters", "familyType", "nativePlace", "diet", "height",
] as const;
