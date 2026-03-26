import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, BookOpen, Users, UserPlus, Baby, Accessibility, ArrowRight, ArrowLeft } from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;
  const homeHeroImage = `${import.meta.env.BASE_URL}images/home/hero/home-hero.jpg`;
  const homeHeroFallback = `${import.meta.env.BASE_URL}images/hero-abstract.png`;
  const heroPortraitLeft = `${import.meta.env.BASE_URL}images/home/hero/hero-portrait-left.png`;
  const heroPortraitRight = `${import.meta.env.BASE_URL}images/home/hero/hero-portrait-right.png`;

  const programs = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      titleAr: "الإغاثة والدعم الإنساني",
      titleEn: "Relief & Humanitarian Support",
      bodyAr: "مبادرات تستجيب للاحتياجات الأساسية للأسر الأكثر احتياجًا، بما يشمل المساعدات الغذائية والدعم الموسمي.",
      bodyEn: "Initiatives that respond to the essential needs of vulnerable families, including food assistance and seasonal support."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      titleAr: "التعليم ودعم الطلبة",
      titleEn: "Education Support",
      bodyAr: "دعم الطلبة من خلال المستلزمات التعليمية والمبادرات التي تساعدهم على مواصلة تعليمهم بكرامة واستقرار.",
      bodyEn: "Support for students through educational essentials and initiatives that help them continue their learning with dignity."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      titleAr: "تمكين الشباب",
      titleEn: "Youth Empowerment",
      bodyAr: "برامج تدريبية وتنموية تعزز المهارات والقيادة والمبادرة، وتفتح للشباب مسارات أفضل.",
      bodyEn: "Development and training programs that build skills, leadership, and initiative while opening stronger pathways."
    },
    {
      icon: <UserPlus className="w-8 h-8 text-primary" />,
      titleAr: "تمكين النساء",
      titleEn: "Women’s Empowerment",
      bodyAr: "أنشطة وبرامج تدعم مشاركة النساء اقتصاديًا ومجتمعيًا من خلال التدريب وبناء القدرات.",
      bodyEn: "Activities and programs that strengthen women’s social and economic participation through training."
    },
    {
      icon: <Baby className="w-8 h-8 text-primary" />,
      titleAr: "رعاية الأيتام",
      titleEn: "Orphan Support",
      bodyAr: "دعم يراعي الكرامة والاستقرار ويهدف إلى توفير بيئة أكثر أمانًا واستمرارًا للأطفال الأيتام.",
      bodyEn: "Support that centers dignity and stability and aims to provide a safer environment for orphaned children."
    },
    {
      icon: <Accessibility className="w-8 h-8 text-primary" />,
      titleAr: "دعم الأشخاص ذوي الإعاقة",
      titleEn: "Disability Inclusion",
      bodyAr: "برامج وأنشطة تساعد على الدمج المجتمعي وتقديم الدعم التأهيلي والنفسي للأشخاص ذوي الإعاقة.",
      bodyEn: "Programs supporting community inclusion and providing rehabilitative support for persons with disabilities."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION — negative margin pulls photo behind the fixed header */}
      <section className="relative min-h-screen flex items-end overflow-hidden" style={{ marginTop: "-86px" }}>
        {/* ── Full-bleed background photo ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={homeHeroImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = homeHeroFallback;
            }}
          />
          {/* Dark gradient – heavier at bottom where text sits, lighter at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          {/* Side vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
        </div>

        {/* ── Hero content – sits above the photo ── */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block" aria-hidden="true">
          <div className="absolute left-8 top-28 xl:left-14 xl:top-32">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/14 bg-white/6 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-[2px] overflow-hidden">
              <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-white/12 bg-black/10 overflow-hidden">
                <img
                  src={heroPortraitLeft}
                  alt=""
                  className="h-full w-full object-cover object-top drop-shadow-[0_10px_22px_rgba(0,0,0,0.42)] scale-[1.08]"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-8 top-24 xl:right-14 xl:top-28">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/16 bg-white/8 shadow-[0_22px_56px_rgba(0,0,0,0.34)] backdrop-blur-[2px] overflow-hidden">
              <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full border border-white/14 bg-black/10 overflow-hidden">
                <img
                  src={heroPortraitRight}
                  alt=""
                  className="h-full w-full object-cover object-top drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] scale-[1.12]"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full site-shell section-hero-pad">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="flex max-w-3xl flex-col gap-6 xl:max-w-[46rem]"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">
                {t("جمعية زهرة المدائن لتنمية وتطوير المجتمع الفلسطيني", "Zahrat Al-Madain Association")}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight drop-shadow-md">
              {t("إحنا ", "We Stand ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-300">
                {t("لبعض", "Together")}
              </span>
            </h1>

            {/* Body copy */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl drop-shadow-sm">
              {t(
                "نعمل من أجل مجتمع فلسطيني أكثر قوة وكرامة وصمودًا، من خلال برامج تنموية وإنسانية تدعم الشباب والنساء والأطفال والأسر الأكثر احتياجًا في القدس والضفة الغربية.",
                "We work for a stronger, more dignified, and more resilient Palestinian community through development and humanitarian programs that support youth, women, children, and vulnerable families in Jerusalem and the West Bank."
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                size="lg"
                onClick={() => setLocation("/donate")}
                className="rounded-full px-8 h-14 text-base shadow-lg shadow-black/30 hover:shadow-xl hover:-translate-y-1 transition-all bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0"
              >
                {t("ادعم الأثر", "Support the Mission")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setLocation("/get-involved")}
                className="rounded-full px-8 h-14 text-base bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all hover:-translate-y-1"
              >
                {t("تطوّع معنا", "Volunteer With Us")}
              </Button>
            </div>
          </motion.div>

          {/* Floating "15+ years" badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-20 end-6 sm:end-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4"
            style={{ animationDuration: "4s" }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/30 flex items-center justify-center text-secondary">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-base sm:text-lg leading-none text-white">
                {t("أكثر من 15 عاماً", "15+ Years")}
              </p>
              <p className="text-sm text-white/70 mt-0.5">{t("من العطاء", "of Giving")}</p>
            </div>
          </motion.div>
        </div>

        {/* Subtle scroll-down cue */}
        <motion.div
          className="absolute bottom-6 start-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </motion.div>
      </section>

      {/* WHO WE ARE */}
      <section className="section-space bg-background relative z-10">
        <div className="site-shell">
          <div className="section-intro text-center">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center gap-3">
              <span className="w-12 h-px bg-secondary"></span>
              {t("من نحن", "Who We Are")}
              <span className="w-12 h-px bg-secondary"></span>
            </h2>
            <p className="text-xl text-foreground leading-relaxed">
              {t(
                "جمعية زهرة المدائن لتنمية وتطوير المجتمع الفلسطيني هي جمعية أهلية تأسست في القدس الشريف عام 2008، وتركّز على تمكين المجتمع الفلسطيني عبر الجمع بين الإغاثة المباشرة والتنمية طويلة الأمد. نؤمن بأن المجتمعات القوية تُبنى من داخلها، وأن العمل المنظم والشراكة والتكافل هي أساس الأثر الحقيقي.",
                "Zahrat Al-Madain Association is a civil society organization established in Jerusalem in 2008, focused on strengthening Palestinian communities by combining direct relief with long-term development. We believe strong communities are built from within, and that organized action, partnership, and solidarity are the foundation of real impact."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section-space bg-muted/50 border-y border-border relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}images/pattern-mesh.png`} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="site-shell relative z-10">
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">{t("مجالات عملنا", "Our Program Areas")}</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">
                {t(
                  "نعمل من خلال مسارات متكاملة لدعم الفئات الأكثر حاجة وبناء قدرات المجتمع.",
                  "We work through integrated pathways to support vulnerable groups and build community capacity."
                )}
              </p>
            </div>
            <Button 
              variant="ghost" 
              className="hidden md:flex gap-2 text-primary hover:text-primary/80 hover:bg-primary/5"
              onClick={() => setLocation("/programs")}
            >
              {t("عرض كل البرامج", "View All Programs")}
              <ArrowIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-background group cursor-pointer" onClick={() => setLocation("/programs")}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {React.cloneElement(prog.icon, { className: "w-8 h-8 group-hover:text-primary-foreground transition-colors duration-300" })}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{t(prog.titleAr, prog.titleEn)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(prog.bodyAr, prog.bodyEn)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-8 md:hidden gap-2"
            onClick={() => setLocation("/programs")}
          >
            {t("عرض كل البرامج", "View All Programs")}
            <ArrowIcon className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* WHY SUPPORT US */}
      <section className="section-space relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 opacity-10 pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}images/olive-branch.png`} alt="Olive Branch" className="w-full h-auto" />
        </div>
        <div className="site-shell relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div>
              {/* smiling palestinian child learning in classroom */}
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative">
                 <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" 
                  alt="Children learning" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {t("لماذا دعمكم مهم؟", "Why Your Support Matters")}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t(
                    "لأن التحديات الاجتماعية والاقتصادية التي تواجه الأسر الفلسطينية تحتاج إلى استجابة تجمع بين الإغاثة العاجلة والتمكين المستدام. بدعمكم، نوسّع أثر البرامج التي تخفف الأعباء، وتفتح فرصًا للتعلّم، وتعزز الصمود المجتمعي.",
                    "Because the social and economic pressures facing Palestinian families require a response that combines urgent relief with long-term empowerment. Your support helps expand programs that ease hardship, open access to learning, and strengthen community resilience."
                  )}
                </p>
              </div>
              
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-primary mb-3">{t("أثرنا", "Our Impact")}</h3>
                <p className="text-foreground leading-relaxed">
                  {t(
                    "على مدار السنوات، نفّذت الجمعية مبادرات تنموية وإنسانية استهدفت الأسر والطلبة والشباب والنساء في عدد من المناطق الفلسطينية. ويستمر عملنا على تطوير البرامج وتوسيع الشراكات بما يعزز جودة الخدمة واتساع الأثر.",
                    "Over the years, the association has implemented development and humanitarian initiatives serving families, students, youth, and women across multiple Palestinian communities. We continue to strengthen our programs and partnerships to improve both quality and reach."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-space bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}images/community-hands.png`} alt="" className="w-full h-full object-cover opacity-30" />
        </div>
        
        <div className="site-shell">
          <div className="section-narrow relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t("ساهم معنا في بناء أثر مستدام", "Help Build Lasting Impact")}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
              {t(
                "ندعو الأفراد والمؤسسات والشركاء إلى دعم مبادرات تخدم المجتمع الفلسطيني بكرامة ومسؤولية واستدامة.",
                "We invite individuals, institutions, and partners to support initiatives that serve Palestinian communities with dignity, responsibility, and sustainability."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                onClick={() => setLocation("/donate")}
                className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-10 h-14 w-full sm:w-auto shadow-lg hover:-translate-y-1 transition-transform"
              >
                {t("تبرّع الآن", "Donate Now")}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setLocation("/contact")}
                className="rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-10 h-14 w-full sm:w-auto transition-colors"
              >
                {t("تواصل معنا", "Contact Us")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
