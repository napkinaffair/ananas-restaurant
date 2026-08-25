"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { useLocale } from "next-intl";
import { MenuItem, MenuSectionData } from "./MenuSection/menuSection.types";

const headingArabic = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const bodyArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

type ItemModalProps = {
  item: MenuItem | null;
  section: (MenuSectionData & { isDark?: boolean }) | null;
  onClose: () => void;
};

export default function ItemModal({
  item,
  section,
  onClose,
}: ItemModalProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const previousScrollY = useRef<number | null>(null);

  const toArabicNumerals = (val: string | number) => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(val).replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit, 10)]);
  };

  const formatNumber = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return "";
    return isArabic ? toArabicNumerals(val) : String(val);
  };

  const gramUnit = isArabic ? "ج" : "g";

  useLayoutEffect(() => {
    if (!item || !section) {
      return;
    }

    previousScrollY.current = window.scrollY;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previousScrollY.current !== null) {
        window.scrollTo({
          top: previousScrollY.current,
          behavior: "auto",
        });
      }
    };
  }, [item, section]);

  if (!item || !section) return null;

  // Rule of thumb from spec: dark fills take muted-ground-dark, light/default takes muted-ground
  const textureClass = section.isDark ? "muted-ground-dark" : "muted-ground";

  const categoryLabel = (
    isArabic ? section.titleAr : section.titleEn
  ).toUpperCase();

  const itemTitle = isArabic ? item.titleAr : item.titleEn;

  const itemDesc = isArabic
    ? item.descriptionAr
    : item.descriptionEn;

  const itemCaption = isArabic
    ? item.captionAr
    : item.captionEn;

  const itemOrigin = isArabic
    ? item.originAr ?? ""
    : item.originEn ?? "";

  const itemDisclaimer = isArabic
    ? item.disclaimerAr ?? ""
    : item.disclaimerEn ?? "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Full-height textured wrapper that stretches across all scrollable content */}
        <div
          className={`${textureClass} relative min-h-full w-full p-6 sm:p-10 lg:p-14`}
          style={{
            backgroundColor: section.backgroundColor,
            color: section.accentColor,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        >
          <button
            onClick={onClose}
            type="button"
            className={`absolute top-6 ${
              isArabic ? "left-6" : "right-6"
            } z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-xl hover:bg-black/10 transition-colors`}
            style={{ color: section.accentColor }}
            aria-label={isArabic ? "إغلاق النافذة" : "Close modal"}
          >
            ✕
          </button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 items-center">

            {/* Image — Optimized 4:3 on mobile with height containment, keeping original 4:5 on desktop */}
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full max-h-[320px] sm:max-h-none overflow-hidden rounded-2xl sm:rounded-sm bg-[#3E4A23] shadow-inner flex items-end">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={itemTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  className="object-cover object-center"
                />
              ) : (
                <span
                  className="p-4 text-[10px] font-mono uppercase tracking-widest opacity-80"
                  style={{ color: section.accentColor }}
                >
                  {isArabic ? "الصورة قريباً" : "PHOTO COMING"}
                </span>
              )}
            </div>

            {/* Content */}
            <div
              className={`space-y-6 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <p
                className="text-[11px] font-mono tracking-[0.2em] uppercase opacity-70"
                style={
                  isArabic
                    ? {
                        fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                        fontWeight: 400,
                        letterSpacing: "0.1em",
                      }
                    : undefined
                }
              >
                {categoryLabel}
              </p>

              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-serif italic leading-tight"
                style={
                  isArabic
                    ? {
                        fontFamily: '"El Messiri", serif',
                        fontWeight: 400,
                        fontStyle: "normal",
                        lineHeight: 1.1,
                      }
                    : undefined
                }
              >
                {itemTitle}
              </h2>

              {itemCaption && (
                <div
                  className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
                  style={
                    isArabic
                      ? {
                          backgroundColor: section.accentColor,
                          color: section.backgroundColor,
                          fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                          fontWeight: 400,
                          letterSpacing: "0.08em",
                        }
                      : {
                          backgroundColor: section.accentColor,
                          color: section.backgroundColor,
                        }
                  }
                >
                  {itemCaption}
                </div>
              )}

              <p
                className="text-sm sm:text-base leading-relaxed font-light opacity-90"
                style={
                  isArabic
                    ? {
                        fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                        fontWeight: 400,
                        lineHeight: 1.7,
                      }
                    : undefined
                }
              >
                {itemDesc}
              </p>

              <hr className="border-current opacity-20 my-6" />

              {/* Nutrition */}
              <div>
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-3"
                  style={
                    isArabic
                      ? {
                          fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                          fontWeight: 400,
                          letterSpacing: "0.08em",
                        }
                      : undefined
                  }
                >
                  {isArabic ? "لكل وجبة" : "PER SERVING"}
                </p>

                <div className="grid grid-cols-4 gap-2">

                  <div>
                    <div
                      className="text-2xl sm:text-3xl font-serif italic"
                      style={
                        isArabic
                          ? {
                              fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                              fontWeight: 400,
                            }
                          : undefined
                      }
                    >
                      <bdi dir="ltr">{formatNumber(item.kcal)}</bdi>
                      <span
                        className="text-xs font-sans not-italic opacity-70"
                        style={
                          isArabic
                            ? {
                                fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                                fontWeight: 400,
                              }
                            : undefined
                        }
                      >
                        {" "}
                        {isArabic ? "سعرة" : "kcal"}
                      </span>
                    </div>

                    <div
                      className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1"
                      style={
                        isArabic
                          ? {
                              fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                              fontWeight: 400,
                              letterSpacing: "0.08em",
                            }
                          : undefined
                      }
                    >
                      {isArabic ? "سعرات" : "CALORIES"}
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif italic inline-flex items-baseline gap-1">
                      <bdi dir="ltr">{formatNumber(item.carbs)}</bdi>
                      <span className="text-xs font-sans not-italic opacity-70">{gramUnit}</span>
                    </div>

                    <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                      {isArabic ? "كربوهيدرات" : "CARBS"}
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif italic inline-flex items-baseline gap-1">
                      <bdi dir="ltr">{formatNumber(item.protein)}</bdi>
                      <span className="text-xs font-sans not-italic opacity-70">{gramUnit}</span>
                    </div>

                    <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                      {isArabic ? "بروتين" : "PROTEIN"}
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-serif italic inline-flex items-baseline gap-1">
                      <bdi dir="ltr">{formatNumber(item.fat)}</bdi>
                      <span className="text-xs font-sans not-italic opacity-70">{gramUnit}</span>
                    </div>

                    <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                      {isArabic ? "دهون" : "FAT"}
                    </div>
                  </div>

                </div>
              </div>

              <hr className="border-current opacity-20 my-6" />

              {/* Dynamic Origin & Allergens */}
              <div className="space-y-4">

                {itemOrigin && (
                  <div>
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-1"
                      style={
                        isArabic
                          ? {
                              fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                              fontWeight: 400,
                              letterSpacing: "0.08em",
                            }
                          : undefined
                      }
                    >
                      {isArabic ? "المصدر" : "ORIGIN"}
                    </p>

                    <p
                      className="text-lg font-serif italic"
                      style={
                        isArabic
                          ? {
                              fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                              fontWeight: 400,
                            }
                          : undefined
                      }
                    >
                      {itemOrigin}
                    </p>
                  </div>
                )}

                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-2"
                    style={
                      isArabic
                        ? {
                            fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                            fontWeight: 400,
                            letterSpacing: "0.08em",
                          }
                        : undefined
                    }
                  >
                    {isArabic ? "مسببات الحساسية" : "ALLERGENS"}
                  </p>

                  {item.allergens.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {item.allergens.map((allergen) => (
                        <div
                          key={allergen.code}
                          className="flex items-center gap-1.5"
                        >
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 border border-current opacity-80 rounded uppercase"
                            style={
                              isArabic
                                ? {
                                    fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                                    fontWeight: 400,
                                  }
                                : undefined
                            }
                          >
                            {allergen.code}
                          </span>

                          <span
                            className="text-xs font-medium opacity-90"
                            style={
                              isArabic
                                ? {
                                    fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                                    fontWeight: 400,
                                  }
                                : undefined
                            }
                          >
                            {isArabic
                              ? allergen.nameAr
                              : allergen.nameEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs italic opacity-70">
                      {isArabic ? "لا يوجد" : "None"}
                    </span>
                  )}
                </div>

                {/* Dynamic Disclaimer Notice */}
                {itemDisclaimer && (
                  <p
                    className={`font-mono uppercase tracking-widest opacity-50 pt-2 ${
                      isArabic ? "text-[11px]" : "text-[9px]"
                    }`}
                    style={
                      isArabic
                        ? {
                            fontFamily: '"IBM Plex Sans Arabic", Tajawal, system-ui, sans-serif',
                            fontWeight: 400,
                            letterSpacing: "0.05em",
                          }
                        : undefined
                    }
                  >
                    {itemDisclaimer}
                  </p>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}