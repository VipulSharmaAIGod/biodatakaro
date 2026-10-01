import type { LangCode } from "../languages";
import type { FieldKey, OptionGroup } from "../schema";

type SectionLabelKey = "personal" | "career" | "family" | "contact" | "aboutMe" | "aboutFamily" | "expectations" | "other";
/** A string, or [male, female] when the word changes with gender. */
type Opt = string | [string, string];

export interface Dict {
  title: string;
  sections: Record<SectionLabelKey, string>;
  fields: Record<Exclude<FieldKey, "gender">, string>;
  options: Record<OptionGroup, Record<string, Opt>>;
}

const en: Dict = {
  title: "Marriage Biodata",
  sections: { personal: "Personal Details", career: "Education & Career", family: "Family Details", contact: "Contact Details", aboutMe: "About Me", aboutFamily: "About Family", expectations: "Partner Expectations", other: "Other Details" },
  fields: {
    fullName: "Name", dob: "Date of Birth", birthTime: "Time of Birth", birthPlace: "Place of Birth", height: "Height", complexion: "Complexion", bloodGroup: "Blood Group", religion: "Religion", caste: "Caste", subCaste: "Sub-caste", gotra: "Gotra", manglik: "Manglik", rashi: "Rashi", nakshatra: "Nakshatra", maritalStatus: "Marital Status", diet: "Diet",
    education: "Education", occupation: "Occupation", company: "Company", income: "Annual Income", workLocation: "Work Location",
    fatherName: "Father's Name", fatherOccupation: "Father's Occupation", motherName: "Mother's Name", motherOccupation: "Mother's Occupation", brothers: "Brothers", sisters: "Sisters", familyType: "Family Type", nativePlace: "Native Place",
    contactPerson: "Contact Person", phone: "Mobile", email: "Email", address: "Address",
  },
  options: {
    gender: { male: "Male", female: "Female" },
    religion: { hindu: "Hindu", muslim: "Muslim", sikh: "Sikh", christian: "Christian", jain: "Jain", buddhist: "Buddhist", other: "Other" },
    manglik: { yes: "Yes", no: "No", partial: "Anshik (Partial)" },
    maritalStatus: { never: "Never Married", divorced: "Divorced", widowed: ["Widower", "Widow"] },
    familyType: { joint: "Joint Family", nuclear: "Nuclear Family" },
    diet: { veg: "Vegetarian", nonveg: "Non-Vegetarian", egg: "Eggetarian" },
  },
};

const hi: Dict = {
  title: "विवाह बायोडाटा",
  sections: { personal: "व्यक्तिगत जानकारी", career: "शिक्षा एवं व्यवसाय", family: "पारिवारिक जानकारी", contact: "संपर्क जानकारी", aboutMe: "मेरे बारे में", aboutFamily: "परिवार के बारे में", expectations: "जीवनसाथी से अपेक्षाएँ", other: "अन्य जानकारी" },
  fields: {
    fullName: "नाम", dob: "जन्म तिथि", birthTime: "जन्म समय", birthPlace: "जन्म स्थान", height: "ऊँचाई", complexion: "रंग", bloodGroup: "रक्त समूह", religion: "धर्म", caste: "जाति", subCaste: "उपजाति", gotra: "गोत्र", manglik: "मांगलिक", rashi: "राशि", nakshatra: "नक्षत्र", maritalStatus: "वैवाहिक स्थिति", diet: "आहार",
    education: "शिक्षा", occupation: "व्यवसाय", company: "कंपनी / संस्था", income: "वार्षिक आय", workLocation: "कार्य स्थान",
    fatherName: "पिता का नाम", fatherOccupation: "पिता का व्यवसाय", motherName: "माता का नाम", motherOccupation: "माता का व्यवसाय", brothers: "भाई", sisters: "बहन", familyType: "परिवार का प्रकार", nativePlace: "मूल निवास",
    contactPerson: "संपर्क व्यक्ति", phone: "मोबाइल नंबर", email: "ईमेल", address: "पता",
  },
  options: {
    gender: { male: "पुरुष", female: "महिला" },
    religion: { hindu: "हिन्दू", muslim: "मुस्लिम", sikh: "सिख", christian: "ईसाई", jain: "जैन", buddhist: "बौद्ध", other: "अन्य" },
    manglik: { yes: "हाँ", no: "नहीं", partial: "आंशिक" },
    maritalStatus: { never: "अविवाहित", divorced: "तलाकशुदा", widowed: ["विधुर", "विधवा"] },
    familyType: { joint: "संयुक्त परिवार", nuclear: "एकल परिवार" },
    diet: { veg: "शाकाहारी", nonveg: "मांसाहारी", egg: "अंडाहारी" },
  },
};

