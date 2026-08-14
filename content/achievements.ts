export type AchievementStat = {
  value: string;
  label: string;
  year: string;
};

export const achievementStats: AchievementStat[] = [
  { value: "1.", label: "Türkiye Derecesi — YKS", year: "2025" },
  { value: "4.", label: "Türkiye Derecesi — YKS", year: "2025" },
  { value: "7.", label: "Türkiye Derecesi — YKS", year: "2025" },
  { value: "9.", label: "Türkiye Derecesi — YKS", year: "2025" },
  { value: "2.", label: "Türkiye Derecesi — YKS", year: "2023" },
];

export type AccreditationLogo = {
  name: string;
  logoSrc: string;
};

// TODO: Akreditasyon/üyelik logoları sağlanınca doldurulacak.
export const accreditationLogos: AccreditationLogo[] = [];
