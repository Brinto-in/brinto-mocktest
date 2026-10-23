// src/data/trendingTests.ts

export interface TrendingTest {
  id: string | number;
  title: string;
  exam: string;
  questions: number;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  attempts?: number;
  rating?: number;
  href?: string;
  isNew?: boolean;
  isFree?: boolean;
  image?: string;
  info?: string;
  comingSoon?: boolean;
}

export const TRENDING_TESTS: TrendingTest[] = [
  {
    id: "osssc-typing",
    title: "OSSSC Typing Test",
    exam: "OSSSC",
    questions: 0,
    duration: 30,
    difficulty: "Medium",
    href: "/mocktest/tests/osssc-typing",
    isNew: true,
    isFree: true,
    comingSoon: false,
    info: "Typing test",
  },
  {
    id: 11,
    title: "OSSSC RI/ICDS/VAW/JA/ARI/Amin/SFS Mock Test 2026",
    exam: "OSSSC",
    questions: 50,
    duration: 45,
    difficulty: "Medium",
    href: "/mocktest/osssc/test/11",
    isNew: true,
    isFree: true,
    image: "/images/osssc-combo.png",
    comingSoon: false,
  },
  {
    id: "odisha-10th",
    title: "BSE Odisha 10th HSC Mock Test 2026-2027",
    exam: "HSC",
    questions: 50,
    duration: 45,
    difficulty: "Medium",
    href: "/mocktest/odisha-10th-mock-test",
    isNew: true,
    isFree: true,
    comingSoon: true,
  },
  {
    id: "navodaya",
    title: "Navodaya Mock Test – Free JNVST Class 6 Online Test",
    exam: "Navodaya",
    questions: 80,
    duration: 120,
    difficulty: "Medium",
    href: "/mocktest/navodaya-mock-test",
    isNew: true,
    isFree: true,
    comingSoon: true,
  },
];
