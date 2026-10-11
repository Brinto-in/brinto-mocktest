import type { APIRoute } from "astro";

const STATIC_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmQxMDQwZThkM2U0MTdhNjcwYjhjYSIsInVzZXJfaWQiOiJCNjQzIiwidXNlcl9uYW1lIjoibmxocmJwdHIiLCJyb2xlIjpbIkFETUlOIl0sIm1vYmlsZSI6IjkxNzg0NjkwNDYiLCJpYXQiOjE3OTE3MDk5NTcsImV4cCI6MTc5MjMxNDc1N30.zakxNYj-GoJ5fUiv9uKMtY0oedsSMlMLqwKcsY1sJWo";
const DEFAULT_SESSION_ID = "982f0557-58d8-4f9e-aa57-1db0bd61541c";

export const GET: APIRoute = async ({ request, params }) => {
  const urlParams = new URL(request.url).searchParams;
  const id = params.slug || urlParams.get("id") || "11";
  const sessionId = urlParams.get("session_id") || DEFAULT_SESSION_ID;
  const authHeader = request.headers.get("authorization") || `Bearer ${STATIC_TOKEN}`;

  try {
    const res = await fetch(`https://brintoapi.brinto.in/api/mocktests/${id}?session_id=${sessionId}`, {
      headers: {
        "Accept": "*/*",
        "Authorization": authHeader,
      }
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
      return new Response(JSON.stringify(formattedQuestions), {
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
