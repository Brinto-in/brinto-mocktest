import type { APIRoute } from "astro";
import { db } from "../lib/db";
import type { Test } from "../lib/types";

export const GET: APIRoute = async () => {
  try {
    const result = await db.execute("SELECT * FROM tests ORDER BY id DESC");

    // The libsql client returns snake_case column names.
    // We'll map them to the camelCase properties of our `Test` type.
    const tests: Test[] = result.rows.map((row: any) => ({
      title: row.title,
      exam: row.exam,
      questions: row.questions,
      duration: row.duration,
      difficulty: row.difficulty,
      attempts: row.attempts,
      rating: row.rating,
      href: row.href,
      isNew: !!row.is_new,
      isFree: !!row.is_free,
    }));

    return new Response(JSON.stringify(tests), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch tests" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};