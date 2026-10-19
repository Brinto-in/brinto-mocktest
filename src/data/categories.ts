import type { Category } from '../lib/types';

export const categories: Category[] = [
  { label: 'OSSSC', icon: '🏛️', count: 1, href: '/mocktest/tests?exam=OSSSC', color: '#B00020', active: true },
  { label: 'OPSC', icon: '⚖️', count: 0, href: '/mocktest/tests/opsc', color: '#7B0015', active: false },
  { label: 'OSSC', icon: '🗂️', count: 0, href: '/mocktest/tests/ossc', color: '#C0392B', active: false },
  { label: 'SSC CGL', icon: '📋', count: 0, href: '/mocktest/tests/ssc', color: '#D4830F', active: false },
  { label: 'Railway RRB', icon: '🚂', count: 0, href: '/mocktest/tests/railway', color: '#1B6B3A', active: false },
  { label: 'Banking', icon: '🏦', count: 0, href: '/mocktest/tests/banking', color: '#0D47A1', active: false },
  { label: 'Odisha Police', icon: '🛡️', count: 0, href: '/mocktest/tests/police', color: '#4A148C', active: false },
  { label: 'Teaching', icon: '📚', count: 0, href: '/mocktest/tests/teaching', color: '#006064', active: false },
];
