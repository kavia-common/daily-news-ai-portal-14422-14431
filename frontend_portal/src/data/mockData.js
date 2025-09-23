/**
 * Mock data for GLOBAL EXPRESS portal. Replace with API integration later.
 */
/**
 * Enhanced multilingual mock data structure.
 * Each text field provides translations keyed by language code.
 */
export const categories = [
  {
    name: "Politics",
    sub: ["Elections", "Policy", "Government"],
    i18n: { ta: "அரசியல்", te: "రాజకీయాలు", kn: "ರಾಜಕೀಯ", hi: "राजनीति" }
  },
  {
    name: "Business",
    sub: ["Markets", "Companies", "Economy"],
    i18n: { ta: "வணிகம்", te: "వ్యాపారం", kn: "ವ್ಯಾಪಾರ", hi: "व्यापार" }
  },
  {
    name: "Technology",
    sub: ["AI", "Gadgets", "Startups"],
    i18n: { ta: "தொழில்நுட்பம்", te: "సాంకేతికత", kn: "ತಂತ್ರಜ್ಞಾನ", hi: "प्रौद्योगिकी" }
  },
  {
    name: "Sports",
    sub: ["Football", "Cricket", "Tennis"],
    i18n: { ta: "விளையாட்டு", te: "క్రీడలు", kn: "ಕ್ರೀಡೆ", hi: "खेल" }
  },
  {
    name: "Entertainment",
    sub: ["Movies", "TV", "Music"],
    i18n: { ta: "மகிழ்ச்சி", te: "వినోదం", kn: "ಮನರಂಜನೆ", hi: "मनोरंजन" }
  },
  {
    name: "Health",
    sub: ["Wellness", "Research", "Medicine"],
    i18n: { ta: "சுகாதாரம்", te: "ఆరోగ్యం", kn: "ಆರೋಗ್ಯ", hi: "स्वास्थ्य" }
  },
  {
    name: "Lifestyle",
    sub: ["Travel", "Food", "Style"],
    i18n: { ta: "வாழ்க்கை முறை", te: "లైఫ్స్టైల్", kn: "ಜೀವನಶೈಲಿ", hi: "लाइफस्टाइल" }
  },
  {
    name: "World",
    sub: ["Americas", "Europe", "Asia"],
    i18n: { ta: "உலகம்", te: "ప్రపంచం", kn: "ವಿಶ್ವ", hi: "दुनिया" }
  },
  {
    name: "Opinion",
    sub: ["Editorials", "Columns", "Letters"],
    i18n: { ta: "கருத்து", te: "అభిప్రాయం", kn: "ಅಭಿಪ್ರಾಯ", hi: "मत" }
  }
];

export const breakingNews = [
  {
    id: 1,
    title: {
      en: "Global Markets Rally as Inflation Cools",
      ta: "பணவீக்கம் தணிந்ததால் உலக சந்தைகள் உயரும்",
      te: "ద్రవ్యోల్బణం తగ్గడంతో గ్లోబల్ మార్కెట్లు ఎగిశాయి",
      kn: "ದ್ರವ್ಯೋರ್ಡಿಕೆ ಇಳಿಕೆಯಿಂದ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆ ಏರಿಕೆ",
      hi: "मुद्रास्फीति घटने से वैश्विक बाजार चढ़े"
    },
    link: "#"
  },
  {
    id: 2,
    title: {
      en: "Tech Giants Announce Major AI Collaboration",
      ta: "பெரும் தொழில்நுட்ப நிறுவனங்கள் முக்கிய AI ஒத்துழைப்பை அறிவித்தன",
      te: "టెక్ దిగ్గజాలు భారీ AI భాగస్వామ్యం ప్రకటించాయి",
      kn: "ಟೆಕ್ ದಿಗ್ಗಜರು ಪ್ರಮುಖ AI ಸಹಯೋಗ ಘೋಷಿಸಿದರು",
      hi: "टेक दिग्गजों ने बड़े AI सहयोग की घोषणा की"
    },
    link: "#"
  },
  {
    id: 3,
    title: {
      en: "Historic Peace Talks Yield New Accord",
      ta: "வரலாற்றுச் சமாதான பேச்சுவார்த்தை புதிய ஒப்பந்தத்தை பெற்றது",
      te: "చారిత్రాత్మక శాంతి చర్చలు కొత్త ఒప్పందంతో ముగిశాయి",
      kn: "ಐತಿಹಾಸಿಕ ಶಾಂತಿ ಚರ್ಚೆಗಳು ಹೊಸ ಒಪ್ಪಂದಕ್ಕೆ ದಾರಿ",
      hi: "ऐतिहासिक शांति वार्ता से नया समझौता"
    },
    link: "#"
  }
];