const mr: Dict = {
  title: "लग्नासाठी बायोडाटा",
  sections: { personal: "वैयक्तिक माहिती", career: "शिक्षण व व्यवसाय", family: "कौटुंबिक माहिती", contact: "संपर्क माहिती", aboutMe: "माझ्याबद्दल", aboutFamily: "कुटुंबाबद्दल", expectations: "जोडीदाराकडून अपेक्षा", other: "इतर माहिती" },
  fields: {
    fullName: "नाव", dob: "जन्म तारीख", birthTime: "जन्म वेळ", birthPlace: "जन्म स्थळ", height: "उंची", complexion: "वर्ण", bloodGroup: "रक्तगट", religion: "धर्म", caste: "जात", subCaste: "पोटजात", gotra: "गोत्र", manglik: "मांगलिक", rashi: "रास", nakshatra: "नक्षत्र", maritalStatus: "वैवाहिक स्थिती", diet: "आहार",
    education: "शिक्षण", occupation: "व्यवसाय / नोकरी", company: "कंपनी", income: "वार्षिक उत्पन्न", workLocation: "नोकरीचे ठिकाण",
    fatherName: "वडिलांचे नाव", fatherOccupation: "वडिलांचा व्यवसाय", motherName: "आईचे नाव", motherOccupation: "आईचा व्यवसाय", brothers: "भाऊ", sisters: "बहीण", familyType: "कुटुंब प्रकार", nativePlace: "मूळ गाव",
    contactPerson: "संपर्क व्यक्ती", phone: "मोबाईल नंबर", email: "ईमेल", address: "पत्ता",
  },
  options: {
    gender: { male: "पुरुष", female: "स्त्री" },
    religion: { hindu: "हिंदू", muslim: "मुस्लिम", sikh: "शीख", christian: "ख्रिश्चन", jain: "जैन", buddhist: "बौद्ध", other: "इतर" },
    manglik: { yes: "होय", no: "नाही", partial: "सौम्य मंगळ" },
    maritalStatus: { never: "अविवाहित", divorced: "घटस्फोटित", widowed: ["विधुर", "विधवा"] },
    familyType: { joint: "एकत्र कुटुंब", nuclear: "विभक्त कुटुंब" },
    diet: { veg: "शाकाहारी", nonveg: "मांसाहारी", egg: "अंडी खाणारे" },
  },
};

