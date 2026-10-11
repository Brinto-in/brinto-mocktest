// src/lib/api.ts

const API_BASE = "https://brintoapi.brinto.in";
const STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmQxMDQwZThkM2U0MTdhNjcwYjhjYSIsInVzZXJfaWQiOiJCNjQzIiwidXNlcl9uYW1lIjoibmxocmJwdHIiLCJyb2xlIjpbIkFETUlOIl0sIm1vYmlsZSI6IjkxNzg0NjkwNDYiLCJpYXQiOjE3OTE3MDc0MDIsImV4cCI6MTc5MjMxMjU2MH0.vOCsFW-7RKeiCTfygY3HiFD3tgKR57atbOzGKq6nuLY";
const STATIC_SESSION_ID = "982f0557-58d8-4f9e-aa57-1db0bd61541c";
const STATIC_TEST_ID = "11";

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    let url = `${API_BASE}/api/mocktests?page=${page}&limit=${limit}`;
    let res = await fetch(url, {
      redirect: "manual",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      }
    });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      console.warn("fetchMockTests was redirected to:", loc);
      if (loc) {
        res = await fetch(loc, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
          }
        });
      }
    }

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
    const res = await fetch(url, {
      headers: {
        "Accept": "*/*",
        "Authorization": `Bearer ${STATIC_TOKEN}`
      }
    });
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
