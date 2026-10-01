import type { LangCode } from "@/lib/languages";

/** Example values shown in the "sample format" tables on SEO pages. */
export const SAMPLE_VALUES: Partial<Record<LangCode, Record<"girl" | "boy", Record<string, string>>>> = {
  en: {
    girl: {
      fullName: "Priya Sharma", dob: "14 March 1997", birthTime: "6:45 AM", birthPlace: "Jaipur, Rajasthan", height: "5' 4\" (163 cm)", religion: "Hindu", caste: "Brahmin", gotra: "Bharadwaj", manglik: "No", rashi: "Meen", nakshatra: "Revati",
      education: "MBA (Finance), Symbiosis Pune", occupation: "Financial Analyst, HDFC Bank", income: "₹9 LPA", fatherName: "Shri Ramesh Sharma (Retd. Bank Manager)", motherName: "Smt. Sunita Sharma (Homemaker)", brothers: "1 elder brother (married)", familyType: "Nuclear Family", nativePlace: "Ajmer, Rajasthan", contactPerson: "Ramesh Sharma (Father)", phone: "+91 98XXXXXX10",
    },
    boy: {
      fullName: "Rohit Verma", dob: "2 August 1994", birthTime: "10:20 PM", birthPlace: "Lucknow, Uttar Pradesh", height: "5' 10\" (178 cm)", religion: "Hindu", caste: "Kayastha", gotra: "Kashyap", manglik: "No", rashi: "Simha", nakshatra: "Magha",
      education: "B.Tech (Computer Science), NIT Allahabad", occupation: "Senior Software Engineer, TCS", income: "₹18 LPA", fatherName: "Shri Anil Verma (Govt. Teacher)", motherName: "Smt. Kavita Verma (Homemaker)", sisters: "1 younger sister (studying)", familyType: "Joint Family", nativePlace: "Gorakhpur, Uttar Pradesh", contactPerson: "Anil Verma (Father)", phone: "+91 94XXXXXX21",
    },
  },
  hi: {
    girl: {
      fullName: "प्रिया शर्मा", dob: "14 मार्च 1997", birthTime: "सुबह 6:45", birthPlace: "जयपुर, राजस्थान", height: "5 फीट 4 इंच", religion: "हिन्दू", caste: "ब्राह्मण", gotra: "भारद्वाज", manglik: "नहीं", rashi: "मीन", nakshatra: "रेवती",
      education: "एम.बी.ए. (फाइनेंस)", occupation: "फाइनेंशियल एनालिस्ट, एचडीएफसी बैंक", income: "₹9 लाख वार्षिक", fatherName: "श्री रमेश शर्मा (सेवानिवृत्त बैंक मैनेजर)", motherName: "श्रीमती सुनीता शर्मा (गृहिणी)", brothers: "1 बड़े भाई (विवाहित)", familyType: "एकल परिवार", nativePlace: "अजमेर, राजस्थान", contactPerson: "रमेश शर्मा (पिता)", phone: "+91 98XXXXXX10",
    },
    boy: {
      fullName: "रोहित वर्मा", dob: "2 अगस्त 1994", birthTime: "रात 10:20", birthPlace: "लखनऊ, उत्तर प्रदेश", height: "5 फीट 10 इंच", religion: "हिन्दू", caste: "कायस्थ", gotra: "कश्यप", manglik: "नहीं", rashi: "सिंह", nakshatra: "मघा",
      education: "बी.टेक (कंप्यूटर साइंस)", occupation: "सीनियर सॉफ्टवेयर इंजीनियर, टीसीएस", income: "₹18 लाख वार्षिक", fatherName: "श्री अनिल वर्मा (सरकारी शिक्षक)", motherName: "श्रीमती कविता वर्मा (गृहिणी)", sisters: "1 छोटी बहन (अध्ययनरत)", familyType: "संयुक्त परिवार", nativePlace: "गोरखपुर, उत्तर प्रदेश", contactPerson: "अनिल वर्मा (पिता)", phone: "+91 94XXXXXX21",
    },
  },
  mr: {
    girl: {
      fullName: "स्नेहा पाटील", dob: "21 जानेवारी 1998", birthTime: "सकाळी 8:15", birthPlace: "पुणे", height: "5 फूट 3 इंच", religion: "हिंदू", caste: "मराठा", gotra: "कश्यप", manglik: "नाही", rashi: "मकर", nakshatra: "श्रवण",
      education: "बी.ई. (कॉम्प्युटर)", occupation: "सॉफ्टवेअर इंजिनिअर, इन्फोसिस", income: "₹8 लाख वार्षिक", fatherName: "श्री. सुरेश पाटील (शेती व व्यवसाय)", motherName: "सौ. मीना पाटील (गृहिणी)", brothers: "1 लहान भाऊ (शिक्षण चालू)", familyType: "एकत्र कुटुंब", nativePlace: "सातारा", contactPerson: "सुरेश पाटील (वडील)", phone: "+91 97XXXXXX45",
    },
    boy: {
      fullName: "अमित देशमुख", dob: "5 जून 1995", birthTime: "दुपारी 2:30", birthPlace: "नाशिक", height: "5 फूट 9 इंच", religion: "हिंदू", caste: "ब्राह्मण", gotra: "वसिष्ठ", manglik: "नाही", rashi: "वृषभ", nakshatra: "रोहिणी",
      education: "एम.कॉम., सी.ए.", occupation: "चार्टर्ड अकाउंटंट", income: "₹15 लाख वार्षिक", fatherName: "श्री. विजय देशमुख (निवृत्त प्राध्यापक)", motherName: "सौ. स्वाती देशमुख (शिक्षिका)", sisters: "1 मोठी बहीण (विवाहित)", familyType: "विभक्त कुटुंब", nativePlace: "नाशिक", contactPerson: "विजय देशमुख (वडील)", phone: "+91 98XXXXXX67",
    },
  },
  gu: {
    girl: {
      fullName: "હેતલ પટેલ", dob: "9 નવેમ્બર 1997", birthTime: "સવારે 7:10", birthPlace: "અમદાવાદ", height: "5 ફૂટ 2 ઇંચ", religion: "હિન્દુ", caste: "લેઉવા પટેલ", gotra: "—", manglik: "ના", rashi: "વૃશ્ચિક", nakshatra: "અનુરાધા",
      education: "બી.ફાર્મ", occupation: "ફાર્માસિસ્ટ", income: "₹5 લાખ વાર્ષિક", fatherName: "શ્રી મહેશભાઈ પટેલ (વેપાર)", motherName: "શ્રીમતી ગીતાબેન પટેલ (ગૃહિણી)", brothers: "1 મોટો ભાઈ (પરિણીત)", familyType: "સંયુક્ત કુટુંબ", nativePlace: "મહેસાણા", contactPerson: "મહેશભાઈ પટેલ (પિતા)", phone: "+91 99XXXXXX12",
    },
    boy: {
      fullName: "કૃણાલ શાહ", dob: "17 એપ્રિલ 1994", birthTime: "સાંજે 6:40", birthPlace: "સુરત", height: "5 ફૂટ 8 ઇંચ", religion: "જૈન", caste: "વીસા શ્રીમાળી", gotra: "—", manglik: "ના", rashi: "મેષ", nakshatra: "અશ્વિની",
      education: "એમ.બી.એ.", occupation: "ડાયમંડ બિઝનેસ", income: "₹20 લાખ વાર્ષિક", fatherName: "શ્રી રાજેશભાઈ શાહ (વેપાર)", motherName: "શ્રીમતી નીતાબેન શાહ (ગૃહિણી)", sisters: "1 નાની બહેન", familyType: "વિભક્ત કુટુંબ", nativePlace: "પાલનપુર", contactPerson: "રાજેશભાઈ શાહ (પિતા)", phone: "+91 98XXXXXX34",
    },
  },
};
