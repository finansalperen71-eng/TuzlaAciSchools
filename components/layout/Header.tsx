"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors ${
        isScrolled ? "bg-chalk border-b border-line" : "bg-chalk/90 border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-6 py-5">
        <Logo />
        <MegaMenu />
        <div className="hidden lg:block">
          <Button href="/erken-kayit" variant="primary">
            Erken Kayıt
          </Button>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
