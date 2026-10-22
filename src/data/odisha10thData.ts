// src/data/odisha10thData.ts
// Static data for BSE Odisha Class 10 (HSC Matriculation) Mock Tests

export interface Question {
  id: number;
  subjectId: string;
  section: string;
  text: string;
  textOdia?: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
  explanationOdia?: string;
  topic?: string;
}

// Subjects & chapters now live in src/lib/odisha/hsc/10/subjects.ts (re-exported for existing imports).
export { ODISHA_10TH_SUBJECTS } from '../lib/odisha/hsc/10/subjects';
export type { SubjectModule, Chapter } from '../lib/odisha/hsc/10/subjects';

// Rich static questions for interactive test simulation across all subjects
export const ODISHA_10TH_QUESTIONS: Question[] = [
  // ── MATHEMATICS (MTH) ──
  {
    id: 1,
    subjectId: 'math',
    section: 'ସରଳ ସହସମୀକରଣ',
    topic: 'ସରଳ ସହସମୀକରଣ',
    text: 'For what value of k will the pair of linear equations 2x + 3y = 7 and (k - 1)x + (k + 2)y = 3k have infinitely many solutions?',
    textOdia: 'k ର କେଉଁ ମାନ ପାଇଁ 2x + 3y = 7 ଏବଂ (k - 1)x + (k + 2)y = 3k ସହସମୀକରଣ ଦ୍ୱୟର ଅସଂଖ୍ୟ ସମାଧାନ ରହିବ?',
    options: ['k = 5', 'k = 2', 'k = 7', 'k = 3'],
    correct: 0,
    explanation: 'For infinitely many solutions, a1/a2 = b1/b2 = c1/c2. 2/(k-1) = 3/(k+2) = 7/3k, which yields k = 5.',
    explanationOdia: 'ଅସଂଖ୍ୟ ସମାଧାନ ପାଇଁ a1/a2 = b1/b2 = c1/c2 ହୁଏ। ଏହାକୁ ସମାଧାନ କଲେ k = 5 ମିଳେ।',
  },
  {
    id: 2,
    subjectId: 'math',
    section: 'ଦ୍ଵିଘାତ ସମୀକରଣ',
    topic: 'ଦ୍ଵିଘାତ ସମୀକରଣ',
    text: 'What is the nature of roots for the quadratic equation ax² + bx + c = 0 when the discriminant D = b² - 4ac > 0 and is a perfect square?',
    textOdia: 'ax² + bx + c = 0 ଦ୍ୱିଘାତ ସମୀକରଣର ପ୍ରଭେଦକ (D = b² - 4ac) > 0 ଏବଂ ଏକ ପୂର୍ଣ୍ଣବର୍ଗ ରାଶି ହେଲେ, ମୂଳଦ୍ୱୟର ପ୍ରକୃତି କ’ଣ ହେବ?',
    options: [
      'Real, unequal & rational (ବାସ୍ତବ, ଅସମାନ ଓ ପରିମେୟ)',
      'Real and equal (ବାସ୍ତବ ଓ ସମାନ)',
      'Imaginary / No real roots (ଅବାସ୍ତବ / କାଳ୍ପନିକ)',
      'Real, unequal & irrational (ବାସ୍ତବ, ଅସମାନ ଓ ଅପରିମେୟ)',
    ],
    correct: 0,
    explanation: 'When D > 0 and a perfect square, the roots are real, unequal, and rational (ବାସ୍ତବ, ଅସମାନ ଓ ପରିମେୟ).',
    explanationOdia: 'ଯେତେବେଳେ ପ୍ରଭେଦକ D = b² - 4ac > 0 ଏବଂ ଏହା ଏକ ପୂର୍ଣ୍ଣବର୍ଗ ସଂଖ୍ୟା ହୁଏ, ସେତେବେଳେ ସମୀକରଣର ମୂଳଦ୍ୱୟ ବାସ୍ତବ, ଅସମାନ ଓ ପରିମେୟ ହୁଅନ୍ତି।',
  },
  {
    id: 3,
    subjectId: 'math',
    section: 'ସମ୍ଭାବ୍ୟତା',
    topic: 'ସମ୍ଭାବ୍ୟତା',
    text: 'If the probability of an event E happening is P(E) = 0.05, what is the probability of not E, P(E\')?',
    textOdia: 'ଗୋଟିଏ ଘଟଣା E ଘଟିବାର ସମ୍ଭାବ୍ୟତା P(E) = 0.05 ହେଲେ, ଘଟଣାଟି ନ ଘଟିବାର ସମ୍ଭାବ୍ୟତା P(E\') କେତେ?',
    options: ['0.95', '0.05', '0.50', '1.05'],
    correct: 0,
    explanation: 'P(E\') = 1 - P(E) = 1 - 0.05 = 0.95.',
    explanationOdia: 'P(E\') = 1 - P(E) = 1 - 0.05 = 0.95।',
  },
  {
    id: 4,
    subjectId: 'math',
    section: 'ସମାନ୍ତର ପ୍ରଗତି',
    topic: 'ସମାନ୍ତର ପ୍ରଗତି',
    text: 'If the nth term of an AP is given by tn = 3n + 5, what is its common difference (d)?',
    textOdia: 'ଗୋଟିଏ ସମାନ୍ତର ପ୍ରଗତି (A.P.) ର n-ତମ ପଦ tn = 3n + 5 ହେଲେ, ଏହାର ସାଧାରଣ ଅନ୍ତର (d) କେତେ?',
    options: ['2', '3', '5', '8'],
    correct: 1,
    explanation: 't1 = 3(1) + 5 = 8; t2 = 3(2) + 5 = 11. Common difference d = t2 - t1 = 11 - 8 = 3. In any linear AP tn = an + b, the common difference is the coefficient of n, which is 3.',
    explanationOdia: 'tn = 3n + 5 ରେ t1 = 8 ଓ t2 = 11। ତେଣୁ ସାଧାରଣ ଅନ୍ତର d = t2 - t1 = 11 - 8 = 3।',
  },
  {
    id: 5,
    subjectId: 'math',
    section: 'ପରିସଂଖ୍ୟାନ',
    topic: 'ପରିସଂଖ୍ୟାନ',
    text: 'What is the empirical relationship between mean, median, and mode in statistics?',
    textOdia: 'ପରିସଂଖ୍ୟାନରେ ମାଧ୍ୟମାନ (Mean), ମଧ୍ୟମା (Median) ଏବଂ ଗରିଷ୍ଠକ (Mode) ମଧ୍ୟରେ ସମ୍ପର୍କ କ’ଣ?',
    options: [
      'Mode = 3(Median) - 2(Mean)',
      'Mode = 2(Median) - 3(Mean)',
      'Mode = 3(Mean) - 2(Median)',
      'Median = 3(Mode) - 2(Mean)',
    ],
    correct: 0,
    explanation: 'The empirical relationship is Mode = 3(Median) - 2(Mean).',
    explanationOdia: 'ପରିସଂଖ୍ୟାନର ଆନୁଭବିକ ସମ୍ପର୍କ ଅନୁଯାୟୀ, ଗରିଷ୍ଠକ (Mode) = 3(ମଧ୍ୟମା) - 2(ମାଧ୍ୟମାନ)।',
  },
  {
    id: 6,
    subjectId: 'math',
    section: 'ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା',
    topic: 'ସଡ଼କ ସୁରକ୍ଷା ଶିକ୍ଷା',
    text: 'Which traffic signal color indicates that a vehicle must stop completely before the intersection or crosswalk?',
    textOdia: 'ଟ୍ରାଫ୍‌କ ସଙ୍କେତରେ କେଉଁ ରଙ୍ଗର ଆଲୋକ ଗାଡ଼ିକୁ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ରହଣି କରିବାକୁ ସୂଚାଏ?',
    options: ['Red (ଲାଲ୍)', 'Green (ସବୁଜ)', 'Yellow (ହଳଦିଆ)', 'Blue (ନୀଳ)'],
    correct: 0,
    explanation: 'Red traffic light indicates mandatory stop.',
    explanationOdia: 'ଲାଲ୍ ରଙ୍ଗର ଆଲୋକ ଗାଡ଼ିକୁ ଠିକ୍ ସ୍ଥାନରେ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ଅଟକିବାକୁ ସୂଚାଏ।',
  },

  // ── SCIENCE (GSC - SCP & SCL) ──
  {
    id: 7,
    subjectId: 'scp',
    section: 'Physical Science (SCP)',
    topic: 'ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା',
    text: 'When zinc reacts with dilute sulphuric acid (H2SO4), which gas is liberated?',
    textOdia: 'ଦସ୍ତା (Zinc) ଲଘୁ ସଲଫ୍ୟୁରିକ୍ ଏସିଡ୍ (H2SO4) ସହିତ ପ୍ରତିକ୍ରିୟା କଲେ କେଉଁ ଗ୍ୟାସ୍ ନିର୍ଗତ ହୁଏ?',
    options: [
      'Oxygen (ଅମ୍ଳଜାନ - O2)',
      'Hydrogen (ଉଦ୍‌ଜାନ - H2)',
      'Carbon Dioxide (ଅଙ୍ଗାରକାମ୍ଳ - CO2)',
      'Sulphur Dioxide (ସଲଫର ଡାଇଅକ୍ସାଇଡ୍ - SO2)',
    ],
    correct: 1,
    explanation: 'Zn + H2SO4 → ZnSO4 + H2↑. Zinc reacts with dilute acids to produce zinc sulphate and liberate Hydrogen gas.',
    explanationOdia: 'Zn + H2SO4 → ZnSO4 + H2↑। ଦସ୍ତା ଏସିଡ୍ ସହ ପ୍ରତିକ୍ରିୟା କରି ଉଦ୍‌ଜାନ (H2) ଗ୍ୟାସ୍ ପ୍ରସ୍ତୁତ କରେ।',
  },
  {
    id: 8,
    subjectId: 'scp',
    section: 'Physical Science (SCP)',
    topic: 'ଆଲୋକ: ପ୍ରତିଫଳନ',
    text: 'What type of mirror is primarily used by dentists to view enlarged images of patients’ teeth?',
    textOdia: 'ଦନ୍ତ ଚିକିତ୍ସକମାନେ ରୋଗୀର ଦାନ୍ତକୁ ବଡ଼ ଆକାରରେ ଦେଖିବା ପାଇଁ ସାଧାରଣତଃ କେଉଁ ପ୍ରକାର ଦର୍ପଣ ବ୍ୟବହାର କରନ୍ତି?',
    options: [
      'Concave mirror (ଅବତଳ ଦର୍ପଣ)',
      'Convex mirror (ଉତ୍ତଳ ଦର୍ପଣ)',
      'Plane mirror (ସମତଳ ଦର୍ପଣ)',
      'Cylindrical mirror (ସିଲିଣ୍ଡ୍ରିକାଲ ଦର୍ପଣ)',
    ],
    correct: 0,
    explanation: 'Dentists use concave mirrors because when an object is placed between the pole and focus, it forms a magnified, erect virtual image.',
    explanationOdia: 'ଅବତଳ ଦର୍ପଣ (Concave Mirror) ସାହାଯ୍ୟରେ ପୋଲ୍ ଓ ଫୋକସ୍ ମଧ୍ୟରେ ଥିବା ବସ୍ତୁର ଆଭାସୀ, ସଳଖ ଓ ବର୍ଦ୍ଧିତ ପ୍ରତିବିମ୍ବ ମିଳିଥାଏ।',
  },
  {
    id: 9,
    subjectId: 'scl',
    section: 'Life Science (SCL)',
    topic: 'ପୋଷଣ (Nutrition)',
    text: 'In human digestive system, which enzyme present in saliva begins the breakdown of starch into maltose?',
    textOdia: 'ମଣିଷର ଲାଳ (Saliva) ରେ ଥିବା କେଉଁ ଏଞ୍ଜାଇମ୍ ଶ୍ୱେତସାର (Starch) କୁ ମାଲ୍‌ଟୋଜ୍ ରେ ପରିଣତ କରିବାରେ ସାହାଯ୍ୟ କରେ?',
    options: [
      'Pepsin (ପେପ୍‌ସିନ୍)',
      'Salivary Amylase / Ptyalin (ଲାଳ ଆମାଇଲେଜ୍ / ଟାୟାଲିନ୍)',
      'Trypsin (ଟ୍ରିପ୍‌ସିନ୍)',
      'Lipase (ଲାଇପେଜ୍)',
    ],
    correct: 1,
    explanation: 'Salivary amylase (also known as ptyalin) digests starch into maltose in the mouth cavity.',
    explanationOdia: 'ଲାଳରେ ଟାୟାଲିନ୍ ବା ଲାଳ ଆମାଇଲେଜ୍ (Salivary Amylase) ଥାଏ ଯାହା ଜଟିଳ ଶ୍ୱେତସାରକୁ ସରଳ ମାଲ୍‌ଟୋଜ୍ ରେ ପରିଣତ କରେ।',
  },
  {
    id: 10,
    subjectId: 'scl',
    section: 'Life Science (SCL)',
    topic: 'ରେଚନ (Excretion)',
    text: 'What is the structural and functional unit of the human kidney?',
    textOdia: 'ମାନବ ଶରୀରର ମୁଖ୍ୟ ରେଚନ ଅଙ୍ଗ ବୃକ୍କକ (Kidney) ର ଗଠନମୂଳକ ଓ କାର୍ଯ୍ୟକାରୀ ଏକକ କାହାକୁ କୁହାଯାଏ?',
    options: [
      'Neuron (ନ୍ୟୁରନ୍)',
      'Nephron (ନେଫ୍ରନ୍)',
      'Alveoli (ଆଲଭିଓଲାଇ)',
      'Bowman’s Capsule (ବାଓମ୍ୟାନ୍ସ କ୍ୟାପ୍‌ସୁଲ୍)',
    ],
    correct: 1,
    explanation: 'The nephron is the structural and functional unit of the kidney. Each human kidney has about 1 to 1.2 million nephrons.',
    explanationOdia: 'ବୃକ୍କକର କାର୍ଯ୍ୟକାରୀ ଏବଂ ଗଠନମୂଳକ ଏକକ ହେଉଛି ନେଫ୍ରନ୍ (Nephron)।',
  },

  // ── FIRST LANGUAGE ODIA (FLO) ──
  {
    id: 11,
    subjectId: 'odia',
    section: 'Sahitya (ପଦ୍ୟ)',
    topic: 'ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ',
    text: 'Who composed the prestigious state song of Odisha, "Bande Utkala Janani"?',
    textOdia: 'ଓଡ଼ିଶାର ରାଜ୍ୟ ସଙ୍ଗୀତ "ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ" ର ରଚୟିତା କିଏ?',
    options: [
      'ଭକ୍ତକବି ମଧୁସୂଦନ ରାଓ',
      'କାନ୍ତକବି ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ର',
      'କବିବର ରାଧାନାଥ ରାୟ',
      'ସ୍ୱଭାବକବି ଗଙ୍ଗାଧର ମେହେର',
    ],
    correct: 1,
    explanation: 'କାନ୍ତକବି ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ର (Kantakabi Laxmikanta Mohapatra) ୧୯୧୨ ମସିହାରେ ବାଲେଶ୍ୱରରେ ଅନୁଷ୍ଠିତ ଉତ୍କଳ ସମ୍ମିଳନୀରେ ଏହି କାଳଜୟୀ ଗୀତ ଗାନ କରିଥିଲେ।',
    explanationOdia: 'କାନ୍ତକବି ଲକ୍ଷ୍ମୀକାନ୍ତ ମହାପାତ୍ରଙ୍କ ଦ୍ୱାରା "ବନ୍ଦେ ଉତ୍କଳ ଜନନୀ" ରଚିତ ହୋଇଥିଲା।',
  },
  {
    id: 12,
    subjectId: 'odia',
    section: 'Sahitya (ଗଦ୍ୟ)',
    topic: 'ଜନ୍ମଭୂମି',
    text: 'Who is the author of the Class 10 Odia prose piece "Janmabhumi"?',
    textOdia: 'ଦଶମ ଶ୍ରେଣୀ ସାହିତ୍ୟ ସିନ୍ଧୁର "ଜନ୍ମଭୂମି" ପ୍ରବନ୍ଧର ଲେଖକ କିଏ?',
    options: [
      'ଗୋପୀନାଥ ମହାନ୍ତି',
      'ଡକ୍ଟର କୃଷ୍ଣଚନ୍ଦ୍ର ପାଣିଗ୍ରାହୀ',
      'ଫକୀର ମୋହନ ସେନାପତି',
      'ମନୋଜ ଦାସ',
    ],
    correct: 1,
    explanation: 'ଡକ୍ଟର କୃଷ୍ଣଚନ୍ଦ୍ର ପାଣିଗ୍ରାହୀ (Dr. Krishna Chandra Panigrahi) ଜଣେ ପ୍ରଖ୍ୟାତ ଐତିହାସିକ ଓ ସାହିତ୍ୟିକ, ଯିଏ "ଜନ୍ମଭୂମି" ପ୍ରବନ୍ଧ ରଚନା କରିଛନ୍ତି।',
    explanationOdia: '"ଜନ୍ମଭୂମି" ପ୍ରବନ୍ଧଟି ପ୍ରସିଦ୍ଧ ଐତିହାସିକ ଓ ଗବେଷକ ଡକ୍ଟର କୃଷ୍ଣଚନ୍ଦ୍ର ପାଣିଗ୍ରାହୀଙ୍କ ଦ୍ୱାରା ରଚିତ।',
  },
  {
    id: 13,
    subjectId: 'odia',
    section: 'Vyakarana (ବ୍ୟାକରଣ)',
    topic: 'ସମାସ ନିର୍ଣ୍ଣୟ',
    text: 'What type of compound (ସମାସ) is the word "ପିତାମାତା" (Pitamata)?',
    textOdia: '"ପିତାମାତା" ପଦଟି କେଉଁ ପ୍ରକାର ସମାସ ଅଟେ?',
    options: [
      'ଦ୍ୱନ୍ଦ୍ୱ ସମାସ',
      'ତତ୍ପୁରୁଷ ସମାସ',
      'କର୍ମଧାରୟ ସମାସ',
      'ବହୁବ୍ରୀହି ସମାସ',
    ],
    correct: 0,
    explanation: 'ପିତା ଓ ମାତା = ପିତାମାତା। ଏଠାରେ ଉଭୟ ପଦର ପ୍ରାଧାନ୍ୟ ରହିଥିବାରୁ ଏହା ଦ୍ୱନ୍ଦ୍ୱ ସମାସ।',
    explanationOdia: 'ପିତା ଓ ମାତା - ଉଭୟ ପଦର ଅର୍ଥ ପ୍ରଧାନ ହୋଇଥିବାରୁ ଏହା ଦ୍ୱନ୍ଦ୍ୱ ସମାସ ଅଟେ।',
  },

  // ── SECOND LANGUAGE ENGLISH (SLE) ──
  {
    id: 14,
    subjectId: 'english',
    section: 'Prose',
    topic: 'A Letter to God',
    text: 'Why did Lencho write a letter to God requesting 100 pesos in "A Letter to God"?',
    textOdia: '"A Letter to God" ପାଠରେ ଲେଞ୍ଚୋ ୧୦୦ ପେସୋ ମାଗି ଭଗବାନଙ୍କୁ କାହିଁକି ଚିଠି ଲେଖିଥିଲା?',
    options: [
      'To build a new brick house',
      'His ripe cornfield was completely destroyed by a hailstorm',
      'To buy modern tractor equipment',
      'To pay off his heavy village bank loans',
    ],
    correct: 1,
    explanation: 'Lencho wrote to God because a destructive hailstorm had completely destroyed his crops, leaving his family with nothing to eat.',
    explanationOdia: 'ପ୍ରବଳ କୁଆପଥର ବୃଷ୍ଟି ଯୋଗୁଁ ଲେଞ୍ଚୋର ମକା ଫସଲ ସମ୍ପୂର୍ଣ୍ଣ ନଷ୍ଟ ହୋଇଯାଇଥିବାରୁ ସେ ଭଗବାନଙ୍କୁ ସାହାଯ୍ୟ ମାଗିଥିଲା।',
  },
  {
    id: 15,
    subjectId: 'english',
    section: 'Grammar',
    topic: 'Subject-Verb Concord',
    text: 'Choose the correct form of the verb: "Neither the teacher nor the students ______ present in the auditorium yesterday."',
    textOdia: 'ଉପଯୁକ୍ତ କ୍ରିୟା ବାଛନ୍ତୁ: "Neither the teacher nor the students ______ present in the auditorium yesterday."',
    options: ['was', 'were', 'is', 'are'],
    correct: 1,
    explanation: 'Rule of proximity with "Neither... nor": the verb agrees with the closer subject ("students", which is plural), and the past tense yesterday requires "were".',
    explanationOdia: '"Neither... nor" ରେ କ୍ରିୟା ପାଖରେ ଥିବା କର୍ତ୍ତା (students - ବହୁବଚନ) ଅନୁସାରେ ହୁଏ, ତେଣୁ "were" ବସିବ।',
  },

  // ── SOCIAL SCIENCE (SSC) ──
  {
    id: 16,
    subjectId: 'hps',
    section: 'History (ଇତିହାସ)',
    topic: 'ଓଡ଼ିଶାରେ ସ୍ୱାଧୀନତା ଆନ୍ଦୋଳନ',
    text: 'Which tragic incident in Bhadrak district during the Quit India Movement 1942 is hailed as the "Raktatirtha" (Blood Pilgrimage) of Odisha?',
    textOdia: '୧୯୪୨ ଭାରତ ଛାଡ଼ ଆନ୍ଦୋଳନ ସମୟରେ ଭଦ୍ରକ ଜିଲ୍ଲାର କେଉଁ ଐତିହାସିକ ଗଣହତ୍ୟା ସ୍ଥଳକୁ ଓଡ଼ିଶାର "ରକ୍ତତୀର୍ଥ" କୁହାଯାଏ?',
    options: [
      'ଲୁଣ ସତ୍ୟାଗ୍ରହ ସ୍ଥଳ ଇଞ୍ଚୁଡ଼ି',
      'ଇରମ (Eram)',
      'ନିମାପଡ଼ା',
      'କୋରାପୁଟ ପାପଡ଼ାହାଣ୍ଡି',
    ],
    correct: 1,
    explanation: 'On 28 September 1942, British police opened fire on peaceful freedom fighters in Eram, killing 29 martyrs. It is called the second Jallianwala Bagh of India and the "Raktatirtha" of Odisha.',
    explanationOdia: '୧୯୪୨ ସେପ୍ଟେମ୍ବର ୨୮ ରେ ଭଦ୍ରକର ଇରମ ଠାରେ ୨୯ ଜଣ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମୀ ସହିଦ ହୋଇଥିଲେ। ଏହା ଓଡ଼ିଶାର ରକ୍ତତୀର୍ଥ ଭାବେ ଖ୍ୟାତ।',
  },
  {
    id: 17,
    subjectId: 'gec',
    section: 'Geography (ଭୂଗୋଳ)',
    topic: 'ଭାରତର ଖଣିଜ ସମ୍ବଳ',
    text: 'Which mineral deposit is Odisha the largest producer of in India, accounting for over 50% of the country’s total reserves?',
    textOdia: 'ଭାରତର ସର୍ବାଧିକ ବକ୍ସାଇଟ୍ (Bauxite) ଓ ଲୁହାପଥର ଉତ୍ପାଦନକାରୀ ରାଜ୍ୟ କିଏ?',
    options: ['ଝାଡ଼ଖଣ୍ଡ', 'ଓଡ଼ିଶା', 'ଛତିଶଗଡ଼', 'ମଧ୍ୟପ୍ରଦେଶ'],
    correct: 1,
    explanation: 'Odisha is the leading producer of Bauxite (Panchpatmali / Koraput) and Iron Ore (Keonjhar, Sundargarh, Mayurbhanj) in India.',
    explanationOdia: 'ଓଡ଼ିଶା ଭାରତର ସର୍ବାଧିକ ବକ୍ସାଇଟ୍ ଓ ଲୁହାପଥର ଉତ୍ପାଦନ କରୁଥିବା ଅଗ୍ରଣୀ ରାଜ୍ୟ।',
  },

  // ── THIRD LANGUAGE HINDI (TLH) ──
  {
    id: 18,
    subjectId: 'hindi',
    section: 'Third Language Hindi (ହିନ୍ଦୀ)',
    topic: 'अनमोल वाणी',
    text: 'कबीरदास जी के अनुसार, मन का आपा खोकर कैसी वाणी बोलनी चाहिए?',
    textOdia: 'ସନ୍ଥ କବୀରଦାସଙ୍କ ଅନୁଯାୟୀ ମନର ଅହଙ୍କାର ଛାଡ଼ି କିପରି ବାଣୀ ବୋଲିବା ଉଚିତ୍?',
    options: [
      'कठोर वाणी',
      'ऐसी वाणी बोलिए, मन का आपा खोइ / औरन को सीतल करै, आपहु सीतल होइ (मीठी वाणी)',
      'अहंकारयुक्त वाणी',
      'व्यंग्य वाणी',
    ],
    correct: 1,
    explanation: '"ऐसी बानी बोलिए, मन का आपा खोइ। औरन को सीतल करै, आपहु सीतल होई।" अर्थात हमेशा मधुर व शीतल वाणी बोलनी चाहिए।',
    explanationOdia: 'କବୀରଦାସଙ୍କ ମତରେ ସର୍ବଦା ମନର ଅହଂ ଭାବ ତ୍ୟାଗ କରି ଅନ୍ୟକୁ ଶୀତଳ କରିବା ଭଳି ମିଠା ବାଣୀ ବୋଲିବା ଉଚିତ୍।',
  },

  // ── THIRD LANGUAGE SANSKRIT (TLS) ──
  {
    id: 19,
    subjectId: 'sanskrit',
    section: 'Third Language Sanskrit (ସଂସ୍କୃତ)',
    topic: 'ଶ୍ରୀରାମସ୍ୟ ପିତୃଭକ୍ତିଃ',
    text: 'In Valmiki Ramayana, on whose order did King Dasharatha exile Sri Rama to the forest for fourteen years?',
    textOdia: 'କାହାର ଦୁଇଟି ବର କାରଣରୁ ମହାରାଜା ଦଶରଥ ଶ୍ରୀରାମଚନ୍ଦ୍ରଙ୍କୁ ଚଉଦ ବର୍ଷ ପାଇଁ ବନବାସ ପଠାଇଥିଲେ?',
    options: ['ମନ୍ଥରା', 'କୈକେୟୀ', 'କୌଶଲ୍ୟା', 'ସୁମିତ୍ରା'],
    correct: 1,
    explanation: 'Queen Kaikeyi asked for the two boons promised by Dasharatha: Bharata’s coronation and Rama’s 14-year exile.',
    explanationOdia: 'ରାଣୀ କୈକେୟୀଙ୍କ ଦୁଇଟି ବର ପୂରଣ କରିବା ପାଇଁ ଶ୍ରୀରାମ ପିତୃସତ୍ୟ ପାଳନ ପୂର୍ବକ ବନଗମନ କରିଥିଲେ।',
  },
  {
    id: 20,
    subjectId: 'sanskrit',
    section: 'Third Language Sanskrit (ସଂସ୍କୃତ)',
    topic: 'ସନ୍ଧି ବିଚ୍ଛେଦ',
    text: 'What is the correct Sandhi split for: "ହିମାଳୟଃ" (Himalayah)?',
    textOdia: '"ହିମାଳୟଃ" ର ଶୁଦ୍ଧ ସନ୍ଧି ବିଚ୍ଛେଦ କ’ଣ ହେବ?',
    options: [
      'ହିମ୍ + ଆଳୟଃ',
      'ହିମ + ଆଳୟଃ',
      'ହିମା + ଳୟଃ',
      'ହିମୋ + ଆଳୟଃ',
    ],
    correct: 1,
    explanation: 'ହିମ (ଅ) + ଆଳୟଃ (ଆ) = ହିମାଳୟଃ (ଦୀର୍ଘ ସ୍ୱର ସନ୍ଧି - ଅକଃ ସବର୍ଣ୍ଣେ ଦୀର୍ଘଃ)।',
    explanationOdia: 'ହିମ + ଆଳୟଃ = ହିମାଳୟଃ (ଦୀର୍ଘ ସ୍ୱର ସନ୍ଧି)।',
  },
];

