"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";

import { ContactFormValues, ContactTopic } from "./contact.types";

const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  contactTopics: ContactTopic[];
}

export default function ContactForm({ contactTopics }: ContactFormProps) {
  const locale = useLocale();
  const isArabic = locale?.startsWith("ar");

  const defaultTopic = contactTopics[0]?.id || "general";

  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    topic: defaultTopic,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showWebmailFallback, setShowWebmailFallback] = useState(false);

  const selectedTopic =
    contactTopics.find((t) => t.id === form.topic) || contactTopics[0];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = isArabic ? "الاسم مطلوب" : "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = isArabic ? "البريد مطلوب" : "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = isArabic
        ? "عنوان بريد غير صالح"
        : "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = isArabic ? "الرسالة مطلوبة" : "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = isArabic
        ? "يجب أن تكون الرسالة 10 أحرف على الأقل"
        : "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getEmailContent = () => {
    const recipient = selectedTopic?.email || "info@ananas.com";
    const topicLabel = isArabic
      ? selectedTopic?.labelAr
      : selectedTopic?.labelEn;

    const subject = `[Contact Form] ${topicLabel}`;
    const rawBody = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${
      form.phone || "N/A"
    }\nTopic: ${topicLabel}\n\nMessage:\n${form.message}`;

    return { recipient, subject, rawBody };
  };

  const openMailClient = () => {
    const { recipient, subject, rawBody } = getEmailContent();
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(rawBody);

    window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const openWebmail = (provider: "gmail" | "outlook" | "yahoo") => {
    const { recipient, subject, rawBody } = getEmailContent();
    const encRecipient = encodeURIComponent(recipient);
    const encSubject = encodeURIComponent(subject);
    const encBody = encodeURIComponent(rawBody);

    let url = "";

    switch (provider) {
      case "gmail":
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encRecipient}&su=${encSubject}&body=${encBody}`;
        break;
      case "outlook":
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encRecipient}&subject=${encSubject}&body=${encBody}`;
        break;
      case "yahoo":
        url = `https://compose.mail.yahoo.com/?to=${encRecipient}&subject=${encSubject}&body=${encBody}`;
        break;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    openMailClient();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      topic: defaultTopic,
      message: "",
    });
    setErrors({});
    setShowWebmailFallback(false);
    setSubmitted(false);
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="muted-ground relative w-full bg-[#EEE7C5] py-10 sm:py-16 md:py-20 text-[#1E2021]"
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

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8 w-full z-10">
        {submitted ? (
          /* --- CONFIRMATION SCREEN --- */
          <div className="py-12 text-center max-w-xl mx-auto space-y-6">
            <h2
              className={`text-3xl sm:text-5xl text-[#1E2021] leading-tight ${
                isArabic ? "el-messiri-force" : "font-serif italic"
              }`}
            >
              {isArabic
                ? "وصلَتنا. نقرأ كل شيء."
                : "Received. We read everything."}
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed text-[#1E2021]/80 ${
                isArabic ? "ibm-arabic-force" : "font-sans"
              }`}
            >
              {isArabic
                ? "نردّ خلال يومَي عمل."
                : "We reply within two working days."}
            </p>

            <div className="pt-4 flex flex-col items-center gap-3">
              <a
                href="#fallback"
                onClick={(e) => {
                  e.preventDefault();
                  setShowWebmailFallback((prev) => !prev);
                }}
                className={`text-xs text-[#1E2021]/70 hover:text-[#1E2021] underline cursor-pointer ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic
                  ? "لم يفتح تطبيق البريد الإلكتروني؟ افتح عبر المتصفح"
                  : "didn't open mail app? Open in browser"}
              </a>

              {showWebmailFallback && (
                <div
                  className={`flex items-center justify-center gap-2 pt-1 text-xs text-[#1E2021]/70 ${
                    isArabic ? "ibm-arabic-force" : "font-mono"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openWebmail("gmail")}
                    className="underline hover:text-[#1E2021]"
                  >
                    Gmail
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => openWebmail("outlook")}
                    className="underline hover:text-[#1E2021]"
                  >
                    Outlook
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => openWebmail("yahoo")}
                    className="underline hover:text-[#1E2021]"
                  >
                    Yahoo
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleReset}
                className={`mt-6 rounded-[4px] border border-[#1E2021]/30 px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition hover:border-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "إرسال رسالة أخرى" : "SEND ANOTHER MESSAGE"}
              </button>
            </div>
          </div>
        ) : (
          /* --- FORM --- */
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
            {/* Name */}
            <div>
              <label
                className={`mb-2 block text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "الاسم" : "NAME"}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                } ${
                  errors.name
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#1E2021]/20 focus:border-[#1E2021]/50"
                }`}
              />
              {errors.name && (
                <p
                  className={`mt-1 text-[10px] text-red-600 ${
                    isArabic ? "ibm-arabic-force" : "font-mono"
                  }`}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className={`mb-2 block text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "البريد الإلكتروني" : "EMAIL"}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                } ${
                  errors.email
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#1E2021]/20 focus:border-[#1E2021]/50"
                }`}
              />
              {errors.email && (
                <p
                  className={`mt-1 text-[10px] text-red-600 ${
                    isArabic ? "ibm-arabic-force" : "font-mono"
                  }`}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                className={`mb-2 block text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "الهاتف — اختياري" : "PHONE — OPTIONAL"}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full rounded-[4px] border border-[#1E2021]/20 bg-transparent px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm outline-none transition focus:border-[#1E2021]/50 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              />
            </div>

            {/* Topic Selection */}
            <div>
              <label
                className={`mb-3 block text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "الموضوع" : "TOPIC"}
              </label>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {contactTopics.map((topic) => {
                  const isActive = form.topic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, topic: topic.id }))
                      }
                      className={`rounded-full border px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all ${
                        isArabic ? "ibm-arabic-force" : "font-mono"
                      } ${
                        isActive
                          ? "border-[#1E2021] bg-[#1E2021] text-[#EEE7C5] font-semibold shadow-sm"
                          : "border-[#1E2021]/30 bg-transparent text-[#1E2021] hover:border-[#1E2021]/60"
                      }`}
                    >
                      {isArabic ? topic.labelAr : topic.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                className={`mb-2 block text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#1E2021]/70 ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                {isArabic ? "الرسالة" : "MESSAGE"}
              </label>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent p-3.5 text-xs sm:text-sm outline-none transition resize-y ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                } ${
                  errors.message
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#1E2021]/20 focus:border-[#1E2021]/50"
                }`}
              />
              {errors.message && (
                <p
                  className={`mt-1 text-[10px] text-red-600 ${
                    isArabic ? "ibm-arabic-force" : "font-mono"
                  }`}
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-[4px] bg-[#F18F36] text-white hover:bg-black hover:text-[#E5AE00] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 active:scale-[0.99] ${
                  isArabic ? "ibm-arabic-force" : "font-mono"
                }`}
              >
                <span>{isArabic ? "إرسال الرسالة" : "SEND MESSAGE"}</span>
                <span className="text-sm font-normal">→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}