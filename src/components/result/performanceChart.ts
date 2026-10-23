// Browser-side renderers for <PerformanceChart>. Plain SVG, no chart library.
//
//   renderPerformanceChart(rootEl, mcqAttempts)   – MCQ: score % per attempt
//   renderTypingChart(rootEl, typingResults)       – Typing: WPM per passage
//
// Both use the same generic card (trend line + KPIs + donut) and redraw when the card's width changes.

const SVG_NS = "http://www.w3.org/2000/svg";
type Band = "good" | "avg" | "low";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const fmtTime = (s = 0) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

// ── Generic card ──────────────────────────────────────

interface TrendPoint {
  value: number;
  band: Band;
  date: string; // ISO
  label: string; // tooltip headline value, e.g. "37%" or "32.1 WPM"
  stats: { cls: "c" | "w" | "s"; text: string }[]; // tooltip row
  foot: string; // tooltip footer
}

interface Kpi {
  label: string;
  value: string;
  unit?: string; // shown smaller after the value, e.g. "WPM"
  note?: string;
  trend?: "up" | "down";
}

interface DonutPart {
  key: "correct" | "wrong" | "skipped";
  label: string;
  value: number;
}

interface CardData {
  unit: string; // "%" or " WPM" — used in axis/avg labels
  yMax: number;
  ariaName: string; // "Score" / "Typing speed"
  points: TrendPoint[];
  kpis: Kpi[];
  donut: { parts: DonutPart[]; center: string; centerLabel: string };
}

function renderKpis(root: HTMLElement, kpis: Kpi[]) {
  const box = root.querySelector<HTMLElement>("[data-pc-kpis]");
  if (!box) return;
  box.replaceChildren(
    ...kpis.map((k) => {
      const card = document.createElement("div");
      card.className = "pc-kpi";
      const l = document.createElement("span");
      l.className = "pc-kpi-l";
      l.textContent = k.label;
      const v = document.createElement("span");
      v.className = "pc-kpi-v";
      v.textContent = k.value;
      if (k.unit) {
        const u = document.createElement("small");
        u.className = "pc-kpi-u";
        u.textContent = k.unit;
        v.append(u);
      }
      card.append(l, v);
      if (k.note) {
        const n = document.createElement("span");
        n.className = "pc-kpi-n";
        if (k.trend) n.classList.add(k.trend === "up" ? "is-up" : "is-down");
        n.textContent = k.note;
        card.append(n);
      }
      return card;
    }),
  );
}

