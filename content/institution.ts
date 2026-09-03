export type TimelineEntry = { year: string; description: string };

// TODO: Gerçek tarihçe bilgileri (kuruluş yılı, önemli kilometre taşları)
// kurumdan sağlandığında bu dizi doldurulacak. Somut tarih/olay icat
// edilmedi — gerçek bir kurum hakkında yanlış bilgi yayınlamamak için.
export const timeline: TimelineEntry[] = [];

export type StaffGroup = "yonetim" | "anaokulu" | "ilkokul" | "ortaokul";

export const STAFF_GROUP_ORDER: StaffGroup[] = ["yonetim", "anaokulu", "ilkokul", "ortaokul"];

export const STAFF_GROUP_LABEL: Record<StaffGroup, string> = {
  yonetim: "Yönetim",
  anaokulu: "Anaokulu",
  ilkokul: "İlkokul",
  ortaokul: "Ortaokul",
};

export type StaffMember = {
  /** Fotoğraf dosya adı (public/images/kadro/<slug>.*) ve React key. Türkçe
      İ/ı toLowerCase() güvenli olmadığı için isimden otomatik türetilmiyor,
      elle yazılıyor. */
  slug: string;
  name: string;
  /** "Sınıf Öğretmeni", "Matematik", "İngilizce" — kartta isim altında görünen satır. */
  branch: string;
  group: StaffGroup;
};

// TODO: Yönetim ve öğretmen kadrosu bilgileri (isim, unvan/branş, fotoğraf)
// kurumdan sağlandığında bu dizi doldurulacak. Somut isim icat edilmedi —
// gerçek bir kurumun canlı sitesinde uydurma kadro bilgisi yayınlamamak için.
//
// Doldurmak için: aşağıdaki bloğun yorumunu kaldırıp gerçek kadroyla değiştirin.
// Fotoğraf: public/images/kadro/<slug>.jpg (yoksa kart baş harf plakası gösterir).
// Kadro dolunca content/routes.ts'teki "/kadromuz" kaydından noIndex: true
// kaldırılmalı — o bayrak sayfayı bugün sitemap'ten hariç tutuyor.
//
// export const staff: StaffMember[] = [
//   { slug: "ayse-yilmaz", name: "Ayşe Yılmaz", branch: "Okul Müdürü", group: "yonetim" },
//   { slug: "mehmet-demir", name: "Mehmet Demir", branch: "Matematik", group: "ortaokul" },
//   { slug: "elif-kaya", name: "Elif Kaya", branch: "Sınıf Öğretmeni", group: "ilkokul" },
// ];
export const staff: StaffMember[] = [];

export type StaffGroupSection = { group: StaffGroup; members: StaffMember[] };

/**
 * Kadroyu content/levels.ts'teki getLevel() kalıbını izleyerek gruplar.
 * Yalnızca en az bir üyesi olan grupları döner — ör. yönetim henüz
 * girilmediyse o bölüm sayfada hiç basılmaz, boş başlık kalmaz.
 */
export function getStaffByGroup(): StaffGroupSection[] {
  return STAFF_GROUP_ORDER.map((group) => ({
    group,
    members: staff.filter((member) => member.group === group),
  })).filter((section) => section.members.length > 0);
}
