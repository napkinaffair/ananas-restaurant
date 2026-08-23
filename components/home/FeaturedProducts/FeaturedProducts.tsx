"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { FeaturedProductsData } from "./featured.types";

interface Props {
  data: FeaturedProductsData;
}

export default function FeaturedProducts({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className="muted-ground relative overflow-hidden py-12 sm:py-20 lg:py-32"
      style={{ backgroundColor: "#F3ECD8" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1900px] px-4 sm:px-8 lg:px-9">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`mb-8 sm:mb-10 lg:mb-16 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <p
            className="mb-2 sm:mb-4 uppercase tracking-[4px] sm:tracking-[6px] text-[#C77C3E]"
            style={
              isArabic
                ? {
                    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "11px",
                    lineHeight: "17px",
                    letterSpacing: 0,
                    color: "#C77C3E",
                  }
                : undefined
            }
          >
            {isArabic ? data.sectionLabelAr : data.sectionLabelEn}
          </p>

          <h2
            className={
              isArabic
                ? "max-w-[720px] leading-[0.95] text-[#202020] text-3xl sm:text-5xl lg:text-7xl"
                : "max-w-[720px] font-serif leading-[0.95] text-[#202020] text-3xl sm:text-5xl lg:text-7xl"
            }
            style={
              isArabic
                ? {
                    fontFamily: '"El Messiri", serif',
                    fontWeight: 400,
                    fontStyle: "normal",
                    letterSpacing: "-0.04em",
                  }
                : undefined
            }
          >
            {isArabic ? data.headingAr : data.headingEn}
          </h2>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-6
            md:gap-8
          "
        >
          {data.products.map((product) => {
            // Use the English title as the canonical product query value so
            // the menu page can reliably match items across locales.
            const targetTitle = product.titleEn || product.titleAr;

            return (
              <Link
                href={`/menu?product=${encodeURIComponent(targetTitle)}`}
                key={product.id}
                className="group overflow-hidden"
              >
                <div className="relative h-[220px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={isArabic ? product.titleAr : product.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div
                  className={`absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h3
                        className={
                          isArabic
                            ? "text-2xl sm:text-3xl lg:text-[42px] leading-tight sm:leading-none"
                            : "font-serif text-2xl sm:text-3xl lg:text-[42px] leading-tight sm:leading-none"
                        }
                        style={
                          isArabic
                            ? {
                                fontFamily: '"Aref Ruqaa", serif',
                                fontWeight: 400,
                                fontStyle: "normal",
                                letterSpacing: 0,
                              }
                            : undefined
                        }
                      >
                        {isArabic ? product.titleAr : product.titleEn}
                      </h3>

                      <p
                        className="truncate opacity-80"
                        style={
                          isArabic
                            ? {
                                fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                                fontWeight: 400,
                                fontStyle: "normal",
                                fontSize: "11px",
                                lineHeight: "17px",
                                letterSpacing: 0,
                                color: "#FFFFFF",
                              }
                            : undefined
                        }
                      >
                        {isArabic ? product.categoryAr : product.categoryEn}
                      </p>
                    </div>

                    <p
                      className="relative inline-flex h-[17px] w-[72px] shrink-0 items-center justify-end overflow-hidden whitespace-nowrap"
                      style={
                        isArabic
                          ? {
                              fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                              fontWeight: 400,
                              fontStyle: "normal",
                              fontSize: "11px",
                              lineHeight: "17px",
                              letterSpacing: 0,
                              color: "#E3E27E",
                            }
                          : undefined
                      }
                    >
                      <span
                        className="block opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                        style={{
                          color: "#E3E27E",
                          fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        —
                      </span>

                      <span
                        className="absolute inset-0 flex items-center justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          color: "#E3E27E",
                          fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        VIEW →
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}