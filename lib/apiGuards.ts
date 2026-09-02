import { NextResponse } from "next/server";
import { site } from "@/content/site";

// Form API route'larının paylaştığı ön kontroller. Her yardımcı, istek
// uygunsa null döner; uygun değilse hazır bir NextResponse döner ve route
// onu doğrudan return eder.

// Gövde üst sınırı: en uzun form alanı 5.000 karakter (message), diğer
// alanlarla birlikte JSON kaçışları dahil 20 KB fazlasıyla yeterli.
const MAX_BODY_BYTES = 20_000;

function allowedOrigins(): string[] {
  const origins: string[] = [site.url];

  // Geliştirme sırasında localhost'tan gelen isteklere izin ver.
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:3000", "http://127.0.0.1:3000");
  }

  // Vercel preview deployment'ları site.url'den farklı bir host'ta çalışır.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) origins.push(`https://${vercelUrl}`);

  return origins;
}

// Content-Type zorlaması, cross-site "simple request" CSRF hilesini kapatır:
// <form enctype="text/plain"> ile başka bir siteden geçerli JSON gövdesi
// üretilebiliyor ve preflight tetiklenmiyor. application/json şartı bunu
// preflight gerektiren bir isteğe dönüştürür.
export function assertJsonRequest(request: Request): NextResponse | null {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Geçersiz istek biçimi." },
      { status: 415 },
    );
  }

  return null;
}

// Tarayıcılar POST isteklerinde Origin başlığını her zaman gönderir.
// Başlık yoksa veya izinli listede değilse isteği reddediyoruz.
export function assertSameOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");

  if (!origin || !allowedOrigins().includes(origin)) {
    return NextResponse.json(
      { error: "Bu istek reddedildi." },
      { status: 403 },
    );
  }

  return null;
}

type BodyResult =
  | { body: unknown; error: null }
  | { body: null; error: NextResponse };

// request.json() gövdeyi sınırsız okur. Önce metin olarak alıp boyutu
// ölçüyoruz — böylece devasa payload'lar parse edilmeden reddedilir.
export async function readJsonBody(
  request: Request,
  maxBytes = MAX_BODY_BYTES,
): Promise<BodyResult> {
  let raw: string;

  try {
    raw = await request.text();
  } catch {
    return {
      body: null,
      error: NextResponse.json({ error: "İstek gövdesi okunamadı." }, { status: 400 }),
    };
  }

  if (Buffer.byteLength(raw, "utf8") > maxBytes) {
    return {
      body: null,
      error: NextResponse.json(
        { error: "Gönderdiğiniz içerik çok uzun. Lütfen kısaltın." },
        { status: 413 },
      ),
    };
  }

  try {
    return { body: JSON.parse(raw), error: null };
  } catch {
    return {
      body: null,
      error: NextResponse.json({ error: "Geçersiz form verisi." }, { status: 400 }),
    };
  }
}

export function tooManyRequests(retryAfter: number): NextResponse {
  return NextResponse.json(
    { error: "Çok fazla deneme yaptınız. Lütfen birazdan tekrar deneyin." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
