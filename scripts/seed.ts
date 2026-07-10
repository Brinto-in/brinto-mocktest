import { createClient } from '@libsql/client';
import { tests } from '../src/data/tests';
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
    // For re-runnability, let's drop the table if it exists.
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
        rating REAL NOT NULL,
        href TEXT NOT NULL,
        is_new BOOLEAN NOT NULL,
        is_free BOOLEAN NOT NULL
      );
    `);
    console.log("✅ 'tests' table created.");

    // 2. Prepare batch insert statements
    const insertStatements = tests.map(test => ({
      sql: 'INSERT INTO tests (title, exam, questions, duration, difficulty, attempts, rating, href, is_new, is_free) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [
        test.title,
        test.exam,
        test.questions,
        test.duration,
        test.difficulty,
        test.attempts,
        test.rating,
        test.href,
        test.isNew,
        test.isFree,
      ],
    }));

    const results = await db.batch(insertStatements, 'write');
    console.log(`✅ Seeded ${results.length} tests.`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  console.log(`✨ Seeding complete in ${Date.now() - startTime}ms`);
}

seed();