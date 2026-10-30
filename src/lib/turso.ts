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

export async function ensureTablesExist() {
  try {
    // 1. Detailed website_visitors log table
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
        visit_time TEXT DEFAULT (datetime('now'))
      );
    `);

    // 2. IP aggregate summary stats table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS visitor_ip_stats (
        ip_address TEXT PRIMARY KEY,
        country TEXT DEFAULT 'Unknown',
        total_visits INTEGER DEFAULT 1,
        first_visit TEXT DEFAULT (datetime('now')),
        last_visit TEXT DEFAULT (datetime('now'))
      );
    `);

    // 3. Call-to-action clicks (demo / sandbox) with campaign attribution
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS cta_clicks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cta TEXT NOT NULL,
        placement TEXT DEFAULT '',
        page TEXT DEFAULT '',
        landing TEXT DEFAULT '',
        referrer TEXT DEFAULT '',
        utm_source TEXT DEFAULT '',
        utm_medium TEXT DEFAULT '',
        utm_campaign TEXT DEFAULT '',
        utm_content TEXT DEFAULT '',
        country TEXT DEFAULT 'Unknown',
        click_time TEXT DEFAULT (datetime('now'))
      );
    `);
  } catch (error) {
    console.error("[Turso DB] Error ensuring tables exist:", error);
  }
}
