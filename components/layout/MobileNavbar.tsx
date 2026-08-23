"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const brandName = locale === "ar" ? t("brand") : "Ananas";
  const logoSrc = locale === "ar" ? "/icons/ananas_arabic.png" : "/icons/ananas_english.png";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="flex h-20 items-center justify-between px-5 lg:hidden" dir="ltr">

        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#2F3B1C]/60 bg-transparent p-0 text-black"
          aria-label="Open Menu"
        >
          <Menu size={28} className="stroke-current" />
        </button>

        <Link href="/">
          <Image src={logoSrc} alt={brandName} width={150} height={40} />
        </Link>

        <LanguageSwitcher />

      </div>

      {/* Drawer (portal to body so it escapes header stacking context) */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[60] bg-[#EFE4D0] transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!open}
          >
            <div className="flex items-center justify-between border-b p-6">

              <Image src={logoSrc} alt={brandName} width={170} height={45} />

              <button onClick={() => setOpen(false)} className="text-black relative z-50" aria-label="Close menu">
                <X size={30} className="stroke-current" />
              </button>

            </div>

            <nav className="flex flex-col gap-8 p-8 text-lg">
              <NavLinks onClick={() => setOpen(false)} />

              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: '"Manrope", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  backgroundColor: '#F69234',
                  color: '#FFFFFF',
                }}
                className="view-menu-button mt-4 rounded-lg bg-[#F69234] py-4 text-center text-white transition-colors"
              >
                {t("viewMenu")}
              </Link>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
