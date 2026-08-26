"use client";

import { Manrope } from "next/font/google";
import { Link } from "@/i18n/navigation";
import { HeroProps } from "./hero.types";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

interface HeroButtonsProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroButtons({
  data,
  locale,
}: HeroButtonsProps) {
  const isArabic = locale === "ar";

  return (
    <>
      {/* Direct style injection with !important to overpower any global CSS rules */}
      <style>{`
        .hero-manrope-btn,
        .hero-manrope-btn * {
          font-family: ${manrope.style.fontFamily}, sans-serif !important;
          font-weight: 500 !important;
        }
      `}</style>

      <div
        className={`flex w-full flex-row items-center gap-2 sm:flex-wrap lg:w-auto ${
          isArabic ? "justify-start lg:justify-start" : "justify-start lg:justify-end"
        }`}
      >
        {isArabic ? (
          <>
            {data.primaryButton.isVisible && (
              <Link
                href={data.primaryButton.href}
                className="hero-manrope-btn inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#D89A43] px-4 py-2.5 text-xs text-white transition-colors duration-300 hover:bg-[#1F2021] hover:text-[#E3E27E] sm:flex-none sm:w-auto"
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
                className="hero-manrope-btn inline-flex flex-1 items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2.5 text-xs text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#1F2021] sm:flex-none sm:w-auto"
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
                className="hero-manrope-btn tracking-[0.14em] uppercase inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#D89A43] px-4 py-2 text-[0.68rem] text-white transition-colors duration-300 hover:bg-[#1F2021] hover:text-[#E3E27E] sm:flex-none sm:w-auto"
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
                className="hero-manrope-btn tracking-[0.14em] uppercase inline-flex flex-1 items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2 text-[0.68rem] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#1F2021] sm:flex-none sm:w-auto"
              >
                {data.secondaryButton.labelEn}
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
}