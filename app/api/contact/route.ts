import { NextRequest, NextResponse } from "next/server";

// Configure your email service here - using Resend as an example
// You'll need to set RESEND_API_KEY in your environment variables
// Alternatively, use Nodemailer or any email service

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Using Resend service (recommended for Vercel)
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "rishavroy2006@gmail.com",
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #06b6d4;">New Message from Your Portfolio</h2>
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${message}</p>
                </div>
                <p style="color: #6b7280; font-size: 12px;">This email was sent from your portfolio contact form.</p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        return NextResponse.json(
          { success: true, message: "Email sent successfully" },
          { status: 200 }
        );
      } catch (error) {
        console.error("Resend error:", error);
        // Fallback to email-only response if Resend fails
        return NextResponse.json(
          { 
            success: true, 
            message: "Message received. Please email rishavroy2006@gmail.com directly for immediate response.",
            fallback: true
          },
          { status: 200 }
        );
      }
    } else {
      // No email service configured - return success message
      console.log("Contact form submission (no email service configured):", {
        name,
        email,
        message,
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Thank you for your message! Contact email: rishavroy2006@gmail.com",
          fallback: true
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
