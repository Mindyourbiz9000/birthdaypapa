import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, menuSelections } = body;

    if (!guestName || !menuSelections) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const menuHtml = Object.entries(menuSelections)
      .map(([meal, choice]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">${meal}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${choice}</td></tr>`)
      .join("");

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#5a6e3a;">🎂 Mes 70 Printemps — Sélection de Menu</h2>
        <p><strong>Invité(e) :</strong> ${guestName}</p>
        <h3 style="color:#6b4c2a;">Sélections du menu :</h3>
        <table style="width:100%;border-collapse:collapse;margin-top:12px;">
          ${menuHtml}
        </table>
        <p style="margin-top:20px;color:#888;font-size:0.85rem;">Envoyé depuis le site Mes 70 Printemps</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "thomas.barvaux@gmail.com",
      subject: `Menu — ${guestName} — Mes 70 Printemps`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
