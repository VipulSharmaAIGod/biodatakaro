/**
 * Template-based "AI" writer used when no LLM key is configured (or the LLM fails).
 * Supports English, Hindi, Marathi and Gujarati with traditional / modern tones.
 */
import type { AboutTexts } from "../schema";
import type { AiInput, AiOutput } from "./types";

const FALLBACK_LANGS = ["en", "hi", "mr", "gu"] as const;
type FL = (typeof FALLBACK_LANGS)[number];

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const clean = (s?: string) => (s || "").replace(/\s+/g, " ").trim();
const isNone = (s?: string) => !clean(s) || /^(none|nil|no|0|na|n\/a|-|नहीं|कोई नहीं|नाही|ના|નથી)$/i.test(clean(s));
const firstName = (n?: string) => clean(n);
const sentence = (s: string) => (s ? s.replace(/\s+([,.।])/g, "$1") : "");
const article = (w: string) => (/^[aeiou]/i.test(w) ? "an" : "a");

function joinPlace(company?: string, loc?: string, sep = ", ") {
  return [clean(company), clean(loc)].filter(Boolean).join(sep);
}

function siblingsEn(b?: string, s?: string) {
  const fmt = (v: string, word: string) => (/^\d+$/.test(v) ? `${v} ${word}${v === "1" ? "" : "s"}` : v);
  const parts = [!isNone(b) ? fmt(clean(b), "brother") : "", !isNone(s) ? fmt(clean(s), "sister") : ""].filter(Boolean);
  if (!parts.length) return "";
  const natural = parts.every((p) => /^(\d|a |an |one|two|three|1|2|3)/i.test(p));
  return natural ? `I have ${parts.join(" and ")}.` : `Siblings: ${parts.join("; ")}.`;
}

// ---------------- English ----------------
function en(i: AiInput): AboutTexts {
  const f = i.f;
  const trad = i.tone === "traditional";
  const name = firstName(f.fullName);
  const traits = trad
    ? pick(["simple, caring and family-oriented", "soft-spoken, respectful and responsible", "calm, sincere and deeply rooted in family values"])
    : pick(["cheerful, ambitious and easy-going", "independent, curious and warm-hearted", "positive, driven and fun-loving"]);
  const me: string[] = [];
  me.push(name ? `I am ${name}${f.birthPlace ? `, born and brought up in ${clean(f.birthPlace)}` : ""}.` : f.birthPlace ? `I was born and brought up in ${clean(f.birthPlace)}.` : "");
  if (f.education) me.push(`I have completed ${clean(f.education)}.`);
  if (f.occupation) {
    const where = joinPlace(f.company, f.workLocation);
    me.push(`I am currently working as ${article(clean(f.occupation))} ${clean(f.occupation)}${where ? ` at ${where}` : ""}.`);
  }
  me.push(`By nature I am ${traits}.`);
  if (i.notes) me.push(`In my free time I enjoy ${clean(i.notes).replace(/\.$/, "")}.`);
  me.push(
    trad
      ? pick([
          "I respect our traditions and elders, and I believe in balancing career and family life with equal dedication.",
          "I value our culture and family bonds, and I look forward to building a happy home filled with love and respect.",
        ])
      : pick([
          "I believe in honest communication, mutual respect and growing together while enjoying life's little moments.",
          "I balance a modern outlook with strong family values, and I look forward to a partnership built on friendship and trust.",
        ]),
  );

  const fam: string[] = [];
  const ft = f.familyType === "joint" ? "joint" : f.familyType === "nuclear" ? "close-knit nuclear" : "";
  fam.push(
    `We are ${ft ? `${article(ft)} ${ft}` : "a warm and"} family${f.nativePlace ? ` originally from ${clean(f.nativePlace)}` : ""}, ${trad ? "with strong cultural values and deep respect for traditions" : "with a modern outlook and strong values"}.`,
  );
  if (f.fatherName) fam.push(`My father, ${clean(f.fatherName)}${f.fatherOccupation ? `, is ${article(clean(f.fatherOccupation))} ${clean(f.fatherOccupation)}` : ""}.`.replace(/, \.$/, "."));
  if (f.motherName) fam.push(`My mother, ${clean(f.motherName)}${f.motherOccupation ? `, is ${article(clean(f.motherOccupation))} ${clean(f.motherOccupation)}` : ""}.`);
  const sib = siblingsEn(f.brothers, f.sisters);
  if (sib) fam.push(sib);
  fam.push(trad ? "Our family believes in simplicity, honesty and togetherness." : "Ours is a supportive, fun-loving family that values education and togetherness.");

  const exp = trad
    ? pick([
        "I am looking for a well-educated, understanding and family-oriented partner who respects elders and values our traditions, and with whom I can build a life based on mutual respect, trust and companionship.",
        "I wish to marry a caring, honest and cultured person from a good family, who values relationships and will walk with me through life's journey with patience and understanding.",
      ])
    : pick([
        "I am looking for a kind, emotionally mature and supportive partner who values honesty and open communication, has a positive outlook on life, and is ready to grow together as equals.",
        "I hope to find a partner who is a best friend first — someone ambitious yet grounded, who respects family, enjoys life's simple joys, and believes in building a home together as a team.",
      ]);
  return { aboutMe: sentence(me.filter(Boolean).join(" ")), aboutFamily: sentence(fam.join(" ")), expectations: exp };
}

