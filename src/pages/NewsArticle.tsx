import React from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getArticleBySlug, articles } from "@/data/articles";
import NotFound from "@/pages/not-found";

function PhotoGallery({
  secondary,
  t,
}: {
  secondary: { src: string; captionAr: string; captionEn: string }[];
  t: (ar: string, en: string) => string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-10">
      {secondary.map((photo, idx) => (
        <motion.figure
          key={idx}
          className="group overflow-hidden rounded-xl border border-border/50 bg-muted/30"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={photo.src}
              alt={t(photo.captionAr, photo.captionEn)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <figcaption className="px-3 py-2 text-xs text-muted-foreground leading-relaxed">
            {t(photo.captionAr, photo.captionEn)}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const article = getArticleBySlug(slug ?? "");
  const isRtl = language === "ar";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  if (!article) return <NotFound />;

  const relatedArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="w-full">
      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "600px", minHeight: "360px" }}>
        <img
          src={article.mainPhoto.src}
          alt={t(article.mainPhoto.captionAr, article.mainPhoto.captionEn)}
          className="w-full h-full object-cover"
          style={{ maxHeight: "600px", minHeight: "360px", objectPosition: "center 30%" }}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category badge + title overlay */}
        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-8 lg:px-16 pb-8 pt-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-primary text-primary-foreground">
              {t(article.categoryAr, article.categoryEn)}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug drop-shadow-md">
              {t(article.titleAr, article.titleEn)}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main caption ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <p className="text-xs text-muted-foreground italic border-s-2 border-muted ps-3">
          {t(article.mainPhoto.captionAr, article.mainPhoto.captionEn)}
        </p>
      </div>

      {/* ── Meta bar ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5" aria-label="Breadcrumb">
          <Link href="/news" className="hover:text-primary transition-colors">
            {t("الأخبار والقصص", "News & Stories")}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-foreground/60 line-clamp-1">{t(article.titleAr, article.titleEn)}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            {t(article.dateAr, article.dateEn)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary" />
            {t(article.readingTimeAr, article.readingTimeEn)}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-secondary" />
            {t(article.categoryAr, article.categoryEn)}
          </span>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary / lead paragraph */}
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium mb-8 border-s-4 border-secondary ps-5">
          {t(article.summaryAr, article.summaryEn)}
        </p>

        {/* Body paragraphs — inject photo gallery after paragraph 2 */}
        {(isRtl ? article.bodyAr : article.bodyEn).map((paragraph, idx) => (
          <React.Fragment key={idx}>
            <motion.p
              className="text-base sm:text-lg text-foreground/85 leading-[1.9] mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              {paragraph}
            </motion.p>
            {idx === 1 && (
              <PhotoGallery secondary={article.secondaryPhotos} t={t} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-border" />
      </div>

      {/* ── Back link ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          <BackIcon className={`w-4 h-4 transition-transform ${isRtl ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`} />
          {t("العودة إلى الأخبار والقصص", "Back to News & Stories")}
        </Link>
      </div>

      {/* ── Related articles ── */}
      {relatedArticles.length > 0 && (
        <section className="bg-muted/30 border-t border-border py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-8">
              {t("مقالات ذات صلة", "Related Articles")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/news/${rel.slug}`}>
                  <motion.div
                    className="group rounded-xl overflow-hidden border border-border/60 bg-background hover:shadow-md transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.mainPhoto.src}
                        alt={t(rel.titleAr, rel.titleEn)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-secondary">
                        {t(rel.categoryAr, rel.categoryEn)} · {t(rel.dateAr, rel.dateEn)}
                      </span>
                      <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {t(rel.titleAr, rel.titleEn)}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                        {t(rel.summaryAr, rel.summaryEn)}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
