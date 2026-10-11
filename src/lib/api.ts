// src/lib/api.ts
import { loginWithMobile } from "./authService";

const API_BASE = "https://brintoapi.brinto.in";
let STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmQxMDQwZThkM2U0MTdhNjcwYjhjYSIsInVzZXJfaWQiOiJCNjQzIiwidXNlcl9uYW1lIjoibmxocmJwdHIiLCJyb2xlIjpbIkFETUlOIl0sIm1vYmlsZSI6IjkxNzg0NjkwNDYiLCJpYXQiOjE3OTE3MDk5NTcsImV4cCI6MTc5MjMxNDc1N30.zakxNYj-GoJ5fUiv9uKMtY0oedsSMlMLqwKcsY1sJWo";
const STATIC_SESSION_ID = "982f0557-58d8-4f9e-aa57-1db0bd61541c";
const STATIC_TEST_ID = "11";

async function getFreshToken(): Promise<string> {
  try {
    const auth = await loginWithMobile("9178469046");
    if (auth?.token) {
      STATIC_TOKEN = auth.token;
      return auth.token;
    }
  } catch (e) {
    console.error("Failed to auto-refresh token:", e);
  }
  return STATIC_TOKEN;
}

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    const url = `${API_BASE}/api/mocktests?page=${page}&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
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

export async function fetchTestBySlug(_idOrSlug?: string) {
  try {
    const url = `${API_BASE}/api/mocktests/${STATIC_TEST_ID}?session_id=${STATIC_SESSION_ID}`;
    let res = await fetch(url, {
      headers: {
        "Accept": "*/*",
        "Authorization": `Bearer ${STATIC_TOKEN}`
      }
    });

    let json = await res.json();

    // Auto-refresh token if 401 Unauthorized occurs
    if (!json?.success && json?.error?.toLowerCase().includes("unauthorized")) {
      console.warn("Token expired, auto-refreshing token via API...");
      const freshToken = await getFreshToken();
      res = await fetch(url, {
        headers: {
          "Accept": "*/*",
          "Authorization": `Bearer ${freshToken}`
        }
      });
      json = await res.json();
    }

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
          id: t.id ?? STATIC_TEST_ID,
          title: t.title || "Mock Test",
          exam: t.exam || "General",
          questions: formattedQuestions.length || (typeof t.questions === 'number' ? t.questions : 0),
          duration: t.duration || 30,
          difficulty: t.difficulty || "Medium",
          attempts: t.attempts || 0,
          rating: t.rating || 5,
          href: `/mocktest/test/${t.id ?? STATIC_TEST_ID}`,
          isNew: !!t.is_new,
          isFree: !!t.is_free,
        },
        questions: formattedQuestions
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
    console.error(`Error fetching static test:`, err);
    if (typeof window !== "undefined") {
      alert(`API Connection Error: ${errMsg}`);
    }
    return null;
  }
}
