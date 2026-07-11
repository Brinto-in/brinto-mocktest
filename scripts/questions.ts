import type { APIRoute } from "astro";
import { db } from "../src/lib/db";

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const testHref = `/test/${slug}`;

  if (!slug) {
    return new Response(JSON.stringify({ message: "Test slug is required" }), { status: 400 });
  }

  try {
    // 1. Find the test_id from the href
    const testResult = await db.execute({
      sql: "SELECT id FROM tests WHERE href = ? LIMIT 1",
      args: [testHref],
    });

    if (testResult.rows.length === 0) {
      return new Response(JSON.stringify({ message: "Test not found" }), { status: 404 });
    }
    const testId = testResult.rows[0].id;

    // 2. Get all questions for that test_id
    const questionsResult = await db.execute({
      sql: "SELECT id, section, text, explanation FROM questions WHERE test_id = ?",
      args: [testId],
    });

    // 3. For each question, get its options
    const questions = [];
    for (const qRow of questionsResult.rows) {
      const optionsResult = await db.execute({
        sql: "SELECT text, is_correct FROM options WHERE question_id = ?",
        args: [qRow.id],
      });

      const options = optionsResult.rows.map((opt: any) => opt.text);
      const correctIndex = optionsResult.rows.findIndex((opt: any) => opt.is_correct);

      questions.push({
        id: qRow.id,
        section: qRow.section,
        text: qRow.text,
        explanation: qRow.explanation,
        options: options,
        correct: correctIndex,
      });
    }

    return new Response(JSON.stringify(questions), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch questions" }), { status: 500 });
  }
};