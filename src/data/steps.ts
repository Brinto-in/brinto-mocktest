import type { Step } from '../lib/types';

export const steps: Step[] = [
  {
    n: '01',
    title: 'Pick your exam',
    body: 'Browse tests by exam category — OSSSC, OPSC, Railways, Banking and more, all in one place.',
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  },
  {
    n: '02',
    title: 'Attempt the test',
    body: 'Take timed tests in an interface that mirrors actual exam conditions, with auto-submit at time-up.',
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    n: '03',
    title: 'Review & improve',
    body: 'Get a detailed section-wise analysis, correct answers with explanations, and your all-India rank.',
    icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  },
];