// ---------------- Hindi ----------------
function hi(i: AiInput): AboutTexts {
  const f = i.f;
  const fem = f.gender === "female";
  const g = (m: string, w: string) => (fem ? w : m);
  const trad = i.tone === "traditional";
  const me: string[] = [];
  if (f.fullName) me.push(`मेरा नाम ${clean(f.fullName)} है।`);
  if (f.birthPlace) me.push(`मेरा जन्म ${clean(f.birthPlace)} में हुआ और वहीं मेरी परवरिश हुई।`);
  if (f.education) me.push(`मैंने ${clean(f.education)} की शिक्षा प्राप्त की है।`);
  if (f.occupation) {
    const where = joinPlace(f.company, f.workLocation);
    me.push(`वर्तमान में मैं ${where ? `${where} में ` : ""}${clean(f.occupation)} के रूप में कार्यरत हूँ।`);
  }
  me.push(
    trad
      ? pick([`मैं स्वभाव से सरल, संस्कारी और परिवार को महत्व देने ${g("वाला", "वाली")} व्यक्ति हूँ।`, `मैं शांत, विनम्र और ज़िम्मेदार स्वभाव ${g("का", "की")} हूँ।`])
      : pick([`मैं हँसमुख, आत्मनिर्भर और सकारात्मक सोच ${g("वाला", "वाली")} व्यक्ति हूँ।`, `मैं महत्वाकांक्षी होने के साथ-साथ ज़मीन से ${g("जुड़ा", "जुड़ी")} और खुशमिज़ाज इंसान हूँ।`]),
  );
  if (i.notes) me.push(`खाली समय में मुझे ${clean(i.notes).replace(/[.।]$/, "")} पसंद है।`);
  me.push(
    trad
      ? `मैं अपनी परंपराओं और बड़ों का सम्मान ${g("करता", "करती")} हूँ तथा करियर और परिवार के बीच संतुलन बनाकर चलने में विश्वास ${g("रखता", "रखती")} हूँ।`
      : `मैं आपसी सम्मान, ईमानदार बातचीत और साथ मिलकर आगे बढ़ने में विश्वास ${g("रखता", "रखती")} हूँ।`,
  );

  const fam: string[] = [];
  const ft = f.familyType === "joint" ? "एक संयुक्त परिवार" : f.familyType === "nuclear" ? "एक एकल परिवार" : "एक संस्कारी परिवार";
  fam.push(`हमारा परिवार ${ft} है${f.nativePlace ? `, जिसका मूल निवास ${clean(f.nativePlace)} है` : ""}।`);
  if (f.fatherName) fam.push(`मेरे पिता ${clean(f.fatherName)}${f.fatherOccupation ? ` ${clean(f.fatherOccupation)} हैं` : " हैं"}।`);
  if (f.motherName) fam.push(`मेरी माता ${clean(f.motherName)}${f.motherOccupation ? ` ${clean(f.motherOccupation)} हैं` : " हैं"}।`);
  const sib = [!isNone(f.brothers) ? `भाई: ${clean(f.brothers)}` : "", !isNone(f.sisters) ? `बहन: ${clean(f.sisters)}` : ""].filter(Boolean);
  if (sib.length) fam.push(`${sib.join(", ")}।`);
  fam.push(trad ? "हमारा परिवार संस्कारों, आपसी प्रेम और सम्मान में विश्वास रखता है।" : "हमारा परिवार शिक्षा, आधुनिक सोच और आपसी सहयोग को महत्व देता है।");

  const partner = fem ? "जीवनसाथी" : "जीवनसंगिनी";
  const adj = fem ? "वाले" : "वाली";
  const exp = trad
    ? `मुझे एक शिक्षित, समझदार और पारिवारिक मूल्यों को महत्व देने ${adj} ${partner} की तलाश है, जो बड़ों का सम्मान करे और जिसके साथ आपसी विश्वास व प्रेम से जीवन की नई शुरुआत की जा सके।`
    : `मुझे एक दयालु, समझदार और सहयोगी ${partner} की तलाश है, जो ईमानदारी और खुलकर बातचीत को महत्व दे, जीवन के प्रति सकारात्मक सोच रखे और बराबरी के साथ आगे बढ़ने में विश्वास करे।`;
  return { aboutMe: sentence(me.join(" ")), aboutFamily: sentence(fam.join(" ")), expectations: exp };
}

