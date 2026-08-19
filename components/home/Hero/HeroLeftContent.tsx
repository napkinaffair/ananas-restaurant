"use client";

import { HeroProps } from "./hero.types";

interface HeroLeftContentProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroLeftContent({
  data,
  locale,
}: HeroLeftContentProps) {
  const isArabic = locale === "ar";

  return (
    <div
      className={`relative z-30 max-w-full pb-1 lg:absolute lg:bottom-6 lg:pb-0 lg:max-w-[650px] ${
        isArabic
          ? "lg:right-6 xl:right-10 text-right"
          : "lg:left-6 xl:left-10 text-left"
      }`}
    >
      {/* Title Line 1 */}
      <h1
        style={{
          fontFamily: isArabic
            ? "var(--font-arabic-voice)"
            : "var(--font-serif)",
          fontStyle: isArabic ? "normal" : "italic",
          fontWeight: isArabic ? 700 : 400,
          letterSpacing: isArabic ? "0em" : "-0.025em",
          lineHeight: isArabic ? 1.35 : 0.9,
          textWrap: "balance",
        }}
        className="
          block
          whitespace-normal
          sm:whitespace-nowrap
          text-white
          text-[1.55rem]
          xs:text-[1.9rem]
          sm:text-[2.6rem]
          md:text-[3.4rem]
          lg:text-[4.2rem]
          xl:text-[4.8rem]
          drop-shadow-md
        "
      >
        {isArabic ? data.titleAr : data.titleEn}
      </h1>

      {/* Title Line 2 (Highlight) */}
      <h2
        style={{
          fontFamily: isArabic
            ? "var(--font-arabic-voice)"
            : "var(--font-serif)",
          fontStyle: isArabic ? "normal" : "italic",
          fontWeight: isArabic ? 700 : 400,
          letterSpacing: isArabic ? "0em" : "-0.025em",
          lineHeight: isArabic ? 1.35 : 0.9,
          textWrap: "balance",
        }}
        className="
          block
          whitespace-normal
          sm:whitespace-nowrap
          text-[#DCE56C]
          text-[1.55rem]
          xs:text-[1.9rem]
          sm:text-[2.6rem]
          md:text-[3.4rem]
          lg:text-[4.2rem]
          xl:text-[4.8rem]
          drop-shadow-md
        "
      >
        {isArabic ? data.titleHighlightAr : data.titleHighlightEn}
      </h2>
    </div>
  );
}