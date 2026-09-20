import { createClient } from "@libsql/client";

const TURSO_URL =
  process.env.TURSO_DATABASE_URL || "libsql://regulatticewebsite-gghp.aws-us-east-2.turso.io";
const TURSO_TOKEN =
  process.env.TURSO_AUTH_TOKEN ||
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODk5MDEyOTksImlkIjoiMDFhMGJlNmMtZmIwMS03ZmJkLWFmZGMtODFkOGI0ODUyY2NiIiwia2lkIjoiMUJLNXNPUWllSjJtUktCN19hYVRoRjJQV1pwRkU0TEZQZFZmaVdoei1BcyIsInJpZCI6IjdjYzIzMWY1LTRiODYtNDE0Ni1iZjRkLWRiMTExOTk5NGFhOSJ9.pzapFh2ZG_wXamfKuP9yQVTLfDxxJ7Q3lVFIFsVPYG_ztVNVMQy1xQWEQTxceoMBxRTzL3tLMpH3uhwCPc1UCg";

export const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

let isInitialized = false;

export async function initTursoTables() {
  if (isInitialized) return;

  try {
    // 1. Detailed website_visitors table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS website_visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        country TEXT DEFAULT 'Unknown',
        city TEXT DEFAULT 'Unknown',
        region TEXT DEFAULT 'Unknown',
        user_agent TEXT DEFAULT '',
        page_url TEXT DEFAULT '',
        referrer TEXT DEFAULT '',
        ip_visit_count INTEGER DEFAULT 1,
        visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. IP aggregate summary stats table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS visitor_ip_stats (
        ip_address TEXT PRIMARY KEY,
        country TEXT DEFAULT 'Unknown',
        total_visits INTEGER DEFAULT 1,
        first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    isInitialized = true;
    console.log("[Turso DB] Tables initialized successfully");
  } catch (error) {
    console.error("[Turso DB] Failed to initialize tables:", error);
  }
}