const gu: Dict = {
  title: "લગ્ન બાયોડેટા",
  sections: { personal: "વ્યક્તિગત માહિતી", career: "અભ્યાસ અને વ્યવસાય", family: "કૌટુંબિક માહિતી", contact: "સંપર્ક માહિતી", aboutMe: "મારા વિશે", aboutFamily: "પરિવાર વિશે", expectations: "જીવનસાથી પાસેથી અપેક્ષાઓ", other: "અન્ય માહિતી" },
  fields: {
    fullName: "નામ", dob: "જન્મ તારીખ", birthTime: "જન્મ સમય", birthPlace: "જન્મ સ્થળ", height: "ઊંચાઈ", complexion: "વર્ણ", bloodGroup: "બ્લડ ગ્રુપ", religion: "ધર્મ", caste: "જ્ઞાતિ", subCaste: "પેટા જ્ઞાતિ", gotra: "ગોત્ર", manglik: "માંગલિક", rashi: "રાશિ", nakshatra: "નક્ષત્ર", maritalStatus: "વૈવાહિક સ્થિતિ", diet: "આહાર",
    education: "અભ્યાસ", occupation: "વ્યવસાય", company: "કંપની", income: "વાર્ષિક આવક", workLocation: "કાર્ય સ્થળ",
    fatherName: "પિતાનું નામ", fatherOccupation: "પિતાનો વ્યવસાય", motherName: "માતાનું નામ", motherOccupation: "માતાનો વ્યવસાય", brothers: "ભાઈ", sisters: "બહેન", familyType: "પરિવારનો પ્રકાર", nativePlace: "મૂળ વતન",
    contactPerson: "સંપર્ક વ્યક્તિ", phone: "મોબાઇલ નંબર", email: "ઈમેલ", address: "સરનામું",
  },
  options: {
    gender: { male: "પુરુષ", female: "સ્ત્રી" },
    religion: { hindu: "હિન્દુ", muslim: "મુસ્લિમ", sikh: "શીખ", christian: "ખ્રિસ્તી", jain: "જૈન", buddhist: "બૌદ્ધ", other: "અન્ય" },
    manglik: { yes: "હા", no: "ના", partial: "આંશિક" },
    maritalStatus: { never: "અપરિણીત", divorced: "છૂટાછેડા લીધેલ", widowed: ["વિધુર", "વિધવા"] },
    familyType: { joint: "સંયુક્ત કુટુંબ", nuclear: "વિભક્ત કુટુંબ" },
    diet: { veg: "શાકાહારી", nonveg: "માંસાહારી", egg: "ઈંડાહારી" },
  },
};

const bn: Dict = {
  title: "বিবাহের বায়োডাটা",
  sections: { personal: "ব্যক্তিগত তথ্য", career: "শিক্ষা ও পেশা", family: "পারিবারিক তথ্য", contact: "যোগাযোগের তথ্য", aboutMe: "আমার সম্পর্কে", aboutFamily: "পরিবার সম্পর্কে", expectations: "জীবনসঙ্গীর কাছে প্রত্যাশা", other: "অন্যান্য তথ্য" },
  fields: {
    fullName: "নাম", dob: "জন্ম তারিখ", birthTime: "জন্মের সময়", birthPlace: "জন্মস্থান", height: "উচ্চতা", complexion: "গায়ের রং", bloodGroup: "রক্তের গ্রুপ", religion: "ধর্ম", caste: "জাতি", subCaste: "উপজাতি", gotra: "গোত্র", manglik: "মাঙ্গলিক", rashi: "রাশি", nakshatra: "নক্ষত্র", maritalStatus: "বৈবাহিক অবস্থা", diet: "খাদ্যাভ্যাস",
    education: "শিক্ষাগত যোগ্যতা", occupation: "পেশা", company: "প্রতিষ্ঠান", income: "বার্ষিক আয়", workLocation: "কর্মস্থল",
    fatherName: "পিতার নাম", fatherOccupation: "পিতার পেশা", motherName: "মাতার নাম", motherOccupation: "মাতার পেশা", brothers: "ভাই", sisters: "বোন", familyType: "পরিবারের ধরন", nativePlace: "আদি নিবাস",
    contactPerson: "যোগাযোগের ব্যক্তি", phone: "মোবাইল নম্বর", email: "ইমেল", address: "ঠিকানা",
  },
  options: {
    gender: { male: "পুরুষ", female: "মহিলা" },
    religion: { hindu: "হিন্দু", muslim: "মুসলিম", sikh: "শিখ", christian: "খ্রিস্টান", jain: "জৈন", buddhist: "বৌদ্ধ", other: "অন্যান্য" },
    manglik: { yes: "হ্যাঁ", no: "না", partial: "আংশিক" },
    maritalStatus: { never: "অবিবাহিত", divorced: "বিবাহবিচ্ছিন্ন", widowed: ["বিপত্নীক", "বিধবা"] },
    familyType: { joint: "যৌথ পরিবার", nuclear: "একক পরিবার" },
    diet: { veg: "নিরামিষাশী", nonveg: "আমিষাশী", egg: "ডিম খান" },
  },
};

