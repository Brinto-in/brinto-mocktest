/**
 * SSB Odisha — Junior Assistant & Junior Clerk recruitment.
 * Source: State Selection Board, Higher Education Dept., Govt. of Odisha,
 * Advertisement No. 01/2026 dated 09.03.2026 (www.ssbodisha.ac.in).
 *
 * Vacancy figures are "total (women)". Totals cross-checked against the notice:
 * 883 (281) = 534 Junior Assistant + 349 Junior Clerk.
 */
import type { PosterItem } from "../../../components/PosterRow.astro";
import type { Exam, TableColumn } from "../types";

export const SSB_ODISHA_PAGE = "/mocktest/ssb-odisha";

// ── Vacancy table columns (shared by every view) ──────

const vacancyCols = (first: TableColumn): TableColumn[] => [
  first,
  { key: "total", label: { en: "Total (Women)", or: "ମୋଟ (ମହିଳା)" }, align: "center" },
  { key: "st", label: "ST", align: "center" },
  { key: "sc", label: "SC", align: "center" },
  { key: "sebc", label: "SEBC", align: "center" },
  { key: "ur", label: "UR", align: "center" },
  { key: "pwd", label: "PwD", align: "center" },
  { key: "exsm", label: "Ex-SM", align: "center" },
  { key: "sports", label: { en: "Sports", or: "କ୍ରୀଡ଼ା" }, align: "center" },
];

const row = (name: string, total: string, st: string, sc: string, sebc: string, ur: string, pwd = "–", exsm = "–", sports = "–") => ({
  name,
  total,
  st,
  sc,
  sebc,
  ur,
  pwd,
  exsm,
  sports,
});