export const featuredStories = [
  {
    id: "f1",
    title: {
      en: "Inside the AI Revolution Transforming Daily Life",
      ta: "தினசரி வாழ்வை மாற்றும் AI புரட்சியின் உள்ளே",
      te: "రోజువారీ జీవితాన్ని మార్చుతున్న AI విప్లవంలోకి",
      kn: "ದೈನಂದಿನ ಜೀವನವನ್ನು ಪರಿವರ್ತಿಸುತ್ತಿರುವ AI ಕ್ರಾಂತಿಯೊಳಗೆ",
      hi: "AI क्रांति जो रोज़मर्रा की ज़िंदगी बदल रही है"
    },
    category: "Technology",
    author: { en: "By Sarah Lin" },
    timestamp: "2025-01-05T10:00:00Z",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: "f2",
    title: {
      en: "How Cities Are Redesigning for a Greener Future",
      ta: "பசுமையான எதிர்காலத்திற்காக நகரங்கள் எப்படி மறுவடிவமைக்கின்றன",
      te: "ఆకుపచ్చ భవిష్యత్తుకోసం నగరాల పునర్నిర్మాణం",
      kn: "ಹಸಿರು ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಗರಗಳ ಮರು ವಿನ್ಯಾಸ",
      hi: "हरे भविष्य के लिए शहरों का पुनर्रचना"
    },
    category: "World",
    author: { en: "By Marcus Doyle" },
    timestamp: "2025-01-05T08:20:00Z",
    image: "https://images.unsplash.com/photo-1526485797145-2afe5b01088d?q=80&w=1400&auto=format&fit=crop"
  },
  {
    id: "f3",
    title: {
      en: "Championship Thriller: A Night to Remember",
      ta: "சாம்பியன்ஷிப் த்ரில்லர்: நினைவில் நிற்கும் இரவு",
      te: "చాంపియన్‌షిప్ థ్రిల్లర్: మర్చిపోలేని రాత్రి",
      kn: "ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಥ್ರಿಲ್ಲರ್: ನೆನಪಿನ ರಾತ್ರಿ",
      hi: "चैंपियनशिप थ्रिलर: यादगार रात"
    },
    category: "Sports",
    author: { en: "By Anita Kapoor" },
    timestamp: "2025-01-05T11:30:00Z",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop"
  }
];

export const trending = [
  { id: "t1", title: { en: "5 Startups Rewriting the Rules" }, reads: "68k", category: "Business" },
  { id: "t2", title: { en: "The Wellness Habits That Actually Work" }, reads: "47k", category: "Health" },
  { id: "t3", title: { en: "What the New Policy Means for You" }, reads: "41k", category: "Politics" },
  { id: "t4", title: { en: "Gadgets of the Year: Editor's Picks" }, reads: "39k", category: "Technology" },
  { id: "t5", title: { en: "World Cup: The Defining Moments" }, reads: "35k", category: "Sports" }
];

export const articles = Array.from({ length: 12 }).map((_, i) => {
  const isoDate = new Date(2025, 0, 1 + (i % 5), 9, 0, 0).toISOString();
  return {
    id: `a${i + 1}`,
    title: {
      en: `Explainer: Understanding Today's Headlines ${i + 1}`,
      ta: `விளக்கம்: இன்றைய தலைப்புகளை புரிந்துகொள்வது ${i + 1}`,
      te: `వివరణ: ఈరోజు శీర్షికలను అర్థం చేసుకోవడం ${i + 1}`,
      kn: `ವಿವರಣೆ: ಇಂದಿನ ಶೀರ್ಷಿಕೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ${i + 1}`,
      hi: `व्याख्या: आज की सुर्ख़ियों को समझना ${i + 1}`
    },
    excerpt: {
      en: "A concise look at the key stories shaping the world today with insights and context.",
      ta: "இன்றைய உலகத்தை வடிவமைக்கும் முக்கிய கதைகளைச் சுருக்கமாகப் பார்ப்போம்.",
      te: "ఈ రోజు ప్రపంచాన్ని ప్రభావితం చేస్తున్న ప్రధాన కథలపై సంక్షిప్తంగా ఒక చూపు.",
      kn: "ಇಂದು ಜಗತ್ತನ್ನು ರೂಪಿಸುವ ಮುಖ್ಯ ಕಥೆಗಳ ಸಂಕ್ಷಿಪ್ತ ನೋಟ.",
      hi: "आज दुनिया को आकार देने वाली प्रमुख खबरों पर संक्षिप्त दृष्टि।"
    },
    category: categories[i % categories.length].name,
    author: ["Alex Rivera", "Nina Hart", "Priya Menon"][i % 3],
    timestamp: isoDate,
    image: `https://picsum.photos/seed/news${i}/640/420`
  };
});

export const markets = {
  stocks: [
    { symbol: "DJA", name: "Dow Jones", change: "+0.9%" },
    { symbol: "S&P", name: "S&P 500", change: "+1.2%" },
    { symbol: "NAS", name: "NASDAQ", change: "+1.6%" }
  ],
  fx: [
    { pair: "USD/EUR", value: "0.91", change: "+0.2%" },
    { pair: "USD/JPY", value: "148.2", change: "-0.1%" },
    { pair: "GBP/USD", value: "1.26", change: "+0.3%" }
  ]
};

export const multimedia = {
  photos: Array.from({ length: 8 }).map((_, i) => ({
    id: `p${i + 1}`,
    title: `Photo Story ${i + 1}`,
    src: `https://picsum.photos/seed/photo${i}/900/600`
  })),
  videos: Array.from({ length: 6 }).map((_, i) => ({
    id: `v${i + 1}`,
    title: `Video Clip ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/video${i}/640/360`,
    duration: `${String(2 + i).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`
  })),
  podcasts: Array.from({ length: 5 }).map((_, i) => ({
    id: `pod${i + 1}`,
    title: `Daily Briefing Episode ${i + 1}`,
    length: `${12 + i} min`,
    url: "#"
  }))
};
