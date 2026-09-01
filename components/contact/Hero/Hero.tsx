"use client";

import { useLocale } from "next-intl";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { heroData } from "./hero.data";

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

export default function Hero() {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  return (
    <section
      className="bg-[#EFE7D6] border-b border-black/10 min-h-[50vh] flex flex-col justify-center py-6 sm:py-8"
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="max-w-4xl">
          {/* Section Label */}
          <p
            className={`mb-3 sm:mb-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black/70 flex items-center gap-1.5 ${
              isArabic ? "ibm-arabic-force" : ""
            }`}
          >
            <span className="text-black/50">§</span>
            <span>
              {isArabic ? heroData.sectionLabelAr : heroData.sectionLabelEn}
            </span>
          </p>

          {/* Title */}
          <h1
            className={`text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[1.08] sm:leading-[1.05] tracking-tight text-black ${
              isArabic
                ? "el-messiri-force"
                : "font-serif italic"
            }`}
          >
            {isArabic ? "نحب نسمع منكم" : "Tell us everything"}
          </h1>

          {/* Main Description */}
          <div
            className={`mt-4 sm:mt-6 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-black/70 space-y-3 sm:space-y-4 ${
              isArabic ? "ibm-arabic-force" : ""
            }`}
          >
            {isArabic ? (
              <>
                <p>
                  هل لديك سؤال، اقتراح، أو ترغب في الاستفسار عن الوظائف المتاحة؟ نحن هنا لمساعدتك.
                </p>
                <p>
                  فريق خدمة العملاء جاهز للإجابة على جميع استفساراتك يومياً من الساعة 7 صباحاً حتى 12 منتصف الليل. يمكنك الاتصال بنا على الرقم:{" "}
                  <a
                    href="tel:22280144"
                    dir="ltr"
                    className="font-medium text-black underline underline-offset-4 hover:opacity-80 transition-opacity inline-block"
                  >
                    22280144
                  </a>
                  .
                </p>
                <p>
                  او يمكنك ارسال رسالة لنا عن طريق نموذج الاتصال التالي.
                </p>
              </>
            ) : (
              <>
                <p>
                  Have a question, feedback, or interest in joining our team? We are here to help and would love to connect with you.
                </p>
                <p>
                  Our customer service team is available every day from 7 AM to 12 Midnight. Give us a call at{" "}
                  <a
                    href="tel:22280144"
                    className="font-medium text-black underline underline-offset-4 hover:opacity-80 transition-opacity inline-block"
                  >
                    22280144
                  </a>
                  , and we’ll be happy to assist you.
                </p>
                <p>
                  Or send us a letter through this contact form.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}