// ---------------- Marathi ----------------
function mr(i: AiInput): AboutTexts {
  const f = i.f;
  const fem = f.gender === "female";
  const trad = i.tone === "traditional";
  const me: string[] = [];
  if (f.fullName) me.push(`माझे नाव ${clean(f.fullName)} आहे.`);
  if (f.birthPlace) me.push(`माझा जन्म ${clean(f.birthPlace)} येथे झाला.`);
  if (f.education) me.push(`मी ${clean(f.education)} हे शिक्षण पूर्ण केले आहे.`);
  if (f.occupation) {
    const where = joinPlace(f.company, f.workLocation);
    me.push(`सध्या मी ${where ? `${where} येथे ` : ""}${clean(f.occupation)} म्हणून कार्यरत आहे.`);
  }
  me.push(trad ? "मी स्वभावाने शांत, समजूतदार आणि कुटुंबवत्सल आहे." : "मी आनंदी, आत्मविश्वासू आणि सकारात्मक विचारांची व्यक्ती आहे.");
  if (i.notes) me.push(`फावल्या वेळेत मला ${clean(i.notes).replace(/[.।]$/, "")} आवडते.`);
  me.push(trad ? "मला आपल्या परंपरा आणि संस्कारांचा आदर आहे आणि करिअर व कुटुंब यांचा समतोल राखण्यावर माझा विश्वास आहे." : "परस्पर आदर, मनमोकळा संवाद आणि एकत्र प्रगती करणे यावर माझा विश्वास आहे.");

  const fam: string[] = [];
  const ft = f.familyType === "joint" ? "एकत्र कुटुंब" : f.familyType === "nuclear" ? "विभक्त कुटुंब" : "सुसंस्कृत कुटुंब";
  fam.push(`आमचे ${ft} आहे${f.nativePlace ? ` आणि आमचे मूळ गाव ${clean(f.nativePlace)} आहे` : ""}.`);
  if (f.fatherName) fam.push(`माझे वडील ${clean(f.fatherName)}${f.fatherOccupation ? ` ${clean(f.fatherOccupation)} आहेत` : " आहेत"}.`);
  if (f.motherName) fam.push(`माझी आई ${clean(f.motherName)}${f.motherOccupation ? ` ${clean(f.motherOccupation)} आहेत` : " आहेत"}.`);
  const sib = [!isNone(f.brothers) ? `भाऊ: ${clean(f.brothers)}` : "", !isNone(f.sisters) ? `बहीण: ${clean(f.sisters)}` : ""].filter(Boolean);
  if (sib.length) fam.push(`${sib.join(", ")}.`);
  fam.push(trad ? "आमचे कुटुंब संस्कार, प्रेम आणि एकमेकांचा आदर यांना महत्त्व देते." : "आमचे कुटुंब शिक्षण, आधुनिक विचार आणि एकमेकांना साथ देण्याला महत्त्व देते.");

  const exp = fem
    ? trad
      ? "मला सुशिक्षित, समजूतदार आणि कुटुंबाला महत्त्व देणारा जोडीदार हवा आहे, जो मोठ्यांचा आदर करेल आणि ज्याच्यासोबत विश्वास व प्रेमाने आयुष्याची नवी सुरुवात करता येईल."
      : "मला प्रेमळ, समजूतदार आणि साथ देणारा जोडीदार हवा आहे, जो प्रामाणिक संवादाला महत्त्व देईल आणि आयुष्यात बरोबरीने पुढे जाण्यावर विश्वास ठेवेल."
    : trad
      ? "मला सुशिक्षित, समजूतदार आणि कुटुंबाला महत्त्व देणारी जोडीदार हवी आहे, जी मोठ्यांचा आदर करेल आणि जिच्यासोबत विश्वास व प्रेमाने आयुष्याची नवी सुरुवात करता येईल."
      : "मला प्रेमळ, समजूतदार आणि साथ देणारी जोडीदार हवी आहे, जी प्रामाणिक संवादाला महत्त्व देईल आणि आयुष्यात बरोबरीने पुढे जाण्यावर विश्वास ठेवेल.";
  return { aboutMe: me.join(" "), aboutFamily: fam.join(" "), expectations: exp };
}

