import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { extractClientIp } from "@/lib/client-ip";
import { escapeHtml, LEAD_NOTIFY_TO, SMTP_USER, transporter } from "@/lib/mailer";
import { ANSWER_LABELS, QUESTIONS, scoreAnswers, type Answers } from "@/lib/readiness";
import { SITE_URL } from "@/lib/seo";
import { ensureTablesExist, turso } from "@/lib/turso";

const text = (max: number) => z.string().trim().max(max).optional().default("");
const answer = z.union([z.literal(0), z.literal(1), z.literal(2)]);

const schema = z.object({
  id: z.string().min(8).max(64),
  answers: z.object(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, answer])) as Record<
      (typeof QUESTIONS)[number]["id"],
      typeof answer
    >,
  ),
  email: z.string().trim().email().max(200).optional(),
  name: text(100),
  company: text(150),
  role: text(100),
  utm_source: text(100),
  utm_medium: text(100),
  utm_campaign: text(100),
});

/** Visitor report emails per IP per hour, so the form can't be used to spam addresses. */
const REPORTS_PER_IP_PER_HOUR = 3;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function reportHtml(name: string, answers: Answers) {
  const { score, tier, gaps } = scoreAnswers(answers);
  const rows = QUESTIONS.map(
    (q) =>
      `<tr><td style="padding:6px 0;color:#334155">${q.area}</td><td style="padding:6px 0;text-align:right;font-weight:600;color:${
        answers[q.id] === 2 ? "#0f766e" : answers[q.id] === 1 ? "#b45309" : "#be123c"
      }">${ANSWER_LABELS[answers[q.id] ?? 0]}</td></tr>`,
  ).join("");
  const steps = gaps
    .slice(0, 3)
    .map((q) => `<li style="margin:0 0 10px"><strong>${q.area}:</strong> ${q.recommendation}</li>`)
    .join("");
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
    <p>Hi ${escapeHtml(name || "there")},</p>
    <p>Here is your AI governance readiness report from ReguLattice.</p>
    <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:12px;padding:20px;margin:20px 0">
      <div style="font-size:40px;font-weight:700;color:#0f766e">${score}/100</div>
      <div style="font-size:18px;font-weight:600;margin-top:4px">${tier.name}</div>
      <p style="color:#334155;margin:8px 0 0">${tier.summary}</p>
    </div>
    <h3 style="margin:24px 0 8px">Your answers</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    ${
      steps
        ? `<h3 style="margin:24px 0 8px">Where to start</h3><ol style="padding-left:20px;color:#334155;font-size:14px">${steps}</ol>`
        : ""
    }
    <p style="margin-top:24px">Want to see how ReguLattice finds the AI already in use and keeps it governed?
      <a href="${SITE_URL}/#watch" style="color:#0f766e">Watch the 78-second demo</a> or
      <a href="${SITE_URL}/#demo" style="color:#0f766e">book a 20-minute demo</a>. You can also just reply to this email.</p>
    <p style="color:#64748b;font-size:12px;margin-top:32px">You asked for this report at ${SITE_URL}/ai-governance-readiness. Reply "unsubscribe" and we won't email you again.</p>
  </div>`;
}

export const Route = createFileRoute("/api/public/readiness")({
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
        const answers = d.answers as Answers;
        const { score, tier } = scoreAnswers(answers);
        const ip = extractClientIp(request.headers);
        const country = request.headers.get("x-vercel-ip-country") || "Unknown";
        const now = new Date().toISOString();

        try {
          await ensureTablesExist();
          await turso.execute({
            sql: `INSERT INTO readiness_assessments (id, ip_address, answers, score, tier, email, name, company, role, utm_source, utm_medium, utm_campaign, country, created_at, updated_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET
                    answers = excluded.answers, score = excluded.score, tier = excluded.tier,
                    email = COALESCE(NULLIF(excluded.email, ''), email),
                    name = COALESCE(NULLIF(excluded.name, ''), name),
                    company = COALESCE(NULLIF(excluded.company, ''), company),
                    role = COALESCE(NULLIF(excluded.role, ''), role),
                    updated_at = excluded.updated_at`,
            args: [
              d.id,
              ip,
              JSON.stringify(answers),
              score,
              tier.name,
              d.email ?? "",
              d.name,
              d.company,
              d.role,
              d.utm_source,
              d.utm_medium,
              d.utm_campaign,
              country,
              now,
              now,
            ],
          });
        } catch (error) {
          console.error("[readiness] Error writing to Turso DB:", error);
          return json({ ok: false }, 500);
        }

        if (!d.email) return json({ ok: true, score, tier: tier.name });
        if (!transporter) {
          console.warn("[readiness] SMTP_USER / SMTP_PASS not set; lead saved, no email sent.");
          return json({ ok: true, score, tier: tier.name, reportSent: false });
        }

        // A lead: tell the team, and send the visitor their report (rate-limited per IP).
        const lead = `${d.name || "Someone"}${d.company ? ` (${d.company})` : ""}`;
        try {
          await transporter.sendMail({
            from: `"ReguLattice Website" <${SMTP_USER}>`,
            to: LEAD_NOTIFY_TO,
            replyTo: d.email,
            subject: `[ReguLattice Lead] Readiness check: ${lead} scored ${score}/100`,
            text: [
              `New readiness-check lead`,
              `Name: ${d.name || "-"}`,
              `Email: ${d.email}`,
              `Company: ${d.company || "-"}`,
              `Role: ${d.role || "-"}`,
              `Score: ${score}/100 (${tier.name})`,
              `Source: ${d.utm_source || "direct"} ${d.utm_campaign ? `/ ${d.utm_campaign}` : ""}`,
              `Country: ${country}`,
              ``,
              ...QUESTIONS.map((q) => `${q.area}: ${ANSWER_LABELS[answers[q.id] ?? 0]}`),
            ].join("\n"),
          });
        } catch (error) {
          console.error("[readiness] Error sending lead notification:", error);
        }

        try {
          const recent = await turso.execute({
            sql: "SELECT COUNT(*) AS n FROM readiness_assessments WHERE ip_address = ? AND report_sent = 1 AND updated_at > ?",
            args: [ip, new Date(Date.now() - 60 * 60 * 1000).toISOString()],
          });
          if (Number(recent.rows[0]?.["n"] ?? 0) >= REPORTS_PER_IP_PER_HOUR) {
            return json({ ok: true, score, tier: tier.name, reportSent: false });
          }
          await transporter.sendMail({
            from: `"ReguLattice" <${SMTP_USER}>`,
            to: d.email,
            replyTo: LEAD_NOTIFY_TO,
            subject: `Your AI governance readiness report: ${score}/100 (${tier.name})`,
            html: reportHtml(d.name, answers),
          });
          await turso.execute({
            sql: "UPDATE readiness_assessments SET report_sent = 1 WHERE id = ?",
            args: [d.id],
          });
          return json({ ok: true, score, tier: tier.name, reportSent: true });
        } catch (error) {
          console.error("[readiness] Error sending report:", error);
          return json({ ok: true, score, tier: tier.name, reportSent: false });
        }
      },
    },
  },
});
