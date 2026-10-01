import type { LangCode } from "./languages";

export type SectionId = "personal" | "career" | "family" | "contact";
export type FieldKey =
  | "fullName" | "gender" | "dob" | "birthTime" | "birthPlace" | "height" | "complexion" | "bloodGroup"
  | "religion" | "caste" | "subCaste" | "gotra" | "manglik" | "rashi" | "nakshatra" | "maritalStatus" | "diet"
  | "education" | "occupation" | "company" | "income" | "workLocation"
  | "fatherName" | "fatherOccupation" | "motherName" | "motherOccupation" | "brothers" | "sisters"
  | "familyType" | "nativePlace"
  | "contactPerson" | "phone" | "email" | "address";

export type OptionGroup = "gender" | "religion" | "manglik" | "maritalStatus" | "familyType" | "diet";

export interface FieldDef {
  key: FieldKey;
  type: "text" | "date" | "time" | "select" | "height" | "tel" | "email" | "textarea";
  options?: OptionGroup;
  placeholder?: string;
  hint?: string;
  /** Not printed on the biodata (used only for AI / logic). */
  hidden?: boolean;
  wide?: boolean;
  maxLength?: number;
}

export const SECTIONS: { id: SectionId; title: string; fields: FieldDef[] }[] = [
  {
    id: "personal",
    title: "Personal details",
    fields: [
      { key: "fullName", type: "text", placeholder: "e.g. Priya Sharma", wide: true, maxLength: 60 },
      { key: "gender", type: "select", options: "gender", hidden: true },
      { key: "dob", type: "date" },
      { key: "birthTime", type: "time" },
      { key: "birthPlace", type: "text", placeholder: "e.g. Jaipur, Rajasthan", maxLength: 60 },
      { key: "height", type: "height" },
      { key: "complexion", type: "text", placeholder: "e.g. Fair / Wheatish (optional)", maxLength: 30 },
      { key: "bloodGroup", type: "text", placeholder: "e.g. B+ (optional)", maxLength: 6 },
      { key: "religion", type: "select", options: "religion" },
      { key: "caste", type: "text", placeholder: "Optional", maxLength: 40 },
      { key: "subCaste", type: "text", placeholder: "Optional", maxLength: 40 },
      { key: "gotra", type: "text", placeholder: "Optional", maxLength: 40 },
      { key: "manglik", type: "select", options: "manglik" },
      { key: "rashi", type: "text", placeholder: "Optional, e.g. Mesh / Aries", maxLength: 30 },
      { key: "nakshatra", type: "text", placeholder: "Optional, e.g. Rohini", maxLength: 30 },
      { key: "maritalStatus", type: "select", options: "maritalStatus" },
      { key: "diet", type: "select", options: "diet" },
    ],
  },
  {
    id: "career",
    title: "Education & career",
    fields: [
      { key: "education", type: "text", placeholder: "e.g. B.Tech (Computer Science), IIT Delhi", wide: true, maxLength: 120 },
      { key: "occupation", type: "text", placeholder: "e.g. Software Engineer", maxLength: 60 },
      { key: "company", type: "text", placeholder: "e.g. Infosys Ltd.", maxLength: 60 },
      { key: "income", type: "text", placeholder: "e.g. ₹12 LPA (optional)", maxLength: 30 },
      { key: "workLocation", type: "text", placeholder: "e.g. Pune", maxLength: 40 },
    ],
  },
  {
    id: "family",
    title: "Family details",
    fields: [
      { key: "fatherName", type: "text", placeholder: "e.g. Shri Ramesh Sharma", maxLength: 60 },
      { key: "fatherOccupation", type: "text", placeholder: "e.g. Retired Bank Manager", maxLength: 60 },
      { key: "motherName", type: "text", placeholder: "e.g. Smt. Sunita Sharma", maxLength: 60 },
      { key: "motherOccupation", type: "text", placeholder: "e.g. Homemaker", maxLength: 60 },
      { key: "brothers", type: "text", placeholder: "e.g. 1 elder brother (married)", maxLength: 80 },
      { key: "sisters", type: "text", placeholder: "e.g. 1 younger sister (studying)", maxLength: 80 },
      { key: "familyType", type: "select", options: "familyType" },
      { key: "nativePlace", type: "text", placeholder: "e.g. Ajmer, Rajasthan", maxLength: 60 },
    ],
  },
  {
    id: "contact",
    title: "Contact details",
    fields: [
      { key: "contactPerson", type: "text", placeholder: "e.g. Ramesh Sharma (Father)", maxLength: 60 },
      { key: "phone", type: "tel", placeholder: "e.g. +91 98xxxxxx10", maxLength: 40 },
      { key: "email", type: "email", placeholder: "Optional", maxLength: 60 },
      { key: "address", type: "textarea", placeholder: "Optional: city / full address", wide: true, maxLength: 160 },
    ],
  },
];

