import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart, Target, Eye, MapPin, Building, CheckCircle2,
  Users, BookOpen, Handshake, Scale, Leaf, Shield,
  ArrowRight, ArrowLeft, ChevronRight, Star, Calendar,
  Award, Globe, TrendingUp,
} from "lucide-react";

/* ─── Animated counter hook ─────────────────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Data ──────────────────────────────────────────────────── */

const STATS = [
  { icon: Calendar, numAr: "15+", numEn: "15+", labelAr: "عام من العطاء", labelEn: "Years of Service", raw: 15, suffix: "+" },
  { icon: Users,    numAr: "5٬000+", numEn: "5,000+", labelAr: "أسرة مستفيدة", labelEn: "Families Served", raw: 5000, suffix: "+" },
  { icon: BookOpen, numAr: "12+", numEn: "12+", labelAr: "برنامج نشط", labelEn: "Active Programs", raw: 12, suffix: "+" },
  { icon: Heart,    numAr: "200+", numEn: "200+", labelAr: "متطوع ومتطوعة", labelEn: "Volunteers", raw: 200, suffix: "+" },
];

const VALUES = [
  { icon: Shield,    ar: "الكرامة الإنسانية", en: "Human Dignity",        descAr: "نضع احترام الإنسان وكرامته في قلب كل ما نفعل.", descEn: "We place respect for people at the heart of everything we do." },
  { icon: Eye,       ar: "الشفافية",         en: "Transparency",          descAr: "نعمل بوضوح ومساءلة تجاه مجتمعنا وشركائنا.", descEn: "We operate with clarity and accountability toward our community and partners." },
  { icon: Handshake, ar: "الشراكة",          en: "Partnership",           descAr: "نؤمن أن الأثر الحقيقي يُبنى بالتعاون لا بالعمل المنفرد.", descEn: "We believe lasting impact is built through collaboration, not isolation." },
  { icon: Scale,     ar: "العدالة",          en: "Justice",               descAr: "نسعى نحو فرص متكافئة للجميع دون تمييز أو إقصاء.", descEn: "We strive for equal opportunities for all without discrimination." },
  { icon: Leaf,      ar: "الاستدامة",        en: "Sustainability",        descAr: "نبني حلولاً تدوم بعيدًا عن التدخلات المؤقتة.", descEn: "We build solutions that outlast short-term interventions." },
  { icon: Globe,     ar: "المسؤولية المجتمعية", en: "Social Responsibility", descAr: "خدمة المجتمع ليست خيارًا — إنها التزام راسخ.", descEn: "Serving the community isn't a choice — it's a firm commitment." },
];

const TIMELINE = [
  { year: "2008", ar: "التأسيس في القدس", en: "Founded in Jerusalem", descAr: "تأسست الجمعية بإيمان مجموعة من الفلسطينيين بأهمية العمل المؤسسي.", descEn: "Established by a group of Palestinians committed to organized civic action." },
  { year: "2010", ar: "دعم التعليم", en: "Education Support", descAr: "إطلاق أول برامج دعم الطلبة والمستلزمات التعليمية.", descEn: "Launching the first student support and educational supplies programs." },
  { year: "2013", ar: "فرع رام الله", en: "Ramallah Branch", descAr: "افتتاح فرع رام الله لتوسيع نطاق الخدمات في الضفة الغربية.", descEn: "Opening the Ramallah branch to expand services across the West Bank." },
  { year: "2016", ar: "تمكين النساء", en: "Women's Empowerment", descAr: "إطلاق برامج مخصصة للتدريب المهني وتمكين المرأة اقتصاديًا.", descEn: "Launching dedicated programs for vocational training and women's economic empowerment." },
  { year: "2018", ar: "الذكرى العاشرة", en: "10th Anniversary", descAr: "افتتاح فرع الرام واستعراض عقد من الإنجازات والشراكات.", descEn: "Opening the Al-Ram branch and celebrating a decade of achievements and partnerships." },
  { year: "2023", ar: "الدمج والإعاقة", en: "Disability Inclusion", descAr: "إطلاق برنامج الدمج المجتمعي للأشخاص ذوي الإعاقة.", descEn: "Launching the community inclusion program for persons with disabilities." },
];

