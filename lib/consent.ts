export const CONSENT_COOKIE = "aci_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

export type ConsentValue = "accepted" | "declined";

export function isConsentValue(value: string | undefined): value is ConsentValue {
  return value === "accepted" || value === "declined";
}

// Yalnızca istemcide çalışır — document.cookie parse eder.
export function readConsentCookie(): ConsentValue | "unset" {
  if (typeof document === "undefined") return "unset";

  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : undefined;

  return isConsentValue(value) ? value : "unset";
}
