export type AdmissionStep = {
  title: string;
  description: string;
};

// TODO: Adımların sırası/içeriği kurumun gerçek kayıt süreciyle
// karşılaştırılıp doğrulanmalı — aşağıdaki metin genel bir okul kayıt
// akışını yansıtır, kuruma özgü ayrıntılar (evrak listesi, tarihler)
// henüz eklenmedi.
export const admissionSteps: AdmissionStep[] = [
  {
    title: "Ön Başvuru",
    description:
      "Erken kayıt formunu doldurarak öğrenci ve veli bilgilerinizi iletin. Ekibimiz en kısa sürede sizinle iletişime geçer.",
  },
  {
    title: "Tanışma Görüşmesi",
    description:
      "Kampüsümüzde veya çevrimiçi bir görüşmeyle öğrencimizi ve ailesini tanır, eğitim programlarımız hakkında bilgi veririz.",
  },
  {
    title: "Evrak Teslimi",
    description:
      "Kayıt için gerekli belgeler (kimlik fotokopisi, öğrenci belgesi, fotoğraf vb.) okul idaresine iletilir.",
  },
  {
    title: "Kayıt Onayı",
    description:
      "Evrakların kontrolünün ardından kayıt işlemi tamamlanır ve öğrencimiz Açı Koleji ailesine katılır.",
  },
];
