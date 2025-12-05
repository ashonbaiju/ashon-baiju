import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY || "";
const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ If you haven't set up Resend env vars yet, don't crash – just log and pretend success
    if (!resendKey || !recipient) {
      console.warn(
        "RESEND_API_KEY or CONTACT_RECIPIENT_EMAIL not set. Skipping email send. (Dev mode)"
      );
      console.log("Contact form data:", { name, email, message });
      return NextResponse.json({ success: true, skippedEmail: true });
    }

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipient,
      reply_to: email,
      subject: `New message from ${name}`,
      text: `
New contact form message:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error (server):", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
