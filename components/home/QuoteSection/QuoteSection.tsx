"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { QuoteSectionData } from "./quote.types";

interface Props {
  data: QuoteSectionData;
}

export default function QuoteSection({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className="muted-ground relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ backgroundColor: "#F1EAC7" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-start gap-10 lg:grid-cols-[170px_1fr] lg:gap-16 xl:grid-cols-[190px_1fr]">

          {/* Left Metadata Column */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-2 sm:pt-4"
          >
            <p className="font-mono text-[11px] font-normal uppercase leading-[2.4] tracking-[0.24em] text-[#3F4B26]/85 sm:text-[12px]">
              {isArabic ? data.labelAr : data.labelEn}
            </p>

            <p className="mt-1 font-mono text-[11px] font-normal uppercase tracking-[0.24em] text-[#DD9948] sm:text-[12px]">
              {isArabic ? data.dateAr : data.dateEn}
            </p>
          </motion.div>

          {/* Right Quote Body Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex w-full flex-col items-start"
          >
            {/* Main Italic Display Serif Quote */}
            <h2 className="w-full font-serif text-[42px] font-normal italic leading-[1.08] tracking-[-0.02em] text-[#1F2021] sm:text-[56px] md:text-[68px] lg:text-[80px] xl:text-[88px]">
              <span
                className={`font-serif text-[#DD9948] select-none ${
                  isArabic ? "ml-2 sm:ml-4" : "mr-2 sm:mr-3"
                }`}
              >
                {isArabic ? "«" : "“"}
              </span>

              {isArabic ? data.quoteAr : data.quoteEn}

              <span
                className={`font-serif text-[#DD9948] select-none ${
                  isArabic ? "mr-2 sm:mr-4" : "ml-2 sm:ml-3"
                }`}
              >
                {isArabic ? "»" : "”"}
              </span>
            </h2>

            {/* Sub-attribution */}
            <p className="mt-10 font-mono text-[11px] font-normal uppercase tracking-[0.24em] text-[#3F4B26]/75 sm:mt-14 sm:text-[12px]">
              <span className="tracking-normal text-[#3F4B26]/50">---&nbsp;&nbsp;</span>
              {isArabic ? data.footerAr : data.footerEn}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}