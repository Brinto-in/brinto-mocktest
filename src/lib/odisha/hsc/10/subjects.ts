// BSE Odisha Class 10 (HSC) — subjects and their chapters.
// Single source for the Odisha 10th page: filter pills, subject rows (full mock + chapter tests),
// the syllabus section and the in-page test player (which looks chapters up by index — keep order stable).
//
// testId: the test in the API (/mocktest/test/{testId}). Cards without a testId show "Coming soon" and do not link.
// questions / minutes: optional numbers shown on the card.
// poster: path under /public (the site base is added by the page). If the file is missing,
//         the card falls back to the subject colour + icon.

export interface Chapter {
  unit: string;
  unitOdia: string;
  weightageMarks?: number; // optional: hidden when unknown
  topics: string[];
  poster?: string;
  testId?: number;
  questions?: number;
  minutes?: number;
}

export interface SubjectModule {
  id: string;
  code: string;
  name: string;
  nameOdia: string;
  paperType: string;
  icon: string;
  poster?: string;
  badge: string;
  accentColor: string;
  gradient: string;
  description: string;
  descriptionOdia: string;
  subStreams: string[];
  totalMarks: number;
  mcqMarks: number;
  subjectiveMarks: number;
  durationMinutes: number;
  questionCount: number;
  attempts: string;
  rating: string;
  isPopular?: boolean;
  testId?: number; // full subject mock test
  chapters: Chapter[];
}

