import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ success: false, error: "Email requerido" }, { status: 400 });
  }

  // Configura el transporter de nodemailer para Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rodriguezdaniel048@gmail.com", // Tu correo
      pass: process.env.GMAIL_APP_PASSWORD, // Contraseña de aplicación
    },
  });

  // Ruta al archivo de la hoja de vida
  const cvPath = path.join(process.cwd(), "public", "cv.pdf");
  let cvBuffer;
  try {
    cvBuffer = fs.readFileSync(cvPath);
  } catch (e) {
    return NextResponse.json({ success: false, error: "No se encontró la hoja de vida" }, { status: 500 });
  }

  // Aquí defines la plantilla HTML
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
      <table role="presentation" style="max-width: 600px; margin: auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding: 24px; text-align: center;">
            <h2 style="font-size: 24px; font-weight: bold; margin: 0 0 12px; color: #111827;">
              ¡Hola! 👋
            </h2>
            <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
              Gracias por tu interés en mi perfil profesional.
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
              Te comparto mi hoja de vida en el archivo adjunto.  
              No dudes en escribirme si necesitas más información.  
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              📩 Este correo fue enviado automáticamente. Si tienes dudas, responde a este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: "rodriguezdaniel048@gmail.com",
      to: email,
      cc: "rodriguezdaniel048@gmail.com",
      subject: "Hola!, aquí está la hoja de vida de Daniel Rodríguez",
      html: htmlTemplate, // 👈 usamos HTML en lugar de text
      attachments: [
        {
          filename: "Hoja-de-vida-Daniel.pdf",
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