const TEAM = [
  { nameAr: "أ. سمير العمر", nameEn: "Samir Al-Omar", roleAr: "رئيس مجلس الإدارة", roleEn: "Board Chairperson", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { nameAr: "م. لينا حمدان", nameEn: "Lina Hamdan", roleAr: "المديرة التنفيذية", roleEn: "Executive Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { nameAr: "أ. خالد أبو شاهين", nameEn: "Khalid Abu Shahin", roleAr: "منسق البرامج", roleEn: "Programs Coordinator", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { nameAr: "أ. منى السعيد", nameEn: "Mona Al-Said", roleAr: "مديرة التطوع والشراكات", roleEn: "Volunteer & Partnerships", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
];

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ stat, idx }: { stat: typeof STATS[0]; idx: number }) {
  const { t } = useLanguage();
  const { count, ref } = useCounter(stat.raw);

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex flex-col gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center transition-colors duration-300 flex-shrink-0">
          <stat.icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-4xl font-black text-primary leading-none mb-1">
            {count.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-sm font-semibold text-muted-foreground">{t(stat.labelAr, stat.labelEn)}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Value Card ─────────────────────────────────────────────── */
function ValueCard({ val, idx }: { val: typeof VALUES[0]; idx: number }) {
  const { t } = useLanguage();

  return (
    <motion.div
      className="group relative flex min-h-[190px] cursor-default flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.4 }}
    >
      {/* Gradient fill on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="relative flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 flex-shrink-0">
          <val.icon className="w-5 h-5" />
        </div>
        <div className="space-y-3">
          <p className="font-bold text-foreground text-base">{t(val.ar, val.en)}</p>
          <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {t(val.descAr, val.descEn)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Team Card ─────────────────────────────────────────────── */
function TeamCard({ member, idx }: { member: typeof TEAM[0]; idx: number }) {
  const { t } = useLanguage();

  return (
    <motion.div
      className="group flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
    >
      <div className="relative mb-4 w-28 h-28 sm:w-32 sm:h-32">
        {/* Ring that glows on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 group-hover:border-primary/60 group-hover:scale-110 transition-all duration-500" />
        <div className="absolute inset-0 rounded-full border border-secondary/20 group-hover:border-secondary/40 group-hover:scale-125 transition-all duration-700" />
        <img
          src={member.img}
          alt={t(member.nameAr, member.nameEn)}
          className="w-full h-full object-cover rounded-full ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <h4 className="font-bold text-foreground text-base group-hover:text-primary transition-colors duration-200">
        {t(member.nameAr, member.nameEn)}
      </h4>
      <p className="text-sm text-muted-foreground mt-1">{t(member.roleAr, member.roleEn)}</p>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function About() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const isRtl = language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ── */}
      <div className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full site-shell section-hero-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              {t("جمعية زهرة المدائن", "Zahrat Al-Madain Association")}
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
              {t("من نحن", "About Us")}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t(
                "تعرّف على مسيرتنا ورؤيتنا وقيمنا في خدمة المجتمع الفلسطيني.",
                "Learn about our journey, vision, and values in serving the Palestinian community."
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── IMPACT STATS ── */}
      <div className="bg-background border-b border-border">
        <div className="site-shell section-space-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => <StatCard key={idx} stat={stat} idx={idx} />)}
          </div>
        </div>
      </div>

      {/* ── STORY ── */}
      <section className="section-space bg-background">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Images stacked with offset */}
            <motion.div
              className={`relative ${isRtl ? "lg:order-2" : "lg:order-1"}`}
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                    alt={t("أطفال في الفصل الدراسي", "Children in classroom")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                </div>
                {/* Inset second image */}
                <div className="absolute -bottom-6 -end-6 w-40 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-background group">
                  <img
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80"
                    alt={t("مجتمع", "Community")}
                    className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Founded badge */}
                <div className="absolute top-4 start-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {t("منذ ٢٠٠٨", "Since 2008")}
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className={`${isRtl ? "lg:order-1" : "lg:order-2"} flex flex-col gap-6`}
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary mb-3">
                  <Heart className="w-4 h-4" />
                  {t("قصتنا", "Our Story")}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                  {t("رحلة من القدس إلى كل فلسطين", "A Journey from Jerusalem to All of Palestine")}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(
                  "تأسست جمعية زهرة المدائن عام 2008 في القدس الشريف، انطلاقًا من إيمان مجموعة من الفلسطينيين بأهمية العمل المؤسسي المنظم لخدمة المجتمع وإحداث تغيير مستدام.",
                  "Zahrat Al-Madain was established in Jerusalem in 2008, inspired by the belief in the power of organized civic action to serve the community and create lasting change."
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "منذ تأسيسها، عملت الجمعية على تطوير مبادرات تستجيب للاحتياجات الفعلية للفئات الأكثر حاجةً، مع تركيز خاص على الشباب والنساء والأطفال والأسر الهشّة. نؤمن أن التنمية الحقيقية لا تتحقق بالحلول المؤقتة وحدها، بل من خلال الجمع بين الإغاثة الفورية وبناء القدرات والشراكات المجتمعية طويلة الأمد.",
                  "Since its founding, the association has developed initiatives responding to the real needs of vulnerable groups, especially youth, women, children, and struggling families. We believe real development combines immediate relief, capacity building, and long-term community partnership."
                )}
              </p>
              <div className="flex gap-3 flex-wrap mt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium border border-border">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {t("القدس والضفة الغربية", "Jerusalem & West Bank")}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium border border-border">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {t("نمو مستمر منذ ٢٠٠٨", "Growing since 2008")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="section-space bg-muted/40 border-y border-border">
        <div className="site-shell">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{t("رؤيتنا ورسالتنا", "Vision & Mission")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("المبادئ التي تقودنا في كل خطوة نخطوها.", "The principles that guide every step we take.")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vision */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-10 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 end-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("رؤيتنا", "Our Vision")}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t(
                    "مجتمع فلسطيني متمكّن ومزدهر، يقوده شباب واعٍ ونساء فاعلات، وتعيش فيه الأسر بكرامة وعدالة وفرص تنمية مستدامة.",
                    "A thriving and empowered Palestinian society led by engaged youth and active women, where families live with dignity, fairness, and access to sustainable opportunities."
                  )}
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 lg:p-10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }}
              />
              <div className="absolute -bottom-10 -start-10 w-52 h-52 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t("رسالتنا", "Our Mission")}</h3>
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  {t(
                    "تمكين المجتمع الفلسطيني عبر برامج تنموية وإنسانية متكاملة تستجيب للاحتياجات الفعلية، وتعزز التعليم والتمكين والعمل التطوعي والشراكة المجتمعية.",
                    "To strengthen Palestinian communities through integrated development and humanitarian programs that respond to real needs while advancing education, empowerment, volunteerism, and community partnership."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-space bg-background">
        <div className="site-shell">
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/10 text-secondary border border-secondary/20">
              {t("ما يميّزنا", "What Defines Us")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{t("قيمنا الأساسية", "Our Core Values")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("تظهر القيم بوضوح، ويضيف المرور عليها لمسة تفاعلية خفيفة.", "The values are visible by default, with hover adding a light interactive accent.")}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {VALUES.map((val, idx) => <ValueCard key={idx} val={val} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div className="overflow-hidden border-y border-border">
        <div className="flex gap-0">
          {[
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
          ].map((src, i) => (
            <div key={i} className="flex-1 overflow-hidden h-48 sm:h-64 group">
              <img
                src={src}
                alt=""
                aria-hidden
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <section className="section-space bg-muted/30">
        <div className="site-shell">
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
              {t("محطاتنا", "Our Milestones")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{t("رحلة الإنجازات", "A Journey of Achievements")}</h2>
          </motion.div>

          {/* Timeline – interactive tabs + content */}
          <div className="flex flex-col gap-8">
            {/* Year selector */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
              {TIMELINE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTimeline(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                    activeTimeline === idx
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            {/* Content card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimeline}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto w-full"
              >
                <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 shadow-lg text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
                    <Award className="w-7 h-7" />
                  </div>
                  <div className="text-5xl font-black text-primary/20 mb-2">{TIMELINE[activeTimeline].year}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {t(TIMELINE[activeTimeline].ar, TIMELINE[activeTimeline].en)}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(TIMELINE[activeTimeline].descAr, TIMELINE[activeTimeline].descEn)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTimeline(i => Math.max(0, i - 1))}
                disabled={activeTimeline === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted hover:border-primary/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5 items-center">
                {TIMELINE.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTimeline(i)}
                    className={`rounded-full transition-all duration-300 ${i === activeTimeline ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-border hover:bg-primary/40"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTimeline(i => Math.min(TIMELINE.length - 1, i + 1))}
                disabled={activeTimeline === TIMELINE.length - 1}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted hover:border-primary/30 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section-space bg-background">
        <div className="site-shell">
          <motion.div
            className="text-center mb-10 lg:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-secondary/10 text-secondary border border-secondary/20">
              {t("الفريق", "The Team")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{t("قيادتنا", "Our Leadership")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("أفراد يجمعهم إيمان مشترك بقيمة الخدمة والأثر الإنساني.", "Individuals united by a shared belief in the value of service and human impact.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {TEAM.map((member, idx) => <TeamCard key={idx} member={member} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── WHERE WE WORK ── */}
      <section className="section-space bg-muted/30 border-y border-border">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary mb-4">
                <MapPin className="w-4 h-4" />
                {t("نطاق العمل", "Where We Work")}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t("في قلب فلسطين", "At the Heart of Palestine")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t(
                  "يرتكز عملنا في القدس والضفة الغربية، من خلال مقر رئيسي في البلدة القديمة وفروع في رام الله والرام، مع انفتاح على شراكات إقليمية ودولية.",
                  "Our work is anchored in Jerusalem and the West Bank, with headquarters in the Old City and branches in Ramallah and Al-Ram, while remaining open to regional and international partnerships."
                )}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { ar: "المقر الرئيسي – القدس، البلدة القديمة", en: "Head Office – Jerusalem, Old City" },
                  { ar: "فرع رام الله – شارع الطيرة", en: "Ramallah Branch – Al-Tireh Street" },
                  { ar: "فرع الرام – عمارة المقاصد", en: "Al-Ram Branch – Al-Maqased Building" },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-200 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-foreground font-medium group-hover:text-secondary transition-colors duration-200">
                      {t(loc.ar, loc.en)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                  alt={t("العمل المجتمعي", "Community work")}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
              </div>
              {/* Institutional badge */}
              <div className="absolute -bottom-4 -start-4 bg-card border border-border rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("مرخّصة رسمياً", "Officially Licensed")}</p>
                  <p className="font-bold text-sm text-foreground">{t("منذ ٢٠٠٨", "Since 2008")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-space bg-primary text-primary-foreground relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
        />
        <div className="absolute -start-20 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="site-shell">
          <div className="section-narrow relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-10 h-10 mx-auto mb-5 text-secondary" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("انضم إلى مسيرة التغيير", "Join the Journey of Change")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t(
                "سواء كنت متطوعًا أو داعمًا أو شريكًا — لكل إسهام أثر حقيقي في حياة الناس.",
                "Whether you volunteer, donate, or partner — every contribution makes a real difference in people's lives."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setLocation("/donate")}
                className="rounded-full px-8 h-13 bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {t("تبرّع الآن", "Donate Now")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/get-involved")}
                className="rounded-full px-8 h-13 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all hover:-translate-y-0.5"
              >
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
