import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, BookOpen, Users, UserPlus, Baby, Accessibility,
  ArrowRight, ArrowLeft, Search, Lightbulb, CheckCircle,
  TrendingUp, HandHeart, Star, ChevronRight, Play,
  Sparkles, Target, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Data ──────────────────────────────────────────────────── */

const PROGRAMS = [
  {
    id: "relief",
    icon: Heart,
    color: "primary",
    categoryAr: "إغاثة",
    categoryEn: "Relief",
    titleAr: "الإغاثة والدعم الإنساني",
    titleEn: "Relief & Humanitarian Support",
    summaryAr: "تلبية الاحتياجات الفورية للأسر الأكثر هشاشة بكرامة ومسؤولية.",
    summaryEn: "Meeting the immediate needs of the most vulnerable families with dignity.",
    bodyAr: "تستجيب هذه البرامج للاحتياجات الأساسية للأسر الأكثر احتياجًا، خاصة في أوقات الضغط الاقتصادي أو المواسم أو الظروف الإنسانية الطارئة. ويشمل ذلك المساعدات الغذائية والدعم الموسمي والمبادرات التي تسهم في تخفيف العبء عن العائلات وتعزيز التكافل المجتمعي.",
    bodyEn: "These programs respond to the essential needs of vulnerable families, especially during periods of economic strain, seasonal hardship, or humanitarian urgency. This includes food assistance, seasonal support, and initiatives that help ease pressure on households while strengthening social solidarity.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    stat: "2٬000+",
    statEn: "2,000+",
    statLabelAr: "أسرة مستفيدة",
    statLabelEn: "Families Supported",
    tags: ["food", "seasonal", "emergency"],
  },
  {
    id: "education",
    icon: BookOpen,
    color: "secondary",
    categoryAr: "تعليم",
    categoryEn: "Education",
    titleAr: "التعليم ودعم الطلبة",
    titleEn: "Education Support",
    summaryAr: "دعم الطلبة ليواصلوا مسيرتهم التعليمية بثقة وكرامة.",
    summaryEn: "Empowering students to continue their educational journey with confidence.",
    bodyAr: "نؤمن بأن التعليم ركيزة أساسية لبناء المستقبل. لذلك تعمل الجمعية على دعم الطلبة من خلال توفير المستلزمات التعليمية، والمساهمة في تخفيف الأعباء عن الأسر، ودعم المبادرات التي تساعد الطلبة على الاستمرار في تعليمهم بكرامة وثقة.",
    bodyEn: "We believe education is a foundational pillar of the future. The association supports students by helping provide educational essentials, easing pressure on families, and advancing initiatives that help learners continue their education with dignity and confidence.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    stat: "1٬500+",
    statEn: "1,500+",
    statLabelAr: "طالب مدعوم",
    statLabelEn: "Students Supported",
    tags: ["students", "supplies", "scholarships"],
  },
  {
    id: "youth",
    icon: Users,
    color: "primary",
    categoryAr: "شباب",
    categoryEn: "Youth",
    titleAr: "تمكين الشباب",
    titleEn: "Youth Empowerment",
    summaryAr: "بناء قدرات الشباب وتعزيز قيادتهم لمستقبل أفضل.",
    summaryEn: "Building youth capacity and leadership toward a stronger future.",
    bodyAr: "تركّز برامج تمكين الشباب على بناء المهارات وتعزيز الثقة بالنفس وتنمية روح المبادرة والقيادة. وتهدف هذه الجهود إلى دعم الشباب ليكونوا أكثر قدرة على المشاركة المجتمعية وصنع فرص أفضل لأنفسهم ولمحيطهم.",
    bodyEn: "Youth empowerment programs focus on building skills, strengthening confidence, and developing initiative and leadership. These efforts are designed to help young people participate more actively in society and create stronger opportunities for themselves and their communities.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    stat: "800+",
    statEn: "800+",
    statLabelAr: "شاب مشارك",
    statLabelEn: "Youth Participants",
    tags: ["leadership", "skills", "training"],
  },
  {
    id: "women",
    icon: UserPlus,
    color: "secondary",
    categoryAr: "نساء",
    categoryEn: "Women",
    titleAr: "تمكين النساء",
    titleEn: "Women's Empowerment",
    summaryAr: "فتح مساحات أوسع للمشاركة الاقتصادية والمجتمعية للمرأة.",
    summaryEn: "Creating wider spaces for women's economic and social participation.",
    bodyAr: "تسعى الجمعية إلى دعم النساء عبر برامج تدريبية وتوعوية وتنموية تعزز من مشاركتهن في المجتمع والحياة الاقتصادية. ويشمل ذلك بناء القدرات وفتح مساحات أوسع للمساهمة والاعتماد على الذات.",
    bodyEn: "The association seeks to support women through training, awareness, and development programs that strengthen their participation in community life and economic activity. This includes capacity building and creating broader space for contribution and self-reliance.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    stat: "600+",
    statEn: "600+",
    statLabelAr: "امرأة مشاركة",
    statLabelEn: "Women Engaged",
    tags: ["training", "economic", "capacity"],
  },
  {
    id: "orphans",
    icon: Baby,
    color: "primary",
    categoryAr: "أطفال",
    categoryEn: "Children",
    titleAr: "رعاية الأيتام",
    titleEn: "Orphan Support",
    summaryAr: "دعم يحفظ الكرامة ويوفر بيئة آمنة ومحتضِنة للأطفال.",
    summaryEn: "Support that preserves dignity and provides a safe, nurturing environment.",
    bodyAr: "تهدف برامج رعاية الأيتام إلى توفير دعم يحفظ الكرامة ويعزز الاستقرار النفسي والاجتماعي، ويساعد الأطفال الأيتام على النمو في بيئة أكثر دعمًا واحتواءً.",
    bodyEn: "Orphan support programs aim to provide dignity-centered assistance that promotes emotional and social stability and helps orphaned children grow within a more supportive and nurturing environment.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    stat: "400+",
    statEn: "400+",
    statLabelAr: "طفل يتيم مدعوم",
    statLabelEn: "Children Supported",
    tags: ["children", "care", "stability"],
  },
  {
    id: "disability",
    icon: Accessibility,
    color: "secondary",
    categoryAr: "إعاقة",
    categoryEn: "Disability",
    titleAr: "دعم ذوي الإعاقة",
    titleEn: "Disability Inclusion",
    summaryAr: "تعزيز الدمج المجتمعي وتوفير الدعم التأهيلي للأشخاص ذوي الإعاقة.",
    summaryEn: "Fostering community inclusion and rehabilitative support for persons with disabilities.",
    bodyAr: "تعمل الجمعية على دعم الأشخاص ذوي الإعاقة من خلال مبادرات تساعد على الدمج المجتمعي، وتوفير الدعم التأهيلي والنفسي والاجتماعي، وتعزيز وعي الأسر والمجتمع بأهمية الشمول والتمكين.",
    bodyEn: "The association supports persons with disabilities through initiatives that encourage community inclusion, provide rehabilitative and psychosocial support, and strengthen awareness among families and the community around inclusion and empowerment.",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    stat: "250+",
    statEn: "250+",
    statLabelAr: "شخص مستفيد",
    statLabelEn: "Beneficiaries",
    tags: ["inclusion", "rehab", "awareness"],
  },
];