const ta: Dict = {
  title: "திருமண பயோடேட்டா",
  sections: { personal: "தனிப்பட்ட விவரங்கள்", career: "கல்வி மற்றும் தொழில்", family: "குடும்ப விவரங்கள்", contact: "தொடர்பு விவரங்கள்", aboutMe: "என்னைப் பற்றி", aboutFamily: "குடும்பத்தைப் பற்றி", expectations: "வாழ்க்கைத் துணை எதிர்பார்ப்புகள்", other: "பிற விவரங்கள்" },
  fields: {
    fullName: "பெயர்", dob: "பிறந்த தேதி", birthTime: "பிறந்த நேரம்", birthPlace: "பிறந்த இடம்", height: "உயரம்", complexion: "நிறம்", bloodGroup: "இரத்த வகை", religion: "மதம்", caste: "சாதி", subCaste: "உட்பிரிவு", gotra: "கோத்திரம்", manglik: "செவ்வாய் தோஷம்", rashi: "ராசி", nakshatra: "நட்சத்திரம்", maritalStatus: "திருமண நிலை", diet: "உணவுப் பழக்கம்",
    education: "கல்வித் தகுதி", occupation: "தொழில்", company: "நிறுவனம்", income: "ஆண்டு வருமானம்", workLocation: "பணியிடம்",
    fatherName: "தந்தை பெயர்", fatherOccupation: "தந்தையின் தொழில்", motherName: "தாய் பெயர்", motherOccupation: "தாயின் தொழில்", brothers: "சகோதரர்கள்", sisters: "சகோதரிகள்", familyType: "குடும்ப வகை", nativePlace: "சொந்த ஊர்",
    contactPerson: "தொடர்பு நபர்", phone: "கைபேசி எண்", email: "மின்னஞ்சல்", address: "முகவரி",
  },
  options: {
    gender: { male: "ஆண்", female: "பெண்" },
    religion: { hindu: "இந்து", muslim: "முஸ்லிம்", sikh: "சீக்கியர்", christian: "கிறிஸ்தவர்", jain: "சமணர்", buddhist: "பௌத்தர்", other: "மற்றவை" },
    manglik: { yes: "உண்டு", no: "இல்லை", partial: "பகுதி" },
    maritalStatus: { never: "திருமணமாகாதவர்", divorced: "விவாகரத்து ஆனவர்", widowed: "துணையை இழந்தவர்" },
    familyType: { joint: "கூட்டுக் குடும்பம்", nuclear: "தனிக் குடும்பம்" },
    diet: { veg: "சைவம்", nonveg: "அசைவம்", egg: "முட்டை மட்டும்" },
  },
};

const te: Dict = {
  title: "వివాహ బయోడేటా",
  sections: { personal: "వ్యక్తిగత వివరాలు", career: "విద్య & ఉద్యోగం", family: "కుటుంబ వివరాలు", contact: "సంప్రదింపు వివరాలు", aboutMe: "నా గురించి", aboutFamily: "కుటుంబం గురించి", expectations: "జీవిత భాగస్వామి నుండి ఆశించేవి", other: "ఇతర వివరాలు" },
  fields: {
    fullName: "పేరు", dob: "పుట్టిన తేదీ", birthTime: "పుట్టిన సమయం", birthPlace: "పుట్టిన స్థలం", height: "ఎత్తు", complexion: "రంగు", bloodGroup: "రక్త గ్రూపు", religion: "మతం", caste: "కులం", subCaste: "ఉపకులం", gotra: "గోత్రం", manglik: "కుజ దోషం", rashi: "రాశి", nakshatra: "నక్షత్రం", maritalStatus: "వైవాహిక స్థితి", diet: "ఆహారపు అలవాట్లు",
    education: "విద్యార్హత", occupation: "వృత్తి", company: "సంస్థ", income: "వార్షిక ఆదాయం", workLocation: "పని ప్రదేశం",
    fatherName: "తండ్రి పేరు", fatherOccupation: "తండ్రి వృత్తి", motherName: "తల్లి పేరు", motherOccupation: "తల్లి వృత్తి", brothers: "సోదరులు", sisters: "సోదరీమణులు", familyType: "కుటుంబ రకం", nativePlace: "స్వస్థలం",
    contactPerson: "సంప్రదించవలసిన వ్యక్తి", phone: "మొబైల్ నంబర్", email: "ఈమెయిల్", address: "చిరునామా",
  },
  options: {
    gender: { male: "పురుషుడు", female: "స్త్రీ" },
    religion: { hindu: "హిందూ", muslim: "ముస్లిం", sikh: "సిక్కు", christian: "క్రైస్తవ", jain: "జైన", buddhist: "బౌద్ధ", other: "ఇతర" },
    manglik: { yes: "ఉంది", no: "లేదు", partial: "పాక్షికం" },
    maritalStatus: { never: "అవివాహితులు", divorced: "విడాకులు పొందినవారు", widowed: "జీవిత భాగస్వామిని కోల్పోయినవారు" },
    familyType: { joint: "ఉమ్మడి కుటుంబం", nuclear: "చిన్న కుటుంబం" },
    diet: { veg: "శాకాహారం", nonveg: "మాంసాహారం", egg: "గుడ్డు మాత్రమే" },
  },
};