export const ODISHA_10TH_SUBJECTS: SubjectModule[] = [
  {
    "id": "english",
    "code": "SLE",
    "name": "Second Language English",
    "nameOdia": "ଇଂରାଜୀ (Second Language English)",
    "paperType": "Paper II - Second Language",
    "icon": "🇬🇧",
    "poster": "/images/odisha-10th/english.png",
    "badge": "Essential",
    "accentColor": "#2563EB",
    "gradient": "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    "description": "Textbook chapters, poetry comprehension, non-detailed study and comprehensive grammar (Prepositions, Tenses, Voice).",
    "descriptionOdia": "All Things Bright & Beautiful, Letter to God, High School ପ୍ରବନ୍ଧ ଓ English Grammar MCQ ସେଟ୍।",
    "subStreams": [
      "Prose & Poetry",
      "Non-Detailed Stories",
      "English Grammar"
    ],
    "totalMarks": 100,
    "mcqMarks": 50,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "24.1k",
    "rating": "4.7",
    "isPopular": false,
    "chapters": [
      {
        "unit": "Prose & Poetry",
        "unitOdia": "Prose & Poetry",
        "weightageMarks": 25,
        "topics": [
          "All Things Bright and Beautiful (C.F. Alexander)",
          "A Letter to God (G.L. Fuentes)",
          "At the High School (M.K. Gandhi)",
          "The Solitary Reaper (William Wordsworth)",
          "Village Song (Sarojini Naidu)",
          "From the Post Office (A Tiger in the House & The Beggar)"
        ]
      },
      {
        "unit": "English Grammar & Vocabulary",
        "unitOdia": "English Grammar",
        "weightageMarks": 25,
        "topics": [
          "Subject-Verb Agreement (Concord)",
          "Prepositions & Phrasal Verbs",
          "Tense Forms & Conditionals",
          "Active and Passive Voice Transformation",
          "Direct and Indirect Speech (Reported Speech)",
          "Noun Clauses & Relative Clauses"
        ]
      }
    ]
  },
  {
    "id": "odia",
    "code": "FLO",
    "name": "First Language Odia",
    "nameOdia": "ସାହିତ୍ୟ ସିନ୍ଧୁ (ଓଡ଼ିଆ)",
    "paperType": "Paper I - First Language",
    "icon": "📖",
    "poster": "/images/odisha-10th/odia.png",
    "badge": "Mother Tongue",
    "accentColor": "#7C3AED",
    "gradient": "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
    "description": "Sahitya Sindhu prose, poetry, one-act play and Odia Vyakarana (ସମାସ, ଛନ୍ଦ, ରୂଢ଼ି, କୃଦନ୍ତ) objective MCQ tests.",
    "descriptionOdia": "ସାହିତ୍ୟ ସିନ୍ଧୁର ଗଦ୍ୟ, ପଦ୍ୟ, ଏକାଙ୍କିକା ଏବଂ ମାଧ୍ୟମିକ ଓଡ଼ିଆ ବ୍ୟାକରଣର ଅଧ୍ୟାୟ ଭିତ୍ତିକ ପ୍ରଶ୍ନପତ୍ର।",
    "subStreams": [
      "Sahitya (ଗଦ୍ୟ ଓ ପଦ୍ୟ)",
      "Ekankika (ଏକାଙ୍କିକା)",
      "Vyakarana (ବ୍ୟାକରଣ)"
    ],
    "totalMarks": 100,
    "mcqMarks": 50,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "31.2k",
    "rating": "4.9",
    "isPopular": true,
    "chapters": [
      {
        "unit": "Sahitya: Padya & Gadya (ପଦ୍ୟ ଓ ଗଦ୍ୟ)",
        "unitOdia": "ସାହିତ୍ୟ: ପଦ୍ୟ ଓ ଗଦ୍ୟ",
        "weightageMarks": 25,
        "topics": [
          "ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ - କାନ୍ତକବି ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ର",
          "ରାଘବଙ୍କ ଲଙ୍କାଯାତ୍ରା ଅନୁକୂଳ - ଉପେନ୍ଦ୍ର ଭଞ୍ଜ",
          "ଚିଲିକାରେ ସାୟନ୍ତନ ଦୃଶ୍ୟ - ରାଧାନାଥ ରାୟ",
          "ମଙ୍ଗଳେ ଅଇଲା ଉଷା - ଗଙ୍ଗାଧର ମେହେର",
          "ସର୍ବଂସହା ମାଟି - ବିଦ୍ୟୁତ୍ପ୍ରଭା ଦେବୀ",
          "ଜନ୍ମଭୂମି - ଡକ୍ଟର କୃଷ୍ଣଚନ୍ଦ୍ର ପାଣିଗ୍ରାହୀ",
          "କାଠ - ବିଜୟ କୃଷ୍ଣ ମହାନ୍ତି"
        ]
      },
      {
        "unit": "Odia Vyakarana (ମାଧ୍ୟମିକ ବ୍ୟାକରଣ)",
        "unitOdia": "ଓଡ଼ିଆ ବ୍ୟାକରଣ",
        "weightageMarks": 25,
        "topics": [
          "ବାକ୍ୟ ବିଚାର (ସରଳ, ଯୌଗିକ, ଜଟିଳ ଓ ମିଶ୍ର ବାକ୍ୟ)",
          "ସମାସ (ତତ୍ପୁରୁଷ, କର୍ମଧାରୟ, ଦ୍ୱନ୍ଦ୍ୱ, ବହୁବ୍ରୀହି, ଦ୍ୱିଗୁ)",
          "କୃଦନ୍ତ ଓ ତଦ୍ଧିତ ପଦ",
          "ରୂଢ଼ି ଓ ଲୋକବାଣୀ (Popular Odia Idioms & Proverbs)",
          "ଛନ୍ଦ ଓ ଅଳଙ୍କାର (ଉପମା, ରୂପକ, ଉତ୍ପ୍ରେକ୍ଷା)",
          "ଶବ୍ଦ ବିଧି ଓ ଅଶୁଦ୍ଧି ସଂଶୋଧନ (Spelling & Grammatical Corrections)"
        ]
      }
    ]
  },
  {
    "id": "math",
    "code": "MTH",
    "name": "Mathematics",
    "nameOdia": "ଗଣିତ",
    "paperType": "Paper IV - Compulsory",
    "icon": "📐",
    "poster": "/images/odisha-10th/math.png",
    "badge": "High Scoring",
    "accentColor": "#D9381E",
    "gradient": "linear-gradient(135deg, #FFF1F0 0%, #FFE4E6 100%)",
    "description": "Covers Odisha Class 10 Mathematics chapters: ସରଳ ସହସମୀକରଣ, ଦ୍ଵିଘାତ ସମୀକରଣ, ସମ୍ଭାବ୍ୟତା, ସମାନ୍ତର ପ୍ରଗତି, ପରିସଂଖ୍ୟାନ & ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା.",
    "descriptionOdia": "ସରଳ ସହସମୀକରଣ, ଦ୍ଵିଘାତ ସମୀକରଣ, ସମ୍ଭାବ୍ୟତା, ସମାନ୍ତର ପ୍ରଗତି, ପରିସଂଖ୍ୟାନ ଏବଂ ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା।",
    "subStreams": [
      "ସରଳ ସହସମୀକରଣ",
      "ଦ୍ଵିଘାତ ସମୀକରଣ",
      "ସମ୍ଭାବ୍ୟତା",
      "ସମାନ୍ତର ପ୍ରଗତି"
    ],
    "totalMarks": 100,
    "mcqMarks": 50,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "28.4k",
    "rating": "4.9",
    "isPopular": true,
    "chapters": [
      {
        "unit": "ସରଳ ସହସମୀକରଣ",
        "unitOdia": "Linear Simultaneous Equations",
        "weightageMarks": 10,
        "topics": [
          "ସରଳ ସହସମୀକରଣ",
          "Linear Simultaneous Equations",
          "ସମୀକରଣ ପ୍ରଣାଳୀ"
        ]
      },
      {
        "unit": "ଦ୍ଵିଘାତ ସମୀକରଣ",
        "unitOdia": "Quadratic Equations",
        "weightageMarks": 10,
        "topics": [
          "ଦ୍ଵିଘାତ ସମୀକରଣ",
          "Quadratic Equations",
          "ପ୍ରଭେଦକ"
        ]
      },
      {
        "unit": "ସମ୍ଭାବ୍ୟତା",
        "unitOdia": "Probability",
        "weightageMarks": 6,
        "topics": [
          "ସମ୍ଭାବ୍ୟତା",
          "Probability"
        ]
      },
      {
        "unit": "ସମାନ୍ତର ପ୍ରଗତି",
        "unitOdia": "Arithmetic Progression (AP)",
        "weightageMarks": 9,
        "topics": [
          "ସମାନ୍ତର ପ୍ରଗତି",
          "Arithmetic Progression",
          "AP"
        ]
      },
      {
        "unit": "ପରିସଂଖ୍ୟାନ",
        "unitOdia": "Statistics",
        "weightageMarks": 11,
        "topics": [
          "ପରିସଂଖ୍ୟାନ",
          "Statistics",
          "ମାଧ୍ୟମାନ"
        ]
      },
      {
        "unit": "ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା",
        "unitOdia": "Road Safety Education",
        "weightageMarks": 4,
        "topics": [
          "ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା",
          "Road Safety"
        ]
      }
    ]
  },
  {
    "id": "scl",
    "code": "SCL",
    "name": "Life Science",
    "nameOdia": "ଜୀବ ବିଜ୍ଞାନ",
    "paperType": "Paper V - Compulsory (SCL)",
    "icon": "🔬",
    "poster": "/images/odisha-10th/life-science.png",
    "badge": "Core Subject",
    "accentColor": "#0D9488",
    "gradient": "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
    "description": "Life Science chapter-wise objective MCQ tests for BSE Odisha Class 10.",
    "descriptionOdia": "ଜୀବ ବିଜ୍ଞାନ ଅଧ୍ୟାୟ ଭିତ୍ତିକ ବସ୍ତୁନିଷ୍ଠ ପ୍ରଶ୍ନ।",
    "subStreams": [
      "Life Science"
    ],
    "totalMarks": 100,
    "mcqMarks": 25,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "26.9k",
    "rating": "4.8",
    "isPopular": true,
    "chapters": [
      {
        "unit": "Nutrition",
        "unitOdia": "ପୋଷଣ",
        "topics": [
          "ଆଲୋକଶ୍ଳେଷଣ ଓ ହଜମ"
        ],
        "testId": 13
      },
      {
        "unit": "Respiration",
        "unitOdia": "ଶ୍ୱସନ",
        "topics": [
          "ବାୟୁ ଉପଜୀବୀ ଓ ଅପଜୀବୀ"
        ]
      },
      {
        "unit": "Transportation & Blood Circulation",
        "unitOdia": "ପରିବହନ ଓ ସଞ୍ଚାଳନ",
        "topics": []
      },
      {
        "unit": "Excretion",
        "unitOdia": "ରେଚନ",
        "topics": [
          "ବୃକ୍କକ ଓ ନେଫ୍ରନ୍"
        ]
      },
      {
        "unit": "Control & Coordination",
        "unitOdia": "ନିୟନ୍ତ୍ରଣ ଓ ସମନ୍ୱୟ",
        "topics": [
          "ସ୍ନାୟୁତନ୍ତ୍ର ଓ ହରମୋନ୍"
        ]
      },
      {
        "unit": "Reproduction in Plants & Animals",
        "unitOdia": "ପ୍ରଜନନ",
        "topics": []
      },
      {
        "unit": "Heredity & Evolution",
        "unitOdia": "ବଂଶାନୁକ୍ରମ ଓ ଜୈବ ବିବର୍ତ୍ତନ",
        "topics": []
      },
      {
        "unit": "Environment & Natural Resources",
        "unitOdia": "ଆମ ପରିବେଶ ଓ ପ୍ରାକୃତିକ ସମ୍ପଦ ପରିଚାଳନା",
        "topics": []
      }
    ]
  },
  {
    "id": "scp",
    "code": "SCP",
    "name": "Physical Science",
    "nameOdia": "ଭୌତିକ ବିଜ୍ଞାନ",
    "paperType": "Paper V - Compulsory (SCP)",
    "icon": "⚛️",
    "poster": "/images/odisha-10th/physical-science.png",
    "badge": "Core Subject",
    "accentColor": "#0D9488",
    "gradient": "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
    "description": "Physical Science chapter-wise objective MCQ tests for BSE Odisha Class 10.",
    "descriptionOdia": "ଭୌତିକ ବିଜ୍ଞାନ ଅଧ୍ୟାୟ ଭିତ୍ତିକ ବସ୍ତୁନିଷ୍ଠ ପ୍ରଶ୍ନ।",
    "subStreams": [
      "Physical Science"
    ],
    "totalMarks": 100,
    "mcqMarks": 25,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "26.9k",
    "rating": "4.8",
    "isPopular": true,
    "chapters": [
      {
        "unit": "Chemical Reactions & Equations",
        "unitOdia": "ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା ଓ ସମୀକରଣ",
        "topics": []
      },
      {
        "unit": "Acids, Bases & Salts",
        "unitOdia": "ଅମ୍ଳ, କ୍ଷାରକ ଓ ଲବଣ",
        "topics": []
      },
      {
        "unit": "Metals & Non-Metals",
        "unitOdia": "ଧାତୁ ଓ ଅଧାତୁ",
        "topics": []
      },
      {
        "unit": "Carbon & Its Compounds",
        "unitOdia": "କାର୍ବନ ଓ ଏହାର ଯୌଗିକ",
        "topics": []
      },
      {
        "unit": "Light: Reflection & Refraction",
        "unitOdia": "ଆଲୋକ: ପ୍ରତିଫଳନ ଓ ପ୍ରତିସରଣ",
        "topics": []
      },
      {
        "unit": "Human Eye & Colorful World",
        "unitOdia": "ମାନବ ଚକ୍ଷୁ ଓ ବର୍ଣ୍ଣବିଭବ୍",
        "topics": []
      },
      {
        "unit": "Electricity & Magnetic Effects",
        "unitOdia": "ବିଦ୍ୟୁତ୍ ଓ ବିଦ୍ୟୁତ୍ ଚୁମ୍ବକୀୟ ପ୍ରଭାବ",
        "topics": []
      },
      {
        "unit": "Sources of Energy",
        "unitOdia": "ଶକ୍ତିର ଉତ୍ସ",
        "topics": []
      }
    ]
  },
  {
    "id": "hps",
    "code": "HPS",
    "name": "History & Political Science",
    "nameOdia": "ଇତିହାସ ଓ ରାଜନୀତି ବିଜ୍ଞାନ",
    "paperType": "Paper VI - Compulsory (HPS)",
    "icon": "📜",
    "poster": "/images/odisha-10th/history.png",
    "badge": "Comprehensive",
    "accentColor": "#D97706",
    "gradient": "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    "description": "History & Political Science chapter-wise objective MCQ tests for BSE Odisha Class 10.",
    "descriptionOdia": "ଇତିହାସ ଓ ରାଜନୀତି ବିଜ୍ଞାନ ଅଧ୍ୟାୟ ଭିତ୍ତିକ ବସ୍ତୁନିଷ୍ଠ ପ୍ରଶ୍ନ।",
    "subStreams": [
      "History & Political Science"
    ],
    "totalMarks": 100,
    "mcqMarks": 25,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "21.5k",
    "rating": "4.8",
    "isPopular": false,
    "chapters": [
      {
        "unit": "National Movement & Gandhi",
        "unitOdia": "ଭାରତରେ ଜାତୀୟ ଆନ୍ଦୋଳନ ଓ ଗାନ୍ଧୀଜୀ",
        "topics": []
      },
      {
        "unit": "Freedom Struggle in Odisha",
        "unitOdia": "ଓଡ଼ିଶାରେ ଅସହଯୋଗ ଓ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ",
        "topics": []
      },
      {
        "unit": "Post-Independence India",
        "unitOdia": "ସ୍ୱାଧୀନତା ପରବର୍ତ୍ତୀ ଭାରତ ଓ ଓଡ଼ିଶାର ବିକାଶ",
        "topics": []
      },
      {
        "unit": "Constitution & Rights",
        "unitOdia": "ଭାରତର ସମ୍ବିଧାନ, ମୌଳିକ କର୍ତ୍ତବ୍ୟ ଓ ଅଧିକାର",
        "topics": []
      },
      {
        "unit": "Elections & Democracy",
        "unitOdia": "ଭାରତୀୟ ଗଣତନ୍ତ୍ର ଓ ନିର୍ବାଚନ ପ୍ରକ୍ରିୟା",
        "topics": []
      },
      {
        "unit": "India Foreign Policy",
        "unitOdia": "ଭାରତର ବୈଦେଶିକ ନୀତି",
        "topics": []
      }
    ]
  },
  {
    "id": "gec",
    "code": "GEC",
    "name": "Geography & Economics",
    "nameOdia": "ଭୂଗୋଳ ଓ ଅର୍ଥନୀତି",
    "paperType": "Paper VI - Compulsory (GEC)",
    "icon": "🌍",
    "poster": "/images/odisha-10th/geography.png",
    "badge": "Comprehensive",
    "accentColor": "#0E7490",
    "gradient": "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    "description": "Geography & Economics chapter-wise objective MCQ tests for BSE Odisha Class 10.",
    "descriptionOdia": "ଭୂଗୋଳ ଓ ଅର୍ଥନୀତି ଅଧ୍ୟାୟ ଭିତ୍ତିକ ବସ୍ତୁନିଷ୍ଠ ପ୍ରଶ୍ନ।",
    "subStreams": [
      "Geography & Economics"
    ],
    "totalMarks": 100,
    "mcqMarks": 25,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "21.5k",
    "rating": "4.8",
    "isPopular": false,
    "chapters": [
      {
        "unit": "Resources & Conservation",
        "unitOdia": "ସମ୍ବଳ: ବିକାଶ ଓ ସଂରକ୍ଷଣ",
        "topics": []
      },
      {
        "unit": "Forest, Wildlife & Water",
        "unitOdia": "ବନ, ବନ୍ୟପ୍ରାଣୀ ଓ ଜଳ ସମ୍ବଳ",
        "topics": []
      },
      {
        "unit": "Agriculture & Minerals",
        "unitOdia": "ଭାରତରେ କୃଷି ଓ ଖଣିଜ ସମ୍ବଳ",
        "topics": []
      },
      {
        "unit": "Energy & Industries",
        "unitOdia": "ଶକ୍ତି ସମ୍ବଳ ଓ ବିନିର୍ମାଣ ଉଦ୍ୟୋଗ",
        "topics": []
      },
      {
        "unit": "Economic Development & Liberalisation",
        "unitOdia": "ଅର୍ଥନୈତିକ ବିକାଶ ଓ ଉଦାରୀକରଣ",
        "topics": []
      },
      {
        "unit": "Consumer Awareness",
        "unitOdia": "ଖାଉଟି ସଚେତନତା",
        "topics": []
      }
    ]
  },
  {
    "id": "hindi",
    "code": "TLH",
    "name": "Third Language Hindi",
    "nameOdia": "ତୃତୀୟ ଭାଷା ହିନ୍ଦୀ",
    "paperType": "Paper III - Third Language",
    "icon": "🇮🇳",
    "poster": "/images/odisha-10th/hindi.png",
    "badge": "Third Language",
    "accentColor": "#059669",
    "gradient": "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    "description": "Objective mock tests for Third Language Hindi (ହିନ୍ଦୀ ସୌରଭ).",
    "descriptionOdia": "ତୃତୀୟ ଭାଷା ହିନ୍ଦୀ ଗଦ୍ୟ, ପଦ୍ୟ, ବ୍ୟାକରଣ ଓ ଶବ୍ଦାର୍ଥ ପ୍ରଶ୍ନପତ୍ର।",
    "subStreams": [
      "Hindi (ହିନ୍ଦୀ)"
    ],
    "totalMarks": 100,
    "mcqMarks": 50,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "15.2k",
    "rating": "4.8",
    "isPopular": false,
    "chapters": [
      {
        "unit": "Third Language Hindi (ହିନ୍ଦୀ)",
        "unitOdia": "ହିନ୍ଦୀ ବିଭାଗ",
        "weightageMarks": 50,
        "topics": [
          "अनमोल वाणी (कबीरदास व सूरदास)",
          "मनुष्यता (मैथिलीशरण गुप्त)",
          "मधुर भाषण (गुलाब राय)",
          "गिल्लू (महादेवी वर्मा)",
          "हिन्दी व्याकरण: संज्ञा, सर्वनाम, विशेषण, क्रिया",
          "काल ও वाच्य",
          "विलोम शब्द ଓ ପର୍ଯ୍ୟାୟବାଚୀ ଶବ୍ଦ"
        ]
      }
    ]
  },
  {
    "id": "sanskrit",
    "code": "TLS",
    "name": "Third Language Sanskrit",
    "nameOdia": "ତୃତୀୟ ଭାଷା ସଂସ୍କୃତ",
    "paperType": "Paper III - Third Language",
    "icon": "🕉️",
    "poster": "/images/odisha-10th/sanskrit.png",
    "badge": "Third Language",
    "accentColor": "#10B981",
    "gradient": "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    "description": "Objective mock tests for Third Language Sanskrit (ସଂସ୍କୃତ ମଞ୍ଜରୀ).",
    "descriptionOdia": "ତୃତୀୟ ଭାଷା ସଂସ୍କୃତ ଗଦ୍ୟ, ପଦ୍ୟ, ଶବ୍ଦରୂପ, ଧାତୁରୂପ ଓ ବ୍ୟାକରଣ ପ୍ରଶ୍ନପତ୍ର।",
    "subStreams": [
      "Sanskrit (ସଂସ୍କୃତ)"
    ],
    "totalMarks": 100,
    "mcqMarks": 50,
    "subjectiveMarks": 50,
    "durationMinutes": 45,
    "questionCount": 50,
    "attempts": "14.6k",
    "rating": "4.8",
    "isPopular": false,
    "chapters": [
      {
        "unit": "Third Language Sanskrit (ସଂସ୍କୃତ)",
        "unitOdia": "ସଂସ୍କୃତ ବିଭାଗ",
        "weightageMarks": 50,
        "topics": [
          "ଶ୍ରୀରାମସ୍ୟ ପିତୃଭକ୍ତିଃ (ଗଦ୍ୟ)",
          "ଯକ୍ଷପ୍ରଶ୍ନଃ (ଗଦ୍ୟ)",
          "ସ୍ୱାମୀ ବିବେକାନନ୍ଦଃ (ଗଦ୍ୟ)",
          "ଶିଶୁବାତ୍ସଲ୍ୟମ୍ (ପଦ୍ୟ)",
          "ସଂସ୍କୃତ ବ୍ୟାକରଣ: ଶବ୍ଦରୂପ (ବାଳକ, ଲତା, ନଦୀ, ଫଳ)",
          "ଧାତୁରୂପ (ଭୂ, ପଠ୍, ଗମ୍ - ଲଟ୍, ଲୋଟ୍, ଲଙ୍ଗ, ବିଧିଲିଙ୍ଗ, ଲୃଟ୍)",
          "ସନ୍ଧି ଓ ସମାସ",
          "କାରକ ଓ ବିଭକ୍ତି ପ୍ରୟୋଗ"
        ]
      }
    ]
  }
];

// Tests that are live now — shown in the "Available now" row above the subjects.
// Each needs a testId; the card links to /mocktest/test/{testId}.
export interface ActiveTest {
  id: string;
  subjectId: string;
  title: string;
  titleEn: string;
  subtitle: string;
  poster?: string;
  testId: number;
  questions?: number;
  minutes?: number;
}

export const ODISHA_10TH_ACTIVE: ActiveTest[] = [
  {
    id: 'scl-poshana',
    subjectId: 'scl',
    title: 'ପୋଷଣ',
    titleEn: 'Nutrition',
    subtitle: 'ଜୀବ ବିଜ୍ଞାନ (SCL)',
    poster: '/images/odisha-10th/life-science.png',
    testId: 13,
  },
];
