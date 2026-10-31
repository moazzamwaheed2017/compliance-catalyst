import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { extractClientIp } from "@/lib/client-ip";
import { ensureTablesExist, turso } from "@/lib/turso";

const text = (max: number) => z.string().max(max).optional().default("");

const schema = z.object({
  viewId: z.string().min(8).max(64),
  sessionId: z.string().min(8).max(64),
  page: text(200),
  seconds: z
    .number()
    .int()
    .min(0)
    .max(4 * 60 * 60),
  landing: text(200),
  referrer: text(300),
  utm_source: text(100),
  utm_medium: text(100),
  utm_campaign: text(100),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// One row per session: total visible time across its page views.
const SESSIONS = `
  SELECT session_id,
         SUM(active_seconds) AS seconds,
         COUNT(*) AS pages,
         MAX(COALESCE(NULLIF(utm_source, ''), 'none')) AS source
  FROM page_engagement GROUP BY session_id`;

export const Route = createFileRoute("/api/public/engagement")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = schema.safeParse(await request.json());
        } catch {
          return json({ error: "invalid_body" }, 400);
        }
        if (!parsed.success) return json({ error: "invalid_input" }, 400);

        const d = parsed.data;
        const country = request.headers.get("x-vercel-ip-country") || "Unknown";
        const now = new Date().toISOString();
        try {
          await ensureTablesExist();
          // A page view is reported each time the tab is hidden; keep the largest total.
          await turso.execute({
            sql: `INSERT INTO page_engagement (view_id, session_id, ip_address, page, landing, referrer, utm_source, utm_medium, utm_campaign, country, active_seconds, started_at, updated_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(view_id) DO UPDATE SET
                    active_seconds = MAX(active_seconds, excluded.active_seconds),
                    updated_at = excluded.updated_at`,
            args: [
              d.viewId,
              d.sessionId,
              extractClientIp(request.headers),
              d.page,
              d.landing,
              d.referrer,
              d.utm_source,
              d.utm_medium,
              d.utm_campaign,
              country,
              d.seconds,
              now,
              now,
            ],
          });
          return json({ ok: true });
        } catch (error) {
          console.error("[engagement] Error writing to Turso DB:", error);
          return json({ ok: false }, 500);
        }
      },
      // Aggregated averages only (no per-visitor data).
      GET: async () => {
        try {
          await ensureTablesExist();
          const overall = await turso.execute(
            `SELECT COUNT(*) AS sessions, ROUND(AVG(seconds)) AS avg_seconds, ROUND(AVG(pages), 1) AS avg_pages FROM (${SESSIONS})`,
          );
          const bySource = await turso.execute(
            `SELECT source, COUNT(*) AS sessions, ROUND(AVG(seconds)) AS avg_seconds, ROUND(AVG(pages), 1) AS avg_pages
             FROM (${SESSIONS}) GROUP BY source ORDER BY sessions DESC`,
          );
          const byPage = await turso.execute(
            `SELECT page, COUNT(*) AS views, ROUND(AVG(active_seconds)) AS avg_seconds
             FROM page_engagement GROUP BY page ORDER BY views DESC LIMIT 50`,
          );
          return json({
            overall: overall.rows[0] ?? null,
            bySource: bySource.rows,
            byPage: byPage.rows,
          });
        } catch (error) {
          console.error("[engagement] Error reading from Turso DB:", error);
          return json({ ok: false }, 500);
        }
      },
    },
  },
});