// ---------------- Gujarati ----------------
function gu(i: AiInput): AboutTexts {
  const f = i.f;
  const trad = i.tone === "traditional";
  const me: string[] = [];
  if (f.fullName) me.push(`મારું નામ ${clean(f.fullName)} છે.`);
  if (f.birthPlace) me.push(`મારો જન્મ ${clean(f.birthPlace)}માં થયો હતો.`);
  if (f.education) me.push(`મેં ${clean(f.education)} નો અભ્યાસ પૂર્ણ કર્યો છે.`);
  if (f.occupation) {
    const where = joinPlace(f.company, f.workLocation);
    me.push(`હાલમાં હું ${where ? `${where} ખાતે ` : ""}${clean(f.occupation)} તરીકે કાર્યરત છું.`);
  }
  me.push(trad ? "હું સ્વભાવે સરળ, લાગણીશીલ અને પરિવારપ્રેમી છું." : "હું ખુશમિજાજ, આત્મવિશ્વાસુ અને હકારાત્મક વિચાર ધરાવતી વ્યક્તિ છું.");
  if (i.notes) me.push(`ફુરસદના સમયમાં મને ${clean(i.notes).replace(/[.।]$/, "")} ગમે છે.`);
  me.push(trad ? "હું આપણી પરંપરાઓ અને વડીલોનું સન્માન કરું છું તથા કારકિર્દી અને પરિવાર વચ્ચે સંતુલન જાળવવામાં માનું છું." : "હું પરસ્પર સન્માન, ખુલ્લા સંવાદ અને સાથે મળીને આગળ વધવામાં માનું છું.");

  const fam: string[] = [];
  const ft = f.familyType === "joint" ? "સંયુક્ત કુટુંબ" : f.familyType === "nuclear" ? "વિભક્ત કુટુંબ" : "સંસ્કારી કુટુંબ";
  fam.push(`અમારું ${ft} છે${f.nativePlace ? ` અને અમારું મૂળ વતન ${clean(f.nativePlace)} છે` : ""}.`);
  if (f.fatherName) fam.push(`મારા પિતા ${clean(f.fatherName)}${f.fatherOccupation ? ` ${clean(f.fatherOccupation)} છે` : " છે"}.`);
  if (f.motherName) fam.push(`મારા માતા ${clean(f.motherName)}${f.motherOccupation ? ` ${clean(f.motherOccupation)} છે` : " છે"}.`);
  const sib = [!isNone(f.brothers) ? `ભાઈ: ${clean(f.brothers)}` : "", !isNone(f.sisters) ? `બહેન: ${clean(f.sisters)}` : ""].filter(Boolean);
  if (sib.length) fam.push(`${sib.join(", ")}.`);
  fam.push(trad ? "અમારો પરિવાર સંસ્કાર, પ્રેમ અને પરસ્પર સન્માનમાં માને છે." : "અમારો પરિવાર શિક્ષણ, આધુનિક વિચારો અને એકબીજાના સહકારને મહત્વ આપે છે.");

  const exp = trad
    ? "મને શિક્ષિત, સમજદાર અને પારિવારિક મૂલ્યોને મહત્વ આપનાર જીવનસાથીની શોધ છે, જે વડીલોનો આદર કરે અને જેની સાથે પરસ્પર વિશ્વાસ અને પ્રેમથી જીવનની નવી શરૂઆત કરી શકાય."
    : "મને દયાળુ, સમજદાર અને સહકાર આપનાર જીવનસાથીની શોધ છે, જે પ્રામાણિકતા અને ખુલ્લા સંવાદને મહત્વ આપે અને જીવનમાં સાથે મળીને આગળ વધવામાં માને.";
  return { aboutMe: me.join(" "), aboutFamily: fam.join(" "), expectations: exp };
}

const WRITERS: Record<FL, (i: AiInput) => AboutTexts> = { en, hi, mr, gu };

export function templateWrite(input: AiInput): AiOutput {
  const supported = (FALLBACK_LANGS as readonly string[]).includes(input.lang);
  const lang = (supported ? input.lang : "en") as FL;
  const all = WRITERS[lang](input);
  const texts: Partial<AboutTexts> = {};
  for (const p of input.parts) texts[p] = all[p];
  return {
    texts,
    source: "template",
    note: supported
      ? undefined
      : "The built-in writer supports English, Hindi, Marathi and Gujarati, so this draft is in English. Edit it, or translate it yourself.",
  };
}
