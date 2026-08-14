import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONSENT_COOKIE, isConsentValue } from "@/lib/consent";

// Çerez tercihini okuyup sunucu bileşenlerine header olarak iletir.
// Böylece analitik script'i istemci tarafında bir "flash" olmadan
// doğru karar ile render edilir.
export function middleware(request: NextRequest) {
  const consentCookie = request.cookies.get(CONSENT_COOKIE)?.value;
  const consent = isConsentValue(consentCookie) ? consentCookie : "unset";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-aci-consent", consent);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
