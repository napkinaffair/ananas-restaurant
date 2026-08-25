"use client";

import { useLocale } from "next-intl";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { IngredientOrigin } from "@/lib/menu/ingredientOrigins";

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  display: "swap",
});

interface Props {
  items: IngredientOrigin[];
  disclaimerEn?: string;
  disclaimerAr?: string;
}

export default function IngredientOrigins({
  items,
  disclaimerEn,
  disclaimerAr,
}: Props) {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  const disclaimerText = isArabic
    ? disclaimerAr || disclaimerEn
    : disclaimerEn || disclaimerAr;

  return (
    <section
      id="ingredient-origins"
      dir={isArabic ? "rtl" : "ltr"}
      className="muted-ground relative w-full text-[#1E1D1B] py-14 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{
        backgroundColor: "#EBE8DB",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
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

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Category Tag */}
        <div className="mb-4">
          <span
            className={`text-[10px] tracking-[0.25em] text-[#76746A] uppercase ${
              isArabic ? "ibm-arabic-force" : "font-mono"
            }`}
          >
            {isArabic ? "التوريد والمصادر" : "SOURCING"}
          </span>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-light text-[#191817] tracking-tight leading-none ${
              isArabic ? "el-messiri-force" : "font-serif italic"
            }`}
          >
            {isArabic ? "مصدر المكونات." : "Ingredient origins."}
          </h1>
          <p
            className={`text-xs sm:text-sm text-[#5C5B53] font-normal leading-relaxed max-w-xs ${
              isArabic ? "ibm-arabic-force" : "font-sans"
            }`}
          >
            {isArabic
              ? "تفاصيل المنشأ وشهادة الحلال للمكونات المذكورة أدناه."
              : "Origin and halal certification details for the ingredients listed below."}
          </p>
        </div>

        {/* Hero Divider */}
        <div className="h-[1px] bg-[#CFCAC0] mb-10 w-full" />

        {/* Content Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mb-14">
          {items.map((item) => {
            const title = isArabic
              ? item.titleAr || item.titleEn
              : item.titleEn;
            const subtitle = isArabic
              ? item.subtitleAr || item.subtitleEn
              : item.subtitleEn;
            const origin = isArabic
              ? item.originAr || item.originEn
              : item.originEn;
            const halal = isArabic
              ? item.halalAr || item.halalEn
              : item.halalEn;

            return (
              <div key={item.id} className="flex flex-col">
                {/* Category Title */}
                <h3
                  className={`text-2xl font-light text-[#191817] mb-1.5 ${
                    isArabic ? "el-messiri-force" : "font-serif italic"
                  }`}
                >
                  {title}
                </h3>

                {/* Subtitle */}
                <p
                  className={`text-xs text-[#5C5B53] font-normal leading-relaxed mb-6 min-h-[2.5rem] ${
                    isArabic ? "ibm-arabic-force" : "font-sans"
                  }`}
                >
                  {subtitle}
                </p>

                {/* Row: Origin */}
                <div className="border-t border-[#CFCAC0] py-2">
                  <p
                    className={`text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5 ${
                      isArabic ? "ibm-arabic-force" : "font-mono"
                    }`}
                  >
                    <span className="text-[#878479]">
                      {isArabic ? "البلد الأصلي" : "ORIGIN"}
                    </span>
                    <span className="text-[#878479]">—</span>
                    <span className="font-medium">{origin}</span>
                  </p>
                </div>

                {/* Row: Halal Certification */}
                {halal && (
                  <div className="border-t border-[#CFCAC0] py-2">
                    <p
                      className={`text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5 ${
                        isArabic ? "ibm-arabic-force" : "font-mono"
                      }`}
                    >
                      <span className="text-[#878479]">
                        {isArabic ? "شهادة الحلال" : "HALAL CERTIFICATION"}
                      </span>
                      <span className="text-[#878479]">—</span>
                      <span className="font-medium">{halal}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Footer Note */}
        {disclaimerText && (
          <p
            className={`uppercase text-[#76746A] ${
              isArabic
                ? "ibm-arabic-force text-[11px] tracking-[0.08em]"
                : "font-mono text-[7px] tracking-[0.22em]"
            }`}
          >
            {disclaimerText}
          </p>
        )}
      </div>
    </section>
  );
}