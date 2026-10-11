import type { APIRoute } from "astro";

async function startSession(testId: string | number, authHeader: string, guestIdHeader: string) {
  const parsedId = typeof testId === "number" ? testId : parseInt(testId, 10);
  if (!parsedId || isNaN(parsedId)) {
    return null;
  }

  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Guest-Id": guestIdHeader || "",
  };
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const sessRes = await fetch("https://brintoapi.brinto.in/api/mocktests/sessions", {
    method: "POST",
    headers,
    body: JSON.stringify({ testId: parsedId }),
  });
  const sessJson = await sessRes.json();
  if (sessJson?.success && sessJson?.data?.id) {
    return sessJson.data.id as string;
  }
  return null;
}

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
      sessionId = await startSession(id, authHeader, guestIdHeader);
      if (!sessionId) {
        return new Response(JSON.stringify({ message: "Failed to create session for test" }), { status: 400 });
      }
    }

    const reqHeaders: Record<string, string> = {
      "Accept": "*/*",
    };
    if (authHeader) {
      reqHeaders["Authorization"] = authHeader;
    }

    const res = await fetch(`https://brintoapi.brinto.in/api/mocktests/${id}?session_id=${sessionId}`, {
      headers: reqHeaders
    });

    const json = await res.json();
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

    const sessionId = await startSession(testId, authHeader, guestIdHeader);
    if (!sessionId) {
      return new Response(JSON.stringify({ message: "Failed to create test session" }), { status: 400 });
    }

    const reqHeaders: Record<string, string> = {
      "Accept": "*/*",
    };
    if (authHeader) {
      reqHeaders["Authorization"] = authHeader;
    }

    const res = await fetch(`https://brintoapi.brinto.in/api/mocktests/${testId}?session_id=${sessionId}`, {
      headers: reqHeaders
    });

    const json = await res.json();
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
