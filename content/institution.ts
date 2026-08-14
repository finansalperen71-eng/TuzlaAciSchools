export type TimelineEntry = { year: string; description: string };

// TODO: Gerçek tarihçe bilgileri (kuruluş yılı, önemli kilometre taşları)
// kurumdan sağlandığında bu dizi doldurulacak. Somut tarih/olay icat
// edilmedi — gerçek bir kurum hakkında yanlış bilgi yayınlamamak için.
export const timeline: TimelineEntry[] = [];

export type StaffMember = {
  name: string;
  role: string;
  photo?: string;
};

// TODO: Yönetim ve öğretmen kadrosu bilgileri (isim, unvan, fotoğraf)
// kurumdan sağlandığında bu dizi doldurulacak.
export const staff: StaffMember[] = [];
