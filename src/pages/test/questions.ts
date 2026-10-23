// src/pages/test/questions.ts
import type { APIRoute } from "astro";
import { createMockTestSession, apiClient } from "../../lib/api";

export const GET: APIRoute = async ({ request, params }) => {
  const urlParams = new URL(request.url).searchParams;
  const id = params.slug || urlParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "Test ID is required" }), { status: 400 });
  }

  let sessionId = urlParams.get("session_id");
  const authHeader = request.headers.get("authorization") || "";
  const guestIdHeader = request.headers.get("x-guest-id") || "";

  try {
    if (!sessionId) {
      sessionId = await createMockTestSession(id);
      if (!sessionId) {
        return new Response(JSON.stringify({ message: "Failed to create session for test" }), { status: 400 });
      }
    }

    const headers: Record<string, string> = {
      "Accept": "*/*",
      "X-Guest-Id": guestIdHeader,
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const json = await apiClient(`/api/mocktests/${id}?session_id=${sessionId}`, {
      headers
    });

    if (json?.success && json?.data?.questions) {
      const rawQuestions = json.data.questions;
      const formattedQuestions = rawQuestions.map((q: any) => ({
        ...q,
        options: Array.isArray(q.options)
          ? q.options.map((opt: any) => (typeof opt === 'object' && opt !== null ? opt.text : opt))
          : []
      }));
      return new Response(JSON.stringify({ questions: formattedQuestions, sessionId, data: json.data }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ message: json?.error || "Test not found" }), { status: 404 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch questions" }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const testId = body.testId;
    if (!testId) {
      return new Response(JSON.stringify({ message: "Test ID is required" }), { status: 400 });
    }

    const authHeader = request.headers.get("authorization") || "";
    const guestIdHeader = request.headers.get("x-guest-id") || "";

    const sessionId = await createMockTestSession(testId);
    if (!sessionId) {
      return new Response(JSON.stringify({ message: "Failed to create test session" }), { status: 400 });
    }

    const headers: Record<string, string> = {
      "Accept": "*/*",
      "X-Guest-Id": guestIdHeader,
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const json = await apiClient(`/api/mocktests/${testId}?session_id=${sessionId}`, {
      headers
    });

    if (json?.success && json?.data?.questions) {
      const rawQuestions = json.data.questions;
      const formattedQuestions = rawQuestions.map((q: any) => ({
        ...q,
        options: Array.isArray(q.options)
          ? q.options.map((opt: any) => (typeof opt === 'object' && opt !== null ? opt.text : opt))
          : []
      }));
      return new Response(JSON.stringify({ questions: formattedQuestions, sessionId, data: json.data }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ message: json?.error || "Failed to fetch questions" }), { status: 404 });
  } catch (error) {
    console.error("Error in questions POST handler:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
};
