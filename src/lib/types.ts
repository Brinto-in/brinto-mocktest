export interface Test {
  title: string;
  exam: string;
  questions: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempts: number;
  rating: number;
  href: string;
  isNew: boolean;
  isFree: boolean;
}

export interface Category {
  label: string;
  icon: string;
  count: number;
  href: string;
  color: string;
}

export interface Step {
  n: string;
  title: string;
  body: string;
  icon: string;
}

export interface Stat {
  n: string;
  l: string;
}