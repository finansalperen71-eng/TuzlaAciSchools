"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { applicationGradeOptions } from "@/lib/formSchemas";

type Status = "idle" | "submitting" | "success" | "error";

export function ErkenKayitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      studentName: data.get("studentName"),
      parentName: data.get("parentName"),
      phone: data.get("phone"),
      email: data.get("email"),
      grade: data.get("grade"),
      consent: data.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/erken-kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? "Başvurunuz gönderilemedi.");
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
          Başvurunuz için teşekkür ederiz. Ekibimiz belirttiğiniz telefon numarası üzerinden en
          kısa sürede sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <p className="text-sm text-slate">
        Formu göndermeden önce lütfen telefon numaranızı kontrol edin. Erken kayıt
        bilgilendirmesi bu numara üzerinden yapılacaktır.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Öğrenci Adı Soyadı" name="studentName" required />
        <Input label="Veli Adı Soyadı" name="parentName" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Telefon" name="phone" type="tel" required />
        <Input label="E-posta (isteğe bağlı)" name="email" type="email" />
      </div>
      <Select
        label="Başvuru Yapılacak Sınıf"
        name="grade"
        options={applicationGradeOptions}
        placeholder="Sınıf seçin"
        required
      />
      <Checkbox
        name="consent"
        required
        label={
          <>
            <Link
              href="/sozlesme/kvkk-aydinlatma-metni"
              className="underline underline-offset-2 hover:text-signal"
            >
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum, kabul ediyorum.
          </>
        }
      />
      {status === "error" ? (
        <p className="text-sm text-signal" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button type="submit" variant="primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Gönderiliyor..." : "Avantajlı Kayıt Başvurusu"}
      </Button>
    </form>
  );
}
