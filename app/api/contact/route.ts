import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@villa-kalkan.net";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Villa Kalkan <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot triggered — pretend success so bots don't learn it was rejected.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set, logging submission instead of emailing:", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send email via Resend:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
}