// BSE Odisha Class 10 Exam Pattern Data
export const EXAM_PATTERN_DETAILS = {
  board: 'Board of Secondary Education (BSE), Odisha',
  boardOdia: 'ମାଧ୍ୟମିକ ଶିକ୍ଷା ପରିଷଦ, ଓଡ଼ିଶା',
  examName: 'High School Certificate Examination (HSC / Matriculation)',
  examNameOdia: 'ହାଇସ୍କୁଲ ସାର୍ଟିଫିକେଟ୍ ପରୀକ୍ଷା (ଦଶମ ବୋର୍ଡ ପରୀକ୍ଷା)',
  totalSubjects: 7,
  totalMarks: 700,
  passingCriteria: '30% in each subject & minimum 33% aggregate',
  passingMarksPerSubject: 30,
  negativeMarking: 'No Negative Marking (୦ ମାଇନସ୍ ମାର୍କିଂ)',
  questionFormat: '50 Objective MCQs (OMR Sheet) + 50 Subjective Marks per paper',
  omrPen: 'Blue or Black Ball Point Pen strictly',
  divisions: [
    { name: 'First Division (A1 & A2)', range: '60% and above (360+ Marks)', color: '#1B6B3A' },
    { name: 'Second Division (B1 & B2)', range: '45% to 59% (270 to 359 Marks)', color: '#2563EB' },
    { name: 'Third Division (C & D)', range: '33% to 44% (198 to 269 Marks)', color: '#D4830F' },
  ],
};

