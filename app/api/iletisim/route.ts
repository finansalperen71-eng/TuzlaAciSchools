import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/formSchemas";
import { getContactRecipient, getTransport } from "@/lib/mailer";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const { name, phone, email, message } = parsed.data;

  try {
    const transport = getTransport();
    await transport.sendMail({
      from: `"${site.name} Web Sitesi" <${process.env.SMTP_USER}>`,
      to: getContactRecipient(),
      replyTo: email,
      subject: `İletişim Formu — ${name}`,
      text: `Ad Soyad: ${name}\nTelefon: ${phone}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    });
  } catch (error) {
    console.error("İletişim formu e-posta gönderim hatası:", error);
    return NextResponse.json(
      { error: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