function renderTrend(root: HTMLElement, d: CardData) {
  const host = root.querySelector<HTMLElement>("[data-pc-trend]");
  const tip = root.querySelector<HTMLElement>("[data-pc-tip]");
  if (!host || !tip) return;
  tip.hidden = true;

  const data = d.points;
  const W = Math.max(260, host.clientWidth);
  const H = W < 480 ? 200 : 240;
  const pad = { l: d.unit === "%" ? 38 : 32, r: 14, t: 16, b: 30 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const n = data.length;
  const x = (i: number) => pad.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v: number) => pad.t + ih - (Math.min(v, d.yMax) / d.yMax) * ih;
  const fmtV = (v: number) => (d.unit === "%" ? `${v}%` : `${v}`);

  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, class: "pc-svg" });
  // Whole numbers for %, one decimal for WPM
  const dp = d.unit === "%" ? 1 : 10;
  const avg = Math.round((data.reduce((s, p) => s + p.value, 0) / n) * dp) / dp;
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${d.ariaName} over ${n} attempts. Latest ${data[n - 1].label}, average ${fmtV(avg)}${d.unit === "%" ? "" : d.unit}.`);

  const gradId = `pc-grad-${root.id || "chart"}`;
  const defs = el("defs", {});
  const grad = el("linearGradient", { id: gradId, x1: 0, y1: 0, x2: 0, y2: 1 });
  grad.append(el("stop", { offset: "0%", class: "pc-grad-top" }), el("stop", { offset: "100%", class: "pc-grad-bottom" }));
  defs.append(grad);
  svg.append(defs);

  for (let k = 0; k <= 4; k++) {
    const v = Math.round((d.yMax / 4) * k);
    svg.append(el("line", { x1: pad.l, x2: W - pad.r, y1: y(v), y2: y(v), class: "pc-grid" }));
    const t = el("text", { x: pad.l - 8, y: y(v) + 4, class: "pc-axis", "text-anchor": "end" });
    t.textContent = fmtV(v);
    svg.append(t);
  }

  const step = Math.max(1, Math.ceil(n / Math.floor(iw / 56)));
  data.forEach((_, i) => {
    if (i % step && i !== n - 1) return;
    const t = el("text", { x: x(i), y: H - 8, class: "pc-axis", "text-anchor": "middle" });
    t.textContent = `#${i + 1}`;
    svg.append(t);
  });

  svg.append(el("line", { x1: pad.l, x2: W - pad.r, y1: y(avg), y2: y(avg), class: "pc-avg" }));
  const avgLabel = el("text", { x: pad.l + 6, y: y(avg) - 6, class: "pc-avg-label", "text-anchor": "start" });
  avgLabel.textContent = `Avg ${fmtV(avg)}${d.unit === "%" ? "" : d.unit}`;
  svg.append(avgLabel);

  if (n > 1) {
    const pts = data.map((p, i) => `${x(i)},${y(p.value)}`);
    svg.append(el("path", { d: `M${pts.join(" L")} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`, class: "pc-area", fill: `url(#${gradId})` }));
    svg.append(el("path", { d: `M${pts.join(" L")}`, class: "pc-line" }));
  }

  const guide = el("line", { x1: 0, x2: 0, y1: pad.t, y2: pad.t + ih, class: "pc-guide" });
  svg.append(guide);
  const dots = data.map((p, i) => {
    const c = el("circle", { cx: x(i), cy: y(p.value), r: n > 20 ? 3 : 4.5, class: `pc-dot pc-dot-${p.band}` });
    svg.append(c);
    return c;
  });

  host.replaceChildren(svg);

  const show = (i: number) => {
    const p = data[i];
    dots.forEach((dot, j) => dot.classList.toggle("is-active", j === i));
    guide.setAttribute("x1", String(x(i)));
    guide.setAttribute("x2", String(x(i)));
    guide.classList.add("is-on");

    const head = document.createElement("div");
    head.className = "pc-tip-head";
    head.textContent = `Attempt #${i + 1} · ${fmtDateTime(p.date)}`;
    const value = document.createElement("div");
    value.className = `pc-tip-score pc-band-${p.band}`;
    value.textContent = p.label;
    const row = document.createElement("div");
    row.className = "pc-tip-row";
    for (const s of p.stats) {
      const span = document.createElement("span");
      span.className = s.cls;
      span.textContent = s.text;
      row.append(span);
    }
    const foot = document.createElement("div");
    foot.className = "pc-tip-time";
    foot.textContent = p.foot;
    tip.replaceChildren(head, value, row, foot);

    // Position relative to the panel, converting chart units to screen pixels
    tip.hidden = false;
    const panel = (tip.offsetParent as HTMLElement) || host;
    const sr = svg.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const k = sr.width / W;
    const px = sr.left - pr.left + x(i) * k;
    const py = sr.top - pr.top + y(p.value) * k;
    const tw = tip.offsetWidth;
    tip.style.left = `${Math.min(Math.max(px - tw / 2, 4), pr.width - tw - 4)}px`;
    tip.style.top = `${Math.max(4, py - tip.offsetHeight - 12)}px`;
  };
  const hide = () => {
    tip.hidden = true;
    guide.classList.remove("is-on");
    dots.forEach((dot) => dot.classList.remove("is-active"));
  };
  const nearest = (clientX: number) => {
    const r = svg.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * W;
    if (n === 1) return 0;
    return Math.min(n - 1, Math.max(0, Math.round(((px - pad.l) / iw) * (n - 1))));
  };
  svg.addEventListener("pointermove", (e) => show(nearest(e.clientX)));
  svg.addEventListener("pointerdown", (e) => show(nearest(e.clientX)));
  svg.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") hide();
  });
}

