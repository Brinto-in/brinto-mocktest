// src/lib/api/passageService.ts
import { apiClient } from "./client";

export interface TypingResultPayload {
  session_id: string;
  passage_id: number | null;
  passage_number?: number;
  keystrokes_count: number;
  error_count: number;
  backspace_count: number;
  total_word_count: number;
  typed_word_count: number;
  wpm: number;
}

export async function fetchMockTestPassage(testName: string, excludeId?: number | null) {
  try {
    const encodedName = encodeURIComponent(testName);
    let endpoint = `/api/mocktest-passages?test_name=${encodedName}`;
    if (excludeId !== null && excludeId !== undefined && !Number.isNaN(excludeId)) {
      endpoint += `&exclude_ids=${excludeId}`;
    }
    const json = await apiClient(endpoint, {
      headers: { "Accept": "*/*" }
    });
    let d = json?.data;
    if (Array.isArray(d)) d = d[0];
    if (d?.passage_text) {
      const rawId = d.id ?? d.passage_id;
      const id = rawId !== undefined && rawId !== null ? Number(rawId) : null;
      return { text: d.passage_text, id, raw: d };
    }
    return null;
  } catch (err) {
    console.error("Error fetching mock test passage:", err);
    return null;
  }
}

export async function submitTypingResult(payload: TypingResultPayload) {
  try {
    const json = await apiClient("/api/mocktest-passages/results", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error("Error submitting typing result:", err);
    return null;
  }
}

export async function fetchTypingResults() {
  try {
    const json = await apiClient("/api/mocktest-passages/results", {
      headers: { "Accept": "*/*" }
    });
    if (json?.success && Array.isArray(json?.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching typing results:", err);
    return [];
  }
}
