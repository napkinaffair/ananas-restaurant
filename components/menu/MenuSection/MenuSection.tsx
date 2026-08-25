"use client";

import { El_Messiri, IBM_Plex_Sans_Arabic, Playfair_Display, Inter, Instrument_Serif } from "next/font/google";
import { useLocale } from "next-intl";
import Image from "next/image";

import { MenuItem, MenuSectionData } from "./menuSection.types";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

const headingArabic = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const bodyArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  section: MenuSectionData & { isDark?: boolean };
  index?: number;
  onSelectItem: (item: MenuItem, section: MenuSectionData) => void;
};

export default function MenuSection({ section, index, onSelectItem }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const toArabicNumerals = (val: string | number) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(val).replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit, 10)]);
  };

  const formatNumber = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return "";
    return isArabic ? toArabicNumerals(val) : String(val);
  };

  // Parse section.number in case index is not passed
  const parsedNumber = parseInt(String(section.number).replace(/\D/g, ""), 10);
  
  // Checks either index (0-based) OR parsed section.number (1-based)
  const isEven = typeof index === "number" 
    ? index % 2 === 1 
    : !isNaN(parsedNumber) && parsedNumber % 2 === 0;

  const textureClass = section.isDark ? "muted-ground-dark" : "muted-ground";
  const accentColor = section.accentColor || "#1B3622";

  const headingFont = isArabic ? headingArabic.className : playfair.className;
  const sectionTitleFont = isArabic ? headingArabic.className : instrumentSerif.className;
  const bodyFont = isArabic ? bodyArabic.className : inter.className;
  const bodyArabicFontFamily = '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif';
  const headingArabicFontFamily = '"El Messiri", serif';
  const sectionNumberFontFamily = '"Instrument Serif", serif';

  const carbsLabel = isArabic ? "ك" : "C";
  const proteinLabel = isArabic ? "ب" : "P";
  const fatLabel = isArabic ? "د" : "F";
  const kcalLabel = isArabic ? "س.ح" : "KCAL";
  const gramUnit = isArabic ? "ج" : "g";

  return (
    <section
      id={section.id}
      style={{
        backgroundColor: section.backgroundColor || "#F7C5B8",
        color: accentColor,
      }}
      className={`${textureClass} relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2">

          {/* Image Container */}
          <div className={isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"}>
            <div className="relative aspect-[4/5] overflow-hidden shadow-sm">
              <Image
                src={section.image}
                alt={section.titleEn}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Container */}
          <div className={`space-y-8 ${isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
            <div className="flex items-baseline gap-4 border-b border-current opacity-90 pb-6">
              <span
                className={`${isArabic ? headingFont : playfair.className} shrink-0 whitespace-nowrap text-4xl font-normal ${
                  isArabic ? "" : "italic"
                } md:text-5xl`}
                style={
                  isArabic
                    ? {
                        fontFamily: headingArabicFontFamily,
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "76px",
                        lineHeight: "95px",
                        color: accentColor,
                        display: "inline-block",
                      }
                    : {
                        fontFamily: sectionNumberFontFamily,
                        fontSize: "76px",
                        lineHeight: "73px",
                      }
                }
              >
                <bdi dir="ltr">{formatNumber(section.number)}</bdi>
              </span>

              <h2
                className={`${sectionTitleFont} min-w-0 flex-1 whitespace-nowrap font-normal ${
                  isArabic ? "text-4xl md:text-5xl" : "italic"
                }`}
                style={
                  isArabic
                    ? {
                        fontFamily: headingArabicFontFamily,
                        fontWeight: 400,
                        fontStyle: "normal",
                        lineHeight: "95px",
                        fontSize: "76px",
                        color: accentColor,
                      }
                    : {
                        fontSize: "76px",
                        lineHeight: "73px",
                      }
                }
              >
                {isArabic ? section.titleAr : section.titleEn}
              </h2>
            </div>

            <div className="space-y-8">
              {section.items.map((item) => (
                <article
                  key={item.id}
                  onClick={() => onSelectItem(item, section)}
                  className="cursor-pointer border-b border-current/20 pb-6 transition-opacity hover:opacity-80"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`${headingFont} whitespace-nowrap text-xl font-normal ${
                          isArabic ? "" : "italic"
                        } md:text-2xl`}
                        style={
                          isArabic
                            ? {
                                fontFamily: headingArabicFontFamily,
                                fontWeight: 400,
                                fontStyle: "normal",
                                lineHeight: "1.15",
                              }
                            : undefined
                        }
                      >
                        {isArabic ? item.titleAr : item.titleEn}
                      </h3>

                      <p
                        className={`${bodyFont} mt-1 max-w-md text-xs font-normal opacity-75 md:text-sm`}
                        style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}
                      >
                        {isArabic ? item.descriptionAr : item.descriptionEn}
                      </p>

                      {/* English: Keep Macros below description */}
                      {!isArabic && (
                        <div className="mt-4 flex gap-5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs">
                          <span className="inline-flex items-center gap-1">
                            <span>{carbsLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.carbs)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <span>{proteinLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.protein)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <span>{fatLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.fat)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 whitespace-nowrap text-right">
                      {/* Calories */}
                      <span
                        className={`${
                          isArabic ? bodyFont : "font-mono"
                        } inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs`}
                        style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}
                      >
                        <bdi dir="ltr">{formatNumber(item.kcal)}</bdi>
                        <span>{kcalLabel}</span>
                      </span>

                      {/* Arabic: Macros placed directly below calories */}
                      {isArabic && (
                        <div
                          className={`${bodyFont} mt-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs`}
                          style={{ fontFamily: bodyArabicFontFamily }}
                        >
                          <span className="inline-flex items-center gap-1" style={{ fontFamily: bodyArabicFontFamily }}>
                            <span>{proteinLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.protein)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>

                          <span className="opacity-40">·</span>

                          <span className="inline-flex items-center gap-1" style={{ fontFamily: bodyArabicFontFamily }}>
                            <span>{carbsLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.carbs)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>

                          <span className="opacity-40">·</span>

                          <span className="inline-flex items-center gap-1" style={{ fontFamily: bodyArabicFontFamily }}>
                            <span>{fatLabel}</span>
                            <bdi dir="ltr">{formatNumber(item.fat)}</bdi>
                            {gramUnit && <span>{gramUnit}</span>}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}