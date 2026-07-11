import { createClient } from '@libsql/client';
import { tests } from '../src/data/tests';
import { questionsByTest } from '../src/data/questions';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function seed() {
  console.log('🌱 Seeding database...');
  const startTime = Date.now();

  try {
    // For re-runnability, drop tables in reverse order of creation due to foreign key constraints.
    await db.execute('DROP TABLE IF EXISTS options');
    await db.execute('DROP TABLE IF EXISTS questions');
    await db.execute('DROP TABLE IF EXISTS tests');

    // 1. Create the 'tests' table
    await db.execute(`
      CREATE TABLE tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        exam TEXT NOT NULL,
        questions INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        attempts INTEGER NOT NULL,
        rating REAL NOT NULL,        href TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        is_new BOOLEAN NOT NULL,
        is_free BOOLEAN NOT NULL
      );
    `);
    console.log("✅ 'tests' table created.");

    // 2. Create the 'questions' table
    await db.execute(`
      CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_id INTEGER NOT NULL,
        section TEXT NOT NULL,
        text TEXT NOT NULL,
        explanation TEXT,
        FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE
      );
    `);
    console.log("✅ 'questions' table created.");

    // 3. Create the 'options' table
    await db.execute(`
      CREATE TABLE options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
      );
    `);
    console.log("✅ 'options' table created.");

    // 4. Seed the 'tests' table
    for (const test of tests) {
      const slug = test.href.split('/').pop();
      const testResult = await db.execute({
        sql: 'INSERT INTO tests (title, exam, questions, duration, difficulty, attempts, rating, href, slug, is_new, is_free) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id',
        args: [
          test.title,
          test.exam,
          test.questions,
          test.duration,
          test.difficulty,
          test.attempts,
          test.rating,
          test.href,
          slug!,
          test.isNew,
          test.isFree,
        ],
      });
      const testId = testResult.rows[0].id;

      // 5. Seed 'questions' and 'options' for this test
      const questionsForTest = questionsByTest[test.href];
      if (questionsForTest) {
        for (const q of questionsForTest) {
          const questionResult = await db.execute({
            sql: 'INSERT INTO questions (test_id, section, text, explanation) VALUES (?, ?, ?, ?) RETURNING id',
            args: [testId, q.section, q.text, q.explanation],
          });
          const questionId = questionResult.rows[0].id;

          const optionStatements = q.options.map((opt: string, i: number) => ({
            sql: 'INSERT INTO options (question_id, text, is_correct) VALUES (?, ?, ?)',
            args: [questionId, opt, i === q.correct],
          }));

          await db.batch(optionStatements, 'write');
        }
      }
    }
    console.log(`✅ Seeded ${tests.length} tests with their questions and options.`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  console.log(`✨ Seeding complete in ${Date.now() - startTime}ms`);
}

seed();