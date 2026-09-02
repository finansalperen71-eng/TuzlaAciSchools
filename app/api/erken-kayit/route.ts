import { NextResponse } from "next/server";
import { assertJsonRequest, assertSameOrigin, readJsonBody, tooManyRequests } from "@/lib/apiGuards";
import { applicationGradeOptions, earlyRegistrationSchema } from "@/lib/formSchemas";
import { getContactRecipient, getTransport } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const guard = assertJsonRequest(request) ?? assertSameOrigin(request);
  if (guard) return guard;

  const { allowed, retryAfter } = checkRateLimit(`erken-kayit:${getClientIp(request)}`);
  if (!allowed) return tooManyRequests(retryAfter);

  const { body, error } = await readJsonBody(request);
  if (error) return error;

  const parsed = earlyRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const { studentName, parentName, phone, email, grade, website } = parsed.data;

  if (website) return NextResponse.json({ ok: true });

  const gradeLabel = applicationGradeOptions.find((option) => option.value === grade)?.label ?? grade;

  try {
    const transport = getTransport();
    await transport.sendMail({
      from: `"${site.name} Web Sitesi" <${process.env.SMTP_USER}>`,
      to: getContactRecipient(),
      replyTo: email || undefined,
      subject: `Erken Kayıt Başvurusu — ${studentName}`,
      text: `Öğrenci Adı Soyadı: ${studentName}\nVeli Adı Soyadı: ${parentName}\nTelefon: ${phone}\nE-posta: ${email || "-"}\nBaşvuru Yapılacak Sınıf: ${gradeLabel}`,
    });
  } catch (error) {
    console.error("Erken kayıt formu e-posta gönderim hatası:", error);
    return NextResponse.json(
      { error: "Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
