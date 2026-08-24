"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";

import { StorySectionData } from "./storySection.types";

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

interface StorySectionProps {
  section: StorySectionData;
}

export default function StorySection({
  section,
}: StorySectionProps) {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  // Normalize color format for robust matching
  const bgColor = section.backgroundColor?.toUpperCase();

  // Determine whether to use dark (muted-ground-dark) or light (muted-ground) surface texture
  const isDarkBg =
    bgColor === "#1F1F1F" ||
    bgColor === "#000000" ||
    bgColor === "#1A1A1A" ||
    bgColor === "#3D4723" || // Added Olive Green dark grounds
    bgColor === "#3F4B26" ||
    section.titleColor?.toUpperCase() === "#F8F4E9" ||
    section.titleColor?.toUpperCase() === "#F7F3E8";

  // Use muted-ground-dark for dark surfaces as specified in your globals.css
  const surfaceTextureClass = isDarkBg ? "muted-ground-dark" : "muted-ground";

  return (
    <section
      style={{
        backgroundColor: section.backgroundColor,
      }}
      className={`${surfaceTextureClass} relative overflow-hidden py-12 sm:py-16 md:py-28`}
      dir={isArabic ? "rtl" : "ltr"}
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div
          className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${
            section.reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* ================= IMAGE ================= */}
          <div
            className={`${
              section.reverse ? "lg:col-start-2" : ""
            }`}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] overflow-hidden rounded-sm">
              <Image
                src={section.image}
                alt={isArabic ? section.titleAr : section.titleEn}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div
            className={`mx-auto lg:mx-0 max-w-xl ${
              section.reverse ? "lg:col-start-1" : ""
            } ${
              isArabic
                ? "text-center lg:text-right"
                : "text-center lg:text-left"
            }`}
          >
            {/* Chapter */}
            <p
              className={`mb-3 sm:mb-6 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] ${
                isArabic ? "ibm-arabic-force" : ""
              }`}
              style={{
                color:
                  section.titleColor === "#F8F4E9" || section.titleColor === "#F7F3E8"
                    ? "#F8F4E9CC"
                    : "#44444499",
              }}
            >
              {isArabic ? section.chapter.ar : section.chapter.en}
            </p>

            {/* Title */}
            <h2
              className={`text-3xl sm:text-5xl lg:text-7xl leading-[1.05] sm:leading-[0.95] ${
                isArabic ? "el-messiri-force" : "font-serif italic"
              }`}
              style={{
                color: section.titleColor,
              }}
            >
              {isArabic
                ? section.titleAr
                : section.titleEn}
            </h2>

            {/* Description */}
            <p
              className={`mt-6 sm:mt-10 text-sm sm:text-base leading-7 sm:leading-9 ${
                isArabic ? "ibm-arabic-force" : ""
              }`}
              style={{
                color:
                  section.titleColor === "#F8F4E9" || section.titleColor === "#F7F3E8"
                    ? "#F8F4E9"
                    : "#343434",
              }}
            >
              {isArabic
                ? section.descriptionAr
                : section.descriptionEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}