export const OMR_TIPS = [
  {
    icon: '🖊️',
    title: 'Use Pure Black or Blue Ball Pen',
    titleOdia: 'କଳା କିମ୍ବା ନୀଳ ବଲ୍ ପେନ୍ ବ୍ୟବହାର କରନ୍ତୁ',
    desc: 'Do not use gel pens or ink pens. Use a dark ballpoint pen with a smooth nib for fast, complete bubble darkening.',
  },
  {
    icon: '⭕',
    title: 'Darken the Bubble Fully',
    titleOdia: 'ଗୋଲକୁ ସମ୍ପୂର୍ଣ୍ଣ କଳା କରନ୍ତୁ',
    desc: 'Never make half circles, tick marks, crosses, or multiple marks. A faint or ticked circle will be rejected by the OMR scanner.',
  },
  {
    icon: '⏱️',
    title: 'Smart 45-Minute Time Budget',
    titleOdia: '୪୫ ମିନିଟ୍ ସମୟ ପରିଚାଳନା',
    desc: 'You have 50 MCQs. Allocate 45 seconds to 1 minute per question. Do not get stuck on any complex geometry or algebra question.',
  },
  {
    icon: '🎯',
    title: 'Zero Negative Marking Advantage',
    titleOdia: 'ଶୂନ୍ୟ ମାଇନସ୍ ମାର୍କିଂର ଫାଇଦା ନିଅନ୍ତୁ',
    desc: 'There is NO negative marking in BSE Odisha Matric exam. Attempt all 50 questions without leaving any bubble blank!',
  },
];

