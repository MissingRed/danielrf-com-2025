import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ success: false, error: "Email requerido" }, { status: 400 });
  }

  // Configura el transporter de nodemailer para Gmail igual que send-message
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rodriguezdaniel048@gmail.com", // Tu correo
      pass: process.env.GMAIL_APP_PASSWORD, // Usa una contraseña de aplicación
    },
  });

  // Ruta al archivo de la hoja de vida (ajusta la ruta y nombre)
  const cvPath = path.join(process.cwd(), "public", "cv.pdf");
  let cvBuffer;
  try {
    cvBuffer = fs.readFileSync(cvPath);
  } catch (e) {
    return NextResponse.json({ success: false, error: "No se encontró la hoja de vida" }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: 'rodriguezdaniel048@gmail.com',
      to: email,
      cc: 'rodriguezdaniel048@gmail.com',
      subject: 'Hola!, aquí está la hoja de vida de Daniel Rodríguez',
      text: 'Gracias por tu interés. Adjunto encontrarás la hoja de vida de Daniel Rodríguez.',
      attachments: [
        {
          filename: 'Hoja-de-vida-Daniel.pdf',
          content: cvBuffer,
        },
      ],
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMsg });
  }
}
