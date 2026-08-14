import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kadromuz",
  description: "Tuzla Açı Koleji yönetim ve öğretmen kadrosu.",
  path: "/kadromuz",
  noIndex: true,
});

export default function KadromuzPage() {
  return (
    <ComingSoon
      eyebrow="Kurumsal"
      title="Kadromuz"
      description="Yönetim ve öğretmen kadromuz hazırlanıyor ve yakında bu sayfada yer alacak."
      action={{ href: "/hakkimizda", label: "Hakkımızda Sayfasına Git" }}
    />
  );
}