export const FAQS_ODISHA_10TH = [
  {
    q: 'Is the BSE Odisha Class 10th Mock Test on Brinto completely free?',
    qOdia: 'ବ୍ରିଣ୍ଟୋ ରେ ଓଡ଼ିଶା ଦଶମ ଶ୍ରେଣୀ ମକ୍ ଟେଷ୍ଟ ସମ୍ପୂର୍ଣ୍ଣ ମାଗଣା କି?',
    a: 'Yes, 100% free! All subject mock tests, chapter-wise MCQs, model papers and answer keys with Odia and English explanations are open for all students without any fees or sign-up hurdles.',
  },
  {
    q: 'How many marks are allocated to MCQs in Odisha 10th Board Exam?',
    qOdia: 'ଓଡ଼ିଶା ମାଟ୍ରିକ ବୋର୍ଡ ପରୀକ୍ଷାରେ କେତେ ନମ୍ବରର MCQ ଆସିଥାଏ?',
    a: 'In each subject, exactly 50 marks (50 questions of 1 mark each) are objective MCQs evaluated via OMR sheets. The remaining 50 marks are subjective questions (Short and Long answer types).',
  },
  {
    q: 'Is there any negative marking in BSE Odisha Matric 10th MCQ papers?',
    qOdia: 'ଦଶମ ଶ୍ରେଣୀ ବୋର୍ଡ ପରୀକ୍ଷାରେ କୌଣସି ନେଗେଟିଭ୍ ମାର୍କିଂ (Negative Marking) ଅଛି କି?',
    a: 'No. There is strictly NO negative marking in the BSE Odisha Class 10 examination. Students should attempt all 50 objective questions on their OMR sheets.',
  },
  {
    q: 'Which subjects are compulsory in BSE Odisha Matric?',
    qOdia: 'ମାଟ୍ରିକ ପରୀକ୍ଷାରେ କେଉଁ କେଉଁ ବିଷୟ ବାଧ୍ୟତାମୂଳକ?',
    a: 'All 7 subjects (including Second Language English, First Language Odia, Mathematics, General Science, Social Science, Third Language Hindi, and Third Language Sanskrit) are comprehensively covered.',
  },
  {
    q: 'Can I practice both Odia and English medium questions on Brinto?',
    qOdia: 'ମୁଁ ବ୍ରିଣ୍ଟୋରେ ଓଡ଼ିଆ ଓ ଇଂରାଜୀ ଉଭୟ ମାଧ୍ୟମରେ ପ୍ରଶ୍ନୋତ୍ତର ଅଭ୍ୟାସ କରିପାରିବି କି?',
    a: 'Yes! All questions and detailed answer explanations are provided bilingually in authentic Odia script and English, making it seamless for both Odia medium and English medium students across Odisha.',
  },
  {
    q: 'What are the minimum passing marks in Odisha 10th Board?',
    qOdia: 'ଦଶମ ଶ୍ରେଣୀରେ ପାସ୍ କରିବା ପାଇଁ ସର୍ବନିମ୍ନ କେତେ ନମ୍ବର ଆବଶ୍ୟକ?',
    a: 'Students must secure at least 30 marks out of 100 in each individual subject to pass the Matric examination.',
  },
];
