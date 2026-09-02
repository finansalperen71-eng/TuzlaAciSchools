import { NextResponse } from "next/server";
import { assertJsonRequest, assertSameOrigin, readJsonBody, tooManyRequests } from "@/lib/apiGuards";
import { contactSchema } from "@/lib/formSchemas";
import { getContactRecipient, getTransport } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const guard = assertJsonRequest(request) ?? assertSameOrigin(request);
  if (guard) return guard;

  // Rate limit gövdeyi okumadan önce uygulanır: kötü niyetli isteğin
  // payload'ını hiç işlememiş oluyoruz.
  const { allowed, retryAfter } = checkRateLimit(`iletisim:${getClientIp(request)}`);
  if (!allowed) return tooManyRequests(retryAfter);

  const { body, error } = await readJsonBody(request);
  if (error) return error;

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const { name, phone, email, message, website } = parsed.data;

  // Honeypot doluysa bot: başarılı yanıt dön ama mail gönderme.
  // Farklı bir hata dönmek, bota tuzağın yerini öğretirdi.
  if (website) return NextResponse.json({ ok: true });

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
