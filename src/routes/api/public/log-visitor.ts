import { createFileRoute } from "@tanstack/react-router";
import { extractClientIp } from "@/lib/client-ip";
import { ensureTablesExist, turso } from "@/lib/turso";

async function fetchGeoIpFallback(ip: string): Promise<{ country: string; city: string; region: string }> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return { country: "Local Development", city: "Localhost", region: "Local" };
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "success") {
        return {
          country: data.country || "Unknown",
          city: data.city || "Unknown",
          region: data.regionName || "Unknown",
        };
      }
    }
  } catch (e) {
    console.warn("[log-visitor] GeoIP fallback lookup error:", e);
  }

  return { country: "Unknown", city: "Unknown", region: "Unknown" };
}

export const Route = createFileRoute("/api/public/log-visitor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Always ensure tables exist before performing queries
          await ensureTablesExist();

          const headers = request.headers;
          const ip = extractClientIp(headers);

          let country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || "Unknown";
          let city = headers.get("x-vercel-ip-city") || "Unknown";
          let region = headers.get("x-vercel-ip-country-region") || "Unknown";

          const userAgent = headers.get("user-agent") || "Unknown User Agent";

          let payloadUrl = "";
          let payloadReferrer = "";

          try {
            const body = await request.json();
            if (body && typeof body === "object") {
              payloadUrl = String(body.url || "");
              payloadReferrer = String(body.referrer || "");
            }
          } catch {
            // Body empty or not JSON
          }

          const pageUrl = payloadUrl || headers.get("referer") || "/";
          const referrer = payloadReferrer || headers.get("referer") || "Direct";

          // Fallback geo lookup if headers are missing
          if (country === "Unknown" || country.length < 2) {
            const geo = await fetchGeoIpFallback(ip);
            country = geo.country;
            city = geo.city;
            region = geo.region;
          }

          const now = new Date().toISOString();

          // 1. Get or update IP visit count in visitor_ip_stats table
          let newVisitCount = 1;
          const existingStat = await turso.execute({
            sql: "SELECT total_visits FROM visitor_ip_stats WHERE ip_address = ?",
            args: [ip],
          });

          if (existingStat.rows.length > 0) {
            const currentVisits = Number(existingStat.rows[0].total_visits || 0);
            newVisitCount = currentVisits + 1;

            await turso.execute({
              sql: "UPDATE visitor_ip_stats SET total_visits = ?, last_visit = ?, country = ? WHERE ip_address = ?",
              args: [newVisitCount, now, country, ip],
            });
          } else {
            await turso.execute({
              sql: "INSERT INTO visitor_ip_stats (ip_address, country, total_visits, first_visit, last_visit) VALUES (?, ?, 1, ?, ?)",
              args: [ip, country, now, now],
            });
          }

          // 2. Insert detailed log entry into website_visitors
          await turso.execute({
            sql: `INSERT INTO website_visitors (ip_address, country, city, region, user_agent, page_url, referrer, ip_visit_count, visit_time)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [ip, country, city, region, userAgent, pageUrl, referrer, newVisitCount, now],
          });

          console.log(`[Turso Logger] Successfully logged visit for IP ${ip} (${country}, ${city}) - Visit #${newVisitCount}`);

          return new Response(
            JSON.stringify({
              success: true,
              visitor: {
                ip,
                country,
                city,
                region,
                visitCount: newVisitCount,
                timestamp: now,
              },
            }),
            { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
          );
        } catch (error) {
          console.error("[log-visitor] Error writing to Turso DB:", error);
          return new Response(
            JSON.stringify({ success: false, error: error instanceof Error ? error.message : String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
      GET: async () => {
        try {
          await ensureTablesExist();

          const totalLogs = await turso.execute("SELECT COUNT(*) as count FROM website_visitors");
          const uniqueIps = await turso.execute("SELECT COUNT(*) as count FROM visitor_ip_stats");
          const recentLogs = await turso.execute("SELECT * FROM website_visitors ORDER BY id DESC LIMIT 20");

          return new Response(
            JSON.stringify({
              success: true,
              totalVisitsLogged: Number(totalLogs.rows[0]?.count || 0),
              uniqueIpCount: Number(uniqueIps.rows[0]?.count || 0),
              recentVisitors: recentLogs.rows,
            }),
            { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ success: false, error: error instanceof Error ? error.message : String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
