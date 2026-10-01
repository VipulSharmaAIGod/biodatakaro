import {
  Noto_Sans,
  Noto_Serif,
  Playfair_Display,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Bengali,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Malayalam,
  Noto_Naskh_Arabic,
} from "next/font/google";

/* Site UI fonts (loaded everywhere). Indic faces only download when a glyph needs them (unicode-range). */
export const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-ui", display: "swap" });
export const notoSansDeva = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-deva-sans", display: "swap", preload: false });
export const notoSansGuj = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--font-guj", display: "swap", preload: false });

/* Document fonts (biodata maker only). */
export const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", preload: false });
export const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap", preload: false });
export const notoSerifDeva = Noto_Serif_Devanagari({ subsets: ["devanagari"], variable: "--font-deva-serif", display: "swap", preload: false });
export const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-beng", display: "swap", preload: false });
export const notoTamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-taml", display: "swap", preload: false });
export const notoTelugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-telu", display: "swap", preload: false });
export const notoKannada = Noto_Sans_Kannada({ subsets: ["kannada"], variable: "--font-knda", display: "swap", preload: false });
export const notoGurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], variable: "--font-guru", display: "swap", preload: false });
export const notoMalayalam = Noto_Sans_Malayalam({ subsets: ["malayalam"], variable: "--font-mlym", display: "swap", preload: false });
export const notoArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arab", display: "swap", preload: false });

export const siteFontVars = [notoSans.variable, notoSansDeva.variable, notoSansGuj.variable].join(" ");

export const docFontVars = [
  notoSerif.variable,
  playfair.variable,
  notoSerifDeva.variable,
  notoBengali.variable,
  notoTamil.variable,
  notoTelugu.variable,
  notoKannada.variable,
  notoGurmukhi.variable,
  notoMalayalam.variable,
  notoArabic.variable,
].join(" ");
