# Tuzla Açı Koleji Web Sitesi

Bu proje, Tuzla Açı Koleji'nin tanıtım sitesi. Anaokulu, ilkokul ve ortaokul kademeleri hakkında bilgi veriyor; kayıt, iş başvurusu ve iletişim formlarını topluyor, blog yazılarını yayınlıyor.

## Amaç

Site şunları yapıyor:

- Okulu, kademeleri ve ekibi tanıtıyor (anaokulu, ilkokul, ortaokul, kadromuz, tarihçe, başarılarımız gibi sayfalar).
- Veli ve öğretmen adaylarından form topluyor: erken kayıt, iletişim, iş başvurusu. Bu formlar doldurulunca e-posta olarak gönderiliyor.
- Eğitimle ilgili blog yazıları yayınlıyor.
- Fotoğraf ve video galerisi gösteriyor.
- KVKK, gizlilik ve çerez politikası gibi yasal metinleri barındırıyor.

## Kullanılan Teknolojiler

- **Next.js 15** (App Router) — sitenin iskeleti
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** — tasarım
- **MDX** (`next-mdx-remote`, `gray-matter`) — blog yazıları `content/blog` klasöründe `.mdx` dosyaları olarak tutuluyor
- **Nodemailer** — form gönderimlerini e-posta olarak iletmek için
- **Zod** — form verilerini doğrulamak için

## Proje Yapısı

- `app/` — sayfalar ve API route'ları (Next.js App Router)
- `components/` — tekrar kullanılan arayüz parçaları (header, footer, formlar, butonlar vb.)
- `content/` — sitedeki metinler, ayarlar ve blog yazıları
- `lib/` — yardımcı fonksiyonlar (mail gönderme, SEO, çerez onayı vb.)
- `public/` — resimler, videolar, statik dosyalar

## Yerelde Çalıştırma

Gereksinim: Node.js kurulu olmalı.

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

## Ortam Değişkenleri

Formların e-posta gönderebilmesi için `.env` dosyası oluşturup `.env.example` dosyasındaki alanları doldurman gerekiyor:

```
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=
NEXT_PUBLIC_GA_ID=
```

- `SMTP_*` alanları form e-postalarının gönderileceği posta sunucusu bilgileri.
- `CONTACT_EMAIL` boş bırakılırsa formlar `content/site.ts` içindeki `site.email` adresine gider.
- `NEXT_PUBLIC_GA_ID` isteğe bağlı; Google Analytics kullanılacaksa ve ziyaretçi çerezleri kabul ederse devreye girer.

## Deploy

Proje standart bir Next.js uygulaması, bu yüzden en kolay yol **Vercel**:

1. Repoyu Vercel'e bağla.
2. Yukarıdaki ortam değişkenlerini Vercel proje ayarlarından gir.
3. Vercel `main` branch'ine her push'ta otomatik build alıp yayınlar.

Kendi sunucunda çalıştırmak istersen:

```bash
npm install
npm run build
npm run start
```

`npm run build` derlemeyi yapar, `npm run start` üretim (production) sunucusunu ayağa kaldırır.

## Notlar

- İçerik metinlerinin çoğu (okul bilgileri, menüler, kademeler) `content/` klasöründeki `.ts` dosyalarında düz veri olarak tutuluyor. Metin değiştirmek için kod bilmeye gerek yok, ilgili dosyayı bulup değeri güncellemek yeterli.
- Blog yazısı eklemek için `content/blog/` klasörüne yeni bir `.mdx` dosyası eklemek yeterli.
