"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      website: data.get("website") ?? "",
    };

    try {
      const response = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? "Mesajınız gönderilemedi.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-chalk p-8">
        <p className="font-body text-base text-ink">
          Mesajınız için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Honeypot: ekran okuyuculardan ve klavye sırasından gizli, gerçek
          kullanıcı görmez. Botlar otomatik doldurur; sunucu bu alan doluysa
          maili sessizce atmaz. display:none yerine ekran dışına taşındı —
          bazı botlar display:none alanları atlar. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <Input label="Ad Soyad" name="name" required />
      <Input label="Telefon" name="phone" type="tel" required />
      <Input label="E-posta" name="email" type="email" required />
      <Textarea label="Mesajınız" name="message" required />
      <Checkbox
        name="consent"
        required
        label={
          <>
            <Link
              href="/sozlesme/kvkk-aydinlatma-metni"
              className="underline underline-offset-2 hover:text-signal-deep"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, kabul ediyorum.
          </>
        }
      />
      {status === "error" ? (
        <p className="text-sm text-signal-deep" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Gönderiliyor..." : "Gönder"}
      </Button>
    </form>
  );
}
