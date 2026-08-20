"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLocale } from "next-intl";

import { ProductTickerData } from "./product-ticker.types";

interface Props {
  data: ProductTickerData;
}

export default function ProductTicker({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const controls = useAnimation();

  const items = data.items.map((item) =>
    isArabic ? item.textAr : item.textEn
  );

  useEffect(() => {
    controls.start({
      x: isArabic ? ["0%", "50%"] : ["0%", "-50%"],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls, isArabic]);

  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#E3E27F] py-5">
      <div className="flex w-max" dir={isArabic ? "rtl" : "ltr"}>
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap px-8 text-[#2F3B1C]"
          animate={controls}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() =>
            controls.start({
              x: isArabic ? ["0%", "50%"] : ["0%", "-50%"],
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            })
          }
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 font-serif text-[2.4rem] italic leading-none tracking-[-0.04em] text-[#2F3B1C]"
            >
              <span className="text-[1.1rem] leading-none text-[#7B7A62]">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}