"use client";

import { useLocale, useTranslations } from "next-intl";

export default function FooterBottom() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className={`${isArabic ? "footer-arabic-override" : ""} border-t border-[#556738] bg-[#3A461A]`}>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-[#D8D59B] lg:flex-row lg:px-8 lg:text-left">

        <p className={isArabic ? "footer-arabic-text" : ""}>{t("copyright")}</p>

        <p className={isArabic ? "footer-arabic-text" : ""}>{t("slogan")}</p>

      </div>
    </div>
  );
}