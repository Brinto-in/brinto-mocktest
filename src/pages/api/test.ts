import type { APIRoute } from "astro";
import { db } from "../../lib/db";

export const GET: APIRoute = async () => {
    try {
        // Test connection
        const result = await db.execute("SELECT sqlite_version() AS version");

        return new Response(
            JSON.stringify(
                {
                    success: true,
                    message: "Connected to Turso successfully!",
                    data: result.rows,
                },
                null,
                2
            ),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify(
                {
                    success: false,
                    message: "Connection failed",
                    error: error instanceof Error ? error.message : String(error),
                },
                null,
                2
            ),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};