const HOW_WE_WORK = [
  {
    icon: Search,
    step: "01",
    ar: "تحديد الاحتياجات",
    en: "Identify Needs",
    descAr: "نبدأ بالاستماع إلى المجتمع وفهم احتياجاته الفعلية من خلال التقييمات الميدانية والحوار المباشر.",
    descEn: "We start by listening to the community and understanding real needs through field assessments and direct dialogue.",
  },
  {
    icon: Lightbulb,
    step: "02",
    ar: "تصميم البرامج",
    en: "Design Programs",
    descAr: "نصمم برامج مبنية على الأدلة، تجمع بين الإغاثة الفورية والتمكين المستدام.",
    descEn: "We design evidence-informed programs that combine immediate relief with sustainable empowerment.",
  },
  {
    icon: Target,
    step: "03",
    ar: "التنفيذ والمتابعة",
    en: "Implement & Monitor",
    descAr: "ننفّذ البرامج بمشاركة المجتمع ونتابع الأثر بانتظام لضمان الجودة والنتائج.",
    descEn: "We implement programs with community participation and monitor impact regularly to ensure quality and results.",
  },
  {
    icon: TrendingUp,
    step: "04",
    ar: "التقييم والتطوير",
    en: "Evaluate & Improve",
    descAr: "نقيّم نتائجنا ونطور أساليبنا باستمرار، بناءً على ما تعلمناه ومتطلبات المرحلة.",
    descEn: "We evaluate our results and continuously improve our methods based on lessons learned and current needs.",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
];

const CATEGORIES = [
  { id: "all",       ar: "الكل",   en: "All" },
  { id: "relief",    ar: "إغاثة",  en: "Relief" },
  { id: "education", ar: "تعليم",  en: "Education" },
  { id: "youth",     ar: "شباب",   en: "Youth" },
  { id: "women",     ar: "نساء",   en: "Women" },
  { id: "orphans",   ar: "أطفال",  en: "Children" },
  { id: "disability",ar: "إعاقة",  en: "Disability" },
];

/* ─── Program Card ──────────────────────────────────────────── */
function ProgramCard({
  prog, idx, active, onSelect,
}: {
  prog: typeof PROGRAMS[0];
  idx: number;
  active: boolean;
  onSelect: () => void;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.07, duration: 0.4 }}
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-300
        ${active ? "border-primary shadow-2xl shadow-primary/15 ring-2 ring-primary/30" : "border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8"}`}
    >
      {/* Photo */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={prog.img}
          alt={t(prog.titleAr, prog.titleEn)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Category badge */}
        <div className={`absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm
          ${prog.color === "primary" ? "bg-primary/80 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"}`}>
          {t(prog.categoryAr, prog.categoryEn)}
        </div>
        {/* Stat */}
        <div className="absolute bottom-3 end-3 text-end">
          <div className="text-2xl font-black text-white leading-none">{t(prog.stat, prog.statEn)}</div>
          <div className="text-white/70 text-xs mt-0.5">{t(prog.statLabelAr, prog.statLabelEn)}</div>
        </div>
        {/* Icon */}
        <div className={`absolute bottom-3 start-3 w-10 h-10 rounded-xl flex items-center justify-center
          ${prog.color === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
          <prog.icon className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-card p-5">
        <h3 className="font-bold text-foreground text-lg mb-1.5 group-hover:text-primary transition-colors duration-200">
          {t(prog.titleAr, prog.titleEn)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {t(prog.summaryAr, prog.summaryEn)}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
          {t("تفاصيل البرنامج", "Program Details")}
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${active ? "translate-x-1" : "group-hover:translate-x-0.5"}`} />
        </div>
      </div>

      {/* Active indicator */}
      {active && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary rounded-b-2xl" />
      )}
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function Programs() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const isRtl = language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = PROGRAMS.filter(p => activeFilter === "all" || p.id === activeFilter);
  const selectedProg = PROGRAMS.find(p => p.id === selected);

  return (
    <div className="w-full flex flex-col">

      {/* ── HERO ── */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>

        {/* Dot overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 w-full site-shell pb-14 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              {t("مجالات العمل", "Program Areas")}
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
              {t("برامجنا", "Our Programs")}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-xl">
              {t(
                "برامج ومبادرات تجمع بين الإغاثة الفورية والتمكين المستدام، لخدمة المجتمع الفلسطيني بكرامة ومسؤولية.",
                "Programs and initiatives that combine immediate relief with sustainable empowerment, serving the Palestinian community with dignity and responsibility."
              )}
            </p>
            {/* Quick stats strip */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { numAr: "٦", numEn: "6", labelAr: "برامج نشطة", labelEn: "Active Programs" },
                { numAr: "٥٬٠٠٠+", numEn: "5,000+", labelAr: "مستفيد", labelEn: "Beneficiaries" },
                { numAr: "١٥+", numEn: "15+", labelAr: "عام خبرة", labelEn: "Years Experience" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/15">
                  <span className="font-black text-secondary text-lg leading-none">{t(s.numAr, s.numEn)}</span>
                  <span className="text-white/70 text-xs">{t(s.labelAr, s.labelEn)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FILTER TABS + GRID ── */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="site-shell">

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveFilter(cat.id); setSelected(null); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeFilter === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {t(cat.ar, cat.en)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((prog, idx) => (
                <ProgramCard
                  key={prog.id}
                  prog={prog}
                  idx={idx}
                  active={selected === prog.id}
                  onSelect={() => setSelected(selected === prog.id ? null : prog.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Expanded detail panel */}
          <AnimatePresence mode="wait">
            {selectedProg && (
              <motion.div
                key={selectedProg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="mt-8 rounded-3xl border border-primary/20 bg-card overflow-hidden shadow-2xl shadow-primary/8"
              >
                <div className="grid lg:grid-cols-5">
                  {/* Photo side */}
                  <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={selectedProg.img}
                      alt={t(selectedProg.titleAr, selectedProg.titleEn)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-5 start-5">
                      <div className="text-3xl font-black text-white">{t(selectedProg.stat, selectedProg.statEn)}</div>
                      <div className="text-white/70 text-sm">{t(selectedProg.statLabelAr, selectedProg.statLabelEn)}</div>
                    </div>
                  </div>
                  {/* Content side */}
                  <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                          ${selectedProg.color === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          <selectedProg.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {t(selectedProg.categoryAr, selectedProg.categoryEn)}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                        {t(selectedProg.titleAr, selectedProg.titleEn)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                        {t(selectedProg.bodyAr, selectedProg.bodyEn)}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        onClick={() => setLocation("/donate")}
                        className="rounded-full px-6 hover:-translate-y-0.5 transition-transform"
                      >
                        <HandHeart className="w-4 h-4 me-2" />
                        {t("ادعم هذا البرنامج", "Support This Program")}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setLocation("/get-involved")}
                        className="rounded-full px-6 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {t("تطوّع معنا", "Volunteer")}
                        <ArrowIcon className="w-4 h-4 ms-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="py-20 lg:py-28 relative overflow-hidden border-y border-border bg-muted/30">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        {/* Gradient orbs */}
        <div className="absolute -top-20 -start-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -end-20 w-72 h-72 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative site-shell">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
              {t("منهجيتنا", "Our Methodology")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("كيف نُحدث الأثر؟", "How We Create Impact")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t(
                "نعمل وفق منهجية واضحة تضمن أن كل برنامج يُحدث أثرًا حقيقيًا ومستدامًا.",
                "We follow a clear methodology that ensures every program creates real, lasting impact."
              )}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 start-[12.5%] end-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 z-0" />

            {HOW_WE_WORK.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                {/* Icon circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors duration-300 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-1 -end-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center">
                    {step.step.replace("0", "")}
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                  {t(step.ar, step.en)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(step.descAr, step.descEn)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ── */}
      <div className="overflow-hidden border-b border-border">
        <div className="flex">
          {GALLERY.map((src, i) => (
            <div key={i} className="flex-1 relative h-52 sm:h-72 overflow-hidden group">
              <img
                src={src}
                alt=""
                aria-hidden
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-80 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED IMPACT ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="site-shell">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRtl ? "lg:order-2" : "lg:order-1"}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary mb-4">
                <Star className="w-4 h-4" />
                {t("برنامج مميّز", "Featured Program")}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                {t("التعليم: بوابة المستقبل", "Education: Gateway to the Future")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t(
                  "في مجتمع يواجه ضغوطًا اقتصادية واجتماعية متعددة، يصبح التعليم ليس فقط حقًا — بل أداة صمود. من خلال برامجنا، نضمن أن لا يتوقف طالب عن التعلم بسبب العجز المادي.",
                  "In a community facing multiple economic and social pressures, education becomes not just a right — but a tool of resilience. Through our programs, we ensure no student stops learning due to financial hardship."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { ar: "١٬٥٠٠+ طالب", en: "1,500+ Students", descAr: "تلقوا دعمًا تعليميًا", descEn: "received educational support" },
                  { ar: "١٠٠٪ تعليم", en: "100% Education", descAr: "حق لكل طفل", descEn: "a right for every child" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/50 rounded-2xl p-4 border border-border">
                    <div className="font-black text-primary text-lg">{t(item.ar, item.en)}</div>
                    <div className="text-xs text-muted-foreground mt-1">{t(item.descAr, item.descEn)}</div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => { setActiveFilter("education"); setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="rounded-full px-6 gap-2"
              >
                {t("تعرّف على البرنامج", "Explore the Program")}
                <ArrowIcon className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Image stack */}
            <motion.div
              className={`relative ${isRtl ? "lg:order-1" : "lg:order-2"}`}
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
                    alt={t("تعليم الأطفال", "Children's education")}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
                {/* Float card */}
                <motion.div
                  className="absolute -bottom-5 -end-5 bg-card border border-border rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{t("التعليم حق", "Education is a Right")}</div>
                      <div className="text-xs text-muted-foreground">{t("لكل طفل فلسطيني", "For every Palestinian child")}</div>
                    </div>
                  </div>
                </motion.div>
                {/* Award badge */}
                <div className="absolute top-4 start-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {t("برنامج رئيسي", "Core Program")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES STRIP ── */}
      <div className="border-y border-border bg-muted/20 py-10">
        <div className="site-shell">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: CheckCircle, ar: "الكرامة أولاً", en: "Dignity First" },
              { icon: HandHeart, ar: "بمشاركة المجتمع", en: "Community-Led" },
              { icon: TrendingUp, ar: "أثر قابل للقياس", en: "Measurable Impact" },
              { icon: Award, ar: "معايير دولية", en: "International Standards" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 group cursor-default"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t(item.ar, item.en)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 end-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HandHeart className="w-12 h-12 mx-auto mb-5 text-secondary" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("دعم برامجنا يصنع فرقًا", "Supporting Our Programs Makes a Difference")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t(
                "كل تبرع يصل مباشرة إلى الأسر والشباب والطلبة المحتاجين. شاركنا في بناء أثر مستدام.",
                "Every donation reaches families, youth, and students in need. Join us in building lasting impact."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation("/donate")}
                className="rounded-full px-10 h-13 bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-xl hover:-translate-y-0.5 transition-all">
                {t("تبرّع الآن", "Donate Now")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation("/get-involved")}
                className="rounded-full px-10 h-13 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all hover:-translate-y-0.5">
                {t("تطوّع معنا", "Volunteer With Us")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
