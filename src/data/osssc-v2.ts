/**
 * Content for the new OSSSC hub page (/mocktest/osssc/new).
 * Every user-facing string is bilingual: { en, or } (English / Odia).
 *
 * UI only for now — questions, leaderboard and exam dates are static samples
 * until the API is ready. Odia text should be proofread before going live.
 */

export type L = { en: string; or: string };

export const OSSSC_V2_PAGE = "/mocktest/osssc/new";

// ── Posts ─────────────────────────────────────────────

export interface V2Post {
  id: string;
  short: string;
  name: L;
  ready: boolean; // false → tab shows "Soon"
}

export const v2Posts: V2Post[] = [
  { id: "ri-ari-amin", short: "RI · ARI · Amin", name: { en: "Revenue Inspector, ARI & Amin", or: "ରାଜସ୍ୱ ନିରୀକ୍ଷକ, ARI ଓ ଆମିନ" }, ready: true },
  { id: "ja", short: "Junior Assistant", name: { en: "Junior Assistant", or: "କନିଷ୍ଠ ସହାୟକ" }, ready: false },
  { id: "icds", short: "ICDS Supervisor", name: { en: "ICDS Supervisor", or: "ICDS ସୁପରଭାଇଜର" }, ready: false },
  { id: "vaw", short: "VAW", name: { en: "Village Agriculture Worker", or: "ଗ୍ରାମ କୃଷି କର୍ମୀ" }, ready: false },
];

// ── Subjects & syllabus ───────────────────────────────

export interface V2Subject {
  id: string;
  icon: string;
  color: string;
  name: L;
  topics: L[];
}

