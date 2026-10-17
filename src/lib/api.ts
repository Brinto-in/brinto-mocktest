// src/lib/api.ts

const API_BASE = "https://brintoapi.brinto.in";

export function getAuthToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("brinto_token") || "";
  }
  return "";
}

export function getGuestId(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("brinto_guest_id") || "";
  }
  return "";
}

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    const url = `${API_BASE}/api/mocktests?page=${page}&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      }
    });

    if (!res.ok) {
      const errMsg = `API responded with status: ${res.status}`;
      console.error(errMsg);
      if (typeof window !== "undefined") {
        alert(`API Error: ${errMsg}`);
      }
      return [];
    }
    const json = await res.json();
    return json?.data || json?.tests || (Array.isArray(json) ? json : []);
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.error("Error fetching mock tests:", err);
    if (typeof window !== "undefined") {
      alert(`API Connection Error: ${errMsg}`);
    }
    return [];
  }
}

export async function createMockTestSession(testId: string | number): Promise<string | null> {
  try {
    const token = getAuthToken();
    const guestId = getGuestId();
    const parsedTestId = typeof testId === "number" ? testId : parseInt(testId, 10);
    if (!parsedTestId || isNaN(parsedTestId)) {
      console.error("Invalid or missing testId in createMockTestSession:", testId);
      return null;
    }

    const headers: Record<string, string> = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Guest-Id": guestId,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/api/mocktests/sessions`, {
      method: "POST",
      headers,
      body: JSON.stringify({ testId: parsedTestId })
    });

    const json = await res.json();
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

export async function submitMockTestAttempt(payload: AttemptPayload) {
  try {
    const token = getAuthToken();
    const guestId = getGuestId();

    const headers: Record<string, string> = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Guest-Id": guestId,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/api/mocktests/attempts`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const json = await res.json();
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
    const token = getAuthToken();
    const guestId = getGuestId();

    const sessionId = await createMockTestSession(testId);
    if (!sessionId) {
      console.error("Could not create session for test", testId);
      return null;
    }

    const headers: Record<string, string> = {
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      "X-Guest-Id": guestId,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url = `${API_BASE}/api/mocktests/${testId}?session_id=${sessionId}`;
    const res = await fetch(url, { headers });
    const json = await res.json();

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
      console.error(`fetchTestBySlug failed:`, json);
      if (typeof window !== "undefined") {
        alert(`API Error: ${errMsg}`);
      }
    }
    return null;
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.error(`Error fetching test by slug:`, err);
    if (typeof window !== "undefined") {
      alert(`API Connection Error: ${errMsg}`);
    }
    return null;
  }
}

export async function fetchTestDetails(idOrSlug: string) {
  try {
    if (!idOrSlug) return null;
    const url = `${API_BASE}/api/mocktests/${idOrSlug}/details`;
    const res = await fetch(url, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      }
    });

    if (!res.ok) {
      console.error(`fetchTestDetails failed with status: ${res.status}`);
      return null;
    }

    const json = await res.json();
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
    const token = getAuthToken();
    const guestId = getGuestId();

    const headers: Record<string, string> = {
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      "X-Guest-Id": guestId,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url = `${API_BASE}/api/mocktests/my-attempts?page=${page}&limit=${limit}&section=true`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      console.error(`fetchMyAttempts failed with status: ${res.status}`);
      return [];
    }

    const json = await res.json();
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

    const token = getAuthToken();
    const guestId = getGuestId();

    const headers: Record<string, string> = {
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      "X-Guest-Id": guestId,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url = `${API_BASE}/api/mocktests/my-attempts/${attemptId}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      console.error(`fetchAttemptDetails failed with status: ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error("Error fetching attempt details:", err);
    return null;
  }
}
