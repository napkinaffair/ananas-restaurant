"use client";

import { useLocale } from "next-intl";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

interface ValuesProps {
  values: {
    id: number;

    sectionLabelEn: string;
    sectionLabelAr: string;

    headingEn: string;
    headingAr: string;

    quoteEn: string;
    quoteAr: string;

    quoteSignatureEn: string;
    quoteSignatureAr: string;

    items: {
      id: number;

      number: string;

      titleEn: string;
      titleAr: string;

      descriptionEn: string;
      descriptionAr: string;
    }[];
  };
}

export default function Values({ values }: ValuesProps) {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  return (
    <>
      {isArabic && (
        <style>{`
          .el-messiri-force,
          .el-messiri-force * {
            font-family: ${elMessiri.style.fontFamily}, "El Messiri", serif !important;
            font-style: normal !important;
            font-weight: 400 !important;
          }
          .ibm-arabic-force,
          .ibm-arabic-force * {
            font-family: ${ibmPlexSansArabic.style.fontFamily}, "IBM Plex Sans Arabic", Tajawal, sans-serif !important;
            font-style: normal !important;
            font-weight: 400 !important;
          }
        `}</style>
      )}

      {/* ===================== VALUES SECTION ===================== */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="muted-ground-dark relative bg-[#3D4723] text-[#F7F3E8] py-24 md:py-32 selection:bg-[#D8D17A] selection:text-[#3D4723]"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
          {/* Section Label */}
          <p
            className={`mb-8 text-[10px] uppercase tracking-[0.3em] text-[#D8D17A] md:text-[11px] ${
              isArabic ? "ibm-arabic-force" : "font-mono"
            }`}
          >
            {isArabic ? values.sectionLabelAr : values.sectionLabelEn}
          </p>

          {/* Main Heading */}
          <h2
            className={`max-w-4xl text-5xl leading-[1.05] tracking-normal md:text-7xl lg:text-[76px] ${
              isArabic ? "el-messiri-force" : "font-serif italic"
            }`}
          >
            {isArabic ? values.headingAr : values.headingEn}
          </h2>

          {/* List Items Grid */}
          <div className="mt-20 border-t border-[#F7F3E8]/15">
            {values.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 border-b border-[#F7F3E8]/15 py-9 md:grid-cols-[70px_300px_1fr] md:items-baseline md:gap-8 lg:grid-cols-[80px_360px_1fr]"
              >
                {/* Number Format */}
                <div
                  className={`text-[10px] uppercase tracking-[0.2em] text-[#D8D17A]/90 md:text-[11px] ${
                    isArabic ? "ibm-arabic-force" : "font-mono"
                  }`}
                >
                  {item.number}
                </div>

                {/* Item Title */}
                <h3
                  className={`text-3xl tracking-tight md:text-4xl ${
                    isArabic ? "el-messiri-force" : "font-serif italic"
                  }`}
                >
                  {isArabic ? item.titleAr : item.titleEn}
                </h3>

                {/* Item Description */}
                <p
                  className={`max-w-lg text-sm leading-[1.7] text-[#F7F3E8]/85 md:text-base ${
                    isArabic ? "ibm-arabic-force" : "font-sans"
                  }`}
                >
                  {isArabic ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUOTE SECTION ===================== */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="muted-ground relative overflow-hidden bg-[#E4DFCE] py-32 md:py-48"
      >
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          {/* Quote Text */}
          <h2
            className={`text-3xl leading-[1.35] tracking-wide text-[#2B301D] md:text-5xl lg:text-[52px] ${
              isArabic ? "el-messiri-force" : "font-serif italic"
            }`}
          >
            {isArabic ? values.quoteAr : values.quoteEn}
          </h2>

          {/* Quote Signature */}
          <p
            className={`mt-12 text-[10px] uppercase tracking-[0.45em] text-[#2B301D]/70 md:text-[11px] ${
              isArabic ? "ibm-arabic-force" : "font-mono"
            }`}
          >
            {isArabic
              ? values.quoteSignatureAr
              : values.quoteSignatureEn}
          </p>
        </div>
      </section>
    </>
  );
}