function renderDonut(root: HTMLElement, donut: CardData["donut"]) {
  const host = root.querySelector<HTMLElement>("[data-pc-donut]");
  const legend = root.querySelector<HTMLElement>("[data-pc-legend]");
  if (!host || !legend) return;

  const total = donut.parts.reduce((s, p) => s + p.value, 0) || 1;
  const size = 140;
  const r = 54;
  const C = 2 * Math.PI * r;
  const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, class: "pc-donut-svg" });
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    `${donut.parts.map((p) => `${p.value} ${p.label.toLowerCase()}`).join(", ")}. ${donut.centerLabel} ${donut.center}.`,
  );
  svg.append(el("circle", { cx: size / 2, cy: size / 2, r, class: "pc-donut-track" }));

  let offset = 0;
  for (const p of donut.parts) {
    const len = (p.value / total) * C;
    if (len > 0) {
      svg.append(
        el("circle", {
          cx: size / 2,
          cy: size / 2,
          r,
          class: `pc-donut-seg pc-seg-${p.key}`,
          "stroke-dasharray": `${len} ${C - len}`,
          "stroke-dashoffset": -offset,
          transform: `rotate(-90 ${size / 2} ${size / 2})`,
        }),
      );
    }
    offset += len;
  }
  const v = el("text", { x: size / 2, y: size / 2 + 2, class: "pc-donut-v", "text-anchor": "middle" });
  v.textContent = donut.center;
  const l = el("text", { x: size / 2, y: size / 2 + 20, class: "pc-donut-l", "text-anchor": "middle" });
  l.textContent = donut.centerLabel;
  svg.append(v, l);
  host.replaceChildren(svg);

  legend.replaceChildren(
    ...donut.parts.map((p) => {
      const li = document.createElement("li");
      li.className = `pc-leg pc-leg-${p.key}`;
      const name = document.createElement("span");
      name.textContent = p.label;
      const val = document.createElement("b");
      val.textContent = `${p.value.toLocaleString("en-IN")} · ${Math.round((p.value / total) * 100)}%`;
      li.append(name, val);
      return li;
    }),
  );
}

const observers = new WeakMap<HTMLElement, ResizeObserver>();

function renderCard(root: HTMLElement, d: CardData | null) {
  root.hidden = !d || d.points.length === 0;
  observers.get(root)?.disconnect();
  if (!d || root.hidden) return;

  const sub = root.querySelector<HTMLElement>("[data-pc-sub]");
  if (sub) {
    const first = fmtDate(d.points[0].date);
    const last = fmtDate(d.points[d.points.length - 1].date);
    const count = `${d.points.length} ${d.points.length === 1 ? "attempt" : "attempts"}`;
    sub.textContent = `${count} · ${first === last ? first : `${first} – ${last}`}`;
  }

  renderKpis(root, d.kpis);
  renderDonut(root, d.donut);
  renderTrend(root, d);

  // Redraw the trend when the card width changes (responsive)
  const host = root.querySelector<HTMLElement>("[data-pc-trend]");
  if (host) {
    let lastW = host.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(host.clientWidth - lastW) < 2) return;
      lastW = host.clientWidth;
      renderTrend(root, d);
    });
    ro.observe(host);
    observers.set(root, ro);
  }
}

const deltaKpi = (label: string, latest: number, prev: number | undefined, unit: string, decimals = 0): Kpi => {
  // "%" stays attached to the number; word units (WPM) are shown as a small suffix
  const value = unit === "%" ? `${latest}%` : `${latest}`;
  const small = unit === "%" ? undefined : unit.trim();
  if (prev === undefined) return { label, value, unit: small, note: "First attempt" };
  const diff = Math.round((latest - prev) * 10 ** decimals) / 10 ** decimals;
  return {
    label,
    value,
    unit: small,
    note: `${diff >= 0 ? "▲" : "▼"} ${Math.abs(diff)} ${unit === "%" ? "pts" : unit.trim()} vs previous`,
    trend: diff >= 0 ? "up" : "down",
  };
};

// ── MCQ adapter ───────────────────────────────────────

export interface ChartAttempt {
  title?: string;
  exam?: string;
  score: number; // percent 0–100
  correct: number;
  wrong: number;
  skipped: number;
  totalQuestions: number;
  timeTaken?: number; // seconds
  submittedAt: string;
}

