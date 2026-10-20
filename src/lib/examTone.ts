// Poster gradient colours for test cards that have no image.
// Known exams get a fixed tone; anything else is picked by hashing the name
// so the same exam always gets the same colour.
const known: Record<string, [string, string]> = {
  OSSSC: ['#B00020', '#5B0012'],
  OSSC: ['#1D4ED8', '#1E3A8A'],
  OPSC: ['#7C3AED', '#4C1D95'],
  SSC: ['#0E7490', '#164E63'],
  UPSC: ['#B45309', '#78350F'],
  RAILWAY: ['#15803D', '#14532D'],
  RRB: ['#15803D', '#14532D'],
  BANKING: ['#4338CA', '#312E81'],
  IBPS: ['#4338CA', '#312E81'],
};

const palette: [string, string][] = [
  ['#BE185D', '#831843'],
  ['#C2410C', '#7C2D12'],
  ['#0F766E', '#064E3B'],
  ['#4338CA', '#312E81'],
  ['#B45309', '#78350F'],
  ['#1D4ED8', '#1E3A8A'],
  ['#7C3AED', '#4C1D95'],
];

export function examTone(exam: string): [string, string] {
  const key = (exam || '').trim().toUpperCase();
  if (known[key]) return known[key];
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}