const kn: Dict = {
  title: "ಮದುವೆ ಬಯೋಡೇಟಾ",
  sections: { personal: "ವೈಯಕ್ತಿಕ ವಿವರಗಳು", career: "ಶಿಕ್ಷಣ ಮತ್ತು ಉದ್ಯೋಗ", family: "ಕುಟುಂಬದ ವಿವರಗಳು", contact: "ಸಂಪರ್ಕ ವಿವರಗಳು", aboutMe: "ನನ್ನ ಬಗ್ಗೆ", aboutFamily: "ಕುಟುಂಬದ ಬಗ್ಗೆ", expectations: "ಸಂಗಾತಿಯ ಬಗ್ಗೆ ನಿರೀಕ್ಷೆಗಳು", other: "ಇತರ ವಿವರಗಳು" },
  fields: {
    fullName: "ಹೆಸರು", dob: "ಜನ್ಮ ದಿನಾಂಕ", birthTime: "ಜನ್ಮ ಸಮಯ", birthPlace: "ಜನ್ಮ ಸ್ಥಳ", height: "ಎತ್ತರ", complexion: "ಮೈಬಣ್ಣ", bloodGroup: "ರಕ್ತದ ಗುಂಪು", religion: "ಧರ್ಮ", caste: "ಜಾತಿ", subCaste: "ಉಪಜಾತಿ", gotra: "ಗೋತ್ರ", manglik: "ಕುಜ ದೋಷ", rashi: "ರಾಶಿ", nakshatra: "ನಕ್ಷತ್ರ", maritalStatus: "ವೈವಾಹಿಕ ಸ್ಥಿತಿ", diet: "ಆಹಾರ ಪದ್ಧತಿ",
    education: "ವಿದ್ಯಾರ್ಹತೆ", occupation: "ಉದ್ಯೋಗ", company: "ಸಂಸ್ಥೆ", income: "ವಾರ್ಷಿಕ ಆದಾಯ", workLocation: "ಕೆಲಸದ ಸ್ಥಳ",
    fatherName: "ತಂದೆಯ ಹೆಸರು", fatherOccupation: "ತಂದೆಯ ಉದ್ಯೋಗ", motherName: "ತಾಯಿಯ ಹೆಸರು", motherOccupation: "ತಾಯಿಯ ಉದ್ಯೋಗ", brothers: "ಸಹೋದರರು", sisters: "ಸಹೋದರಿಯರು", familyType: "ಕುಟುಂಬದ ಪ್ರಕಾರ", nativePlace: "ಸ್ವಂತ ಊರು",
    contactPerson: "ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ", phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", email: "ಇಮೇಲ್", address: "ವಿಳಾಸ",
  },
  options: {
    gender: { male: "ಪುರುಷ", female: "ಮಹಿಳೆ" },
    religion: { hindu: "ಹಿಂದೂ", muslim: "ಮುಸ್ಲಿಂ", sikh: "ಸಿಖ್", christian: "ಕ್ರೈಸ್ತ", jain: "ಜೈನ", buddhist: "ಬೌದ್ಧ", other: "ಇತರೆ" },
    manglik: { yes: "ಇದೆ", no: "ಇಲ್ಲ", partial: "ಭಾಗಶಃ" },
    maritalStatus: { never: "ಅವಿವಾಹಿತ", divorced: "ವಿಚ್ಛೇದಿತ", widowed: ["ವಿಧುರ", "ವಿಧವೆ"] },
    familyType: { joint: "ಅವಿಭಕ್ತ ಕುಟುಂಬ", nuclear: "ವಿಭಕ್ತ ಕುಟುಂಬ" },
    diet: { veg: "ಸಸ್ಯಾಹಾರಿ", nonveg: "ಮಾಂಸಾಹಾರಿ", egg: "ಮೊಟ್ಟೆ ಮಾತ್ರ" },
  },
};

