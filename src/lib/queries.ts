import { db } from "./db";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
export interface Test {
    id: number;
    title: string;
    exam: string;
    questions: number;
    duration: number;
    difficulty: "Easy" | "Medium" | "Hard";
    attempts: number;
    rating: number;
    href: string;
    slug: string;
    is_new: number;
    is_free: number;
    created_at: string;
}

export interface Question {
    id: number;
    test_id: number;
    section: string;
    text: string;
    explanation: string | null;
    created_at: string;
    options?: Option[];
}

export interface Option {
    id: number;
    question_id: number;
    text: string;
    is_correct: number;
}

export interface CreateTestInput {
    title: string;
    exam: string;
    duration: number;
    difficulty: string;
    slug: string;
    is_free?: number;
    is_new?: number;
}

export interface CreateQuestionInput {
    test_id: number;
    section: string;
    text: string;
    explanation?: string;
    options: { text: string; is_correct: boolean }[];
}

// ─────────────────────────────────────────────
//  TESTS
// ─────────────────────────────────────────────
export async function getAllTests(): Promise<Test[]> {
    const res = await db.execute(
        "SELECT * FROM tests ORDER BY created_at DESC"
    );
    return res.rows as unknown as Test[];
}

export async function getTestById(id: number): Promise<Test | null> {
    const res = await db.execute({
        sql: "SELECT * FROM tests WHERE id = ?",
        args: [id],
    });
    return (res.rows[0] as unknown as Test) ?? null;
}

export async function getTestBySlug(slug: string): Promise<Test | null> {
    const res = await db.execute({
        sql: "SELECT * FROM tests WHERE slug = ?",
        args: [slug],
    });
    return (res.rows[0] as unknown as Test) ?? null;
}

export async function createTest(input: CreateTestInput): Promise<number> {
    const res = await db.execute({
        sql: `INSERT INTO tests (title, exam, duration, difficulty, slug, is_free, is_new, href, questions, attempts, rating)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0.0)`,
        args: [
            input.title,
            input.exam,
            input.duration,
            input.difficulty,
            input.slug,
            input.is_free ?? 1,
            input.is_new ?? 0,
            `/test/${input.slug}`,
        ],
    });
    return Number(res.lastInsertRowid);
}

export async function updateTest(
    id: number,
    input: Partial<CreateTestInput>
): Promise<void> {
    const fields = Object.keys(input)
        .map((k) => `${k} = ?`)
        .join(", ");
    const values = Object.values(input);
    await db.execute({
        sql: `UPDATE tests SET ${fields} WHERE id = ?`,
        args: [...values, id],
    });
}

export async function deleteTest(id: number): Promise<void> {
    await db.execute({ sql: "DELETE FROM tests WHERE id = ?", args: [id] });
}

// ─────────────────────────────────────────────
//  QUESTIONS
// ─────────────────────────────────────────────
export async function getQuestionsForTest(testId: number): Promise<Question[]> {
    const qRes = await db.execute({
        sql: "SELECT * FROM questions WHERE test_id = ? ORDER BY id ASC",
        args: [testId],
    });
    const questions = qRes.rows as unknown as Question[];

    if (questions.length === 0) return [];

    const ids = questions.map((q) => q.id);
    const placeholders = ids.map(() => "?").join(",");
    const oRes = await db.execute({
        sql: `SELECT * FROM options WHERE question_id IN (${placeholders}) ORDER BY id ASC`,
        args: ids,
    });
    const options = oRes.rows as unknown as Option[];

    return questions.map((q) => ({
        ...q,
        options: options.filter((o) => o.question_id === q.id),
    }));
}

export async function createQuestion(
    input: CreateQuestionInput
): Promise<number> {
    // Insert question
    const qRes = await db.execute({
        sql: `INSERT INTO questions (test_id, section, text, explanation)
          VALUES (?, ?, ?, ?)`,
        args: [
            input.test_id,
            input.section,
            input.text,
            input.explanation ?? null,
        ],
    });
    const questionId = Number(qRes.lastInsertRowid);

    // Insert options in a batch
    const optStatements = input.options.map((opt) => ({
        sql: "INSERT INTO options (question_id, text, is_correct) VALUES (?, ?, ?)",
        args: [questionId, opt.text, opt.is_correct ? 1 : 0],
    }));
    await db.batch(optStatements);

    // Update question count on test
    await db.execute({
        sql: "UPDATE tests SET questions = questions + 1 WHERE id = ?",
        args: [input.test_id],
    });

    return questionId;
}

export async function deleteQuestion(id: number, testId: number): Promise<void> {
    await db.execute({ sql: "DELETE FROM questions WHERE id = ?", args: [id] });
    await db.execute({
        sql: "UPDATE tests SET questions = MAX(0, questions - 1) WHERE id = ?",
        args: [testId],
    });
}

export async function getQuestionWithOptions(id: number): Promise<Question | null> {
    const qRes = await db.execute({
        sql: "SELECT * FROM questions WHERE id = ?",
        args: [id],
    });
    const q = qRes.rows[0] as unknown as Question;
    if (!q) return null;

    const oRes = await db.execute({
        sql: "SELECT * FROM options WHERE question_id = ? ORDER BY id ASC",
        args: [id],
    });
    return { ...q, options: oRes.rows as unknown as Option[] };
}