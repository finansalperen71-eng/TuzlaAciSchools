import nodemailer from "nodemailer";
import { site } from "@/content/site";

// SMTP bilgileri .env üzerinden sağlanır (bkz. .env.example). Değişkenler
// tanımlı değilse form API route'ları 500 döner ve neden'i loglar.
export function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP ortam değişkenleri eksik: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS gereklidir.",
    );
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

export function getContactRecipient() {
  return process.env.CONTACT_EMAIL || site.email;
}