export function renderPerformanceChart(root: HTMLElement, attempts: ChartAttempt[]) {
  const data = [...attempts].sort((a, b) => +new Date(a.submittedAt) - +new Date(b.submittedAt));
  if (!data.length) return renderCard(root, null);

  const correct = data.reduce((s, a) => s + a.correct, 0);
  const wrong = data.reduce((s, a) => s + a.wrong, 0);
  const skipped = data.reduce((s, a) => s + a.skipped, 0);
  const total = data.reduce((s, a) => s + a.totalQuestions, 0);
  const accuracy = correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : 0;
  const attempted = total ? Math.round(((correct + wrong) / total) * 100) : 0;
  const band = (pct: number): Band => (pct >= 70 ? "good" : pct >= 40 ? "avg" : "low");

  renderCard(root, {
    unit: "%",
    yMax: 100,
    ariaName: "Score trend",
    points: data.map((a) => ({
      value: a.score,
      band: band(a.score),
      date: a.submittedAt,
      label: `${a.score}%`,
      stats: [
        { cls: "c", text: `✓ ${a.correct}` },
        { cls: "w", text: `✕ ${a.wrong}` },
        { cls: "s", text: `⊘ ${a.skipped}` },
      ],
      foot: `Time ${fmtTime(a.timeTaken)} · ${a.totalQuestions} Qs`,
    })),
    kpis: [
      deltaKpi("Latest", data[data.length - 1].score, data[data.length - 2]?.score, "%"),
      { label: "Accuracy", value: `${accuracy}%`, note: "Correct out of answered" },
      { label: "Attempted", value: `${attempted}%`, note: "Questions answered" },
    ],
    donut: {
      parts: [
        { key: "correct", label: "Correct", value: correct },
        { key: "wrong", label: "Wrong", value: wrong },
        { key: "skipped", label: "Skipped", value: skipped },
      ],
      center: `${accuracy}%`,
      centerLabel: "accuracy",
    },
  });
}

// ── Typing adapter ────────────────────────────────────

export interface TypingResult {
  wpm: number;
  typedWords: number;
  totalWords: number;
  errors: number;
  backspaces: number;
  keystrokes: number;
  passageNumber?: number;
  date: string; // ISO
}

// Speed bands for the dots/tooltip; 40 WPM is the common exam target.
export const WPM_TARGET = 40;
const wpmBand = (w: number): Band => (w >= WPM_TARGET ? "good" : w >= 25 ? "avg" : "low");

export function renderTypingChart(root: HTMLElement, results: TypingResult[]) {
  const data = [...results].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  if (!data.length) return renderCard(root, null);

  const typed = data.reduce((s, r) => s + r.typedWords, 0);
  const total = data.reduce((s, r) => s + r.totalWords, 0);
  const errors = data.reduce((s, r) => s + r.errors, 0);
  const accuracy = typed ? Math.round(((typed - Math.min(errors, typed)) / typed) * 100) : 0;
  const best = Math.max(...data.map((r) => r.wpm));
  const maxW = Math.max(best, WPM_TARGET);

  renderCard(root, {
    unit: " WPM",
    yMax: Math.ceil(maxW / 10) * 10,
    ariaName: "Typing speed",
    points: data.map((r) => ({
      value: r.wpm,
      band: wpmBand(r.wpm),
      date: r.date,
      label: `${r.wpm} WPM`,
      stats: [
        { cls: "c", text: `✓ ${r.typedWords} words` },
        { cls: "w", text: `✕ ${r.errors} errors` },
        { cls: "s", text: `⌫ ${r.backspaces}` },
      ],
      foot: `${r.passageNumber ? `Passage ${r.passageNumber} · ` : ""}${r.typedWords}/${r.totalWords} words`,
    })),
    kpis: [
      deltaKpi("Latest", data[data.length - 1].wpm, data[data.length - 2]?.wpm, " WPM", 1),
      { label: "Best", value: `${best}`, unit: "WPM", note: best >= WPM_TARGET ? "Target reached 🎉" : `Target ${WPM_TARGET} WPM` },
      { label: "Accuracy", value: `${accuracy}%`, note: "Words without errors" },
    ],
    donut: {
      parts: [
        { key: "correct", label: "Typed correctly", value: Math.max(0, typed - errors) },
        { key: "wrong", label: "Errors", value: Math.min(errors, typed) },
        { key: "skipped", label: "Not reached", value: Math.max(0, total - typed) },
      ],
      center: `${total ? Math.round((typed / total) * 100) : 0}%`,
      centerLabel: "completed",
    },
  });
}
