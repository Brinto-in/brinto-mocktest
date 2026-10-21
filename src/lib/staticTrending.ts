// Hand-picked entries inserted into the Top 10 trending row alongside API tests.
// `position` is the 0-based slot; it is clamped if fewer API tests exist.
export interface StaticTrending {
  id: string;
  title: string;
  exam: string;
  info: string; // left side of the bottom strip, in place of "Qs · min"
  position: number;
  comingSoon?: boolean;
  href?: string;
}

export const staticTrending: StaticTrending[] = [
  {
    id: "osssc-typing",
    title: "OSSSC Typing Test",
    exam: "OSSSC",
    info: "Typing test",
    position: 1,
    comingSoon: true,
  },
];

export function withStaticTrending<T>(items: T[], toItem: (s: StaticTrending) => T, limit = 10): T[] {
  const out = [...items];
  for (const s of staticTrending) {
    out.splice(Math.min(s.position, out.length), 0, toItem(s));
  }
  return out.slice(0, limit);
}