export const v2Subjects: Record<string, V2Subject> = {
  english: {
    id: "english",
    icon: "🔤",
    color: "#1D4ED8",
    name: { en: "General English", or: "ସାଧାରଣ ଇଂରାଜୀ" },
    topics: [
      { en: "Grammar", or: "ବ୍ୟାକରଣ" },
      { en: "Vocabulary", or: "ଶବ୍ଦ ଭଣ୍ଡାର" },
      { en: "Error spotting", or: "ତ୍ରୁଟି ଚିହ୍ନଟ" },
      { en: "Reading comprehension", or: "ବୋଧପରୀକ୍ଷା" },
    ],
  },
  odia: {
    id: "odia",
    icon: "ଅ",
    color: "#B45309",
    name: { en: "Odia Language", or: "ଓଡ଼ିଆ ଭାଷା" },
    topics: [
      { en: "Grammar", or: "ବ୍ୟାକରଣ" },
      { en: "Sandhi & Samasa", or: "ସନ୍ଧି ଓ ସମାସ" },
      { en: "Synonyms & antonyms", or: "ସମାର୍ଥକ ଓ ବିପରୀତାର୍ଥକ ଶବ୍ଦ" },
      { en: "Comprehension", or: "ବୋଧପରୀକ୍ଷା" },
    ],
  },
  gk: {
    id: "gk",
    icon: "🌏",
    color: "#0E7490",
    name: { en: "General Knowledge & Current Affairs", or: "ସାଧାରଣ ଜ୍ଞାନ ଓ ସାମ୍ପ୍ରତିକ ଘଟଣା" },
    topics: [
      { en: "Indian history", or: "ଭାରତୀୟ ଇତିହାସ" },
      { en: "Geography", or: "ଭୂଗୋଳ" },
      { en: "Indian polity", or: "ଭାରତୀୟ ରାଜନୀତି" },
      { en: "Economy", or: "ଅର୍ଥନୀତି" },
      { en: "General science", or: "ସାଧାରଣ ବିଜ୍ଞାନ" },
      { en: "Current affairs", or: "ସାମ୍ପ୍ରତିକ ଘଟଣା" },
    ],
  },
  odisha: {
    id: "odisha",
    icon: "🛕",
    color: "#B00020",
    name: { en: "Odisha GK", or: "ଓଡ଼ିଶା ସାଧାରଣ ଜ୍ଞାନ" },
    topics: [
      { en: "History & culture", or: "ଇତିହାସ ଓ ସଂସ୍କୃତି" },
      { en: "Geography of Odisha", or: "ଓଡ଼ିଶାର ଭୂଗୋଳ" },
      { en: "Government schemes", or: "ସରକାରୀ ଯୋଜନା" },
      { en: "Land & revenue administration", or: "ଭୂମି ଓ ରାଜସ୍ୱ ପ୍ରଶାସନ" },
    ],
  },
  arithmetic: {
    id: "arithmetic",
    icon: "➗",
    color: "#7C3AED",
    name: { en: "Arithmetic", or: "ପାଟୀଗଣିତ" },
    topics: [
      { en: "Percentage", or: "ଶତକଡ଼ା" },
      { en: "Ratio & proportion", or: "ଅନୁପାତ ଓ ସମାନୁପାତ" },
      { en: "Profit & loss", or: "ଲାଭ ଓ କ୍ଷତି" },
      { en: "Time & work", or: "ସମୟ ଓ କାର୍ଯ୍ୟ" },
      { en: "Area & mensuration", or: "କ୍ଷେତ୍ରଫଳ ଓ ପରିମିତି" },
    ],
  },
  reasoning: {
    id: "reasoning",
    icon: "🧩",
    color: "#BE185D",
    name: { en: "Reasoning", or: "ମାନସିକ ଦକ୍ଷତା" },
    topics: [
      { en: "Number series", or: "ସଂଖ୍ୟା ଶ୍ରେଣୀ" },
      { en: "Coding-decoding", or: "କୋଡିଂ-ଡିକୋଡିଂ" },
      { en: "Blood relations", or: "ରକ୍ତ ସମ୍ପର୍କ" },
      { en: "Directions", or: "ଦିଗ ନିର୍ଣ୍ଣୟ" },
    ],
  },
  computer: {
    id: "computer",
    icon: "💻",
    color: "#15803D",
    name: { en: "Computer Awareness", or: "କମ୍ପ୍ୟୁଟର ଜ୍ଞାନ" },
    topics: [
      { en: "Computer basics", or: "କମ୍ପ୍ୟୁଟର ମୌଳିକ ଜ୍ଞାନ" },
      { en: "MS Word, Excel & PowerPoint", or: "MS Word, Excel ଓ PowerPoint" },
      { en: "Internet & email", or: "ଇଣ୍ଟରନେଟ ଓ ଇମେଲ" },
      { en: "Keyboard shortcuts", or: "କିବୋର୍ଡ ସର୍ଟକଟ" },
    ],
  },
  survey: {
    id: "survey",
    icon: "📏",
    color: "#475569",
    name: { en: "Survey & Land Records", or: "ସର୍ଭେ ଓ ଭୂ-ଅଭିଲେଖ" },
    topics: [
      { en: "Land measurement units", or: "ଜମି ମାପ ଏକକ" },
      { en: "Chain & plane table survey", or: "ଚେନ ଓ ପ୍ଲେନ ଟେବୁଲ ସର୍ଭେ" },
      { en: "Record of Rights (RoR)", or: "ସ୍ୱତ୍ୱଲିପି (RoR)" },
      { en: "Maps & plots", or: "ନକ୍ସା ଓ ପ୍ଲଟ" },
    ],
  },
  typing: {
    id: "typing",
    icon: "⌨️",
    color: "#1E3A8A",
    name: { en: "Typing & Practical", or: "ଟାଇପିଂ ଓ ବ୍ୟବହାରିକ" },
    topics: [
      { en: "English typing speed", or: "ଇଂରାଜୀ ଟାଇପିଂ ଗତି" },
      { en: "Accuracy & error count", or: "ସଠିକତା ଓ ତ୍ରୁଟି ସଂଖ୍ୟା" },
      { en: "MS Word document task", or: "MS Word ଡକ୍ୟୁମେଣ୍ଟ କାର୍ଯ୍ୟ" },
      { en: "MS Excel sheet task", or: "MS Excel ସିଟ କାର୍ଯ୍ୟ" },
    ],
  },
};

// ── Exam stages (syllabus tabs + pattern table) ───────
// TODO: verify every number against the latest official OSSSC notification.

export interface V2Stage {
  id: string;
  name: L;
  mode: L;
  questions: string;
  marks: string;
  duration: L;
  negative: L;
  note: L;
  subjects: string[]; // keys of v2Subjects
}