export const ssbJuniorAssistant2026: Exam = {
  slug: "ssb-odisha",
  state: "odisha",
  board: {
    short: "SSB Odisha",
    name: { en: "State Selection Board", or: "ରାଜ୍ୟ ଚୟନ ବୋର୍ଡ" },
    department: { en: "Higher Education Department, Government of Odisha", or: "ଉଚ୍ଚ ଶିକ୍ଷା ବିଭାଗ, ଓଡ଼ିଶା ସରକାର" },
    website: "https://www.ssbodisha.ac.in",
    email: "ssbdeptofhe@gmail.com",
  },
  notice: { number: "01/2026", date: "2026-03-09", url: "https://www.ssbodisha.ac.in" },
  title: {
    en: "SSB Odisha Junior Assistant & Junior Clerk Recruitment 2026",
    or: "SSB ଓଡ଼ିଶା କନିଷ୍ଠ ସହାୟକ ଓ କନିଷ୍ଠ କିରାଣି ନିଯୁକ୍ତି 2026",
  },
  hero: {
    line: { en: "SSB Odisha Junior Assistant 2026,", or: "SSB ଓଡ଼ିଶା କନିଷ୍ଠ ସହାୟକ 2026," },
    highlight: { en: "mock tests & full syllabus.", or: "ମକ୍ ଟେଷ୍ଟ ଓ ସମ୍ପୂର୍ଣ୍ଣ ପାଠ୍ୟକ୍ରମ।" },
  },
  summary: {
    en: "883 Group-C posts in State Public Universities, Govt. Degree Colleges, NCC, OUHS, BSE Odisha and Non-Govt. Aided Colleges. Vacancies, eligibility, exam pattern, syllabus and free practice in one place.",
    or: "ରାଜ୍ୟ ସରକାରୀ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ସରକାରୀ ଡିଗ୍ରୀ କଲେଜ, NCC, OUHS, BSE ଓଡ଼ିଶା ଓ ବେସରକାରୀ ଅନୁଦାନପ୍ରାପ୍ତ କଲେଜରେ 883 ଗ୍ରୁପ-C ପଦ। ପଦବୀ, ଯୋଗ୍ୟତା, ପରୀକ୍ଷା ଢାଞ୍ଚା, ପାଠ୍ୟକ୍ରମ ଓ ମାଗଣା ଅଭ୍ୟାସ ଗୋଟିଏ ସ୍ଥାନରେ।",
  },
  group: "Group-C",
  seo: {
    title: "SSB Odisha Junior Assistant Recruitment 2026 – 883 Posts, Syllabus & Exam Pattern",
    description:
      "SSB Odisha Advt. No. 01/2026: 883 Junior Assistant & Junior Clerk posts. Vacancy by university and district, age limit, qualification, exam pattern (200 + 50 marks), full syllabus and free practice.",
  },

  stats: [
    { value: "883", label: { en: "Total posts", or: "ମୋଟ ପଦ" } },
    { value: "534", label: { en: "Junior Assistant", or: "କନିଷ୍ଠ ସହାୟକ" } },
    { value: "349", label: { en: "Junior Clerk", or: "କନିଷ୍ଠ କିରାଣି" } },
    { value: "21–42", label: { en: "Age (years)", or: "ବୟସ (ବର୍ଷ)" } },
    { value: "200 + 50", label: { en: "Written + CST marks", or: "ଲିଖିତ + CST ମାର୍କ" } },
  ],

  dates: [
    { label: { en: "Notification released", or: "ବିଜ୍ଞପ୍ତି ପ୍ରକାଶ" }, start: "2026-03-09" },
    {
      label: { en: "Online application", or: "ଅନଲାଇନ ଆବେଦନ" },
      start: "2026-03-11T14:30:00+05:30",
      end: "2026-04-13T23:45:00+05:30",
      note: { en: "Fee payment closes at the same time", or: "ଏକା ସମୟରେ ଫି ଦେୟ ବନ୍ଦ ହେବ" },
    },
    { label: { en: "Written test", or: "ଲିଖିତ ପରୀକ୍ଷା" }, note: { en: "5 zones across Odisha", or: "ଓଡ଼ିଶାର 5ଟି ଜୋନ" } },
    { label: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" }, note: { en: "At Bhubaneswar", or: "ଭୁବନେଶ୍ୱରରେ" } },
    { label: { en: "Document verification", or: "ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ" }, note: { en: "SSB office, Bhubaneswar", or: "SSB କାର୍ଯ୍ୟାଳୟ, ଭୁବନେଶ୍ୱର" } },
    { label: { en: "Final merit list", or: "ଚୂଡ଼ାନ୍ତ ମେଧା ତାଲିକା" } },
  ],

  vacancy: {
    total: 883,
    summary: [
      { value: "416", label: "UR" },
      { value: "223", label: "ST" },
      { value: "157", label: "SC" },
      { value: "87", label: "SEBC" },
      { value: "281", label: { en: "For women", or: "ମହିଳାଙ୍କ ପାଇଁ" } },
      { value: "33", label: "PwD" },
      { value: "29", label: "Ex-Servicemen" },
      { value: "3", label: { en: "Sports persons", or: "କ୍ରୀଡ଼ାବିତ" } },
    ],
    views: [
      {
        id: "by-department",
        label: { en: "By department", or: "ବିଭାଗ ଅନୁଯାୟୀ" },
        table: {
          columns: vacancyCols({ key: "name", label: { en: "Institution / Department", or: "ଅନୁଷ୍ଠାନ / ବିଭାଗ" } }),
          rows: [
            row("Junior Asst. – Govt. Degree Colleges (HED)", "22 (7)", "5 (2)", "3 (1)", "1 (0)", "13 (4)", "1", "3", "1"),
            row("Junior Asst. – NCC (HED)", "52 (18)", "17 (6)", "14 (5)", "4 (1)", "17 (6)", "2", "2", "1"),
            row("Junior Asst. – BSE Odisha (S&ME)", "6 (2)", "1 (1)", "1 (0)", "1 (1)", "3 (0)"),
            row("Junior Asst. – 16 State Public Universities (HED)", "432 (139)", "93 (25)", "72 (24)", "51 (15)", "216 (75)", "16", "14"),
            row("Junior Asst. – OUHS (H&FW)", "22 (3)", "6 (1)", "2 (0)", "5 (1)", "9 (1)", "2", "1", "1"),
            row("Junior Clerk – Non-Govt. Aided Colleges (HED)", "349 (112)", "101 (30)", "65 (22)", "25 (8)", "158 (52)", "12", "9"),
          ],
          total: row("Total", "883 (281)", "223 (65)", "157 (52)", "87 (26)", "416 (138)", "33", "29", "3"),
        },
      },
      {
        id: "by-university",
        label: { en: "16 universities", or: "16ଟି ବିଶ୍ୱବିଦ୍ୟାଳୟ" },
        table: {
          columns: vacancyCols({ key: "name", label: { en: "University", or: "ବିଶ୍ୱବିଦ୍ୟାଳୟ" } }),
          rows: [
            row("Maharaja Sriram Chandra Bhanja Deo University, Baripada", "24 (8)", "5 (2)", "4 (1)", "4 (2)", "11 (3)", "1", "1"),
            row("Berhampur University, Berhampur", "33 (14)", "8 (2)", "6 (2)", "5 (2)", "14 (8)", "1", "1"),
            row("Sambalpur University, Burla", "22 (9)", "5 (1)", "5 (1)", "3 (1)", "9 (6)", "2", "1"),
            row("Madhusudan Law University, Cuttack", "26 (8)", "5 (1)", "4 (2)", "4 (1)", "13 (4)", "1", "1"),
            row("Utkal University, Bhubaneswar", "27 (6)", "5 (0)", "3 (0)", "3 (1)", "16 (5)", "1", "1"),
            row("Gangadhar Meher University, Sambalpur", "32 (10)", "7 (2)", "5 (2)", "4 (1)", "16 (5)", "1", "1"),
            row("Rama Devi Women's University, Bhubaneswar", "20 (7)", "2 (1)", "4 (2)", "3 (1)", "11 (3)", "–", "1"),
            row("Shree Jagannath Sanskrit University, Puri", "35 (12)", "9 (3)", "6 (2)", "3 (1)", "17 (6)", "2", "1"),
            row("Maa Manikeshwari University, Bhawanipatna", "32 (10)", "7 (2)", "5 (2)", "4 (1)", "16 (5)", "1", "1"),
            row("Odisha State Open University, Sambalpur", "8 (2)", "2 (1)", "1 (0)", "1 (0)", "4 (1)"),
            row("Dharanidhar University, Keonjhar", "31 (9)", "7 (2)", "5 (2)", "3 (0)", "16 (5)", "1", "1"),
            row("Vikram Dev University, Jeypore", "40 (13)", "9 (3)", "7 (2)", "4 (1)", "20 (7)", "2", "1"),
            row("Fakir Mohan University, Balasore", "32 (9)", "7 (1)", "5 (2)", "3 (1)", "17 (5)", "1", "1"),
            row("Khallikote Unitary University, Berhampur", "26 (8)", "5 (1)", "4 (2)", "3 (1)", "14 (4)", "–", "1"),
            row("Rajendra University, Balangir", "40 (13)", "9 (3)", "7 (2)", "4 (1)", "20 (7)", "2", "1"),
            row("Odia University, Satyabadi", "4 (1)", "1 (0)", "1 (0)", "–", "2 (1)"),
          ],
          total: row("Total", "432 (139)", "93 (25)", "72 (24)", "51 (15)", "216 (75)", "16", "14"),
        },
      },
      {
        id: "by-district",
        label: { en: "Junior Clerk by district", or: "ଜିଲ୍ଲା ଅନୁଯାୟୀ କନିଷ୍ଠ କିରାଣି" },
        note: {
          en: "Junior Clerk posts in Non-Govt. Aided Colleges, 28 districts (Annexure-I).",
          or: "ବେସରକାରୀ ଅନୁଦାନପ୍ରାପ୍ତ କଲେଜରେ କନିଷ୍ଠ କିରାଣି ପଦ, 28ଟି ଜିଲ୍ଲା (ପରିଶିଷ୍ଟ-I)।",
        },
        table: {
          columns: vacancyCols({ key: "name", label: { en: "District", or: "ଜିଲ୍ଲା" } }).filter((c) => c.key !== "sports"),
          rows: [
            row("Angul", "7 (3)", "2 (1)", "2 (1)", "–", "3 (1)"),
            row("Balasore", "29 (9)", "7 (2)", "4 (1)", "3 (1)", "15 (5)", "1 (Cat-I)", "1"),
            row("Bargarh", "10 (3)", "3 (1)", "2 (1)", "1 (0)", "4 (1)"),
            row("Bhadrak", "10 (3)", "4 (1)", "2 (1)", "–", "4 (1)"),
            row("Bolangir", "8 (3)", "3 (1)", "–", "–", "5 (2)"),
            row("Boudh", "1 (0)", "1 (0)", "–", "–", "–"),
            row("Cuttack", "41 (14)", "11 (4)", "8 (3)", "4 (1)", "18 (6)", "2 (Cat-II, III)", "1"),
            row("Dhenkanal", "12 (5)", "3 (1)", "2 (1)", "2 (1)", "5 (2)"),
            row("Ganjam", "28 (10)", "7 (2)", "5 (2)", "2 (1)", "14 (5)", "1 (Cat-III)", "1"),
            row("Jagatsinghpur", "13 (4)", "4 (1)", "2 (1)", "1 (0)", "6 (2)", "1 (Cat-II)"),
            row("Jajpur", "19 (6)", "6 (2)", "4 (1)", "–", "9 (3)", "1 (Cat-IV)", "1"),
            row("Jharsuguda", "3 (0)", "1 (0)", "1 (0)", "–", "1 (0)"),
            row("Kalahandi", "3 (1)", "1 (0)", "–", "–", "2 (1)"),
            row("Kandhamal", "4 (1)", "1 (0)", "1 (0)", "–", "2 (1)"),
            row("Kendrapara", "20 (7)", "7 (2)", "5 (2)", "2 (1)", "6 (2)", "1 (Cat-IV)", "1"),
            row("Keonjhar", "16 (5)", "4 (1)", "3 (1)", "1 (0)", "8 (3)", "1 (Cat-I)"),
            row("Khordha", "25 (9)", "8 (3)", "5 (2)", "2 (1)", "10 (3)", "1 (Cat-I)", "1"),
            row("Koraput", "2 (0)", "1 (0)", "–", "–", "1 (0)"),
            row("Malkangiri", "3 (1)", "1 (0)", "–", "–", "2 (1)"),
            row("Mayurbhanj", "30 (10)", "8 (3)", "6 (2)", "1 (0)", "15 (5)", "1 (Cat-III)", "1"),
            row("Nabarangpur", "4 (1)", "1 (0)", "1 (0)", "–", "2 (1)"),
            row("Nayagarh", "10 (3)", "3 (1)", "2 (1)", "1 (0)", "4 (1)"),
            row("Nuapada", "2 (0)", "1 (0)", "–", "–", "1 (0)"),
            row("Puri", "17 (6)", "5 (2)", "3 (1)", "2 (1)", "7 (2)", "1 (Cat-II)", "1"),
            row("Rayagada", "3 (0)", "1 (0)", "1 (0)", "–", "1 (0)"),
            row("Sambalpur", "6 (1)", "1 (0)", "1 (0)", "1 (0)", "3 (1)"),
            row("Subarnapur", "3 (0)", "1 (0)", "1 (0)", "–", "1 (0)"),
            row("Sundargarh", "20 (7)", "5 (2)", "4 (1)", "2 (1)", "9 (3)", "1 (Cat-IV)", "1"),
          ],
          total: row("Total", "349 (112)", "101 (30)", "65 (22)", "25 (8)", "158 (52)", "12", "9"),
        },
      },
    ],
    notes: [
      {
        en: "Figures in brackets are posts reserved for women. If no eligible woman is available, the post goes to a male candidate of the same category.",
        or: "ବନ୍ଧନୀ ମଧ୍ୟରେ ଥିବା ସଂଖ୍ୟା ମହିଳାଙ୍କ ପାଇଁ ସଂରକ୍ଷିତ। ଯୋଗ୍ୟ ମହିଳା ନ ମିଳିଲେ ସେହି ବର୍ଗର ପୁରୁଷ ପ୍ରାର୍ଥୀଙ୍କୁ ଦିଆଯିବ।",
      },
      {
        en: "PwD sub-categories: Cat-I Visually Impaired, Cat-II Hearing Impaired, Cat-III Locomotor Disability, Cat-IV Multiple Disability.",
        or: "PwD ଉପବର୍ଗ: Cat-I ଦୃଷ୍ଟିହୀନ, Cat-II ଶ୍ରବଣ ପ୍ରତିବନ୍ଧକ, Cat-III ଚଳନ ଅକ୍ଷମତା, Cat-IV ବହୁବିଧ ଅକ୍ଷମତା।",
      },
      {
        en: "Vacancies may change at the discretion of the State Selection Board.",
        or: "ରାଜ୍ୟ ଚୟନ ବୋର୍ଡଙ୍କ ବିବେଚନାରେ ପଦସଂଖ୍ୟା ବଦଳିପାରେ।",
      },
    ],
  },

  postsTable: {
    table: {
      columns: [
        { key: "pref", label: "#", align: "center" },
        { key: "name", label: { en: "Institution / Department", or: "ଅନୁଷ୍ଠାନ / ବିଭାଗ" } },
        { key: "post", label: { en: "Post", or: "ପଦବୀ" } },
        { key: "pay", label: { en: "Pay scale", or: "ଦରମା ସ୍କେଲ" } },
        { key: "status", label: { en: "Status", or: "ସ୍ଥିତି" } },
      ],
      rows: [
        { pref: 1, name: "Government Degree Colleges, HE Dept.", post: "Junior Assistant", pay: "Group-C, Level-4, Cell-1", status: { en: "Government", or: "ସରକାରୀ" } },
        { pref: 2, name: "NCC, HE Dept.", post: "Junior Assistant", pay: "Group-C, Level-4, Cell-1", status: { en: "Government", or: "ସରକାରୀ" } },
        { pref: 3, name: "BSE Odisha, S&ME Dept.", post: "Junior Assistant", pay: "Group-C, Level-4, Cell-1", status: { en: "Government", or: "ସରକାରୀ" } },
        { pref: 4, name: "State Public Universities (16), HE Dept.", post: "Junior Assistant", pay: "Group-C, Level-4, Cell-1", status: { en: "Autonomous body", or: "ସ୍ୱୟଂଶାସିତ ସଂସ୍ଥା" } },
        { pref: 5, name: "OUHS, H&FW Dept.", post: "Junior Assistant", pay: "Group-C, Level-4, Cell-1", status: { en: "Autonomous body", or: "ସ୍ୱୟଂଶାସିତ ସଂସ୍ଥା" } },
        { pref: 6, name: "Non-Govt. Aided Colleges (28 districts), HE Dept.", post: "Junior Clerk", pay: "Group-C, Level-4, Cell-1", status: { en: "Non-Govt. aided", or: "ବେସରକାରୀ ଅନୁଦାନପ୍ରାପ୍ତ" } },
      ],
    },
    note: {
      en: "You rank these six options in the application form. Seats are allotted by merit, then your preference order, then availability — the order can't be changed after final submission. HRA, leave encashment and some incentives are not available in Non-Govt. Aided Colleges.",
      or: "ଆବେଦନ ଫର୍ମରେ ଏହି ଛଅଟି ବିକଳ୍ପକୁ ପସନ୍ଦ କ୍ରମରେ ଦିଅନ୍ତୁ। ମେଧା, ପସନ୍ଦ କ୍ରମ ଓ ଖାଲି ପଦ ଅନୁସାରେ ଆବଣ୍ଟନ ହେବ — ଚୂଡ଼ାନ୍ତ ଦାଖଲ ପରେ କ୍ରମ ବଦଳିବ ନାହିଁ। ବେସରକାରୀ ଅନୁଦାନପ୍ରାପ୍ତ କଲେଜରେ HRA, ଛୁଟି ନଗଦୀକରଣ ଓ କିଛି ଭତ୍ତା ମିଳେ ନାହିଁ।",
    },
  },

  eligibility: [
    {
      icon: "🎂",
      title: { en: "Age limit", or: "ବୟସ ସୀମା" },
      value: { en: "21 – 42 years as on 01.01.2026", or: "01.01.2026 ସୁଦ୍ଧା 21 – 42 ବର୍ଷ" },
      points: [
        { en: "Born between 01.01.1984 and 01.01.2005", or: "01.01.1984 ରୁ 01.01.2005 ମଧ୍ୟରେ ଜନ୍ମ" },
        { en: "SC, ST, SEBC, Women & Ex-Servicemen: +5 years", or: "SC, ST, SEBC, ମହିଳା ଓ ପୂର୍ବତନ ସୈନିକ: +5 ବର୍ଷ" },
        { en: "PwD (40% or more): +10 years", or: "PwD (40% ବା ଅଧିକ): +10 ବର୍ଷ" },
        { en: "PwD of SC/ST/SEBC: +15 years in total", or: "SC/ST/SEBC ର PwD: ମୋଟ +15 ବର୍ଷ" },
        { en: "Only one (the most beneficial) relaxation applies", or: "କେବଳ ଗୋଟିଏ (ସବୁଠାରୁ ଲାଭଦାୟକ) ଛାଡ଼ ମିଳିବ" },
      ],
    },
    {
      icon: "🎓",
      title: { en: "Qualification", or: "ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା" },
      value: { en: "Bachelor's degree in any discipline", or: "ଯେକୌଣସି ବିଷୟରେ ସ୍ନାତକ ଡିଗ୍ରୀ" },
      points: [
        { en: "From a recognised University / Institution / Board", or: "ସ୍ୱୀକୃତିପ୍ରାପ୍ତ ବିଶ୍ୱବିଦ୍ୟାଳୟ / ଅନୁଷ୍ଠାନ / ବୋର୍ଡରୁ" },
        { en: "Basic computer skill with a certificate", or: "ପ୍ରମାଣପତ୍ର ସହ ମୌଳିକ କମ୍ପ୍ୟୁଟର ଜ୍ଞାନ" },
        { en: "Must be held by the last date of application", or: "ଆବେଦନର ଶେଷ ତାରିଖ ସୁଦ୍ଧା ଥିବା ଆବଶ୍ୟକ" },
      ],
    },
    {
      icon: "ଅ",
      title: { en: "Odia language", or: "ଓଡ଼ିଆ ଭାଷା" },
      value: { en: "Speak, read and write Odia", or: "ଓଡ଼ିଆ କହିବା, ପଢ଼ିବା ଓ ଲେଖିବା" },
      points: [
        { en: "Odia as a language subject in HSC or equivalent", or: "HSC ବା ସମକକ୍ଷରେ ଓଡ଼ିଆ ଏକ ଭାଷା ବିଷୟ" },
        { en: "Or passed an Odia test of M.E. (Middle School) standard", or: "କିମ୍ବା M.E. ସ୍ତରର ଓଡ଼ିଆ ପରୀକ୍ଷା ପାସ" },
      ],
    },
    {
      icon: "🏠",
      title: { en: "Nationality & domicile", or: "ନାଗରିକତା ଓ ବାସିନ୍ଦା" },
      value: { en: "Citizen of India and domicile of Odisha", or: "ଭାରତୀୟ ନାଗରିକ ଓ ଓଡ଼ିଶାର ସ୍ଥାୟୀ ବାସିନ୍ଦା" },
      points: [
        { en: "Degrees from outside Odisha need a proof of equivalence", or: "ଓଡ଼ିଶା ବାହାରର ଡିଗ୍ରୀ ପାଇଁ ସମକକ୍ଷତା ପ୍ରମାଣ ଆବଶ୍ୟକ" },
        { en: "Govt. employees can apply, with an NOC by document verification", or: "ସରକାରୀ କର୍ମଚାରୀ ଆବେଦନ କରିପାରିବେ, ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ ପୂର୍ବରୁ NOC ସହ" },
      ],
    },
  ],

  pattern: {
    total: 250,
    stages: [
      {
        id: "written",
        name: { en: "Written test", or: "ଲିଖିତ ପରୀକ୍ଷା" },
        marks: 200,
        questions: 100,
        duration: { en: "2 hours", or: "2 ଘଣ୍ଟା" },
        mode: { en: "Objective MCQ on OMR sheet", or: "OMR ସିଟରେ ବସ୍ତୁନିଷ୍ଠ MCQ" },
        marking: { en: "+2 for right, −0.5 for wrong", or: "ଠିକ ପାଇଁ +2, ଭୁଲ ପାଇଁ −0.5" },
        qualifying: { en: "40% UR · 30% SC/ST/SEBC/PwD", or: "40% UR · 30% SC/ST/SEBC/PwD" },
        subjects: [
          { name: { en: "General English (graduation level)", or: "ସାଧାରଣ ଇଂରାଜୀ (ସ୍ନାତକ ସ୍ତର)" }, questions: 30, marks: 60 },
          { name: { en: "General Knowledge & Current Affairs", or: "ସାଧାରଣ ଜ୍ଞାନ ଓ ସାମ୍ପ୍ରତିକ ଘଟଣା" }, questions: 20, marks: 40 },
          { name: { en: "General Mathematics (HSC standard)", or: "ସାଧାରଣ ଗଣିତ (HSC ସ୍ତର)" }, questions: 20, marks: 40 },
          { name: { en: "Reasoning & Mental Ability", or: "ତର୍କ ଓ ମାନସିକ ଦକ୍ଷତା" }, questions: 30, marks: 60 },
        ],
      },
      {
        id: "cst",
        name: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" },
        marks: 50,
        duration: { en: "1 hour", or: "1 ଘଣ୍ଟା" },
        mode: { en: "Practical on computer", or: "କମ୍ପ୍ୟୁଟରରେ ବ୍ୟବହାରିକ" },
        qualifying: { en: "20 marks for all categories", or: "ସମସ୍ତ ବର୍ଗ ପାଇଁ 20 ମାର୍କ" },
      },
    ],
    notes: [
      {
        en: "Questions per subject are worked out from the marks (every question carries 2 marks).",
        or: "ପ୍ରତି ପ୍ରଶ୍ନ 2 ମାର୍କ ହିସାବରେ ବିଷୟ ଅନୁଯାୟୀ ପ୍ରଶ୍ନ ସଂଖ୍ୟା ଗଣନା କରାଯାଇଛି।",
      },
      {
        en: "PwD candidates with 40%+ permanent disability get a scribe (arranged by the candidate) and compensatory time.",
        or: "40%+ ସ୍ଥାୟୀ ଅକ୍ଷମତା ଥିବା PwD ପ୍ରାର୍ଥୀ ଲେଖକ (ନିଜେ ବ୍ୟବସ୍ଥା) ଓ ଅତିରିକ୍ତ ସମୟ ପାଇବେ।",
      },
    ],
  },

  selection: {
    steps: [
      {
        title: { en: "Written test", or: "ଲିଖିତ ପରୀକ୍ଷା" },
        body: {
          en: "200 marks, 2 hours, OMR. Clear the qualifying mark (40% UR, 30% reserved).",
          or: "200 ମାର୍କ, 2 ଘଣ୍ଟା, OMR। ଯୋଗ୍ୟତା ମାର୍କ (UR 40%, ସଂରକ୍ଷିତ 30%) ପାଆନ୍ତୁ।",
        },
      },
      {
        title: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" },
        body: {
          en: "Twice the vacancies (category & PwD sub-category wise) are called. 50 marks, 1 hour, qualify with 20.",
          or: "ପଦସଂଖ୍ୟାର ଦୁଇଗୁଣ (ବର୍ଗ ଓ PwD ଉପବର୍ଗ ଅନୁଯାୟୀ) ଡକାଯିବେ। 50 ମାର୍କ, 1 ଘଣ୍ଟା, 20 ରେ ଉତ୍ତୀର୍ଣ୍ଣ।",
        },
      },
      {
        title: { en: "Document verification", or: "ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ" },
        body: {
          en: "Candidates who clear both tests bring original certificates to the SSB office, Bhubaneswar.",
          or: "ଦୁଇଟି ପରୀକ୍ଷାରେ ଉତ୍ତୀର୍ଣ୍ଣ ପ୍ରାର୍ଥୀ ମୂଳ ପ୍ରମାଣପତ୍ର ସହ SSB କାର୍ଯ୍ୟାଳୟ, ଭୁବନେଶ୍ୱର ଆସିବେ।",
        },
      },
      {
        title: { en: "Final merit & allotment", or: "ଚୂଡ଼ାନ୍ତ ମେଧା ଓ ଆବଣ୍ଟନ" },
        body: {
          en: "Written + CST marks decide merit; posts follow your preference order. Ties: written marks, then the older candidate.",
          or: "ଲିଖିତ + CST ମାର୍କରେ ମେଧା; ପସନ୍ଦ କ୍ରମରେ ପଦ। ସମାନ ହେଲେ: ଲିଖିତ ମାର୍କ, ତାପରେ ବୟସରେ ବଡ଼।",
        },
      },
    ],
    centres: {
      title: { en: "Written test zones", or: "ଲିଖିତ ପରୀକ୍ଷା ଜୋନ" },
      places: [
        { en: "Balasore", or: "ବାଲେଶ୍ୱର" },
        { en: "Berhampur", or: "ବ୍ରହ୍ମପୁର" },
        { en: "Bhubaneswar", or: "ଭୁବନେଶ୍ୱର" },
        { en: "Jeypore", or: "ଜୟପୁର" },
        { en: "Sambalpur", or: "ସମ୍ବଲପୁର" },
      ],
      note: {
        en: "If a zone (other than Bhubaneswar) has too few candidates, they are moved to the nearest zone. CST and document verification are in Bhubaneswar.",
        or: "ଭୁବନେଶ୍ୱର ବ୍ୟତୀତ କୌଣସି ଜୋନରେ ପ୍ରାର୍ଥୀ କମ ହେଲେ ନିକଟତମ ଜୋନକୁ ପଠାଯିବ। CST ଓ ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ ଭୁବନେଶ୍ୱରରେ।",
      },
    },
  },

  syllabus: [
    {
      id: "english",
      name: { en: "General English", or: "ସାଧାରଣ ଇଂରାଜୀ" },
      stage: { en: "Written · 60 marks", or: "ଲିଖିତ · 60 ମାର୍କ" },
      marks: 60,
      topics: [
        "Verbs: tenses, modals, active & passive voice",
        "Subject-verb agreement",
        "Non-finite verb forms (infinitives & participles)",
        "Connectors and types of sentences",
        "Types of phrases and clauses",
        "Direct and indirect speech",
        "Degrees of comparison (comparative & superlative)",
        "Articles, nouns, adverbs, adjectives, prepositions",
        "Unseen passage (400–450 words): comprehension & vocabulary",
      ],
    },
    {
      id: "gk",
      name: { en: "General Knowledge & Current Affairs", or: "ସାଧାରଣ ଜ୍ଞାନ ଓ ସାମ୍ପ୍ରତିକ ଘଟଣା" },
      stage: { en: "Written · 40 marks", or: "ଲିଖିତ · 40 ମାର୍କ" },
      marks: 40,
      topics: [
        { en: "Historical events with dates, personalities and places", or: "ତାରିଖ, ବ୍ୟକ୍ତିତ୍ୱ ଓ ସ୍ଥାନ ସହ ଐତିହାସିକ ଘଟଣା" },
        { en: "Geographical facts with places", or: "ସ୍ଥାନ ସହ ଭୌଗୋଳିକ ତଥ୍ୟ" },
        { en: "States, countries and institutions with headquarters", or: "ରାଜ୍ୟ, ଦେଶ ଓ ଅନୁଷ୍ଠାନର ମୁଖ୍ୟାଳୟ" },
        { en: "Books and authors", or: "ପୁସ୍ତକ ଓ ଲେଖକ" },
        { en: "Scientific facts and discoveries (dates, persons, uses)", or: "ବୈଜ୍ଞାନିକ ତଥ୍ୟ ଓ ଆବିଷ୍କାର (ତାରିଖ, ବ୍ୟକ୍ତି, ବ୍ୟବହାର)" },
        { en: "Current events with places and personalities", or: "ସ୍ଥାନ ଓ ବ୍ୟକ୍ତିତ୍ୱ ସହ ସାମ୍ପ୍ରତିକ ଘଟଣା" },
        { en: "Miscellaneous matching questions", or: "ବିବିଧ ମେଳକ ପ୍ରଶ୍ନ" },
      ],
    },
    {
      id: "maths",
      name: { en: "General Mathematics", or: "ସାଧାରଣ ଗଣିତ" },
      stage: { en: "Written · 40 marks", or: "ଲିଖିତ · 40 ମାର୍କ" },
      marks: 40,
      topics: [
        { en: "Fractions and decimals", or: "ଭଗ୍ନାଂଶ ଓ ଦଶମିକ" },
        { en: "Number system", or: "ସଂଖ୍ୟା ପଦ୍ଧତି" },
        { en: "HCF, LCM and remainder", or: "ଗ.ସା.ଗୁ, ଲ.ସା.ଗୁ ଓ ଭାଗଶେଷ" },
        { en: "Squares and square roots", or: "ବର୍ଗ ଓ ବର୍ଗମୂଳ" },
        { en: "Cubes and cube roots", or: "ଘନ ଓ ଘନମୂଳ" },
        { en: "Percentage and averages", or: "ଶତକଡ଼ା ଓ ହାରାହାରି" },
        { en: "Simple and compound interest", or: "ସରଳ ଓ ଚକ୍ରବୃଦ୍ଧି ସୁଧ" },
        { en: "Profit, loss and discount", or: "ଲାଭ, କ୍ଷତି ଓ ରିହାତି" },
        { en: "Mixtures", or: "ମିଶ୍ରଣ" },
        { en: "Partnership", or: "ଅଂଶୀଦାରୀ" },
        { en: "Ratio and proportion", or: "ଅନୁପାତ ଓ ସମାନୁପାତ" },
        { en: "Rates and taxes, insurance", or: "ହାର ଓ କର, ବୀମା" },
        { en: "Time and work", or: "ସମୟ ଓ କାର୍ଯ୍ୟ" },
        { en: "Statistics", or: "ପରିସଂଖ୍ୟାନ" },
        { en: "Time and distance", or: "ସମୟ ଓ ଦୂରତା" },
      ],
    },
    {
      id: "reasoning",
      name: { en: "Reasoning & Mental Ability", or: "ତର୍କ ଓ ମାନସିକ ଦକ୍ଷତା" },
      stage: { en: "Written · 60 marks", or: "ଲିଖିତ · 60 ମାର୍କ" },
      marks: 60,
      topics: [
        { en: "Numerical ability", or: "ସାଂଖ୍ୟିକ ଦକ୍ଷତା" },
        { en: "Reasoning", or: "ତର୍କ" },
        { en: "Aptitude test", or: "ଦକ୍ଷତା ପରୀକ୍ଷା" },
        { en: "Problem solving and decision making", or: "ସମସ୍ୟା ସମାଧାନ ଓ ନିଷ୍ପତ୍ତି ଗ୍ରହଣ" },
      ],
    },
    {
      id: "cst",
      name: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" },
      stage: { en: "Practical · 50 marks", or: "ବ୍ୟବହାରିକ · 50 ମାର୍କ" },
      marks: 50,
      topics: [
        { en: "Windows: create, rename, copy / cut / paste and delete files & folders", or: "Windows: ଫାଇଲ ଓ ଫୋଲ୍ଡର ତିଆରି, ନାମ ବଦଳ, କପି / କଟ / ପେଷ୍ଟ ଓ ଡିଲିଟ" },
        { en: "MS Word: edit & format text and paragraphs", or: "MS Word: ଲେଖା ଓ ଅନୁଚ୍ଛେଦ ସମ୍ପାଦନ ଓ ଫର୍ମାଟିଂ" },
        { en: "MS Word: page & paragraph setup, pictures and WordArt", or: "MS Word: ପୃଷ୍ଠା ଓ ଅନୁଚ୍ଛେଦ ସେଟଅପ, ଛବି ଓ WordArt" },
        { en: "MS PowerPoint: a 2–3 slide presentation, editing & formatting slides", or: "MS PowerPoint: 2–3 ସ୍ଲାଇଡ ପ୍ରେଜେଣ୍ଟେସନ, ସ୍ଲାଇଡ ସମ୍ପାଦନ ଓ ଫର୍ମାଟିଂ" },
        { en: "MS Excel: formatting cells and data", or: "MS Excel: ସେଲ ଓ ଡାଟା ଫର୍ମାଟିଂ" },
        { en: "MS Excel: functions & formulas (relative, absolute, mixed reference)", or: "MS Excel: ଫଙ୍କସନ ଓ ଫର୍ମୁଲା (relative, absolute, mixed reference)" },
        { en: "MS Access: create a database and enter data", or: "MS Access: ଡାଟାବେସ ତିଆରି ଓ ଡାଟା ଏଣ୍ଟ୍ରି" },
        { en: "MS Access: set the primary key", or: "MS Access: primary key ସେଟ କରିବା" },
      ],
    },
  ],

  fee: {
    items: [
      { category: { en: "UR & SEBC", or: "UR ଓ SEBC" }, amount: "₹500" },
      { category: { en: "SC, ST & PwD", or: "SC, ST ଓ PwD" }, amount: "₹200" },
    ],
    notes: [
      { en: "Paid online through SB Collect only (link inside the application form).", or: "କେବଳ SB Collect ମାଧ୍ୟମରେ ଅନଲାଇନ ଦେୟ (ଆବେଦନ ଫର୍ମ ଭିତରେ ଲିଙ୍କ)।" },
      { en: "Non-refundable. Fee paid against a wrong Application ID means no application.", or: "ଫେରସ୍ତଯୋଗ୍ୟ ନୁହେଁ। ଭୁଲ Application ID ରେ ଫି ଦେଲେ ଆବେଦନ ଗ୍ରାହ୍ୟ ହେବ ନାହିଁ।" },
    ],
  },

  howToApply: [
    { en: "Apply online only at www.ssbodisha.ac.in — no hard copy is accepted.", or: "କେବଳ www.ssbodisha.ac.in ରେ ଅନଲାଇନ ଆବେଦନ — ହାର୍ଡ କପି ଗ୍ରହଣ ହେବ ନାହିଁ।" },
    { en: "Read the instructions on the application page before you start.", or: "ଆରମ୍ଭ ପୂର୍ବରୁ ଆବେଦନ ପୃଷ୍ଠାର ନିର୍ଦ୍ଦେଶାବଳୀ ପଢ଼ନ୍ତୁ।" },
    { en: "Enter your graduation (+3) aggregate percentage; convert CGPA using your university's formula.", or: "ସ୍ନାତକ (+3) ମୋଟ ଶତକଡ଼ା ଦିଅନ୍ତୁ; CGPA କୁ ନିଜ ବିଶ୍ୱବିଦ୍ୟାଳୟର ସୂତ୍ରରେ ବଦଳାନ୍ତୁ।" },
    { en: "Upload a photo taken within 15 days, your signature and left-thumb impression.", or: "15 ଦିନ ଭିତରେ ଉଠାଯାଇଥିବା ଫଟୋ, ଦସ୍ତଖତ ଓ ବାମ ବୁଢ଼ା ଆଙ୍ଗୁଠି ଚିହ୍ନ ଅପଲୋଡ କରନ୍ତୁ।" },
    { en: "Fill your six post preferences carefully — there is no edit option after final submission.", or: "ଛଅଟି ପଦବୀ ପସନ୍ଦ ସାବଧାନରେ ଦିଅନ୍ତୁ — ଚୂଡ଼ାନ୍ତ ଦାଖଲ ପରେ ସଂଶୋଧନ ହେବ ନାହିଁ।" },
    { en: "Pay the fee with the correct Application ID, then download the form after 48 hours.", or: "ଠିକ Application ID ରେ ଫି ଦିଅନ୍ତୁ, 48 ଘଣ୍ଟା ପରେ ଫର୍ମ ଡାଉନଲୋଡ କରନ୍ତୁ।" },
  ],

  documents: [
    { en: "Printout of the submitted online application", or: "ଦାଖଲ ହୋଇଥିବା ଅନଲାଇନ ଆବେଦନର ପ୍ରିଣ୍ଟ" },
    { en: "HSC certificate & mark sheet (date of birth proof)", or: "HSC ପ୍ରମାଣପତ୍ର ଓ ମାର୍କସିଟ (ଜନ୍ମ ତାରିଖ ପ୍ରମାଣ)" },
    { en: "+2 and graduation (+3) certificates & mark sheets", or: "+2 ଓ ସ୍ନାତକ (+3) ପ୍ରମାଣପତ୍ର ଓ ମାର୍କସିଟ" },
    { en: "Computer learning certificate", or: "କମ୍ପ୍ୟୁଟର ଶିକ୍ଷା ପ୍ରମାଣପତ୍ର" },
    { en: "Two passport photos (name & roll no. on the back)", or: "ଦୁଇଟି ପାସପୋର୍ଟ ଫଟୋ (ପଛରେ ନାମ ଓ ରୋଲ ନଂ)" },
    { en: "Conduct certificate from the last college / university", or: "ଶେଷ କଲେଜ / ବିଶ୍ୱବିଦ୍ୟାଳୟରୁ ଆଚରଣ ପ୍ରମାଣପତ୍ର" },
    { en: "Caste certificate (SEBC: issued within the last 3 years)", or: "ଜାତି ପ୍ରମାଣପତ୍ର (SEBC: ଗତ 3 ବର୍ଷ ମଧ୍ୟରେ)" },
    { en: "Resident certificate", or: "ବାସିନ୍ଦା ପ୍ରମାଣପତ୍ର" },
    { en: "Odia pass certificate (M.E. standard), if applicable", or: "ଓଡ଼ିଆ ପାସ ପ୍ରମାଣପତ୍ର (M.E. ସ୍ତର), ଯଦି ପ୍ରଯୁଜ୍ୟ" },
    { en: "Ex-Servicemen discharge certificate, if applicable", or: "ପୂର୍ବତନ ସୈନିକ ଡିସଚାର୍ଜ ପ୍ରମାଣପତ୍ର, ଯଦି ପ୍ରଯୁଜ୍ୟ" },
    { en: "Disability certificate with percentage, if applicable", or: "ଶତକଡ଼ା ସହ ଅକ୍ଷମତା ପ୍ରମାଣପତ୍ର, ଯଦି ପ୍ରଯୁଜ୍ୟ" },
    { en: "Sportsperson ID card, if applicable", or: "କ୍ରୀଡ଼ାବିତ ପରିଚୟ ପତ୍ର, ଯଦି ପ୍ରଯୁଜ୍ୟ" },
    { en: "No Objection Certificate for government employees", or: "ସରକାରୀ କର୍ମଚାରୀଙ୍କ ପାଇଁ ଅନାପତ୍ତି ପ୍ରମାଣପତ୍ର (NOC)" },
  ],

  // Main section of the page (laid out like the Odisha 10th page).
  // Set `testId` on a subject / chapter / full mock when its test goes live in the API.
  tests: {
    title: { en: "Select a subject", or: "ବିଷୟ ବାଛନ୍ତୁ" },
    sub: {
      en: "Subject tests and chapter-wise practice in the SSB exam pattern. More tests are added every week.",
      or: "SSB ପରୀକ୍ଷା ଢାଞ୍ଚାରେ ବିଷୟ ଟେଷ୍ଟ ଓ ଅଧ୍ୟାୟ ଅନୁୟାୟୀ ଅଭ୍ୟାସ। ପ୍ରତି ସପ୍ତାହରେ ନୂଆ ଟେଷ୍ଟ ଯୋଡ଼ାଯାଏ।",
    },
    apiExam: "SSB",
    fullMocks: [
      { name: { en: "Full Mock Test 1", or: "ପୂର୍ଣ୍ଣ ମକ୍ ଟେଷ୍ଟ 1" }, meta: { en: "100 Qs · 200 marks · 2 hrs", or: "100 ପ୍ରଶ୍ନ · 200 ମାର୍କ · 2 ଘଣ୍ଟା" } },
      { name: { en: "Full Mock Test 2", or: "ପୂର୍ଣ୍ଣ ମକ୍ ଟେଷ୍ଟ 2" }, meta: { en: "100 Qs · 200 marks · 2 hrs", or: "100 ପ୍ରଶ୍ନ · 200 ମାର୍କ · 2 ଘଣ୍ଟା" } },
    ],
    subjects: [
      {
        id: "english",
        icon: "🔤",
        accent: "#1D4ED8",
        name: { en: "General English", or: "ସାଧାରଣ ଇଂରାଜୀ" },
        meta: { en: "100 Qs · 200 marks", or: "100 ପ୍ରଶ୍ନ · 200 ମାର୍କ" },
        testId: 45, // /mocktest/test/45
        poster: "/images/ssb-odisha/ssb-odisha-english.jpeg",
        chapters: [
          { name: { en: "Verbs", or: "କ୍ରିୟା (Verbs)" }, topics: ["Tenses", "Modals", "Active & passive voice", "Subject-verb agreement", "Infinitives & participles"] },
          { name: { en: "Sentence structure", or: "ବାକ୍ୟ ଗଠନ" }, topics: ["Connectors", "Types of sentences", "Phrases & clauses", "Direct & indirect speech", "Degrees of comparison"] },
          { name: { en: "Parts of speech", or: "ଶବ୍ଦ ଭେଦ (Parts of speech)" }, topics: ["Articles", "Nouns", "Adverbs", "Adjectives", "Prepositions"] },
          { name: { en: "Reading comprehension", or: "ବୋଧପରୀକ୍ଷା" }, topics: ["Unseen passage (400–450 words)", "Vocabulary in context"] },
        ],
        levels: [
          { level: 1, name: { en: "Level 1 Test", or: "ସ୍ତର 1 ଟେଷ୍ଟ" }, meta: { en: "Easy · Basic Level", or: "ସହଜ · ମୌଳିକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 2, name: { en: "Level 2 Test", or: "ସ୍ତର 2 ଟେଷ୍ଟ" }, meta: { en: "Medium · Standard Level", or: "ମଧ୍ୟମ · ମାନକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 3, name: { en: "Level 3 Test", or: "ସ୍ତର 3 ଟେଷ୍ଟ" }, meta: { en: "Hard · Advanced Level", or: "କଠିନ · ଉଚ୍ଚ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 4, name: { en: "Level 4 Test", or: "ସ୍ତର 4 ଟେଷ୍ଟ" }, meta: { en: "Expert · Pro Level", or: "ବିଶେଷଜ୍ଞ · ପ୍ରୋ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 5, name: { en: "Level 5 Test", or: "ସ୍ତର 5 ଟେଷ୍ଟ" }, meta: { en: "Master · Exam Level", or: "ମାଷ୍ଟର · ପରୀକ୍ଷା ସ୍ତର" }, questions: 25, minutes: 25 },
        ],
      },
      {
        id: "reasoning",
        icon: "🧩",
        accent: "#BE185D",
        name: { en: "Reasoning & Mental Ability", or: "ତର୍କ ଓ ମାନସିକ ଦକ୍ଷତା" },
        meta: { en: "30 Qs · 60 marks", or: "30 ପ୍ରଶ୍ନ · 60 ମାର୍କ" },
        chapters: [
          { name: { en: "Numerical ability", or: "ସାଂଖ୍ୟିକ ଦକ୍ଷତା" }, topics: ["Number series", "Missing numbers", "Quick calculations"] },
          { name: { en: "Reasoning", or: "ତର୍କ" }, topics: ["Coding-decoding", "Blood relations", "Directions", "Analogy & classification"] },
          { name: { en: "Aptitude test", or: "ଦକ୍ଷତା ପରୀକ୍ଷା" }, topics: ["Ranking & order", "Seating arrangement", "Puzzles"] },
          { name: { en: "Problem solving & decision making", or: "ସମସ୍ୟା ସମାଧାନ ଓ ନିଷ୍ପତ୍ତି" }, topics: ["Statement & conclusion", "Course of action", "Situation-based questions"] },
        ],
        levels: [
          { level: 1, name: { en: "Level 1 Test", or: "ସ୍ତର 1 ଟେଷ୍ଟ" }, meta: { en: "Easy · Basic Level", or: "ସହଜ · ମୌଳିକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 2, name: { en: "Level 2 Test", or: "ସ୍ତର 2 ଟେଷ୍ଟ" }, meta: { en: "Medium · Standard Level", or: "ମଧ୍ୟମ · ମାନକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 3, name: { en: "Level 3 Test", or: "ସ୍ତର 3 ଟେଷ୍ଟ" }, meta: { en: "Hard · Advanced Level", or: "କଠିନ · ଉଚ୍ଚ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 4, name: { en: "Level 4 Test", or: "ସ୍ତର 4 ଟେଷ୍ଟ" }, meta: { en: "Expert · Pro Level", or: "ବିଶେଷଜ୍ଞ · ପ୍ରୋ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 5, name: { en: "Level 5 Test", or: "ସ୍ତର 5 ଟେଷ୍ଟ" }, meta: { en: "Master · Exam Level", or: "ମାଷ୍ଟର · ପରୀକ୍ଷା ସ୍ତର" }, questions: 25, minutes: 25 },
        ],
      },
      {
        id: "gk",
        icon: "🌏",
        accent: "#0E7490",
        name: { en: "GK & Current Affairs", or: "ସାଧାରଣ ଜ୍ଞାନ ଓ ସାମ୍ପ୍ରତିକ ଘଟଣା" },
        meta: { en: "20 Qs · 40 marks", or: "20 ପ୍ରଶ୍ନ · 40 ମାର୍କ" },
        chapters: [
          { name: { en: "History", or: "ଇତିହାସ" }, topics: ["Events with dates", "Personalities", "Places"] },
          { name: { en: "Geography", or: "ଭୂଗୋଳ" }, topics: ["Geographical facts with places"] },
          { name: { en: "States, countries & headquarters", or: "ରାଜ୍ୟ, ଦେଶ ଓ ମୁଖ୍ୟାଳୟ" }, topics: ["States & capitals", "Countries", "Institutions & headquarters"] },
          { name: { en: "Books & authors", or: "ପୁସ୍ତକ ଓ ଲେଖକ" }, topics: ["Famous books", "Authors"] },
          { name: { en: "Science & discoveries", or: "ବିଜ୍ଞାନ ଓ ଆବିଷ୍କାର" }, topics: ["Scientific facts", "Discoveries & inventors", "Uses"] },
          { name: { en: "Current affairs", or: "ସାମ୍ପ୍ରତିକ ଘଟଣା" }, topics: ["Current events", "Places & personalities", "Matching questions"] },
        ],
        levels: [
          { level: 1, name: { en: "Level 1 Test", or: "ସ୍ତର 1 ଟେଷ୍ଟ" }, meta: { en: "Easy · Basic Level", or: "ସହଜ · ମୌଳିକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 2, name: { en: "Level 2 Test", or: "ସ୍ତର 2 ଟେଷ୍ଟ" }, meta: { en: "Medium · Standard Level", or: "ମଧ୍ୟମ · ମାନକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 3, name: { en: "Level 3 Test", or: "ସ୍ତର 3 ଟେଷ୍ଟ" }, meta: { en: "Hard · Advanced Level", or: "କଠିନ · ଉଚ୍ଚ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 4, name: { en: "Level 4 Test", or: "ସ୍ତର 4 ଟେଷ୍ଟ" }, meta: { en: "Expert · Pro Level", or: "ବିଶେଷଜ୍ଞ · ପ୍ରୋ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 5, name: { en: "Level 5 Test", or: "ସ୍ତର 5 ଟେଷ୍ଟ" }, meta: { en: "Master · Exam Level", or: "ମାଷ୍ଟର · ପରୀକ୍ଷା ସ୍ତର" }, questions: 25, minutes: 25 },
        ],
      },
      {
        id: "maths",
        icon: "➗",
        accent: "#7C3AED",
        name: { en: "General Mathematics", or: "ସାଧାରଣ ଗଣିତ" },
        meta: { en: "20 Qs · 40 marks", or: "20 ପ୍ରଶ୍ନ · 40 ମାର୍କ" },
        chapters: [
          { name: { en: "Number system", or: "ସଂଖ୍ୟା ପଦ୍ଧତି" }, topics: ["Fractions & decimals", "HCF, LCM & remainder", "Squares & square roots", "Cubes & cube roots"] },
          { name: { en: "Percentage & averages", or: "ଶତକଡ଼ା ଓ ହାରାହାରି" }, topics: ["Percentage", "Averages"] },
          { name: { en: "Simple & compound interest", or: "ସରଳ ଓ ଚକ୍ରବୃଦ୍ଧି ସୁଧ" }, topics: ["Simple interest", "Compound interest"] },
          { name: { en: "Profit, loss & discount", or: "ଲାଭ, କ୍ଷତି ଓ ରିହାତି" }, topics: ["Profit & loss", "Discount"] },
          { name: { en: "Ratio, proportion & partnership", or: "ଅନୁପାତ, ସମାନୁପାତ ଓ ଅଂଶୀଦାରୀ" }, topics: ["Ratio & proportion", "Partnership", "Mixtures"] },
          { name: { en: "Rates, taxes & insurance", or: "ହାର, କର ଓ ବୀମା" }, topics: ["Rates & taxes", "Insurance"] },
          { name: { en: "Time & work, time & distance", or: "ସମୟ ଓ କାର୍ୟ୍ୟ, ସମୟ ଓ ଦୂରତା" }, topics: ["Time & work", "Time & distance"] },
          { name: { en: "Statistics", or: "ପରିସଂଖ୍ୟାନ" }, topics: ["Mean, median & mode", "Data interpretation"] },
        ],
        levels: [
          { level: 1, name: { en: "Level 1 Test", or: "ସ୍ତର 1 ଟେଷ୍ଟ" }, meta: { en: "Easy · Basic Level", or: "ସହଜ · ମୌଳିକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 2, name: { en: "Level 2 Test", or: "ସ୍ତର 2 ଟେଷ୍ଟ" }, meta: { en: "Medium · Standard Level", or: "ମଧ୍ୟମ · ମାନକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 3, name: { en: "Level 3 Test", or: "ସ୍ତର 3 ଟେଷ୍ଟ" }, meta: { en: "Hard · Advanced Level", or: "କଠିନ · ଉଚ୍ଚ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 4, name: { en: "Level 4 Test", or: "ସ୍ତର 4 ଟେଷ୍ଟ" }, meta: { en: "Expert · Pro Level", or: "ବିଶେଷଜ୍ଞ · ପ୍ରୋ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 5, name: { en: "Level 5 Test", or: "ସ୍ତର 5 ଟେଷ୍ଟ" }, meta: { en: "Master · Exam Level", or: "ମାଷ୍ଟର · ପରୀକ୍ଷା ସ୍ତର" }, questions: 25, minutes: 25 },
        ],
      },
      {
        id: "computer",
        icon: "💻",
        accent: "#15803D",
        name: { en: "Computer Skill Test", or: "କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା" },
        meta: { en: "50 marks · 1 hr · practical", or: "50 ମାର୍କ · 1 ଘଣ୍ଟା · ବ୍ୟବହାରିକ" },
        testId: 11, // existing Computer MCQ test
        questions: 30,
        minutes: 30,
        chapters: [
          { name: { en: "Windows", or: "Windows" }, topics: ["Create & rename files / folders", "Copy, cut & paste", "Delete using the clipboard"] },
          { name: { en: "MS Word", or: "MS Word" }, topics: ["Editing & formatting text", "Page & paragraph setup", "Pictures & WordArt"] },
          { name: { en: "MS PowerPoint", or: "MS PowerPoint" }, topics: ["2–3 slide presentation", "Editing & formatting slides"] },
          { name: { en: "MS Excel", or: "MS Excel" }, topics: ["Formatting cells & data", "Functions & formulas", "Relative, absolute & mixed reference"] },
          { name: { en: "MS Access", or: "MS Access" }, topics: ["Create a database", "Enter data", "Set the primary key"] },
        ],
        levels: [
          { level: 1, name: { en: "Level 1 Test", or: "ସ୍ତର 1 ଟେଷ୍ଟ" }, meta: { en: "Easy · Basic Level", or: "ସହଜ · ମୌଳିକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 2, name: { en: "Level 2 Test", or: "ସ୍ତର 2 ଟେଷ୍ଟ" }, meta: { en: "Medium · Standard Level", or: "ମଧ୍ୟମ · ମାନକ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 3, name: { en: "Level 3 Test", or: "ସ୍ତର 3 ଟେଷ୍ଟ" }, meta: { en: "Hard · Advanced Level", or: "କଠିନ · ଉଚ୍ଚ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 4, name: { en: "Level 4 Test", or: "ସ୍ତର 4 ଟେଷ୍ଟ" }, meta: { en: "Expert · Pro Level", or: "ବିଶେଷଜ୍ଞ · ପ୍ରୋ ସ୍ତର" }, questions: 25, minutes: 25 },
          { level: 5, name: { en: "Level 5 Test", or: "ସ୍ତର 5 ଟେଷ୍ଟ" }, meta: { en: "Master · Exam Level", or: "ମାଷ୍ଟର · ପରୀକ୍ଷା ସ୍ତର" }, questions: 25, minutes: 25 },
        ],
      },
    ],
  },

  faq: [
    {
      q: { en: "How many posts are there in SSB Odisha Advt. No. 01/2026?", or: "SSB ଓଡ଼ିଶା ବିଜ୍ଞପ୍ତି ନଂ 01/2026 ରେ କେତେ ପଦ ଅଛି?" },
      a: {
        en: "883 posts in total: 534 Junior Assistant posts (Govt. Degree Colleges, NCC, BSE Odisha, 16 State Universities and OUHS) and 349 Junior Clerk posts in Non-Govt. Aided Colleges across 28 districts. 281 of them are reserved for women.",
        or: "ମୋଟ 883 ପଦ: 534 କନିଷ୍ଠ ସହାୟକ (ସରକାରୀ ଡିଗ୍ରୀ କଲେଜ, NCC, BSE ଓଡ଼ିଶା, 16ଟି ରାଜ୍ୟ ବିଶ୍ୱବିଦ୍ୟାଳୟ ଓ OUHS) ଏବଂ 28ଟି ଜିଲ୍ଲାର ବେସରକାରୀ ଅନୁଦାନପ୍ରାପ୍ତ କଲେଜରେ 349 କନିଷ୍ଠ କିରାଣି। ଏଥିରୁ 281ଟି ମହିଳାଙ୍କ ପାଇଁ ସଂରକ୍ଷିତ।",
      },
    },
    {
      q: { en: "What was the last date to apply?", or: "ଆବେଦନର ଶେଷ ତାରିଖ କେବେ ଥିଲା?" },
      a: {
        en: "Online applications ran from 11 March 2026 (2:30 PM) to 13 April 2026 (11:45 PM), including fee payment.",
        or: "ଅନଲାଇନ ଆବେଦନ 11 ମାର୍ଚ୍ଚ 2026 (ଅପରାହ୍ନ 2:30) ରୁ 13 ଏପ୍ରିଲ 2026 (ରାତି 11:45) ପର୍ଯ୍ୟନ୍ତ ଥିଲା, ଫି ଦେୟ ସହିତ।",
      },
    },
    {
      q: { en: "What is the age limit and qualification?", or: "ବୟସ ସୀମା ଓ ଯୋଗ୍ୟତା କ'ଣ?" },
      a: {
        en: "21 to 42 years as on 1 January 2026, with relaxation for SC, ST, SEBC, women, ex-servicemen and PwD. You need a Bachelor's degree in any discipline, a basic computer certificate and Odia language knowledge.",
        or: "1 ଜାନୁଆରୀ 2026 ସୁଦ୍ଧା 21 ରୁ 42 ବର୍ଷ, SC, ST, SEBC, ମହିଳା, ପୂର୍ବତନ ସୈନିକ ଓ PwD ଙ୍କ ପାଇଁ ଛାଡ଼ ସହ। ଯେକୌଣସି ବିଷୟରେ ସ୍ନାତକ ଡିଗ୍ରୀ, ମୌଳିକ କମ୍ପ୍ୟୁଟର ପ୍ରମାଣପତ୍ର ଓ ଓଡ଼ିଆ ଭାଷା ଜ୍ଞାନ ଆବଶ୍ୟକ।",
      },
    },
    {
      q: { en: "Is there negative marking in the written test?", or: "ଲିଖିତ ପରୀକ୍ଷାରେ ନେଗେଟିଭ ମାର୍କିଂ ଅଛି କି?" },
      a: {
        en: "Yes. Each right answer gets 2 marks and each wrong answer loses 0.5 marks. The test has 100 questions for 200 marks in 2 hours.",
        or: "ହଁ। ପ୍ରତି ଠିକ ଉତ୍ତରରେ 2 ମାର୍କ ଓ ପ୍ରତି ଭୁଲ ଉତ୍ତରରେ 0.5 ମାର୍କ କଟିବ। 2 ଘଣ୍ଟାରେ 200 ମାର୍କର 100 ପ୍ରଶ୍ନ।",
      },
    },
    {
      q: { en: "Is there a typing test?", or: "ଟାଇପିଂ ପରୀକ୍ଷା ଅଛି କି?" },
      a: {
        en: "The notice lists a 50-mark, 1-hour Computer Skill Test on Windows, MS Word, PowerPoint, Excel and Access. It doesn't mention a separate typing-speed test. You need 20 marks to qualify.",
        or: "ବିଜ୍ଞପ୍ତିରେ Windows, MS Word, PowerPoint, Excel ଓ Access ଉପରେ 50 ମାର୍କ, 1 ଘଣ୍ଟାର କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା ଅଛି। ଅଲଗା ଟାଇପିଂ ଗତି ପରୀକ୍ଷାର ଉଲ୍ଲେଖ ନାହିଁ। ଉତ୍ତୀର୍ଣ୍ଣ ପାଇଁ 20 ମାର୍କ ଆବଶ୍ୟକ।",
      },
    },
    {
      q: { en: "Where will the exam be held?", or: "ପରୀକ୍ଷା କେଉଁଠି ହେବ?" },
      a: {
        en: "The written test is held in five zones: Balasore, Berhampur, Bhubaneswar, Jeypore and Sambalpur. The Computer Skill Test and document verification are in Bhubaneswar.",
        or: "ଲିଖିତ ପରୀକ୍ଷା ପାଞ୍ଚଟି ଜୋନରେ: ବାଲେଶ୍ୱର, ବ୍ରହ୍ମପୁର, ଭୁବନେଶ୍ୱର, ଜୟପୁର ଓ ସମ୍ବଲପୁର। କମ୍ପ୍ୟୁଟର ଦକ୍ଷତା ପରୀକ୍ଷା ଓ ପ୍ରମାଣପତ୍ର ଯାଞ୍ଚ ଭୁବନେଶ୍ୱରରେ।",
      },
    },
  ],
};

// Home page row: one card per subject, live tests first. Subjects without a test open their row on the SSB page.
export const ssbOdishaItems: PosterItem[] = [...ssbJuniorAssistant2026.tests!.subjects]
  .sort((a, b) => Number(!!b.testId) - Number(!!a.testId))
  .map((s) => ({
    id: `ssb-${s.id}`,
    icon: s.icon,
    title: s.name.en,
    sub: "SSB Odisha",
    meta: s.testId ? "Subject test · Free" : "Coming soon",
    image: s.poster,
    tone: [s.accent, `color-mix(in srgb, ${s.accent} 45%, #000)`],
    href: s.testId ? `/mocktest/test/${s.testId}` : `${SSB_ODISHA_PAGE}#tests-${s.id}`,
    badge: s.testId ? undefined : "SOON",
  }));