export const OPTION_VALUES: Record<OptionGroup, string[]> = {
  gender: ["female", "male"],
  religion: ["hindu", "muslim", "sikh", "christian", "jain", "buddhist", "other"],
  manglik: ["no", "yes", "partial"],
  maritalStatus: ["never", "divorced", "widowed"],
  familyType: ["nuclear", "joint"],
  diet: ["veg", "nonveg", "egg"],
};

export interface CustomField {
  id: string;
  label: string;
  value: string;
  section: SectionId;
}

export interface AboutTexts {
  aboutMe: string;
  aboutFamily: string;
  expectations: string;
}

export type Tone = "traditional" | "modern";

export interface Biodata {
  v: 1;
  /** Random id used to bind payment unlock tokens to this biodata. */
  id: string;
  lang: LangCode;
  templateId: string;
  headingPreset: string;
  heading: string;
  showTitle: boolean;
  photo: string | null;
  fields: Partial<Record<FieldKey, string>>;
  about: AboutTexts;
  tone: Tone;
  custom: CustomField[];
  updatedAt: number;
}

export function newBiodataId() {
  const a = new Uint8Array(12);
  crypto.getRandomValues(a);
  return "bd_" + Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function emptyBiodata(): Biodata {
  return {
    v: 1,
    id: newBiodataId(),
    lang: "en",
    templateId: "classic",
    headingPreset: "ganesh-hi",
    heading: "|| श्री गणेशाय नमः ||",
    showTitle: true,
    photo: null,
    fields: { religion: "hindu", maritalStatus: "never" },
    about: { aboutMe: "", aboutFamily: "", expectations: "" },
    tone: "traditional",
    custom: [],
    updatedAt: Date.now(),
  };
}

export function sampleBiodata(): Biodata {
  return {
    ...emptyBiodata(),
    fields: {
      fullName: "Priya Sharma",
      gender: "female",
      dob: "1997-03-14",
      birthTime: "06:45",
      birthPlace: "Jaipur, Rajasthan",
      height: "64",
      complexion: "Fair",
      religion: "hindu",
      caste: "Brahmin",
      gotra: "Bharadwaj",
      manglik: "no",
      rashi: "Meen (Pisces)",
      nakshatra: "Revati",
      maritalStatus: "never",
      diet: "veg",
      education: "MBA (Finance), Symbiosis Pune; B.Com, University of Rajasthan",
      occupation: "Financial Analyst",
      company: "HDFC Bank",
      income: "₹9 LPA",
      workLocation: "Pune",
      fatherName: "Shri Ramesh Sharma",
      fatherOccupation: "Retired Bank Manager",
      motherName: "Smt. Sunita Sharma",
      motherOccupation: "Homemaker",
      brothers: "1 elder brother (married)",
      sisters: "None",
      familyType: "nuclear",
      nativePlace: "Ajmer, Rajasthan",
      contactPerson: "Ramesh Sharma (Father)",
      phone: "+91 98XXXXXX10",
      address: "Malviya Nagar, Jaipur",
    },
  };
}

/** Height stored as total inches ("64"). */
export function formatHeight(v: string | undefined): string {
  const n = Number(v);
  if (!v || !Number.isFinite(n) || n <= 0) return v || "";
  const ft = Math.floor(n / 12);
  const inch = n % 12;
  return `${ft}' ${inch}" (${Math.round(n * 2.54)} cm)`;
}

export const HEIGHT_OPTIONS = Array.from({ length: 37 }, (_, i) => String(48 + i)); // 4'0" to 7'0"
