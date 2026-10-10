// src/lib/api.ts

const API_BASE = "https://brintoapi.brinto.in";

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    const res = await fetch(`${API_BASE}/api/mocktests?page=${page}&limit=${limit}`, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; BrintoMockTest/1.0)",
      }
    });
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

export async function fetchTestBySlug(idOrSlug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/mocktests/${idOrSlug}`, {
      headers: { "Accept": "application/json" }
    });
    const json = await res.json();
    if (json?.success && json?.data) {
      const t = json.data;
      return {
        test: {
          id: t.id,
          title: t.title,
          exam: t.exam,
          questions: Array.isArray(t.questions) ? t.questions.length : (t.questions || 0),
          duration: t.duration || 30,
          difficulty: t.difficulty || "Medium",
          attempts: t.attempts || 0,
          rating: t.rating || 5,
          href: `/test/${t.id}`,
          isNew: !!t.is_new,
          isFree: !!t.is_free,
        },
        questions: t.questions || []
      };
    }
    return null;
  } catch (err) {
    console.error(`Error fetching test ${idOrSlug}:`, err);
    return null;
  }
}
