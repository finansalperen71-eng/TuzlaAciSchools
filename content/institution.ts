export type TimelineEntry = { year: string; description: string };

// TODO: Gerçek tarihçe bilgileri (kuruluş yılı, önemli kilometre taşları)
// kurumdan sağlandığında bu dizi doldurulacak. Somut tarih/olay icat
// edilmedi — gerçek bir kurum hakkında yanlış bilgi yayınlamamak için.
export const timeline: TimelineEntry[] = [];

// "brans": tek bir kademeye bağlı olmayan branş öğretmenleri (bölüm
// başkanları, beden eğitimi vb.).
export type StaffGroup = "yonetim" | "anaokulu" | "ilkokul" | "ortaokul" | "brans";

export const STAFF_GROUP_ORDER: StaffGroup[] = [
  "yonetim",
  "anaokulu",
  "ilkokul",
  "ortaokul",
  "brans",
];

export const STAFF_GROUP_LABEL: Record<StaffGroup, string> = {
  yonetim: "Yönetim",
  anaokulu: "Anaokulu",
  ilkokul: "İlkokul",
  ortaokul: "Ortaokul",
  brans: "Branş Öğretmenleri",
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

// TODO: Kadronun geri kalanı kurumdan geldikçe eklenecek. Somut isim icat
// edilmedi — gerçek bir kurumun canlı sitesinde uydurma kadro bilgisi
// yayınlamamak için; aşağıdakilerin hepsi kurumdan geldi.
//
// Fotoğraf: public/images/kadro/<slug>.jpg (yoksa kart baş harf plakası gösterir).
// Mevcut fotoğraflar aynı kurala göre kırpıldı (baş kadraj yüksekliğinin
// ~%30'u, başın üstü tepeden ~%12 aşağıda, yüz ortada) — yenileri de öyle
// olmalı ki ızgarada yüzler aynı boyda dursun.
// Kadro dolunca content/routes.ts'teki "/kadromuz" kaydından noIndex: true
// kaldırılmalı — o bayrak sayfayı bugün sitemap'ten hariç tutuyor.
export const staff: StaffMember[] = [
  { slug: "esma-akdemir", name: "Esma Akdemir", branch: "Okul Müdürü", group: "yonetim" },
  {
    slug: "sevilay-pala-arslan",
    name: "Sevilay Pala Arslan",
    branch: "İlkokul Öğretmeni",
    group: "ilkokul",
  },
  {
    slug: "muhammed-kusci",
    name: "Muhammed Kuşçi",
    branch: "İlkokul Öğretmeni",
    group: "ilkokul",
  },
  {
    slug: "selin-uyar-halici",
    name: "Selin Uyar Halıcı",
    branch: "Psikolojik Danışman / Rehber Öğretmen (Anaokulu-İlkokul)",
    group: "ilkokul",
  },
  {
    slug: "ayse-eski",
    name: "Ayşe Eski",
    branch: "Fen Bilimleri Öğretmeni",
    group: "ortaokul",
  },
  {
    slug: "omer-aslan",
    name: "Ömer Aslan",
    branch: "Sosyal Bilgiler ve İnkılap Tarihi Öğretmeni",
    group: "ortaokul",
  },
  {
    slug: "seden-filiz",
    name: "Seden Filiz",
    branch: "Türkçe Öğretmeni",
    group: "ortaokul",
  },
  {
    slug: "fatmanur-akcay",
    name: "Fatmanur Akçay",
    branch: "Psikolojik Danışman / Rehber Öğretmen",
    group: "ortaokul",
  },
  {
    slug: "betul-terzi",
    name: "Betül Terzi",
    branch: "Yabancı Diller Bölüm Başkanı / İngilizce Öğretmeni",
    group: "brans",
  },
  { slug: "oznur-irin", name: "Öznur İrin", branch: "Beden Eğitimi Öğretmeni", group: "brans" },
];

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
