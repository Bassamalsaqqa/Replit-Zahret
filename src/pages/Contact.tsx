import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, Building2, ArrowUpRight,
  MessageSquare, ChevronDown, Send, CheckCircle2, ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/* ─── Data ─────────────────────────────────────────────────── */

const INFO_CARDS = [
  {
    icon: Mail,
    labelAr: "البريد الإلكتروني",
    labelEn: "Email",
    valueAr: "zahratalmadayin.ps@gmail.com",
    valueEn: "zahratalmadayin.ps@gmail.com",
    href: "mailto:zahratalmadayin.ps@gmail.com",
    ltrValue: true,
    color: "primary",
  },
  {
    icon: Phone,
    labelAr: "الهاتف",
    labelEn: "Phone",
    valueAr: "+972 59 207 7116",
    valueEn: "+972 59 207 7116",
    href: "tel:+972592077116",
    ltrValue: true,
    color: "secondary",
  },
  {
    icon: Building2,
    labelAr: "المقر الرئيسي",
    labelEn: "Head Office",
    valueAr: "القدس – البلدة القديمة",
    valueEn: "Jerusalem – Old City",
    href: null,
    ltrValue: false,
    color: "primary",
  },
  {
    icon: Clock,
    labelAr: "ساعات العمل",
    labelEn: "Working Hours",
    valueAr: "الأحد – الخميس: ٩ ص – ٥ م",
    valueEn: "Sun – Thu: 9:00 AM – 5:00 PM",
    href: null,
    ltrValue: false,
    color: "secondary",
  },
];

const OFFICES = [
  {
    nameAr: "المقر الرئيسي – القدس",
    nameEn: "Head Office – Jerusalem",
    addressAr: "البلدة القديمة – شارع الواد",
    addressEn: "Old City – Al-Wad Street",
    mapUrl: "https://www.openstreetmap.org/?mlat=31.7767&mlon=35.2320#map=16/31.7767/35.2320",
  },
  {
    nameAr: "فرع رام الله",
    nameEn: "Ramallah Branch",
    addressAr: "رام الله – شارع الطيرة",
    addressEn: "Ramallah – Al-Tireh Street",
    mapUrl: "https://www.openstreetmap.org/?mlat=31.9038&mlon=35.2034#map=15/31.9038/35.2034",
  },
  {
    nameAr: "فرع الرام",
    nameEn: "Al-Ram Branch",
    addressAr: "الرام – عمارة المقاصد",
    addressEn: "Al-Ram – Al-Maqased Building",
    mapUrl: "https://www.openstreetmap.org/?mlat=31.8480&mlon=35.2280#map=15/31.8480/35.2280",
  },
];

const FAQS = [
  {
    id: "volunteer",
    questionAr: "كيف يمكنني التطوع مع الجمعية؟",
    questionEn: "How can I volunteer with the association?",
    answerAr:
      "يمكنك التسجيل عبر صفحة \"شارك معنا\" أو التواصل معنا مباشرة عبر البريد الإلكتروني أو الهاتف، وسيتواصل معك فريقنا لمناقشة الفرص المتاحة وفق خبرتك واهتمامك.",
    answerEn:
      "You can register through our \"Get Involved\" page or contact us directly via email or phone. Our team will then reach out to discuss available opportunities based on your skills and interests.",
  },
  {
    id: "donate",
    questionAr: "هل يمكنني التبرع من خارج فلسطين؟",
    questionEn: "Can I donate from outside Palestine?",
    answerAr:
      "نعم، نرحب بالتبرعات من جميع أنحاء العالم عبر صفحة التبرعات الإلكترونية. للمزيد من المعلومات حول طرق التبرع، يرجى التواصل معنا مباشرة.",
    answerEn:
      "Yes, we welcome donations from around the world through our online donation page. For more information on donation methods, please contact us directly.",
  },
  {
    id: "programs",
    questionAr: "ما هي مجالات عمل الجمعية؟",
    questionEn: "What are the association's areas of work?",
    answerAr:
      "نعمل في التعليم، دعم الطلبة، تمكين الشباب، تمكين النساء، دعم الأسر، ورعاية الأشخاص ذوي الإعاقة. تهدف جميع برامجنا إلى خدمة المجتمع الفلسطيني بكرامة واستدامة.",
    answerEn:
      "We work in education, student support, youth empowerment, women empowerment, family support, and disability inclusion. All our programs aim to serve Palestinian communities with dignity and sustainability.",
  },
  {
    id: "news",
    questionAr: "كيف يمكنني متابعة أخبار الجمعية؟",
    questionEn: "How can I follow the association's news?",
    answerAr:
      "يمكنك متابعة صفحة الأخبار والقصص على الموقع، والتواصل معنا مباشرة لأي تحديثات أو مواد تعريفية عن الجمعية وأنشطتها.",
    answerEn:
      "You can follow the News & Stories page on the website and contact us directly for updates or introductory materials about the association and its activities.",
  },
];

