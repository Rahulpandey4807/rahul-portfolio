import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { personal } from "@/data/portfolio-data";

// ---------------------------------------------------------------------------
// Contact form → API route → Resend → personal.email
// No secrets ever touch the client. RESEND_API_KEY lives only in the
// server-side environment (see .env.example / README).
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(200),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  // Honeypot field: real visitors never populate this.
  company: z.string().max(0).optional().or(z.literal("")),
});

// Very small in-memory rate limiter. Good enough for a low-traffic personal
// site on a single long-lived server; for serverless/multi-instance
// deployments swap this for a shared store (e.g. Upstash Redis) — see README.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    // Honeypot triggered: pretend success, do nothing.
    if (parsed.data.company) {
      return NextResponse.json({ success: true });
    }

    const { name, email, subject, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || personal.email;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Submitted: ${submittedAt} (IST)</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 }
    );
  }
}
