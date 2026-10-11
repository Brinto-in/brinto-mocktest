// src/lib/api.ts

const API_BASE = "https://brintoapi.brinto.in";
const STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmQxMDQwZThkM2U0MTdhNjcwYjhjYSIsInVzZXJfaWQiOiJCNjQzIiwidXNlcl9uYW1lIjoibmxocmJwdHIiLCJyb2xlIjpbIkFETUlOIl0sIm1vYmlsZSI6IjkxNzg0NjkwNDYiLCJpYXQiOjE3OTE3MDc0MDIsImV4cCI6MTc5MjMxMjU2MH0.vOCsFW-7RKeiCTfygY3HiFD3tgKR57atbOzGKq6nuLY";
const DEFAULT_SESSION_ID = "982f0557-58d8-4f9e-aa57-1db0bd61541c";

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
      console.error(`API responded with status: ${res.status}`);
      return [];
    }
    const json = await res.json();
    return json?.data || json?.tests || (Array.isArray(json) ? json : []);
  } catch (err) {
    console.error("Error fetching mock tests:", err);
    return [];
  }
}

export async function fetchTestBySlug(idOrSlug: string, token?: string, sessionId: string = DEFAULT_SESSION_ID) {
  const testId = "11";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmQxMDQwZThkM2U0MTdhNjcwYjhjYSIsInVzZXJfaWQiOiJCNjQzIiwidXNlcl9uYW1lIjoibmxocmJwdHIiLCJyb2xlIjpbIkFETUlOIl0sIm1vYmlsZSI6IjkxNzg0NjkwNDYiLCJpYXQiOjE3OTE3MDc3NjAsImV4cCI6MTc5MjMxMjU2MH0.vOCsFW-7RKeiCTfygY3HiFD3tgKR57atbOzGKq6nuLY";

  try {
    const url = `${API_BASE}/api/mocktests/${testId}?session_id=982f0557-58d8-4f9e-aa57-1db0bd61541c`;
    const res = await fetch(url, {
      headers: {
        "Accept": "*/*",
        "Authorization": `Bearer ${authToken}`
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
        questions: formattedQuestions
      };
    } else {
      console.error(`fetchTestBySlug failed for ${idOrSlug}:`, json);
    }
    return null;
  } catch (err) {
    console.error(`Error fetching test ${idOrSlug}:`, err);
    return null;
  }
}
