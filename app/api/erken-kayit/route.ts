import { NextResponse } from "next/server";
import { applicationGradeOptions, earlyRegistrationSchema } from "@/lib/formSchemas";
import { getContactRecipient, getTransport } from "@/lib/mailer";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = earlyRegistrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." },
      { status: 400 },
    );
  }

  const { studentName, parentName, phone, email, grade } = parsed.data;
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
