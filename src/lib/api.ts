// src/lib/api.ts

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL || "https://brintoapi.brinto.in";

export async function fetchMockTests(page = 1, limit = 10) {
  try {
    const res = await fetch(`${API_BASE}/api/mocktests?page=${page}&limit=${limit}`);
    const json = await res.json();
    return json?.data || json?.tests || json || [];
  } catch (err) {
    console.error("Error fetching mock tests:", err);
    return [];
  }
}

export async function fetchTestBySlug(slug: string) {
  try {
    // Falls back or uses API_BASE; if some endpoints are on outsource.brinto.in, we can handle or fallback
    const baseUrl = API_BASE.includes("brintoapi") ? API_BASE : "https://outsource.brinto.in";
    const res = await fetch(`${baseUrl}/api/test/${slug}`);
    const json = await res.json();
    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error(`Error fetching test ${slug}:`, err);
    return null;
  }
}