const pa: Dict = {
  title: "ਵਿਆਹ ਲਈ ਬਾਇਓਡਾਟਾ",
  sections: { personal: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ", career: "ਸਿੱਖਿਆ ਅਤੇ ਕਿੱਤਾ", family: "ਪਰਿਵਾਰਕ ਜਾਣਕਾਰੀ", contact: "ਸੰਪਰਕ ਜਾਣਕਾਰੀ", aboutMe: "ਮੇਰੇ ਬਾਰੇ", aboutFamily: "ਪਰਿਵਾਰ ਬਾਰੇ", expectations: "ਜੀਵਨ ਸਾਥੀ ਤੋਂ ਉਮੀਦਾਂ", other: "ਹੋਰ ਜਾਣਕਾਰੀ" },
  fields: {
    fullName: "ਨਾਮ", dob: "ਜਨਮ ਮਿਤੀ", birthTime: "ਜਨਮ ਸਮਾਂ", birthPlace: "ਜਨਮ ਸਥਾਨ", height: "ਕੱਦ", complexion: "ਰੰਗ", bloodGroup: "ਬਲੱਡ ਗਰੁੱਪ", religion: "ਧਰਮ", caste: "ਜਾਤ", subCaste: "ਉਪ-ਜਾਤ", gotra: "ਗੋਤ", manglik: "ਮਾਂਗਲਿਕ", rashi: "ਰਾਸ਼ੀ", nakshatra: "ਨਛੱਤਰ", maritalStatus: "ਵਿਆਹੁਤਾ ਸਥਿਤੀ", diet: "ਖੁਰਾਕ",
    education: "ਸਿੱਖਿਆ", occupation: "ਕਿੱਤਾ", company: "ਕੰਪਨੀ", income: "ਸਾਲਾਨਾ ਆਮਦਨ", workLocation: "ਕੰਮ ਦਾ ਸਥਾਨ",
    fatherName: "ਪਿਤਾ ਦਾ ਨਾਮ", fatherOccupation: "ਪਿਤਾ ਦਾ ਕਿੱਤਾ", motherName: "ਮਾਤਾ ਦਾ ਨਾਮ", motherOccupation: "ਮਾਤਾ ਦਾ ਕਿੱਤਾ", brothers: "ਭਰਾ", sisters: "ਭੈਣਾਂ", familyType: "ਪਰਿਵਾਰ ਦੀ ਕਿਸਮ", nativePlace: "ਜੱਦੀ ਸਥਾਨ",
    contactPerson: "ਸੰਪਰਕ ਵਿਅਕਤੀ", phone: "ਮੋਬਾਈਲ ਨੰਬਰ", email: "ਈਮੇਲ", address: "ਪਤਾ",
  },
  options: {
    gender: { male: "ਪੁਰਸ਼", female: "ਇਸਤਰੀ" },
    religion: { hindu: "ਹਿੰਦੂ", muslim: "ਮੁਸਲਿਮ", sikh: "ਸਿੱਖ", christian: "ਈਸਾਈ", jain: "ਜੈਨ", buddhist: "ਬੋਧੀ", other: "ਹੋਰ" },
    manglik: { yes: "ਹਾਂ", no: "ਨਹੀਂ", partial: "ਅੰਸ਼ਕ" },
    maritalStatus: { never: ["ਕੁਆਰਾ", "ਕੁਆਰੀ"], divorced: "ਤਲਾਕਸ਼ੁਦਾ", widowed: ["ਵਿਧੁਰ", "ਵਿਧਵਾ"] },
    familyType: { joint: "ਸਾਂਝਾ ਪਰਿਵਾਰ", nuclear: "ਇਕਹਿਰਾ ਪਰਿਵਾਰ" },
    diet: { veg: "ਸ਼ਾਕਾਹਾਰੀ", nonveg: "ਮਾਸਾਹਾਰੀ", egg: "ਅੰਡਾ ਖਾਂਦੇ ਹਨ" },
  },
};

const ml: Dict = {
  title: "വിവാഹ ബയോഡാറ്റ",
  sections: { personal: "വ്യക്തിഗത വിവരങ്ങൾ", career: "വിദ്യാഭ്യാസവും ജോലിയും", family: "കുടുംബ വിവരങ്ങൾ", contact: "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ", aboutMe: "എന്നെക്കുറിച്ച്", aboutFamily: "കുടുംബത്തെക്കുറിച്ച്", expectations: "പങ്കാളിയെക്കുറിച്ചുള്ള പ്രതീക്ഷകൾ", other: "മറ്റ് വിവരങ്ങൾ" },
  fields: {
    fullName: "പേര്", dob: "ജനന തീയതി", birthTime: "ജനന സമയം", birthPlace: "ജനന സ്ഥലം", height: "ഉയരം", complexion: "നിറം", bloodGroup: "രക്ത ഗ്രൂപ്പ്", religion: "മതം", caste: "ജാതി", subCaste: "ഉപജാതി", gotra: "ഗോത്രം", manglik: "ചൊവ്വാദോഷം", rashi: "രാശി", nakshatra: "നക്ഷത്രം", maritalStatus: "വൈവാഹിക നില", diet: "ഭക്ഷണ രീതി",
    education: "വിദ്യാഭ്യാസ യോഗ്യത", occupation: "ജോലി", company: "സ്ഥാപനം", income: "വാർഷിക വരുമാനം", workLocation: "ജോലി സ്ഥലം",
    fatherName: "അച്ഛന്റെ പേര്", fatherOccupation: "അച്ഛന്റെ ജോലി", motherName: "അമ്മയുടെ പേര്", motherOccupation: "അമ്മയുടെ ജോലി", brothers: "സഹോദരന്മാർ", sisters: "സഹോദരിമാർ", familyType: "കുടുംബ തരം", nativePlace: "സ്വദേശം",
    contactPerson: "ബന്ധപ്പെടേണ്ട വ്യക്തി", phone: "മൊബൈൽ നമ്പർ", email: "ഇമെയിൽ", address: "വിലാസം",
  },
  options: {
    gender: { male: "പുരുഷൻ", female: "സ്ത്രീ" },
    religion: { hindu: "ഹിന്ദു", muslim: "മുസ്ലീം", sikh: "സിഖ്", christian: "ക്രിസ്ത്യൻ", jain: "ജൈന", buddhist: "ബുദ്ധ", other: "മറ്റുള്ളവ" },
    manglik: { yes: "ഉണ്ട്", no: "ഇല്ല", partial: "ഭാഗികം" },
    maritalStatus: { never: ["അവിവാഹിതൻ", "അവിവാഹിത"], divorced: "വിവാഹമോചിതർ", widowed: ["വിഭാര്യൻ", "വിധവ"] },
    familyType: { joint: "കൂട്ടുകുടുംബം", nuclear: "അണുകുടുംബം" },
    diet: { veg: "സസ്യാഹാരി", nonveg: "മാംസാഹാരി", egg: "മുട്ട മാത്രം" },
  },
};

export const DICTS: Record<LangCode, Dict> = { en, hi, mr, gu, bn, ta, te, kn, pa, ml };

export function optionLabel(lang: LangCode, group: OptionGroup, value: string, gender?: string): string {
  const v = DICTS[lang].options[group][value] ?? DICTS.en.options[group][value];
  if (v === undefined) return value;
  if (Array.isArray(v)) return gender === "female" ? v[1] : gender === "male" ? v[0] : `${v[0]} / ${v[1]}`;
  return v;
}
