import type { APIRoute } from "astro";
import { fetchMockTests } from "../../lib/api";
import type { Test } from "../../lib/types";

export const GET: APIRoute = async () => {
  try {
    const items = await fetchMockTests(1, 50);
    const tests: Test[] = items.map((t: any) => ({
      id: t.id,
      title: t.title || t.name,
      exam: t.exam || "General",
      questions: Array.isArray(t.questions) ? t.questions.length : (t.questions || 0),
      duration: t.duration || 30,
      difficulty: t.difficulty || "Medium",
      attempts: t.attempts || 0,
      rating: t.rating || 5,
      href: `/mocktest/test/${t.id}`,
      isNew: !!(t.is_new || t.isNew),
      isFree: !!(t.is_free || t.isFree),
    }));

    return new Response(JSON.stringify(tests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch tests from remote API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
