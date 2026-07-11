// src/lib/db.ts

import { createClient } from "@libsql/client";

// Read at runtime. On Vercel, dashboard env vars are only available at runtime
// via process.env — import.meta.env would be inlined as undefined at build time.
const url = process.env.TURSO_DATABASE_URL ?? import.meta.env.TURSO_DATABASE_URL;
const authToken =
    process.env.TURSO_AUTH_TOKEN ?? import.meta.env.TURSO_AUTH_TOKEN;

if (!url) {
    throw new Error(
        "TURSO_DATABASE_URL is not set. Add it in Vercel Project Settings → Environment Variables.",
    );
}

export const db = createClient({
    url,
    authToken,
});
