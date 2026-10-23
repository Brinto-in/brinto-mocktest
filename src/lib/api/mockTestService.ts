// src/lib/api/mockTestService.ts
import { apiClient } from "./client";

export interface AttemptAnswer {
  questionId: number | string;
  selectedOptionId: number | string | null;
  isMarked: boolean;
}

export interface AttemptPayload {
  sessionId: string;
  timeTaken: number;
  answers: AttemptAnswer[];
}

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    const json = await apiClient(`/api/mocktests?page=${page}&limit=${limit}`);
    return json?.data || json?.tests || (Array.isArray(json) ? json : []);
  } catch (err: any) {
    console.error("Error fetching mock tests:", err);
    if (typeof window !== "undefined") {
      alert(`API Connection Error: ${err?.message || err}`);
    }
    return [];
  }
}

export async function createMockTestSession(testId: string | number): Promise<string | null> {
  try {
    const parsedTestId = typeof testId === "number" ? testId : parseInt(testId, 10);
    if (!parsedTestId || isNaN(parsedTestId)) {
      console.error("Invalid or missing testId in createMockTestSession:", testId);
      return null;
    }

    const json = await apiClient("/api/mocktests/sessions", {
      method: "POST",
      body: JSON.stringify({ testId: parsedTestId })
    });

    if (json?.success && json?.data?.id) {
      return json.data.id;
    }
    console.error("createMockTestSession failed:", json);
    return null;
  } catch (err) {
    console.error("Error creating mock test session:", err);
    return null;
  }
}

export async function submitMockTestAttempt(payload: AttemptPayload) {
  try {
    const json = await apiClient("/api/mocktests/attempts", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    if (json?.success && json?.data) {
      return json.data;
    }
    console.error("submitMockTestAttempt failed:", json);
    return null;
  } catch (err) {
    console.error("Error submitting mock test attempt:", err);
    return null;
  }
}

export async function fetchTestBySlug(idOrSlug?: string) {
  try {
    if (!idOrSlug) {
      console.error("idOrSlug is required for fetchTestBySlug");
      return null;
    }

    const testId = idOrSlug;
    const sessionId = await createMockTestSession(testId);
    if (!sessionId) {
      console.error("Could not create session for test", testId);
      return null;
    }

    const json = await apiClient(`/api/mocktests/${testId}?session_id=${sessionId}`, {
      headers: { "Accept": "*/*" }
    });

    if (json?.success && json?.data) {
      const t = json.data;
      const rawQuestions = Array.isArray(t.questions) ? t.questions : [];

      const formattedQuestions = rawQuestions.map((q: any) => ({
        ...q,
        options: Array.isArray(q.options)
          ? q.options.map((opt: any) => (typeof opt === 'object' && opt !== null ? opt.text : opt))
          : []
      }));

      return {
        test: {
          id: t.id ?? testId,
          title: t.title || "Mock Test",
          exam: t.exam || "General",
          questions: formattedQuestions.length || (typeof t.questions === 'number' ? t.questions : 0),
          duration: t.duration || 30,
          difficulty: t.difficulty || "Medium",
          attempts: t.attempts || 0,
          rating: t.rating || 5,
          href: `/mocktest/test/${t.id ?? testId}`,
          isNew: !!t.is_new,
          isFree: !!t.is_free,
        },
        questions: formattedQuestions,
        sessionId
      };
    } else {
      const errMsg = json?.error || json?.message || "Failed to fetch test details";
      console.error("fetchTestBySlug failed:", json);
      if (typeof window !== "undefined") {
        alert(`API Error: ${errMsg}`);
      }
    }
    return null;
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.error("Error fetching test by slug:", err);
    if (typeof window !== "undefined") {
      alert(`API Connection Error: ${errMsg}`);
    }
    return null;
  }
}

export async function fetchTestDetails(idOrSlug: string) {
  try {
    if (!idOrSlug) return null;
    const json = await apiClient(`/api/mocktests/${idOrSlug}/details`, {
      headers: { "Accept": "*/*" }
    });

    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error("Error fetching test details:", err);
    return null;
  }
}

export async function fetchMyAttempts(page = 1, limit = 10) {
  try {
    const json = await apiClient(`/api/mocktests/my-attempts?page=${page}&limit=${limit}&section=true`, {
      headers: { "Accept": "*/*" }
    });

    if (json?.success && Array.isArray(json?.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.error("Error fetching my attempts:", err);
    return [];
  }
}

export async function fetchAttemptDetails(attemptId: string) {
  try {
    if (!attemptId) return null;
    const json = await apiClient(`/api/mocktests/my-attempts/${attemptId}`, {
      headers: { "Accept": "*/*" }
    });

    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error("Error fetching attempt details:", err);
    return null;
  }
}
