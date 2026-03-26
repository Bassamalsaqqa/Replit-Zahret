import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { articles } from "@/data/articles";

export default function News() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full flex flex-col">
      {/* ── Page header ── */}
      <div className="bg-muted/30 py-16 lg:py-24 border-b border-border text-center relative overflow-hidden">
        {/* subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 relative">
          <motion.span
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/10 text-secondary border border-secondary/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("آخر المستجدات", "Latest Updates")}
          </motion.span>
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-foreground mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {t("الأخبار والقصص", "News & Stories")}
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {t(
              "تابع آخر مبادراتنا الميدانية، حملات الدعم، الأنشطة المجتمعية، وقصص الأثر التي تعبّر عن حضورنا ورسالتنا.",
              "Follow our latest field initiatives, support campaigns, community activities, and impact stories reflecting our presence and mission."
            )}
          </motion.p>
        </div>
      </div>

      {/* ── Featured article (first card — full width) ── */}
      <div className="site-shell pt-14 pb-6 w-full">
        {articles[0] && (
          <Link href={`/news/${articles[0].slug}`}>
            <motion.div
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-border/50 hover:shadow-xl transition-all duration-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/2 aspect-video md:aspect-auto md:min-h-[340px] overflow-hidden flex-shrink-0">
                  <img
                    src={articles[0].mainPhoto.src}
                    alt={t(articles[0].titleAr, articles[0].titleEn)}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                </div>
                {/* Content */}
                <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-background">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {t(articles[0].categoryAr, articles[0].categoryEn)}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {t(articles[0].dateAr, articles[0].dateEn)}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-4 group-hover:text-primary transition-colors">
                    {t(articles[0].titleAr, articles[0].titleEn)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {t(articles[0].summaryAr, articles[0].summaryEn)}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>{t("اقرأ المزيد", "Read More")}</span>
                    <ArrowIcon className={`w-4 h-4 transition-transform ${isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* ── Remaining articles grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.slice(1).map((article, idx) => (
            <Link key={article.slug} href={`/news/${article.slug}`}>
              <motion.div
                className="group rounded-xl overflow-hidden border border-border/60 bg-background cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                {/* Cover image */}
                <div className="aspect-video overflow-hidden flex-shrink-0">
                  <img
                    src={article.mainPhoto.src}
                    alt={t(article.titleAr, article.titleEn)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-secondary">
                      <Tag className="w-3.5 h-3.5" />
                      {t(article.categoryAr, article.categoryEn)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {t(article.dateAr, article.dateEn)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {t(article.readingTimeAr, article.readingTimeEn)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold leading-snug text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-grow">
                    {t(article.titleAr, article.titleEn)}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {t(article.summaryAr, article.summaryEn)}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto">
                    <span>{t("اقرأ المزيد", "Read More")}</span>
                    <ArrowIcon className={`w-4 h-4 transition-transform ${isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* ── Coming soon notice ── */}
        <div className="mt-14 text-center">
          <p className="text-muted-foreground inline-flex items-center gap-2 bg-muted/60 px-6 py-3 rounded-full border border-border text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
            {t("المزيد من الأخبار والقصص قادمة قريبًا...", "More news and stories coming soon...")}
          </p>
        </div>
      </div>
    </div>
  );
}
