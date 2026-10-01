/** Auspicious heading lines shown at the top of the biodata, grouped by religion. */
export interface HeadingPreset {
  id: string;
  text: string;
  group: "hindu" | "muslim" | "sikh" | "christian" | "jain" | "buddhist" | "general";
}

export const HEADINGS: HeadingPreset[] = [
  { id: "ganesh-hi", text: "|| श्री गणेशाय नमः ||", group: "hindu" },
  { id: "ganesh-en", text: "|| Shree Ganeshay Namah ||", group: "hindu" },
  { id: "om-shiv", text: "|| ॐ नमः शिवाय ||", group: "hindu" },
  { id: "krishna", text: "|| जय श्री कृष्ण ||", group: "hindu" },
  { id: "ram", text: "|| जय श्री राम ||", group: "hindu" },
  { id: "radhe", text: "|| राधे राधे ||", group: "hindu" },
  { id: "mata", text: "|| जय माता दी ||", group: "hindu" },
  { id: "swami", text: "|| श्री स्वामी समर्थ ||", group: "hindu" },
  { id: "om", text: "|| ॐ ||", group: "hindu" },
  { id: "ganesh-gu", text: "|| શ્રી ગણેશાય નમઃ ||", group: "hindu" },
  { id: "ganesh-bn", text: "|| শ্রী শ্রী গণেশায় নমঃ ||", group: "hindu" },
  { id: "pillayar-ta", text: "உ  பிள்ளையார் துணை", group: "hindu" },
  { id: "ganesh-te", text: "|| శ్రీ గణేశాయ నమః ||", group: "hindu" },
  { id: "ganesh-kn", text: "|| ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||", group: "hindu" },
  { id: "ganesh-ml", text: "|| ശ്രീ ഗണേശായ നമഃ ||", group: "hindu" },
  { id: "bismillah-ar", text: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", group: "muslim" },
  { id: "bismillah-en", text: "Bismillah-hir-Rahman-nir-Rahim", group: "muslim" },
  { id: "786", text: "786", group: "muslim" },
  { id: "ikonkar", text: "ੴ ਸਤਿ ਨਾਮੁ", group: "sikh" },
  { id: "ikonkar-en", text: "Ik Onkar Satnam", group: "sikh" },
  { id: "waheguru", text: "ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ", group: "sikh" },
  { id: "praise", text: "Praise the Lord", group: "christian" },
  { id: "godislove", text: "God is Love", group: "christian" },
  { id: "navkar", text: "|| णमो अरिहंताणं ||", group: "jain" },
  { id: "jinendra", text: "|| जय जिनेन्द्र ||", group: "jain" },
  { id: "buddha", text: "|| नमो बुद्धाय ||", group: "buddhist" },
  { id: "buddha-en", text: "Namo Buddhaya", group: "buddhist" },
  { id: "blessings", text: "With the blessings of God", group: "general" },
];

export const HEADING_GROUP_LABEL: Record<HeadingPreset["group"], string> = {
  hindu: "Hindu",
  muslim: "Muslim",
  sikh: "Sikh",
  christian: "Christian",
  jain: "Jain",
  buddhist: "Buddhist",
  general: "General",
};

const DEFAULT_BY_RELIGION: Record<string, string> = {
  hindu: "ganesh-hi",
  muslim: "bismillah-ar",
  sikh: "ikonkar",
  christian: "praise",
  jain: "navkar",
  buddhist: "buddha",
  other: "blessings",
};
const HINDU_BY_LANG: Record<string, string> = { gu: "ganesh-gu", bn: "ganesh-bn", ta: "pillayar-ta", te: "ganesh-te", kn: "ganesh-kn", ml: "ganesh-ml", en: "ganesh-hi" };

export function defaultHeading(religion: string | undefined, lang: string): HeadingPreset {
  let id = DEFAULT_BY_RELIGION[religion || "hindu"] || "blessings";
  if ((religion || "hindu") === "hindu" && HINDU_BY_LANG[lang]) id = HINDU_BY_LANG[lang];
  return HEADINGS.find((h) => h.id === id)!;
}
