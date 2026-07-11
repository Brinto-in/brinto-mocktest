import type { APIRoute } from "astro";
import { db } from "../../lib/db";

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
    const questionsAndOptionsResult = await db.execute({
      sql: `
        SELECT
          q.id as question_id,
          q.section,
          q.text as question_text,
          q.explanation,
          o.text as option_text,
          o.is_correct
        FROM questions q
        JOIN options o ON q.id = o.question_id
        WHERE q.test_id = ?
        ORDER BY q.id, o.id;
      `,
      args: [testId],
    });

    // 3. Process the flat results into a nested structure
    const questionsMap = new Map();
    for (const row of questionsAndOptionsResult.rows) {
      if (!questionsMap.has(row.question_id)) {
        questionsMap.set(row.question_id, {
          id: row.question_id,
          section: row.section,
          text: row.question_text,
          explanation: row.explanation,
          options: [],
          correct: -1,
        });
      }
      const question = questionsMap.get(row.question_id);
      question.options.push(row.option_text);
      if (row.is_correct) {
        question.correct = question.options.length - 1;
      }
    }
    const questions = Array.from(questionsMap.values());

    return new Response(JSON.stringify(questions), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch questions" }), { status: 500 });
  }
};