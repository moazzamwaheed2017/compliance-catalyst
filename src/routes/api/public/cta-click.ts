import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ensureTablesExist, turso } from "@/lib/turso";

const text = (max: number) => z.string().max(max).optional().default("");

const schema = z.object({
  cta: z.enum(["demo", "sandbox", "request"]),
  placement: text(60),
  page: text(200),
  landing: text(200),
  referrer: text(300),
  utm_source: text(100),
  utm_medium: text(100),
  utm_campaign: text(100),
  utm_content: text(100),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export const Route = createFileRoute("/api/public/cta-click")({
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
        try {
          await ensureTablesExist();
          await turso.execute({
            sql: `INSERT INTO cta_clicks (cta, placement, page, landing, referrer, utm_source, utm_medium, utm_campaign, utm_content, country, click_time)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              d.cta,
              d.placement,
              d.page,
              d.landing,
              d.referrer,
              d.utm_source,
              d.utm_medium,
              d.utm_campaign,
              d.utm_content,
              country,
              new Date().toISOString(),
            ],
          });
          return json({ ok: true });
        } catch (error) {
          console.error("[cta-click] Error writing to Turso DB:", error);
          return json({ ok: false }, 500);
        }
      },
      // Aggregated counts only (no per-visitor data).
      GET: async () => {
        try {
          await ensureTablesExist();
          const bySource = await turso.execute(
            `SELECT cta, COALESCE(NULLIF(utm_source, ''), 'none') AS source, COALESCE(NULLIF(utm_campaign, ''), 'none') AS campaign, COUNT(*) AS clicks
             FROM cta_clicks GROUP BY cta, source, campaign ORDER BY clicks DESC`,
          );
          const byPlacement = await turso.execute(
            "SELECT cta, placement, COUNT(*) AS clicks FROM cta_clicks GROUP BY cta, placement ORDER BY clicks DESC",
          );
          return json({ bySource: bySource.rows, byPlacement: byPlacement.rows });
        } catch (error) {
          console.error("[cta-click] Error reading from Turso DB:", error);
          return json({ ok: false }, 500);
        }
      },
    },
  },
});
