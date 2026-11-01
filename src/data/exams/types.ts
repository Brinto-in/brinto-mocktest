/**
 * Shared data model for recruitment exam pages (src/components/exam/*).
 * One exam = one data file (e.g. data/exams/odisha/ssb-junior-assistant-2026.ts);
 * the page just passes it to <ExamPage />.
 *
 * Text is `T`: a plain string (same in every language — names, numbers) or
 * `{ en, or }` when it needs an Odia translation.
 */

export type L = { en: string; or: string };
export type T = string | L;

export interface ExamBoard {
  short: string; // "SSB Odisha"
  name: T; // "State Selection Board"
  department?: T; // "Higher Education Department, Government of Odisha"
  website: string;
  email?: string;
}

export interface ExamNotice {
  number: string; // "01/2026"
  date: string; // ISO date
  url?: string; // official PDF / notice page
}

export interface Stat {
  value: string;
  label: T;
}

/** A date row in the timeline. `start`/`end` are ISO date-times (with +05:30). No dates → "Awaited". */
export interface KeyDate {
  label: T;
  start?: string;
  end?: string;
  note?: T;
}

export interface TableColumn {
  key: string;
  label: T;
  align?: "left" | "center" | "right";
}

export type Cell = T | number;

export interface TableData {
  columns: TableColumn[];
  rows: Record<string, Cell>[];
  total?: Record<string, Cell>;
}

export interface VacancyView {
  id: string;
  label: T;
  table: TableData;
  note?: T;
}

export interface Vacancy {
  total: number;
  summary: Stat[];
  views: VacancyView[];
  notes?: T[];
}

export interface EligibilityItem {
  icon: string;
  title: T;
  value: T;
  points?: T[];
}

export interface PatternSubject {
  name: T;
  questions?: number;
  marks: number;
}

export interface PatternStage {
  id: string;
  name: T;
  marks: number;
  questions?: number;
  duration: T;
  mode: T;
  marking?: T;
  qualifying?: T;
  subjects?: PatternSubject[];
}

export interface SyllabusSubject {
  id: string;
  name: T;
  stage: T; // "Written test" / "Computer Skill Test"
  marks?: number;
  topics: T[];
}

export interface ProcessStep {
  title: T;
  body: T;
}

export interface FeeItem {
  category: T;
  amount: string;
}

/*
 * Mock tests, laid out like the Odisha 10th page: an "Available now" row, subject filter pills,
 * then one row per subject (full subject test + chapter tests).
 * testId = the test in the API (/mocktest/test/{testId}). No testId → card shows "Coming soon".
 */

export interface ChapterTest {
  name: L;
  topics?: T[]; // first few are shown on the card
  testId?: number;
  questions?: number;
  minutes?: number;
  poster?: string; // path under /public; falls back to a text card
}

export interface SubjectTests {
  id: string;
  name: L;
  icon: string;
  accent: string; // card colour
  meta: L; // e.g. "30 Qs · 60 marks"
  testId?: number; // full subject test
  questions?: number;
  minutes?: number;
  poster?: string;
  chapters: ChapterTest[];
}

/** Full-length papers (all subjects), shown first. */
export interface FullMock {
  name: L;
  meta: L;
  testId?: number;
}

export interface MockTests {
  title: L;
  sub?: L;
  fullMocks?: FullMock[];
  subjects: SubjectTests[];
  /** Also list API tests whose `exam`/`category` matches this key (case-insensitive) under "Available now". */
  apiExam?: string;
}

export interface FaqItem {
  q: L;
  a: L;
}

export interface Exam {
  slug: string;
  state: string; // "odisha"
  board: ExamBoard;
  notice: ExamNotice;
  title: L; // full recruitment name
  /** Hero H1, OSSSC style: `line` in ink, `highlight` in brand red on the next line. */
  hero: { line: L; highlight: L };
  summary: L;
  group?: T; // "Group-C"
  seo: { title: string; description: string; image?: string };

  stats: Stat[];
  dates: KeyDate[];
  vacancy?: Vacancy;
  postsTable?: { table: TableData; note?: T };
  eligibility?: EligibilityItem[];
  pattern?: { stages: PatternStage[]; total: number; notes?: T[] };
  selection?: { steps: ProcessStep[]; centres?: { title: T; places: T[]; note?: T } };
  syllabus?: SyllabusSubject[];
  fee?: { items: FeeItem[]; notes?: T[] };
  howToApply?: T[];
  documents?: T[];
  tests?: MockTests;
  faq?: FaqItem[];
}