export const v2Stages: V2Stage[] = [
  {
    id: "prelims",
    name: { en: "Preliminary", or: "ପ୍ରାଥମିକ ପରୀକ୍ଷା" },
    mode: { en: "Objective (OMR)", or: "ବସ୍ତୁନିଷ୍ଠ (OMR)" },
    questions: "150",
    marks: "150",
    duration: { en: "2 hrs", or: "2 ଘଣ୍ଟା" },
    negative: { en: "0.25 per wrong answer", or: "ପ୍ରତି ଭୁଲ ଉତ୍ତର ପାଇଁ 0.25" },
    note: { en: "Qualifying – shortlists for Main", or: "ଯୋଗ୍ୟତା ନିର୍ଣ୍ଣାୟକ – ମୁଖ୍ୟ ପରୀକ୍ଷା ପାଇଁ" },
    subjects: ["gk", "odisha", "english", "odia", "arithmetic", "reasoning", "computer"],
  },
  {
    id: "mains",
    name: { en: "Main", or: "ମୁଖ୍ୟ ପରୀକ୍ଷା" },
    mode: { en: "Objective (CBT/OMR)", or: "ବସ୍ତୁନିଷ୍ଠ (CBT/OMR)" },
    questions: "200",
    marks: "200",
    duration: { en: "2 hrs 30 min", or: "2 ଘଣ୍ଟା 30 ମିନିଟ" },
    negative: { en: "0.25 per wrong answer", or: "ପ୍ରତି ଭୁଲ ଉତ୍ତର ପାଇଁ 0.25" },
    note: { en: "Merit list is based on this stage", or: "ଏହି ପରୀକ୍ଷା ଆଧାରରେ ମେଧା ତାଲିକା" },
    subjects: ["odia", "english", "arithmetic", "gk", "odisha", "survey"],
  },
  {
    id: "cst",
    name: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" },
    mode: { en: "Practical on computer", or: "କମ୍ପ୍ୟୁଟରରେ ବ୍ୟବହାରିକ" },
    questions: "—",
    marks: "50",
    duration: { en: "30 min", or: "30 ମିନିଟ" },
    negative: { en: "None", or: "ନାହିଁ" },
    note: { en: "Qualifying only", or: "କେବଳ ଯୋଗ୍ୟତା ନିର୍ଣ୍ଣାୟକ" },
    subjects: ["computer", "typing"],
  },
];

// ── Question of the day ───────────────────────────────

export interface V2Mcq {
  id: string;
  subject: string; // key of v2Subjects
  q: L;
  options: L[];
  answer: number; // index into options
  explain: L;
}

