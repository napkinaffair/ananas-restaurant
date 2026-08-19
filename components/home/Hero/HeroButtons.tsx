"use client";

import { Link } from "@/i18n/navigation";
import { HeroProps } from "./hero.types";

interface HeroButtonsProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroButtons({
  data,
  locale,
}: HeroButtonsProps) {
  const isArabic = locale === "ar";

  const buttonTextStyle = {
    fontFamily: isArabic ? "var(--font-arabic)" : "var(--font-mono)",
    letterSpacing: isArabic ? "0em" : "0.14em",
    textTransform: isArabic ? ("none" as const) : ("uppercase" as const),
    fontFeatureSettings: isArabic ? "normal" : '"ss01"',
  };

  return (
    <div
      className={`flex w-full flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto ${
        isArabic ? "justify-start lg:justify-start" : "justify-start lg:justify-end"
      }`}
    >
      {isArabic ? (
        <>
          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              style={buttonTextStyle}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#D89A43] px-4 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[#1F2021] hover:text-[#E3E27E] sm:w-auto"
            >
              <span>{data.primaryButton.labelAr}</span>
              <span
                className="inline-block text-xs transition-colors duration-300 hover:text-[#E3E27E]"
                style={{ transform: "scaleX(-1)" }}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          )}

          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              style={buttonTextStyle}
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#1F2021] sm:w-auto"
            >
              {data.secondaryButton.labelAr}
            </Link>
          )}
        </>
      ) : (
        <>
          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              style={buttonTextStyle}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#D89A43] px-4 py-2 text-[0.68rem] font-medium text-white transition-colors duration-300 hover:bg-[#1F2021] hover:text-[#E3E27E] sm:w-auto"
            >
              <span>{data.primaryButton.labelEn}</span>
              <span className="inline-block text-xs transition-colors duration-300 hover:text-[#E3E27E]" aria-hidden="true">
                →
              </span>
            </Link>
          )}

          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              style={buttonTextStyle}
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2 text-[0.68rem] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#1F2021] sm:w-auto"
            >
              {data.secondaryButton.labelEn}
            </Link>
          )}
        </>
      )}
    </div>
  );
}