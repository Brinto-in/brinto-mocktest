/**
 * Date helpers for exam pages. All dates are shown in IST, whatever the server's timezone.
 */
import type { Exam, KeyDate } from "../data/exams/types";

const TZ = "Asia/Kolkata";

export function formatDate(iso: string, withTime = false): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: TZ });
  if (!withTime) return date;
  const time = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ });
  return `${date}, ${time.toUpperCase()}`;
}

/** True when the ISO string carries a time of day (not just a date). */
const hasTime = (iso: string) => iso.includes("T");

export function formatKeyDate(k: KeyDate): string | null {
  if (!k.start) return null;
  const start = formatDate(k.start, hasTime(k.start));
  return k.end ? `${start} – ${formatDate(k.end, hasTime(k.end))}` : start;
}

export type DateStatus = "done" | "live" | "upcoming" | "awaited";

export function keyDateStatus(k: KeyDate, now = Date.now()): DateStatus {
  if (!k.start) return "awaited";
  const start = Date.parse(k.start);
  const end = k.end ? Date.parse(k.end) : start;
  if (now > end) return "done";
  if (now >= start) return "live";
  return "upcoming";
}

/** Application window = the first date row that has both start and end. */
export type ApplyPhase = { phase: "before" | "open" | "closed"; start?: string; end?: string };

export function applyPhase(exam: Exam, now = Date.now()): ApplyPhase {
  const row = exam.dates.find((d) => d.start && d.end);
  if (!row) return { phase: "closed" };
  if (now < Date.parse(row.start!)) return { phase: "before", start: row.start, end: row.end };
  if (now <= Date.parse(row.end!)) return { phase: "open", start: row.start, end: row.end };
  return { phase: "closed", start: row.start, end: row.end };
}
