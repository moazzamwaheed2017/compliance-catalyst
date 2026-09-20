import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  requestType: z.string().min(1).max(100),
  name: z.string().optional().default("Website Visitor"),
  email: z.string().optional().default("Not provided"),
  company: z.string().optional().default("Not provided"),
  role: z.string().optional().default("Not provided"),
  preferredTime: z.string().optional().default("ASAP"),
  notes: z.string().optional().default(""),
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "moazzam212waheed@gmail.com",
    pass: "xgcn wlnl sjgs hcvv",
  },
});

export const Route = createFileRoute("/api/public/demo-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400 });
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "invalid_input", details: parsed.error }), { status: 400 });
        }

        const { requestType, name, email, company, role, preferredTime, notes } = parsed.data;

        try {
          await transporter.sendMail({
            from: '"ReguLattice AI Guard" <moazzam212waheed@gmail.com>',
            to: "moazzamwaheed@gmail.com",
            subject: `[ReguLattice Website] ${requestType} - ${name !== "Website Visitor" ? name : email}`,
            text: `New Request from ReguLattice Website:

Request Type: ${requestType}
Name: ${name}
Email: ${email}
Company: ${company}
Role: ${role}
Preferred Timeline: ${preferredTime}
Notes: ${notes || "None"}

Timestamp: ${new Date().toLocaleString()}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background-color: #0b132b; color: #ffffff; border-radius: 8px;">
                <h2 style="color: #00f2fe; margin-top: 0;">New ReguLattice Website Request</h2>
                <div style="background-color: #1c2541; padding: 18px; border-radius: 6px; margin: 16px 0; border: 1px solid #3a506b;">
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Request Type:</strong> ${requestType}</p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Name:</strong> ${name}</p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Email:</strong> <a href="mailto:${email}" style="color: #48cae4;">${email}</a></p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Company:</strong> ${company}</p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Role:</strong> ${role}</p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Timeline:</strong> ${preferredTime}</p>
                  <p style="margin: 8px 0;"><strong style="color: #4cc9f0;">Notes:</strong> ${notes || "N/A"}</p>
                </div>
                <p style="font-size: 12px; color: #8d99ae;">Sent from ReguLattice AI Guard Platform • ${new Date().toLocaleString()}</p>
              </div>
            `,
          });
          console.log(`[demo-request] Email sent successfully to moazzamwaheed@gmail.com for type: ${requestType}`);
        } catch (error) {
          console.error("[demo-request] Error sending email via Nodemailer:", error);
          return new Response(
            JSON.stringify({ error: "email_send_failed", details: error instanceof Error ? error.message : String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(JSON.stringify({ ok: true, message: "Email sent successfully to the ReguLattice Team" }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
