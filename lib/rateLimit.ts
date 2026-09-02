// Basit sabit-pencere (fixed window) rate limit sayacı.
//
// State modül seviyesinde tutulur: aynı sunucu/lambda instance'ı ayakta
// kaldığı sürece korunur, soğuk başlangıçta sıfırlanır. Vercel'de birden
// fazla instance çalışabileceği için gerçek sınır teorik olarak
// (instance sayısı × limit) olur — bu bilinçli bir ödün. Amaç dağıtık
// kesin sayım değil, tek bir IP'nin dakikalar içinde yüzlerce mail
// tetiklemesini engellemek. Daha katı bir garanti gerekirse Vercel
// Firewall veya harici bir sayaç (Upstash vb.) bunun üstüne konur.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_BUCKETS = 1000;

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  // Süresi dolmamış kayıtlar hâlâ sınırı aşıyorsa (yoğun saldırı altında)
  // en eskiden başlayarak kırp — sınırsız bellek büyümesini önler.
  if (buckets.size > MAX_BUCKETS) {
    const excess = buckets.size - MAX_BUCKETS;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++removed >= excess) break;
    }
  }
}

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60_000,
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfter: 0 };
}

// App Router'daki Request nesnesinde .ip yok; proxy başlıklarından çözüyoruz.
// Vercel ve çoğu reverse proxy x-forwarded-for gönderir.
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
