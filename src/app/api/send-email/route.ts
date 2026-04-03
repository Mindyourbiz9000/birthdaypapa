import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, menuSelections } = body;

    if (!guestName || !menuSelections) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const menuRows = Object.entries(menuSelections)
      .map(([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:bold;color:#5a6e3a;width:35%;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#3b2f1e;">${value}</td>
        </tr>`)
      .join("");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Mes 70 Printemps" <${process.env.GMAIL_USER}>`,
      to: ["thomas.barvaux@gmail.com", "barvaux.despontin@gmail.com"],
      subject: `Menu — ${guestName} — Mes 70 Printemps`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:24px;background:#fefcf3;">
          <div style="background:#5a6e3a;color:white;padding:20px 24px;border-radius:10px 10px 0 0;text-align:center;">
            <h2 style="margin:0;font-size:1.4rem;">🎂 Mes 70 Printemps</h2>
            <p style="margin:6px 0 0;opacity:0.8;font-size:0.9rem;">Sélection de menu — Vendredi 15 mai 2026</p>
          </div>
          <div style="background:white;padding:24px;border-radius:0 0 10px 10px;border:1px solid #e0d8c4;">
            <p style="color:#5a4a3a;margin-bottom:16px;"><strong>Invité(e) :</strong> ${guestName}</p>
            <table style="width:100%;border-collapse:collapse;">
              ${menuRows}
            </table>
          </div>
          <p style="text-align:center;color:#aaa;font-size:0.8rem;margin-top:16px;">Envoyé depuis le site Mes 70 Printemps</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
