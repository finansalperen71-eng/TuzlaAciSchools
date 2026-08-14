import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad gerekli."),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  message: z.string().trim().min(10, "Mesajınızı biraz daha detaylandırın."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "KVKK Aydınlatma Metni'ni onaylamanız gerekiyor." }),
  }),
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
  studentName: z.string().trim().min(2, "Öğrenci adı soyadı gerekli."),
  parentName: z.string().trim().min(2, "Veli adı soyadı gerekli."),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin."),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta adresi girin.")
    .optional()
    .or(z.literal("")),
  grade: z.enum(
    ["anaokulu", "1", "2", "3", "4", "5", "6", "7", "8"],
    { errorMap: () => ({ message: "Başvuru yapılacak sınıfı seçin." }) },
  ),
  consent: z.literal(true, {
    errorMap: () => ({ message: "KVKK Aydınlatma Metni'ni onaylamanız gerekiyor." }),
  }),
});

export type EarlyRegistrationValues = z.infer<typeof earlyRegistrationSchema>;

export const careerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad gerekli."),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin."),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  position: z.string().trim().min(2, "Başvurduğunuz branş/pozisyon gerekli."),
  message: z.string().trim().min(10, "Kendinizden kısaca bahsedin."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "KVKK Aydınlatma Metni'ni onaylamanız gerekiyor." }),
  }),
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
