import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { message, email, name } = await req.json();

  // Configura el transporter de nodemailer para Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rodriguezdaniel048@gmail.com", // Tu correo
      pass: process.env.GMAIL_APP_PASSWORD, // Usa una contraseña de aplicación
    },
  });

  const mailOptions = {
    from: email || "no-reply@danielrf.com",
    to: "rodriguezdaniel048@gmail.com",
    subject: "Daniel!, Nuevo mensaje desde tú chat IA del portafolio",
    text:
      `Nombre: ${name || "(no proporcionado)"}\n` +
      `Correo: ${email || "(no proporcionado)"}\n` +
      `Mensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
