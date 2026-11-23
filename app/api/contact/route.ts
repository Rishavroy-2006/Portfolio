import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message content cannot be empty" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // If Resend API Key is configured in Cloudflare / Vercel Secrets
    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "rishavroy2006@gmail.com",
            replyTo: email,
            subject: `Portfolio Message from ${name.trim()}`,
            html: `
              <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; color: #1e293b;">
                <h2 style="color: #0284c7; margin-bottom: 16px;">New Portfolio Inquiry</h2>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 16px 0;">
                  <p style="margin: 0 0 10px 0;"><strong>Sender Name:</strong> ${name.trim()}</p>
                  <p style="margin: 0 0 16px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0284c7;">${email}</a></p>
                  <p style="margin: 0 0 6px 0;"><strong>Message:</strong></p>
                  <div style="white-space: pre-wrap; background: #ffffff; border: 1px solid #cbd5e1; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.6;">${message.trim()}</div>
                </div>
                <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Sent via Rishav Roy's developer portfolio.</p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errData = await response.text();
          console.error("Resend API returned non-ok status:", errData);
          throw new Error("Resend delivery failed");
        }

        return NextResponse.json(
          { success: true, message: "Your message has been sent successfully. I'll get back to you soon!" },
          { status: 200 }
        );
      } catch (err) {
        console.error("Resend error:", err);
        return NextResponse.json(
          {
            success: true,
            message: "Message received! If urgent, feel free to email directly at rishavroy2006@gmail.com.",
            fallback: true,
          },
          { status: 200 }
        );
      }
    }

    // Graceful fallback when RESEND_API_KEY is not yet bound in Cloudflare Secrets
    console.log("Contact submission received (RESEND_API_KEY not configured):", {
      name,
      email,
      messageLength: message.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message was received. You can also reach me directly at rishavroy2006@gmail.com.",
        fallback: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message. Please email rishavroy2006@gmail.com directly." },
      { status: 500 }
    );
  }
}
