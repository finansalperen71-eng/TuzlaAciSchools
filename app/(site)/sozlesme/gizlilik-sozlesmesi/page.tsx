import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gizlilik Sözleşmesi",
  description: "Gizlilik sözleşmesi.",
  path: "/sozlesme/gizlilik-sozlesmesi",
  noIndex: true,
});

export default function GizlilikPage() {
  return (
    <ComingSoon
      eyebrow="Yasal"
      title="Gizlilik Sözleşmesi"
      description="Gizlilik sözleşmemiz kurumumuz tarafından hazırlanmaktadır ve yayına alınana kadar bu sayfa güncellenecektir."
    />
  );
}
