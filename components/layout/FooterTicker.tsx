"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function FooterTicker() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Footer");
  const [time, setTime] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kuwait",
        }).format(new Date())
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    `${t("ticker.live")} • ${time}`,
    `${t("ticker.location")} • 47°C`,
    `${t("ticker.announcement")}`,
    `${t("ticker.location")} • 47°C`,
    `${t("ticker.announcement")}`,
  ];

  useEffect(() => {
    controls.start({
      x: isRtl ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, isRtl]);

  return (
    // We force dir="ltr" on the layout container so Framer Motion's X axis math 
    // stays consistent, but we give the text elements dir="rtl" if Arabic.
    <div className="overflow-hidden border-b border-black/10 bg-[#E3E27F]" dir="ltr">
      <motion.div
        className="flex w-max items-center gap-8 py-3"
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: isRtl ? ["-50%", "0%"] : ["0%", "-50%"],
            transition: {
              duration: 35,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          })
        }
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            dir={isRtl ? "rtl" : "ltr"}
            className="flex items-center gap-3 whitespace-nowrap text-[11px] font-medium uppercase tracking-[3px] text-[#2F3B1C] lg:text-xs"
          >
            <span className="text-[9px] leading-none text-[#7B7A62]">✦</span>
            <span
              style={
                isRtl
                  ? {
                      fontFamily: '"Kawkab Mono", monospace',
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "21px",
                    }
                  : {
                      fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
                      fontWeight: 400,
                      fontSize: "11px",
                      lineHeight: "17px",
                    }
              }
            >
              {item}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}