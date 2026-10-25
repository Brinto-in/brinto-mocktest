import type { PosterItem } from "../components/PosterRow.astro";
import type { Step } from "../lib/types";

export const OSSSC_PAGE = "/mocktest/osssc";

// Shared by the home page OSSSC row and the OSSSC page.
export const ossscItems: PosterItem[] = [
      {
        id: "typing-beginner",
        icon: "🌱",
        title: "Typing Beginner",
        sub: "Practice",
        meta: "Start from scratch · Free",
        image: "/images/typing-beginner.png",
        tone: ["#15803D", "#14532D"],
        href: "/mocktest/tests/typing-beginner",
        isNew: false,
      },
    {
      id: "osssc-typing",
      icon: "⌨️",
      title: "Typing Test",
      sub: "OSSSC",
      meta: "30 min · Speed & Accuracy",
      image: "/images/osssc-typing.png",
      tone: ["#1D4ED8", "#1E3A8A"],
      href: "/mocktest/tests/osssc-typing",
      isNew: false,
    },
  {
    id: "osssc-combo",
    icon: "⚡",
    title: "MCQ + Typing Combo",
    sub: "OSSSC",
    meta: "30 Qs + Typing · 30 min",
    tone: ["#7C3AED", "#4C1D95"],
    href: "/mocktest/osssc/tests",
    image: "/images/osssc-combo.png",
    isNew: true,
  },
  {
    id: "osssc-mcq",
    icon: "📝",
    title: "Computer MCQ Test",
    sub: "OSSSC",
    meta: "30 Qs · 30 min",
    image: "/images/osssc.png",
    tone: ["#B00020", "#6D0014"],
    href: "/mocktest/test/11",
    isNew: true,
  }

];

// Posts covered by the OSSSC combined recruitment mock test.
export interface OssscPost {
  short: string;
  name: string;
  icon: string;
  color: string;
  href: string;
}

export const ossscPosts: OssscPost[] = [
  { short: "RI", name: "Revenue Inspector", icon: "🗺️", color: "#B00020", href: "/mocktest/test/11" },
  { short: "ARI", name: "Assistant Revenue Inspector", icon: "📐", color: "#B45309", href: "/mocktest/test/11" },
  { short: "Amin", name: "Land Survey · Revenue", icon: "📏", color: "#0E7490", href: "/mocktest/test/11" },
  { short: "ICDS", name: "ICDS Supervisor", icon: "🏠", color: "#BE185D", href: "/mocktest/test/11" },
  { short: "VAW", name: "Village Agriculture Worker", icon: "🌾", color: "#15803D", href: "/mocktest/test/11" },
  { short: "JA", name: "Junior Assistant", icon: "🗂️", color: "#4338CA", href: "/mocktest/test/11" },
];

// Previous year question papers. Leave `href` out to show the card as "Coming soon".
export interface OssscPrevPaper {
  id: string;
  year: string;
  title: string;
  posts: string;
  meta: string;
  tone: [string, string];
  href?: string;
  image?: string;
  poster?: string;
}

export const ossscPrevPapers: OssscPrevPaper[] = [
  { id: "pyq-cre-2025", year: "2025", title: "OSSC CGL 2025 Computer Skill Test", posts: "RI · ARI · Amin · ICDS Supervisor · VAW", meta: "50 Qs · 50 min", tone: ["#B00020", "#6D0014"], image: "/images/osssc/ossc_cglre_2023.png", href: "/mocktest/test/23" },
];

export const ossscSteps: Step[] = [
  {
    n: "01",
    title: "Take the MCQ mock",
    body: "Attempt a full timed OSSSC objective test that follows the real exam format, with auto-submit at time-up.",
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  },
  {
    n: "02",
    title: "Practise typing",
    body: "Build speed and accuracy for the computer skill test with live WPM, accuracy and error count.",
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></svg>`,
  },
  {
    n: "03",
    title: "Review & improve",
    body: "See your score, correct answers and weak areas instantly, then retake to track your progress.",
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  },
];
