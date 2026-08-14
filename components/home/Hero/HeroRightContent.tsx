"use client";

import { HeroProps } from "./hero.types";

interface HeroRightContentProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroRightContent({
  data,
  locale,
}: HeroRightContentProps) {
  const isArabic = locale === "ar";

  if (isArabic) {
    return (
      <div className="w-full max-w-full text-right lg:max-w-[380px]">
        <p
          style={{
            fontFamily: "var(--font-arabic)",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: "0em",
            lineHeight: 1.6,
            textWrap: "pretty",
          }}
          className="
            text-right
            text-sm
            text-white/95
            xs:text-base
            sm:text-lg
            lg:text-[1.25rem]
            drop-shadow-md
          "
        >
          {data.subtitleAr}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full lg:max-w-[360px]">
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontStyle: "normal",
          fontWeight: 400,
          letterSpacing: "normal",
          lineHeight: 1.6,
          textWrap: "pretty",
        }}
        className="
          text-left
          text-xs
          text-white/95
          xs:text-sm
          sm:text-base
          md:text-lg
          lg:text-right
          lg:text-[1.25rem]
          drop-shadow-md
        "
      >
        {data.subtitleEn}
      </p>
    </div>
  );
}