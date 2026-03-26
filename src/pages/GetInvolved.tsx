import React, { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle2, HeartHandshake, Briefcase, DollarSign,
  ArrowRight, ArrowLeft, Users, Megaphone, Globe,
  Pen, Laptop, Star, Quote, ChevronDown, ChevronUp,
  Handshake, Heart, Send, MapPin, Clock, BadgeCheck,
  Sparkles,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */

const PATHS = [
  {
    icon: HeartHandshake,
    color: "primary",
    titleAr: "تطوّع معنا",
    titleEn: "Volunteer With Us",
    descAr: "ساهم بوقتك ومهاراتك في خدمة المجتمع وصناعة الأثر الحقيقي.",
    descEn: "Contribute your time and skills to serve the community and create real impact.",
    anchor: "volunteer",
  },
  {
    icon: Briefcase,
    color: "secondary",
    titleAr: "شاركنا كمؤسسة",
    titleEn: "Partner With Us",
    descAr: "تعاون معنا لتوسيع نطاق الأثر وبناء شراكات مجتمعية مستدامة.",
    descEn: "Collaborate to expand impact and build lasting community partnerships.",
    anchor: "partner",
  },
  {
    icon: Heart,
    color: "primary",
    titleAr: "ادعم مالياً",
    titleEn: "Donate",
    descAr: "دعمك المالي يصل مباشرة إلى الأسر والشباب والطلبة المحتاجين.",
    descEn: "Your financial support goes directly to families, youth, and students in need.",
    anchor: "donate",
  },
];

const VOLUNTEER_ROLES = [
  {
    icon: MapPin,
    titleAr: "العمل الميداني",
    titleEn: "Field Work",
    descAr: "المشاركة المباشرة في توزيع المساعدات وتنفيذ الأنشطة الميدانية.",
    descEn: "Direct involvement in aid distribution and on-the-ground activities.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    timeAr: "مرن",
    timeEn: "Flexible",
  },
  {
    icon: Laptop,
    titleAr: "الدعم الإداري",
    titleEn: "Admin Support",
    descAr: "المساعدة في التنظيم والتوثيق والمتابعة الإدارية.",
    descEn: "Help with organization, documentation, and administrative follow-up.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    timeAr: "عن بُعد",
    timeEn: "Remote",
  },
  {
    icon: Megaphone,
    titleAr: "المحتوى والإعلام",
    titleEn: "Content & Media",
    descAr: "إنتاج المحتوى الرقمي والمرئي لمساندة قضايا الجمعية.",
    descEn: "Producing digital and visual content to support the association's causes.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
    timeAr: "عن بُعد",
    timeEn: "Remote",
  },
  {
    icon: Users,
    titleAr: "التدريب ونقل الخبرات",
    titleEn: "Training & Mentoring",
    descAr: "تقديم ورشات عمل ودورات تدريبية لأفراد المجتمع.",
    descEn: "Delivering workshops and training sessions to community members.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    timeAr: "دوري",
    timeEn: "Periodic",
  },
  {
    icon: Pen,
    titleAr: "الترجمة والتصميم",
    titleEn: "Translation & Design",
    descAr: "ترجمة المواد وتصميم المطبوعات والمحتوى البصري.",
    descEn: "Translating materials and designing print and visual content.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    timeAr: "عن بُعد",
    timeEn: "Remote",
  },
  {
    icon: Globe,
    titleAr: "الحملات والمبادرات",
    titleEn: "Campaigns & Initiatives",
    descAr: "المشاركة في تنظيم وإدارة الحملات التوعوية والمبادرات الخيرية.",
    descEn: "Participating in organizing and managing awareness campaigns and charitable initiatives.",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    timeAr: "موسمي",
    timeEn: "Seasonal",
  },
];

const JOIN_STEPS = [
  {
    ar: "أرسل طلبك",
    en: "Submit Your Application",
    descAr: "ابدأ بملء نموذج التسجيل بمعلوماتك الأساسية ومجال اهتمامك.",
    descEn: "Start by filling the registration form with your basic details and area of interest.",
    icon: Send,
  },
  {
    ar: "مراجعة الطلب",
    en: "Application Review",
    descAr: "يراجع فريقنا طلبك ويتواصل معك خلال أسبوع.",
    descEn: "Our team reviews your application and contacts you within a week.",
    icon: BadgeCheck,
  },
  {
    ar: "جلسة تعارف",
    en: "Onboarding Session",
    descAr: "نلتقي معك لمعرفة المزيد وتحديد أفضل مجال لمساهمتك.",
    descEn: "We meet to learn more and identify the best area for your contribution.",
    icon: Users,
  },
  {
    ar: "ابدأ مساهمتك",
    en: "Start Contributing",
    descAr: "تبدأ مساهمتك الفعلية وأنت جزء من عائلة زهرة المدائن.",
    descEn: "Your real contribution begins — you're now part of the Zahrat Al-Madain family.",
    icon: Star,
  },
];

const QUOTES = [
  {
    nameAr: "سارة أبو ريا",
    nameEn: "Sara Abu Raya",
    roleAr: "متطوعة في برامج التعليم",
    roleEn: "Education Programs Volunteer",
    quoteAr: "التطوع مع زهرة المدائن غيّر نظرتي للعمل الخيري. هنا لست مجرد \"متبرع\" بل شريك فعلي في صناعة التغيير.",
    quoteEn: "Volunteering with Zahrat Al-Madain changed my view of charitable work. Here I'm not just a 'donor' — I'm a real partner in making change.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    nameAr: "محمد الخطيب",
    nameEn: "Mohammad Al-Khatib",
    roleAr: "متطوع ميداني",
    roleEn: "Field Volunteer",
    quoteAr: "حين ترى أثر عملك مباشرة في وجوه الناس، تدرك أن كل لحظة تطوعت فيها كانت تستحق.",
    quoteEn: "When you see the impact of your work directly in people's faces, you realize every moment you volunteered was worth it.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    nameAr: "رنا سعيد",
    nameEn: "Rana Said",
    roleAr: "متطوعة في المحتوى الرقمي",
    roleEn: "Digital Content Volunteer",
    quoteAr: "استثمرت مهاراتي في التصميم لخدمة قضية حقيقية. هذا أكثر ما يُرضي مهنيًا وإنسانيًا.",
    quoteEn: "I invested my design skills in serving a real cause. This is the most professionally and humanly fulfilling thing I've done.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
];

const PARTNER_TYPES = [
  { icon: Globe, ar: "مؤسسات دولية", en: "International Organizations" },
  { icon: Briefcase, ar: "شركات محلية", en: "Local Companies" },
  { icon: Users, ar: "جمعيات ومنظمات", en: "NGOs & Associations" },
  { icon: BadgeCheck, ar: "جهات حكومية", en: "Government Bodies" },
  { icon: Star, ar: "مؤسسات أكاديمية", en: "Academic Institutions" },
  { icon: Heart, ar: "أفراد داعمون", en: "Individual Supporters" },
];

const GALLERY_PHOTOS = [
  `${import.meta.env.BASE_URL}images/get-involved/gallery/get-involved-gallery-01.jpg`,
  `${import.meta.env.BASE_URL}images/get-involved/gallery/get-involved-gallery-02.jpg`,
  `${import.meta.env.BASE_URL}images/get-involved/gallery/get-involved-gallery-03.jpg`,
  `${import.meta.env.BASE_URL}images/get-involved/gallery/get-involved-gallery-04.jpg`,
];

const CONTRIBUTION_AREAS_AR = [
  "العمل الميداني", "الدعم الإداري والتنظيمي", "صناعة المحتوى والإعلام الرقمي",
  "الترجمة والتصميم والعمل عن بُعد", "التدريب ونقل الخبرات", "المساندة في الحملات والمبادرات",
];
const CONTRIBUTION_AREAS_EN = [
  "Field work", "Administrative and organizational support", "Content creation and digital media",
  "Translation, design, and remote work", "Training and knowledge transfer", "Campaign and initiative support",
];

/* ─── Role Card ──────────────────────────────────────────────── */
function RoleCard({ role, idx }: { role: typeof VOLUNTEER_ROLES[0]; idx: number }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border cursor-default hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={role.img}
          alt={t(role.titleAr, role.titleEn)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Time badge */}
        <div className="absolute top-3 end-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs border border-white/20">
          <Clock className="w-3 h-3" />
          {t(role.timeAr, role.timeEn)}
        </div>
        {/* Icon */}
        <div className="absolute bottom-3 start-3 w-9 h-9 rounded-xl bg-primary/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center">
          <role.icon className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-card p-5">
        <h3 className="font-bold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors">
          {t(role.titleAr, role.titleEn)}
        </h3>
        <AnimatePresence>
          <motion.p
            key={hovered ? "desc" : "hidden"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {t(role.descAr, role.descEn)}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Quote Card ─────────────────────────────────────────────── */
function QuoteCard({ quote, idx }: { quote: typeof QUOTES[0]; idx: number }) {
  const { t } = useLanguage();
  return (
    <motion.div
      className="group relative bg-card border border-border rounded-2xl p-6 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.12, duration: 0.5 }}
    >
      <Quote className="w-8 h-8 text-secondary/40 mb-4" />
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5 italic">
        "{t(quote.quoteAr, quote.quoteEn)}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={quote.img}
          alt={t(quote.nameAr, quote.nameEn)}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-border group-hover:ring-secondary/40 transition-all"
        />
        <div>
          <p className="font-bold text-sm text-foreground">{t(quote.nameAr, quote.nameEn)}</p>
          <p className="text-xs text-muted-foreground">{t(quote.roleAr, quote.roleEn)}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function GetInvolved() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const isRtl = language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const partnershipSectionImage = `${import.meta.env.BASE_URL}images/get-involved/partnership/partnership-section.jpg`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const volunteerRef = useRef<HTMLElement>(null);
  const partnerRef   = useRef<HTMLElement>(null);

  const scrollTo = (anchor: string) => {
    if (anchor === "volunteer") volunteerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (anchor === "partner")   partnerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (anchor === "donate")    setLocation("/donate");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1200);
  };

  const areaOptions = isRtl ? CONTRIBUTION_AREAS_AR : CONTRIBUTION_AREAS_EN;

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ── */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </div>
        {/* Dot overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Gradient orb */}
        <div className="absolute top-0 end-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl z-[1]" />

        <div className="relative z-10 w-full site-shell section-hero-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              {t("انضم إلى العائلة", "Join the Family")}
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
              {t("شارك معنا", "Get Involved")}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
              {t(
                "سواء كنت متطوعًا أو شريكًا أو داعمًا — مكانك معنا. كل مساهمة تصنع أثرًا حقيقيًا.",
                "Whether you're a volunteer, partner, or supporter — there's a place for you here. Every contribution makes a real difference."
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── THREE PATHS ── */}
      <div className="bg-background py-14 border-b border-border">
        <div className="site-shell">
          <div className="grid sm:grid-cols-3 gap-5">
            {PATHS.map((path, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrollTo(path.anchor)}
                className={`group relative overflow-hidden text-start rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                  ${path.color === "primary"
                    ? "border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/8 hover:shadow-primary/10"
                    : "border-secondary/20 hover:border-secondary/50 bg-secondary/5 hover:bg-secondary/8 hover:shadow-secondary/10"
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className={`absolute top-0 end-0 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  ${path.color === "primary" ? "bg-primary/15" : "bg-secondary/15"}`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300
                  ${path.color === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                  }`}>
                  <path.icon className="w-6 h-6" />
                </div>
                <h3 className={`font-bold text-lg mb-2 transition-colors duration-200
                  ${path.color === "primary" ? "text-foreground group-hover:text-primary" : "text-foreground group-hover:text-secondary"}`}>
                  {t(path.titleAr, path.titleEn)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(path.descAr, path.descEn)}
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-semibold transition-colors
                  ${path.color === "primary" ? "text-primary" : "text-secondary"}`}>
                  {t("اعرف أكثر", "Learn more")} <ArrowIcon className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── VOLUNTEER SECTION ── */}
      <section ref={volunteerRef} className="section-space bg-background scroll-mt-24">
        <div className="site-shell">

          <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary mb-4">
                <HeartHandshake className="w-4 h-4" />
                {t("التطوع", "Volunteering")}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("وقتك يُحدث فرقًا", "Your Time Makes a Difference")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  "التطوع معنا ليس مجرد مساعدة — بل شراكة حقيقية في خدمة المجتمع وصناعة الأثر. ويمكن للمتطوعين المساهمة في مجالات متعددة وفق الخبرة والاهتمام والقدرة.",
                  "Volunteering with us isn't just about helping — it's real partnership in community service and impact-making. Volunteers can contribute in various ways based on their skills, interests, and availability."
                )}
              </p>
              {/* Quick perks */}
              <div className="flex flex-col gap-3">
                {[
                  { ar: "شهادة تطوع معتمدة", en: "Certified volunteer certificate" },
                  { ar: "تطوير مهني وشبكة علاقات", en: "Professional development & networking" },
                  { ar: "إمكانية التطوع عن بُعد", en: "Remote volunteering available" },
                  { ar: "تدريب ودعم مستمر من الفريق", en: "Ongoing training and team support" },
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">{t(perk.ar, perk.en)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: image with floating card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt={t("متطوعون", "Volunteers")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-5 -start-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{t("+200 متطوع", "200+ Volunteers")}</p>
                    <p className="text-xs text-muted-foreground">{t("يصنعون الفرق يومياً", "Making a difference daily")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Volunteer roles grid */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              {t("مجالات التطوع", "Volunteer Roles")}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VOLUNTEER_ROLES.map((role, idx) => <RoleCard key={idx} role={role} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ── */}
      <section className="section-space bg-muted/30 border-y border-border relative overflow-hidden">
        <div className="absolute -start-20 top-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -end-20 bottom-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="relative site-shell">
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/10 text-secondary border border-secondary/20">
              {t("خطوات بسيطة", "Simple Steps")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("كيف تنضم إلينا؟", "How to Join Us")}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t("العملية بسيطة وواضحة، وفريقنا موجود لدعمك في كل خطوة.", "The process is simple and clear, and our team is here to support you every step of the way.")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 start-[12.5%] end-[12.5%] h-px bg-gradient-to-r from-secondary/20 via-secondary/50 to-secondary/20 z-0" />
            {JOIN_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center group cursor-default"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
              >
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-background border-2 border-border group-hover:border-secondary transition-all duration-300 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:shadow-secondary/15 group-hover:-translate-y-1">
                    <step.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="absolute -top-1 -end-1 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-secondary transition-colors">
                  {t(step.ar, step.en)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descAr, step.descEn)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER QUOTES ── */}
      <section className="section-space bg-background">
        <div className="site-shell">
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
              {t("أصوات المتطوعين", "Volunteer Voices")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("تجارب حقيقية", "Real Experiences")}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {QUOTES.map((q, idx) => <QuoteCard key={idx} quote={q} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div className="overflow-hidden border-y border-border">
        <div className="flex">
          {GALLERY_PHOTOS.map((src, i) => (
            <div key={i} className="flex-1 h-48 sm:h-64 overflow-hidden group">
              <img
                src={src}
                alt=""
                aria-hidden
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-80 group-hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── PARTNER SECTION ── */}
      <section ref={partnerRef} className="section-space bg-muted/20 scroll-mt-24">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4">
                <Briefcase className="w-4 h-4" />
                {t("الشراكة", "Partnership")}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("معًا نصنع أثرًا أكبر", "Together We Create Greater Impact")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t(
                  "ترحب الجمعية بالتعاون مع المؤسسات والجهات الداعمة التي تشترك معها في رسالتها. نقدّم شراكات مبنية على الشفافية والأثر المشترك والقيم المتوافقة.",
                  "The association welcomes collaboration with institutions and supporters who share its mission. We offer partnerships built on transparency, shared impact, and aligned values."
                )}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PARTNER_TYPES.map((pt, i) => (
                  <div key={i}
                    className="group flex items-center gap-2 bg-card border border-border rounded-xl p-3 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                      <pt.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {t(pt.ar, pt.en)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => setLocation("/contact")}
                  variant="outline"
                  className="rounded-full px-7 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {t("تواصل معنا للشراكة", "Contact Us to Partner")}
                  <ArrowIcon className="w-4 h-4 ms-2" />
                </Button>
              </div>
            </motion.div>

            {/* Partner image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                <img
                  src={partnershipSectionImage}
                  alt={t("شراكة", "Partnership")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -top-4 -end-4 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-xl flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                <div>
                  <p className="text-xs text-primary-foreground/70">{t("شركاؤنا", "Our Partners")}</p>
                  <p className="font-black text-lg leading-none">15+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="section-space bg-background border-t border-border">
        <div className="site-shell">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary mb-3">
                  <Send className="w-4 h-4" />
                  {t("سجّل اهتمامك", "Register Your Interest")}
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t("ابدأ رحلتك معنا", "Start Your Journey With Us")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(
                    "أرسل بياناتك ومجال اهتمامك وسيتواصل معك فريقنا لترتيب الخطوات التالية.",
                    "Send your details and area of interest and our team will contact you to arrange the next steps."
                  )}
                </p>
              </div>

              {/* Contact quick cards */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: Send, labelAr: "البريد الإلكتروني", labelEn: "Email", valAr: "zahratalmadayin.ps@gmail.com", valEn: "zahratalmadayin.ps@gmail.com" },
                  { icon: Users, labelAr: "الهاتف", labelEn: "Phone", valAr: "+972 59 207 7116", valEn: "+972 59 207 7116" },
                  { icon: MapPin, labelAr: "العنوان", labelEn: "Address", valAr: "القدس، فلسطين", valEn: "Jerusalem, Palestine" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/40 rounded-xl p-3 border border-border">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t(item.labelAr, item.labelEn)}</p>
                      <p className="text-sm font-medium text-foreground" dir="ltr">{t(item.valAr, item.valEn)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border shadow-xl rounded-3xl p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-10 gap-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{t("تم الإرسال بنجاح!", "Application Sent!")}</h3>
                      <p className="text-muted-foreground max-w-sm">
                        {t("شكرًا لاهتمامك. سيتواصل معك فريقنا في أقرب وقت.", "Thank you for your interest. Our team will contact you soon.")}
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full mt-2">
                        {t("إرسال طلب جديد", "Submit Another Application")}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-foreground">{t("الاسم الكامل", "Full Name")} *</label>
                          <Input required className="h-12 bg-muted/30 rounded-xl" placeholder={t("اسمك الكامل", "Your full name")} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-foreground">{t("المدينة", "City")} *</label>
                          <Input required className="h-12 bg-muted/30 rounded-xl" placeholder={t("مثال: رام الله", "e.g. Ramallah")} />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-foreground">{t("البريد الإلكتروني", "Email")} *</label>
                          <Input required type="email" className="h-12 bg-muted/30 rounded-xl" placeholder="email@example.com" dir="ltr" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-foreground">{t("رقم الهاتف", "Phone Number")} *</label>
                          <Input required type="tel" className="h-12 bg-muted/30 rounded-xl" placeholder="+972..." dir="ltr" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">{t("مجال الاهتمام", "Area of Interest")} *</label>
                        <Select required>
                          <SelectTrigger className="h-12 bg-muted/30 rounded-xl" dir={isRtl ? "rtl" : "ltr"}>
                            <SelectValue placeholder={t("اختر مجال المساهمة", "Select a contribution area")} />
                          </SelectTrigger>
                          <SelectContent dir={isRtl ? "rtl" : "ltr"}>
                            {areaOptions.map((w, i) => (
                              <SelectItem key={i} value={`opt${i}`}>{w}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">{t("نوع المشاركة", "Participation Type")}</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { ar: "ميداني", en: "Field" },
                            { ar: "عن بُعد", en: "Remote" },
                            { ar: "كلاهما", en: "Both" },
                          ].map((opt, i) => (
                            <label key={i} className="flex items-center justify-center gap-2 border border-border rounded-xl p-2.5 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground has-[:checked]:border-primary has-[:checked]:bg-primary/8 has-[:checked]:text-primary">
                              <input type="radio" name="type" value={opt.en} className="sr-only" />
                              {t(opt.ar, opt.en)}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">{t("نبذة عن نفسك", "About Yourself")}</label>
                        <Textarea
                          className="min-h-[100px] bg-muted/30 resize-none rounded-xl"
                          placeholder={t("حدثنا عن خبراتك وما تود تقديمه...", "Tell us about your experience and what you'd like to contribute...")}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-13 text-base rounded-xl gap-2"
                      >
                        {isSubmitting ? (
                          <>{t("جاري الإرسال...", "Submitting...")} </>
                        ) : (
                          <>{t("أرسل طلب الانضمام", "Submit Application")} <Send className="w-4 h-4" /></>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-space-tight bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -end-24 -top-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="site-shell">
          <div className="section-narrow relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("ابدأ اليوم، الأثر لا ينتظر", "Start Today — Impact Can't Wait")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t(
                "أنت لست مجرد متطوع — أنت جزء من قصة تغيير حقيقية.",
                "You're not just a volunteer — you're part of a real story of change."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation("/donate")}
                className="rounded-full px-10 h-13 bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-xl hover:-translate-y-0.5 transition-all">
                {t("تبرّع الآن", "Donate Now")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => volunteerRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full px-10 h-13 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all hover:-translate-y-0.5">
                {t("تطوّع معنا", "Volunteer With Us")}
              </Button>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