export const v2DailyQuestions: V2Mcq[] = [
  {
    id: "qd-chilika",
    subject: "odisha",
    q: { en: "Which is the largest brackish water lagoon in India?", or: "ଭାରତର ସବୁଠାରୁ ବଡ଼ ଲୁଣିପାଣି ହ୍ରଦ କେଉଁଟି?" },
    options: [
      { en: "Pulicat Lake", or: "ପୁଲିକଟ ହ୍ରଦ" },
      { en: "Chilika Lake", or: "ଚିଲିକା ହ୍ରଦ" },
      { en: "Vembanad Lake", or: "ଭେମ୍ବନାଡ ହ୍ରଦ" },
      { en: "Kolleru Lake", or: "କୋଲ୍ଲେରୁ ହ୍ରଦ" },
    ],
    answer: 1,
    explain: {
      en: "Chilika spreads across Puri, Khordha and Ganjam districts of Odisha.",
      or: "ଚିଲିକା ହ୍ରଦ ଓଡ଼ିଶାର ପୁରୀ, ଖୋର୍ଦ୍ଧା ଓ ଗଞ୍ଜାମ ଜିଲ୍ଲାରେ ବିସ୍ତାରିତ।",
    },
  },
  {
    id: "qd-utkal-divas",
    subject: "odisha",
    q: { en: "On which date did Odisha become a separate province?", or: "ଓଡ଼ିଶା କେବେ ଏକ ସ୍ୱତନ୍ତ୍ର ପ୍ରଦେଶ ଭାବେ ଗଠିତ ହୋଇଥିଲା?" },
    options: [
      { en: "1 April 1936", or: "1 ଏପ୍ରିଲ 1936" },
      { en: "15 August 1947", or: "15 ଅଗଷ୍ଟ 1947" },
      { en: "26 January 1950", or: "26 ଜାନୁଆରୀ 1950" },
      { en: "1 November 1956", or: "1 ନଭେମ୍ବର 1956" },
    ],
    answer: 0,
    explain: {
      en: "The day is celebrated every year as Utkal Divas (Odisha Day).",
      or: "ଏହି ଦିନକୁ ପ୍ରତିବର୍ଷ ଉତ୍କଳ ଦିବସ ଭାବେ ପାଳନ କରାଯାଏ।",
    },
  },
  {
    id: "qd-select-all",
    subject: "computer",
    q: { en: "Which shortcut selects all text in MS Word?", or: "MS Word ରେ ସମସ୍ତ ଲେଖା ଚୟନ (Select All) କରିବାର ସର୍ଟକଟ କେଉଁଟି?" },
    options: [
      { en: "Ctrl + S", or: "Ctrl + S" },
      { en: "Ctrl + A", or: "Ctrl + A" },
      { en: "Ctrl + X", or: "Ctrl + X" },
      { en: "Ctrl + P", or: "Ctrl + P" },
    ],
    answer: 1,
    explain: {
      en: "Ctrl + S saves, Ctrl + X cuts and Ctrl + P prints.",
      or: "Ctrl + S ସେଭ, Ctrl + X କଟ ଓ Ctrl + P ପ୍ରିଣ୍ଟ କରେ।",
    },
  },
  {
    id: "qd-decimal",
    subject: "survey",
    q: { en: "If 1 acre = 100 decimals, how many decimals are there in 2.5 acres?", or: "1 ଏକର = 100 ଡିସମିଲ ହେଲେ, 2.5 ଏକରରେ କେତେ ଡିସମିଲ?" },
    options: [
      { en: "25", or: "25" },
      { en: "205", or: "205" },
      { en: "250", or: "250" },
      { en: "2500", or: "2500" },
    ],
    answer: 2,
    explain: { en: "2.5 × 100 = 250 decimals.", or: "2.5 × 100 = 250 ଡିସମିଲ।" },
  },
  {
    id: "qd-konark",
    subject: "odisha",
    q: { en: "Who built the Konark Sun Temple?", or: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର କିଏ ନିର୍ମାଣ କରିଥିଲେ?" },
    options: [
      { en: "Anantavarman Chodaganga Deva", or: "ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ" },
      { en: "Narasimha Deva I", or: "ପ୍ରଥମ ନରସିଂହ ଦେବ" },
      { en: "Kapilendra Deva", or: "କପିଳେନ୍ଦ୍ର ଦେବ" },
      { en: "Kharavela", or: "ଖାରବେଳ" },
    ],
    answer: 1,
    explain: {
      en: "Narasimha Deva I of the Eastern Ganga dynasty built it in the 13th century.",
      or: "ପୂର୍ବ ଗଙ୍ଗ ବଂଶର ପ୍ରଥମ ନରସିଂହ ଦେବ 13ଶ ଶତାବ୍ଦୀରେ ଏହା ନିର୍ମାଣ କରିଥିଲେ।",
    },
  },
];

/** Same question for everyone on the same IST calendar day. */
export function questionOfTheDay(now = Date.now()): V2Mcq {
  const istDay = Math.floor((now + 330 * 60_000) / 86_400_000);
  return v2DailyQuestions[istDay % v2DailyQuestions.length];
}

// ── Live test leaderboard (sample) ────────────────────

export interface V2Rank {
  name: string;
  district: L;
  score: number;
  total: number;
  time: string; // mm:ss
}

export const v2Leaderboard: V2Rank[] = [
  { name: "Ananya Mohanty", district: { en: "Cuttack", or: "କଟକ" }, score: 48, total: 50, time: "21:40" },
  { name: "Sourav Behera", district: { en: "Ganjam", or: "ଗଞ୍ଜାମ" }, score: 47, total: 50, time: "19:12" },
  { name: "Priyanka Das", district: { en: "Khordha", or: "ଖୋର୍ଦ୍ଧା" }, score: 47, total: 50, time: "24:05" },
  { name: "Rakesh Sahoo", district: { en: "Puri", or: "ପୁରୀ" }, score: 46, total: 50, time: "22:31" },
  { name: "Smruti Rout", district: { en: "Balasore", or: "ବାଲେଶ୍ୱର" }, score: 45, total: 50, time: "20:47" },
  { name: "Bikash Nayak", district: { en: "Mayurbhanj", or: "ମୟୂରଭଞ୍ଜ" }, score: 45, total: 50, time: "25:58" },
  { name: "Lipsa Panda", district: { en: "Sambalpur", or: "ସମ୍ବଲପୁର" }, score: 44, total: 50, time: "23:16" },
  { name: "Debasish Swain", district: { en: "Kendrapara", or: "କେନ୍ଦ୍ରାପଡ଼ା" }, score: 44, total: 50, time: "26:02" },
  { name: "Subhashree Jena", district: { en: "Jajpur", or: "ଯାଜପୁର" }, score: 43, total: 50, time: "22:09" },
  { name: "Manas Pradhan", district: { en: "Koraput", or: "କୋରାପୁଟ" }, score: 43, total: 50, time: "27:44" },
];

// ── Exam updates (sample) ─────────────────────────────

export type V2UpdateStatus = "out" | "soon" | "tba";

export interface V2Update {
  title: L;
  date: L;
  status: V2UpdateStatus;
  href?: string;
}

export const v2Updates: V2Update[] = [
  { title: { en: "RI, ARI & Amin recruitment notification", or: "RI, ARI ଓ ଆମିନ ନିଯୁକ୍ତି ବିଜ୍ଞପ୍ତି" }, date: { en: "To be announced", or: "ଘୋଷଣା ହେବ" }, status: "tba" },
  { title: { en: "Online application window", or: "ଅନଲାଇନ ଆବେଦନ" }, date: { en: "To be announced", or: "ଘୋଷଣା ହେବ" }, status: "tba" },
  { title: { en: "Preliminary exam admit card", or: "ପ୍ରାଥମିକ ପରୀକ୍ଷା ପ୍ରବେଶ ପତ୍ର" }, date: { en: "To be announced", or: "ଘୋଷଣା ହେବ" }, status: "tba" },
  { title: { en: "Preliminary exam date", or: "ପ୍ରାଥମିକ ପରୀକ୍ଷା ତାରିଖ" }, date: { en: "To be announced", or: "ଘୋଷଣା ହେବ" }, status: "tba" },
];

// ── FAQ ───────────────────────────────────────────────

export const v2Faq: { q: L; a: L }[] = [
  {
    q: { en: "Is Brinto OSSSC practice free?", or: "Brinto OSSSC ଅଭ୍ୟାସ ମାଗଣା କି?" },
    a: {
      en: "Yes. Every mock test, practice question and the daily live test is free, always.",
      or: "ହଁ। ସମସ୍ତ ମକ୍ ଟେଷ୍ଟ, ଅଭ୍ୟାସ ପ୍ରଶ୍ନ ଓ ଦୈନିକ ଲାଇଭ ଟେଷ୍ଟ ସର୍ବଦା ମାଗଣା।",
    },
  },
  {
    q: { en: "When is the daily live test?", or: "ଦୈନିକ ଲାଇଭ ଟେଷ୍ଟ କେବେ ହୁଏ?" },
    a: {
      en: "Every day at 8:00 PM IST. Everyone attempts the same paper and gets an All-Odisha rank.",
      or: "ପ୍ରତିଦିନ ରାତି 8:00 ରେ। ସମସ୍ତେ ସମାନ ପ୍ରଶ୍ନପତ୍ର ଦିଅନ୍ତି ଏବଂ ସମଗ୍ର ଓଡ଼ିଶା ସ୍ତରରେ ର‍୍ୟାଙ୍କ ପାଆନ୍ତି।",
    },
  },
  {
    q: { en: "Are the questions available in Odia?", or: "ପ୍ରଶ୍ନଗୁଡ଼ିକ ଓଡ଼ିଆରେ ଉପଲବ୍ଧ କି?" },
    a: {
      en: "Yes. Use the English / ଓଡ଼ିଆ switch at the top of the page to change the language.",
      or: "ହଁ। ଭାଷା ବଦଳାଇବା ପାଇଁ ପୃଷ୍ଠାର ଉପରେ ଥିବା English / ଓଡ଼ିଆ ବଟନ ବ୍ୟବହାର କରନ୍ତୁ।",
    },
  },
  {
    q: { en: "Do I need to log in?", or: "ମୋତେ ଲଗଇନ କରିବାକୁ ପଡ଼ିବ କି?" },
    a: {
      en: "You can start the first tests without logging in. A free login unlocks every test and saves your progress and rank.",
      or: "ପ୍ରଥମ କିଛି ଟେଷ୍ଟ ଲଗଇନ ବିନା ଦେଇପାରିବେ। ମାଗଣା ଲଗଇନ କଲେ ସବୁ ଟେଷ୍ଟ ଖୋଲିଯିବ ଏବଂ ଆପଣଙ୍କ ପ୍ରଗତି ଓ ର‍୍ୟାଙ୍କ ସେଭ ହେବ।",
    },
  },
  {
    q: { en: "Which posts are covered?", or: "କେଉଁ ପଦବୀ ପାଇଁ ପ୍ରସ୍ତୁତି ମିଳିବ?" },
    a: {
      en: "We start with Revenue Inspector, ARI and Amin. Junior Assistant, ICDS Supervisor and VAW are coming next.",
      or: "ପ୍ରଥମେ ରାଜସ୍ୱ ନିରୀକ୍ଷକ, ARI ଓ ଆମିନ। କନିଷ୍ଠ ସହାୟକ, ICDS ସୁପରଭାଇଜର ଓ VAW ଶୀଘ୍ର ଆସୁଛି।",
    },
  },
];
