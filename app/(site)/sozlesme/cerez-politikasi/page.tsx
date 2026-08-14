import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Çerez Politikası",
  description: "Çerez politikası.",
  path: "/sozlesme/cerez-politikasi",
  noIndex: true,
});

export default function CerezPolitikasiPage() {
  return (
    <ComingSoon
      eyebrow="Yasal"
      title="Çerez Politikası"
      description="Çerez politikamız kurumumuz tarafından hazırlanmaktadır ve yayına alınana kadar bu sayfa güncellenecektir."
    />
  );
}
