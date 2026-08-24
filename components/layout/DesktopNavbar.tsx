"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";

export default function DesktopNavbar() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const brandName = locale === "ar" ? t("brand") : "Ananas";
  const logoSrc = locale === "ar" ? "/icons/arabic.png" : "/icons/english.png";

  return (
    <div className="hidden lg:flex mx-auto h-[105px] max-w-[1400px] items-center justify-between px-8">

      {/* Logo */}
      <Link href="/" className="flex shrink-0 items-center justify-center">
        <Image
          src={logoSrc}
          alt={brandName}
          width={locale === "ar" ? 165 : 185}
          height={locale === "ar" ? 46 : 52}
          priority
          className="object-contain"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-10">
        <NavLinks />
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Link
          href="/menu"
          style={{
            fontFamily: '"Manrope", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            backgroundColor: '#F69234',
            color: '#FFFFFF',
          }}
          className="view-menu-button rounded-md bg-[#F69234] px-6 py-3 text-sm uppercase tracking-wider text-white transition-colors"
        >
          {t("viewMenu")} →
        </Link>
      </div>

    </div>
  );
}