"use client";

import { useState } from "react";
import Image from "next/image";
import { El_Messiri } from "next/font/google";

const headingArabic = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

import { MenuIntroData } from "./menuIntro.types";

interface MenuIntroProps {
  locale?: string;
  data: MenuIntroData;
}

const DOT_COLORS = ["#7F9333", "#F18F36", "#E3E27F", "#FFC0B8"];

export default function MenuIntro({
  locale = "en",
  data,
}: MenuIntroProps) {
  const isArabic = locale === "ar";

  const [active, setActive] = useState(data.items[0]);

  return (
    <>
      {isArabic && (
        <style>{`.menuintro-el-messiri, .menuintro-el-messiri * { font-family: "El Messiri", serif !important; }`}</style>
      )}

      <section
        className={`muted-ground-dark relative overflow-hidden text-[#F8F4EC] py-12 lg:py-16 ${
          isArabic ? "menuintro-el-messiri" : ""
        }`}
        style={{ backgroundColor: "#3B471B" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="relative z-10 mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:grid lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:h-[75vh] lg:max-h-[700px] items-stretch gap-8">

            {/* Mobile Header */}
            <div className="lg:hidden flex-shrink-0">
              <div
                className={`flex items-center gap-4 mb-3 text-[10px] uppercase tracking-[3px] opacity-75 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                <span className="text-[#C7D442] font-mono">
                  {data.sectionNumber}
                </span>
                <span className="text-white/60">
                  {isArabic ? data.sectionTitleAr : data.sectionTitleEn}
                </span>
              </div>

              <h2
                className={`font-serif italic text-3xl sm:text-4xl leading-[1.15] tracking-[-0.01em] text-white ${
                  isArabic ? "text-right" : "text-left"
                } ${isArabic ? headingArabic.className : ""}`}
                style={isArabic ? { fontFamily: '"El Messiri", serif' } : undefined}
              >
                {isArabic ? data.headingLine1Ar : data.headingLine1En}
                <br />
                <span className="text-[#C7D442]">
                  {isArabic ? data.headingLine2Ar : data.headingLine2En}
                </span>
              </h2>
            </div>

            {/* Image */}
            <div className="w-full lg:h-full lg:max-h-[420px] flex flex-col justify-center items-center lg:items-stretch lg:order-2">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full aspect-[1.2] sm:aspect-[1.5] lg:aspect-auto lg:h-full overflow-hidden shadow-xl rounded-sm"
              >
                <Image
                  src={active.image}
                  alt={isArabic ? active.titleAr : active.titleEn}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div
                className={`mt-3 text-[10px] tracking-wide w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                <span className="text-[#C7D442] font-mono uppercase block text-[9px] opacity-75">
                  {isArabic ? `طبق ${active.number}` : `PLATE ${active.number}`}
                </span>

                <span className="text-white/80 font-serif italic text-sm mt-0.5 block">
                  {isArabic ? active.captionAr : active.captionEn}
                </span>
              </div>
            </div>

            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-full min-h-0 lg:order-1"
            >
              <div className="hidden lg:block flex-shrink-0">
                <div
                  className={`flex items-center gap-4 mb-4 text-[10px] uppercase tracking-[3px] opacity-75 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-[#C7D442] font-mono">
                    {data.sectionNumber}
                  </span>

                  <span className="text-white/60">
                    {isArabic ? data.sectionTitleAr : data.sectionTitleEn}
                  </span>
                </div>

                <h2
                  className={`font-serif italic lg:text-[46px] leading-[1.15] tracking-[-0.01em] text-white ${
                    isArabic ? "text-right" : "text-left"
                  } ${isArabic ? headingArabic.className : ""}`}
                  style={isArabic ? { fontFamily: '"El Messiri", serif' } : undefined}
                >
                  {isArabic ? data.headingLine1Ar : data.headingLine1En}
                  <br />

                  <span className="text-[#C7D442]">
                    {isArabic ? data.headingLine2Ar : data.headingLine2En}
                  </span>
                </h2>
              </div>

              <div className="flex-1 min-h-0 mt-2 lg:mt-8 overflow-y-auto max-h-[320px] lg:max-h-none pr-1 pl-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="divide-y divide-white/10 border-t border-b border-white/10">
                  {data.items.map((item, index) => {
                    const isCurrentActive = active.id === item.id;
                    const dotColor = DOT_COLORS[index % DOT_COLORS.length];

                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActive(item)}
                        onClick={() => setActive(item)}
                        className={`flex w-full items-center justify-between py-4 px-4 sm:px-5 transition-all duration-300 group rounded-none ${
                          isCurrentActive
                            ? "bg-white/[0.08] backdrop-blur-[2px]"
                            : "hover:bg-white/[0.05]"
                        }`}
                        style={{ textAlign: isArabic ? "right" : "left" }}
                      >
                        <div className="flex items-center gap-5 sm:gap-6">
                          <span
                            className={`text-[10px] font-mono transition-opacity duration-300 w-5 ${
                              isCurrentActive ? "opacity-90 text-white" : "opacity-40 text-white"
                            }`}
                          >
                            {item.number}
                          </span>

                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-300"
                            style={{
                              backgroundColor: dotColor,
                              transform: isCurrentActive ? "scale(1.25)" : "scale(1)",
                            }}
                          />

                          <div className="flex flex-col">
                            <span
                              className={`font-serif text-lg sm:text-xl transition-colors duration-200 ${
                                isCurrentActive
                                  ? "text-white"
                                  : "text-white/70 group-hover:text-white"
                              }`}
                            >
                              {isArabic ? item.titleAr : item.titleEn}
                            </span>

                            {item.descriptionEn && (
                              <span
                                className={`text-[11px] font-sans tracking-wide mt-0.5 max-w-[320px] line-clamp-1 transition-colors duration-200 ${
                                  isCurrentActive
                                    ? "text-white/70"
                                    : "text-white/40 group-hover:text-white/60"
                                }`}
                              >
                                {isArabic
                                  ? item.descriptionAr
                                  : item.descriptionEn}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className="text-sm font-mono transition-all duration-300"
                          style={{
                            color: isCurrentActive ? dotColor : undefined,
                            opacity: isCurrentActive ? 1 : undefined,
                            transform: isCurrentActive ? "translateX(4px)" : undefined,
                          }}
                        >
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className={`mt-6 pt-2 flex-shrink-0 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                <Link
                  href="/menu"
                  className="inline-flex w-full sm:w-auto justify-center items-center border border-transparent rounded-md px-6 py-3 text-[10px] uppercase tracking-[4px] bg-[#E3E27F] text-[#000000] transition-all duration-300 hover:bg-[#F18F37] hover:text-[#FFFFFF]"
                >
                  {isArabic ? data.buttonAr : data.buttonEn}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}