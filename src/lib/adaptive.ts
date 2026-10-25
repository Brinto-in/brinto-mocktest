/** Keybr-style adaptive engine: per-key speed tracking, weakest-key focus, progressive letter unlock. */
export const ORDER = [..."enitrlsauodycghpmkbwfzvxqj"];
const KEY = "brinto-adaptive-v1";
const START = 6;
const VOWELS = "aeiouy";

interface KeyStat { ms: number; n: number; hits: number; miss: number }
export interface Store { unlocked: number; keys: Record<string, KeyStat> }

const pick = <T>(a: T[]) => a[(Math.random() * a.length) | 0];

export const fresh = (): Store => ({ unlocked: START, keys: {} });

export function load(): Store {
    try {
        const s = JSON.parse(localStorage.getItem(KEY) || "null");
        if (s?.unlocked >= START) return s;
    } catch { }
    return fresh();
}

export function save(s: Store) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { }
}

/** Log one keystroke. `ms` = time since previous key (null if unknown). */
export function record(s: Store, ch: string, ms: number | null, ok: boolean) {
    const k = (s.keys[ch] ??= { ms: 0, n: 0, hits: 0, miss: 0 });
    if (!ok) return void k.miss++;
    k.hits++;
    if (ms !== null && ms < 2000) {
        k.ms = k.n++ ? k.ms + 0.15 * (ms - k.ms) : ms;
    }
}

/** target speed ÷ your speed × accuracy. ≥ 1 means the key is at goal. null = not enough data. */
export function confidence(s: Store, ch: string, wpm: number): number | null {
    const k = s.keys[ch];
    if (!k || k.n < 5) return null;
    return (60000 / (wpm * 5) / k.ms) * (k.hits / (k.hits + k.miss));
}

export const unlockedLetters = (s: Store) => ORDER.slice(0, s.unlocked);

/** Unlocks the next letter when every open key is at goal. Returns it, or null. */
export function maybeUnlock(s: Store, wpm: number): string | null {
    const ready = unlockedLetters(s).every((c) => (confidence(s, c, wpm) ?? 0) >= 1);
    return ready && s.unlocked < ORDER.length ? ORDER[s.unlocked++] : null;
}

/** Weakest key (untested keys come first). */
export function focusLetter(s: Store, wpm: number): string {
    const score = (c: string) => confidence(s, c, wpm) ?? -1;
    return unlockedLetters(s).reduce((a, b) => (score(b) < score(a) ? b : a));
}

function pseudoWord(letters: string[]): string {
    const v = letters.filter((c) => VOWELS.includes(c));
    const c = letters.filter((c) => !VOWELS.includes(c));
    let useV = Math.random() < 0.5;
    let w = "";
    for (let i = 3 + ((Math.random() * 3) | 0); i--; useV = !useV) {
        w += pick(useV && v.length ? v : c.length ? c : letters);
    }
    return w;
}

export function makeWords(s: Store, dict: string[], wpm: number, count: number): string[] {
    const letters = unlockedLetters(s);
    const pool = dict.filter((w) => [...w].every((c) => letters.includes(c)));
    const focus = focusLetter(s, wpm);
    const focused = pool.filter((w) => w.includes(focus));
    const out: string[] = [];
    while (out.length < count) {
        const w =
            pool.length < 8 ? pseudoWord(letters)
                : focused.length && Math.random() < 0.7 ? pick(focused)
                    : pick(pool);
        if (w !== out[out.length - 1]) out.push(w);
    }
    return out;
}