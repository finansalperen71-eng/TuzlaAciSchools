import { z } from "zod";

// Ortak alan tanımları. Üst sınırlar sınırsız gövde/alan istismarını,
// satır sonu reddi ise bu değerlerin e-posta konu başlığına interpole
// edilmesinden doğabilecek başlık enjeksiyonunu kapatır (nodemailer
// başlıkları zaten encode ediyor — bu derinlemesine savunma).
const noNewlines = (value: string) => !/[\r\n]/.test(value);

// Etiket parametresi, hata mesajlarının alana özgü kalmasını sağlar
// ("Veli adı soyadı gerekli." gibi).
function personName(label: string) {
  return z
    .string()
    .trim()
    .min(2, `${label} gerekli.`)
    .max(100, `${label} en fazla 100 karakter olabilir.`)
    .refine(noNewlines, `${label} geçersiz karakter içeriyor.`);
}

const phoneNumber = z
  .string()
  .trim()
  .regex(/^[0-9+()\s-]{10,25}$/, "Geçerli bir telefon numarası girin.");

const emailAddress = z
  .string()
  .trim()
  .max(254, "E-posta adresi çok uzun.")
  .email("Geçerli bir e-posta adresi girin.");

function longMessage(message: string) {
  return z
    .string()
    .trim()
    .min(10, message)
    .max(5000, "Mesajınız en fazla 5000 karakter olabilir.");
}

const consentField = z.literal(true, {
  errorMap: () => ({ message: "KVKK Aydınlatma Metni'ni onaylamanız gerekiyor." }),
});

// Honeypot: gerçek kullanıcıya görünmeyen, botların otomatik doldurduğu alan.
// Şema seviyesinde bilerek serbest bırakıldı — dolu gelirse route sessizce
// başarılı yanıt döner ama mail göndermez, böylece bot tuzağı fark etmez.
const honeypot = z.string().max(200).optional();

export const contactSchema = z.object({
  name: personName("Ad soyad"),
  phone: phoneNumber,
  email: emailAddress,
  message: longMessage("Mesajınızı biraz daha detaylandırın."),
  consent: consentField,
  website: honeypot,
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const applicationGradeOptions = [
  { value: "anaokulu", label: "Anaokulu" },
  { value: "1", label: "1. Sınıf" },
  { value: "2", label: "2. Sınıf" },
  { value: "3", label: "3. Sınıf" },
  { value: "4", label: "4. Sınıf" },
  { value: "5", label: "5. Sınıf" },
  { value: "6", label: "6. Sınıf" },
  { value: "7", label: "7. Sınıf" },
  { value: "8", label: "8. Sınıf" },
];

export const earlyRegistrationSchema = z.object({
  studentName: personName("Öğrenci adı soyadı"),
  parentName: personName("Veli adı soyadı"),
  phone: phoneNumber,
  email: emailAddress.optional().or(z.literal("")),
  grade: z.enum(
    ["anaokulu", "1", "2", "3", "4", "5", "6", "7", "8"],
    { errorMap: () => ({ message: "Başvuru yapılacak sınıfı seçin." }) },
  ),
  consent: consentField,
  website: honeypot,
});

export type EarlyRegistrationValues = z.infer<typeof earlyRegistrationSchema>;

export const careerApplicationSchema = z.object({
  name: personName("Ad soyad"),
  phone: phoneNumber,
  email: emailAddress,
  position: personName("Başvurduğunuz branş/pozisyon"),
  message: longMessage("Kendinizden kısaca bahsedin."),
  consent: consentField,
  website: honeypot,
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
