import { NextResponse } from "next/server";
import { assertJsonRequest, assertSameOrigin, readJsonBody, tooManyRequests } from "@/lib/apiGuards";
import { careerApplicationSchema } from "@/lib/formSchemas";
import { getContactRecipient, getTransport } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const guard = assertJsonRequest(request) ?? assertSameOrigin(request);
  if (guard) return guard;

  const { allowed, retryAfter } = checkRateLimit(`is-basvurusu:${getClientIp(request)}`);
  if (!allowed) return tooManyRequests(retryAfter);

  const { body, error } = await readJsonBody(request);
  if (error) return error;

  const parsed = careerApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const { name, phone, email, position, message, website } = parsed.data;

  if (website) return NextResponse.json({ ok: true });

  try {
    const transport = getTransport();
    await transport.sendMail({
      from: `"${site.name} Web Sitesi" <${process.env.SMTP_USER}>`,
      to: getContactRecipient(),
      replyTo: email,
      subject: `İş Başvurusu — ${name} (${position})`,
      text: `Ad Soyad: ${name}\nTelefon: ${phone}\nE-posta: ${email}\nBaşvurulan Branş/Pozisyon: ${position}\n\nMesaj:\n${message}`,
    });
  } catch (error) {
    console.error("İş başvurusu formu e-posta gönderim hatası:", error);
    return NextResponse.json(
      { error: "Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
