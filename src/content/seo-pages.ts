import type { FaqItem } from "@/components/site/Faq";
import type { LangCode } from "@/lib/languages";

export interface SeoPageData {
  slug: string;
  lang: LangCode;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intro: string[];
  cta: string;
  createQuery: string;
  sample: { lang: LangCode; gender: "girl" | "boy"; caption: string };
  sections: { h2: string; body?: string[]; list?: string[] }[];
  faqs: FaqItem[];
  faqTitle?: string;
  sampleTitle?: string;
}

export const SEO_PAGES: Record<string, SeoPageData> = {
  "marriage-biodata-format": {
    slug: "marriage-biodata-format",
    lang: "en",
    title: "Marriage Biodata Format (2026) – Sample & Free PDF Maker",
    description:
      "The complete marriage biodata format: what to write in personal, education, family and contact details, with a sample. Fill the format online and download a beautiful PDF free.",
    h1: "Marriage Biodata Format: What to Include (with Sample)",
    kicker: "Updated for 2026 · Free to use",
    intro: [
      "A marriage biodata (also called a rishta biodata or shaadi biodata) is a one-page summary that families share when looking for a match. A good format is short, honest and easy to read on a phone — because most biodatas today are shared on WhatsApp.",
      "Below is the standard Indian marriage biodata format used by families across India, a sample you can copy, and tips that make a biodata look respectful and complete. Or skip the typing: fill the same format in our free maker and download a designed PDF in minutes.",
    ],
    cta: "Fill this format online — free",
    createQuery: "",
    sample: { lang: "en", gender: "girl", caption: "Sample marriage biodata format (English)" },
    sampleTitle: "Sample marriage biodata",
    sections: [
      {
        h2: "1. Heading and photo",
        body: [
          "Most Hindu biodatas start with an auspicious line such as “|| Shree Ganeshay Namah ||”. Muslim families often use “Bismillah”, Sikh families “Ik Onkar”, and Christian families a short blessing. Add one recent, clear photo with a plain background — it is the first thing people look at.",
        ],
      },
      {
        h2: "2. Personal details",
        list: [
          "Full name, date of birth, time and place of birth (needed for kundali matching)",
          "Height, complexion (optional), blood group (optional)",
          "Religion, caste / sub-caste and gotra (optional — include only if your family prefers)",
          "Manglik status, rashi and nakshatra (optional)",
          "Marital status and diet (vegetarian / non-vegetarian)",
        ],
      },
      {
        h2: "3. Education and career",
        list: ["Highest qualification and institute", "Current job title and company or business", "Annual income (optional, but commonly asked)", "Work location / city"],
      },
      {
        h2: "4. Family details",
        list: ["Father's name and occupation", "Mother's name and occupation", "Brothers and sisters (elder/younger, married/unmarried)", "Family type (joint / nuclear) and native place"],
      },
      {
        h2: "5. About me and partner expectations",
        body: [
          "Two or three warm sentences about your nature, values and interests make a biodata feel personal. Keep partner expectations polite and general. Our AI writer drafts both sections in English, Hindi, Marathi, Gujarati and six more Indian languages — you only edit.",
        ],
      },
      {
        h2: "6. Contact details",
        body: ["Give one contact person (usually a parent), a mobile number and optionally a city. Avoid sharing your full home address in the first biodata you send."],
      },
      {
        h2: "Tips for a biodata that gets replies",
        list: [
          "Keep it to one page. Elders read on phones; long biodatas get skipped.",
          "Be accurate about height, income and education — trust matters more than impressing.",
          "Use a clean design with readable fonts. Avoid cluttered backgrounds that hide text.",
          "Send a PDF for printing and a JPG image for WhatsApp.",
          "Double-check spellings of names and the date and time of birth.",
        ],
      },
    ],
    faqs: [
      { q: "What is the correct format of a marriage biodata?", a: "Heading line and photo, then personal details (name, date/time/place of birth, height, religion, caste optional), education and career, family details (parents, siblings, family type, native place), a short About Me, partner expectations and contact details — all on one page." },
      { q: "Should I mention caste and gotra in the biodata?", a: "It is optional. Many families include caste, sub-caste and gotra for traditional matching; others leave it out. In our maker these fields are optional and are hidden from the biodata when left empty." },
      { q: "Can I make a marriage biodata on my phone?", a: "Yes. BiodataKaro is built for Android phones: fill the form, preview it live, and download a PDF or JPG without installing any app or creating an account." },
      { q: "Is the biodata maker free?", a: "Yes. You can create and download your biodata free with 3 designs and a small watermark. Removing the watermark costs ₹49 and the premium designs are ₹99, one time." },
      { q: "PDF or image — which is better for WhatsApp?", a: "Send the JPG image for quick viewing in WhatsApp chats and keep the PDF for printing or emailing. You can download both." },
    ],
  },

  "biodata-for-marriage-in-hindi": {
    slug: "biodata-for-marriage-in-hindi",
    lang: "hi",
    title: "शादी के लिए बायोडाटा हिंदी में – Free Biodata Format in Hindi",
    description: "हिंदी में शादी का बायोडाटा बनाएं – सही फॉर्मेट, सैंपल और AI से ‘मेरे बारे में’। 5 मिनट में PDF और WhatsApp इमेज डाउनलोड करें, बिना लॉगिन।",
    h1: "शादी के लिए बायोडाटा हिंदी में (Marriage Biodata in Hindi)",
    kicker: "फ्री · बिना लॉगिन · मोबाइल पर",
    intro: [
      "विवाह बायोडाटा एक पेज का परिचय पत्र होता है, जिसे रिश्ते की बात शुरू करने के लिए परिवारों के बीच साझा किया जाता है। हिंदी में बना बायोडाटा बड़े-बुज़ुर्गों के लिए पढ़ने में आसान होता है और परिवार को अपनापन महसूस कराता है।",
      "नीचे हिंदी बायोडाटा का सही फॉर्मेट और एक नमूना दिया गया है। BiodataKaro पर यही जानकारी भरें, AI से ‘मेरे बारे में’ हिंदी में लिखवाएं और सुंदर डिज़ाइन में PDF डाउनलोड करें।",
    ],
    cta: "हिंदी में बायोडाटा बनाएं – फ्री",
    createQuery: "?lang=hi",
    sample: { lang: "hi", gender: "girl", caption: "हिंदी बायोडाटा का नमूना" },
    sampleTitle: "हिंदी बायोडाटा नमूना",
    sections: [
      {
        h2: "हिंदी बायोडाटा में क्या-क्या लिखें",
        list: [
          "शीर्षक: || श्री गणेशाय नमः || या अपने धर्म के अनुसार शुभ पंक्ति",
          "व्यक्तिगत जानकारी: नाम, जन्म तिथि, जन्म समय, जन्म स्थान, ऊँचाई, धर्म, जाति/गोत्र (वैकल्पिक), मांगलिक, राशि, नक्षत्र",
          "शिक्षा एवं व्यवसाय: योग्यता, नौकरी/व्यवसाय, कंपनी, वार्षिक आय, कार्य स्थान",
          "पारिवारिक जानकारी: पिता व माता का नाम और व्यवसाय, भाई-बहन, परिवार का प्रकार, मूल निवास",
          "मेरे बारे में और जीवनसाथी से अपेक्षाएँ (2–3 पंक्तियाँ)",
          "संपर्क: संपर्क व्यक्ति का नाम और मोबाइल नंबर",
        ],
      },
      {
        h2: "AI से ‘मेरे बारे में’ हिंदी में लिखवाएं",
        body: [
          "बहुत से लोग यही सोचते रह जाते हैं कि ‘मेरे बारे में’ क्या लिखें। हमारा AI आपकी शिक्षा, नौकरी और परिवार की जानकारी से पारंपरिक या आधुनिक अंदाज़ में सम्मानजनक हिंदी पैराग्राफ लिख देता है। आप उसे जैसा चाहें बदल सकते हैं।",
        ],
      },
      {
        h2: "अच्छे बायोडाटा के लिए सुझाव",
        list: [
          "बायोडाटा एक ही पेज में रखें और साफ़, ताज़ा फोटो लगाएँ।",
          "जन्म तिथि और जन्म समय दोबारा जाँच लें – कुंडली मिलान इन्हीं से होता है।",
          "आय, ऊँचाई और शिक्षा सही-सही लिखें।",
          "WhatsApp पर भेजने के लिए JPG इमेज और प्रिंट के लिए PDF रखें।",
        ],
      },
    ],
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    faqs: [
      { q: "क्या हिंदी में बायोडाटा बनाना फ्री है?", a: "हाँ, आप 3 डिज़ाइन में हल्के वॉटरमार्क के साथ फ्री बायोडाटा बना और डाउनलोड कर सकते हैं। वॉटरमार्क हटाने के लिए ₹49 और प्रीमियम डिज़ाइन के लिए ₹99 (एक बार) है।" },
      { q: "क्या हिंदी के अक्षर PDF में सही दिखेंगे?", a: "हाँ। हम Noto Devanagari फ़ॉन्ट का उपयोग करते हैं, इसलिए मात्राएँ और संयुक्ताक्षर PDF और इमेज दोनों में सही दिखते हैं।" },
      { q: "क्या मेरी जानकारी सुरक्षित है?", a: "आपकी जानकारी और फोटो केवल आपके फोन के ब्राउज़र में सेव होती है। कोई अकाउंट या लॉगिन नहीं चाहिए।" },
      { q: "क्या मैं जानकारी अंग्रेज़ी में भरकर लेबल हिंदी में रख सकता हूँ?", a: "हाँ। ‘बायोडाटा की भाषा’ हिंदी चुनें – लेबल हिंदी में आएँगे, और आप जानकारी हिंदी या अंग्रेज़ी किसी में भी लिख सकते हैं।" },
    ],
  },

  "marathi-biodata": {
    slug: "marathi-biodata",
    lang: "mr",
    title: "मराठी बायोडाटा लग्नासाठी – Marathi Biodata Format Free",
    description: "लग्नासाठी मराठी बायोडाटा फॉरमॅट आणि नमुना. AI ने ‘माझ्याबद्दल’ मराठीत लिहा, सुंदर डिझाइनमध्ये PDF व WhatsApp इमेज डाउनलोड करा – मोफत, लॉगिनशिवाय.",
    h1: "लग्नासाठी मराठी बायोडाटा (Marathi Biodata for Marriage)",
    kicker: "मोफत · लॉगिनशिवाय · मोबाईलवर",
    intro: [
      "लग्न जुळवताना सर्वात आधी बायोडाटा पाठवला जातो. मराठीत असलेला बायोडाटा घरातील ज्येष्ठांना वाचायला सोपा वाटतो आणि आपल्या संस्कृतीची ओळख करून देतो.",
      "खाली मराठी बायोडाटाचा योग्य फॉरमॅट आणि नमुना दिला आहे. BiodataKaro वर माहिती भरा, ‘माझ्याबद्दल’ AI कडून मराठीत लिहून घ्या आणि काही मिनिटांत PDF डाउनलोड करा.",
    ],
    cta: "मराठी बायोडाटा बनवा – मोफत",
    createQuery: "?lang=mr",
    sample: { lang: "mr", gender: "girl", caption: "मराठी बायोडाटा नमुना" },
    sampleTitle: "मराठी बायोडाटा नमुना",
    sections: [
      {
        h2: "मराठी बायोडाटामध्ये काय लिहावे",
        list: [
          "सुरुवातीला: || श्री गणेशाय नमः || किंवा || श्री स्वामी समर्थ ||",
          "वैयक्तिक माहिती: नाव, जन्म तारीख, जन्म वेळ, जन्म स्थळ, उंची, धर्म, जात/पोटजात, गोत्र, मंगळ, रास, नक्षत्र",
          "शिक्षण व व्यवसाय: शिक्षण, नोकरी/व्यवसाय, कंपनी, वार्षिक उत्पन्न",
          "कौटुंबिक माहिती: वडील व आईचे नाव आणि व्यवसाय, भाऊ-बहीण, कुटुंब प्रकार, मूळ गाव",
          "माझ्याबद्दल आणि जोडीदाराकडून अपेक्षा",
          "संपर्क: संपर्क व्यक्ती आणि मोबाईल नंबर",
        ],
      },
      {
        h2: "AI ने मराठीत ‘माझ्याबद्दल’ लिहा",
        body: ["तुमचे शिक्षण, नोकरी आणि कुटुंबाची माहिती वापरून AI पारंपरिक किंवा आधुनिक शैलीत आदरपूर्वक मराठी परिच्छेद तयार करते. तुम्हाला हवे तसे बदल करू शकता."],
      },
      {
        h2: "चांगल्या बायोडाटासाठी टिप्स",
        list: ["बायोडाटा एका पानात ठेवा आणि स्पष्ट फोटो लावा.", "जन्म वेळ व तारीख पुन्हा तपासा – पत्रिका जुळवण्यासाठी आवश्यक.", "WhatsApp साठी JPG आणि प्रिंटसाठी PDF वापरा."],
      },
    ],
    faqTitle: "नेहमी विचारले जाणारे प्रश्न",
    faqs: [
      { q: "मराठी बायोडाटा मोफत बनवता येतो का?", a: "हो. 3 डिझाइनमध्ये लहान वॉटरमार्कसह मोफत बायोडाटा बनवा. वॉटरमार्क काढण्यासाठी ₹49 आणि प्रीमियम डिझाइनसाठी ₹99 (एकदाच)." },
      { q: "PDF मध्ये मराठी अक्षरे बरोबर दिसतील का?", a: "हो. आम्ही Noto Devanagari फॉन्ट वापरतो, त्यामुळे जोडाक्षरे व मात्रा PDF आणि इमेजमध्ये अचूक दिसतात." },
      { q: "माझी माहिती कुठे सेव्ह होते?", a: "तुमची माहिती आणि फोटो फक्त तुमच्या फोनच्या ब्राउझरमध्ये सेव्ह होतात. लॉगिनची गरज नाही." },
    ],
  },

  "gujarati-biodata": {
    slug: "gujarati-biodata",
    lang: "gu",
    title: "ગુજરાતી બાયોડેટા લગ્ન માટે – Gujarati Biodata Format Free",
    description: "લગ્ન માટે ગુજરાતી બાયોડેટા ફોર્મેટ અને નમૂનો. AI દ્વારા ‘મારા વિશે’ ગુજરાતીમાં લખાવો, સુંદર ડિઝાઇનમાં PDF અને WhatsApp ઇમેજ ડાઉનલોડ કરો – મફત.",
    h1: "લગ્ન માટે ગુજરાતી બાયોડેટા (Gujarati Biodata for Marriage)",
    kicker: "મફત · લોગિન વગર · મોબાઇલ પર",
    intro: [
      "સગપણની વાત શરૂ કરતી વખતે સૌથી પહેલાં બાયોડેટા મોકલવામાં આવે છે. ગુજરાતીમાં બનાવેલો બાયોડેટા વડીલોને વાંચવામાં સરળ લાગે છે અને પરિવારની ઓળખ સ્પષ્ટ કરે છે.",
      "નીચે ગુજરાતી બાયોડેટાનું યોગ્ય ફોર્મેટ અને નમૂનો આપેલ છે. BiodataKaro પર માહિતી ભરો, ‘મારા વિશે’ AI પાસે ગુજરાતીમાં લખાવો અને થોડી મિનિટોમાં PDF ડાઉનલોડ કરો.",
    ],
    cta: "ગુજરાતી બાયોડેટા બનાવો – મફત",
    createQuery: "?lang=gu",
    sample: { lang: "gu", gender: "girl", caption: "ગુજરાતી બાયોડેટા નમૂનો" },
    sampleTitle: "ગુજરાતી બાયોડેટા નમૂનો",
    sections: [
      {
        h2: "ગુજરાતી બાયોડેટામાં શું લખવું",
        list: [
          "શરૂઆતમાં: || શ્રી ગણેશાય નમઃ || અથવા || જય જિનેન્દ્ર ||",
          "વ્યક્તિગત માહિતી: નામ, જન્મ તારીખ, જન્મ સમય, જન્મ સ્થળ, ઊંચાઈ, ધર્મ, જ્ઞાતિ, ગોત્ર, માંગલિક, રાશિ",
          "અભ્યાસ અને વ્યવસાય: અભ્યાસ, નોકરી/વ્યવસાય, વાર્ષિક આવક",
          "કૌટુંબિક માહિતી: પિતા અને માતાનું નામ તથા વ્યવસાય, ભાઈ-બહેન, કુટુંબનો પ્રકાર, મૂળ વતન",
          "મારા વિશે અને જીવનસાથી પાસેથી અપેક્ષાઓ",
          "સંપર્ક: સંપર્ક વ્યક્તિ અને મોબાઇલ નંબર",
        ],
      },
      {
        h2: "AI દ્વારા ગુજરાતીમાં ‘મારા વિશે’",
        body: ["તમારા અભ્યાસ, વ્યવસાય અને પરિવારની માહિતી પરથી AI પરંપરાગત અથવા આધુનિક શૈલીમાં સન્માનજનક ગુજરાતી ફકરો લખી આપે છે. તમે તેમાં ઇચ્છો તે ફેરફાર કરી શકો છો."],
      },
    ],
    faqTitle: "વારંવાર પૂછાતા પ્રશ્નો",
    faqs: [
      { q: "શું ગુજરાતી બાયોડેટા મફત બને છે?", a: "હા. 3 ડિઝાઇનમાં નાના વોટરમાર્ક સાથે મફત બાયોડેટા બનાવો. વોટરમાર્ક દૂર કરવા ₹49 અને પ્રીમિયમ ડિઝાઇન માટે ₹99 (એક વખત)." },
      { q: "PDFમાં ગુજરાતી અક્ષરો બરાબર દેખાશે?", a: "હા. અમે Noto Sans Gujarati ફોન્ટ વાપરીએ છીએ, તેથી જોડાક્ષરો PDF અને ઇમેજમાં સાચા દેખાય છે." },
      { q: "મારી માહિતી ક્યાં સેવ થાય છે?", a: "તમારી માહિતી અને ફોટો ફક્ત તમારા ફોનના બ્રાઉઝરમાં જ સેવ થાય છે. લોગિનની જરૂર નથી." },
    ],
  },

  "free-biodata-maker": {
    slug: "free-biodata-maker",
    lang: "en",
    title: "Free Biodata Maker Online – No Login, PDF & WhatsApp Image",
    description: "Free online marriage biodata maker. Fill a simple form on your phone, get AI-written About Me, choose a design and download PDF or JPG. No app, no login, data stays on your device.",
    h1: "Free Biodata Maker — Make Your Marriage Biodata in 5 Minutes",
    kicker: "No app · No login · Works on any phone",
    intro: [
      "Making a biodata in Word on a phone is painful: tables break, Hindi fonts look wrong and the PDF never fits on one page. BiodataKaro fixes all of that. Fill one simple form, see a live preview, and download a perfectly formatted one-page biodata.",
      "It is free to create and download. If you want to remove the small watermark or use a premium design, it is a single small payment — no subscription.",
    ],
    cta: "Start my free biodata",
    createQuery: "",
    sample: { lang: "en", gender: "boy", caption: "Sample created with the free biodata maker" },
    sampleTitle: "What you get",
    sections: [
      {
        h2: "Why families use BiodataKaro",
        list: [
          "AI-written About Me, About Family and Partner Expectations in 10 Indian languages",
          "Labels in English, हिन्दी, मराठी, ગુજરાતી, বাংলা, தமிழ், తెలుగు, ಕನ್ನಡ, ਪੰਜਾਬੀ, മലയാളം",
          "Auto-fit: your biodata always fits on one A4 page",
          "Photo upload with crop — the photo never leaves your phone",
          "PDF for printing, JPG for WhatsApp, and one-tap share",
          "Progress saved automatically in your browser",
        ],
      },
      {
        h2: "Free vs paid",
        body: [
          "Free: 3 designs, PDF and JPG with a small watermark. Basic ₹49: no watermark on the free designs. Premium ₹99: all 8 designs including Royal Gold, Saffron Mandala, Peacock, Emerald and Modern Sidebar, without watermark. Both are one-time payments for that biodata, with unlimited edits and re-downloads for a year.",
        ],
      },
    ],
    faqs: [
      { q: "Is it really free?", a: "Yes. Creating, previewing and downloading is free. Free downloads carry a small watermark; removing it is optional (₹49)." },
      { q: "Do I need to install an app or sign up?", a: "No. It works in Chrome or any browser on your phone. There is no account and no OTP." },
      { q: "Where is my data stored?", a: "Only in your own browser (localStorage). We do not store your biodata or photo on our servers." },
      { q: "Can I edit after downloading?", a: "Yes. Come back on the same phone and browser — your details are still there. Edit and download again." },
    ],
  },

  "biodata-format-for-girl": {
    slug: "biodata-format-for-girl",
    lang: "en",
    title: "Biodata Format for Marriage for Girl – Sample & Free PDF",
    description: "Marriage biodata format for girls with a complete sample: personal, education, family details and an AI-written About Me. Create and download a beautiful PDF free.",
    h1: "Biodata Format for Marriage for Girl (with Sample)",
    kicker: "Free sample · Elegant designs",
    intro: [
      "A girl's marriage biodata introduces her personality, education and family in a respectful way. Families usually look for clarity on education, career plans, family background and values — presented neatly on one page.",
      "Use the sample below as a guide, or create yours in our free maker with feminine floral and traditional designs.",
    ],
    cta: "Create biodata for girl",
    createQuery: "?for=girl&template=floral",
    sample: { lang: "en", gender: "girl", caption: "Sample biodata format for girl" },
    sampleTitle: "Sample biodata for girl",
    sections: [
      {
        h2: "What to include in a girl's biodata",
        list: [
          "A recent, natural photo (traditional or semi-formal outfit works well)",
          "Name, date, time and place of birth, height",
          "Education and current job or career plans",
          "Family details: parents' occupations, siblings, native place",
          "A short About Me about nature, values and interests",
          "Partner expectations — kept positive and general",
          "Contact person (usually father or mother) and mobile number",
        ],
      },
      {
        h2: "Sample “About Me” for girl",
        body: [
          "“I am Priya, born and brought up in Jaipur. I have completed my MBA in Finance and work as a Financial Analyst in Pune. I am calm, caring and family-oriented, and I enjoy reading and cooking. I respect our traditions and believe in balancing career and family with equal dedication.”",
        ],
      },
    ],
    faqs: [
      { q: "Should a girl mention her income in the biodata?", a: "It is optional. Many working women mention it, others prefer to discuss it later. Leave the field empty and it will not appear." },
      { q: "Which design suits a girl's biodata?", a: "Rose Floral and Classic Maroon (free) are popular; Royal Gold and Peacock Teal are premium favourites." },
      { q: "Can my parents make the biodata for me?", a: "Yes. Most biodatas are made by parents — just set the contact person as father or mother." },
    ],
  },

  "biodata-format-for-boy": {
    slug: "biodata-format-for-boy",
    lang: "en",
    title: "Biodata Format for Marriage for Boy – Sample & Free PDF",
    description: "Marriage biodata format for boys with a complete sample: personal details, education, job and income, family, and AI-written About Me. Create a professional PDF free.",
    h1: "Biodata Format for Marriage for Boy (with Sample)",
    kicker: "Free sample · Professional designs",
    intro: [
      "A boy's marriage biodata should clearly present education, profession, income and family background — and still feel warm and personal. Clean, professional designs work best.",
      "Use the sample below, or create yours in our free maker in under five minutes.",
    ],
    cta: "Create biodata for boy",
    createQuery: "?for=boy&template=minimal",
    sample: { lang: "en", gender: "boy", caption: "Sample biodata format for boy" },
    sampleTitle: "Sample biodata for boy",
    sections: [
      {
        h2: "What to include in a boy's biodata",
        list: [
          "Clear recent photo (formal or semi-formal)",
          "Name, date, time and place of birth, height",
          "Education, job title, company/business and annual income",
          "Family details: parents, siblings, family type and native place",
          "A short About Me, and partner expectations",
          "Contact person and mobile number",
        ],
      },
      {
        h2: "Sample “About Me” for boy",
        body: [
          "“I am Rohit, born and brought up in Lucknow. I completed my B.Tech in Computer Science from NIT Allahabad and work as a Senior Software Engineer at TCS. I am positive, driven and easy-going, and I enjoy cricket and travelling. I value family and believe in a partnership built on friendship and trust.”",
        ],
      },
    ],
    faqs: [
      { q: "Should I write my salary or annual package?", a: "Most families expect annual income (e.g. ₹18 LPA). Be accurate — it builds trust." },
      { q: "Which design is best for a boy's biodata?", a: "Simple Elegant (free) and Modern Sidebar (premium) look professional; Royal Gold suits traditional families." },
      { q: "Can I write the biodata in Hindi?", a: "Yes. Choose Hindi as the biodata language and the AI can write your About Me in Hindi too." },
    ],
  },
};

export const SEO_SLUGS = Object.keys(SEO_PAGES);
