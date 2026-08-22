
"use client";

import { El_Messiri, IBM_Plex_Sans_Arabic, Playfair_Display, Inter } from "next/font/google";
import { useLocale } from "next-intl";
import Image from "next/image";

import { MenuItem, MenuSectionData } from "./menuSection.types";

// English display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
});

// Arabic headline font — matches the reference's cleaner geometric display look
const headingArabic = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

// Arabic body font — lighter reading text in the reference
const bodyArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

// English body font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  section: MenuSectionData & { isDark?: boolean };
  onSelectItem: (item: MenuItem, section: MenuSectionData) => void;
};

export default function MenuSection({ section, onSelectItem }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const textureClass = section.isDark
    ? "muted-ground-dark"
    : "muted-ground";

  const accentColor = section.accentColor || "#1B3622";

  // Font selection based on locale
  const headingFont = isArabic ? headingArabic.className : playfair.className;

  const bodyFont = isArabic ? bodyArabic.className : inter.className;
  const bodyArabicFontFamily = '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif';
  const headingArabicFontFamily = '"El Messiri", serif';
  const sectionNumberFontFamily = '"Instrument Serif", serif';

  const carbsLabel = isArabic ? "ك" : "C";
  const proteinLabel = isArabic ? "ب" : "P";
  const fatLabel = isArabic ? "د" : "F";
  const kcalLabel = isArabic ? "س.ح" : "KCAL";
  const gramUnit = isArabic ? "غ" : "";

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

          <div className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-sm">
              <Image
                src={section.image}
                alt={section.titleEn}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 space-y-8 lg:order-2">

            <div className="flex items-baseline gap-4 border-b border-current opacity-90 pb-6">

              <span
                className={`${isArabic ? headingFont : playfair.className} text-4xl font-normal ${
                  isArabic ? "" : "italic"
                } md:text-5xl`}
                style={
                  isArabic
                    ? {
                        fontFamily: sectionNumberFontFamily,
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "76px",
                        lineHeight: "95px",
                        color: accentColor,
                        display: "inline-block",
                        transform: "translate(18px, -12px)",
                        marginLeft: "-8px",
                      }
                    : undefined
                }
              >
                {section.number}
              </span>

              <h2
                className={`${headingFont} text-4xl font-normal ${
                  isArabic ? "" : "italic"
                } md:text-5xl`}
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
                    : undefined
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

                    <div>

                      <h3
                        className={`${headingFont} text-xl font-normal ${
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
                        {isArabic
                          ? item.descriptionAr
                          : item.descriptionEn}
                      </p>

                      <div
                        className={`${
                          isArabic ? bodyFont : "font-mono"
                        } mt-4 flex gap-5 text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs`}
                        style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}
                      >
                        <span style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}>
                          {carbsLabel} {item.carbs}
                          {gramUnit}
                        </span>

                        <span style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}>
                          {proteinLabel} {item.protein}
                          {gramUnit}
                        </span>

                        <span style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}>
                          {fatLabel} {item.fat}
                          {gramUnit}
                        </span>
                      </div>

                    </div>

                    <div className="text-right">

                      <span
                        className={`${
                          isArabic ? bodyFont : "font-mono"
                        } text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs`}
                        style={isArabic ? { fontFamily: bodyArabicFontFamily } : undefined}
                      >
                        {item.kcal} {kcalLabel}
                      </span>

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