/* ─── Sub-components ────────────────────────────────────────── */

function FAQItem({
  item,
  isOpen,
  onToggle,
  t,
}: {
  item: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
  t: (ar: string, en: string) => string;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-primary/40 bg-primary/5" : "border-border bg-card"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base leading-snug transition-colors ${
            isOpen ? "text-primary" : "text-foreground"
          }`}
        >
          {t(item.questionAr, item.questionEn)}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
              {t(item.answerAr, item.answerEn)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */

export default function Contact() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ── */}
      <div className="relative bg-muted/30 py-20 lg:py-28 border-b border-border overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Warm gradient orbs */}
        <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-16 -start-16 w-56 h-56 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/15 text-secondary border border-secondary/25"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("تواصل معنا", "Get in Touch")}
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {t("نحن هنا من أجلكم", "We Are Here for You")}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            {t(
              "يمكنكم زيارتنا أو التواصل عبر أي من القنوات التالية. نحرص على الرد خلال ٢٤ ساعة عمل.",
              "Visit us or reach out through any of the following channels. We aim to respond within 24 business hours."
            )}
          </motion.p>
        </div>
      </div>

      {/* ── QUICK INFO CARDS ── */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INFO_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 h-full"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/15 text-secondary"}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">{t(card.labelAr, card.labelEn)}</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all" dir="ltr">{t(card.valueAr, card.valueEn)}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-muted/30 h-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/15 text-secondary"}`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">{t(card.labelAr, card.labelEn)}</p>
                      <p className={`text-sm font-semibold text-foreground ${card.ltrValue ? "" : ""}`} dir={card.ltrValue ? "ltr" : undefined}>{t(card.valueAr, card.valueEn)}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM + SIDEBAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">

          {/* ── Sidebar ── */}
          <div className={`lg:col-span-2 flex flex-col gap-8 ${isRtl ? "lg:order-2" : "lg:order-1"}`}>

            {/* Quick response callout */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground"
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t("استجابة سريعة", "Quick Response")}</h3>
                  <p className="text-primary-foreground/85 text-sm leading-relaxed">
                    {t(
                      "نحرص على الرد خلال ٢٤ ساعة عمل. للاستفسارات العاجلة، يرجى الاتصال بنا مباشرة.",
                      "We aim to respond within 24 business hours. For urgent inquiries, please call us directly."
                    )}
                  </p>
                  <a
                    href="tel:+972592077116"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +972 59 207 7116
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Office locations */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-secondary" />
                {t("مكاتبنا", "Our Offices")}
              </h2>
              <div className="flex flex-col gap-3">
                {OFFICES.map((office, idx) => (
                  <motion.a
                    key={idx}
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.35 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {t(office.nameAr, office.nameEn)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t(office.addressAr, office.addressEn)}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary/60 flex-shrink-0 mt-1 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Direct email */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">{t("البريد الإلكتروني المباشر", "Direct Email")}</p>
              <a
                href="mailto:zahratalmadayin.ps@gmail.com"
                className="text-primary hover:underline font-medium"
                dir="ltr"
              >
                zahratalmadayin.ps@gmail.com
              </a>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className={`lg:col-span-3 ${isRtl ? "lg:order-1" : "lg:order-2"}`}>
            <motion.div
              className="bg-card border border-border shadow-xl shadow-primary/5 rounded-3xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {t("تم إرسال رسالتك!", "Message Sent!")}
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      {t(
                        "شكرًا لتواصلك معنا. سيتواصل معك فريقنا خلال ٢٤ ساعة عمل.",
                        "Thank you for reaching out. Our team will get back to you within 24 business hours."
                      )}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-xl"
                      onClick={() => setSubmitted(false)}
                    >
                      {t("إرسال رسالة أخرى", "Send Another Message")}
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="text-2xl font-bold text-foreground">
                      {t("أرسل لنا رسالة", "Send Us a Message")}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1.5">
                      {t("جميع الحقول المطلوبة مُشار إليها بعلامة *", "All required fields are marked with *")}
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground/80">{t("الاسم الكامل *", "Full Name *")}</label>
                        <Input required placeholder={t("أدخل اسمك الكامل", "Enter your full name")} className="h-12 bg-muted/30 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground/80">{t("البريد الإلكتروني *", "Email *")}</label>
                        <Input required type="email" placeholder={t("example@email.com", "example@email.com")} className="h-12 bg-muted/30 rounded-xl" dir="ltr" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{t("رقم الهاتف (اختياري)", "Phone Number (optional)")}</label>
                      <Input type="tel" placeholder={t("+970 / +972 ...", "+970 / +972 ...")} className="h-12 bg-muted/30 rounded-xl" dir="ltr" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{t("الموضوع *", "Subject *")}</label>
                      <Input required placeholder={t("موضوع رسالتك", "Your message subject")} className="h-12 bg-muted/30 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{t("الرسالة *", "Message *")}</label>
                      <Textarea
                        required
                        placeholder={t("اكتب رسالتك هنا...", "Write your message here...")}
                        className="min-h-[140px] resize-none bg-muted/30 rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-13 text-base rounded-xl flex items-center justify-center gap-2 mt-1 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                          />
                          {t("جاري الإرسال...", "Sending...")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t("إرسال الرسالة", "Send Message")}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAP ── */}
      <div className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {t("تجدنا هنا", "Find Us")}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {t("المنطقة المركزية: رام الله، فلسطين", "Central area: Ramallah, Palestine")}
              </p>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=31.9038&mlon=35.2034#map=13/31.9038/35.2034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline flex-shrink-0"
            >
              {t("فتح الخريطة", "Open Map")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-md" style={{ height: "420px" }}>
            <iframe
              title={t("خريطة الموقع", "Location Map")}
              src="https://www.openstreetmap.org/export/embed.html?bbox=35.1734%2C31.8738%2C35.2334%2C31.9338&layer=mapnik&marker=31.9038%2C35.2034"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Office location chips below map */}
          <div className="mt-5 flex flex-wrap gap-3">
            {OFFICES.map((office, idx) => (
              <a
                key={idx}
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/30 text-sm font-medium text-foreground transition-all duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                {t(office.nameAr, office.nameEn)}
                <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="border-t border-border relative overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/10 text-secondary border border-secondary/20">
              {t("الأسئلة الشائعة", "FAQ")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("أسئلة يُطرح كثيرًا", "Frequently Asked Questions")}
            </h2>
            <p className="text-muted-foreground">
              {t(
                "لم تجد إجابتك؟ تواصل معنا مباشرة وسنسعد بمساعدتك.",
                "Didn't find your answer? Contact us directly and we'll be happy to help."
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.id}
                item={faq}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                t={t}
              />
            ))}
          </div>

          {/* CTA below FAQ */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/get-involved">
              <Button variant="outline" className="rounded-xl px-6 h-11">
                {t("التطوع معنا", "Volunteer With Us")}
              </Button>
            </Link>
            <Link href="/donate">
              <Button className="rounded-xl px-6 h-11">
                {t("تبرّع الآن", "Donate Now")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
