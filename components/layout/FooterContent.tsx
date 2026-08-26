"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import FooterColumns from "./FooterColumns";

export default function FooterContent() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className={`${isArabic ? "footer-arabic-override" : ""} overflow-hidden bg-[#3A461A] text-[#EFE4D0]`}>
      <div className="mx-auto max-w-[1400px] px-5 py-5 sm:px-6 lg:px-8 lg:py-6">

        <div className="grid items-center gap-5 lg:grid-cols-[1fr_300px] lg:gap-6">

          {/* Left */}
          <div className="order-2 lg:order-1">

            <h2
              className="footer-main-heading leading-[0.88] tracking-[-0.04em]"
              style={
                isArabic
                  ? {
                      direction: "rtl",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                      letterSpacing: "normal",
                      wordSpacing: "normal",
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(52.5px,7.5vw,110px)",
                    }
                  : {
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(52.5px,7.5vw,110px)",
                    }
              }
            >
              {isArabic ? (
                <>
                  <span className="inline italic text-[#F3E8D4]">{t("headlineLine1")}</span>
                  {" "}
                  <span className="inline italic text-[#DCDD6D]">{t("headlineLine2")}</span>
                </>
              ) : (
                <>
                  <span className="block italic text-[#F3E8D4]">{t("headlineLine1")}</span>
                  <span className="block italic text-[#DCDD6D]">{t("headlineLine2").replace(/\.$/, "")}</span>
                </>
              )}
            </h2>

            <div className="mt-4 lg:mt-5">
              <FooterColumns />
            </div>

          </div>

          {/* Right */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <Image
              src="/icons/footer-parrot.png"
              alt="Footer Artwork"
              width={320}
              height={320}
              priority
              className="h-auto w-[140px] max-w-full select-none sm:w-[170px] md:w-[200px] lg:w-[250px]"
            />
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .footer-arabic-override .footer-main-heading,
          .footer-arabic-override .footer-main-heading * {
            font-family: "Aref Ruqaa", serif !important;
            font-weight: 400 !important;
            font-style: normal !important;
            letter-spacing: 0 !important;
          }

          .footer-arabic-override .footer-arabic-copy,
          .footer-arabic-override .footer-arabic-copy > *,
          .footer-arabic-override .footer-arabic-copy h3,
          .footer-arabic-override .footer-arabic-copy h3 *,
          .footer-arabic-override .footer-arabic-copy p,
          .footer-arabic-override .footer-arabic-copy p *,
          .footer-arabic-override .footer-arabic-copy a,
          .footer-arabic-override .footer-arabic-copy a *,
          .footer-arabic-override .footer-arabic-copy nav,
          .footer-arabic-override .footer-arabic-copy nav *,
          .footer-arabic-override .footer-arabic-copy span,
          .footer-arabic-override .footer-arabic-copy span *,
          .footer-arabic-override .footer-arabic-copy button,
          .footer-arabic-override .footer-arabic-copy button *,
          .footer-arabic-override .footer-arabic-text,
          .footer-arabic-override .footer-arabic-text *,
          .footer-arabic-override p,
          .footer-arabic-override p *,
          .footer-arabic-override a,
          .footer-arabic-override a *,
          .footer-arabic-override span,
          .footer-arabic-override span * {
            font-family: "IBM Plex Sans Arabic", "Tajawal", system-ui, sans-serif !important;
            font-weight: 400 !important;
            font-style: normal !important;
            letter-spacing: 0 !important;
          }
        `,
      }} />
    </section>
  );
}