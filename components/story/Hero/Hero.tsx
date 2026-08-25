"use client";

import Image from "next/image";
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

interface HeroProps {
  hero: {
    id: number;

    sectionLabelEn: string;
    sectionLabelAr: string;

    titleEn: string;
    titleHighlightEn: string;

    titleAr: string;
    titleHighlightAr: string;

    subtitleEn: string;
    subtitleAr: string;

    backgroundImage: string;

    overlayOpacity: number;

    stats: {
      id: number;

      labelEn: string;
      labelAr: string;

      valueEn: string;
      valueAr: string;
    }[];
  };
}

export default function Hero({ hero }: HeroProps) {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  return (
    <section className="relative w-full overflow-hidden font-sans" dir={isArabic ? "rtl" : "ltr"}>
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

      {/* ================= HERO ================= */}
      {/* 
        Using aspect-video ([aspect-ratio:16/9]) so the container height scales 
        proportionally with screen width, ensuring the 16:9 image is 100% visible with zero cropping.
      */}
      <div className="rich-ground relative w-full aspect-video min-h-[360px] sm:min-h-[460px] md:min-h-[560px] overflow-hidden bg-[#3F4B26] text-[#F8F3E7]">
        {/* Background Image */}
        <Image
          src={hero.backgroundImage}
          alt="Our Story"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dynamic Dark Overlay */}
        <div
          className="absolute inset-0 bg-[#3F4B26]"
          style={{
            opacity: hero.overlayOpacity,
          }}
        />

        {/* Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#3F4B26]/40" />

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-8 sm:px-6 md:px-12 lg:px-16">
          <div
            className={`w-full max-w-3xl ${
              isArabic
                ? "text-center md:text-right"
                : "text-center md:text-left"
            }`}
          >
            {/* Heading (1.25x scale) */}
            <h1
              className={`text-[30px] leading-[1.12] tracking-tight text-[#F8F3E7] sm:text-[45px] md:text-[60px] lg:text-[90px] lg:leading-[1.05] ${
                isArabic
                  ? "el-messiri-force"
                  : "font-serif italic"
              }`}
            >
              {isArabic ? hero.titleAr : hero.titleEn}
            </h1>

            {/* Description (1.25x scale) */}
            <p
              className={`mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#F8F3E7]/90 sm:mt-5 sm:text-[17.5px] md:mx-0 md:text-[20px] md:leading-[1.75] ${
                isArabic ? "ibm-arabic-force" : ""
              }`}
            >
              {isArabic ? hero.subtitleAr : hero.subtitleEn}
            </p>
          </div>
        </div>

        {/* ================= STATS / OCEAN WAVE DIVIDER ================= */}
        <div className="wave-divider" aria-hidden="true">
          <div className="wave-layer wave-top" />

          <div className="wave-echo-wrap">
            <div className="wave-layer wave-echo" />
          </div>
        </div>
      </div>

      {/* ================= STATS CONTENT ================= */}
      <div className="bg-[#EBE5D8] px-4 pb-8 pt-2 sm:px-8 sm:pb-12 sm:pt-4 md:px-12 md:pb-16 md:pt-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div
            className="
              grid
              grid-cols-1
              gap-8
              text-center
              sm:grid-cols-3
              sm:gap-6
              sm:text-left
              rtl:sm:text-right
            "
          >
            {hero.stats.map((stat) => (
              <div
                key={stat.id}
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  sm:items-start
                  rtl:sm:items-end
                "
              >
                {/* Small label (1.25x scale) */}
                <p
                  className={`
                    text-[11.25px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#3F4B26]/65
                    sm:text-[12.5px]
                    sm:tracking-[0.22em]
                    ${isArabic ? "ibm-arabic-force" : ""}
                  `}
                >
                  {isArabic ? stat.labelAr : stat.labelEn}
                </p>

                {/* Main stat (1.25x scale) */}
                <h3
                  className={`
                    text-[35px]
                    leading-none
                    text-[#C68A4C]
                    sm:text-[37.5px]
                    md:text-[42.5px]
                    lg:text-[47.5px]
                    ${isArabic ? "el-messiri-force" : "font-serif italic"}
                  `}
                >
                  {isArabic ? stat.valueAr : stat.valueEn}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}