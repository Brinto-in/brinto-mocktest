export interface Test {
  id?: number | string;
  title: string;
  exam: string;
  questions: number;
  duration: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  attempts?: number;
  rating?: number;
  href?: string;
  isNew?: boolean;
  isFree?: boolean;
  correct_marks?: number;
  wrong_penalty?: number;
  skipped_marks?: number;
  total_marks?: number;
  isVisible?: boolean;
  created_at?: string;
}

export interface Category {
  label: string;
  icon: string;
  count: number;
  href: string;
  color: string;
  active?: boolean;
  image?: string; // optional artwork for the right side of the tile (path in /public)
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
